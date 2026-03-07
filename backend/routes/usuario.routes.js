const express = require('express');
const router = express.Router();
const usuariosCtrl = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth');

// CRUD
router.get('/', auth, usuariosCtrl.getUsuarios);
router.post('/', usuariosCtrl.createUsuarios);
router.get('/:id', auth, usuariosCtrl.getUnicUsuarios);
router.put('/:id', auth, usuariosCtrl.editaUsuarios);
router.delete('/:id', auth, usuariosCtrl.eliminaUsuarios);

// AUTH
router.post('/login', usuariosCtrl.login);

module.exports = router;