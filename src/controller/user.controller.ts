import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export async function createaUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next: NextFunction) {

    try {
        const user = await createUser(req.body)
        const {password, ...otherDetails} = user.toObject();
        return res.status(StatusCodes.CREATED).json(otherDetails);
    } catch (error: any) {
        next(error)
    }
}