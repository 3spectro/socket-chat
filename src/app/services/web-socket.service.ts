import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socketStatus$ = new Subject<boolean>();

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connected to the server');
      this.socketStatus$.next(true);
      // this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Disconected from the server');
      // this.socketStatus = true;
      this.socketStatus$.next(false);
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string): Observable<any> {
    return this.socket.fromEvent(event);
  }
}
