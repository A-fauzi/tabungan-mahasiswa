const express = require('express');
const router = express.Router();
const roleMiddleware = require("../middleware/role.middleware");
module.exports = (adminController) => {
    const { create, findAdmin } = adminController();
    router.post('/', create);
    router.get('/', findAdmin);
    return router;
}