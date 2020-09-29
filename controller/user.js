const User = require("../model/user");

//here we use next because we check in user routes that user
// is isSignedIn , isAuthenticated then we go further

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    req.profile = user;
    next();
  });
};

// Getting user 
exports.getUser = (req, res) => {
  //TODO here we come again to check why we use this profile to undefined

  // ! the todo is done
  // here the problem come in my mind is that why we use req.profile == undefined here
  //so req.profile is a express function or whatever but it bring all the information of the user from DB
  //that's why we here
  //so password is not shown to everyone that's why we put  req.profile.password = undefined
  req.profile.password = undefined;
  return res.json(req.profile);
};

// Update user information
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body }, // this lines means we update all the thing in the DB
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status.json({
          err: "You are not authorized to update this user",
        });
        ;
      }

      user.password = undefined;

      res.json(user);
    }
  );
};
