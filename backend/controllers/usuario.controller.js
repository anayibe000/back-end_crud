const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuariosCtrl = {};

usuariosCtrl.getUsuarios = async (req, res) => { // * GET: obtener todos los usuarios
    const usuarios = await Usuario.find().select('-password'); // method mongoose reservado
    res.json(usuarios); // ? respuesta 
};

usuariosCtrl.createUsuarios = async (req, res) => { // * POST: crear usuario
    const { name, email, password } = req.body; // payload API

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt); // contraseña encriptada

    const usuario = new Usuario({ // herencia usuario
        name,
        email,
        password: passwordHash
    });

    await usuario.save();

    res.json({ status: 'Usuario guardado' }); // ? respuesta
};

usuariosCtrl.getUnicUsuarios = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    res.json(usuario); // respuesta
};

usuariosCtrl.editaUsuarios = async (req, res) => { // * PUT: actualizar usuario
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    const usuarioEdit = {
        nombre,
        email
    };

    // Si enviaron contraseña, encriptarla
    if (password) {
        const salt = await bcrypt.genSalt(10);
        usuarioEdit.password = await bcrypt.hash(password, salt);
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuarioEdit, { new: true });
    
    res.json({ status: 'Usuario actualizado', usuario: usuarioActualizado });
};

usuariosCtrl.eliminaUsuarios = async (req, res) => { // * DELETE: eliminar usuario
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'Usuario eliminado' }); // ? respuesta
};

// ********************************************************************** LOGIN

usuariosCtrl.login = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(400).json({ message: 'Usuario no existe' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        { id: usuario._id },
        process.env.JWT_SECRET || 'secreta123',
        { expiresIn: '1h' }
    );

    res.json({
        token,
        usuario: {
            id: usuario._id,
            name: usuario.name,
            email: usuario.email
        }
    });
};

module.exports = usuariosCtrl;