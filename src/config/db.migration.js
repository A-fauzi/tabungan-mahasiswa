const User = require("../model/admin.model");

const Transaction = require("../model/transaction.model");

const Mahasiswa = require("../model/mahasiswa.model");

module.exports = async (db) => {
await User(db);
await Mahasiswa(db);
await Transaction(db);
await db.sync({ alter: true });
}
