const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('topic', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chapter_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        tableName: 'topic',
        timestamps: true
    })
}