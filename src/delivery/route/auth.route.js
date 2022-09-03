const express = require('express')
const router = express.Router()
module.exports = (authController) => {
    const { loginAccount } = authController()
    router.post('/', loginAccount)
    return router
}