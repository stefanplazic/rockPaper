var express = require('express');
const { getPlayerStatistic } = require('../models/score');


var router = express.Router();


router
    .get('/statistic', (req, res, next) => {
        getPlayerStatistic(req.query.id).then((result) => {
            //check if session exists
            return res.send({ statistics: result });

        })
            .catch((e) => {
                console.error(e);
                return res.send({ code: 1 });
            });
    })


    ;



module.exports = router;