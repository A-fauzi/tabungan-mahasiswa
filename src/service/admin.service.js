const bcrypt = require("../utils/password.hash");
module.exports = (adminRepo) => {
  const { create, findAdminByUsernamePassword } = adminRepo();
  const registerNewAdmin = async (payload) => {
    try {
      const result = await create({
        username: payload.username,
        password: bcrypt(payload.password),
      });

      return result;
    } catch (err) {
      return err.message;
    }
  };

  const findOneAdmin = async (payload) => {
    try {
      return await findAdminByUsernamePassword(payload);
    } catch (err) {
      return err.message;
    }
  };

  return {
    registerNewAdmin,
    findOneAdmin,
  };
};
