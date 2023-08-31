import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';

@NgModule({
  declarations: [JobListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: JobListComponent }])]
})
export class JobsModule { }
