var it = require("mocha").it;
var describe = require("mocha").describe;
var assert = require("chai").assert;

var lookUpSign = require("../utils").lookUpSign;

describe("getDateAsInteger", function() {
    it("should return the correct sign based on the integer passed in", function() {
        assert(lookUpSign(1121), "Scorpio (Oct. 23-Nov. 21)");
        assert(lookUpSign(118), "Capricorn (Dec. 22-Jan. 19)");
        assert(lookUpSign(119), "Capricorn (Dec. 22-Jan. 19)");
        assert(lookUpSign(120), "Aquarius (Jan. 20-Feb. 18)");
        assert(lookUpSign(121), "Aquarius (Jan. 20-Feb. 18)");
        assert(lookUpSign(1221), "Sagittarius (Nov. 22-Dec. 21)");
        assert(lookUpSign(1222), "Sagittarius (Nov. 22-Dec. 21)");
        assert(lookUpSign(1223), "Capricorn (Dec. 22-Jan. 19)");
    });

    it("should return a pre-determined sign if the integer is out of range", function() {
        assert(lookUpSign(1232), "Unknown Sign");
        assert(lookUpSign(0), "Unknown Sign");
        assert(lookUpSign(-312), "Unknown Sign");
        assert(lookUpSign(null), "Unknown Sign");
    });
});