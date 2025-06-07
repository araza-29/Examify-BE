const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    father_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    father_phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bform_pic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roll_no: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    center_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    father_cnic: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ref_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ref_phone_no: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_class: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_grade: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    marksheet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bform_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student',
    timestamps: false,
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
