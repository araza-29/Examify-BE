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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize,
        tableName: 'paper',
        timestamps: true
    })
}