const Article = require("../model/articles");
const _ = require("lodash");

exports.getArticleById = (req, res, next, id) => {
  Article.findById(id)
    .populate("article")
    .exec((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "Article not found",
        });
      }
      req.article = article;

      next();
    });
};

exports.createArticle = (req, res) => {
  // Destructure the fields
  const { title, description, markdown } = req.body;

  if (!title || !description || !markdown) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }
  const article = new Article(req.body);

  article.save((err, article) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      title: article.title,
      description: article.description,
      markdown: article.markdown,
    });
  });
};

exports.removeArticle = (req, res) => {
  let article = req.article;
  Article.remove((err, deletedArticle) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete article",
      });
    }
    res.json({
      message: "Deletion Article successfully",
      deletedArticle,
    });
  });
};

//update controllers
exports.updateArticle = (req, res) => {
  const article = new Article(req.body);

  let articlee = req.article;
  articlee = _.extend(articlee, req.body);

  articlee.save((err, article) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      title: article.title,
      description: article.description,
      markdown: article.markdown,
    });
  });
};

// listing of products
exports.getAllArticle = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Article.find()

    .populate("article")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) {
        return res.status(400).json({
          error: "No article found",
        });
      }
      res.json(articles);
    });
};
