import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, Response, UseGuards } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { ProjectsEmployee } from './projectsEmployee.model';
import * as multer from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {Role} from '../enums/roles.enum'
import { Roles } from 'src/auth/guards/roles.decorator';
@Controller('project')
@UseGuards(JwtAuthGuard,RolesGuard)
export class ProjectController { 
    constructor(private readonly projectService:ProjectService){}

    
    @Post('create')
    @Roles(Role.ADMIN,Role.MANAGER)
    async createProject(@Body()project:Project )
    {
        return await this.projectService.createProject(project);
    }

    // Creates multiple employees in the db - used only by upload JSON function
  // Guard admin
  @Post('create/multiple')
  @Roles(Role.ADMIN,Role.MANAGER)
  //@Roles(Role.ADMIN, Role.MANAGER)
  async createEmployees(@Body() newProjects: Project[]): Promise<Project[]> {
    return await this.projectService.createProjects(newProjects);
  }

  // Posts a JSON to the backend to be uploaded into the db
  // Guard admin
  @Post('uploadJSON')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage()
  }))
  async uploadSingleFileWithPost(@UploadedFile() file): Promise<Project[]> {
    const data = JSON.parse(file.buffer);
    return await this.projectService.createProjects(data);
  }

    
    @Get('all')
    async getAllprojects():Promise<Project[]>
    {
        return await this.projectService.getAllProjects();
    }

      // returns a single JSON file of the current db status
  @Get("JSON")
  async getJSON(@Response() res): Promise<any> {
    const data = await this.projectService.getAllProjects();
    const date = new Date().toUTCString();

    res.set({
      'Content-Disposition': `attachment; filename="project_data_${date}.json"`,
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });
    res.send(data);
    res.end();
  }

     @Get(':projectId')
     async getProject(@Param("projectId")projectId:number):Promise<Project>
     {
         return await this.projectService.getProject(projectId);
     }

     @Delete(':projectId')
     @Roles(Role.ADMIN,Role.MANAGER)
     async deleteProject(@Param('projectId') projectId:number):Promise<Project>
     {
         return await this.projectService.deleteProject(projectId);
     }

     //update project name or description
     @Patch(':projectId')
     @Roles(Role.ADMIN,Role.MANAGER)
     async updateProject(@Param('projectId') projectId:number, @Body() updatedField:Project):Promise<Project>
     {
          return await this.projectService.updateProjectDetail(projectId,updatedField);
     }
    
      //add employee to the project
      @Patch('addEmployee/:projectId')
      @Roles(Role.ADMIN,Role.MANAGER)
      async addEmployee(@Param('projectId') projectId: number, @Body() employee: ProjectsEmployee[]):Promise<Project>
      {
          return await this.projectService.addProjectEmployee(projectId,employee);
      }

    //  //delete employee from the project
     @Patch('removeEmployee/:projectId')
     @Roles(Role.ADMIN,Role.MANAGER)
     async  deleteEmployee(@Param('projectId') projectId: number,@Body() employee: ProjectsEmployee[]):Promise<Project>
     {
        return await this.projectService.deleteProjectEmployee(projectId,employee);
     }




}






