const express = require("express");
const router = express.Router();
const { validateUser, User, validateCards } = require("../models/users");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  //only online users with token can go to the next step, auth check if the token is ok
  const user = await User.findById(req.user._id).select("-password"); //select in mongoose in what you dont want to show in this case i do -password
  res.json(user);
});

router.post("/", async (req, res) => {
  //validate users input
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User is already exists");
    return;
  }

  //process
  user = new User(req.body);

  const salt = await bcrypt.genSalt(15);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  //response
  res.send(_.pick(user, ["name", "email", "biz", "_id"]));
});

module.exports = router;
