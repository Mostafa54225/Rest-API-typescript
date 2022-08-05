import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { ISession } from "../models/Session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from 'config'


export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({userId, userAgent})

    return session.toJSON()
}

export async function getUserSessions(query: FilterQuery<ISession>): Promise<ISession> {
    return await SessionModel.find(query).lean()
}

export async function updateSession(query: FilterQuery<ISession>, update: UpdateQuery<ISession>) {
    return await SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken(refresh_token: string): Promise<string> {
    const {decoded} = verifyJWT(refresh_token)
    
    if(!decoded || !get(decoded, 'session')) return Promise.reject('Invalid refresh token')
    const session = await SessionModel.findById(decoded.session)
    if(!session || !session.valid) return Promise.reject('Invalid refresh token')
    
    const user = await findUser({_id: session.userId.toString()})
    if(!user) return Promise.reject('Invalid refresh token')

    const {password, ...otherDetails} = user
    const access_token = signJWT(
        { otherDetails, session: session._id.toString() }, 
        { expiresIn: config.get('accessTokenTtl') }
    )
    return access_token
}