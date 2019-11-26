var db = require('../db');


getUser = () => new Promise((resolve, reject) => {
    db.query('SELECT * from user', function (error, results, fields) {
        if (error){
            reject();
        }else{
            resolve(results[0]);
        }
    });
});

saveUser = (userinfo) => new Promise((resolve,reject)=>{
    

    
    db.query('INSERT IGNORE INTO user SET ?',userinfo,function(error,results,fields){
        if(error){
            reject(error);
        }else{
            resolve(userinfo);
        }
    })
});

// The code below export the above functios so it can be used in other files.
module.exports = {
    saveUser
};
