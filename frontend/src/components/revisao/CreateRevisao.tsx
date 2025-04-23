import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface Veiculo {
  id: number;
  nome: string;
}

export default function CreateRevisao() {
  const [veiculoId, setVeiculoId] = useState(0);
  const [kmProxRev, setKmProxRev] = useState("");
  const [revFeita, setRevFeita] = useState("");
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await api.get("/veiculo");
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };
    fetchVeiculos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/revisao", {
        veiculo_id: veiculoId,
        km_prox_rev: kmProxRev,
        rev_feita: revFeita,
      });
      navigate("/revisao");
    } catch (error) {
      console.error("Erro ao criar revisão:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nova Revisão</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Veículo</label>
          <select
            className="form-select"
            value={veiculoId}
            onChange={(e) => setVeiculoId(Number(e.target.value))}
            required
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
            value={kmProxRev}
            onChange={(e) => setKmProxRev(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Revisão Feita</label>
          <input
            type="text"
            className="form-control"
            value={revFeita}
            onChange={(e) => setRevFeita(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Salvar</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/revisao")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
