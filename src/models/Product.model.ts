
import mongoose from "mongoose"
import { IUser } from "./User.model"


export interface IProduct extends mongoose.Document {
    userId: IUser["_id"],
    title: string
    description: string
    price: number
    image: string
    createdAt: Date
    updatedAt: Date
}

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, {timestamps: true})


const ProductModel = mongoose.model<IProduct>('Product', productSchema)


export default ProductModel
