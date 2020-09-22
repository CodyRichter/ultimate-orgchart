import * as mongoose from 'mongoose';

export interface UserInterface {
    id?: number,
    firstName: string,
    lastName: string,
    companyId: number,
    password: string,
    positionTitle: string,
    companyName: string,
    isManager: boolean,
    employeeId: number,
    managerId: number,
    email: string,
    startDate: Date,
}

export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    companyId: Number,
    password: String,
    positionTitle: String,
    companyName: String,
    isManager: Boolean,
    employeeId: Number,
    managerId: Number,
    email: String,
    startDate: Date,
})