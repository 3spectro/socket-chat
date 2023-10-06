import { Subject, takeUntil } from 'rxjs';
import { ChatService, IChatMessage } from 'src/app/services/chat.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  text: string = '';

  onDestroySubject$ = new Subject<void>();
  messages$ = this.chatService.getMessages();

  messages: IChatMessage[] = [];

  constructor(
    private chatService: ChatService
  ) {

  }

  ngOnInit() {
    this.messages$.pipe(takeUntil(this.onDestroySubject$)).subscribe(msg => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubject$.next();
    this.onDestroySubject$.complete();
  }

  send() {
    if (this.text.trim().length > 0) {
      this.chatService.sendMessage(this.text);
    }
  }
}
