const Response = require("../../utils/response");
module.exports = (adminService) => {
  const { registerNewAdmin, findOneAdmin } = adminService();

  const create = async (req, res) => {
    try {
      const payload = req.body;
      const admin = await registerNewAdmin(payload);
      res.json(Response().successMessage(res.statusCode, "SUCCESS", admin));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const findAdmin = async (req, res) => {
    try {
      const payload = req.body;

      const admin = await findOneAdmin(payload.username);
      res.json(Response().successMessage(res.statusCode, "SUCCESS", admin));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };
  return {
    create,
    findAdmin,
  };
};
