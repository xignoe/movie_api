//create variables
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const { parse } = require('uuid');

let topMovies = [
    {
        title: 'Iron Man',
        description: 'A man makes new clothes, gets in an argument with a co-worker who got cheap knock-off.',
        genre: 'action',
        director: 'Jon Favreau',
    },
    {
        title: 'The Incredible Hulk',
        description: 'Angry man fights girlfriends father and his friend who takes steroids',
        genre: 'action',
        director: 'Louis Leterrier',
    },
    {
        title: 'Iron Man 2',
        description: 'Two idiot billionaires throw money at each other while a Russian hacker tries to unlock the secret of an electric donut.',
        genre: 'action',
        director: 'Jon Favreau',
    },
    {
        title: 'Thor',
        description: 'A man is kicked out of his house by his dad, but then his brother finds out hes adopted. He tries to kill some people and fails, so he jumps off a bridge.',
        genre: 'action',
        director: 'Kenneth Branagh',
    },
    {
        title: 'Captain America: The First Avenger',
        description: 'Man gets steroids and a frisbee to fight off Nazis.',
        genre: 'action',
        director: 'Joe Johnston',
    },
    {
        title: 'The Avengers',
        description: 'A team bonding session goes horribly wrong, resulting in a lrage brawl near Grand Central Station',
        genre: 'action',
        director: 'Joss Whedon',
    },
    {
        title: 'Iron Man 3',
        description: 'A man with PTSD builds a robot army to kill a guy he treated badly many years ago, who coincidentally has fire powers.',
        genre: 'action',
        director: 'Shane Black',
    },
    {
        title: 'Thor: The Dark World',
        description: 'A woman struggles to deal with finding a valuable package in a cave and the dangerous parties interested in recovering it. Also, there are a bunch of dudes named Chris.',
        genre: 'action',
        director: 'Alan Taylor',
    },
    {
        title: 'Captain America: The Winter Soldier',
        description: 'A political party wants to create a secure and safe future but is stopped by a 70 year old Boy Scout who cant kiss correctly.',
        genre: 'romance',
        director: 'Anthony and Joe Russo',
    },
    {
        title: 'Guardians of the Galaxy',
        description: 'A bunch of weirdos try to start a fight with former Blue Man Group member.',
        genre: 'action',
        director: 'James Gunn',
    },
    {
        title: 'Avengers: Age of Ultron',
        description: 'A billionaire creates a homicidal robot with a magical stone and fixes the problem by creating another robot with a magical stone.',
        genre: 'action',
        director: 'Joss Whedon',
    },
    {
        title: 'Ant-Man',
        description: 'An ex-con struggles with finding a new job and argues with his new girlfriends dad.',
        genre: 'action',
        director: 'Peyton Reed',
    },
    {
        title: 'Captain America: Civil War',
        description: 'Billionaire playboy fights a WW2 veteran after he refuses to give him his autograph.',
        genre: 'action',
        director: 'Anthony and Joe Russo',
    },
    {
        title: 'Doctor Strange',
        description: 'Man gets into a car accident and gets nerve damage in his hands. He searches for a cure and ends up becoming a wizard.',
        genre: 'action',
        director: 'Scott Derrickson',
    },
    {
        title: 'Guardians of the Galaxy Vol. 2',
        description: 'Dad struggles to reconnect with son in the presence of his new father figure.',
        genre: 'action',
        director: 'James Gunn',
    },
    {
        title: 'Spider-Man Homecoming',
        description: 'A high school kid ruins his crushs life through a series of events that ends up sending her father to prison.',
        genre: 'action',
        director: 'Jon Watts',
    },
    {
        title: 'Thor: Ragnarok',
        description: 'A woman tries to find her place in her family after years of distance between them.',
        genre: 'comedy',
        director: 'Taika Waititi',
    },
    {
        title: 'Black Panther',
        description: 'A cat gets in a fight when his family lets in a stray.',
        genre: 'action',
        director: 'Ryan Coogler',
    },
    {
        title: 'Avengers: Infinity War',
        description: 'A man ends world hunger with his rock collection.',
        genre: 'action',
        director: 'Anthony and Joe Russo',
    },
    {
        title: 'Ant-Man and the Wasp',
        description: 'A man and woman work together to prevent another woman from finding a cure to her life-threatening disease.',
        genre: 'action',
        director: 'Peyton Reed',
    },
    {
        title: 'Captain Marvel',
        description: 'Former pilot regains her memory and makes friends with a guy thats picky about his sandwiches.',
        genre: 'action',
        director: 'Anna Boden and Ryan Fleck',
    },
    {
        title: 'Avengers: Endgame',
        description: 'A retired dad teams up with old buddies to steal rocks.',
        genre: 'action',
        director: 'Anthony and Joe Russo',
    },
    {
        title: 'Spider-Man: Far From Home',
        description: 'Teenager on a school trip gets separated from his class because he gets distracted by a drone.',
        genre: 'action',
        director: 'Jon Watts',
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
    res.json(topMovies.slice(0, 23));
});
app.get('/', (req, res) => {
    res.send('Welcome to the movie App!');
});
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//endpoints
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) =>
        {return movie.title === req.params.title}));
});

app.get('/movies/:genre', (req, res) => {
    res.json('Successful GET request returning the genre data');
});

app.get('/movies/:director', (req, res) => {
    res.send('Successful GET request returning the director data');
});

// add movie to list of favorites
app.post('/movies/', (req, res) => {
	let newMovie = req.body;
	if (!newMovie.title) {
		const message = 'Missing movie title';
		res.status(400).send(message);
	} else {
		topMovies.push(newMovie);
		res.status(201).send(newMovie);
	}
});

// removie movie from list of favorites
app.delete('/movies/:title', (req, res) => {
	let movie = topMovies.find((movie) => {return movie.title === req.params.title});
	if (movie) {
		movies = topMovies.filter((obj) => {return obj.title !== req.params.title});
		res.status(201).send('Movie ' + req.params.title + ' was removed.');
		
	}
});

// register new user
app.post('/users', (req, res) => {
	res.send('Successful POST request returning data on new User');
});
app.put('/users/:username', (req, res) => {
    res.status(201).send('user has changed his name');	
});



// listen for requests
app.listen(8080, () => {
    console.log('Listening on port 8080.');
})

