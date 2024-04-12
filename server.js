const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example data for movies
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan' },
    { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
    { id: 3, title: 'The Godfather', director: 'Francis Ford Coppola' }
];

// Endpoint to get all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Endpoint to get a single movie by ID
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');
    res.json(movie);
});

// Endpoint to add a new movie
app.post('/api/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director
    };
    movies.push(movie);
    res.json(movie);
});

// Endpoint to update an existing movie
app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');

    movie.title = req.body.title;
    movie.director = req.body.director;
    res.json(movie);
});

// Endpoint to delete a movie
app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.json(movie);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Event listener 1: Toggling dark mode
document.getElementById('dark-mode-button').addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    // Toggle dark mode by adding/removing 'dark-mode' class from body
    document.body.classList.toggle('dark-mode');
}

// Event listener 2: Searching for a movie by title
document.getElementById('search-button').addEventListener('click', searchMovie);

function searchMovie() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    console.log(filteredMovies);
    // Display or do something with filteredMovies
}

// Event listener 3: Filtering movies by director
document.getElementById('filter-button').addEventListener('click', filterMoviesByDirector);

function filterMoviesByDirector() {
    const directorName = document.getElementById('director-input').value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.director.toLowerCase() === directorName);
    console.log(filteredMovies);
    // Display or do something with filteredMovies
}
