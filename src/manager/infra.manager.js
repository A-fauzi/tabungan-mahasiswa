const { Sequelize } = require("sequelize");

module.exports = (config) => {
  const initDb = () => {
    const { dbHost, dbPort, dbUser, dbPassword, dbName, dbDriver } = config;
    const connectionString = `${dbDriver}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
    return new Sequelize(connectionString, { logging: false });
  };
  return { initDb };
};
