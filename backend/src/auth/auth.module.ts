import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { EmployeeAuth } from './auth.model';

@Module({
  imports: [TypegooseModule.forFeature([EmployeeAuth])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
