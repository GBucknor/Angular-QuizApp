import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  quizQuestions: Array<any>
  qBox: any

  constructor(private data: QuizService) { }

  ngOnInit() {
    this.qBox = document.getElementById("question-box");
    this.quizQuestions = []
  }

  addQuestion() {
    let questionObject = {
        'question': $(this.qBox).find(".edit_ques").val(),
        'correct': $(this.qBox).find(".c_ans").val(),
        'wrong1': $(this.qBox).find(".w_ans1").val(),
        'wrong2': $(this.qBox).find(".w_ans2").val(),
        'wrong3': $(this.qBox).find(".w_ans3").val(),
    };
    this.addToDisplay(this.quizQuestions.length);
    this.quizQuestions.push(questionObject);
    console.log(this.quizQuestions);
  }

  addToDisplay(currentNum)
  {
      let cln = document.getElementById("question-box").cloneNode(true);
      let editBtn = document.createElement("button");
      let delBtn = document.createElement("button");
      editBtn.classList.add("btn");
      editBtn.classList.add("btn-primary");
      delBtn.classList.add("btn");
      delBtn.classList.add("btn-danger");
      editBtn.addEventListener("click", () => {
          this.editQuestion(currentNum);
      });
      delBtn.addEventListener("click", () => {
          //deleteQuestion(currentNum);
      });
      editBtn.innerHTML = "Edit";
      delBtn.innerHTML = "Delete";
      $(cln).attr("id", currentNum);
      cln.appendChild(editBtn);
      cln.appendChild(delBtn);
      document.getElementById("created-questions").appendChild(cln);
      $("#" + currentNum).find(".easy").attr('name', currentNum);
      $("#" + currentNum).find(".hard").attr('name', currentNum);
  }

  editQuestion(id)
  {
      this.quizQuestions[id]["question"] =  $("#" + id).find(".edit_ques").val();
      this.quizQuestions[id]["correct"] =  $("#" + id).find(".c_ans").val();
      this.quizQuestions[id]["wrong1"] = $("#" + id).find(".w_ans1").val();
      this.quizQuestions[id]["wrong2"] = $("#" + id).find(".w_ans2").val();
      this.quizQuestions[id]["wrong3"] = $("#" + id).find(".w_ans3").val();
  }

  storeQuiz() {
    //let spinner = document.getElementsByClassName("loader");
    //$(spinner[0]).css("display", "inline-block");
    let quizId
    let quiz = {
      "quizName": $('#quiz_name').val(),
      "numberOfQuestions": this.quizQuestions.length,
      "quizDescription": $('#quiz_desc').val()
    }
    this.data.addQuiz(quiz).subscribe((data) => {
      quizId = data['quizId']
      for (let index = 0;index < this.quizQuestions.length;++index) {
        let quesId
        let quesStr = this.quizQuestions[index];
        let question = {
          'questionContent': quesStr.question,
          'quizId': quizId
        }
        this.data.addQuestion(question).subscribe((data) => {
          quesId = data['questionId']
          let correctAns = {
            'answerText': quesStr.correct,
            'questionId': quesId,
            'isCorrect': true
          }
          this.data.addAnswer(correctAns).subscribe(data => {})
          let wrongAns1 = {
            'answerText': quesStr.wrong1,
            'questionId': quesId,
            'isCorrect': false
          }
          this.data.addAnswer(wrongAns1).subscribe(data => {})
          let wrongAns2 = {
            'answerText': quesStr.wrong2,
            'questionId': quesId,
            'isCorrect': false
          }
          this.data.addAnswer(wrongAns2).subscribe(data => {})
          let wrongAns3 = {
            'answerText': quesStr.wrong3,
            'questionId': quesId,
            'isCorrect': false
          }
          this.data.addAnswer(wrongAns3).subscribe(data => {})
        })
      }
    })
  }
}
