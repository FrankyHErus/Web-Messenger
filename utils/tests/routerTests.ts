import chai from "chai"
import "../router"
const { JSDOM } = require("jsdom");

describe("Checking Router", () => {

    const { window } = new JSDOM(`<!DOCTYPE html><div id="app"></div>`, {url : "http://localhost"});
    global.window = window;

    it("Testing History length", () => {

        chai.assert.equal(window.history.length, 1);
    })

    it("Testing History length", () => {
        
        window.history.pushState({page:"/sign-in"},"sign-in")
        window.history.pushState({page:"/sign-up"},"sign-up")
        window.history.pushState({page:"/messenger"},"messenger")

        chai.assert.equal(window.history.length, 4);
    })

    it("Testing History Path", () => {
        
        window.history.pushState({page:"/sign-in"},"sign-in", "/sign-in")

        chai.assert.equal(window.location.href, "http://localhost/sign-in");
    })
}); 
