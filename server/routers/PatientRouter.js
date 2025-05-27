const express = require('express');

const router = express.Router();


let pacientes = [];

// 
router.get('/', async (req, res) => {
    res.json(pacientes);
});

router.get('/:dni', async (req, res) => {
    const paciente = pacientes.find(p => p.dni === req.params.dni);
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json(paciente);
});

router.post('/', async (req, res) => {
    const { dni, nombre, apellidos, direccion, localidad, telefono } = req.body;

    if (pacientes.some(p => p.dni === dni)) {
        return res.status(400).json({ message: 'El DNI ya existe' });
    }

    const newPaciente = { dni, nombre, apellidos, direccion, localidad, telefono };
    pacientes.push(newPaciente);
    res.status(201).json(newPaciente);
});

router.put('/:dni', async (req, res) => {
    const index = pacientes.findIndex(p => p.dni === req.params.dni);
    if (index === -1) return res.status(404).json({ message: 'Paciente no encontrado' });

    pacientes[index] = { ...pacientes[index], ...req.body };
    res.json(pacientes[index]);
});

router.delete('/:dni', async (req, res) => {
    const index = pacientes.findIndex(p => p.dni === req.params.dni);
    if (index === -1) return res.status(404).json({ message: 'Paciente no encontrado' });

    pacientes.splice(index, 1);
    res.json({ message: 'Paciente eliminado' });
});

module.exports = router;
