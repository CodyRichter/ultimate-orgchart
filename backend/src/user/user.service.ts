import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './user.model';
import { Model } from 'mongoose'

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) {}

    async insertUser(user: UserInterface) {
        const newUser = new this.userModel(user);
        const result = await newUser.save();
        console.log('inserting new user:', result)
        return result as UserInterface;
    }

    async getAllUsers() {
        const result = await this.userModel.find().exec();
        console.log('got all users:', result);
        return result as UserInterface[];
    }
}
