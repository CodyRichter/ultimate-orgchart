import { Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController { 
    constructor(private readonly projectService:ProjectService){}


    @Post('create')
    async createProject()



    @Get(':projectId')
    async getProject()


    





}






