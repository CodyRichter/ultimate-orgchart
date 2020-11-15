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

  //change pwd
  async changePwd(employeeAuth:EmployeeAuth,newPassword:any):Promise<void>
  {
      //find the employee from database
      //we don't need to validate their validation because there will be a guard in controller
      const savedemployeeAuth=await this.employeeAuthModel.findOne({employeeAuth}).exec();
     
      //encrypt the new password
      savedemployeeAuth.password=await bcrypt.hash(newPassword.password,10);
  
      //save in database
      await savedemployeeAuth.save();

      return 
  }


  

    

}
