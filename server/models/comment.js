'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static addComment(
      comment,postId,userId
    ) {
      return Comment.create({
        comment:comment,
        date: new Date(),
        postId:postId,
        userId: userId,
      });
    }
    static getComments() {
      return Comment.findAll({
        order: [["id", "DESC"]],
      });
    }
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
      });
    }
  }
  Comment.init({
    comment: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};