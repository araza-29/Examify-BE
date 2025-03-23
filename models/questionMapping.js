const Sequelize  = require("sequelize");
module.exports = function (sequelize,DataTypes) {
    return sequelize.define("questionMapping", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        paper_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mcqs_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        section_id: {
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
    }, {
        sequelize,
        tableName: "questionMapping",
        timestamps: true
    })
}