//integrate REST API with Mongoose
const mongoose = require('mongoose'),
    Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;

//create variables
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const { parse } = require('uuid');

mongoose.connect('mongodb://localhost:27017/movie_database', { useNewUrlParser: true, useUnifiedTopology: true});


// let topMovies = [
//     {
//         title: 'Iron Man',
//         description: 'A man makes new clothes, gets in an argument with a co-worker who got cheap knock-off.',
//         genre: 'action',
//         director: 'Jon Favreau',
//     },
//     {
//         title: 'The Incredible Hulk',
//         description: 'Angry man fights girlfriends father and his friend who takes steroids',
//         genre: 'action',
//         director: 'Louis Leterrier',
//     },
//     {
//         title: 'Iron Man 2',
//         description: 'Two idiot billionaires throw money at each other while a Russian hacker tries to unlock the secret of an electric donut.',
//         genre: 'action',
//         director: 'Jon Favreau',
//     },
//     {
//         title: 'Thor',
//         description: 'A man is kicked out of his house by his dad, but then his brother finds out hes adopted. He tries to kill some people and fails, so he jumps off a bridge.',
//         genre: 'action',
//         director: 'Kenneth Branagh',
//     },
//     {
//         title: 'Captain America: The First Avenger',
//         description: 'Man gets steroids and a frisbee to fight off Nazis.',
//         genre: 'action',
//         director: 'Joe Johnston',
//     },
//     {
//         title: 'The Avengers',
//         description: 'A team bonding session goes horribly wrong, resulting in a lrage brawl near Grand Central Station',
//         genre: 'action',
//         director: 'Joss Whedon',
//     },
//     {
//         title: 'Iron Man 3',
//         description: 'A man with PTSD builds a robot army to kill a guy he treated badly many years ago, who coincidentally has fire powers.',
//         genre: 'action',
//         director: 'Shane Black',
//     },
//     {
//         title: 'Thor: The Dark World',
//         description: 'A woman struggles to deal with finding a valuable package in a cave and the dangerous parties interested in recovering it. Also, there are a bunch of dudes named Chris.',
//         genre: 'action',
//         director: 'Alan Taylor',
//     },
//     {
//         title: 'Captain America: The Winter Soldier',
//         description: 'A political party wants to create a secure and safe future but is stopped by a 70 year old Boy Scout who cant kiss correctly.',
//         genre: 'romance',
//         director: 'Anthony and Joe Russo',
//     },
//     {
//         title: 'Guardians of the Galaxy',
//         description: 'A bunch of weirdos try to start a fight with former Blue Man Group member.',
//         genre: 'action',
//         director: 'James Gunn',
//     },
//     {
//         title: 'Avengers: Age of Ultron',
//         description: 'A billionaire creates a homicidal robot with a magical stone and fixes the problem by creating another robot with a magical stone.',
//         genre: 'action',
//         director: 'Joss Whedon',
//     },
//     {
//         title: 'Ant-Man',
//         description: 'An ex-con struggles with finding a new job and argues with his new girlfriends dad.',
//         genre: 'action',
//         director: 'Peyton Reed',
//     },
//     {
//         title: 'Captain America: Civil War',
//         description: 'Billionaire playboy fights a WW2 veteran after he refuses to give him his autograph.',
//         genre: 'action',
//         director: 'Anthony and Joe Russo',
//     },
//     {
//         title: 'Doctor Strange',
//         description: 'Man gets into a car accident and gets nerve damage in his hands. He searches for a cure and ends up becoming a wizard.',
//         genre: 'action',
//         director: 'Scott Derrickson',
//     },
//     {
//         title: 'Guardians of the Galaxy Vol. 2',
//         description: 'Dad struggles to reconnect with son in the presence of his new father figure.',
//         genre: 'action',
//         director: 'James Gunn',
//     },
//     {
//         title: 'Spider-Man Homecoming',
//         description: 'A high school kid ruins his crushs life through a series of events that ends up sending her father to prison.',
//         genre: 'action',
//         director: 'Jon Watts',
//     },
//     {
//         title: 'Thor: Ragnarok',
//         description: 'A woman tries to find her place in her family after years of distance between them.',
//         genre: 'comedy',
//         director: 'Taika Waititi',
//     },
//     {
//         title: 'Black Panther',
//         description: 'A cat gets in a fight when his family lets in a stray.',
//         genre: 'action',
//         director: 'Ryan Coogler',
//     },
//     {
//         title: 'Avengers: Infinity War',
//         description: 'A man ends world hunger with his rock collection.',
//         genre: 'action',
//         director: 'Anthony and Joe Russo',
//     },
//     {
//         title: 'Ant-Man and the Wasp',
//         description: 'A man and woman work together to prevent another woman from finding a cure to her life-threatening disease.',
//         genre: 'action',
//         director: 'Peyton Reed',
//     },
//     {
//         title: 'Captain Marvel',
//         description: 'Former pilot regains her memory and makes friends with a guy thats picky about his sandwiches.',
//         genre: 'action',
//         director: 'Anna Boden and Ryan Fleck',
//     },
//     {
//         title: 'Avengers: Endgame',
//         description: 'A retired dad teams up with old buddies to steal rocks.',
//         genre: 'action',
//         director: 'Anthony and Joe Russo',
//     },
//     {
//         title: 'Spider-Man: Far From Home',
//         description: 'Teenager on a school trip gets separated from his class because he gets distracted by a drone.',
//         genre: 'action',
//         director: 'Jon Watts',
//     }
// ]



// middleware
app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
    console.err(error.stack);
    res.status(500).send('Error');
});

// get requests
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('error: ' + err);
        });
});

app.get('/', (req, res) => {
    res.send('Welcome to the movie App!');
});
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

//endpoints
app.get('/movies/:title', (req, res) => {
    Movies.findOne({Title: req.params.title})
        .then((movie) => {
        res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        }); 
});

app.get('/movies/genre/:Name', (req, res) => {
    Movies.findOne({'Genre.Name' : req.params.Name})
    .then((movie) => {
        res.json(movie.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/director/:Name', (req, res) => {
    Movies.findOne({'Director.Name': req.params.Name})
        .then((movie) => {
            res.json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// add movie to list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
        { $addToSet: { FavoriteMovies: req.params.MovieID} },
        {new: true},
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
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
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users.create({
                    Username:req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then((user) => {res.status(201).json(user) })

                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);

        });

});

// get all users
app.get('/users', (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((error) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// get specific user
app.get('/users/Username', (req, res) => {
    Users.findOne({Username:req.params.Username})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// delete user
app.delete('/users/:Username', (req,res) => {
    Users.findOneAndRemove({ Username: req.params.Username})
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status.status(500).send(' Error: ' + err);
        });
});

// update username
app.put('/users/:username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
        {$set:
            {   Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
        { new: true},
            (err, updatedUser) => {
                if(err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            });

});

//add movie to favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
        { $addToSet: { FavoriteMovies: req.params.MovieID} },
        {new: true},
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//remove movie from favorites
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, 
        { $pull: { FavoriteMovies: req.params.MovieID} },
        {new: true},
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});


// listen for requests
app.listen(8080, () => {
    console.log('Listening on port 8080.');
})

