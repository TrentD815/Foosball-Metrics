import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import { GameEntryComponent } from './game-entry/game-entry.component';
import { GameLogsComponent } from './game-logs/game-logs.component';
import { StatsComponent } from './stats/stats.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RulesComponent } from './rules/rules.component';
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TeamEntryComponent } from './team-entry/team-entry.component';
import {MatSortModule} from "@angular/material/sort";
import { SettingsComponent } from './settings/settings.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    GameEntryComponent,
    GameLogsComponent,
    StatsComponent,
    RulesComponent,
    TeamEntryComponent,
    SettingsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatInputModule,
        MatNativeDateModule,
        FormsModule,
        MatSliderModule,
        MatTableModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatListModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSortModule,
        MatRadioModule,
        MatSlideToggleModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
