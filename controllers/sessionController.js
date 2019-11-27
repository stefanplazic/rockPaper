var express = require('express');
const { saveUser, checkUser } = require('../models/user');
const { selectSession, saveSession } = require('../models/session');
const { saveSessionUser } = require('../models/sessionUser');
const { selectRound, saveRound } = require('../models/round');
const { saveScore } = require('../models/score');

var router = express.Router();


router
    .post('/create', (req, res, next) => {
        selectSession(req.body.id).then((result) => {
            //check if session exists
            if (result.exists === 1) {
                throw { code: 2 };
            }
            return saveSession({ id: req.body.id });

        })
            //add users to database
            .then(() => {
                let users = req.body.players.map((item) => { return [item.id, item.email]; });
                return saveUser(users);
            })
            .then(() => {
                let data = req.body.players.map((item) => { return [req.body.id, item.id]; });
                saveSessionUser(data);
            })
            .then(() => {

                return res.send({ code: 0 });
            })

            .catch((e) => {
                if (e.code)
                    return res.send(e);
                else
                    return res.send({ code: 1 });
            });
    })
    .post('/round', (req, res, next) => {
        selectSession(req.body.sessionid).then((result) => {
            if (result.exists === 0)
                throw { code: 2 };

            return selectRound({ id: req.body.id });
        })
            .then((result) => {

                if (result.exists === 1)
                    throw { code: 3 };
                return saveRound({ id: req.body.id, sessionId: req.body.sessionid });
            })
            .then(() => {
                //check if users are registered
                let userIds = req.body.players.map(user => user.id);
                return checkUser(userIds);
            })
            .then((result) => {
                if (result.registered !== req.body.players.length)
                    throw { code: 4 };
                //save score results
                let scores = req.body.players.map((item) => { return [req.body.id, item.id, item.type]; });
                return saveScore(scores);

            })
            .then(() => { return res.send({ code: 0 }); })
            .catch((e) => {

                if (e.code)
                    return res.send(e);
                else
                    return res.send({ code: 1 });
            });
    })

    ;



module.exports = router;