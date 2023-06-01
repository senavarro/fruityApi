require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors());

app.use(("/fruits"),express.json()); //Until this is added, every time you post on hopscotch you will see undefined in the VSCode terminal

const fruits = require('./fruits.js');
const e = require('express');

app.get(('/'), (req, res) => {
    res.send('Welcome to the fruits shop');
})

app.get(('/fruits'), (req, res) => {
    res.send(fruits);
})

app.get(("/fruits/:name"), (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);

    if(fruit === undefined){
        res.status(404).send();
    }else{
        res.send(fruit);
    }
})

const ids = fruits.map((fruit) => fruit.id);
let maxId = Math.max(...ids);

app.post(("/fruits"), (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name === req.body.name);
    
    if(fruit != undefined){
        res.status(409).send();
    } else{
        maxId += 1;
        req.body.id = maxId;
        fruits.push(req.body);
        res.status(201).send(req.body);
    }
})

app.delete(("/fruits/:name"), (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() === name);

    if(fruitIndex === -1){
        res.status(404).send();
    }else{
        fruits.splice(fruitIndex, 1);
        res.status(204).send();
    }
    
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`);
})