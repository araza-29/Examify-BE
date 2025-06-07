const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timetable', {
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
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    day: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    start_slot_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    end_slot_time: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'timetable',
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
