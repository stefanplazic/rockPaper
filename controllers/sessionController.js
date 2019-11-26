var express = require('express');
const { saveUser } = require('../models/user');
const { selectSession, saveSession } = require('../models/session');
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
                let users = [];
                req.body.players.forEach(user => {
                    users.push(saveUser(user));
                });
                return Promise.all(users);
            })
            .then((result) => {
                console.log(result);
                return res.send({ code: 0 });
            })
            .catch((e) => {
                //console.error("Error" + e);
                if (e.code)
                    return res.send(e);
                else
                    return res.send({ code: 1 });
            });
    })
    .post('/round', (req, res, next) => {
        selectSession(req.body.id).then((result) => {
            //check if session exists
            if (result.exists === 0) {
                throw { code: 2 };
            }
            return saveSession({ id: req.body.id });

        })
            //add users to database
            .then(() => {
                let users = [];
                req.body.players.forEach(user => {
                    users.push(saveUser(user));
                });
                return Promise.all(users);
            })
            .then((result) => {
                console.log(result);
                return res.send({ code: 0 });
            })
            .catch((e) => {
                //console.error("Error" + e);
                if (e.code)
                    return res.send(e);
                else
                    return res.send({ code: 1 });
            });
    })

    ;



module.exports = router;