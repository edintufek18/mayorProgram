import { Component, OnInit } from '@angular/core';
import { Summary } from '../../models/Summary';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message-service';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class SummaryComponent implements OnInit {
  municipalityName: string = '';
  summary: Summary | null = null;
  errorMessage: string = '';

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.messageService.currentMessage$.subscribe((msg: Summary) => {
      this.summary = msg;
    });
  }
} 
