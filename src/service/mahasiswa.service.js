const bcrypt = require("../utils/password.hash");

module.exports = (mahasiswaRepo) => {
  const { create, list, update, remove, find } = mahasiswaRepo();
  const registerMahasiswa = async (payload) => {
    try {
      return await create({
        nim: payload.nim,
        name: payload.name,
        password: bcrypt(payload.password),
      });
    } catch (err) {
      return err.message;
    }
  };

  const findAllMahasiswa = async () => {
    try {
      return await list();
    } catch (err) {
      return err.message;
    }
  };

  const updateMahasiswa = async (payload) => {
    try {
      return await update(payload);
    } catch (err) {
      return err.message;
    }
  };

  const deleteMahasiswa = async (id) => {
    try {
      return await remove(id);
    } catch (err) {
      return err.message;
    }
  };
  const findByNim = async (nim) => {
    try {
      return await find(nim);
    } catch (error) {
      return error.message;
    }
  };
  return {
    registerMahasiswa,
    findAllMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    findByNim,
  };
};
