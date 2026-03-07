const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./database'); // 👈 solo se ejecuta la conexión

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3001' }));

// ROUTES
app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));

app.listen(app.get('port'), () => {
  console.log('Se escucha en el servidor ' + app.get('port'));
});

