import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BaseService {
  private baseUrl = 'http://localhost:3000/';
  private users = this.baseUrl + 'users/';
  private messages = this.baseUrl + 'messages/';
  private rooms = this.baseUrl + 'rooms/';
  public loggedUser: any;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get(this.users);
  }

  getRoomById(id) {
    return this.http.get(`${this.rooms}${id}?_embed=messages`);
  }

  getOutMessage(id) {
    return this.http.get(this.messages + '?targetId=' + id);
  }

  pushMessage(msg) {
    return this.http.post(this.messages, msg);
  }

  createRoom(room) {
    return this.http.post(this.rooms, room);
  }

  getUser(id): Observable<any> {
    return this.http.get(this.users + id);
  }

  getRooms(): Observable<any> {
    return this.http.get(this.rooms);
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  setLoggedUser(user) {
    this.loggedUser = user;
  }

}
