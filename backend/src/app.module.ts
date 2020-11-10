import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SearchController } from './search.controller'
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    ManagerModule, 
    ProjectModule, 
    EmployeeModule, AuthModule, NotificationModule
  ],
  controllers: [AppController, SearchController],
  providers: [AppService],
})
export class AppModule {}
