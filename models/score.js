var db = require('../db');


saveScore = (scores) => new Promise((resolve, reject) => {
    console.log(scores)
    db.query('INSERT  INTO score VALUES ?', [scores], function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    })
});

module.exports = {
    saveScore
};
