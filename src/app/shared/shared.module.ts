import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  MaterialModule,
  FormsModule,
  HttpClientModule,
  HammerModule,
  BrowserModule,
  BrowserAnimationsModule,
];

const SERVICES: any[] = [
  {provide: MAT_DATE_LOCALE, useValue: 'en-NG'}
];

const COMPONENTS: any[] = []

const DIRECTIVES: any[] = [];

const PIPES: any[] = [];

const SCHEMAS: any[] = [ CUSTOM_ELEMENTS_SCHEMA ]

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES, ],
  imports: [...MODULES],
  providers: [...SERVICES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  schemas: [...SCHEMAS],
})
export class SharedModule { }
