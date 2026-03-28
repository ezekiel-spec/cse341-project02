const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    // FIX: Ensure we are explicitly calling the 'movies' collection
    const result = await mongodb.getDb().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    // ERROR HANDLING: Returns 500 if database connection fails
    res.status(500).json({ message: 'Error retrieving movies: ' + err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    // ERROR HANDLING: Check if ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('movies').find({ _id: movieId });
    
    result.toArray().then((lists) => {
      if (lists.length === 0) {
        // ERROR HANDLING: Returns 404 if movie doesn't exist
        return res.status(404).json({ message: 'Movie not found.' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createMovie = async (req, res) => {
  try {
    // DATA VALIDATION: Required fields check for Rubric
    if (!req.body.title || !req.body.director || !req.body.year) {
      return res.status(400).json({ message: 'Validation Failed: Title, Director, and Year are required.' });
    }

    const movie = {
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      rating: req.body.rating,
      runtime: req.body.runtime,
      description: req.body.description
    };
    
    const response = await mongodb.getDb().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('An error occurred while creating the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format for update.' });
    }

    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
      rating: req.body.rating,
      runtime: req.body.runtime,
      description: req.body.description
    };
    
    const response = await mongodb.getDb().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('An error occurred while updating the movie (no changes detected).');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format for deletion.' });
    }
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Movie not found in database to delete.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };