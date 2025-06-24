// models/userPapers.js
module.exports = (sequelize, DataTypes) => {
  const UserPapers = sequelize.define('userPapers', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paper_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
    // optionally add extra fields here,
    // e.g. role: DataTypes.STRING,
  }, {
    timestamps: true,
    tableName: 'userPapers'
  });
  return UserPapers;
};
