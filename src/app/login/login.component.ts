import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  })
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder) { 
      this.createForm()
    }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: ''
    })
  }

  onSubmit() {
    this.auth.login((<HTMLInputElement>document.getElementById('user')).value, 
      (<HTMLInputElement>document.getElementById('pass')).value)
        .pipe(first())
        .subscribe(
            data => {
              console.log(data)
              //localStorage.setItem('user', JSON.stringify($('#user').val()));
              window.location.replace("https://quiztastic.azurewebsites.net");
              //window.location.replace('http://localhost:4200');
            });
  }
}
