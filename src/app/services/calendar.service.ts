import { WeekElements } from './../interfaces/week';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  private getToday = new Date();
  private currentMonth = this.getToday.getMonth();
  private currentYear = this.getToday.getFullYear();
  private newCalendar = new Subject<WeekElements[]>();
  private newHeader = new Subject<string>();
  private resetIndex = new Subject<number>();
  private resetColumn = new Subject<string>();
  private week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  private todayColumn = this.week[this.getToday.getDay()];
  private todayIndex;
  private highlightToday = new Subject<boolean>();

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  setHeader(): string {
    const header = this.months[this.currentMonth] + ' ' + this.currentYear.toString();
    return header;
  }

  setNewHeader(): Observable<string> {
    return this.newHeader.asObservable();
  }

  genCalendar() {

    const calendarData: WeekElements[] = [];

    const firstDay = (new Date(this.currentYear, this.currentMonth)).getDay();
    const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

    let date = 1;

    for (let i = 0; i < 6; i++) {

      const weekData = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || (date > daysInMonth)) {
          weekData[j] = '';
        } else {
          if (date === this.getToday.getDate()) {
            this.todayIndex = i;
          }
          weekData[j] = date;
          date++;
        }

      }

      calendarData.push({ sun: weekData[0],  mon: weekData[1],  tue: weekData[2],  wed: weekData[3],  thu: weekData[4],
                          fri: weekData[5],  sat: weekData[6]});
    }

    return calendarData;
  }

  getNewCalendar(): Observable<WeekElements[]> {
    return this.newCalendar.asObservable();
  }

  getWeek() {
    return this.week;
  }

  prev() {
    if (this.currentMonth === 0) {
      this.currentYear --;
      this.currentMonth = 11;
    } else {
      this.currentMonth --;
    }

    this.setHighlightToday();
    this.newHeader.next(this.setHeader());
    this.newCalendar.next(this.genCalendar());
  }

  next() {
    if (this.currentMonth === 11) {
      this.currentYear ++;
      this.currentMonth = 0;
    } else {
      this.currentMonth ++;
    }

    this.setHighlightToday();
    this.newHeader.next(this.setHeader());
    this.newCalendar.next(this.genCalendar());
  }

  goTo(month: string, year: string) {
    this.currentMonth = this.months.findIndex(mon => mon === month);
    this.currentYear = +year;

    this.setHighlightToday();
    this.newHeader.next(this.setHeader());
    this.newCalendar.next(this.genCalendar());
  }

  genYearsArray() {
    let year = this.currentYear - 10;
    const yearsArray: string[] = [];

    for (let i = 0; i < 21; i++) {
      yearsArray.push(year.toString());
      year++;
    }

    return yearsArray;
  }

  reset() {
    this.resetColumn.next('');
    this.resetIndex.next(-1);
  }

  newIndex(): Observable<number> {
    return this.resetIndex.asObservable();
  }

  newColumn(): Observable<string> {
    return this.resetColumn.asObservable();
  }

  getTodayColumn() {
    return this.todayColumn;
  }

  getTodayIndex() {
    return this.todayIndex;
  }

  setHighlightToday() {
    if (this.currentMonth === this.getToday.getMonth()) {
      this.highlightToday.next(true);
    } else {
      this.highlightToday.next(false);
    }
  }

  gethighlightToday(): Observable<boolean> {
    return this.highlightToday.asObservable();
  }
}

