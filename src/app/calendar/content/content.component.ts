import { CalendarService } from './../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  displayedColumns: string[] = this.calendarService.getWeek();
  dataSource = this.calendarService.genCalendar();

  selectedCellIndex: number;
  selectedCellColumn: string;
  hoveredCellIndex: number;
  hoveredCellColumn: string;
  todayCellIndex = this.calendarService.getTodayIndex();
  todayCellColumn = this.calendarService.getTodayColumn();
  highlightToday = true;

  select(index: number, column: string, cellData: string) {
    if (cellData === '') {
      return false;
    } else {
      this.selectedCellIndex = index;
      this.selectedCellColumn = column;
    }
    console.log('sth');
  }

  hover(index: number, column: string, cellData: string) {
    if (cellData === '') {
      return false;
    } else {
      this.hoveredCellIndex = index;
      this.hoveredCellColumn = column;
    }
  }

  ngOnInit(): void {
    this.calendarService.getNewCalendar().subscribe(data => {
      this.dataSource = data;
    });
    this.calendarService.newColumn().subscribe(column => {
      this.selectedCellColumn = column;
    });
    this.calendarService.newIndex().subscribe(index => {
      this.selectedCellIndex = index;
    });
    this.calendarService.gethighlightToday().subscribe(highlight => {
      this.highlightToday = highlight;
    });
  }

}
