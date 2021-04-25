const { check } = require("express-validator");

const register = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("required value")
    .isAlphanumeric(),
  check("email").not().isEmpty().withMessage("required value").isEmail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("required value")
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 })
    .withMessage("password need 5 - 20 character"),
];

module.exports = {
  register,
};
