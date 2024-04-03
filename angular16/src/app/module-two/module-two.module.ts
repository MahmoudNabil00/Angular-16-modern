import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleTwoRoutingModule } from './module-two-routing.module';
import { ModuleTwoComponent } from './module-two.component';
import { ModuleOneModule } from '../module-one/module-one.module';


@NgModule({
  declarations: [
    ModuleTwoComponent
  ],
  imports: [
    CommonModule,
    ModuleTwoRoutingModule,ModuleOneModule
  ]
})
export class ModuleTwoModule { }
