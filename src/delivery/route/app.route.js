const express = require("express");
const router = express.Router();

module.exports = (adminRoute, transactionRoute, mahasiswaRoute, authRoute) => {
  router.use("/admin", adminRoute);
  router.use('/login', authRoute);
  router.use("/transaction", transactionRoute);
  router.use("/mahasiswa", mahasiswaRoute);

  return router;
};
