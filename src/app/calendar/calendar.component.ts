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


  ngOnInit(): void {
    const tbl = document.getElementById('table-body');

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        if ( i === 0 && j < this.firstDay) {
          const cell = document.createElement('td');
          cell.append(document.createTextNode(''));
          row.append(cell);
        } else if (date > this.daysInMonth) {
          break;
        } else {
          const cell = document.createElement('td');
          cell.append(document.createTextNode(date.toString()));
          row.append(cell);
          date++;
        }
      }

      tbl.append(row);
    }
  }
}
