const { APIKEY } = require("../constants");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(APIKEY);

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("invalid");
    return;
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(400).send("invalid");
    return;
  }
  //process
  const token = user.generateAuthToken();
  //response okr
  res.json({
    token,
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "invalid request" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Account not found" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      config.get("jwtKey")
    );
    user.reset_token = token;
    await user.save();
    const msg = {
      to: user.email, // Change to your recipient
      from: "website049181@gmail.com",
      template_id: "d-25f3633b078247a8865f17ad9889c2d9",
      dynamic_template_data: {
        resetUrl: `http://localhost:3000/forgot-password?token=${token}`,
      },
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error.response.body);
      });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  if (!password || !confirmPassword) {
    return res.status(400).send({ error: "invalid request" });
  }
  if (password !== confirmPassword) {
    return res.status(400).send({ error: "Passwords don't match" });
  }
  try {
    const user = await User.findOne({ reset_token: token });
    if (!user) {
      return res.status(400).send({ error: "Account not found" });
    }
    user.reset_token = null;

    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ success: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: "Server error" });
  }
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = router;
