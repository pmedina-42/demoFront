import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/categories';

  constructor() { }

  getCategories(): Observable<Category[]> {
    return new Observable(observer => {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
  
  getCategoryByName(name: string): Observable<Category> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/name/${name}`)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }

  createCategory(category: Category): Observable<Category> {
    return new Observable(observer => {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(category)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
  
}

