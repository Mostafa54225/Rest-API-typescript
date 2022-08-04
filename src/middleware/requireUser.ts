import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if(!user) { 
        return res.status(StatusCodes.FORBIDDEN)
    }
    return next()
}