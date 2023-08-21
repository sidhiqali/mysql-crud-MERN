import { DataTypes } from "sequelize";

const defineBookModel = (sequelize) => {
  const Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to keep existing image
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });


  return Book;
};

export default defineBookModel;
