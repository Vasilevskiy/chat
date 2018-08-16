import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../components/models/message.model';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ChatService {

  public chatWith: any;
  public chatMessages = [];
  public filteredMessages = [];
  private chatMessage: Message;
  public loggedUser: any;
  public in = [];
  public out = [];
  public roomExists: boolean;
  public currentContactId: number;
  public room = {
    id: null,
    users: []
  };

  constructor(private http: HttpClient, private baseService: BaseService) {
    this.getLoggedUser();
  }

  beginToChat(contact) {
    this.getLoggedUser();
    if (contact.id !== this.currentContactId) {
      this.chatMessages = [];
    }
    this.currentContactId = contact.id;

    this.baseService.getUser(contact.id).subscribe(res => {
      this.chatWith = res;
      this.baseService.getRooms()
        .subscribe(rooms => {
          this.room = rooms.find(room => room.users.indexOf(this.loggedUser.id) !== -1 && room.users.indexOf(this.chatWith.id) !== -1);
          if (!this.room) {
            this.room = {
              id: '_' + Math.random().toString(36).substr(2, 9),
              users: [this.loggedUser.id, this.chatWith.id]
            };
            return this.baseService.createRoom(this.room)
              .subscribe((room: any) => {
                return this.setMessages(room.id);
              });
          }
          setInterval(() => {
            this.setMessages(this.room.id);
            }, 1000);
        });
    });
  }

  getLoggedUser() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  setMessages(roomId) {
    this.baseService.getRoomById(roomId)
      .subscribe((room: any) => {
        this.chatMessages = room.messages;
      });
  }

  sendMessage(msg: string) {
    const timestamp = new Date();
    this.chatMessage = new Message(this.loggedUser.id, this.room.id, msg, timestamp);
    this.baseService.pushMessage(this.chatMessage).subscribe( (res: any) => {
      res.timeSent = this.conventStringToDate(res.timeSent);
      this.chatMessages.push(res);
    });
  }

  conventStringToDate(date) {
    return new Date(date);
  }

  getMessages() {
    return this.chatMessages;
  }

  getContactToChat() {
    return this.chatWith;
  }

}
