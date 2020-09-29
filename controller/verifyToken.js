require("dotenv").config();
const jwt = require("jsonwebtoken");

// similer things do but without using express-jwt

// This method work like this => user is verified by the token which is generated at the time of
// Sign in then he/she is authorized in making CRUD operation or what ever things he/she wants to do
// if he/she is not verified then it simply gives or say "ACCESS DENIED"

const isSignedIn = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token){
    return res.status(400).json({ error: "ACCESS DENIED" })
  }else{
    try {
      let bearer = token.split(' ');
      const bearerToken = bearer[1];
      const verified = jwt.verify(bearerToken, process.env.SECRET);
      req.user = verified;
      next();
    } catch (error) {
      return res.status(400).json({ error: "Invalid Token" });
    }
  
  }
  
};


module.exports = isSignedIn;
