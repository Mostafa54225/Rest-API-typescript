import { ErrorRequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err.issues !== undefined) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: err.issues[0].message})
    }
    if(err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err.message})
}