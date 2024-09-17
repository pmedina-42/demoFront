import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Message } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'localhost:8080/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  
  getCategoryByName(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + "/name/" + name)
  }

  createCategory(message: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, message);
  }
}

