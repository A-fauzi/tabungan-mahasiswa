const { DataTypes, Deferrable } = require("sequelize");
const Mahasiswa = require("./mahasiswa.model");
const transaction = "transaction";
module.exports = (db) => {
  return db.define(
    transaction,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mahasiswa_nim: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Mahasiswa(db),
          key: "nim",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(),
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_transaction: {
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
