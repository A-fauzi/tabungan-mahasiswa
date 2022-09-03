const jwt = require("jsonwebtoken");
const Response = require("../../utils/response");

module.exports = (transactionService) => {
  const { registerNewTransaction, getAll, getByNim } = transactionService();

  const create = async (req, res) => {
    try {
      const payload = req.body;
      const transaction = await registerNewTransaction(payload);
      res.json(
        Response().successMessage(res.statusCode, "SUCCESS", transaction)
      );
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const list = async (req, res) => {
    try {
      // <<<<<<< HEAD
      let { startDate, endDate, nim, page, size } = req.query;

      if (isNaN(page) || isNaN(size)) {
        page = 1;
        size = 5;
      }
      const authHeader = req.headers["authorization"];
      const token = authHeader.replace("Bearer ", "");
      const docodeToken = jwt.decode(token).payload;
      if (docodeToken.role == "mahasiswa") {
        if (nim && nim != docodeToken.nim) {
          return res.status(403).json({ message: "invalid nim" });
        }
        if (startDate && endDate && page && size) {
          const { count, rows } = await getAll(
            startDate,
            endDate,
            docodeToken.nim,
            page,
            size
          );

          return res.json(
            Response().pagination(
              res.statusCode,
              "SUCCESS Get transaction",
              rows,
              page,
              count,
              size
            )
          );
        }
        const { count, rows } = await getByNim(docodeToken.nim, +page, +size);
        return res.json(
          Response().pagination(
            res.statusCode,
            "SUCCESS Get transaction",
            rows,
            page,
            count,
            size
          )
        );
      }

      const { count, rows } = await getAll(
        startDate,
        endDate,
        nim,
        +page,
        +size
      );

      res.json(
        Response().pagination(
          res.statusCode,
          "SUCCESS Get transaction",
          rows,
          page,
          count,
          size
        )
      );
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };

  const findNim = async (req, res) => {
    try {
      const { nim } = req.params;
      let { page, size } = req.query;
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

      const { count, rows } = await getByNim(nim, page, size);
      res.json(
        Response().pagination(
          res.statusCode,
          "SUCCESS Get Transaction",
          rows,
          page,
          count,
          size
        )
      );
    } catch (err) {
      res
        .status(400)
        .json(Response().errorMessage(res.statusCode, err.message));
    }
  };
  return {
    create,
    list,
    findNim,
  };
};
