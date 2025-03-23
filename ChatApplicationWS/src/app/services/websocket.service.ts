import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: WebSocket;
  private messages: Subject<string> = new Subject();

  constructor() {}

  // Connecting to websocket
  connect(url: string) {
    this.socket = new WebSocket(url);

    // When socket gets connected and open
    this.socket.onopen = () => console.log('Connected to WebSocket Server');

    // Now lets talk about how and what type of messages will get accessed
    this.socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.messages.next(reader.result as string);
        };
        reader.readAsText(event.data);
      } else {
        this.messages.next(event.data);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket Server closed connection, Reconnecting');
      setTimeout(() => this.connect(url), 3000);
      // this.messages.complete();
    };
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  getMessages(): Observable<string> {
    return this.messages.asObservable();
  }
}
