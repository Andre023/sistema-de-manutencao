import { Router } from 'express';
import RevisaoController from '../controllers/revisaoController.js';

const router = Router();
const revisaoController = new RevisaoController();

// Lista todas as revisões: GET /revisao
router.get('/', revisaoController.getAll);

// Busca uma revisão específica: GET /revisao/:id
router.get('/:id', revisaoController.getById);

// Cria uma nova revisão: POST /revisao
router.post('/', revisaoController.create);

// Atualiza uma revisão: PUT /revisao/:id
router.put('/:id', revisaoController.update);

// Exclui uma revisão: DELETE /revisao/:id
router.delete('/:id', revisaoController.delete);

export default router;
