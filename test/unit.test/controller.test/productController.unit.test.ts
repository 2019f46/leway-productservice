import mockingoose from 'mockingoose';
import { Categories } from "../../../src/models/product.model";
import * as request from "supertest";
import app from "../../../src/app";

describe('Testing product service', () => {

    const fakeData = {
        _id: "5c7e495ec12d0a02a426f7b2",
        categories: [
            {
                _id: "5c7e491564b7c32dac3c0b3a",
                name: "Junkie Products",
                leaf: true,
                products: [
                    {
                        image: "https://c.ndtvimg.com/2018-09/2crujfh8_black-coffee_625x300_24_September_18.PNG",
                        id: "3",
                        name: "coffee",
                        quantity: "500",
                        price: "600",
                        description: "goodness",
                    },
                ]
            },
        ]
    }

    it('returns data correctly', () => {
        mockingoose.Categories.toReturn(fakeData, 'find');
        Categories.find({}, (err: any, data: { _id: string }) => {
            expect(data._id.toString()).toBe(fakeData._id.toString());
        });
    });
});