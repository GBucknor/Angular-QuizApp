import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false

  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['t']
      console.log(token)
    })
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
    // } else {
    //   let url = window.location.href
    //   console.log(url.split('?t=')[1])
    // }
  }

  logOut() {
    this.auth.logout()
    window.location.reload()
  }
}
