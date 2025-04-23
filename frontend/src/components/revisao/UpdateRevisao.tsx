import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

interface Revisao {
  veiculo_id: number;
  km_prox_rev: string;
  rev_feita: string;
}

interface Veiculo {
  id: number;
  nome: string;
}

export default function UpdateRevisao() {
  const { id } = useParams();
  const [revisao, setRevisao] = useState<Revisao>({
    veiculo_id: 0,
    km_prox_rev: "",
    rev_feita: "",
  });
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revRes, veiRes] = await Promise.all([
          api.get(`/revisao/${id}`),
          api.get("/veiculo"),
        ]);
        setRevisao(revRes.data);
        setVeiculos(veiRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/revisao/${id}`, revisao);
      navigate("/revisao");
    } catch (error) {
      console.error("Erro ao atualizar revisão:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Atualizar Revisão</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Veículo</label>
          <select
            className="form-select"
            value={revisao.veiculo_id}
            onChange={(e) =>
              setRevisao({ ...revisao, veiculo_id: Number(e.target.value) })
            }
          >
            <option value="">Selecione um veículo</option>
            {veiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">KM Próxima Revisão</label>
          <input
            type="text"
            className="form-control"
            value={revisao.km_prox_rev}
            onChange={(e) =>
              setRevisao({ ...revisao, km_prox_rev: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Revisão Feita</label>
          <input
            type="text"
            className="form-control"
            value={revisao.rev_feita}
            onChange={(e) =>
              setRevisao({ ...revisao, rev_feita: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">Atualizar</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/revisao")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
