import { WebSocketService } from './../../services/web-socket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  serverOnline$ = this.webSocketService.socketStatus$;

  constructor (
    private webSocketService: WebSocketService
  ) {
  }
}
