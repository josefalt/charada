import { CharadaComponent } from './charada/charada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'charada', component: CharadaComponent },
  { path: 'charada/:id', component: CharadaComponent },
  { path: '',   redirectTo: '/charada', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
