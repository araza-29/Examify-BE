const Sequelize = require('sequelize')
module.exports = function(sequelize,DataTypes) {
    return sequelize.define("feedback", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        review: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paper_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, 
    {
        sequelize,
        tableName: 'feedback',
        timestamps: true
    })
}