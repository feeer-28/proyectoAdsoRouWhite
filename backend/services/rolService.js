const { Rol } = require('../models');

exports.crearRol = async ({ nombre }) => {
    const nuevoRol = await Rol.create({ nombre });
    return nuevoRol;
};

exports.listarRoles = async () => {
    const roles = await Rol.findAll();
    return roles;
};
