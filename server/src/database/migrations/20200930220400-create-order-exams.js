'use strict'
const table = 'order_exams'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      },
      exam_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'exams',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(table)
  }
}