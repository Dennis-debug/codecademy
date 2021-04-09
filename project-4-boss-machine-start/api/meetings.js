const express = require('express');
const meetingsRouter = express.Router();

const {
    getAllFromDatabase,
    createMeeting,
    deleteAllFromDatabase,
    addToDatabase
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
});

module.exports(meetingsRouter);