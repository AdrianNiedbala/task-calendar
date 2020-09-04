import { CalendarService } from './../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  displayedColumns: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  dataSource = this.calendarService.genCalendar();

  selectedCellIndex: number;
  selectedCellColumn: string;
  hoveredCellIndex: number;
  hoveredCellColumn: string;
  todayCellIndex: number;
  todayCellColumn: string;

  select(index: number, column: string, cellData?: string) {
    if (cellData === '') {
      return false;
    } else if (index === this.todayCellIndex && column === this.todayCellColumn) {
      return false;
    } else {
      this.selectedCellIndex = index;
      this.selectedCellColumn = column;
    }
  }

  hover(index: number, column: string, cellData: string) {
    if (cellData === '') {
      return false;
    } else if (index === this.todayCellIndex && column === this.todayCellColumn) {
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
  }

}
