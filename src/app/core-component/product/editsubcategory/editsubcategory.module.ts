import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditsubcategoryRoutingModule } from './editsubcategory-routing.module';
import { EditsubcategoryComponent } from './editsubcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditsubcategoryComponent
  ],
  imports: [
    CommonModule,
    EditsubcategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditsubcategoryModule { }
