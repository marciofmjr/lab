'use strict'
const table = 'orders'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      health_insurance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      },
      doctor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
      },
      collect_point_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'collect_points',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }
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
