import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {FileComparisonComponent} from "./file-comparison/file-comparison.component";
import {HomeComponent} from "./home/home.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'file-upload', component: FileUploadComponent},
  {path: 'farmer-comparison', component: FileComparisonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
