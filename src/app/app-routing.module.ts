import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "path";
import {FileUploaderComponent} from "./file-uploader/file-uploader.component";
import {FileComparisonComponent} from "./file-comparison/file-comparison.component";

const routes: Routes = [
  {path: '/file-upload', component: FileUploaderComponent},
  {path: '/farmer-comparison', component: FileComparisonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
