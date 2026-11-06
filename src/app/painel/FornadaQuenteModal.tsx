"use client";

import React, { useState } from "react";
import { Flame, Send, CheckCircle2 } from "lucide-react";

interface FornadaModalProps {
  onDispararBroadcast?: (msg: string) => void;
}

export function FornadaQuenteTrigger({ onDispararBroadcast }: FornadaModalProps) {
  const [aberto, setAberto] = useState(false);
  const [item, setItem] = useState("Pão de Queijo Canastra Real");
  const [beneficio, setBeneficio] = useState("Pontos em Dobro no Totem");
  const [mensagem, setMensagem] = useState(
    "🔥 Fornada Quente de Pão de Queijo Canastra saindo agora do forno! Passe no balcão nos próximos 30 min, faça seu check-in e ganhe pontuação em dobro."
  );
  const [enviado, setEnviado] = useState(false);

  const handleDisparar = () => {
    const linkWa = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWa, "_blank");
    setEnviado(true);
    if (onDispararBroadcast) onDispararBroadcast(mensagem);
    setTimeout(() => {
      setEnviado(false);
      setAberto(false);
    }, 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 flex items-center gap-2 cursor-pointer transition-all"
      >
        <Flame className="w-4 h-4 fill-slate-950" />
        Disparar Alerta Fornada Quente
      </button>

      {aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#08284B] border border-[#00B8C4]/30 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base">Alerta Fornada Quente</h3>
              </div>
              <button 
                type="button"
                onClick={() => setAberto(false)} 
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-[#00B8C4] block mb-1">Item saindo do forno:</label>
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full bg-[#041527] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00B8C4]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#00B8C4] block mb-1">Benefício do Check-in:</label>
              <input
                type="text"
                value={beneficio}
                onChange={(e) => setBeneficio(e.target.value)}
                className="w-full bg-[#041527] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00B8C4]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#00B8C4] block mb-1">Texto do WhatsApp / Canal:</label>
              <textarea
                rows={3}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full bg-[#041527] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00B8C4] resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDisparar}
                className="px-5 py-2 rounded-xl bg-[#00B8C4] hover:bg-[#00B8C4]/90 text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
              >
                {enviado ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                {enviado ? "Disparado!" : "Transmitir no WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}