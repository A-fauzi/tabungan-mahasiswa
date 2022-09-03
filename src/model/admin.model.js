const { DataTypes } = require("sequelize");
const MST_USER = 'admin';
module.exports = (db) => {
    return db.define(MST_USER, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'admin'
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true
    })
}

