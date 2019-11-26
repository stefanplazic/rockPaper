var db = require('../db');
var mysql = require('mysql');

selectSession = (sessionId) => new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as "exists" from session WHERE id = ' + mysql.escape(sessionId), sessionId, function (error, results, fields) {
        if (error) {

            reject(error);
        } else {
            resolve(results[0]);
        }
    });

    
});

saveSession = (sessionId) => new Promise((resolve, reject) => {



    db.query('INSERT INTO session SET ?', sessionId, function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(sessionId);
        }
    })
});

// The code below export the above functios so it can be used in other files.
module.exports = {
    selectSession,
    saveSession
};
