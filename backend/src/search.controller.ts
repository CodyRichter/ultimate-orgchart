import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Patch, Delete, Param, Response, Query } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.model';
import { EmployeeAuth } from './auth/auth.model';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { Roles } from './auth/guards/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './enums/roles.enum';
import { User } from './auth/guards/user.decorator';
import { Project } from "./project/project.model";
import { ProjectsEmployee } from "./project/projectsEmployee.model";

//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("search")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SearchController {
  constructor(
    private readonly employeeService: EmployeeService,
    @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
    @InjectModel(Project) private readonly projectModel: ReturnModelType<typeof Project>,
    @InjectModel(ProjectsEmployee) private readonly projectsEmployeeModel: ReturnModelType<typeof ProjectsEmployee>

  ) { }

  // general search query (LIKE)
  @Post()
  async generalSearch(@Query() query: any): Promise<Employee[]> {

    //var query = {$or:[{firstName:{$regex: req.body.customerName, $options: 'i'}},{lastName:{$regex: req.body.customerName, $options: 'i'}}]}
    let queri = {}
    if (query) {
      queri = { $or: [{ firstName: { $regex: '.*' + query + '.*', $options: 'i' } }, 
              { lastName: { $regex: '.*' + query + '.*', $options: 'i' } },
              { positionTitle: { $regex: '.*' + query + '.*', $options: 'i' } },
              { email: { $regex: '.*' + query + '.*', $options: 'i' } },
            ] }
    } else {
      return
    }

    let employeeMatches = {}
    this.employeeModel.find(queri, function (err, data) {
      if (err) {
        console.log(err);
      }
      employeeMatches = data;
    });

    queri = { $or: [{ name: { $regex: '.*' + query + '.*', $options: 'i' } }, 
              { description: { $regex: '.*' + query + '.*', $options: 'i' } }
            ] }
    let projectMatches = {}
    this.projectModel.find(queri, function (err, data) {
      if (err) {
        console.log(err);
      }
      projectMatches = data;
    });

    const returnMatches = {employeeMatches, projectMatches};
  }
}
