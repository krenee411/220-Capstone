//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const expressJwt = require('express-jwt');
require('dotenv').config();

//Port
const port = process.env.PORT || 9000;

//Connection to MongoDB
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Pensacoola');
    console.log('Connected to MongoDB');
}
// localhost:27017

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/auth', require('../routes/authRouter.js'));
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));

//Connection to image buckets.
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

app.get('/file/:filename', async (req, res, next) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridFSBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return next(new Error('Image not found'));
    }
}) //Retrieve image from database.

//Error handling
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'Unauthorized Error') {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
})

//Listener
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})