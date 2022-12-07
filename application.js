const express = require("express");
const App = express(); //instance


App.use(express.json())
let peoples = [
    {
        id: 1,
        name :"Shiva"
    },
    {
        id: 2,
        name : "Max"
    },
]

App.get("/people", (req, res) => {
    res.send(peoples);
});

App.get("/people/:id" , (req, res) => {
    const peopleId = req.params.id;
    const people = peoples.find(people => people.id === parseInt(peopleId));
    if(!people) return res.status(404).send("The task with the provided ID does not exist.");
    res.send(people);
});

App.post("/people", (req, res) => {
    const people = {
        id: peoples.length + 1,
        name: req.body.name
    };

    peoples.push(people);
    res.status(201).send(people);
});

App.put("/people/:id", (req, res) => {
    const peopleId = req.params.id;
    const people = peoples.find(people => people.id === parseInt(peopleId));
    if(!people) return res.status(404).send("The task with the provided ID does not exist.");

    people.name = req.body.name;

    res.send(people);
});


App.delete("/people/:id", (req, res) => {
    const peopleId = req.params.id;
    const people = peoples.find(people => people.id === parseInt(peopleId));
    if(!people) return res.status(404).send("The task with the provided ID does not exist.");

    const index = peoples.indexOf(people);
    peoples.splice(index, 1);
    res.send(people);
});





App.listen(3000,() => {
    console.log("server is up")
});
module.exports.App=App;