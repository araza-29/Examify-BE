const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('mcqs', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mcq: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        choice1: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        choice2: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        choice3: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        choice4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'mcqs',
        timestamps: true
    })
}