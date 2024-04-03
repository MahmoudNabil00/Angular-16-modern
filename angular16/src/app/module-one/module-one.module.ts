import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentOneComponent } from './component-one/component-one.component';



@NgModule({
  declarations: [
    ComponentOneComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [ComponentOneComponent]
})
export class ModuleOneModule { }
