import { Component, OnInit, Output } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  header = this.calendarService.setHeader();

  prev() {
    this.calendarService.prev();
    this.calendarService.reset();
  }

  next() {
    this.calendarService.next();
    this.calendarService.reset();
  }

  ngOnInit(): void {
    this.calendarService.setNewHeader().subscribe(data => {
      this.header = data;
    });
  }

}
