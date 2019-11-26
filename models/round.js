var db = require('../db');
var mysql = require('mysql');

selectRound = (roundId) => new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as "exists" from round WHERE id = ' + mysql.escape(roundId), function (error, results, fields) {
        if (error) {

            reject(error);
        } else {
            resolve(results[0]);
        }
    });


});

saveRound = (roundData) => new Promise((resolve, reject) => {



    db.query('INSERT INTO round SET ?', roundData, function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(roundData);
        }
    })
});



// The code below export the above functios so it can be used in other files.
module.exports = {
    selectRound,
    saveRound
};
