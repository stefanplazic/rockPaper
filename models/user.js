var db = require('../db');


getUser = () => new Promise((resolve, reject) => {
    db.query('SELECT * from user', function (error, results, fields) {
        if (error) {
            reject();
        } else {
            resolve(results[0]);
        }
    });
});

saveUser = (users) => new Promise((resolve, reject) => {

    db.query('INSERT IGNORE INTO user VALUES ?', [users], function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    })
});

//check if all users are saved
checkUser = (users) => new Promise((resolve, reject) => {
    db.query('SELECT COUNT(*) as "registered" FROM user WHERE id IN (' + [users] + ')', function (error, results, fields) {
        if (error) {
            reject(error);
        } else {

            resolve(results[0]);
        }
    })
});

// The code below export the above functios so it can be used in other files.
module.exports = {
    saveUser,
    checkUser
};
