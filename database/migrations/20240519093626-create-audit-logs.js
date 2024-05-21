'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('audit_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        require: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      event: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('audit_logs')
  }
}
