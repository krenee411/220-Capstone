const express = require('express');
const settingsRouter = express.Router();
const Account = require('../models/account.js');
const Memory = require('../models/memories.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const uuid = require('uuid');

let gfs;
let gridFSBucket;
const conn = mongoose.connection;
conn.once('open', function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })
    gfs.collection('uploads');
})

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

settingsRouter
    .put('/username', (req, res, next) => {
        const newUsername = req.body.new_username;
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding your account.'));
            }

            const testNewUsername = (new_username) => {
                return !/^(?=.*[\s\s+<>.()^+='/|$@#!%*?&])/.test(new_username);
            }
            
            if (testNewUsername(newUsername)) {
                if (newUsername.length <= 25) {
                    req.body = { username: newUsername }
                }
                else {
                    res.status(403);
                    return next(new Error('Usernames may include letters, numbers, underscores and dashes. Must be between 4 and 25 characters long.'))
                }

                Account.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, updatedAccount) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    const token = jwt.sign(updatedAccount.withoutPassword(), process.env.SECRET);
                    return res.status(200).send({ token, account: updatedAccount.withoutPassword() });
                })
            }
            else {
                res.status(403);
                return next(new Error('Usernames may include letters, numbers, underscores and dashes. Must be between 4 and 25 characters long.'))
            }
            Memory.find({ 'user._id': req.user._id }, (err, memories) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                if (!memories) {
                    res.status(404);
                    return next(new Error('Sorry, we cannot find the requested memories.'));
                }

                const temp = [...memories]
                const updateAll = () => {
                    if (temp.length > 0) {
                        temp[0].user.username = newUsername;
                        Memory.findOneAndUpdate({ _id: temp[0]._id }, { user: temp[0].user }, { new: true }, (err, updatedMemory) => {
                            if (err) {
                                res.status(500);
                                return next(err);
                            }
                        })
                        temp.splice(0, 1);
                        return updateAll();
                    }
                    return;
                }
                updateAll();
            })
        })
    }) //Allow user to change username

    .put('/email', (req, res, next) => {
        const newEmail = req.body.new_email;
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding your account.'));
            }
            
            const testNewEmail = (new_email) => {
                return /(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?\.)+[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(new_email);
            }

            if (testNewEmail(newEmail)) {
                req.body = { email: newEmail }
                Account.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, updatedAccount) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    const token = jwt.sign(updatedAccount.withoutPassword(), process.env.SECRET);
                    return res.status(200).send({ token, account: updatedAccount.withoutPassword() });
                })
            }
            else {
                res.status(403);
                return next(new Error('Please enter a valid email.'))
            }
        })
    }) //Allow user to change email

    .put('/password', (req, res, next) => {
        const newPassword = req.body.new_password;
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding your account.'));
            }
            
            const testNewPassword = (new_password) => {
                return /^(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-a-z])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-A-Z])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-\d])(?=.*[\u00A0-\uD7FF\uE000-\uFFFF-$@#!%*?&])[\u00A0-\uD7FF\uE000-\uFFFF-a-z\u00A0-\uD7FF\uE000-\uFFFF-A-Z\u00A0-\uD7FF\uE000-\uFFFF-\d\u00A0-\uD7FF\uE000-\uFFFF-$@$!%*?&]/.test(new_password);
            }

            account.checkPassword(req.body.old_password, (err, isMatch) => {
                if (err) {
                    res.status(403);
                    return next(new Error('The current password provided was invalid.'))
                }
                if (!isMatch) {
                    res.status(403);
                    return next(new Error('The current password provided was invalid.'));
                }
                if (testNewPassword(newPassword)) {
                    if (newPassword.length >= 8 && newPassword.length <= 16) {
                        req.body = { password: newPassword }
                    }
                    else {
                        res.status(403);
                        return next(new Error('Passwords require uppercase, lowercase, number and special character. Must be between 8 and 16 characters long.'))
                    }
                    Account.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, updatedAccount) => {
                        if (err) {
                            res.status(500);
                            return next(err);
                        }
                        updatedAccount.save((err, savedUpdate) => {
                            if (err) {
                                res.status(500);
                                return next(err);
                            }
                            const token = jwt.sign(savedUpdate.withoutPassword(), process.env.SECRET);
                            return res.status(200).send({ token, account: savedUpdate.withoutPassword() });
                        })
                    })
                }
                else {
                    res.status(403);
                    return next(new Error('Passwords require uppercase, lowercase, number and special character. Must be between 8 and 16 characters long.'));
                }
            })
        })
    }) //Allow user to change password

    .put('/profimg', upload.single('file'), (req, res, next) => {
        const imgUrl = `http://localhost:9000/file/${req.file.filename}`;

        const deletePrevious = async () => {
            if (req.user.profimg !== 'https://p.kindpng.com/picc/s/24-248253_user-profile-default-image-png-clipart-png-download.png') {
                const myFileName = req.user.profimg.split('file/')[1];
                const oldImg = await gfs.files.findOne({ filename: myFileName });
                gridFSBucket.delete(oldImg._id, (err, data) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                })
            }
        }
        
        deletePrevious();
        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (!account) {
                res.status(404);
                return next(new Error('Sorry, we are having trouble finding your account.'));
            }

            req.body.profimg = imgUrl;

            Account.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, updatedAccount) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(updatedAccount.withoutPassword(), process.env.SECRET);
                return res.status(200).send({ token, account: updatedAccount.withoutPassword() });
            })
            Memory.find({ 'user._id': req.user._id }, (err, memories) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                if (!memories) {
                    res.status(404);
                    return next(new Error('Sorry, we cannot find the requested memories.'));
                }

                const temp = [...memories]
                const updateAll = () => {
                    if (temp.length > 0) {
                        temp[0].user.profimg = imgUrl;
                        Memory.findOneAndUpdate({ _id: temp[0]._id }, { user: temp[0].user }, { new: true }, (err, updatedMemory) => {
                            if (err) {
                                res.status(500);
                                return next(err);
                            }
                        })
                        temp.splice(0, 1);
                        return updateAll();
                    }
                    return;
                }
                updateAll();
            })
        })
    }) //Allow user to change profile picture

module.exports = settingsRouter;