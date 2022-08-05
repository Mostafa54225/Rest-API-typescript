import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../service/product.service";
import log from "../utils/logger";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response ) {
    const userId = res.locals.user._id;
    const body = req.body
    try {
        const product = await createProduct({...body, userId})
        
        return res.status(StatusCodes.CREATED).send(product)
    } catch (error) {
        console.log(`product`)
        log.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId
    const update = req.body

    const product = await getProduct({_id: productId})
    if(!product) return res.status(StatusCodes.NOT_FOUND).send({message: 'Product not found'})
    if(product.userId !== userId) {
        return res.status(StatusCodes.FORBIDDEN).send({message: 'You are not authorized to update this product'})
    }

    const updatedProduct = await updateProduct({_id: productId}, update, {new: true})

    return res.status(StatusCodes.OK).send(updatedProduct)

}

export async function getProductHandler(req: Request<GetProductInput["params"], {}, {}>, res: Response) {
    const productId = req.params.productId
    const product = await getProduct({_id: productId})
    if(!product) {
        return res.status(StatusCodes.NOT_FOUND).send({message: 'Product not found'})
    }
    return res.status(StatusCodes.OK).send(product)
}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"], {}, {}>, res: Response) {
    const userId = res.locals.user._id;
    const productId = req.params.productId

    const product = await getProduct({_id: productId})
    if(!product) return res.status(StatusCodes.NOT_FOUND).send({message: 'Product not found'})
    if(product.userId !== userId) {
        return res.status(StatusCodes.FORBIDDEN).send({message: 'You are not authorized to update this product'})
    }

    await deleteProduct({_id: productId})
    return res.status(StatusCodes.OK).send({message: 'Product deleted'})

}