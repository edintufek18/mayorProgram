import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message-service';
import { ApiService } from '../../services/api-service';
import { Summary } from '../../models/Summary';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  constructor(private messageService: MessageService,private apiService: ApiService){}
  isTooltipVisible = false;
  tooltipText = '';
  tooltipX = '0px';
  tooltipY = '0px';
  summary: Summary = Object();
  errorMessage: string = '';

  showTooltip(event: MouseEvent, name: string) {
    this.tooltipText = name;
    this.tooltipX = (event.clientX + 15) + 'px';
    this.tooltipY = (event.clientY + 15) + 'px';
    this.isTooltipVisible = true;
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }

  showSummary(event: MouseEvent,name: string) {
    
  this.apiService.getSummary(name).pipe().subscribe({
      next: (data) => {this.summary = data;this.messageService.updateMessage(this.summary)},
      error: (err) => this.errorMessage = err.error?.error || 'Error fetching data'
    });

  }
  
}
