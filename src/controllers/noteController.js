const db = require("../database/models");
const Notes = db.Notes;

const store = async (req, res) => {
  try {
    console.log(req.body);
    const save = await Notes.create(req.body);
    res.json(save).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const index = async (req, res) => {
  try {
    const result = await Notes.findAndCountAll();
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const getByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Notes.findAndCountAll({
      where: {
        user_id: id,
      },
    });
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Notes.findByPk(id);
    const result = data ? data : `${id} not found in db`;
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const update = (req, res) => {
  Notes.findByPk(req.params.id)
    .then((value) => {
      if (value) {
        value.update(req.body);
        result = value.dataValues;
        res.json({ ...result });
      } else {
        result = `${req.params.id} not found in db`;
        res.json({ msg: result });
      }
      // res.json({ result });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const destroy = (req, res) => {
  let msg;
  Notes.findByPk(req.params.id)
    .then((row) => {
      if (row) {
        row.destroy();
        msg = "success deleted";
        res.status(200).json({ message: msg });
      } else {
        msg = `${req.params.id} not found in db`;
        res.status(404).json({ message: msg });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

module.exports = {
  index,
  getByUserId,
  show,
  store,
  update,
  destroy,
};
