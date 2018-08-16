import { Component, OnInit } from '@angular/core';
import {BaseService} from '../../services/base.service';
import {ChatService} from '../../services/chat.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public loading = true;
  constructor(private baseService: BaseService, private chatService: ChatService ) {
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }


}
