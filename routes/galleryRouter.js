const express = require('express');
const galleryRouter = express.Router();
const Account = require('../models/account.js');
const Media = require('../models/media.js');
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
// *UNCOMMENT AND REMOVE THIS LINE ONCE THE MEDIA SCHEMA HAS BEEN MADE*
// galleryRouter
//     .get('/', (req, res, next) => {
//         Media.find({ }, (err, images) => {
//             if (err) {
//                 res.status(500);
//                 return next(err);
//             }
//             images.sort(() => Math.random() - 0.5);
//             return res.status(200).send(images);
//         })
//     }) //Get all gallery images.

//     .post('/upload', upload.single('file'), (req, res, next) => {
//         Account.findOne({ _id: req.user._id }, (err, account) => {
//             if (err) {
//                 res.status(500);
//                 return next(err);
//             }
//             if (!account) {
//                 res.status(404);
//                 return next(new Error('Sorry, we are having trouble finding your account.'));
//             }

//             req.body.img_url = `http://localhost:9000/file/${req.file.filename}`;
//             const newMedia = new Media(req.body);
//             newMedia.save((err, savedMedia) => {
//                 if (err) {
//                     res.status(500);
//                     return next(err);
//                 }
//                 return res.status(201).send(savedMedia);
//             })
//         })
//     }) //Allow user to upload a new image to the gallery.

module.exports = galleryRouter;