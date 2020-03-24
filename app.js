const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



//MONGO
mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articlesSchema);




/* app.get("/articles", function (req, res) {
    Article.find({}, function (err, results) {
        if (!err) {
            // console.log(results) 
            res.send(results)
        } else {
            res.send(err)
        }

    })
});
 
app.post("/articles", function (req, res) {
    //console.log(req.body.title);
    //console.log(req.body.content); 

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function (err) {
        if (!err) {
            res.send("Successfully added a new article.")
        } else {
            res.send(err);
        }
    });
})

app.delete("/articles", function (req, res) {
    Article.deleteMany({}, function (err) {
        if (!err) {
            res.send("successfully deleted all articles")
        } else {
            res.send(err)
        }
    })
});
 */

//ou para substituir isso tudo
///////////////////////////////// Requests targetting all Articles////////////////////////////////////////////
app.route("/articles")
    .get(function (req, res) {
        Article.find({}, function (err, results) {
            if (!err) {
                // console.log(results) 
                res.send(results)
            } else {
                res.send(err)
            }

        });
    })
    .post(function (req, res) {
        //console.log(req.body.title);
        //console.log(req.body.content); 

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.")
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("successfully deleted all articles")
            } else {
                res.send(err)
            }
        });
    });
///////////////////////////////// Requests targetting all Articles////////////////////////////////////////////

app.route("/articles/:articleTitle")
    .get(function (req, res) {
        //req.params o que foi digitado no link do site
        //req.params.articleTitle foi digitado no parametro articletitle
        Article.findOne({
            title: req.params.articleTitle
        }, function (err, foundArticle) {
            if (foundArticle) {
                // console.log(results) 
                res.send(foundArticle);
            } else {
                res.send("No articles matching that title was found");
            }

        });
    })
    .put(function (req, res) {
        Article.update({
            title: req.params.articleTitle // condição(pequisar aonde sera atualizado)
        }, {
            title: req.body.title, // o que sera atualizado
            content: req.body.content // o que sera atualizado2
        }, {
            overwrite: true
        }, function (err) {
            if (!err) {
                res.send("successfully updated article.");
            }
        });
    })
    .patch(function (req, res) {
        Article.update({
                title: req.params.articleTitle // condição(pequisar aonde sera atualizado)
            }, {
                $set: req.body //$set faz apenas essa parte ser alterada, req body e um {objeto}
            }, function (err) {
                if (!err) {
                    res.send("Successfully updated article.")
                } else {
                    res.send(err);
                }
            }

        );
    })
    .delete(function (req, res) {
        Article.deleteOne({
            title: req.params.articleTitle // o que será deletado
        }, function (err) {
            if (!err) { // nao houve erro
                res.send("Successfully deleted the corresponding article.")
            } else {
                res.send(err)
            }
        });
    });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});