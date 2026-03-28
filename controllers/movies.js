const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: 'Error: ' + err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('movies').find({ _id: movieId });
    result.toArray().then((lists) => {
      if (lists.length === 0) return res.status(404).json({ message: 'Movie not found.' });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, director, year, genre, rating, runtime, description } = req.body;
    if (!title || !director || !year || !genre || !rating || !runtime || !description) {
      return res.status(400).json({ message: 'All 7 fields are required.' });
    }
    const movie = { title, director, year, genre, rating, runtime, description };
    const response = await mongodb.getDb().collection('movies').insertOne(movie);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID.' });
    const { title, director, year, genre, rating, runtime, description } = req.body;
    if (!title || !director || !year || !genre || !rating || !runtime || !description) {
      return res.status(400).json({ message: 'All 7 fields required for update.' });
    }
    const movieId = new ObjectId(req.params.id);
    const movie = { title, director, year, genre, rating, runtime, description };
    const response = await mongodb.getDb().collection('movies').replaceOne({ _id: movieId }, movie);
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('Update failed.');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID.' });
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('movies').deleteOne({ _id: movieId });
    response.deletedCount > 0 ? res.status(200).send() : res.status(404).json('Movie not found.');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };