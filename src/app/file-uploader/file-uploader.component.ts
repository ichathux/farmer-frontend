import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from "../model/project.model";
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../service/websocket.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {

  @ViewChild('fileUploadForm') form: NgForm | undefined;
  private selectedFile: File | null = null;
  errorList: string[] = [];

  project: string = '';
  audit: string = '';
  projects: Project[] = [];
  private proId: any;
  auditPlans: any = [];

  progress: number = 0;
  private webSocket: WebSocket;
  stock: any = {};
  progressMessage: string = "";
  constructor(private http: HttpClient) {

    // this.webSocket = new WebSocket('ws://localhost:8080/stocks');
    // this.webSocket = new WebSocket('ws://localhost:8080/ws');
    this.webSocket = new WebSocket('ws://localhost:8080/gs-guide-websocket');

    this.webSocket.onmessage = (event) => {
      console.log(event)
      this.stock = JSON.parse(event.data)
      console.log(this.stock)
    };

    // this.webSocket.onmessage = (event) => {
    //   // this.stock = JSON.parse(event.data)
    //   console.log(event.data)
    // };
    // this.webSocketService.receiveMessage().subscribe((response) => {
    //   console.log("message : ",response)
        // if (response.destination === '/topic/upload-progress') {
        //   // Handle the progress message
        //   console.log("recioive")
        //   // this.handleProgressMessage(message.payload);
        // }
      // if (response && response.hasOwnProperty('progress')) {
      //   console.log(response.progress);
      // } else if (response && response.hasOwnProperty('progress')) {
      //   this.progress = response.progress;
      //   console.log(response.progress);
      // } else {
      //   console.error('Invalid WebSocket response format:', response);
      // }
    // },
    //   error => {
    //   console.error("error occurred ",error)
    //   },
    //   () => {
    //     console.log('WebSocket connection closed');
    //   });

  }

  ngOnInit(): void {
    // this.getAllProjects();
  }
  handleProgressMessage(payload: any): void {
    // Update your component's state or perform any actions based on the progress message
    this.progressMessage = `Progress: ${payload.bytesRead} / ${payload.contentLength}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    if (this.selectedFile && this.project != '' && this.audit != '') {

      // console.log('project name',this.projectName)
      // console.log('project code',this.projectIdSelected)
      // console.log('audit id',this.audit)
      // console.log('project id',this.proId)

      formData.append('file', this.selectedFile);
      formData.append('project_id', this.projectIdSelected.toString());
      formData.append('project_name', this.projectName);
      formData.append('audit', this.audit);
      formData.append('proId', this.proId);
      this.errorList = [];
      this.http
        .post('http://localhost:8080/api/upload', formData, {
          reportProgress: true, // enable progress tracking
          observe: 'events'
        })
        // .subscribe(
        //   (response) => {
        //     console.log('File uploaded successfully', response);
        //     // @ts-ignore
        //     this.form.resetForm();
        //   },
        //   (error) => {
        //     let err = "";
        //     console.log(error.error)
        //     error.error.forEach((e: any) => {
        //       err = e.location + " : " + e.error + " : " + ((e.errorValue == null) ? " " : "Error : " + e.errorValue)
        //         + ((e.correctValue == null) ? " " : " Must be correct as : " + e.correctValue);
        //       this.errorList.push(err);
        //       // @ts-ignore
        //       this.form.resetForm()
        //     })
        //   }
        // );
        .subscribe((event: any) => {
          if (event.type === 1) {
            // This is an upload progress event
            const percentDone = Math.round(100 * event.loaded / event.total);
            this.progress = percentDone;
          } else if (event.type === 4 && event.body) {
            // This is the final response after the file has been uploaded
            const response = event.body;
            console.log('File upload complete:', response);
          }
        });
    }
  }


  searchProjects() {
    this.http.get<Project[]>(`http://localhost:8080/api/project/v1/search?name=${this.project}`)
      .subscribe(projects => {
        this.projects = projects
        // console.log(this.projects)
      });
  }

  projectIdSelected: string = "";
  projectName: string = "";

  onProjectOptionSelected() {
    const project = this.projects.find(p => p.proName === this.project);
    if (project) {
      this.projectIdSelected = project.proCode;
      this.projectName = project.proName;
      this.proId = project.id;
      // console.log(this.projectIdSelected)
      this.getAudits(this.proId);
    }
  }

  clearErrors() {
    this.errorList = [];
    // @ts-ignore
    this.form.resetForm()
  }

  getAudits(proid: number) {
    console.log("get audits plans for : ",this.proId)
    this.http.get(`http://localhost:8080/api/audit/v1/getAuditPlansByProId?proId=${this.proId}`)
      .subscribe(audits => {
        this.auditPlans = audits
        // console.log(audits)
      });
  }

  onAuditOptionSelected() {
    console.log("selected audit ", this.audit)
  }
}
