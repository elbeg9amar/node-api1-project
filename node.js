const express = require('express');
const id = require('short-id');
const { Server } = require('http');
const { error } = require('console');

const server = express();
server.use(express.json());


server.get('/', (req, res, error) => {
    res.status(200).json({check: "Success"})
    if(error){
        res.status(500).json({errorMessage: "The users information could not be retrieved." })
    };
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
    if(users) {
        res.status(200).json({data: users});
    }else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    };
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const found = users.find(user => user.id == id)
    if(found) {
        res.status(200).json({date: found})
    }else if (!found){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }else {
        res.status(500).json({errorMessage: "The user information could not be retrieved." })
    };
});

server.post('/api/users', (req, res) => {
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    };
    const newUser = req.body;
    if(newUser) {
        users.push({id: id.generate(), ...newUser})
        res.status(201).json({data: newUser})
    }else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    };
});

server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const deletedUser = users.find(user => user.id === id);
    if(deletedUser){
        users = users.filter(user => user.id !== id);
        res.status(200).json({data: deletedUser});
    }else if (!deletedUser){
        res.status(404).json({message: "The user with the specified ID does not exist." })
    }else {
        res.status(500).json({errorMessage: "The user could not be removed" })
    };
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(404).json({ message: "The user with the specified ID does not exist."})
    };
    const changes = req.body;
    if(!req.body.name || !req.body.bio){
        return res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    };
    let found = users.find(user => user.id == id)
    
    if( found ) {
        Object.assign(found,changes)
        res.status(200).json({found})
    }else if (!found){
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }else{
        res.status(500).json({errorMessage: "The user information could not be modified."})
    };
})

const port = 999;

server.listen(port, () => console.log(`API running ... ${port}`));