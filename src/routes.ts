import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function routes(app: Express) {
    app.get('/healthz', (req: Request, res: Response) => res.status(StatusCodes.OK).send({status: 'ok'}));
}

export default routes;