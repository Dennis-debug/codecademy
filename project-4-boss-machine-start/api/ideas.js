const express = require('express');
const ideasRouter = express.Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('../server/checkMillionDollarIdea');


ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    const newIdea = res.send(addToDatabase('ideas'), req.body);
    res.status(201).send(newIdea);
});

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.sendStatus(404).send();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).json(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updateIdea = updateInstanceInDatabase('ideas', checkMillionDollarIdea);
    res.send(updateIdea);

});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = ideasRouter;