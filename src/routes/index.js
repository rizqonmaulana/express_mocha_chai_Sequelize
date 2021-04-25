"use strict";
const express = require("express");
const router = express();
const note = require("../routes/noteRoutes");
const user = require("../routes/userRoutes");

router.get(`/api/`, (_req, res) => {
  res.json({
    message: "Welcome to restfullapi",
  });
});
router.use(note);
router.use(user);

module.exports = router;
