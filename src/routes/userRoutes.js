"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const user = require("../controllers/userController");
const userValidation = require("./validation/userValidation");
const router = express.Router();

router.post("/api/user/register", [userValidation.register], (req, res) => {
  const errors = validationResult(req);
  !errors.isEmpty() ? res.status(422).json(errors) : user.register(req, res);
});

router.get("/api/user/:id", user.getUser);

module.exports = router;
