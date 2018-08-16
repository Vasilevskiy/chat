import {Component, DoCheck, OnInit} from '@angular/core';
import {Message} from '../models/message.model';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit, DoCheck {

  public message: string;
  public chatStarted = false;
  public chatWith: any;

  constructor(private chatService: ChatService) { }


  handleSubmit(event) {
    if (event.keyCode === 13 && this.message !== '' && this.message !== undefined) {
      this.send();
    }
  }
  send() {
    if (this.message !== '' && this.message !== undefined) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.chatService.getContactToChat() !== undefined) {
      this.chatStarted = true;
      this.chatWith = this.chatService.getContactToChat();
    }
  }
}
