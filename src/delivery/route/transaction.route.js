const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

module.exports = (transactionController) => {
  const { create, list, findNim } = transactionController();
  router.post("/", authMiddleware, roleMiddleware, create);
  router.get("/", authMiddleware, list);
  router.get("/:nim", authMiddleware, findNim);

  return router;
};
