import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let tokenInfo: any
      let token:string = params['t']
      if (token !== null && token != undefined)
      {
        tokenInfo = this.getDecodedToken('Bearer' + token)
        console.log(tokenInfo.nameid)
        let user = {
          'user': tokenInfo.nameid,
          'email': tokenInfo.sub,
          'token': token
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.loggedIn = true
      }
    })

    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  getDecodedToken(token: string) {
    try {
      return jwt_decode(token)
    } catch (e) {
      console.log(e)
      return null
    }
  }

  logOut() {
    this.auth.logout()
    window.location.reload()
  }
}
