import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {BaseService} from '../../services/base.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public name: string;
  public loggedUser: any;

  constructor(private auth: AuthService, private baseService: BaseService, private router: Router) {
  }
  ngOnInit() {
  }

  login() {
    this.auth.login().subscribe( (res: any) => {
      res.filter( user => {
        if ( user.name === this.name) {
          this.loggedUser = user;
          this.baseService.setLoggedUser(this.loggedUser);
          localStorage.setItem('user', JSON.stringify(this.loggedUser));
          this.router.navigate(['/feed']);
        }
      });
    });
  }


}
