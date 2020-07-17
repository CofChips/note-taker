const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.get("/notes", function (req, res) {
    res.sendFile(__dirname+"/public/notes.html");
})

app.get("*", function (req, res) {
    res.sendFile(__dirname+"/public/index.html");
})


app.listen(PORT,function(req,res){
    console.log("App listening on PORT:"+PORT);
})