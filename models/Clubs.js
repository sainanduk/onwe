const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/database');

const Clubs = sequelize.define('clubs', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  admin: { type: DataTypes.STRING, references: { model: 'users', key: 'id' } },
<<<<<<< HEAD
  members: DataTypes.ARRAY(DataTypes.INTEGER),
  posts: DataTypes.ARRAY(DataTypes.INTEGER),
=======
  members: DataTypes.ARRAY(DataTypes.STRING),
  coverimage:{type:DataTypes.BLOB('long'), allowNull: false},
>>>>>>> 5d397951174ac8d4167a0969ed18f568f4c00e0c
  createdAt: DataTypes.DATE,
});

module.exports = Clubs;
