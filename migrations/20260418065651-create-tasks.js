'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.ENUM('low','medium','high'),
        defaultValue:"low"
      },
      assignTo: {
        type: Sequelize.STRING
      },
      createBy: {
        type: Sequelize.STRING
      },
      due_date: {
        type: Sequelize.DATE
      },
      attachments: {
        type: Sequelize.TEXT
      },
      isDeleted: {
        type: Sequelize.ENUM('yes','no'),
        defaultValue:'no'
      },
      version: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};