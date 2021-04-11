"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notes = [];
    for (let i = 0; i < 100; i++) {
      notes.push({
        user_id: `${i}`,
        note_title: `this is a note by user ${i}`,
        note_text: `note app by user ${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("notes", notes, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("notes", null, {
      truncate: true,
    });
  },
};
