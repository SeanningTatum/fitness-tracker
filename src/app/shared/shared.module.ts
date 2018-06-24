import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const array = [
  CommonModule,
  FormsModule,
  MaterialModule,
  FlexLayoutModule
];

@NgModule({
  imports: [array],
  exports: [array]
})
export class SharedModule { }
