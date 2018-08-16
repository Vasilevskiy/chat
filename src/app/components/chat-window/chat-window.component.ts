import {Component, DoCheck, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, DoCheck {
  public person: { id: number, name: string, surname: string, messages: Array<any> };
  public message: string;
  public messages = [];
  public loggedUser: any;

  constructor(private chatService: ChatService) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {}

  // Checking for changes in our variables

  ngDoCheck() {
    this.person = this.chatService.getContactToChat();
    this.messages = this.chatService.getMessages();
  }

}
