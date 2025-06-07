const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('results', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    center_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    examination_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    number: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    percentage: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    month: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'results',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
