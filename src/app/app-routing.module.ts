import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: '/chart', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
