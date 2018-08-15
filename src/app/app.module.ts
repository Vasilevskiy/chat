import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';
import {ChatInputComponent} from './components/chat-input/chat-input.component';
import {UsersComponent} from './components/users/users.component';
import {FormsModule} from '@angular/forms';
import {ChatService} from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChatInputComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
