import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubaddcategoryRoutingModule } from './subaddcategory-routing.module';
import { SubaddcategoryComponent } from './subaddcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubaddcategoryComponent
  ],
  imports: [
    CommonModule,
    SubaddcategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubaddcategoryModule { }
