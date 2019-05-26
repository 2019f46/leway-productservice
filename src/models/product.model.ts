import { Document, Model, model, Schema } from "mongoose";

/** Product model interface
 * Is used to represent the products on the API, not necaserily in the database
 */
export interface IProduct extends Document {
    /** Identifyer */
    id: string;
    /** URL to an image */
    image: string;
    /** Product name */
    name: string;
    /** Amounts of product in the store */
    quantity: string;
    /** Product description */
    description: string;
    /** Product price */
    price: string;
}

/** Category model interface
 * Is used to navigate categories in the data
 * A category can be either a leaf or not.
 * A leaf category has a list of products
 * A non-leaf category has a list of categories.
 */
export interface ICategory extends Document {
    /** Leaf stats, true or false */
    leaf?: boolean;
    /** Category name */
    name: string;
    /** List of products, empty if non-leaf */
    products?: IProduct[];
    /** List of categories, empty if leaf */
    categories?: ICategory[];
}

/** Categories model interface
 * Used as the root category.
 */
export interface ICategories extends Document {
    /** List of categories */
    categories: ICategory[];
}

/** Product model interface
 * Describes the model of a product */
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

/** Category model interface
 * Is used to navigate categories in the data
 * A category can be either a leaf or not.
 * A leaf category has a list of products
 * A non-leaf category has a list of categories.
 */
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

/**Categories Schema - which is a list of categories */
export const Catgories: Schema = new Schema({
    categories: {
        type: [Category],
        required: true
    }

});

export const Categories: Model<ICategories> = model<ICategories>("Categories", Catgories);
