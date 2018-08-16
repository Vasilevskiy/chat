import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../services/base.service';
import {ChatService} from '../../services/chat.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user = {
    id: 0,
    name: 'Guest',
    surname: 'Guest'
};
  public contacts = [];
  public currentContactId: string;


  constructor(private baseService: BaseService, private chatService: ChatService, private router: Router ) {
    this.baseService.getUsers().subscribe( res => {
      res.filter( items => {
        if (items.name !== this.user.name) {
          this.contacts.push(items);
        }
      });
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  startChat(contact) {
    this.chatService.beginToChat(contact);
    this.currentContactId = contact.id;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
