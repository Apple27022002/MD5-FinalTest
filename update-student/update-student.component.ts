import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
  id: new FormControl(0),
  name: new FormControl(''),
  action: new FormControl(''),
  description: new FormControl(''),
})
  obj: any;

  constructor(private studentService: StudentService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })


  }

  findById(id: any) {
    this.studentService.findStudentById(id).subscribe((data) => {
      console.log(data);
      this.studentForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        description: new FormControl(data.description),
        action: new FormControl(data.action)
      })
    })
  }

  save() {
    this.obj = {
      name: this.studentForm.value.name,
      description: this.studentForm.value.description,
      action: this.studentForm.value.action,
    }
    console.log(this.obj)
    this.studentService.updateStudent(this.studentForm.value.id, this.obj).subscribe((data) => {
      console.log(data)
      alert("Update succes!")
      this.studentForm.reset()
      this.router.navigate([''])
    }, error => {
      alert("Can't update")
      console.log(error)
    })
  }

}
