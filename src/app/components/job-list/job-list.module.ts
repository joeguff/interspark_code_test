import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListRoutingModule } from './job-list-routing.module';
import { JobListComponent } from './job-list.component';

@NgModule({
  declarations: [JobListComponent],
  imports: [
    CommonModule,
    JobListRoutingModule
  ]
})
export class JobListModule { }
