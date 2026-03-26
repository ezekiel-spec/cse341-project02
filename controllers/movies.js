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
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('movies').find({ _id: movieId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
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
      res.status(500).json('An error occurred while updating the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('An error occurred while deleting the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };