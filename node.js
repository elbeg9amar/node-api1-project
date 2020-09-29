const express = require('express');
const id = require('short-id');
const { Server } = require('http');

const server = express();
server.use(express.json());


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

server.get('/api/users', (req, res) => {
    res.status(200).json({data: users});
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const found = users.find(user => user.id == id)
    res.status(200).json({date: found})
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push({id: id.generate(), ...newUser})
    res.status(201).json({data: users})
});

server.delete('/api/users/:id', (req,res) => {
     const id = req.params.id
     const deletedUser = users.find(user => user.id == id)
     users = users.filter(user => user.id !== id)
     res.status(200).json({data: deletedUser})
})

const port = 999;

server.listen(port, () => console.log(`API running ... ${port}`));