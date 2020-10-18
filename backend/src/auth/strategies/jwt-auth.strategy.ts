import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    
    constructor(private readonly employeeService: EmployeeService){

        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET,
        });
            
    }


    async validate(payload: any)
    {
        return await this.employeeService.findEmployeeById(payload.sub);
    }
}
