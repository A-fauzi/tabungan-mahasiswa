const bcrypt = require('bcryptjs')

module.exports = (pass) => {
    return bcrypt.hashSync(pass, 8);
}