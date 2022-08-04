import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import config from 'config'
import { NextFunction } from "express"


export interface IUser extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    const user = this
    if(!user.isModified("password")) return next()

    const salt = await bcrypt.genSalt(config.get('saltRounds'))
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash
    return next()

})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const user = this
    return await bcrypt.compare(password, user.password)
}

const UserModel = mongoose.model<IUser>('User', userSchema)


export default UserModel
