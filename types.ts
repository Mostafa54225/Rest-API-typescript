import { RequestHandler } from "express";



export type withError<T> = T & {error: string}
export type ExpressHandler<Req, Res> = RequestHandler<
    any,
    Partial<withError<Res>>,
    Partial<Req>,
    any
>