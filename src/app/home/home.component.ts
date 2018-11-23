import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quizzes$: any

  constructor(private data: QuizService) { }

  ngOnInit() {
    this.data.getQuizzes().subscribe(
      data => this.quizzes$ = data
    )
  }

}
