module.exports = {
  catchErrors: (fn) => {
    return async (req, res) => {
      try {
        // throw new Error('error add sensor');
        await fn(req, res);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера.' });
      }
    };
  },
  responseHandler: (isExist, res, data = null) => {
    if (isExist) {
      if (data){
        res.status(200).json(data);
      } 
      else {
        res.status(204).json({});
      }
    } else {
      res.status(404).json({ message: 'Ошибка запроса' });
    }
  },
  errorHandler: (err, res) => {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера.' });
  },
};
