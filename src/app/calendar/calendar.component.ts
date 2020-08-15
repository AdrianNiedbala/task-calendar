import { WeekElements } from './../interfaces/week';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  getToday = new Date();
  currentMonth = this.getToday.getMonth();
  currentYear = this.getToday.getFullYear();

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  month = this.months[this.currentMonth];

  displayedColumns: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  dataSource = this.genCalendar(this.currentMonth, this.currentYear);


  genCalendar(month, year) {

    const calendarData: WeekElements[] = [];

    const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    let date = 1;

    for (let i = 0; i < 6; i++) {

      const weekData = [];

      for (let j = 0; j < 7; j++) {

        if (i === 0 && j < firstDay) {
          weekData[j] = ' ';
        } else if (date > daysInMonth) {
          break;
        } else {
          weekData[j] = date;
          date++;
        }

      }

      calendarData.push({ sun: weekData[0],  mon: weekData[1],  tue: weekData[2],  wed: weekData[3],  thu: weekData[4],
                           fri: weekData[5],  sat: weekData[6]});
    }

    return calendarData;
  }

  prev() {
    if (this.currentMonth === 0) {
      this.currentYear --;
      this.currentMonth = 11;
    } else {
      this.currentMonth --;
    }

    this.month = this.months[this.currentMonth];

    this.dataSource = this.genCalendar(this.currentMonth, this.currentYear);
  }

  next() {
    if (this.currentMonth === 11) {
      this.currentYear ++;
      this.currentMonth = 0;
    } else {
      this.currentMonth ++;
    }

    this.month = this.months[this.currentMonth];

    this.dataSource = this.genCalendar(this.currentMonth, this.currentYear);
  }

  today() {
    this.currentMonth = this.getToday.getMonth();
    this.currentYear = this.getToday.getFullYear();

    this.month = this.months[this.currentMonth];

    this.dataSource = this.genCalendar(this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {
  }
}
