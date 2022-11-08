const express = require('express');
const authRouter = express.Router();
const Account = require('../models/account.js');
const jwt = require('jsonwebtoken');

authRouter
    .get('/', (req, res, next) => {
        Account.find((err, users) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(users);
        })
    }) 

    .delete('/:userID', (req, res, next) => {
        Account.findOneAndDelete({_id: req.params.userID}, (err, deleted) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send('Item successfully deleted')
        })
    }) 

    .get('/search/user', (req, res, next) => {
        Account.findOne({_id: req.query._id}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(user);
        })
    }) 

    .post('/signup', (req, res, next) => {
        Account.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (user) {
                res.status(403);
                return next(new Error('username already exists'));
            }
            const newAccount = new Account(req.body);
            newAccount.save((err, savedAccount) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(savedAccount.toObject(), process.env.SECRET)
                return res.status(201).send({token, user: savedAccount})
            })
        })
    }) 

    .post('/login', (req, res, next) => {
        Account.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!user || req.body.password !== user.password) {
                res.status(403);
                return next(new Error('Invalid login information'));
            }
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(200).send({token, user});
        })
    }) 

module.exports = authRouter;