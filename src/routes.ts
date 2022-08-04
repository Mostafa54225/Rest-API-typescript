import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { craeteSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createaUserHandler } from "./controller/user.controller";
import { requireUser } from "./middleware/requireUser";
import validateResource from './middleware/validateResource'
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
function routes(app: Express) {
    app.get('/healthz', (req: Request, res: Response) => res.status(StatusCodes.OK).send({status: 'ok'}));

    app.post('/api/users',validateResource(createUserSchema), createaUserHandler)

    app.post('/api/sessions',validateResource(createSessionSchema), craeteSessionHandler)

    app.get('/api/sessions', getUserSessionsHandler)

    app.delete('/api/sessions', deleteSessionHandler)
}

export default routes;