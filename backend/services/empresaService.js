const { Empresa } = require('../models');

exports.crearEmpresa = async ({ nombre, direccion, telefono }) => {
    const nuevaEmpresa = await Empresa.create({ nombre, direccion, telefono });
    return nuevaEmpresa;
};

exports.listarEmpresas = async () => {
    const empresas = await Empresa.findAll();
    return empresas;
};
