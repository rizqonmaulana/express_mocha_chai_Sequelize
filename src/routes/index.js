"use strict";
const express = require("express");
const router = express();
const note = require("../routes/noteRoutes");

router.get(`/api/`, (_req, res) => {
  res.json({
    message: "Welcome to restfullapi",
  });
});
router.use(note);

module.exports = router;
