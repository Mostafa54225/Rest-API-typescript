import {DocumentDefinition, FilterQuery} from 'mongoose'
import UserModel, { IUser } from '../models/User.model';
import log from '../utils/logger';


export async function createUser(input: DocumentDefinition<Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>>) {
    try {
        return await UserModel.create(input)
    } catch (error: any) {
        log.error(error);
        return Promise.reject(error);
    }
}

export async function validateUserPassword({email, password}: {email: string; password: string}) {
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return Promise.reject('User not found')
        }
        const isValid = await user.comparePassword(password)
        if (!isValid) {
            return Promise.reject('Invalid password')
        }
        const {password: _, ...otherDetails} = user.toJSON();
        return otherDetails;
    } catch (error: any) {
        log.error(error);
        return Promise.reject(error);
    }
}

export async function findUser(query: FilterQuery<IUser>): Promise<IUser> {
    return await UserModel.findOne(query).lean()
}