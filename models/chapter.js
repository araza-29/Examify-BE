const Sequelize = require('sequelize')
module.exports = function(sequelize,DataTypes) {
    return sequelize.define('chapter', {
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
        subject_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'chapter',
        timestamps: true
    })
}