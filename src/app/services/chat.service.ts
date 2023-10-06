import { Observable } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private webSocketService: WebSocketService
  ) { }

  sendMessage(message: string) {
    const payload = {
      from: 'Esteban',
      body: message
    };
    console.log('Emitiendo');
    this.webSocketService.emit('message', payload);
    console.log('Emitido');
  }

  getMessages(): Observable<IChatMessage> {
    return this.webSocketService.listen('message-new');
  }
}

export interface IChatMessage {
  from: string;
  body: string;
}
