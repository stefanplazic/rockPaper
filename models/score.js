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
    db.query("SELECT user.id,user.email, (SELECT COUNT(*) FROM score  WHERE score.type = 'win' and score.playerId = user.id)/(SELECT CASE when COUNT(*) = 0 THEN 1 ELSE COUNT(*) END FROM score WHERE score.type = 'loose' and score.playerId = user.id) as ratio FROM user WHERE user.id = " + playerId, function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results[0]);
        }
    });
});

getPlayerListStatistic = () => new Promise((resolve, reject) => {
    db.query("SELECT user.id,user.email, (SELECT COUNT(*) FROM score  WHERE score.type = 'win' and score.playerId = user.id)/(SELECT CASE when COUNT(*) = 0 THEN 1 ELSE COUNT(*) END FROM score WHERE score.type = 'loose' and score.playerId = user.id) as ratio FROM user ORDER BY ratio DESC", function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});

getWinnersByRounds = (sessionId) => new Promise((resolve, reject) => {
    db.query("SELECT round.id as roundId ,user.id as userId, user.email FROM round INNER JOIN score on score.roundId = round.id INNER JOIN user on user.id = score.playerId WHERE round.sessionId = " + sessionId + " and score.type='win' ORDER BY round.id ASC", function (error, results, fields) {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});

module.exports = {
    saveScore,
    getPlayerStatistic,
    getPlayerListStatistic,
    getWinnersByRounds
};
