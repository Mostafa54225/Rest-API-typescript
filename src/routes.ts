import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createaUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";

import validateResource from './middleware/validateResource'
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller'
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";

import { craeteSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
function routes(app: Express) {
    app.get('/healthz', (req: Request, res: Response) => res.status(StatusCodes.OK).send({status: 'ok'}));

    app.post('/api/users',validateResource(createUserSchema), createaUserHandler)

    app.post('/api/sessions',validateResource(createSessionSchema), craeteSessionHandler)

    app.get('/api/sessions', getUserSessionsHandler)

    app.delete('/api/sessions', deleteSessionHandler)


    // products
    app.post('/api/products', validateResource(createProductSchema), createProductHandler)
    app.put('/api/products/:productId', validateResource(updateProductSchema), updateProductHandler)
    app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)
    app.delete('/api/products/:productId', validateResource(deleteProductSchema), deleteProductHandler)
}

export default routes;