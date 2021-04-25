const db = require("../database/models");
const Users = db.Users;
const Notes = db.Notes;
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const passwordToSave = passwordHash.generate(req.body.password),
      data = {
        username: req.body.username.trim(),
        email: req.body.email,
        password: passwordToSave,
      };

    const save = await Users.create(data);
    res.json(save).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findByPk(id, { include: Notes });
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

module.exports = {
  register,
  getUser,
};
