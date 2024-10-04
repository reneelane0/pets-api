const express = require('express');
const app = express();
const port = 3000;

// data for pets
const pets = [
    { id: 1, name: "Max", breed: "Golden Retriever", age: 3, image_url: "" },
    { id: 2, name: "Bella", breed: "Labrador", age: 4, image_url: "" },
    { id: 3, name: "Luna", breed: "Bulldog", age: 2, image_url: "" },
];

// set up endpoint to get random pets
app.get('/pets', (req, res) => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    res.json(randomPet);
});

// start server
app.listen(port, () => {
    console.log('Pet API listening at http://localhost:3000');
});