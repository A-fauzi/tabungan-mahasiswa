const AdminRepository = require("../repository/admin.repository");
const TransactionRepository = require("../repository/transaction.repository");
const mahasiswaRepository = require("../repository/mahasiswa.repository");

module.exports = (infraManager) => {
  const { initDb } = infraManager;
  const db = initDb();

  const adminRepo = () => {
    return () => AdminRepository(db);
  };
  const transactionRepo = () => {
    return () => TransactionRepository(db);
  };
  const mahasiswaRepo = () => {
    return () => mahasiswaRepository(db);
  };
  return {
    adminRepo,
    transactionRepo,
    mahasiswaRepo,
  };
};
