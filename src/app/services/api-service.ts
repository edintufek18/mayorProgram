import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from '../models/Summary';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
   private apiUrl = 'http://localhost:3000/api/summary'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getSummary(municipality: string): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/${municipality}`);
  }
  
}
