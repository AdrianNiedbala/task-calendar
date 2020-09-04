
import { FooterComponent } from './calendar/footer/footer.component';
import { ContentComponent } from './calendar/content/content.component';
import { CalendarService } from './services/calendar.service';
import { TasksComponent } from './tasks/tasks.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './calendar/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TasksComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
