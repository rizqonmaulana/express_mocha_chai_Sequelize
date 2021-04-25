"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notes.belongsTo(models.Users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Notes.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          allowNull: false,
        },
      },
      note_title: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
          allowNull: false,
        },
      },
      note_text: {
        type: DataTypes.TEXT,
        validate: {
          isAlphanumeric: true,
          allowNull: false,
        },
      },
    },
    {
      sequelize,
      modelName: "Notes",
      tableName: "notes",
    }
  );
  return Notes;
};
