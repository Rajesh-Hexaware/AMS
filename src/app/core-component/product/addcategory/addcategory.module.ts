import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcategoryRoutingModule } from './addcategory-routing.module';
import { AddcategoryComponent } from './addcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    AddcategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddcategoryModule { }
