import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditproductRoutingModule } from './editproduct-routing.module';
import { EditproductComponent } from './editproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditproductComponent
  ],
  imports: [
    CommonModule,
    EditproductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditproductModule { }
