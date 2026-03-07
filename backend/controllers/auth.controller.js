const { json } = require('express');
const usuario = require('../models/usuario');
const User = require('../models/usuario');
const bcrypt = require('bcryptjs');

//registar usuario
exports.registrar = async (req, res) => {
    try{
        const { nombre, email, password }= req.body;
        
        //validar campos
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg:'todos los campos son obligatorios'});
        }
        //verificar si el usuario existe
        const existe = await User.findOne({ email});
        if (existe) return res.status(400).json({ msg: 'el usuario ya existe'});

        //encriptar contraseña
        const hashedpassword = await bcrypt.hash(password, 10);

        //crear y guardar usuario
        const user = new User({ nombre, email, password: hashedpassword });
        await user.save();
        res.status(201).json({
            msg: 'usuario registrado correctamente',
            usuario: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });
    } catch (error) {
        console.error('error al registar:', error);
        res.status(500).json({
            msg: 'error en el servidor',
            error: error.message || error.toString()
        });
    }
};

//login sin token
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        //validar datos
        if (!email || !password){
            return res.status(400).json({ msg: 'debe ingresar email y contraseña' });
        }

        // buscar usuario
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'usuario no encontrado' });

        //comparar contraseñas
        const esValido = await bcrypt.compare(password, user.password);
        if (!esValido) return res.status(401).json({ msg: 'credenciales invalidas' });

        //devolver datos del usuario sin token
        res.json({
            msg: 'login exitoso',
            usuario: {
                id: user._id,
                nombre: user.nombre,
                email: user.email
            }
        });
    }catch(error){
        console.error('error en login:', error);
        res.status(500).json({
            msg: 'error en el servidor',
            error: error.message || error.toString()
        })
    }
};