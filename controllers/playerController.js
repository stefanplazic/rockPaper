var express = require('express');
const { getPlayerStatistic, getPlayerListStatistic, getWinnersByRounds } = require('../models/score');


var router = express.Router();


router
    .get('/statistic', (req, res, next) => {
        getPlayerStatistic(req.query.id).then((result) => {
            //check if session exists
            return res.send({ code: 0, statistics: result });

        })
            .catch((e) => {
                return res.send({ code: 1 });
            });
    })

    //get list of player statistics ordered in desc way
    .get('/list', (req, res, next) => {
        getPlayerListStatistic().then((result) => {
            //check if session exists
            return res.send({ code: 0, list: result });

        })
            .catch((e) => {
                return res.send({ code: 1 });
            });
    })

    //get winners for each round for given session
    .get('/winersRounds', (req, res, next) => {
        getWinnersByRounds(req.query.sessionId).then((result) => {
            //check if session exists
            return res.send({ code: 0, results: { sessionId: req.query.sessionId, winners: result } });

        })
            .catch((e) => {

                return res.send({ code: 1 });
            });
    })

    ;



module.exports = router;