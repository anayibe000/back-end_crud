const Producto = require('../models/producto');

const productoCtrl = {};

productoCtrl.getProductos = async (req, res) => { // * GET: obtener todos los productos
    const productos = await Producto.find(); // mongoose method
    res.json(productos); // ? respuesta
}

productoCtrl.createProductos = async (req, res) => { // * CREATE: crear producto

const producto = new Producto(req.body);
    await producto.save();
    res.json({'status': 'Producto guardado'}); // ? respuesta
}

productoCtrl.getUnicProductos = async (req, res) => { // * GET: obtener un unico producto
    const productoUnico = await Producto.findById(req.params.id); // mongoose method
    res.json(productoUnico); // ? respuesta
}

productoCtrl.editaProductos = async (req, res) => { // * PUT: actualizar producto
    const { id } = req.params;
    const productoEdit = {
        nombre: req.body.nombre,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    };
    await Producto.findByIdAndUpdate(id, productoEdit, { new: true }); // mongoose method
    res.json({ status: 'Producto Actualizado' }); // ? respuesta
};


productoCtrl.eliminaProductos = async (req, res) => { // * DELETE: eliminar producto
    await Producto.findByIdAndDelete(req.params.id); // mongoose method
    res.json({status: 'Producto Eliminado'}); // ? respuesta
}

module.exports = productoCtrl;