import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilder: FormBuilder, 
    private api: ApiService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.formValue=this.formbuilder.group({
      name : [''],
      gender : [''],
      dateofbirth :[''],
      bloodgroup : [''],
      occupation : [''],
      salary : [''],
      phone : [''],
      address : [''],
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.dateofbirth=this.formValue.value.dateofbirth;
    this.employeeModelObj.bloodgroup=this.formValue.value.bloodgroup;
    this.employeeModelObj.occupation=this.formValue.value.occupation;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.employeeModelObj.phone=this.formValue.value.phone;
    this.employeeModelObj.address=this.formValue.value.address;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe({next: (res)=>{
      console.log(res)
    },
    error: (e)=>{
      console.log(e)
      alert("Error");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    complete: ()=>{
      alert("Employee Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      }
  })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe({next: (res)=>{
      console.log(res)
    },
    error:(e)=>{
      console.log(e)
      alert("Error")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    complete:()=>{
      console.log("Client Deleted!");
      alert("Client Deleted!");
      this.getAllEmployee();
    }})
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['dateofbirth'].setValue(row.dateofbirth);
    this.formValue.controls['bloodgroup'].setValue(row.bloodgroup);
    this.formValue.controls['occupation'].setValue(row.occupation);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['address'].setValue(row.address);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.name= this.formValue.value.name;
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.employeeModelObj.dateofbirth=this.formValue.value.dateofbirth;
    this.employeeModelObj.bloodgroup=this.formValue.value.bloodgroup;
    this.employeeModelObj.occupation=this.formValue.value.occupation;
    this.employeeModelObj.salary=this.formValue.value.salary;
    this.employeeModelObj.phone=this.formValue.value.phone;
    this.employeeModelObj.address=this.formValue.value.address;
    
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe({next: (res)=>{
      console.log(res)
    },
    error: (e)=>{
      console.log(e)
      alert("Error");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    complete: ()=>{
      alert("Employee Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      }
  })
  }

}
