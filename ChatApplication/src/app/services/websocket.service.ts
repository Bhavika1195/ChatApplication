import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;
  private SERVER_URL = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessages(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
}
