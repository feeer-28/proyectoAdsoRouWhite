const empresaService = require('../services/empresaService');

exports.crearEmpresa = async (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;

        if (!nombre) {
        return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }

        const empresa = await empresaService.crearEmpresa({ nombre, direccion, telefono });
        res.status(201).json(empresa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la empresa' });
    }
};

exports.listarEmpresas = async (req, res) => {
    try {
        const empresas = await empresaService.listarEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las empresas' });
    }
};
