import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolDetailComponent } from './sol-detail/sol-detail.component';
import { SolListComponent } from './sol-list/sol-list.component';
import { SolWindRoseComponent } from './sol-wind-rose/sol-wind-rose.component';
import { SolHomePageComponent } from './sol-home-page/sol-home-page.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SolEvolPageComponent } from './sol-evol-page/sol-evol-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SolDetailComponent,
    SolListComponent,
    SolWindRoseComponent,
    SolHomePageComponent,
    SolEvolPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgApexchartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
