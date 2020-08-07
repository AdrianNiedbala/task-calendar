import { Component, OnInit } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  month = this.months[this.today.getMonth()];
  firstDay = (new Date(this.currentYear, this.currentMonth)).getDay();
  daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

  first = 1;
  i: number;
  j: number;

  tbl = document.getElementById('calendar-body');

  ngOnInit(): void {

    for ( this.i = 0; this.i < 6; this.i++) {
      const row = document.createElement('tr');
      for ( this.j = 0; this.j < 7; this.j++) {
        if (this.i === 0 && this.j < this.firstDay) {
          const cell = document.createElement('td');
          cell.appendChild(document.createTextNode(''));
          row.appendChild(cell);
        } else if (this.first > this.daysInMonth) {
          break;
        } else {
          const cell = document.createElement('td');
          cell.appendChild(document.createTextNode(this.first.toString()));
          row.appendChild(cell);
          this.first++;
        }
      }
          this.tbl.appendChild(row);
    }
  }


}
