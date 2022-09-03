const http = require("http");
const express = require("express");
const app = express();
const Config = require("../config/config");
const DbMigration = require("../config/db.migration");
const jsonMiddleware = require("../delivery/middleware/json.middleware");
const AppRoute = require("../delivery/route/app.route");
const InfraManager = require("../manager/infra.manager");
const RepoManager = require("../manager/repo.manager");
const ServiceManager = require("../manager/service.manager");
const AdminController = require("./controller/admin.controller");
const UserRoute = require("./route/admin.route");
const authRoute = require("./route/auth.route");
const TransactionController = require("./controller/transaction.controller");
const TransactionRoute = require("./route/transaction.route");

const MahasiswaController = require("./controller/mahasiswa.controller");
const mahasiswaRoute = require("./route/mahasiswa.route");

const AuthController = require("../delivery/controller/authentication.controller");
const NoRoute = require("../delivery/route/no.route");

module.exports = () => {
  const { host, port } = Config();
  const infraManager = () => InfraManager(Config());
  const repoManager = () => RepoManager(infraManager());
  const serviceManager = () => ServiceManager(repoManager());
  const { initDb } = infraManager();

  const initAdminRoute = () => {
    const adminController = () =>
      AdminController(serviceManager().adminService());
    return UserRoute(adminController);
  };

  const iniLoginRoute = () => {
    const authController = () => AuthController(serviceManager().authService());

    return authRoute(authController);
  };
  const initTransactionRoute = () => {
    const transactionController = () =>
      TransactionController(serviceManager().transactionService());
    return TransactionRoute(transactionController);
  };
  const initMahasiswaRoute = () => {
    const mahasiswaController = () =>
      MahasiswaController(serviceManager().mahasiswaService());
    return mahasiswaRoute(mahasiswaController);
  };

  const initController = () => {
    app.use(jsonMiddleware);

    app.use(
      AppRoute(
        initAdminRoute(),
        initTransactionRoute(),
        initMahasiswaRoute(),
        iniLoginRoute()
      )
    );
    app.use(NoRoute);
  };

  const run = () => {
    initController();
    DbMigration(initDb()).catch();
    const server = http.createServer(app);
    server.on("error", (err) => {
      console.log(`Server failed to start ${err.message}`);
    });
    server.listen(port, () => {
      if (server.listening) {
        console.log(`Server run on ${host}:${port}`);
      }
    });
  };

  return { run };
};
