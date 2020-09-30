import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Employee } from './employee.model';
import { EmployeeAuth } from '../auth/auth.model';
import {JwtStrategy} from '../auth/strategies/jwt-auth.strategy';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
@Module({
  imports: [
    TypegooseModule.forFeature([Employee, EmployeeAuth]),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register(
      {
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'1h'},
      }
    ),
  ],
  providers: [EmployeeService,JwtStrategy],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
