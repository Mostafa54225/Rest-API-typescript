import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateSessionInput } from '../schema/session.schema'
import { createSession, getUserSessions, updateSession } from "../service/session.service";
import { validateUserPassword } from "../service/user.service";
import { signJWT } from "../utils/jwt.utils";
import config from 'config'
import SessionModel from "../models/Session.model";

export async function craeteSessionHandler(req: Request<{}, {}, CreateSessionInput["body"]>, res: Response) {
    try {
        const user = await validateUserPassword(req.body)
        const session = await createSession(user._id, req.get("user-agent") || "")


        const accessToken = signJWT (
            { ...user, session: session._id }, 
            { expiresIn: config.get('accessTokenTtl') }
        )

        const refreshToken = signJWT(
            { ...user, session: session._id },
            { expiresIn: config.get('refreshTokenTtl') }
        )

        res.cookie('access_token', accessToken, {
            httpOnly: true
        })
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true
        })

        return res.status(StatusCodes.CREATED).json({accessToken, refreshToken})
    } catch (error: any) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).send(error)
    }
}


export async function getUserSessionsHandler(req: Request, res: Response) {
    
    const user = res.locals.user
    const sessions = await getUserSessions({user: user._id, valid: true})
    return res.status(StatusCodes.OK).json(sessions)
}


export async function deleteSessionHandler(req: Request, res: Response) { // logout
    const sessionId = res.locals.user.session

    await updateSession({_id: sessionId}, {valid: false})
    return res.status(StatusCodes.OK).send({
        access_token: null,
        refresh_token: null
    })
}