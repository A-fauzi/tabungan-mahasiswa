const Admin = require("../model/admin.model");
const passwordCompare = require("../utils/password.utils");
const bcrypt = require("bcryptjs");
module.exports = (db) => {
  const admin = Admin(db);
  const create = async (payload) => {
    try {
      return await admin.create(payload);
    } catch (err) {
      return err.message;
    }
  };

  const findAdminByUsernamePassword = async (username, password) => {
    try {
      const user = await admin.findOne({
        where: { username: username },
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
    findAdminByUsernamePassword,
  };
};
