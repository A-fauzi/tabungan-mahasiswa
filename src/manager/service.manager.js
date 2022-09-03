const AdminService = require("../service/admin.service");
const TransactionService = require("../service/transaction.service");
const MahasiswaService = require("../service/mahasiswa.service");
const LoginService = require("../service/authentication.service");

module.exports = (repoManager) => {
  const { adminRepo, transactionRepo, mahasiswaRepo } = repoManager;

  const adminService = () => {
    return () => AdminService(adminRepo());
  };
  const transactionService = () => {
    return () => TransactionService(transactionRepo());
  };
  const mahasiswaService = () => {
    return () => MahasiswaService(mahasiswaRepo());
  };
  const authService = () => {
    return () => LoginService(adminRepo(), mahasiswaRepo());
  };
  return {
    adminService,
    transactionService,
    mahasiswaService,
    authService,
  };
};
