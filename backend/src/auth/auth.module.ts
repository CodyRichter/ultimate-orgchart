import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule} from '@nestjs/config';
import { CreatedAdmin, EmployeeAuth } from './auth.model';
import {JwtStrategy} from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EmployeeModule } from 'src/employee/employee.module';
import { RefreshJwtStrategy } from './strategies/refresh-auth.strategy';
import { Employee } from 'src/employee/employee.model';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forFeature([EmployeeAuth,Employee,CreatedAdmin]),
    PassportModule,
    EmployeeModule,
    JwtModule.register(
      {
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'5m'},
        
      })
],

  providers: [AuthService,LocalStrategy,JwtStrategy,RefreshJwtStrategy],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
