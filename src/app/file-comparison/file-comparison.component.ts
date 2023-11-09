import { Component, OnInit } from '@angular/core';
import {Project} from "../model/project.model";
import {HttpClient} from "@angular/common/http";
import {FarmerChanges} from "../model/farmer-changes.model";

@Component({
  selector: 'app-file-comparison',
  templateUrl: './file-comparison.component.html',
  styleUrls: ['./file-comparison.component.css']
})
export class FileComparisonComponent implements OnInit {

  project: string = '';
  audit: string = '';
  projects: Project[] = [];
  private proId: any;
  auditPlans: any = [];
  newFarmersList : any = [];
  oldFarmersList : FarmerChanges[] = [];

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }
  farmlists: any = [];
  submitForm() {
    this.newFarmersList = [];
    this.oldFarmersList = [];
    if (this.project != '' && this.audit != '') {
      console.log('audit id',this.audit)
      console.log('project id',this.proId)
      this.http
        .get<any>(`http://localhost:8080/api/farmerlist/v1/getFarmList?proId=${this.proId}&auditId=${this.audit}`)
        .subscribe(
          (response) => {
            this.farmlists = response;
            response.forEach((r : any) =>{
              if (r.isNew == 1){
                this.newFarmersList.push(r);
              }else{
                // const chngCropdata = JSON.parse( r.chngCropdata);
                // const chngFarmdata = JSON.parse( r.chngFarmdata);
                let obj = {
                  unitNoEUJAS : r.unitNoEUJAS,
                  farCodeEUJAS : r.farCodeEUJAS,
                  farmerName : r.farmerName,
                  chngCropdata : r.chngCropdata,
                  chngFarmdata : r.chngFarmdata
                }
                this.oldFarmersList.push(obj);
              }
            })
            console.log(this.newFarmersList);
            console.log(this.oldFarmersList);
            // @ts-ignore
          },
          (error) => {
            let err = "";
            console.error(error)
          }
        );
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
      console.log(this.proId)
      this.getAudits(this.proId);
    }
  }
  getAudits(proid: number) {
    console.log("get audits plans for : "+proid)
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
