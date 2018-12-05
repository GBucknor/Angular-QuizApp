import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quiz$: any
  questions$: any
  answers$: any
  correctAns$: any

  constructor(private data: QuizService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.quiz$ = params.id)
   }

  ngOnInit() {
    this.answers$ = {}
    this.data.getQuiz(this.quiz$).subscribe(
      (data) => {
        this.quiz$ = data
        this.data.getCorrectAnswers(this.quiz$.quizId).subscribe(data => {this.correctAns$ = data})
        this.data.getQuestions(this.quiz$.quizId).subscribe(
          (data) => {
            this.questions$ = data,
            this.questions$.forEach(question => {
              this.data.getAnswers(question.questionId).subscribe(
                data => this.answers$[question.questionId] = data
              )
            });
          }
        )
      }
    )
  }

  submitQuiz() {
    let mark = this.quiz$.numberOfQuestions;
    this.questions$.forEach(question => {
      let choice = $("input[name=" + question.questionId + "]:checked").val()
      if (this.correctAns$[question.questionId] !== choice) {
        --mark
      }
    });
    $('#results').html(mark + "/" + this.quiz$.numberOfQuestions)
    $('#quiz').fadeOut('fast')
    $('#result-container').fadeIn('fast', () => {
      $('#result-container').removeAttr('hidden')
    })
    let rank = {
      "quizScore": mark,
      "badgeBookId": JSON.parse(localStorage.getItem('currentUser'))['user'],
      "quizId": this.quiz$.quizId
    }
    this.data.checkUserScore(rank).subscribe(data => {
      if (!('notFound' in data)) {
        rank["rankId"] = data["rankId"]
        console.log(data)
        console.log(rank)
        this.data.updateUserScore(rank).subscribe(data => {})
      } else {
        this.data.storeUserScore(rank).subscribe((data) => {
          this.data.getUserRank(rank.quizId, rank.badgeBookId).subscribe(data => {
            let badge = {
              'UID': JSON.parse(localStorage.getItem('currentUser'))['user'],
              'ImageURL': "https://quiztastic.azurewebsites.net/quiztastic-logo.png",
              'BadgeName': this.quiz$.quizName,
              'BadgeDescription': data["rank"]
            }
            this.data.postBadge(badge).subscribe(data => {
              console.log(data)
            })
          })
        })
      }
    })
  }
}
