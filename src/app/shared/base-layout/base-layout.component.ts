import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router:Router) {
    this.isLoggedIn=this.cookieService.get('session_user') ? true:false;

    this.name= sessionStorage.getItem('name');
    console.log('Signed in as user '+ this.name);
  }

  ngOnInit(): void {
  }

  signOut()
  {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
