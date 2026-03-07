const express = require('express');
const router = express.Router();
const productosCtrl = require('../controllers/producto.controller');
const auth = require('../middlewares/auth');

// CRUD
router.get('/', productosCtrl.getProductos);
router.post('/', productosCtrl.createProductos);
router.get('/:id', productosCtrl.getUnicProductos);
router.put('/:id', productosCtrl.editaProductos);
router.delete('/:id', productosCtrl.eliminaProductos);


module.exports = router;