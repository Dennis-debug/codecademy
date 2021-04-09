const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });

issuesRouter.param('issuesId', (req, res, next, issuesId) => {
    const sql = 'SELECT * FROM Issues WHERE Issues.id = $issuesId';
    const values = { $issuesId: issuesId };
    db.get(sql, values, (error, issues) => {
        if (error) {
            next(error)
        } else if (issues) {
            next();
        } else {
            res.sendStatus(400);
        }
    })
});

issuesRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Issues WHERE Issues.id = issuesId';
    const values = { $issuesId: req.params.seriesId };
    db.all(sql, values, (err, issues) => {
        if (err) {
            next(err);
        }
        res.status(200).json({ issues: issues });
    });
});

issuesRouter.post('/', (req, res, next) => {
    const name = req.body.issues.name;
    const issueNumber = req.body.issues.issueNumber;
    const publicationDate = req.body.issues.publicationDate;
    const artistId = req.body.issues.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = { $artistId: artistId };
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error)
        } else {
            if (!name || !issueNumber || !publicationDate || !artistId) {
                return res.sendStatus(400);
            }
            const sql = 'INSERT INTO Issues (name, issue_number, publication_date, artist_id, series_id) VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)';
            //snake case so same headers as table.
            const values = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $seriesId: req.params.seriesId
            };

            db.run(sql, values, function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(`SELECT * FROM Issues WHERE Issues.id = ${this.lastID}`, (error, issues) => {
                        res.status(201).json({ issues: issues });
                    })
                }
            })
        }
    })
})

issuesRouter.put('/:issuesId', (req, res, next) => {
    const name = req.body.issues.name;
    const issueNumber = req.body.issues.issueNumber;
    const publicationDate = req.body.issues.publicationDate;
    const artistId = req.body.issues.artistId;
    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = { $artistId: artistId };
    db.get(artistSql, artistValues, (error, artist) => {
        if (error) {
            next(error)
        } else {
            if (!name || !issueNumber || !publicationDate || !artistId) {
                return res.sendStatus(400);
            }
            const sql = `UPDATE Issues SET name = $name, issue_number = $issueNumber, publication_date = $publicationDate, artist_id = $artistId WHERE Issues.id = $issuesId`;
            const values = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $issuesId: req.params.issuesId
            };

            db.run(sql, values, (error) => {
                if (error) {
                    next(error);
                } else {
                    db.get(`SELECT * FROM Issues WHERE Issues.id = ${req.params.issuesId}`, (error, issues) => {
                        res.status(204).json(issues);
                    })
                }
            })
        }
    })
})

    issuesRouter.delete('/:IssuesId', (req, res, next) => {
        const sql = 'DELETE * FROM Issues WHERE Issues.id = $issuesId';
        const values = { issuesId: req.params.issuesId }
        db.run(sql, values, (error) => {
            if (error) {
                next(error)
            }
            res.status(204);
        })
    })



module.exports = issuesRouter;