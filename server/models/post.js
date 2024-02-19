"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static createPost(
      title,
      company,
      description,
      location,
      salary,
      deadline,
      experience,
      userId
    ) {
      return Post.create({
        title: title,
        company: company,
        description: description,
        location: location,
        salary: salary,
        date: new Date(),
        deadline: deadline,
        experience: experience,
        userId: userId,
      });
    }
    static getPosts() {
      return Post.findAll({
        order: [["id", "DESC"]],
      });
    }

    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      salary: DataTypes.STRING,
      date: DataTypes.DATE,
      deadline: DataTypes.DATE,
      experience: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
