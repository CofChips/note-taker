const express = require("express");
const fs = require("fs");
const { send } = require("process");

const app = express();
const PORT = process.env.PORT || 8080;

let testData = [{ "title": "Test Title", "text": "Test text" }];


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
})

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (error, data) {
        let sendData = JSON.parse(data);
        res.json(sendData);
    })
})

app.post("/api/notes", function (req, res) {
    const newArray = [];
    let newNote = req.body;
    console.log(newNote);
    newArray.push(newNote);
    fs.readFile("db/db.json", function (error, data) {
        let temp = JSON.parse(data);
        for (let i = 0; i < temp.length; i++) {
            newArray.push(temp[i])
        }
        console.log(newArray);
        fs.writeFile("db/db.json", JSON.stringify(newArray), function (error, data) {
            if (error) throw error;
            console.log("Check the file")
        })
        fs.readFile("db/db.json", function (error, data) {
            let sendData = JSON.parse(data);
            res.json(sendData);
        })

    })


    console.log(newArray)

})

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})



app.listen(PORT, function (req, res) {
    console.log("App listening on PORT:" + PORT);
})



// [{"title":"Test Title","text":"Test text"}]