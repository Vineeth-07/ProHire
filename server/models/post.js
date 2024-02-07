"use strict";
const { Model } = require("sequelize");
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
      experience
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
      });
    }
    static getPosts() {
      return Post.findAll();
    }
    static associate(models) {
      // define association here
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
