import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './component/public/main-page/main-page.component';
import { DetailsMeubleComponent } from './component/public/details-meuble/details-meuble.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details-meuble/:nom', component: DetailsMeubleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
