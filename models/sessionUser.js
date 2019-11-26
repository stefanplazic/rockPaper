var db = require('../db');

saveSessionUser = (data) => new Promise((resolve, reject) => {
    db.query('INSERT  INTO sessionUser VALUES ?', [data], function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    })
});

// The code below export the above functios so it can be used in other files.
module.exports = {

    saveSessionUser
};
