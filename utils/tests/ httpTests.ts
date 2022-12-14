import chai from "chai"
import { newServer } from 'mock-xmlhttprequest';
import HTTPTransport from "../httpTransport"

describe("Checking HTTP class", () => {
  it("Testing Result is Promise", () => {
    const server = newServer({
      get: ['/url/', {
        headers: { 'Content-Type': 'application/json' },
        body: '{ "message": "Success!" }',
      }],
    });
    server.install();

    HTTPTransport.API_URL = "";
    let http = new HTTPTransport("/url");

    server.install();
    
    let res = http.get("/", "");
    chai.assert.equal(typeof(res.then) == "function", true);
  });

  it("Testing GET Body", () => {

    const server = newServer({
        get: ['/url/', {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "Success!" }',
        }],
    });
    server.install();

    HTTPTransport.API_URL = "";
    let http = new HTTPTransport("/url");

    server.install();

    http.get("/").then((result : any) => {
        chai.assert.equal(result.body["message"], 'Success!');
    });
  });

  it("Testing GET Header", () => {

    const server = newServer({
        get: ['/url/', {
          headers: { 'Content-Type': 'application/json' },
          body: '{ "message": "Success!" }',
        }],
    });
    server.install();

    HTTPTransport.API_URL = "";
    let http = new HTTPTransport("/url");

    server.install();

    http.get("/").then((result : any) => {
        chai.assert.equal(result.body["Content-Type"], 'application/json');
    });
  });
}); 
