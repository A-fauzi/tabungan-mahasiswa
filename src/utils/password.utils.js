const bcrypt = require('bcryptjs')

// string hash password
const passwordUtils = async (password) => {
    const saltPassword = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, saltPassword)
}

// Boolean
const passwordCompare = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

module.exports = passwordCompare