const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("key", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        choice_id: {
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
        }
    },
    {
        sequelize,
        tableName: 'key',
        timestamps: true
    })
}