// src/controllers/VeiculoController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class VeiculoController {
  // Lista todos os veículos
  getAll = async (req, res) => {
    try {
      const veiculos = await prisma.veiculo.findMany({
        orderBy: { id: 'asc' }
      });
      return res.status(200).json(veiculos);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      return res.status(500).json({ error: "Erro ao buscar veículos" });
    }
  };

  // Busca um veículo pelo ID
  getById = async (req, res) => {
    const { id } = req.params;
    try {
      const veiculo = await prisma.veiculo.findUnique({
        where: { id: Number(id) }
      });
      if (!veiculo) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }
      return res.status(200).json(veiculo);
    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
      return res.status(500).json({ error: "Erro ao buscar veículo" });
    }
  };

  // Cria um novo veículo
  create = async (req, res) => {
    const { nome, placa, ano_fab, ano_model, cor, combustivel, quilometragem, utilidade } = req.body;

    // Validação simples
    if (!nome || !placa) {
      return res.status(400).json({ error: "Os campos 'nome' e 'placa' são obrigatórios" });
    }

    try {
      const novoVeiculo = await prisma.veiculo.create({
        data: {
          nome,
          placa,
          ano_fab: Number(ano_fab),
          ano_model: Number(ano_model),
          cor,
          combustivel,
          quilometragem,
          utilidade
        }
      });
      return res.status(201).json(novoVeiculo);
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
      return res.status(500).json({ error: "Erro ao criar veículo" });
    }
  };

  // Atualiza os dados de um veículo
  update = async (req, res) => {
    const { id } = req.params;
    const { nome, placa, ano_fab, ano_model, cor, combustivel, quilometragem, utilidade } = req.body;

    try {
      // Verifica se o veículo existe
      const veiculoExistente = await prisma.veiculo.findUnique({
        where: { id: Number(id) }
      });
      if (!veiculoExistente) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      const veiculoAtualizado = await prisma.veiculo.update({
        where: { id: Number(id) },
        data: {
          nome,
          placa,
          ano_fab: ano_fab ? Number(ano_fab) : undefined,
          ano_model: ano_model ? Number(ano_model) : undefined,
          cor,
          combustivel,
          quilometragem,
          utilidade
        }
      });
      return res.status(200).json(veiculoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      return res.status(500).json({ error: "Erro ao atualizar veículo" });
    }
  };

  // Exclui um veículo
  delete = async (req, res) => {
    const { id } = req.params;
    try {
      // Verifica se o veículo existe
      const veiculoExistente = await prisma.veiculo.findUnique({
        where: { id: Number(id) }
      });
      if (!veiculoExistente) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      await prisma.veiculo.delete({
        where: { id: Number(id) }
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      return res.status(500).json({ error: "Erro ao excluir veículo" });
    }
  };
}

export default VeiculoController;
