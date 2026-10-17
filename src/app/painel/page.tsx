"use client";
import { useState } from "react";
import Link from "next/link";
import { Flame, AlertTriangle, Send, ArrowLeft, CheckCircle2, Clock } from "lucide-react";

const CLIENTES_EM_RISCO = [
  { nome: "João Carlos", turno: "Manhã (07h30)", frequencia: "A cada 2 dias", ausenteHa: "5 dias", status: "Em Risco" },
  { nome: "Maria Aparecida", turno: "Tarde (17h00)", frequencia: "A cada 3 dias", ausenteHa: "7 dias", status: "Em Risco" },
  { nome: "Roberto Silva", turno: "Manhã (08h00)", frequencia: "Diário", ausenteHa: "4 dias", status: "Atenção" },
  { nome: "Ana Paula Souza", turno: "Tarde (16h30)", frequencia: "2x/semana", ausenteHa: "11 dias", status: "Perdido" },
];

export default function PainelDonoPadaria() {
  const [alertaEnviado, setAlertaEnviado] = useState<string | null>(null);

  const dispararCampanha = (tipo: string) => {
    setAlertaEnviado(tipo);
    setTimeout(() => setAlertaEnviado(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1E242B] pb-12">
      {/* Barra Superior com Símbolo Oficial Betuelly */}
      <header className="bg-[#08284B] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="bg-white p-1.5 rounded-xl shadow">
            <img
              src="/BETUELLY_simbolo.svg"
              alt="Símbolo Betuelly"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div>
            <Link
              href="/"
              className="text-xs text-[#00B8C4] flex items-center gap-1 mb-0.5 hover:underline"
            >
              <ArrowLeft size={13} /> Voltar à Vitrine Betuelly
            </Link>
            <h1 className="text-base md:text-lg font-extrabold leading-tight">
              BETUELLY PULSE • Painel do Proprietário
            </h1>
          </div>
        </div>
        <Link
          href="/ponto"
          className="text-xs bg-[#00B8C4] text-[#08284B] font-extrabold px-4 py-2.5 rounded-xl shadow"
        >
          Abrir Leitor do Caixa
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-6">
        {alertaEnviado && (
          <div className="mb-6 bg-emerald-600 text-white p-4 rounded-xl flex items-center gap-3 shadow-lg">
            <CheckCircle2 size={22} />
            <span className="text-sm font-semibold">{alertaEnviado}</span>
          </div>
        )}

        {/* Indicadores Rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200">
            <p className="text-xs text-gray-500">Clientes Ativos na Base</p>
            <p className="text-2xl font-extrabold text-[#08284B] mt-1">842</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200">
            <p className="text-xs text-gray-500">Bateram Ponto Hoje</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">129</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-300">
            <p className="text-xs text-amber-700 font-semibold">Sumidos / Em Risco</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">37</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200">
            <p className="text-xs text-gray-500">Receita Recuperada (Mês)</p>
            <p className="text-2xl font-extrabold text-[#08284B] mt-1">R$ 2.840</p>
          </div>
        </div>

        {/* BOTÕES DE AÇÃO DE CAIXA IMEDIATO */}
        <h2 className="text-lg font-bold text-[#08284B] mb-3">
          ⚡ Ações Rápidas de Balcão (1 Clique)
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#08284B] text-white p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-xs bg-[#00B8C4]/20 text-[#00B8C4] px-2.5 py-1 rounded-full font-bold mb-3">
                <Flame size={14} /> GIRO DE FORNADA
              </span>
              <h3 className="text-xl font-bold mb-2">Avisar Fornada Quente da Tarde</h3>
              <p className="text-xs text-gray-300 mb-5">
                Envia aviso no WhatsApp apenas para os <strong>112 clientes habituais do turno da tarde</strong> que ainda não vieram hoje.
              </p>
            </div>
            <button
              onClick={() =>
                dispararCampanha(
                  "Disparo 'Fornada de Pão de Queijo Recheado' enviado para 112 clientes da tarde!"
                )
              }
              className="w-full bg-[#00B8C4] text-[#08284B] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Send size={16} /> Disparar Aviso de Fornada Agora
            </button>
          </div>

          <div className="bg-white border-2 border-[#08284B] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold mb-3">
                <Clock size={14} /> ZERO DESPERDÍCIO (18h30)
              </span>
              <h3 className="text-xl font-bold text-[#08284B] mb-2">
                Queima de Vitrine (Fim de Dia)
              </h3>
              <p className="text-xs text-gray-600 mb-5">
                Sobraram tortas, pães doces ou salgados? Envie oferta relâmpago com reserva via PIX para retirada até às 20h00.
              </p>
            </div>
            <button
              onClick={() =>
                dispararCampanha(
                  "Oferta de Fim de Tarde enviada para 65 clientes próximos!"
                )
              }
              className="w-full bg-[#08284B] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Send size={16} /> Disparar Oferta de Fim de Tarde
            </button>
          </div>
        </div>

        {/* TABELA DE CLIENTES QUE DEVERIAM TER VINDO E NÃO VIERAM */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#08284B] flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" />
                Quem deveria ter vindo hoje e sumiu
              </h2>
              <p className="text-xs text-gray-500">
                O Betuelly Pulse detetou quebra no padrão habitual de visitas destes clientes:
              </p>
            </div>
            <button
              onClick={() =>
                dispararCampanha(
                  "Campanha de Reativação ('Sentimos a sua falta + Café Cortesia') enviada para 37 clientes ausentes!"
                )
              }
              className="bg-[#00B8C4] text-[#08284B] font-bold px-4 py-2.5 rounded-xl text-xs shrink-0"
            >
              Reativar Todos os 37 no WhatsApp
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
                  <th className="py-3">Cliente</th>
                  <th className="py-3">Turno Habitual</th>
                  <th className="py-3">Padrão Normal</th>
                  <th className="py-3">Dias sem ir</th>
                  <th className="py-3">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {CLIENTES_EM_RISCO.map((c, i) => (
                  <tr key={i}>
                    <td className="py-3.5 font-bold text-[#08284B]">{c.nome}</td>
                    <td className="py-3.5 text-gray-600">{c.turno}</td>
                    <td className="py-3.5 text-gray-600">{c.frequencia}</td>
                    <td className="py-3.5 font-semibold text-rose-600">{c.ausenteHa}</td>
                    <td className="py-3.5">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}