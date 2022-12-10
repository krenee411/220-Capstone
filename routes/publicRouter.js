const express = require('express');
const publicRouter = express.Router();
const Memory = require('../models/memories.js');
const Media = require('../models/media.js');

publicRouter
    .get('/memories', (req, res, next) => {
        Memory.find({ }, (err, memories) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            memories.sort((a, b) => new Date(b.created) - new Date(a.created));
            return res.status(200).send(memories);
        })
    }) //Get all memories.

    .get('/media', (req, res, next) => {
        Media.find({ }, (err, images) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            images.sort(() => Math.random() - 0.5);
            return res.status(200).send(images);
        })
    }) //Get all gallery images.

    .get("/blogs", (req, res, next) => {
        Article.find({ }, (err, articles) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(articles)
        })
    }) //Get all blog articles.

module.exports = publicRouter;