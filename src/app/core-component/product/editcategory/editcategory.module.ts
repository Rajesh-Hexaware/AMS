import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditcategoryRoutingModule } from './editcategory-routing.module';
import { EditcategoryComponent } from './editcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditcategoryComponent
  ],
  imports: [
    CommonModule,
    EditcategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditcategoryModule { }
