require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Sign Up
exports.signup = async (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg, 
    });
  }
  const { name, lastname, email, password } = req.body;

  //here we check whether the user is already present or not
  User.findOne(
    {
      email: email,
    },
    (err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Email alredy exist",
        });
      }
    }
  );

  // Here we change the password into Encrypted password
  bcrypt.hash(password, 10, async (err, hash) => {
    // Store hash in your password DB.
    const user = new User({
      name: name,
      lastname: lastname,
      email: email,
      password: hash,
    });

    try {
      const savedUser = await user.save();
      res.json({
        message: "Signup Successfully",
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      });
    } catch (error) {
      res.json({
        message: error,
      });
    }
  });
};

//For Sign In
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //here we find the user by email
  await User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err || !user) {
        //here we put " Email and Password are wrong " because we don't know who the user is
        //means hacker or normal user so we simply put this in palce of " User email do not exist "
        return res.status(401).json({ error: "Email and Password are wrong" });
      } else {
        //here we compare the password with the encrypted password

        // wanna know why we use { user.password } => because it directly give the encrypted
        // password from the schema then we compare the encrypted password and password
        // entered by the user during signin process

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(400).json({ error: "Invalid Password" });
          }
          if (result) {
            //here we create and assigned the token
            const token = jwt.sign({ id: user._id }, process.env.SECRET);

            // put token in cookie
            res.cookie("token", token, { expire: new Date() + 9999 });

            // send response to front end
            const { _id, name, email, role } = user;
            return res.status(200).json({
              message: "Successfully Signed in",
              token: token,
              user: { _id, name, email, role },
            });
          } else {
            return res.status(404).json({
              message: "Password do not match",
            });
          }
        });
      }
    }
  );
};

//Sign Out
exports.signout = (req, res) => {
  res.clearCookie("auth-token");
  res.json({
    message: "User signout sucessfully",
  });
};


exports.isAuthenticated = (req, res, next) => {
  // here profile is variable which we will set in front end  
  // console.log(req.auth.id);
  let checker = req.profile && req.user && req.profile._id == req.user.id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIEDhj",
    });
  }
  next();
};
