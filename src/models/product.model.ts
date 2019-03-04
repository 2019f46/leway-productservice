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
    category?: ICategory[];
}

export interface ICategories extends Document {
    categories: ICategory[];
}

export const ProductSchema: Schema = new Schema({
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

export const CategorySchema: Schema = new Schema({
    products: {
        type: [ProductSchema],
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
    category: {
        type: [],
        required: false
    }
});

export const CategoriesSchema: Schema = new Schema({
    categories: {
        type: [CategorySchema],
        required: true
    }

});

export const Categories: Model<ICategories> = model<ICategories>("Categories", CategoriesSchema);
