import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface Revisao {
  id: number;
  km_prox_rev: string;
  rev_feita: string;
  veiculo: {
    nome: string;
  };
}

export default function ListRevisao() {
  const [revisoes, setRevisoes] = useState<Revisao[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Revisao>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchRevisoes = async () => {
      try {
        const response = await api.get("/revisao");
        setRevisoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar revisões:", error);
      }
    };
    fetchRevisoes();
  }, []);

  const handleDeleteRevisao = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir essa revisão?")) return;
    try {
      await api.delete(`/revisao/${id}`);
      setRevisoes((prev) => prev.filter((rev) => rev.id !== id));
    } catch (error) {
      console.error("Erro ao deletar revisão:", error);
    }
  };

  const handleSort = (field: keyof Revisao) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sorted = [...revisoes].filter((rev) =>
    rev.km_prox_rev.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortOrder === "asc"
      ? valA > valB ? 1 : -1
      : valA < valB ? 1 : -1;
  });

  return (
    <div className="container">
      <div className="row g-3 mt-3 border rounded p-4 m-0">
        <h1 className="text-center m-0">Lista de Revisões</h1>

        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por KM"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-sm-8 d-flex justify-content-end gap-3">
          <Link to="/revisao/create" className="btn btn-success">Inserir</Link>
          <Link to="/" className="btn btn-secondary">Voltar</Link>
        </div>
      </div>

      <div className="mt-4" style={{ height: "600px" }}>
        <div className="h-100 overflow-y-auto border rounded">
          <table className="table table-striped table-bordered table-hover m-0">
            <thead className="table-dark">
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                  ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Veículo</th>
                <th onClick={() => handleSort("km_prox_rev")} style={{ cursor: "pointer" }}>
                  KM Próx. Revisão {sortField === "km_prox_rev" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Revisão Feita</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.id} className="align-middle">
                  <td>{r.id}</td>
                  <td>{r.veiculo?.nome}</td>
                  <td>{r.km_prox_rev}</td>
                  <td>{r.rev_feita}</td>
                  <td>
                    <Link to={`/revisao/update/${r.id}`} className="btn btn-primary me-2">
                      Atualizar
                    </Link>
                    <button onClick={() => handleDeleteRevisao(r.id)} className="btn btn-danger">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
