'use strict';
 module.exports = {
    getUserPayload,
  };
  
let contents = require('fs').readFileSync("./data/user.json");

function getUserPayload(userContext, events, done) {
    let payload = {
        "data":"data"
    };

    payload = JSON.parse(contents);
    userContext.vars.payload = payload;
    return done();
}