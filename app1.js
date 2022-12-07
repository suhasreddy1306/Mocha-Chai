const express = require("express");
const App = express(); //instance


App.use(express.json())
let people = [
    {
        id: "1",
        name :"Shiva"
    },
    {
        id: "2",
        name : "Max"
    },
]

App.get("/people", (req, res) => {
    res.status(200).send(people);
});

App.post("/people", (req, res) =>{
    var name = req.body.name
    people.push({
        id:(people.length + 1).toString(),
        name:name
    })
    res.send({
        success:true,
        name:name,
        message:"New data added successfully",
    })
});
App.delete("/people/:id",(req,res)=> {
    var id = req.params.id
    var newPeople = people.filter(el => el.id != id)
    people= newPeople

    res.send({
        success:true,
        message:"data deleted successfully"
    })
})
App.put("/people/:id",(req,res) =>{
    var id= req.params.id
    var name= req.body.name

    var index= people.findIndex(el => el.id ==id)

    people[index] = {
        ...people[index],
        name:name
    }
     
    res.send({
        success:true,
        name:name,
        message:"data updated successfully"
    })
})


App.listen(3000,() => {
    console.log("server is up")
});
module.exports.App=App;