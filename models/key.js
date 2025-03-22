const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("key", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mcqs_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        paper_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
          }
    },
    {
        sequelize,
        tableName: 'key',
        timestamps: true
    })
}