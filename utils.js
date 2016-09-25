var signs = require("./data/signs.json");
var sentences = require("./data/sentences.json");

module.exports = {

    /***********Finding and returning the sign************/
    deduceSign: function (birthday) {
        var sign = "Invalid date";
        if (birthday) {
            var date = this.getDateAsInteger(birthday);
            sign = this.lookUpSign(date);
        }
        return sign;
    },

    getDateAsInteger: function (birthday) {
        var birthdayParts = birthday.split("/");
        return parseInt(birthdayParts[0] + birthdayParts[1]);
    },

    lookUpSign: function (date) {
        var sign = "Invalid date";

        // TODO This check is hacky. Need to get around it.
        if(date <= 119) {
            return signs[11].name;
        }
        for(var i = signs.length - 1; i >= 0; i--) {
            if(signs[i].date - date <= 0) {
                sign = signs[i].name;
                break;
            }
        }
        return sign;
    },
    /*******End of finding and returning the sign*********/



    /*******Creating the main horoscope text**************/
    buildHoroscopeText: function(/*String*/name, birthday) {
        var indexes = this.generateRandomNumberArray();
        var sign = this.deduceSign(birthday);
        var horoscope = this.horoscopeStringBuilder(indexes, horoscope, name, sign);
        return horoscope;
    },

    generateRandomNumberArray: function() {
        var indexes = [];
        for(var i = 0; i < sentences.length; i++){
            indexes.push(i);
        }
        return this.shuffle(indexes);
    },

    // TODO Give credit for this function
    shuffle: function(array) {
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

    horoscopeStringBuilder: function(/*Array*/indexes, /*String*/horoscope, name, sign) {
        horoscope = "Hello " + name + "! Looks like you are a " + sign + ". Here is your " +
            "personalized horoscope! ";
        for(var i = 0; i < indexes.length; i++) {
            horoscope += sentences[indexes[i]].text;
        }
        return horoscope;
    }
    /*******End of creating the main horoscope text*******/
};