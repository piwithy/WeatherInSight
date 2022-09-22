import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolDetailComponent } from './sol-detail/sol-detail.component';
import { SolEvolPageComponent } from './sol-evol-page/sol-evol-page.component';
import { SolHomePageComponent } from './sol-home-page/sol-home-page.component';
import { SolListComponent } from './sol-list/sol-list.component';
import { SolWindRoseComponent } from './sol-wind-rose/sol-wind-rose.component';

const routes: Routes = [
  { path: "", component:SolHomePageComponent },
  { path: "detail/sol/:id", component:SolDetailComponent },
  { path: "wind-rose/sol/:id", component:SolWindRoseComponent },
  { path: "list", component:SolListComponent },
  { path: "evol", component:SolEvolPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
