module.exports = {
  catchErrors: (fn) => {
    return (...args) => {
      try {
        fn(...args);
      } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Ошибка сервера.' });
      }
    };
  },
};
