import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { CarsRoutingModule } from './cars-routing.module';
import { DataService } from '../../core/services/data.service';
import { FilterService } from '../../core/services/filter.service';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    CarsRoutingModule,
    SharedModule
  ],
  declarations: [CarsRoutingModule.components],
  providers: [
    DataService,
    FilterService 
  ]
})
export class CarsModule { }