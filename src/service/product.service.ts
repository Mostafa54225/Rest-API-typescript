
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { IProduct } from "../models/Product.model";

export async function createProduct(input: DocumentDefinition<Omit<IProduct, 'createdAt' | 'updatedAt'>>): Promise<IProduct> {
    return await ProductModel.create(input)
}

export async function getProduct(query: FilterQuery<IProduct>, options: QueryOptions = {lean: true}) {
    return await ProductModel.findOne(query)

}

export async function updateProduct(query: FilterQuery<IProduct>, update: UpdateQuery<IProduct>, options: QueryOptions) {
    return await ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProduct(query: FilterQuery<IProduct>) {
    return await ProductModel.findOneAndDelete(query)
}