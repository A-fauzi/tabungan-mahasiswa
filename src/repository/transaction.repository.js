const Transaction = require("../model/transaction.model");
const Mahasiswa = require("../model/mahasiswa.model");
const { Op } = require("sequelize");
module.exports = (db) => {
  const transaction = Transaction(db);
  const mahasiswa = Mahasiswa(db);
  transaction.belongsTo(mahasiswa);
  mahasiswa.hasMany(transaction);
  const create = async (payload) => {
    try {
      const findMahasiswa = await mahasiswa.findByPk(payload.mahasiswa_nim);

      if (!findMahasiswa) {
        return "NIM not found";
      }
      if (payload.type.toLowerCase() == "debit") {
        await mahasiswa.update(
          {
            balance: Number(findMahasiswa.balance + payload.balance),
          },
          { where: { nim: payload.mahasiswa_nim } }
        );
      } else if (payload.type.toLowerCase() == "credit") {
        if (findMahasiswa.balance < payload.balance)
          return "Insufficient balance";
        await mahasiswa.update(
          {
            balance: Number(findMahasiswa.balance - payload.balance),
          },
          { where: { nim: payload.mahasiswa_nim } }
        );
      } else {
        return "Type transaction not available";
      }

      return await transaction.create({
        mahasiswa_nim: payload.mahasiswa_nim,
        balance: payload.balance,
        type_transaction: payload.type,
      });
    } catch (err) {
      return err.message;
    }
  };

  const list = async (startDate, endDate, nim, page = 1, size = 5) => {
    try {
      const offset = +size * (+page - 1);
      if (!startDate && !endDate && !nim) {
        const { count, rows } = await transaction.findAndCountAll({
          include: {
            model: mahasiswa,
            // customer table
            attributes: ["name"],
          },
          // transaction table
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          offset: offset,
          limit: size,
          order: [["date", "desc"]],
        });

        return { count, rows };
      } else if (startDate && endDate && !nim) {
        const { count, rows } = await transaction.findAndCountAll({
          include: {
            model: mahasiswa,
            // customer table
            attributes: ["name"],
          },
          // transaction table
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"], // password tidak di tampilkan
          },
          where: {
            date: { [Op.between]: [startDate, endDate] },
          },
          offset: offset,
          limit: size,
          order: [["date", "desc"]],
        });
        return { count, rows };
      } else if (!startDate && !endDate && nim) {
        const { count, rows } = await transaction.findAndCountAll({
          include: {
            model: mahasiswa,
            // customer table
            attributes: ["name"],
          },
          // transaction table
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"], // password tidak di tampilkan
          },
          where: {
            mahasiswa_nim: nim,
          },
          offset: offset,
          limit: size,
          order: [["date", "desc"]],
        });
        return { count, rows };
      } else if (startDate && endDate && nim) {
        const { count, rows } = await transaction.findAndCountAll({
          include: {
            model: mahasiswa,
            // customer table
            attributes: ["name"],
          },
          // transaction table
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"], // password tidak di tampilkan
          },
          where: {
            [Op.and]: [
              { mahasiswa_nim: [nim] },
              { date: { [Op.between]: [startDate, endDate] } },
            ],
          },
          offset: offset,
          limit: size,
          order: [["date", "desc"]],
        });
        return { count, rows };
      }
    } catch (err) {
      return err.message;
    }
  };

  const findNim = async (nim, page, size) => {
    try {
      const offset = size * (page - 1);

      const { count, rows } = await transaction.findAndCountAll({
        where: { mahasiswa_nim: nim },
        include: {
          model: mahasiswa,
          // customer table
          attributes: ["name"],
        },
        // transaction table
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "mahasiswa_nim"], // password tidak di tampilkan
        },
        offset: offset,
        limit: size,
        order: [["date", "desc"]],
      });

      if (count == 0) {
        return `NIM with ${nim} not found`;
      }
      return { count, rows };
    } catch (err) {
      return err.message;
    }
  };

  return {
    create,
    list,
    findNim,
  };
};
