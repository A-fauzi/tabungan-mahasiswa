const jwt = require("jsonwebtoken");
const Response = require("../../utils/response");
module.exports = (mahasiswaService) => {
  const {
    registerMahasiswa,
    findAllMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    findByNim,
  } = mahasiswaService();

  const create = async (req, res) => {
    try {
      const payload = req.body;

      const mahasiswa = await registerMahasiswa(payload);

      res.json(Response().successMessage(res.statusCode, "SUCCESS", mahasiswa));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const list = async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader.replace("Bearer ", "");
      const docodeToken = jwt.decode(token).payload;
      if (docodeToken.role == "mahasiswa") {
        const mahasiswa = await findByNim(docodeToken.nim);
        return res.json(
          Response().successMessage(res.statusCode, "SUCCESS", mahasiswa)
        );
      }
      const mahasiswa = await findAllMahasiswa();
      res.json(Response().successMessage(res.statusCode, "SUCCES", mahasiswa));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const update = async (req, res) => {
    try {
      const payload = req.body;

      const mahasiswa = await updateMahasiswa(payload);

      res.json(Response().successMessage(res.statusCode, "SUCCES", mahasiswa));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const remove = async (req, res) => {
    try {
      const id = req.params.id;
      const mahasiswa = await deleteMahasiswa(id);
      res.json(Response().successMessage(res.statusCode, "SUCCES", mahasiswa));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const find = async (req, res) => {
    try {
      const { nim } = req.params;
      const authHeader = req.headers["authorization"];
      const token = authHeader.replace("Bearer ", "");
      const docodeToken = jwt.decode(token).payload;

      if (docodeToken.role == "mahasiswa") {
        if (docodeToken.nim != nim) {
          return res
            .status(400)
            .json(Response().errorMessage(res.statusCode, "UnAuthorization"));
        }
      }
      const mahasiswa = await findByNim(nim);

      res.json(Response().successMessage(res.statusCode, "SUCCES", mahasiswa));
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };
  return { create, list, update, remove, find };
};
