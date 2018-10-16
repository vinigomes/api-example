var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var users= {};

app.route('/user').post(insertUser);

app.route('/user/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

function insertUser(req, res) {
    let user = req.body;
    if (users[user.id] != undefined) {
        res.status(409).end("There is already exists a user with this id.");
    }
    console.log(users[user.id]);
    users[user.id] = user;
    res.status(201).end(JSON.stringify(users));
}

function getUser(req, res) {
    let id = req.params.userId;
    if (users[id] == undefined) {
        res.status(404).end("There is not exists a user with this id.");
    }
    res.end(JSON.stringify(users[id]));
}

function updateUser(req, res) {
    let id = req.params.userId;
    if (users[id] == undefined) {
        res.status(404).end("There is not exists a user with this id.");
    }
    let user = req.body;
    users[id] = user;
    res.end(JSON.stringify(users[id]));
}

function deleteUser(req, res) {
    let id = req.params.userId;
    if (users[id] == undefined) {
        res.status(404).end("There is not exists a user with this id.");
    }
    delete users[id];
    res.end(JSON.stringify(users));
}

module.exports = app;