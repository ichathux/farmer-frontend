import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { SampleFileUploaderComponent } from './sample-file-uploader/sample-file-uploader.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, FileUploaderComponent, SampleFileUploaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
