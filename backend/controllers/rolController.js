const rolService = require('../services/rolService');

exports.crearRol = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
        return res.status(400).json({ mensaje: 'El nombre del rol es obligatorio' });
        }

        const rol = await rolService.crearRol({ nombre });
        res.status(201).json(rol);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el rol' });
    }
};

exports.listarRoles = async (req, res) => {
    try {
        const roles = await rolService.listarRoles();
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los roles' });
    }
};
