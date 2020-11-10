import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Patch, Delete, Param, Response, Query } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { Employee } from './employee/employee.model';
import { ReturnModelType } from "@typegoose/typegoose";
import { EmployeeAuth } from './auth/auth.model';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import * as multer from 'multer';
import { Roles } from './auth/guards/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './enums/roles.enum';
import { User } from './auth/guards/user.decorator';
import { Project } from './project/project.model';
import { ProjectService } from './project/project.service';
import { ProjectsEmployee } from './project/projectsEmployee.model';



//this is controller-scoped guard which guarantee the endpoint is protected 
@Controller("search")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SearchController {
  constructor(
    private readonly employeeService: EmployeeService, private readonly projectService:ProjectService
    // @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>,
    // @InjectModel(Project) private readonly projectModel: ReturnModelType<typeof Project>,
    // @InjectModel(ProjectsEmployee) private readonly projectsEmployeeModel: ReturnModelType<typeof ProjectsEmployee>

  ) { }

  // general search query (LIKE)
  @Get()
  async generalSearch(@Query('query') query: string): Promise<{employees: Employee[], projects: Project[]}> {


    const employeeMatches = await this.employeeService.generalSearch(query);
    const projectMatches = await this.projectService.generalSearch(query);

    return {employees: employeeMatches, projects: projectMatches};

  }
}
