"use client";
import { TotemBalcaoShowcase } from "./components/TotemBalcaoShowcase";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  QrCode, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Search, 
  Loader2, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import confetti from "canvas-confetti";
import { supabase } from "@/app/ponto/supabase"; // ou "@/app/lib/supabase"

interface ClienteSupabase {
  id: string;
  padaria_id?: string;
  telefone: string;
  nome: string | null;
  total_visitas: number;
  status_recorrencia: string | null;
  ultima_visita_em: string | null;
}

const PADARIA_PILOTO_ID = "00000000-0000-0000-0000-000000000001";
const META_CARIMBOS = 10;

export default function PontoTotemBalcaoPage() {
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [clienteCheckIn, setClienteCheckIn] = useState<ClienteSupabase | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fornadaAtiva, setFornadaAtiva] = useState<{
    titulo: string;
    item: string;
    beneficio: string;
    ativa: boolean;
  }>({
    titulo: "Fornada Quente saindo agora!",
    item: "Pão de Queijo Canastra Real",
    beneficio: "+1 Carimbo Bônus no Totem",
    ativa: true,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Relógio do Totem
  useEffect(() => {
    const updateRelogio = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateRelogio();
    const interval = setInterval(updateRelogio, 1000);
    return () => clearInterval(interval);
    <TotemBalcaoShowcase />
  }, []);

  // Foco automático no input ao carregar ou reiniciar
  useEffect(() => {
    if (!isSuccess && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSuccess]);

  // Chime sonoro de sucesso via Web Audio API (nativo, sem dependência de MP3 externo)
  const tocarSomSucesso = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const emitirNota = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Acorde alegre de confirmação Betuelly (C5 -> E5 -> G5 -> C6)
      emitirNota(523.25, 0.0, 0.25);
      emitirNota(659.25, 0.08, 0.25);
      emitirNota(783.99, 0.16, 0.35);
      emitirNota(1046.50, 0.26, 0.55);
    } catch (e) {
      console.warn("Áudio prevenido pela política do navegador:", e);
    }
  };

  // Disparo de Confetes Betuelly (Cores: Turquesa #00B8C4, Azul #08284B e Dourado)
  const dispararConfetes = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6, x: 0.35 },
        colors: ["#00B8C4", "#08284B", "#FFB703", "#FFFFFF"],
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6, x: 0.65 },
        colors: ["#00B8C4", "#08284B", "#FFB703", "#FFFFFF"],
      });
    } catch {
      // Caso canvas-confetti não esteja disponível
    }
  };

  // Formatador de Telefone Brasileiro (DDD + 9 dígitos)
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 6) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    }
    setTelefone(valor);
    setErrorMessage(null);
  };

  // Processamento do Check-in no Supabase
  const registrarCheckIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const telLimpo = telefone.replace(/\D/g, "");

    if (telLimpo.length < 10) {
      setErrorMessage("Por favor, digite o DDD e o número completo do celular.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Busca se o cliente já existe para esta padaria
      const { data: clienteExistente, error: searchError } = await supabase
        .from("clientes")
        .select("*")
        .eq("telefone", telLimpo)
        .eq("padaria_id", PADARIA_PILOTO_ID)
        .maybeSingle();

      if (searchError) throw searchError;

      const agoraIso = new Date().toISOString();
      let clienteSalvo: ClienteSupabase;

      if (clienteExistente) {
        // Atualiza total de visitas e última visita
        const novoTotal = (clienteExistente.total_visitas || 0) + 1;
        const { data: atualizado, error: updateError } = await supabase
          .from("clientes")
          .update({
            total_visitas: novoTotal,
            ultima_visita_em: agoraIso,
            status_recorrencia: novoTotal >= 5 ? "VIP" : "Ativo",
          })
          .eq("id", clienteExistente.id)
          .select()
          .single();

        if (updateError) throw updateError;
        clienteSalvo = atualizado;
      } else {
        // Cadastra novo cliente instantaneamente no balcão
        const { data: novo, error: insertError } = await supabase
          .from("clientes")
          .insert({
            padaria_id: PADARIA_PILOTO_ID,
            telefone: telLimpo,
            nome: `Cliente ${telLimpo.slice(-4)}`,
            total_visitas: 1,
            status_recorrencia: "Novo",
            ultima_visita_em: agoraIso,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        clienteSalvo = novo;
      }

      setClienteCheckIn(clienteSalvo);
      setIsSuccess(true);
      tocarSomSucesso();
      dispararConfetes();

      // Limpeza do input para o próximo
      setTelefone("");
    } catch (err: unknown) {
      console.error("Erro no check-in:", err);
      const msg = err instanceof Error ? err.message : "Falha ao registrar check-in.";
      setErrorMessage(`${msg}. Verifique a conexão com o Supabase.`);
    } finally {
      setLoading(false);
    }
  };

  // Simular leitura de QR Code do celular
  const simularLeituraQrCode = () => {
    setTelefone("(31) 99517-2722");
    setTimeout(() => {
      registrarCheckIn();
    }, 200);
  };

  // Reiniciar estado do totem para o próximo cliente
  const reiniciarTotem = () => {
    setIsSuccess(false);
    setClienteCheckIn(null);
    setTelefone("");
    setErrorMessage(null);
  };

  // Cálculos de carimbos para o cartão de fidelidade
  const visitas = clienteCheckIn?.total_visitas || 1;
  const carimbosAtuais = ((visitas - 1) % META_CARIMBOS) + 1;
  const bateuMeta = carimbosAtuais === META_CARIMBOS;

  return (
    <div className="min-h-screen bg-[#041527] text-slate-100 flex flex-col justify-between p-3 sm:p-6 antialiased select-none font-sans">
      {/* Barra Superior do Totem Betuelly */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between bg-[#08284B]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#00B8C4]/20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B8C4] to-[#08284B] flex items-center justify-center text-white font-extrabold shadow-md shadow-[#00B8C4]/25">
            BP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wide text-white">
                BETUELLY PULSE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00B8C4]/15 text-[#00B8C4] border border-[#00B8C4]/30">
                Totem Balcão
              </span>
            </div>
            <p className="text-xs text-slate-300">Fidelização & Recorrência no Caixa</p>
          </div>
        </div>

        {/* Relógio em Tempo Real e Botão de Áudio */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-lg font-bold font-mono text-[#00B8C4]">{currentTime || "16:45"}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Caixa Ativo</div>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-[#041527]/80 hover:bg-[#041527] text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? "Silenciar Chime" : "Ativar Chime"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#00B8C4]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <Link
            href="/painel"
            className="hidden md:flex text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#08284B] hover:bg-[#0d3562] text-slate-300 border border-slate-700 transition-all items-center gap-1.5"
          >
            Ir ao Painel
          </Link>
        </div>
      </header>

      {/* Banner de Notificação "Fornada Quente" */}
      {fornadaAtiva.ativa && (
        <div className="w-full max-w-5xl mx-auto mt-3 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 px-5 py-2.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <div className="absolute inset-0 blur-sm bg-amber-400/40 rounded-full" />
            </div>
            <div>
              <span className="font-bold text-amber-300 text-sm">{fornadaAtiva.titulo}</span>
              <span className="text-xs text-slate-300 ml-2 hidden sm:inline">
                {fornadaAtiva.item} • {fornadaAtiva.beneficio}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/25 text-amber-200 border border-amber-500/40">
            Fornada Ativa
          </span>
        </div>
      )}

      {/* Área Central: Superfície do Tablet */}
      <main className="w-full max-w-5xl mx-auto my-auto py-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#08284B]/80 via-[#041527]/90 to-[#041527] border-2 border-[#00B8C4]/30 shadow-2xl p-6 sm:p-10 min-h-[520px] flex flex-col justify-center">
          
          {/* Efeito Glow / Iluminação de Fundo */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#00B8C4]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#08284B]/40 rounded-full blur-3xl pointer-events-none" />

          {!isSuccess ? (
            /* ESTADO 1: AGUARDANDO CHECK-IN (QR CODE OU TELEFONE) */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto w-full relative z-10">
              
              {/* Coluna Esquerda: Mirante do QR Code */}
              <div className="md:col-span-6 flex flex-col items-center text-center">
                <div className="relative p-6 rounded-3xl bg-[#08284B]/60 border border-[#00B8C4]/30 shadow-xl group">
                  {/* Marcadores dos 4 Cantos */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00B8C4]" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00B8C4]" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00B8C4]" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00B8C4]" />

                  <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-[#041527] flex flex-col items-center justify-center p-4 border border-[#00B8C4]/20">
                    <div className="w-20 h-20 rounded-2xl bg-[#00B8C4]/10 border border-[#00B8C4]/40 flex items-center justify-center mb-3">
                      <QrCode className="w-12 h-12 text-[#00B8C4]" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide">
                      Aponte seu QR Code
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[180px]">
                      Aproxime a tela do seu celular para pontuar
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={simularLeituraQrCode}
                  className="mt-4 text-xs font-semibold text-[#00B8C4] hover:text-[#00B8C4]/80 flex items-center gap-1.5 cursor-pointer py-1 px-3 rounded-lg hover:bg-[#08284B]/50 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Simular Leitura do Celular
                </button>
              </div>

              {/* Coluna Direita: Digitação de Telefone & Vantagens */}
              <div className="md:col-span-6 space-y-5">
                <div className="bg-[#08284B]/70 border border-[#00B8C4]/30 rounded-2xl p-6 shadow-lg">
                  <span className="text-xs font-bold text-[#00B8C4] uppercase tracking-wider block mb-1">
                    Ou digite seu celular no balcão
                  </span>
                  <p className="text-xs text-slate-300 mb-4">
                    Insira seu DDD + Celular para pontuar na visita de hoje:
                  </p>

                  <form onSubmit={registrarCheckIn} className="space-y-3">
                    <div>
                      <input
                        ref={inputRef}
                        type="tel"
                        placeholder="(31) 99517-2722"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        disabled={loading}
                        className="w-full bg-[#041527] border-2 border-[#00B8C4]/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 text-lg font-mono tracking-wide focus:outline-none focus:border-[#00B8C4] focus:ring-2 focus:ring-[#00B8C4]/20 transition-all"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || telefone.replace(/\D/g, "").length < 10}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00B8C4] to-[#08284B] hover:brightness-110 text-white text-sm font-extrabold shadow-lg shadow-[#00B8C4]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registrando Visita...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirmar Check-in</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Resumo de Benefícios */}
                <div className="bg-[#041527]/60 border border-slate-700/60 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Award className="w-4 h-4 text-amber-400" />
                    Regras do Clube Fidelidade
                  </div>
                  <ul className="space-y-1.5 text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B8C4]" />
                      10 carimbos = 1 Fornada de Pão de Queijo ou Café Especial
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B8C4]" />
                      Receba avisos instantâneos de Fornada Quente no WhatsApp
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* ESTADO 2: SUCESSO DO CHECK-IN & CARTÃO DE CARIMBOS */
            <div className="max-w-2xl mx-auto w-full text-center py-2 relative z-10 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Ícone de Sucesso Iluminado */}
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full bg-[#00B8C4]/25 blur-xl animate-pulse" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00B8C4] to-[#08284B] flex items-center justify-center text-white shadow-xl shadow-[#00B8C4]/40 relative border-2 border-white/20">
                  <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-xs font-bold tracking-widest text-[#00B8C4] uppercase">
                  Check-in Confirmado com Sucesso!
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {clienteCheckIn?.nome || "Cliente Especial"}
                </h2>
                <p className="text-sm text-slate-300">
                  Sua visita foi registrada. Total acumulado:{" "}
                  <strong className="text-[#00B8C4] font-bold">
                    {clienteCheckIn?.total_visitas} visita(s)
                  </strong>
                </p>
              </div>

              {/* Cartão de 10 Carimbos Digital */}
              <div className="bg-[#08284B]/80 border border-[#00B8C4]/30 rounded-2xl p-6 mb-6 text-left shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-sm text-white">
                      Cartão Fidelidade • {clienteCheckIn?.status_recorrencia || "Ativo"}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#00B8C4] bg-[#041527] px-3 py-1 rounded-lg border border-[#00B8C4]/30">
                    {carimbosAtuais} de {META_CARIMBOS} Carimbos
                  </span>
                </div>

                {/* Grid dos 10 Carimbos */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-3">
                  {Array.from({ length: META_CARIMBOS }).map((_, idx) => {
                    const numero = idx + 1;
                    const preenchido = numero <= carimbosAtuais;
                    const acabouDeGanhar = numero === carimbosAtuais;

                    return (
                      <div
                        key={idx}
                        className={`h-12 rounded-xl flex items-center justify-center border transition-all text-sm font-bold ${
                          preenchido
                            ? acabouDeGanhar
                              ? "bg-gradient-to-tr from-[#00B8C4] to-[#08284B] border-white text-white scale-105 shadow-md shadow-[#00B8C4]/40"
                              : "bg-[#00B8C4]/20 border-[#00B8C4]/60 text-[#00B8C4]"
                            : "bg-[#041527]/70 border-slate-700 text-slate-600"
                        }`}
                      >
                        {preenchido ? "🧀" : numero}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-slate-700">
                  {bateuMeta ? (
                    <span className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      Parabéns! Você completou a cartela e ganhou o brinde da padaria!
                    </span>
                  ) : (
                    <span>
                      Faltam apenas{" "}
                      <strong className="text-[#00B8C4]">
                        {META_CARIMBOS - carimbosAtuais} visita(s)
                      </strong>{" "}
                      para o próximo brinde!
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {clienteCheckIn?.id?.slice(0, 8)}
                  </span>
                </div>
              </div>

              {/* Botão de Finalizar & Atender Próximo */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={reiniciarTotem}
                  className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#00B8C4] to-[#08284B] hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-[#00B8C4]/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Próximo Cliente do Caixa
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Rodapé do Totem */}
      <footer className="w-full max-w-5xl mx-auto flex items-center justify-between text-xs text-slate-400 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Totem Sincronizado com Supabase • Padaria Piloto</span>
        </div>
        <span>Betuelly Pulse OS</span>
      </footer>
    </div>
  );
}