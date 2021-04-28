const { check } = require("express-validator");

const form = [
  check("note_title").not().isEmpty().withMessage("required value"),
  check("note_text").not().isEmpty().withMessage("required value"),
  check("user_id").not().isEmpty().withMessage("required value"),
];

module.exports = {
  form,
};
