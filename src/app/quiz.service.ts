import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url = "https://qtastic.azurewebsites.net/"
  constructor(private http: HttpClient) { }

  getQuizzes() {
    return this.http.get(this.url +  'api/quizzes')
  }

  getQuiz(id) {
    return this.http.get(this.url + 'api/quizzes/' + id)
  }

  getQuestions(id) {
    return this.http.get(this.url + 'api/questions/' + id)
  }

  getAnswers(id) {
    return this.http.get(this.url + 'api/answers/' + id)
  }

  getCorrectAnswers(id) {
    return this.http.get(this.url + 'api/quizzes/correct/' + id)
  }

  addQuiz(model) {
    return this.http.post(this.url + 'api/quizzes', model)
  }

  addQuestion(model) {
    return this.http.post(this.url + 'api/questions', model)
  }

  addAnswer(model) {
    return this.http.post(this.url + 'api/answers', model)
  }

  storeUserScore(model) {
    return this.http.post(this.url + 'api/ranks', model)
  }

  checkUserScore(model) {
    console.log(model)
    return this.http.post(this.url + 'api/ranks/check', model)
  }

  updateUserScore(model) {
    return this.http.put(this.url + 'api/ranks/' + model.rankId, model)
  }
}
