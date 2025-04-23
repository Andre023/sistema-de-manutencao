// src/components/veiculo/VeiculoList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

type Veiculo = {
  id: number;
  modelo: string;
  marca: string;
  placa: string;
};

export default function VeiculoList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Veiculo>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    api.get("/veiculos").then((response) => setVeiculos(response.data));
  }, []);

  const handleSort = (field: keyof Veiculo) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sorted = [...veiculos]
    .filter((v) =>
      `${v.modelo} ${v.marca} ${v.placa}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      return sortOrder === "asc" ? Number(fieldA) - Number(fieldB) : Number(fieldB) - Number(fieldA);
    });

  const handleDelete = async (id: number) => {
    if (window.confirm("Confirma exclusão?")) {
      await api.delete(`/veiculos/${id}`);
      setVeiculos(veiculos.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="row g-3 mt-3 border rounded p-4 m-0">
        <h1 className="text-center m-0">Lista de Veículos</h1>

        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por modelo/marca/placa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-sm-8 d-flex justify-content-end gap-3">
          <Link to="/veiculo/create" className="btn btn-success">
            Inserir
          </Link>
          <Link to="/" className="btn btn-secondary">
            Voltar
          </Link>
        </div>
      </div>

      <div className="mt-4" style={{ height: '600px' }}>
        <div className="h-100 overflow-y-auto border rounded">
          <table className="table table-striped table-bordered table-hover m-0">
            <thead className="table-dark">
              <tr>
                <th onClick={() => handleSort("id")} style={{ cursor: 'pointer' }}>
                  ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort("modelo")} style={{ cursor: 'pointer' }}>
                  Modelo {sortField === 'modelo' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort("marca")} style={{ cursor: 'pointer' }}>
                  Marca {sortField === 'marca' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort("placa")} style={{ cursor: 'pointer' }}>
                  Placa {sortField === 'placa' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((v) => (
                <tr key={v.id} className="align-middle">
                  <td>{v.id}</td>
                  <td>{v.modelo}</td>
                  <td>{v.marca}</td>
                  <td>{v.placa}</td>
                  <td>
                    <Link to={`/veiculo/update/${v.id}`} className="btn btn-primary me-2">
                      Atualizar
                    </Link>
                    <button onClick={() => handleDelete(v.id)} className="btn btn-danger">
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
