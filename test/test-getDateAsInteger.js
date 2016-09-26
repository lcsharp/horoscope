var it = require("mocha").it;
var describe = require("mocha").describe;
var assert = require("chai").assert;
var getDateAsInteger = require("../utils").getDateAsInteger;

describe("getDateAsInteger", function() {
    it("should return an integer correctly formatted string passed in", function() {
       assert(getDateAsInteger("1989-11-21"), 1121);
       assert(getDateAsInteger("1989-02-01"), 201);
       assert(getDateAsInteger("1988-4-01"), 401);
    });
});