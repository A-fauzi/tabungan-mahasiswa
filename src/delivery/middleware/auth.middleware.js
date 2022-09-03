const JwtUtils = require("../../utils/jwt.utils");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        message: "UnAuthorization",
      });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        message: "Token incorrect!",
      });
    }
    JwtUtils().verify(token);
    next();
  } catch (e) {
    res.status(401).json({
      message: e.message,
    });
  }
};
