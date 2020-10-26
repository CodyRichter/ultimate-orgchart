import { ConflictException, Injectable } from '@nestjs/common';
import {EmployeeService} from'../employee/employee.service';
import {EmployeeAuth} from '../auth/auth.model';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import * as bcrypt from 'bcrypt';

import {JwtService} from '@nestjs/jwt';
@Injectable()
export class AuthService 
{
    constructor(
    @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>
    ,private jwtService:JwtService
    ){};




  async signIn(employeeAuth:EmployeeAuth)
  {
    
      const payload={email:employeeAuth.email,sub:employeeAuth._id};
      return {
          accessToken:this.jwtService.sign(payload)
      };
  }

  //validate the user email and password
  async validateEmployee(email:string,password:string):Promise<EmployeeAuth>
  {
    
    const employee = await this.employeeAuthModel.findOne({email}).exec();

    if(!employee)
    {
      return null;
    }

    const valid=await bcrypt.compare(password,employee.password);

    if(valid)
    {
      return employee;
    }

    return null;
  }


  

    

}
