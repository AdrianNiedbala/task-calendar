import { CalendarService } from './../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  selectedMonth: string;
  selectedYear: string;

  months = this.calendarService.months;
  years = this.calendarService.genYearsArray();

  goTo() {
    this.calendarService.goTo(this.selectedMonth, this.selectedYear);
    this.selectedMonth = 'None';
    this.selectedYear = 'None';
  }

  ngOnInit(): void {
  }

}
