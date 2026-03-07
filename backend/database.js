const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // 👈 AQUÍ, antes del connect

const URI = 'mongodb://localhost/empleados';

mongoose.connect(URI)
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error(err));

module.exports = mongoose;
