import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatDividerModule} from "@angular/material/divider";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacySliderModule as MatSliderModule} from "@angular/material/legacy-slider";
import { GameEntryComponent } from './game-entry/game-entry.component';
import { GameLogsComponent } from './game-logs/game-logs.component';
import { StatsComponent } from './stats/stats.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RulesComponent } from './rules/rules.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import { TeamEntryComponent } from './team-entry/team-entry.component';
import {MatSortModule} from "@angular/material/sort";
import { SettingsComponent } from './settings/settings.component';
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";

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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
