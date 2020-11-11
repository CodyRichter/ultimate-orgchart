import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Employee } from 'src/app/models';

import { Project } from 'src/app/models'
import { ProjectService } from 'src/app/services/project.service'
import { ProjectsEmployee } from 'src/app/models';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {

  selectedProjectName: string;
  selectedProjectDescription: string;

  constructor (private readonly projectService: ProjectService, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  async createProj(): Promise<void> {

    const id = Math.random();
    let projEmployee = {
      _id: id,
      employee: await this.authService.getProfile(),
      project: null,
      role: "Project Manager",
      createdAt: new Date(),
      updatedAt: new Date()
    };


    const project = {
      _id: Math.random(),
      name: this.selectedProjectName,
      description: this.selectedProjectDescription,
      manager: projEmployee,
      employees: <ProjectsEmployee[]>[]
    };
    console.log(project);
    console.log(await this.projectService.createProject(project))

  }

}
