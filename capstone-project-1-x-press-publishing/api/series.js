const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const issuesRouter = require('./issues');

const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

seriesRouter.use('/:seriesId/issues', issuesRouter);

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    const sql = 'SELECT * FROM Series WHERE Series.id = $seriesId';
    const values = { $seriesId: seriesId };
    db.get(sql, values, (error, series) => {
        if (error) {
            next(error)
        } else if (series) {
            req.series = series;
            next();
        } else {
            res.sendStatus(404);
        }
    })
});

seriesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Series', (err, series) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ series: series });
        }
    });
});

seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({ series: req.series });
});

seriesRouter.post('/', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.description;
    if (!name || !description) {
        return res.sendStatus(400);
    }
    const sql = 'INSERT INTO Series (name, description) VALUES ($name, $description)';
    //snake case so same headers as table.
    const values = {
        $name: name,
        $description: description
    };

    db.run(sql, values, function (error) {
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (error, series) => {
                res.status(201).json({ series: series });
            });
        }
    });
});

seriesRouter.put('/:seriesId', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.name;
    if (!name || !description) {
        return res.status(200);
    }
    const sql = `UPDATE Series SET name = $name, description = $description WHERE Series.id = $seriedId`;
    const values = {
        $name: name,
        $description: description,
        $seriesId: req.params.seriesId
    }
    db.run(sql, values, (error) => {
        if (error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`, (error, series) => {
                res.status(200).json({ series: series });
            })
        }
    })
})

seriesRouter.delete('/:seriesId', (req, res, next) => {
    const issuesSql = `SELECT * FROM Issues WHERE Issues.series_id = seriesId`;
    const issuesValues = { $seriesId: req.params.seriesId };
    db.get(issuesSql, issuesValues, (error, issues) => {
        if (error) {
            next(error);
        } else if (issues) {
            res.sendStatus(400);
        } else {
            const sql = 'DELETE FROM Series WHERE Series.id = $seriesId';
            const values = { seriesId: req.params.seriesId };
            db.run(sql, values, (error) => {
                if (error) {
                    next(error)
                }
                res.sendStatus(204);
            })
        }
    })
})

module.exports = seriesRouter;