import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Backend:404BrainNotFound@cluster0.qf26c.mongodb.net/backend_tests?retryWrites=true&w=majority'), ManagerModule, ProjectModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
