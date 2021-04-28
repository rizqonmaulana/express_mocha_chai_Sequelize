"use strict";
const express = require("express");
const note = require("../controllers/noteController");
const router = express.Router();
const { validationResult } = require("express-validator");
const noteValidation = require("./validation/noteValidation");

router.get(`/api/note`, note.index);
router.get("/api/note/user/:id", note.getByUserId);
router.get(`/api/note/:id`, note.show);
router.post(`/api/note`, [noteValidation.form], (req, res) => {
  const errors = validationResult(req);
  !errors.isEmpty() ? res.status(422).json(errors) : note.store(req, res);
});
router.put(`/api/note/:id`, [noteValidation.form], (req, res) => {
  const errors = validationResult(req);
  !errors.isEmpty() ? res.status(422).json(errors) : note.update(req, res);
});
router.delete(`/api/note/:id`, note.destroy);

module.exports = router;
