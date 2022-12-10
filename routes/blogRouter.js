const express = require("express")
const blogRouter = express.Router()
const Article = require('../models/article.js')

blogRouter
    //delete one
    .delete("/:articleID", (req, res, next) => {
        Article.findOneAndDelete({_id: req.params.articleID}, (err, article) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send("Post has been successfully deleted")
        })
    }) 

    //post one
    .post("/:post", (req, res, next) => {
        req.body.userID = req.user._id;
        req.body.userName = req.user.username;
        req.body.postID = req.params.post;
        
        const newArticle = new Article(req.body);

        newArticle.save((err, savedArticle) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          res.status(201).send(savedArticle);
        })
      })

module.exports = blogRouter;