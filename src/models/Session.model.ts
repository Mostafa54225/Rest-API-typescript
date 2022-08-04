import mongoose from "mongoose"
import { IUser } from "./User.model"


export interface ISession extends mongoose.Document {
    userId: IUser["_id"],
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
}

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, {timestamps: true})


const SessionModel = mongoose.model<ISession>('Session', sessionSchema)


export default SessionModel
