import { Body, Controller, Get, Post } from '@nestjs/common';
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



    // @Get(':projectId')
    // async getProject()


    





}






