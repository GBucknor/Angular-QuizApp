import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
    // } else {
    //   let url = window.location.href
    //   console.log(url.split('?t=')[1])
    // }
  }

  logIn() {
    window.location.href = "https://badgebookfront.azurewebsites.net/#/login/666";
  }

  logOut() {
    this.auth.logout()
    window.location.reload()
  }
}
