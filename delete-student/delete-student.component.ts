import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../service/student.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Student} from "../../model/student";

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {  id: any
  constructor(private studentService:StudentService, private activatedRoute : ActivatedRoute, private router : Router) { }
  student: Student = {
    id: 0,
    name: "",
    description: "",
    action:""

  }
  ngOnInit(): void {
    this.getStudent()
  }

  getStudent() {
    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get("id"); // Lấy id từ URL
      // @ts-ignore

      this.studentService.getStudent(this.id).subscribe(data => {
        this.student = data
        // @ts-ignore
      }, error => {
        console.log(error)
      })
    })
  }

  delete() {
    this.studentService.deleteStudent(this.student.id).subscribe(() => {
      this.router.navigate([""])
    })
  }
}
