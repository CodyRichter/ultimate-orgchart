import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Project } from './project.model';
import { Employee } from 'src/employee/employee.model';
import { ProjectsEmployee } from './projectsEmployee.model';
import { NotificationDoc } from 'src/notification/notification.model';

@Module({
  imports:[TypegooseModule.forFeature([Employee,Project,ProjectsEmployee,NotificationDoc]),],
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
