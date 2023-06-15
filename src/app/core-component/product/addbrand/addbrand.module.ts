import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbrandRoutingModule } from './addbrand-routing.module';
import { AddbrandComponent } from './addbrand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddbrandComponent
  ],
  imports: [
    CommonModule,
    AddbrandRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddbrandModule { }
