const express = require('express');
const authRouter = express.Router();
const Account = require('../models/account.js');
const jwt = require('jsonwebtoken');

authRouter
    .post('/signup', (req, res, next) => {
        Account.findOne({ email: req.body.email }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (account) {
                res.status(403);
                return next(new Error('Account already exists with this email.'));
            }
            const newAccount = new Account(req.body);
            newAccount.save((err, savedAccount) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(savedAccount.withoutPassword(), process.env.SECRET);
                return res.status(201).send({ token, account: savedAccount.withoutPassword() });
            })
        })
    }) //Create a new account

    .post('/login', (req, res, next) => {
        const failedLogin = 'Invalid login information.';
        Account.findOne({ email: req.body.email }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(403);
                return next(new Error(failedLogin));
            }
            account.checkPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.status(403);
                    return next(new Error(failedLogin));
                }
                if (!isMatch) {
                    res.status(403);
                    return next(new Error(failedLogin));
                }
                const token = jwt.sign(account.withoutPassword(), process.env.SECRET);
                return res.status(200).send({ token, account: account.withoutPassword() });
            })
        })
    }) //Login to existing account

module.exports = authRouter;