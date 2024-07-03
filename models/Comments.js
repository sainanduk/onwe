const { DataTypes } = require('sequelize');
const {sequelize} = require('../Config/database'); // adjust the path as necessary

const Comments = sequelize.define('comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  postId: { type: DataTypes.INTEGER, references: { model: 'posts', key: 'id' } },
  userId: { type: DataTypes.STRING, references: { model: 'users', key: 'id' } },
<<<<<<< HEAD
  content: DataTypes.STRING,
  replies: DataTypes.ARRAY(DataTypes.INTEGER),
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: 'comments',
=======
  content: { type: DataTypes.STRING, allowNull: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null, references: { model: 'comments', key: 'id' } },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
>>>>>>> 5d397951174ac8d4167a0969ed18f568f4c00e0c
});

module.exports = Comments;
