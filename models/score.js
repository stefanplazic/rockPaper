var db = require('../db');


saveScore = (scores) => new Promise((resolve, reject) => {

    db.query('INSERT  INTO score VALUES ?', [scores], function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    })
});

getPlayerStatistic = (playerId) => new Promise((resolve, reject) => {
    //console.log(playerId);
    db.query("SELECT user.id,user.email, (SELECT COUNT(*) FROM score  WHERE score.type = 'win' and score.playerId = user.id)/(SELECT CASE when COUNT(*) = 0 THEN 1 ELSE COUNT(*) END FROM score WHERE score.type = 'loose' and score.playerId = user.id) as ratio FROM user WHERE user.id = " + playerId, function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
});

module.exports = {
    saveScore,
    getPlayerStatistic
};
