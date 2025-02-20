'use client'
import { useState } from "react";

const initialChamados = [
  { id: 1, titulo: "Problema com o servidor", descricao: "O servidor está fora do ar.", prioridade: "alta", status: "aberto" },
  { id: 2, titulo: "Erro no login", descricao: "Usuários não conseguem fazer login.", prioridade: "media", status: "aberto" },
];

export default function Home() {
  const [chamados, setChamados] = useState(initialChamados);
  const [novoChamado, setNovoChamado] = useState({ titulo: "", descricao: "", prioridade: "baixa" });
  const [busca, setBusca] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoChamado({ ...novoChamado, [name]: value });
  };

  const cadastrarChamado = (e) => {
    e.preventDefault();
    const id = chamados.length + 1;
    setChamados([...chamados, { ...novoChamado, id, status: "aberto" }]);
    setNovoChamado({ titulo: "", descricao: "", prioridade: "baixa" });
  };

  const removerChamadosFinalizados = () => {
    setChamados(chamados.filter((chamado) => chamado.status !== "finalizado"));
  };

  const reverterChamados = () => {
    setChamados([...chamados].reverse());
  };

  const limparChamados = () => {
    setChamados([]);
  };

  const chamadosFiltrados = chamados.filter(
    (chamado) =>
      chamado.id.toString().includes(busca) ||
      chamado.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const chamadosOrdenados = [...chamadosFiltrados].sort((a, b) => {
    const prioridades = { alta: 3, media: 2, baixa: 1 };
    return prioridades[b.prioridade] - prioridades[a.prioridade];
  });

  const estatisticas = {
    total: chamados.length,
    abertos: chamados.filter((chamado) => chamado.status === "aberto").length,
    finalizados: chamados.filter((chamado) => chamado.status === "finalizado").length,
  };

  return (
    <>
      <div className="h-full w-full bg-white py-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl text-slate-800 font-semibold">Cadastrar chamados</h2>

          <form onSubmit={cadastrarChamado}>
            <div className="mt-5">
              <label className="flex flex-col text-slate-600 font-semibold">
                Titulo do chamado
                <input
                  type="text"
                  name="titulo"
                  value={novoChamado.titulo}
                  onChange={handleInputChange}
                  placeholder="Cadastre o titulo do seu chamado"
                  className="border px-5 py-3 rounded-md font-normal border-slate-400"
                />
              </label>
            </div>
            <div className="mt-5">
              <label className="flex flex-col text-slate-600 font-semibold">
                Informações do chamado
                <textarea
                  name="descricao"
                  value={novoChamado.descricao}
                  onChange={handleInputChange}
                  placeholder="Insira as informações sobre o seu chamado"
                  className="border px-5 py-3 rounded-md font-normal border-slate-400"
                ></textarea>
              </label>
            </div>
            <div className="mt-5">
              <label className="flex flex-col text-slate-600 font-semibold">
                Prioridade
                <select
                  name="prioridade"
                  value={novoChamado.prioridade}
                  onChange={handleInputChange}
                  className="border px-5 py-3 rounded-md font-normal border-slate-400"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </label>
            </div>
            <button type="submit" className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-md">
              Cadastrar
            </button>
          </form>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Buscar por ID ou descrição"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="border px-5 py-3 rounded-md font-normal border-slate-400 text-zinc-400"
            />
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-semibold text-zinc-600">Chamados</h3>
            {chamadosOrdenados.map((chamado) => (
              <div key={chamado.id} className="mt-5 p-5 border border-zinc-400 rounded-md">
                <h3 className="text-xl font-semibold text-zinc-600">{chamado.titulo}</h3>
                <p className="text-zinc-600">{chamado.descricao}</p>
                <p className="text-zinc-600">Prioridade: {chamado.prioridade}</p>
                <p className="text-zinc-600">Status: {chamado.status}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h3 className="text-xl font-semibold text-zinc-600">Estatísticas</h3>
            <p className="text-zinc-600">Total de chamados: {estatisticas.total}</p>
            <p className="text-zinc-600">Chamados abertos: {estatisticas.abertos}</p>
            <p className="text-zinc-600">Chamados finalizados: {estatisticas.finalizados}</p>
          </div>

          <div className="mt-5 gap-3 flex flex-row">
            <button onClick={removerChamadosFinalizados} className="mt-5 bg-red-500 text-white px-5 py-2 rounded-md">
              Remover Chamados Finalizados
            </button>
            <button onClick={reverterChamados} className="mt-5 bg-yellow-500 text-white px-5 py-2 rounded-md">
              Reverter Chamados
            </button>
            <button onClick={limparChamados} className="mt-5 bg-purple-500 text-white px-5 py-2 rounded-md">
              Limpar Chamados
            </button>
          </div>
        </div>
      </div>
    </>
  );
}