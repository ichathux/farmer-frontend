import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/gs-guide-websocket');


    this.socket$.subscribe(
      (message) => console.log('WebSocket message received:', message),
      (error) => console.error('WebSocket error:', error),
      () => console.log('WebSocket connection closed'),
      // (event) => console.log('WebSocket event:', event)
    );

  }
  receiveMessage(): WebSocketSubject<any> {
    return this.socket$;
  }

  getSocket(): WebSocketSubject<any> {
    return this.socket$;
  }
}
