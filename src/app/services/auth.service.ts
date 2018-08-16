import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  login() {
    return this.http.get(this.baseUrl);
  }

}
