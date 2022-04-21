'use strict';
 module.exports = {
    getUserPayload,
    getAgoraChatPayload
  };
  
let userPayload = require('fs').readFileSync("./data/user.json");
let agoraChatPayload = require('fs').readFileSync("./data/agora_chat.json");

function getUserPayload(userContext, events, done) {
    let payload = {
        "data":"data"
    };

    payload = JSON.parse(userPayload);
    userContext.vars.payload = payload;
    return done();
}

function getAgoraChatPayload(userContext, events, done) {
  let payload = {
      "data":"data"
  };

  payload = JSON.parse(agoraChatPayload);
  userContext.vars.payload = payload;
  return done();
}