import { Component, OnInit, signal } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message = '';
  messages = signal<string[]>([]); // Reactive Signal

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.receiveMessages().subscribe((msg) => {
      // Use update() instead of mutate()
      this.messages.update((messages) => [...messages, msg]);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message);
      this.message = ''; // Clear input after sending
    }
  }
}
