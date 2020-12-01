import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { CreatedAdmin, EmployeeAuth } from '../auth/auth.model';
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import { Employee } from 'src/employee/employee.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmployeeAuth) private readonly employeeAuthModel: ReturnModelType<typeof EmployeeAuth>
    , @InjectModel(Employee) private readonly employeeModel: ReturnModelType<typeof Employee>, private jwtService: JwtService
    , @InjectModel(CreatedAdmin) private readonly createdAdmin: ReturnModelType<typeof CreatedAdmin>, private readonly employeeService: EmployeeService,

  ) { };


  async createAdmin(): Promise<void> {
    console.log('create admin');
    const isAdmin = await this.createdAdmin.find({}).sort({updatedAt: "desc"}).exec();
    if (isAdmin.length < 1) {
      const admin = await this.employeeService.createEmployee({
        isManager: true, 
        isAdmin: true, 
        firstName: "Admin",
        lastName: "Developer", 
        companyId: 1,
        positionTitle: "Software Engineer",
        companyName: "404 Brain Not Found",
        _id: 404123456789404,
        managerId: null,
        manages: [],
        email: "admin@admin.com", 
        password: "password", 
        startDate: new Date(),
        projects:[],
    });
    console.log(admin);
    await this.createdAdmin.create([{adminCreated: true}]);
    } 
  }


  async signIn(employeeAuth:EmployeeAuth): Promise<any>
  {
      console.log(employeeAuth);
      const payload={email:employeeAuth.email,sub:employeeAuth._id};
      const accessTokenDate=new Date();
      const refreshTokenDate=new Date();
      accessTokenDate.setMinutes(accessTokenDate.getMinutes()+5);
      refreshTokenDate.setHours(refreshTokenDate.getHours() + 24);
      return {
          accessToken:this.jwtService.sign(payload),
          refreshToken:this.jwtService.sign(payload,{expiresIn:'24h',secret:process.env.JWT_SECRET2}),
          accessTokenExpires:accessTokenDate,
          refreshTokenExpires: refreshTokenDate
        
        };
  }

  async refreshToken(employeeAuth:EmployeeAuth)
  {
    const accessTokenDate=new Date();
    accessTokenDate.setMinutes(accessTokenDate.getMinutes()+5);
    const payload={email:employeeAuth.email,sub:employeeAuth._id};
      return {
          accessToken:this.jwtService.sign(payload),
          accessTokenExpires:accessTokenDate,
          };
  }

  //validate the user email and password
  async validateEmployee(email: string, password: string): Promise<EmployeeAuth> {

    const employee = await this.employeeAuthModel.findOne({ email }).exec();

    if (!employee) {
      return null;
    }

    const valid = await bcrypt.compare(password, employee.password);

    if (valid) {
      return employee;
    }

    return null;
  }

  //change pwd
  async changePwd(employeeAuth: EmployeeAuth, passWordInfo: any): Promise<boolean> {
    //find the employee from database
    //we don't need to validate their validation because there will be a guard in controller
    try {
      const savedemployeeAuth = await this.employeeAuthModel.findOne({ employeeAuth }).exec();

    const isPasswordMatching: boolean = await bcrypt.compare(passWordInfo.oldPassword, savedemployeeAuth.password);


    if (!isPasswordMatching) {
      throw new ConflictException('Password does not match');
    }

    //encrypt the new password
    savedemployeeAuth.password = await bcrypt.hash(passWordInfo.newPassword, 10);

    //save in database
    await savedemployeeAuth.save();

    return true;
    } catch (error) {
        throw new ConflictException('Password does not match or not found');
    }
    
  }

  //change email
  async changeEmail(employeeAuth: EmployeeAuth, emailInfo: any): Promise<boolean> {

    const session = await this.employeeAuthModel.db.startSession();

    await session.startTransaction();

    try {
      //find the employeeAuth and employee from database
      const savedEmployeeAuth = await this.employeeAuthModel.findOne({ employeeAuth }).session(session).exec();
      const savedEmployee = await this.employeeModel.findOne({ employeeAuth }).session(session).exec();

      //compare the email if that is correct


      if (savedEmployeeAuth.email !== emailInfo.oldEmail) {
        throw new ConflictException('Email does not match');
      }

      //update the email
      savedEmployeeAuth.email = emailInfo.newEmail;
      savedEmployee.email = emailInfo.newEmail;

      //save to database
      await savedEmployeeAuth.save();
      await savedEmployee.save();

      await session.commitTransaction();

      return true;

    } catch (error) {
      await session.abortTransaction();
      throw new ConflictException('Email does not match or not found');

    } finally {
      session.endSession();
    }
  }






}

/* import { ConflictException, Injectable } from '@nestjs/common';
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


  

    

} */
