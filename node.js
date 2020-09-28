const express = require('express');
const id = require('short-id');
const { Server } = require('http');

const server = express();


server.get('/', (req, res) => {
    res.status(200).json({check: "Success"})
});

let users = [
    {
        id: id.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
    {
        id: id.generate(), 
        name: "New", 
        bio: "New New New",  
    }
] 

server.get('/users', (req, res) => {
    res.status(200).json({data: users})
})

const port = 999;

server.listen(port, () => console.log("API running ..."));