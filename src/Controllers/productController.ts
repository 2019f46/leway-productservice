import { Request, Response, Router } from 'express';
import { Products } from '../models/product.model';

class ProductController {
    public productRouter: Router;

    constructor() {
        this.productRouter = Router();
        this.route();
    }

    public getProduct(req: Request, res: Response, next) {
        let json;


        let product = Products.create(json).then(prod => {
            prod.save();
        });

        res.send(200);
    }

    public route() {
        this.productRouter.get('/', this.getProduct);
    }
}

export default new ProductController().productRouter;