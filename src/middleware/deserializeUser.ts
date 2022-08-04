import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJWT } from "../utils/jwt.utils";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

    const {access_token, refresh_token} = req.cookies
    if(!access_token) {
        return next()
    }
    const { decoded, valid, expired } = verifyJWT(access_token)

    if(decoded) {
        res.locals.user = decoded
        return next()
    }
    console.log("expired: ", expired)
    if(expired && refresh_token) {
        const newAccessToken = await reIssueAccessToken(refresh_token)
        if(newAccessToken) {
            
            const { decoded } = verifyJWT(newAccessToken)
            res.cookie('access_token', newAccessToken, {
                httpOnly: true})
            res.locals.user = decoded
            return next()
        }

    }
}