var signs = require("./data/signs.json");
var sentences = require("./data/sentences.json");

module.exports = {
    /**********************Creating the main horoscope text****************************/

    /**
     * Control function which invokes all the functions necessary to create the horoscope.
     *
     * @param name
     * @param birthday
     * @returns {*|String}
     */
    buildHoroscopeText: function(/*String*/name, birthday) {
        var indexes = this.generateNumberArray();
        indexes = this.shuffle(indexes);
        var sign = this.deduceSign(birthday);
        var horoscope = this.horoscopeStringBuilder(indexes, horoscope, name, sign);
        return horoscope;
    },

    /**
     * Returns an array from 0 - n where n is the number of lines
     * in the JSON sentences array.
     *
     * @returns {Array}
     */
    generateNumberArray: function() {
        var indexes = [];
        for(var i = 0; i < sentences.length; i++){
            indexes.push(i);
        }
        return indexes;
    },

    /**
     * Takes an array and shuffles the contents and then returns the shuffled
     * array. This implementation was taken from https://github.com/coolaj86/knuth-shuffle
     *
     * @param array
     * @returns {Array}
     */
    shuffle: function(/*Array*/ array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    /**
     * Takes all the information we have gathered from the user and from creating the
     * random numbered array and uses it to construct the a string that is already
     * formatted and returned.
     *
     * @param indexes
     * @param horoscope
     * @param name
     * @param sign
     * @returns {String}
     */
    horoscopeStringBuilder: function(/*Array*/indexes, /*String*/horoscope, name, sign) {
        horoscope = "Hello " + name + ", here is your personalized horoscope!</br></br>"
            + "Your sign: " + sign + "</br></br>";
        for(var i = 0; i < 8; i++) {
            horoscope += sentences[indexes[i]].text;
        }
        return horoscope;
    },
    /**********************End of creating the main horoscope text*********************/


    /*************************Finding and returning the sign***************************/

    /**
     * Sends the users birthday to getDateAsInteger() and returns
     * an integer containing the month and day. For example, 12/22/2015
     * would be returned as 1222. The integer is then passed to the
     * lookUpSign() function and the string value of the sign is returned
     *
     * @param birthday
     * @returns {string}
     */
    deduceSign: function (/*String*/birthday) {
        var sign = "Invalid date";
        if (birthday) {
            var date = this.getDateAsInteger(birthday);
            sign = this.lookUpSign(date);
        }
        return sign;
    },

    /**
     * Assumes that the date passed in takes the form of yyyy-mm-dd, which
     * is what is returned from the bootstrap form type 'date'. It discards
     * the year and concatenates the month and day into a string which is
     * then parsed into an integer before being passed back to the caller.
     *
     * @param birthday
     * @returns {Number}
     */
    getDateAsInteger: function (/*String*/birthday) {
        var birthdayParts = birthday.split("-");
        return parseInt(birthdayParts[1] + birthdayParts[2]);
    },

    /**
     * Uses a JSON array objects, which are made up of sign and the first date for
     * each sign, and then uses subtraction to find the correct sign. For example,
     * the JSON object representing December's last sign, Capricorn, has the date
     * value of 1222. The next entry below that has the date value of 1122 for
     * Sagittarius. The array continues until we reach the date value of 120 for
     * Aquarius. If we pass in the date 725 (July 25th) then we can start using
     * subtraction and looking for a negative number. As soon as we find it then
     * we know we are on the correct sign so we return it's 'name' property. The
     * solution has a known problem in which the days between Jan 1 and Jan 19 are
     * not covered. These days are taken care of with an initial check before the
     * loop starts the subtraction.
     *
     * @param date
     * @returns {string}
     */
    lookUpSign: function (/*Number*/date) {
        var sign = "Unknown Sign";

        // TODO This check is hacky. Need to get around it.
        if(date <= 119) {
            sign = signs[signs.length - 1].name;
        }
        else {
            for(var i = signs.length - 1; i >= 0; i--) {
                if(parseInt(signs[i].date) - date <= 0) {
                    sign = signs[i].name;
                    break;
                }
            }
        }
        return sign;
    }
    /*******End of finding and returning the sign*********/
};