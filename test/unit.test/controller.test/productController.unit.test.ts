import mockingoose from "mockingoose";
import { Categories } from "../../../src/models/product.model";
import * as request from "supertest";
import app from "../../../src/app";

const fakeData = [
  {
    _id: "5c7e495ec12d0a02a426f7b2",
    categories: [
      {
        _id: "5c7e491564b7c32dac3c0b33",
        name: "Food",
        categories: [
          {
            _id: "5c7e491564b7c32dac3c0b3a",
            name: "Junkie Products",
            leaf: true,
            products: [
              {
                _id: "5c8155e3b570db675cd742e0",
                image:
                  "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
                id: "3",
                name: "coffee",
                quantity: "500",
                price: "600",
                description: "goodness"
              },
              {
                _id: "5c8155e3b570db675cd742df",
                image:
                  "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
                id: "5",
                name: "milk healthy",
                quantity: "500",
                price: "600",
                description: "goodness"
              }
            ]
          },
          {
            _id: "5c7e491564b7c32dac3c0b35",
            name: "Healthy Products",
            leaf: true,
            products: [
              {
                _id: "5c8155e3b570db675cd742e1",
                image:
                  "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
                id: "18",
                name: "coffee bio",
                quantity: "500",
                price: "600",
                description: "goodness"
              },
              {
                _id: "5c8155e3b570db675cd742d7",
                image:
                  "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
                id: "28",
                name: "milk bio",
                quantity: "500",
                price: "600",
                description: "goodness"
              }
            ]
          }
        ]
      }
    ]
  }
];

describe("GET /api/product", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should return 2 products in mathcing category on /junk", () => {
    mockingoose.Categories.toReturn(fakeData, "find");

    return request(app)
      .get("/api/product/junk")
      .then(res => {
        expect(JSON.parse(res.text)).toEqual([
          {
            _id: "5c8155e3b570db675cd742e0",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "3",
            name: "coffee",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742df",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "5",
            name: "milk healthy",
            quantity: "500",
            price: "600",
            description: "goodness"
          }
        ]);
      });
  });

  it("shoudl return 4 prodcuts in matching category on /food", () => {
    mockingoose.Categories.toReturn(fakeData, "find");

    return request(app)
      .get("/api/product/food")
      .then(res => {
        expect(JSON.parse(res.text)).toEqual([
          {
            _id: "5c8155e3b570db675cd742e0",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "3",
            name: "coffee",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742df",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "5",
            name: "milk healthy",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742e1",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "18",
            name: "coffee bio",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742d7",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "28",
            name: "milk bio",
            quantity: "500",
            price: "600",
            description: "goodness"
          }
        ]);
      });
  });

  it("should return 3 matching products (2 from category) on /healthy", () => {
    mockingoose.Categories.toReturn(fakeData, "find");

    return request(app)
      .get("/api/product/healthy")
      .then(res => {
        expect(JSON.parse(res.text)).toEqual([
          {
            _id: "5c8155e3b570db675cd742df",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "5",
            name: "milk healthy",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742e1",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "18",
            name: "coffee bio",
            quantity: "500",
            price: "600",
            description: "goodness"
          },
          {
            _id: "5c8155e3b570db675cd742d7",
            image:
              "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
            id: "28",
            name: "milk bio",
            quantity: "500",
            price: "600",
            description: "goodness"
          }
        ]);
      });
  });

  it("should return a 404 on /bliblub", () => {
    mockingoose.Categories.toReturn(fakeData, "find");

    return request(app)
      .get("/api/product/bliblub")
      .expect(404);
  });
});
