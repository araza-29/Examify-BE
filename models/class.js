const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes) {
    return sequelize.define('account', {
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
        center_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        tableName: 'class',
        timestamps: true
    })
}