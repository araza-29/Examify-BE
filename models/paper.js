const Sequelize = require('sequelize')
module.exports = function(sequelize,DataTypes) {
    return sequelize.define("paper", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        subject_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        class_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        instruction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATEONLY, 
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        reviewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        ,
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        medium: {
            type: DataTypes.STRING,
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, 
    {
        sequelize,
        tableName: 'paper',
        timestamps: true
    })
}