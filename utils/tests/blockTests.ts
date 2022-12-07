import chai from "chai"
import Block from "../block"

describe("Checking Block", () => {

    it("Testing Block Creation", () => {
        let props : Record<string, any> = {};
        let el1 : Block | null = null;
        el1 = new Block("ul", props);
        chai.assert.equal(el1.getContent() instanceof HTMLElement, true);
    })

    it("Testing .show()", () => {
        let props : Record<string, any> = {};
        let el1 = new Block("ul", props);
        el1.show();
        chai.assert.equal(el1.getContent()!.style.display, "block");
    });

    it("Testing .hide()", () => {
        let props : Record<string, any> = {};
        let el1 = new Block("ul", props);
        el1.hide();
        chai.assert.equal(el1.getContent()!.style.display, "none");
    });

    it("Testing Block Creation", () => {
        let props : Record<string, any> = {};
        let el1 : Block | null = null;
        let el2 : Block | null = null;
        el1 = new Block("ul", props);
        el2 = new Block("li", props);
        chai.assert.notEqual(el1.getContent()?.tagName, el2.getContent()?.tagName);
    })

    it("Testing Block Creation", () => {
        let props : Record<string, any> = {};
        let el1 : Block | null = null;
        let el2 : Block | null = null;
        el1 = new Block("ul", props);
        el2 = new Block("li", props);
        chai.assert.notEqual(el1.getContent()?.tagName, el2.getContent()?.tagName);
    })
}); 
