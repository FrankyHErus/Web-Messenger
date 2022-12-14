import chai from "chai"
import "../helpers"
import queryStringify, { isArrayOrObject, merge, PlainObject } from "../helpers";

describe("Checking Helpers", () => {

    it("Testing isArrayOrObject()", () => {
        let obj = {};
        let num = 1;
        let bool = true;
        chai.assert.equal(isArrayOrObject(obj), true);
        chai.assert.equal(isArrayOrObject(num), false);
        chai.assert.equal(isArrayOrObject(bool), false);
    })

    it("Testing queryStringify()", () => {
        let obj : PlainObject = {
            "key1" : "1",
            "key2" : "2",
            "key3" : "3",
        }

        chai.assert.equal(queryStringify(obj), "key1=1&key2=2&key3=3");
    })

    it("Testing merge()", () => {
        let obj1 = {
            "key1": 1,
            "key2": true,
            "key3": "some string"
        };
        let obj2 = {
            "key4": 9,
            "key5": false,
            "key6": "other string"
        };

        chai.assert.equal(merge(obj1, obj2)["key3"], "some string");
        chai.assert.equal(merge(obj1, obj2)["key5"], false);
    })
}); 
