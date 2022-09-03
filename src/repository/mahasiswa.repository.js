const Mahasiswa = require("../model/mahasiswa.model");
const bcrypt = require("bcryptjs");
module.exports = (db) => {
  const mahasiswa = Mahasiswa(db);
  const create = async (payload) => {
    try {
      return await mahasiswa.create(payload);
    } catch (err) {
      return err.message;
    }
  };

  const list = async () => {
    try {
      return await mahasiswa.findAll();
    } catch (err) {
      return err.message;
    }
  };

  const update = async (payload) => {
    try {
      const mahasiswaUpdate = await mahasiswa.findByPk(payload.id);

      if (!mahasiswaUpdate) return `Mahasiswa with ID ${payload.id} not found`;
      return await mahasiswaUpdate.update(payload, {
        where: { id: payload.id },
      });
    } catch (err) {
      return err.message;
    }
  };

  const find = async (nim) => {
    try {
      const findMahasiswa = await mahasiswa.findOne({
        where: { nim },
        attributes: { exclude: ["password"] },
      });
      if (!findMahasiswa) return `Mahasiswa with ID ${nim} not found`;
      return findMahasiswa;
    } catch (err) {
      return err.message;
    }
  };

  const remove = async (id) => {
    try {
      const mahasiswaDelete = await mahasiswa.findByPk(id);

      if (!mahasiswaDelete) return `Mahasiswa with ID ${id} not found`;
      return await mahasiswaDelete.destroy({ where: { nim: id } });
    } catch (err) {
      return err.message;
    }
  };

  const findAdminByNimPassword = async (nim, password) => {
    try {
      const user = await mahasiswa.findOne({
        where: { nim: nim },
      });

      if (user == null) return false;
      const checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) return false;

      return user;
    } catch (err) {
      return err.message;
    }
  };

  return {
    create,
    list,
    update,
    remove,
    findAdminByNimPassword,
    find,
  };
};
