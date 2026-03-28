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
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID.' });
    const actorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('actors').find({ _id: actorId });
    result.toArray().then((lists) => {
      if (lists.length === 0) return res.status(404).json({ message: 'Actor not found.' });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createActor = async (req, res) => {
  try {
    if (!req.body.name || !req.body.nationality) return res.status(400).json({ message: 'Name and Nationality required.' });
    const actor = { name: req.body.name, birthdate: req.body.birthdate, nationality: req.body.nationality, notableMovies: req.body.notableMovies, awards: req.body.awards };
    const response = await mongodb.getDb().collection('actors').insertOne(actor);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateActor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID.' });
    const actorId = new ObjectId(req.params.id);
    const actor = { name: req.body.name, birthdate: req.body.birthdate, nationality: req.body.nationality, notableMovies: req.body.notableMovies, awards: req.body.awards };
    const response = await mongodb.getDb().collection('actors').replaceOne({ _id: actorId }, actor);
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('Update failed.');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteActor = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID.' });
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('actors').deleteOne({ _id: actorId });
    response.deletedCount > 0 ? res.status(200).send() : res.status(404).json('Actor not found.');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createActor, updateActor, deleteActor };