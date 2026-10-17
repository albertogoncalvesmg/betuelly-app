"use client";
import { useState } from "react";
import Link from "next/link";
import { Cake, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CatalogoEncomendas() {
  const [kit, setKit] = useState("Kit Festa 20 Pessoas (Bolo + 200 Salgados + 100 Doces) - R$ 249");
  const [aniversariante, setAniversariante] = useState("");
  const [dataRetirada, setDataRetirada] = useState("");
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1E242B] p-6">
      <div className="max-w-lg mx-auto">
        {/* Topo com Símbolo Oficial Betuelly */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-xs text-[#08284B] font-bold flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm"
          >
            <ArrowLeft size={14} /> Voltar à Vitrine
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/BETUELLY_simbolo.svg"
              alt="Símbolo Betuelly"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs font-extrabold tracking-widest text-[#08284B]">
              BETUELLY PULSE
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center shrink-0">
              <Cake size={22} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#00B8C4] uppercase tracking-wider">
                ENCOMENDA RÁPIDA SEM FILA
              </span>
              <h1 className="text-xl font-extrabold text-[#08284B]">
                Kits Festa, Bolos & Coffee Break
              </h1>
            </div>
          </div>

          {!enviado ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  1. Escolha o seu Kit ou Bolo
                </label>
                <select
                  value={kit}
                  onChange={(e) => setKit(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm bg-white"
                >
                  <option>Kit Festa 10 Pessoas (Bolo + 100 Salgados) - R$ 149</option>
                  <option>Kit Festa 20 Pessoas (Bolo + 200 Salgados + 100 Doces) - R$ 249</option>
                  <option>Coffee Break Empresarial (15 Pessoas) - R$ 219</option>
                  <option>Cesta de Café da Manhã Especial - R$ 169</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  2. Nome do Aniversariante (Para o Clube lembrar no próximo ano!)
                </label>
                <input
                  type="text"
                  placeholder="Ex.: Sofia (Filha)"
                  value={aniversariante}
                  onChange={(e) => setAniversariante(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar size={14} /> 3. Data e Hora para Retirada no Balcão
                </label>
                <input
                  type="datetime-local"
                  value={dataRetirada}
                  onChange={(e) => setDataRetirada(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm"
                />
              </div>

              <button
                onClick={() => setEnviado(true)}
                className="w-full bg-[#08284B] hover:bg-[#0d3562] text-white font-bold py-4 rounded-xl text-sm shadow-md transition"
              >
                Concluir Encomenda & Gerar PIX de Sinal (50%)
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-[#08284B] mb-2">
                Encomenda Registada no Betuelly Pulse!
              </h2>
              <p className="text-xs text-gray-600 mb-4">
                A produção da padaria já recebeu os dados e o lembrete automático de aniversário foi agendado no CRM para o próximo ano.
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="text-xs font-bold text-[#00B8C4]"
              >
                Fazer nova simulação
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}