import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Summary } from '../models/Summary';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject<Summary>(Object()); // initial value
  currentMessage$ = this.messageSource.asObservable();

  updateMessage(message: Summary) {
    this.messageSource.next(message);
  }
  
}
