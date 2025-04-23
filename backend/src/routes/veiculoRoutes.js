// src/routes/veiculoRoutes.js

import { Router } from 'express';
import VeiculoController from '../controllers/veiculoController.js';

const router = Router();
const veiculoController = new VeiculoController();

// Registra cada endpoint com o método correspondente do controlador.
router.get('/', veiculoController.getAll);
router.get('/:id', veiculoController.getById);
router.post('/', veiculoController.create);
router.put('/:id', veiculoController.update);
router.delete('/:id', veiculoController.delete);

export default router;
