const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/database');

const Users = sequelize.define('users', {
<<<<<<< HEAD
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    // autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  coverimg: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
=======
  id: { type: DataTypes.STRING, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true },
  email: DataTypes.STRING,
  fullname: DataTypes.STRING,
  avatar: DataTypes.STRING,
  bio: DataTypes.STRING,
  department: DataTypes.STRING,
  role: DataTypes.BOOLEAN,
  coverimg: DataTypes.STRING,
  password: DataTypes.STRING,
  refreshToken: DataTypes.STRING,
  clubs: {type: DataTypes.ARRAY(DataTypes.INTEGER),defaultValue: []},
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
>>>>>>> 5d397951174ac8d4167a0969ed18f568f4c00e0c
});

module.exports = Users;
