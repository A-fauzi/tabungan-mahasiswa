const { DataTypes } = require("sequelize");
const MAHASISWA = "mahasiswa";
module.exports = (db) => {
  return db.define(
    MAHASISWA,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nim: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        unique: true  
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(50),
        defaultValue: "mahasiswa",
      },
      balance: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true,
    }
  );
};
