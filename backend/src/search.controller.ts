import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFile, Patch, Delete, Param, Response, Request, Query } from '@nestjs/common';
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
  async generalSearch(@Request() req, @Query('query') query: string, @Query('skip') skip: number, @Query('limit') limit: number): Promise<any>{//Promise<{employees: Employee[], projects: Project[]}> {

    if(isNaN(skip)){
      skip = 0;
    } else{
      skip = Number(skip)
    }
    if(isNaN(limit)){
      limit = 10;
    } else{
      limit = Number(limit)
    }

    let nextEmployeeURL = req.headers.host + req.baseUrl + `/search/employee?query=${query}&limit=${limit}&skip=${skip + limit}`;
    let nextProjectURL = req.headers.host + req.baseUrl + `/search/project?query=${query}&limit=${limit}&skip=${skip + limit}`;
    let prevSkip = skip - limit;
    if(prevSkip < 0 && skip !== 0){
      prevSkip = 0;
  
    }
    let prevEmployeeURL = req.headers.host + req.baseUrl + `/search/employee?query=${query}&limit=${limit}&skip=${prevSkip}`;
    let prevProjectURL = req.headers.host + req.baseUrl + `/search/project?query=${query}&limit=${limit}&skip=${prevSkip}`;

    if (skip === 0) {
      prevEmployeeURL = undefined;
      prevProjectURL = undefined;
    }

    const employeeMatches = await this.employeeService.generalSearch(query, skip, limit);
    const projectMatches = await this.projectService.generalSearch(query, skip, limit);

    if(employeeMatches.length < limit){
      nextEmployeeURL = undefined;
    }
    if(projectMatches.length < limit){
      nextProjectURL = undefined;
    }

    return {employees: employeeMatches, projects: projectMatches, nextEmployeeURL, prevEmployeeURL, nextProjectURL, prevProjectURL};
  }

  @Get('employee')
  async generalSearchEmployee(@Request() req, @Query('query') query: string, @Query('skip') skip: number, @Query('limit') limit: number): Promise<any>{//Promise<{employees: Employee[], projects: Project[]}> {

    if(isNaN(skip)){
      skip = 0;
    } else{
      skip = Number(skip)
    }
    if(isNaN(limit)){
      limit = 10;
    } else{
      limit = Number(limit)
    }

    let nextEmployeeURL = req.headers.host + req.baseUrl + `/search/employee?query=${query}&limit=${limit}&skip=${skip + limit}`;
    let prevSkip = skip - limit;
    if(prevSkip < 0 && skip !== 0){
      prevSkip = 0;
  
    }
    let prevEmployeeURL = req.headers.host + req.baseUrl + `/search/employee?query=${query}&limit=${limit}&skip=${prevSkip}`;

    if (skip === 0) {
      prevEmployeeURL = undefined;
    }

    const employeeMatches = await this.employeeService.generalSearch(query, skip, limit);

    if(employeeMatches.length < limit){
      nextEmployeeURL = undefined;
    }

    return {employees: employeeMatches, nextEmployeeURL, prevEmployeeURL};
  }

  @Get('project')
  async generalSearchProject(@Request() req, @Query('query') query: string, @Query('skip') skip: number, @Query('limit') limit: number): Promise<any>{//Promise<{employees: Employee[], projects: Project[]}> {

    if(isNaN(skip)){
      skip = 0;
    } else{
      skip = Number(skip)
    }
    if(isNaN(limit)){
      limit = 10;
    } else{
      limit = Number(limit)
    }

    let nextProjectURL = req.headers.host + req.baseUrl + `/search/project?query=${query}&limit=${limit}&skip=${skip + limit}`;
    let prevSkip = skip - limit;
    if(prevSkip < 0 && skip !== 0){
      prevSkip = 0;
  
    }
    let prevProjectURL = req.headers.host + req.baseUrl + `/search/project?query=${query}&limit=${limit}&skip=${prevSkip}`;

    if (skip === 0) {
      prevProjectURL = undefined;
    }

    const projectMatches = await this.projectService.generalSearch(query, skip, limit);

    if(projectMatches.length < limit){
      nextProjectURL = undefined;
    }

    return {projects: projectMatches, nextProjectURL, prevProjectURL};
  }
}
