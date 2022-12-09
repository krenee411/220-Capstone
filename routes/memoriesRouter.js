const express = require('express');
const memoriesRouter = express.Router();
const Account = require('../models/account.js');
const Memory = require('../models/memories.js');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const uuid = require('uuid');

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/Pensacoola',
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}${uuid.v4()}`;
            return filename;
        }
        return {
            bucketName: 'uploads',
            filename: `${Date.now()}${uuid.v4()}`
        }
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Attachment is not a valid filetype (.png, .jpeg, .jpg)'));
        }
    }
})

memoriesRouter
    .get('/', (req, res, next) => {
        Memory.find({ }, (err, memories) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            memories.sort((a, b) => new Date(b.created) - new Date(a.created));
            return res.status(200).send(memories);
        })
    }) //Get all memories.

    .post('/new', upload.single('file'), (req, res, next) => {
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding your account.'));
            }

            if (req.body.tags !== undefined) {
                const addHash = (str) => {
                    if (str.charAt(0) !== '#') {
                        return `#${str}`;
                    }
                    return str;
                }
                const tagList = req.body.tags.split(', ').map(e => addHash(e));
                req.body.tags = tagList;
            }

            req.body = {
                title: req.body.title,
                message: req.body.message,
                user: req.user
            }
            if (req.file !== undefined) {
                const imgUrl = `http://localhost:9000/file/${req.file.filename}`;
                req.body.img_url = imgUrl;
            }
            
            const newMemory = new Memory(req.body);
            newMemory.save((err, savedMemory) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                return res.status(201).send(savedMemory);
            })
        })
    }) //Allow user to upload a new memory.

    .delete('/remove', (req, res, next) => {
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding that account.'));
            }

            Memory.findOne({ _id: req.body.id }, (err, memory) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                if (!memory) {
                    res.status(404);
                    return next(new Error('Sorry, we cannot find that memory'));
                }
                if (req.user._id !== memory.user._id) {
                    res.status(403);
                    return next(new Error('You do not have authorization to delete this memory.'))
                }
                
                Memory.findOneAndDelete({ _id: req.body.id }, (err, deletedMemory) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    if (!deletedMemory) {
                        res.status(404);
                        return next(new Error('Sorry, we cannot find that memory'));
                    }
                    return res.status(200).send({ msg: 'Memory successfully deleted.' })
                })
            })
        })
    }) //Allow user to delete their memory.

module.exports = memoriesRouter;