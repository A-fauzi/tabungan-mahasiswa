module.exports = (transactionRepo) => {
  const { create, list, findNim } = transactionRepo();
  const registerNewTransaction = async (payload) => {
    try {
      return await create(payload);
    } catch (err) {
      return err.message;
    }
  };

  const getAll = async (startDate, endDate, nim, page, size) => {
    try {
      return await list(startDate, endDate, nim, page, size);
    } catch (err) {
      return err.message;
    }
  };

  const getByNim = async (nim, page, size) => {
    try {
      return await findNim(nim, page, size);
    } catch (err) {
      return err.message;
    }
  };

  return {
    registerNewTransaction,
    getAll,
    getByNim,
  };
};
