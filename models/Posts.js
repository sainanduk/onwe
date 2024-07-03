const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/database');

const Posts = sequelize.define('posts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  likes: DataTypes.INTEGER,
<<<<<<< HEAD
  authorId: { type: DataTypes.STRING, references: { model: 'users', key: 'id' } },
  media: DataTypes.ARRAY(DataTypes.JSONB),
=======
  userid: { type: DataTypes.STRING, references: { model: 'users', key: 'id' } },
  media: { type: DataTypes.ARRAY(DataTypes.BLOB('long')), allowNull: true },
>>>>>>> 5d397951174ac8d4167a0969ed18f568f4c00e0c
  category: DataTypes.STRING,
  tags: DataTypes.STRING,
  clubid: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = Posts;
