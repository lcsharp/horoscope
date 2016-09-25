// Import dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var utils = require("./utils.js");
var horoscope = "";

// Location to search for views and default view engine
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware instances
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.redirect("/home");
});

app.get("/home", function(req, res) {
    res.render("home", {
        title: "Home"
    });
});

app.post("/home", function (req, res) {
    horoscope = utils.buildHoroscopeText(req.body.name, req.body.birthday);
    res.redirect("/horoscope");
});

app.get("/horoscope", function(req, res) {
    res.render("horoscope", { horoscope: horoscope })
});

app.get("/about", function(req, res) {
    res.render("about", {
        title: "About the Signs"
    });
});



app.listen(3000, function () {
    console.log("Horoscope app listening on port 3000");
});