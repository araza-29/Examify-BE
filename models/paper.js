const Sequelize = require('sequelize')
module.exports = function(sequelize,DataTypes) {
    return sequelize.define("paper", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mcqs_id: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        question_id: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, 
    {
        sequelize,
        tableName: 'paper',
        timestamps: true
    })
}