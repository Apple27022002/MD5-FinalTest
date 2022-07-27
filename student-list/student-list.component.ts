import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../service/student.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentsList: any;

  constructor(private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.studentService.getAll().subscribe((students) => {
      console.log(students)
      this.studentsList = students;
    }, error => {
      console.log(error)
    });
  }
}

