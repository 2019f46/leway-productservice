import { Request, Response, Router } from "express";
import { Categories, ICategory, Category } from "../models/product.model";

/**
 * The product controller that will serve the endpoint /api/product
 * Will search for the product in the list, and return anything that looks like it
 * 
 */
class ProductController {
  public productRouter: Router;

  private query: any;
  private returnvalue: any[];

  public constructor() {
    this.productRouter = Router();
    this.route();
    this.query = "default";
    this.returnvalue = [];
  }

  private searchCategories(categories: ICategory[]) {
    for (const category of categories) {

      if (category.name && category.name.toLowerCase().includes(this.query.toLowerCase())) {
        console.log("Calling addFull from searchCat");
        this.addFullCategory([category]);
      } 
      else if (category.leaf) {
        let Result =
          category.products.filter(product =>
            product.name.toLowerCase().includes(this.query.toLowerCase())
          );
        if (Result) {
          for(let product of Result)
          this.returnvalue.push(product);
        }
      } 
      else {
        this.searchCategories(category.categories);
      }
    }
  }

  private addFullCategory(categories: ICategory[]) {
    for (let category of categories) {
      
      if (category.leaf && category.products) {
        for(let product of category.products){
          this.returnvalue.push(product);
        }
      } 
      else if (category.categories) {
        this.addFullCategory(category.categories);
      }
    }
  };
  
  public getProduct(req: Request, res: Response, next) {
    this.query = req.params.product;

    Categories.find({}, (err: any, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        this.searchCategories(data as ICategory[]);
        
        if(!this.returnvalue){
          res.sendStatus(404);
        }

        res.send(this.returnvalue);
      }

      // RESET
      this.query = "default";
      this.returnvalue = [];
    });
  }

  public route() {
    this.productRouter.get("/:product", this.getProduct.bind(this));
  }
}

export default new ProductController().productRouter;
