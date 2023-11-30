const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ArticleModel } = require('./database')

app.use(bodyParser.json());

app.post("/articles", async (req, res) => {
    try {
      const article = new ArticleModel(req.body);
      await article.save();
      res.status(201).send(article);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/articles", async (req, res) => {
    try {
      const articles = await ArticleModel.find();
      res.send(articles);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/articles/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const article = await ArticleModel.findById(id);
      if (!article) {
        return res.status(404).send("Article not found");
      }
      res.send(article);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/articles/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const article = await ArticleModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!article) {
        return res.status(404).send("Article not found");
      }
      res.send(article);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.patch("/articles/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const article = await ArticleModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!article) {
        return res.status(404).send("Article not found");
      }
      res.send(article);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/articles/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const article = await ArticleModel.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).send("Article not found");
      }
      res.send(article);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3000, () => {
    console.log('Starting the server on port 3000');
});

module.exports = app;
