import { Document, Schema, Model, model } from "mongoose";

export interface IProduct extends Document {
    id: string;
    image: string;
    name: string;
    quantity: string;
    description: string;
    price: string;
}

// If leaf = false, then there are no products
export interface ICategory extends Document {
    leaf?: boolean;
    name: string;
    products?: IProduct[];
    categories?: ICategory[];
}

export interface ICategories extends Document {
    categories: ICategory[];
}

export const Product: Schema = new Schema({
    id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

export const Category: Schema = new Schema({
    products: {
        type: [Product],
        required: false
    },
    leaf: {
        type: Boolean,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [],
        required: false
    }
});

export const Catgories: Schema = new Schema({
    categories: {
        type: [Category],
        required: true
    }

});

export const Categories: Model<ICategories> = model<ICategories>("Categories", Catgories);
