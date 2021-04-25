"use strict";
const express = require("express");
const note = require("../controllers/noteController");
const router = express.Router();

router.get(`/api/note`, note.index);
router.get("/api/note/user/:id", note.getByUserId);
router.post(`/api/note`, note.store);
router.get(`/api/note/:id`, note.show);
router.put(`/api/note/:id`, note.update);
router.delete(`/api/note/:id`, note.destroy);

module.exports = router;
