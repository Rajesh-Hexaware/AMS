import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportproductRoutingModule } from './importproduct-routing.module';
import { ImportproductComponent } from './importproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImportproductComponent
  ],
  imports: [
    CommonModule,
    ImportproductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImportproductModule { }
