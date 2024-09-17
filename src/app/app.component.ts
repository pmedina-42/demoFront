import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { CategoryService } from './service/category.service';
import { Message } from './model/message.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  messages: any[] = [];
  createMode: boolean = false;
  content: string = ''; 
  category: string = '';
  author: string = '';

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }
  
  createModeSwitch(): void {
    this.createMode = !this.createMode;
  }

  onSubmit(content: string, category: string, author: string): void {
    if (content && category && author) {
      const messageData = {
        content: content,
        category: category,
        author: author
      };
      console.log('Form submitted:', messageData);
      this.messageService.createMessage(messageData).subscribe(data => {
        this.messages.push(data);
      });
    }
  }
  
  title = 'Frontend';
}