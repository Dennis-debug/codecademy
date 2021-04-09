const express = require('express');
const minionsRouter = express.Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');


minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = res.send(addToDatabase('minions'), req.body);
    res.status(201).send(newMinion);
});

minionsRouter.param('minionId', (req, res, next, minionId) => {
    const minion = getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.sendStatus(404).send();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).json(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);

});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

minionsRouter.get(':minionId/work', (req, res, next) => {

});

minionsRouter.post(':minionId/work', (req, res, next) => {

});

minionsRouter.put(':minionId/work/:workId', (req, res, next) => {

});

minionsRouter.delete(':minionId/work/:workId', (req, res, next) => {

});



module.exports = minionsRouter;
