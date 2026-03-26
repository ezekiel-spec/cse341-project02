const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('actors').find();
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
    const actorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('actors').find({ _id: actorId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createActor = async (req, res) => {
  try {
    const actor = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      notableMovies: req.body.notableMovies,
      awards: req.body.awards
    };
    const response = await mongodb.getDb().collection('actors').insertOne(actor);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('An error occurred while creating the actor.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const actor = {
      name: req.body.name,
      birthdate: req.body.birthdate,
      nationality: req.body.nationality,
      notableMovies: req.body.notableMovies,
      awards: req.body.awards
    };
    const response = await mongodb.getDb().collection('actors').replaceOne({ _id: actorId }, actor);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('An error occurred while updating the actor.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteActor = async (req, res) => {
  try {
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('actors').deleteOne({ _id: actorId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json('An error occurred while deleting the actor.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createActor, updateActor, deleteActor };