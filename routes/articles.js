const express = require("express");
const router = express.Router();

const { getUserById } = require("../controller/user");
const { getArticleById } = require("../controller/articles");

const {
  createArticle,
  removeArticle,
  updateArticle,
  getAllArticle,
} = require("../controller/articles");

const {  isAuthenticated } = require("../controller/auth");
const  isSignedIn  = require("../controller/verifyToken");

router.param("userId", getUserById);
router.param("articleId", getArticleById);

// Creating article
router.post(
  "/user/:userId/article/createarticle",
  isSignedIn,
  isAuthenticated,
  createArticle
);

//Updating the article
router.put(
  "/user/:userId/article/updatearticle/:articleId",
  isSignedIn,
  isAuthenticated,
  updateArticle
  );
  
// deleting the particular user article
router.delete(
    "/user/:userId/article/removearticle/:articleId",
    isSignedIn,
    isAuthenticated,
    removeArticle
    );
    
    
// get all the particular user article
router.get(
  "/user/:userId/article/getallarticle",
  isSignedIn,
  isAuthenticated,
  getAllArticle
);

module.exports = router;
