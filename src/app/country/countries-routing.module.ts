import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'selector',
        component: SelectorPageComponent
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
