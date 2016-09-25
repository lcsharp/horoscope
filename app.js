var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public
app.use(express.static(__dirname + '/public'));
console.log(__dirname);

// use to serve up the bootstrap functions
app.use(express.static("node_modules/bootstrap/dist"));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// used to parse data from the body of the request
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// custom module that contains functions to execute in the app
var utils = require("./utils.js");

// global variable to hold the output to be displayed to the user
var horoscope = "";

// location to search for views and default view engine
app.set("views", "./views");
app.set("view engine", "pug");

// used to direct the user to the /home page if they simply type the url
app.get("/", function(req, res) {
    res.redirect("/home");
});

// renders the home page
app.get("/home", function(req, res) {
    res.render("home", {
        title: "Home"
    });
});

// posts the information gathered from the home page and creates the horoscope
app.post("/home", function (req, res) {
    horoscope = utils.buildHoroscopeText(req.body.name, req.body.birthday);
    res.redirect("/horoscope");
});

// renders the horoscope view in the /horoscope route
app.get("/horoscope", function(req, res) {
    res.render("horoscope", { horoscope: horoscope })
});

// renders the about page
app.get("/about", function(req, res) {
    res.render("about", {
        title: "About the Signs"
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});