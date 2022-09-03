const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.replace("Bearer ", "");
    const docodeToken = jwt.decode(token).payload;

    if (docodeToken.role == "mahasiswa") {
      return res.status(403).json({ message: "UnAuthorized" });
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
