const express = require("express");
const fs = require("fs");
const { send } = require("process");

const app = express();
const PORT = process.env.PORT || 8080;

let testData = [{"title":"Test Title","text":"Test text"}];


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
})

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf-8", function (error, data) {
        console.log("this is JSON:" + JSON.parse(data));
        let sendData = JSON.parse(data);
        res.json(sendData);
    })
})

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})



app.listen(PORT, function (req, res) {
    console.log("App listening on PORT:" + PORT);
})



