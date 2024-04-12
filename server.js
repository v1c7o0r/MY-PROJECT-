const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan' },
    { id: 2, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
    { id: 3, title: 'The Godfather', director: 'Francis Ford Coppola' }
];
app.get('/api/movies', (req, res) => {
    res.json(movies);
});
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');
    res.json(movie);
});
app.post('/api/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director
    };
    movies.push(movie);
    res.json(movie);
});
app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');

    movie.title = req.body.title;
    movie.director = req.body.director;
    res.json(movie);
});
app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found.');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.json(movie);
});
app.listen(port, () => {
    console.log (`Server is listening at http://localhost:${port}`);
});

const apiKey = '6038d72e';
function fetchMovieData(searchQuery) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.Error) {
        throw new Error(data.Error);
      }
      return data.Search;
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      return null;
    });
}
const searchQuery = 'Batman';
fetchMovieData(searchQuery)
  .then(movies => {
    if (movies) {
      console.log('Movie data:', movies);
    } else {
      console.log('No movie data available.');
    }
  });
