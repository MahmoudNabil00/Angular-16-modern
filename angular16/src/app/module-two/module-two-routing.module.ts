import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleTwoComponent } from './module-two.component';

const routes: Routes = [{
   path: '', component: ModuleTwoComponent 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleTwoRoutingModule { }
