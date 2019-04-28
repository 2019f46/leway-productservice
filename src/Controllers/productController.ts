import { Request, Response, Router } from "express";
import { Categories, ICategory, Category, ICategories, IProduct} from "../models/product.model";

/**
 * The product controller that will serve the endpoint /api/product
 * Will search for the product in the list, and return anything that matches
 * either product- or category name
 */
class ProductController {
  /** Router */
  public productRouter: Router;

  /** Variable used to save the query */
  private query: any;
  /** Variable used to store the return value */
  private returnvalue: any[];
  /** Variable used to hold products found by ID */
  private productsByID: IProduct[];

  public constructor() {
    this.productRouter = Router();
    this.route();
    this.query = "default";
    this.returnvalue = [];
  }

  /** 
   * Will go through a list of categories and match the name to query
   * If its a match, it will add all sub-categories and products
   * If the category does not match and is a leaf, it will match product names
   *    and add to returnvalue if it matches
   * If its not a leaf category, it will recursively call this method again with
   *    the next set of categories.
   * @param categories a list of categories
   */
  private searchCategories(categories: ICategory[]) {
    for (const category of categories) {

      if (category.name && category.name.toLowerCase().includes(this.query.toLowerCase())) {
        this.addFullCategory([category]);
      }
      else if (category.leaf) {
        let Result =
          category.products.filter(product =>
            product.name.toLowerCase().includes(this.query.toLowerCase())
          );
        if (Result) {
          for (let product of Result)
            this.returnvalue.push(product);
        }
      }
      else {
        this.searchCategories(category.categories);
      }
    }
  }

  /**
   * Will go through a list of categories
   * and add all products in it's category tree
   * @param categories a list of categories
   */
  private addFullCategory(categories: ICategory[]) {
    for (let category of categories) {

      if (category.leaf && category.products) {
        for (let product of category.products) {
          this.returnvalue.push(product);
        }
      }
      else if (category.categories) {
        this.addFullCategory(category.categories);
      }
    }
  };


  private findProductsByID(categories: ICategory[], Ids: string[]){
    for(let category of categories) {
      if(category.leaf && category.products){
        for (let product of category.products){
          if(product.id in Ids){
            this.productsByID.push(product);
          }
        }
      }
      else{
        this.findProductsByID(category.categories, Ids); 
      }
    }
  }

  /**
   * Get Products maps to GET /api/products/:query
   * @param req The product query as URL parameter
   * @param res Will contain a list of products matching the query
   * @param next Not used
   */
  public getProduct(req: Request, res: Response, next) {
    this.query = req.params.product;

    Categories.find({}, (err: any, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        this.searchCategories(data as ICategory[]);

        if (this.returnvalue.length < 1) {
          res.sendStatus(404);
        } else {
          res.status(200).send(this.returnvalue);
        }
      }

      // RESET
      this.query = "default";
      this.returnvalue = [];
    });
  }

  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  public getByProductByIDs(req: Request, res: Response, next){
    let Ids: string[] = JSON.parse(req.query.ids);

    /** FIND EVERYTHING
     * Our datastructure is a complex tree of elements with lists of themselves.
     * This makes it difficult to use mongoose queries.
     * Thefore we get everything to search ourselves.
     */
    Categories.find({}, (err: any, data) => {
      if(err){
        res.status(500).send(err);
      } else {
        if(data.length < 1){
          res.sendStatus(404);
        } else {
          
          // Recursively search for product with Ids
          this.findProductsByID(data as ICategory[], Ids);

          if(this.productsByID.length < 1){
            res.sendStatus(404);
          } else{
            res.status(200).send(this.productsByID);
          }

          // RESET
          this.productsByID = [];
        }
      }
    })
  }

  /** Sets up route for GET */
  public route() {
    this.productRouter.get("/:product", this.getProduct.bind(this));
    this.productRouter.get("", this.getByProductByIDs.bind(this));
  }
}

export default new ProductController().productRouter;


