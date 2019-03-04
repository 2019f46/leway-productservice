import { Request, Response, Router } from 'express';
import { Categories, ICategory } from '../models/product.model';


class ProductController {
    public productRouter: Router;

    constructor() {
        this.productRouter = Router();
        this.route();
    }

    // public saveProducts(req: Request, res: Response, next) {

    //     let data = {
    //         categories: [
    //             {
    //                 name: "Junkie Products",
    //                 leaf: true,
    //                 products: [
    //                     {
    //                         image: "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
    //                         id: "3",
    //                         name: "cofee",
    //                         quantity: "500",
    //                         price: "600",
    //                         description: "goodness",
    //                     },
    //                 ]
    //             },
    //             {
    //                 name: "Cow Products",
    //                 leaf: false,
    //                 category: [{
    //                     name: "Grandparent Cow",
    //                     leaf: false,
    //                     category: [{
    //                         name: "Parent Cow",
    //                         leaf: false,
    //                         category: [{
    //                             name: "Child Cow",
    //                             leaf: true,
    //                             products: [
    //                                 {
    //                                     image: "https://cdn.shopify.com/s/files/1/0206/9470/products/southcoast-milk-1l_1024x1024.jpg?v=1494139427",
    //                                     id: "47",
    //                                     name: "Milk",
    //                                     quantity: "700",
    //                                     price: "5",
    //                                     description: "Its white",
    //                                 },
    //                                 {
    //                                     image: "https://7gigzxopz0uiqxo1-zippykid.netdna-ssl.com/wp-content/uploads/2015/08/cheese.jpg",
    //                                     id: "15",
    //                                     name: "Cheese",
    //                                     quantity: "100",
    //                                     price: "25",
    //                                     description: "It be smelly",
    //                                 }
    //                             ]
    //                         }]
    //                     }]
    //                 }]
    //             }
    //         ]
    //     };
    //     Categories.create(data).then(prod => {
    //         prod.save();
    //         res.send(200);
    //     });

    // }

    public getProduct(req: Request, res: Response, next) {
        let searchValue = req.params.product;

        let returnvalue: any[];
        Categories.find({}, (err: any, data) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                searchCategories(data[1].categories);
                res.send(returnvalue);
            }
        });



        let searchCategories = function (categories: ICategory[]) {
            for (let i = 0; i < categories.length; i++) {
                let current = categories[i];
                let isLeaf = current.leaf;

                if (current.products && isLeaf) {
                    let containsResult = current.products.filter(product => product.name === searchValue).length > 0;
                    if (containsResult) {
                        returnvalue = current.products;
                        return;
                    } else {
                        searchCategories(current.category);
                    }
                } else {
                    searchCategories(current.category);
                }
            }
        }
    }


    public route() {
        // this.productRouter.get('/save', this.saveProducts);
        this.productRouter.get('/get/:product', this.getProduct);
    }
}

export default new ProductController().productRouter;