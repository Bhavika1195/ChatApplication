import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  imports: [NgFor, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  messageText: string = '';

  constructor(private wsService: WebsocketService) {}

  // For this Run Backend ->
  // node serverWS.js (Which uses npm i ws in backend)
  ngOnInit() {
    this.wsService.connect('ws://localhost:8080');
    this.wsService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    if (this.messageText.trim()) {
      this.wsService.sendMessage(this.messageText);
      this.messageText = ''; // Clear input after sending
    }
  }
}
