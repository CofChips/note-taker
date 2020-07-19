const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// required to connect external css and js files
app.use(express.static(__dirname + "/public"));


app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/public/notes.html");
})

// route to populate note list in html page
app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (error, data) {
        let sendData = JSON.parse(data);
        res.json(sendData);
    })
})

// route to capture new notes and repopulate list in both html and json.db
app.post("/api/notes", function (req, res) {
    const newArray = [];
    let newNote = req.body;
    console.log(newNote);
    newNote.id = "0";
    newArray.push(newNote);
    fs.readFile("db/db.json", function (error, data) {
        let temp = JSON.parse(data);
        for (let i = 0; i < temp.length; i++) {
            let num = (i + 1)
            temp[i].id = num.toString();
            newArray.push(temp[i])
        }
        console.log(newArray);
        fs.writeFile("db/db.json", JSON.stringify(newArray), function (error, data) {
            if (error) throw error;
            console.log("Check the file")
        })

        res.json(newArray)

    })


    console.log(newArray)

})

// route to delete specified note
app.delete("/api/notes/:id", function (req, res) {
    let chosen = req.params.id;

    const newArray = [];

    console.log(chosen);
    fs.readFile("db/db.json", function (error, data) {
        let temp = JSON.parse(data);
        for (let i = 0; i < temp.length; i++) {
            newArray.push(temp[i])
        }

        console.log(newArray);

        for (let j = 0; j < newArray.length; j++) {
            if (newArray[j].id === chosen) {
                newArray.splice(j, 1)
                console.log(newArray)
            }
        }
        fs.writeFile("db/db.json", JSON.stringify(newArray), function (error, data) {
            if (error) throw error;
            console.log("Check the file")
        })

        res.json(newArray)

    })
})

// route for urls that are note specified above
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})



app.listen(PORT, function (req, res) {
    console.log("App listening on PORT:" + PORT);
})


