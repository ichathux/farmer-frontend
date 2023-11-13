import { Component, OnInit } from '@angular/core';
import {Project} from "../model/project.model";
import {HttpClient} from "@angular/common/http";
import {FarmerChanges} from "../model/farmer-changes.model";
import {AuditModel} from "../model/audit.model";

@Component({
  selector: 'app-file-comparison',
  templateUrl: './file-comparison.component.html',
  styleUrls: ['./file-comparison.component.css']
})
export class FileComparisonComponent implements OnInit {

  project: string = '';
  audit: any ;
  projects: Project[] = [];
  private proId: any;
  auditPlans: AuditModel[] = [];
  newFarmersList : any = [];
  oldFarmersList : FarmerChanges[] = [];
  farmerlist_deleted : any = [];

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
            this.getDeletedFarmerList()
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
  getDeletedFarmerList(){
    this.http.get<any>(`http://localhost:8080/api/deleted_farmers/v1/getDeletedList?proId=${this.proId}&auditId=${this.audit}`)
      .subscribe(response => {
        console.log(response)
        this.farmerlist_deleted = response;
        // console.log(this.projects)
      });
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
    this.http.get<any>(`http://localhost:8080/api/audit/v1/getAuditPlansByProId?proId=${this.proId}`)
      .subscribe(audits => {
        this.auditPlans = audits
        console.log(audits)
      });
  }

  auditObject : AuditModel | undefined ;
  isCertified : boolean = true;
  onAuditOptionSelected() {
    // const pro = this.auditPlans.find(a => a.planId === this.audit)
    let auditObject = this.auditPlans.find(a => a.planId == this.audit);
    // @ts-ignore
    this.isCertified = auditObject.certified;
    console.log("selected audit ", this.audit)
    console.log("selected audit ", auditObject)
  }

  certifyFarmerList(){
    if (this.project != '' && this.audit != ''){
      console.log("certify project")
      console.log("project-id : ",this.proId)
      console.log("audit-d : ",this.audit)

      const formData = new FormData();
      formData.append('proID', this.proId);
      formData.append('auditID', this.audit);


      this.http.post(`http://localhost:8080/api/plan/v1/certify`, formData)
        .subscribe(
          (response) => {
          // this.auditPlans = audits
          // console.log(audits)
            alert("done")
        },
          (error)=>{
            alert("error")
            console.error(error)
          },
          () => {
            alert("done")
          });
    }


  }

}
