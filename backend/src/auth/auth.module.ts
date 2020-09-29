import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule} from '@nestjs/config';
import { EmployeeAuth } from './auth.model';
import {JwtStrategy} from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { EmployeeModule } from 'src/employee/employee.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forFeature([EmployeeAuth]),
    PassportModule,
    EmployeeModule,
    JwtModule.register(
      {
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'1h'},
      })

],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}
