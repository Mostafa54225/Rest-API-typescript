import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AnyZodObject } from "zod";


const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {

    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        })
    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }
}

export default validate