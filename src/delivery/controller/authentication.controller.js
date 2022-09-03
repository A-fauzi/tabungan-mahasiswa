const AuthService = require("../../service/authentication.service");

module.exports = (authService) => {
  const { login } = authService();

  const loginAccount = async (req, res) => {
    try {
      const payload = req.body;
      const token = await login(payload);
      if (token !== "invalid account")
        return res.status(201).json({ token: token });
      if (token === "invalid account")
        return res.status(401).json({ message: token });
    } catch (e) {
      return e.message;
    }
  };
  return { loginAccount };
};
