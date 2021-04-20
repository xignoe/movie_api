//create variables
const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [
    {
        title: 'Iron Man'
    },
    {
        title: 'The Incredible Hulk'
    },
    {
        title: 'Iron Man 2'
    },
    {
        title: 'Thor'
    },
    {
        title: 'Captain America: The First Avenger'
    },
    {
        title: 'The Avengers'
    },
    {
        title: 'Iron Man 3'
    },
    {
        title: 'Thor: The Dark World'
    },
    {
        title: 'Captain America: The Winter Soldier'
    },
    {
        title: 'Guardians of the Galaxy'
    },
    {
        title: 'Avengers: Age of Ultron'
    },
    {
        title: 'Ant-Man'
    },
    {
        title: 'Captain America: Civil War'
    }
]

// middleware

app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.err(error.stack);
    res.status(500).send('Error');
});

// get requests
app.get('/movies', (req, res) => {
    res.json(topMovies.slice(0, 10));
});
app.get('/', (req, res) => {
    res.send('Welcome to the movie App!');
});
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

// listen for requests
app.listen(8080, () => {
    console.log('Listening on port 8080.');
})

