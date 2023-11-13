import {Injectable} from '@angular/core';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = 'http://localhost:8080/api/file/v1/upload';

  constructor(private http: HttpClient) {
  }

  uploadFileWithParams(file: File,
                       proId: string,
                       auditId: string,
                       proName: string,
                       projectID: string): Observable<HttpEvent<any>> {
    console.log("starting")
    console.log("proId : ", proId)
    console.log("auditId : ", auditId)
    console.log("proName : ", proName)
    console.log("projectID : ", projectID)
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectID);
    formData.append('project_name', proName);
    formData.append('audit', auditId);
    formData.append('proId', proId);

    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      reportProgress: true // enable progress tracking
    });

    return this.http.request(req);
  }

  upload(file: File,
         proId: string,
         auditId: string,
         proName: string,
         projectID: string): Observable<HttpEvent<any>> {


    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectID);
    formData.append('project_name', proName);
    formData.append('audit', auditId);
    formData.append('proId', proId);

    // const req = new HttpRequest('POST', this.uploadUrl, formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // });
    //
    // return this.http.request(req);

    return this.http.post<string[]>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });

  }
}
