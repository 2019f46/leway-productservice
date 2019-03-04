import { Request, Response, Router } from 'express';
import { Categories, ICategories, ICategory } from '../models/product.model';


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
    //                     name: "Milky Products",
    //                     leaf: true,
    //                     products: [
    //                         {
    //                             image: "https://cdn.shopify.com/s/files/1/0206/9470/products/southcoast-milk-1l_1024x1024.jpg?v=1494139427",
    //                             id: "47",
    //                             name: "Milk",
    //                             quantity: "700",
    //                             price: "5",
    //                             description: "Its white",
    //                         }
    //                     ]
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
        Categories.find({}, (err: any, data) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                data[0].categories.forEach(dat => {
                    if (dat.leaf === true && dat.products && dat.products.find(item => item.name === req.params.product)) {
                        res.send(dat.products).send();
                    }
                });

                res.json(data[0]).send(); // So far, always at place 0
            }
        });

    }

    public route() {
        // this.productRouter.get('/save', this.saveProducts);
        this.productRouter.get('/get/:product', this.getProduct);
    }
}

export default new ProductController().productRouter;