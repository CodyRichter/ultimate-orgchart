import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserInterface } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
     
    @Post()
    async addNewUser(@Body() newUser: UserInterface) {
        return await this.userService.insertUser(newUser);
    }

}
