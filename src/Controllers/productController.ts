import { Request, Response, Router } from "express";
import { Categories, ICategory, Category } from "../models/product.model";

/**
 * The product controller that will serve the endpoint /api/product
 * Will search for the product in the list, and return anything that looks like it
 * 
 */
export class ProductController {
  public productRouter: Router;

  constructor() {
    this.productRouter = Router();
    this.route();
  }

  public getProduct(req: Request, res: Response, next) {
    let query = req.params.product;

    let returnvalue: any[];
    Categories.find({}, (err: any, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        searchCategories(data[1].categories);
        
        if(!returnvalue){
          res.sendStatus(404);
        }

        res.send(returnvalue);
      }
    });

    let searchCategories = function(categories: ICategory[]) {
      for (const category of categories) {
        
        if (category.name.toLowerCase().includes(query.toLowerCase())) {
          addFullCategory([category]);
        } 
        else if (category.leaf) {
          let containsResult =
            category.products.filter(product =>
              product.name.toLowerCase().includes(query.toLowerCase())
            ).length > 0;
          if (containsResult) {
            returnvalue.push(containsResult);
          }
        } 
        else {
          searchCategories(category.categories);
        }
      }
    };

    let addFullCategory = function(categories: ICategory[]) {
      for (let category of categories) {
        
        if (category.leaf && category.products) {
          returnvalue.push(category.products);
        } 
        else if (category.categories) {
          addFullCategory(category.categories);
        }
      }
    };
  }

  public route() {
    this.productRouter.get("/:product", this.getProduct);
  }
}

export default new ProductController().productRouter;
