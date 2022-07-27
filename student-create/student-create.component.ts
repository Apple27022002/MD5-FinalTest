import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StudentService} from "../../service/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    action: new FormControl(''),

  });
  obj: any;

  constructor(private studentService: StudentService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.obj = {
      name: this.studentForm.value.name,
      description: this.studentForm.value.description,
      action: this.studentForm.value.action
    }
    console.log(this.obj)
    this.studentService.createStudent(this.obj).subscribe((data) => {
      console.log(data)
      alert("Thanh cong!");
      this.studentForm.reset()
      // this.router.navigate([""])
    }, error => {
      alert("Khong the tao");
      console.log(error)
    })
  }

}
