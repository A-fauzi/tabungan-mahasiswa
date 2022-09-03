const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

module.exports = (mahasiswaController) => {
  const { create, list, update, remove, find } = mahasiswaController();
  router.post("/", authMiddleware, roleMiddleware, create);
  router.get("/", authMiddleware, list);
  router.get("/:nim", authMiddleware, find);
  router.put("/", authMiddleware, roleMiddleware, update);
  router.delete("/:id", authMiddleware, roleMiddleware, remove);
  return router;
};
