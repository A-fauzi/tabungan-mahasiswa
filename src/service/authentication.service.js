const jwtUtils = require("../utils/jwt.utils");

module.exports = (adminRepo, mahasiswaRepo) => {
  const { findAdminByUsernamePassword } = adminRepo();
  const { findAdminByNimPassword } = mahasiswaRepo();

  const login = async (payload) => {
    try {
      const user = await findAdminByUsernamePassword(
        payload.username,
        payload.password
      );

      const mahasiswa = await findAdminByNimPassword(
        payload.username || payload.nim,
        payload.password
      );

      if (!user && !mahasiswa) return "invalid account";

      return jwtUtils().signIn(!user ? mahasiswa : user);
    } catch (e) {
      return e.message;
    }
  };
  return {
    login,
  };
};
