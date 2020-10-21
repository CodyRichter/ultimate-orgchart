import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController { 
    constructor(private readonly projectService:ProjectService){}


    @Post('create')
    async createProject(@Body()project:Project )
    {
        return await this.projectService.createProject(project);
    }

    
    @Get('all')
    async getAllprojects():Promise<Project[]>
    {
        return await this.projectService.getAllProjects();
    }

     @Get(':projectId')
     async getProject(@Param("projectId")projectId:number):Promise<Project>
     {
         return await this.projectService.getProject(projectId);
     }


    





}






