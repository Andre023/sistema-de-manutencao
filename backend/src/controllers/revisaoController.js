// src/controllers/revisaoController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RevisaoController {
  // Lista todas as revisões
  getAll = async (req, res) => {
    try {
      const revisoes = await prisma.revisao.findMany({
        orderBy: { id: 'asc' }
      });
      return res.status(200).json(revisoes);
    } catch (error) {
      console.error("Erro ao buscar revisões:", error);
      return res.status(500).json({ error: "Erro ao buscar revisões" });
    }
  };

  // Busca uma revisão pelo ID
  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const revisao = await prisma.revisao.findUnique({
        where: { id: Number(id) }
      });
      if (!revisao) {
        return res.status(404).json({ error: "Revisão não encontrada" });
      }
      return res.status(200).json(revisao);
    } catch (error) {
      console.error("Erro ao buscar revisão:", error);
      return res.status(500).json({ error: "Erro ao buscar revisão" });
    }
  };

  // Cria uma nova revisão
  create = async (req, res) => {
    const { veiculo_id, km_prox_rev, rev_feita } = req.body;

    // Validação simples dos campos obrigatórios
    if (!veiculo_id || !km_prox_rev || !rev_feita) {
      return res.status(400).json({ error: "Os campos 'veiculo_id', 'km_prox_rev' e 'rev_feita' são obrigatórios" });
    }

    try {
      const novaRevisao = await prisma.revisao.create({
        data: {
          veiculo_id: Number(veiculo_id),
          km_prox_rev,
          rev_feita
        }
      });
      return res.status(201).json(novaRevisao);
    } catch (error) {
      console.error("Erro ao criar revisão:", error);
      return res.status(500).json({ error: "Erro ao criar revisão" });
    }
  };

  // Atualiza os dados de uma revisão
  update = async (req, res) => {
    const { id } = req.params;
    const { veiculo_id, km_prox_rev, rev_feita } = req.body;

    try {
      // Verifica se a revisão existe
      const revisaoExistente = await prisma.revisao.findUnique({
        where: { id: Number(id) }
      });
      if (!revisaoExistente) {
        return res.status(404).json({ error: "Revisão não encontrada" });
      }

      const revisaoAtualizada = await prisma.revisao.update({
        where: { id: Number(id) },
        data: {
          veiculo_id: veiculo_id ? Number(veiculo_id) : undefined,
          km_prox_rev,
          rev_feita
        }
      });
      return res.status(200).json(revisaoAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar revisão:", error);
      return res.status(500).json({ error: "Erro ao atualizar revisão" });
    }
  };

  // Exclui uma revisão
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      // Verifica se a revisão existe
      const revisaoExistente = await prisma.revisao.findUnique({
        where: { id: Number(id) }
      });
      if (!revisaoExistente) {
        return res.status(404).json({ error: "Revisão não encontrada" });
      }

      await prisma.revisao.delete({
        where: { id: Number(id) }
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir revisão:", error);
      return res.status(500).json({ error: "Erro ao excluir revisão" });
    }
  };
}

export default RevisaoController;
