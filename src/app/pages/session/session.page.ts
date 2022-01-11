/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit{



  constructor(private router: Router,
    private authService: AuthenticationService) { }


  ngOnInit()  {

  }

  onClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
    }

  }


