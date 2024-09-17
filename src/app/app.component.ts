import { Component, OnInit } from '@angular/core';
import { MessageService } from './service/message.service';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  messages: any[] = [];
  categories: any[] = [];
  createMode: boolean = false;
  content: string = ''; 
  category: string = '';
  author: string = '';

  constructor(private messageService: MessageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  getCategoryMessages(selectedCategory: string): void {
    this.categoryService.getCategoryByName(selectedCategory).subscribe(data => {
      this.messages = data.messages;
    });
    console.log(this.messages)
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
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
        this.loadCategories();
      });
    }
  }
  
  title = 'Frontend';
}