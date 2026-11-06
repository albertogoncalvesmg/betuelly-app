"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  CheckCircle2,
  Flame,
  Volume2,
  VolumeX,
  Smartphone,
  Award,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Trophy,
  Gift,
  Clock,
  MessageCircle,
} from "lucide-react";

export function TotemBalcaoShowcase() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stamps, setStamps] = useState(8);
  const [currentTime, setCurrentTime] = useState("");
  const [mysteryReward, setMysteryReward] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Chime sonoro harmônico nativo (Web Audio API)
  const playSuccessChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const emitir = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      emitir(523.25, 0.0, 0.25);
      emitir(659.25, 0.08, 0.25);
      emitir(783.99, 0.16, 0.35);
      emitir(1046.5, 0.26, 0.6);
    } catch {
      // Política de som do browser
    }
  };

  const dispararCheckIn = () => {
    setIsCheckedIn(true);
    playSuccessChime();
    setStamps((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  const handleManualPhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispararCheckIn();
  };

  const girarRoleta = () => {
    const premios = [
      "☕ 1 Café Expresso Grátis na próxima visita",
      "🧀 +50 Pontos Bônus Fornada Quente",
      "🥐 1 Pão Francês com Manteiga na Chapa",
      "⭐ 15% OFF no Bolo de Cenoura Vulcão",
    ];
    const sorteado = premios[Math.floor(Math.random() * premios.length)];
    setMysteryReward(sorteado);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-[#041527] text-white relative overflow-hidden">
      {/* Luzes de Fundo (Glow Cinematográfico) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B8C4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#08284B]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Título de Apresentação Comercial na Landing Page */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B8C4]/10 border border-[#00B8C4]/30 text-[#00B8C4] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Demonstração Interativa ao Vivo
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Veja como é simples para o seu cliente{" "}
            <span className="text-[#00B8C4]">fazer check-in no caixa</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Aproxime o smartphone ou digite o número para ver a experiência real com chime sonoro,
            cartão de carimbos e aumento de recorrência.
          </p>
        </div>

        {/* Grade: Tablet Totem (Esquerda) e Smartphone do Cliente (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TABELA TOTEM PRINCIPAL (Igual ao App) */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#070D1E] flex flex-col min-h-[580px]">
            {/* Barra Superior do Tablet */}
            <div className="bg-[#0B1528] px-6 py-4 border-b border-[#00B8C4]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00B8C4] to-[#08284B] flex items-center justify-center text-white font-extrabold shadow-md shadow-[#00B8C4]/30">
                  BP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-wide text-white">
                      BETUELLY PULSE
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00B8C4]/10 text-[#00B8C4] border border-[#00B8C4]/30">
                      Totem Balcão
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Padaria Artesanal & Café Especial</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-lg font-bold font-mono text-[#00B8C4]">
                    {currentTime || "16:45"}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">
                    Horário de Pico
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title={soundEnabled ? "Silenciar áudio" : "Ativar som de check-in"}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#00B8C4]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Alerta Fornada Quente Ativa */}
            <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                <div>
                  <span className="font-bold text-amber-300 text-sm">
                    🔥 Fornada Quente no Balcão!
                  </span>
                  <span className="text-xs text-slate-300 ml-2 hidden sm:inline">
                    Pão de Queijo Canastra saindo quentinho • Pontuação 2x no Check-in
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                2x Pontos Ativos
              </span>
            </div>

            {/* Superfície do Totem */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-radial from-[#0e1d3d] via-[#091124] to-[#050914] relative">
              {!isCheckedIn ? (
                /* ESTADO 1: Lendo QR Code */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-3xl mx-auto w-full">
                  <div className="md:col-span-7 flex flex-col items-center text-center">
                    <div className="relative p-6 rounded-3xl bg-[#0c1833]/80 border-2 border-[#00B8C4]/40 shadow-xl group">
                      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00B8C4]" />
                      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00B8C4]" />
                      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00B8C4]" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00B8C4]" />

                      <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-gradient-to-b from-[#0e2145] to-[#071022] flex flex-col items-center justify-center p-4 border border-[#00B8C4]/20">
                        <div className="w-20 h-20 rounded-2xl bg-[#00B8C4]/10 border border-[#00B8C4]/40 flex items-center justify-center mb-3">
                          <QrCode className="w-12 h-12 text-[#00B8C4]" />
                        </div>
                        <span className="text-white font-bold text-sm tracking-wide">
                          Aponte seu QR Code
                        </span>
                        <span className="text-[11px] text-[#00B8C4]/80 mt-1">
                          No leitor do totem para pontuar
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={dispararCheckIn}
                      className="mt-5 w-full max-w-xs py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00B8C4] to-[#08284B] text-white font-extrabold text-sm shadow-lg shadow-[#00B8C4]/25 hover:brightness-110 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      Escanear Celular do Cliente
                    </button>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                    <div className="bg-[#0e1c39]/70 border border-[#00B8C4]/20 rounded-2xl p-5">
                      <span className="text-xs font-bold text-[#00B8C4] uppercase tracking-wider block mb-1">
                        Ou digite seu celular
                      </span>
                      <form onSubmit={handleManualPhoneSubmit} className="space-y-3">
                        <input
                          type="tel"
                          placeholder="(31) 99517-2722"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-[#081226] border border-[#00B8C4]/30 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00B8C4]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#00B8C4] border border-[#00B8C4]/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          Confirmar Check-in
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>

                    <div className="bg-[#09152b]/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-slate-200">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        Clube de Fidelidade Automático
                      </div>
                      <p>✓ 10 carimbos = 1 Fornada de Pão de Queijo grátis</p>
                      <p>✓ Pontuação instantânea sem aplicativo instalado</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ESTADO 2: SUCESSO DO CHECK-IN & CARTÃO */
                <div className="max-w-2xl mx-auto w-full text-center py-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full bg-[#00B8C4]/20 blur-xl animate-pulse" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00B8C4] to-[#08284B] flex items-center justify-center text-white shadow-xl shadow-[#00B8C4]/40 relative border-2 border-white/20">
                      <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                    Olá, Lucas Mendes!
                  </h3>
                  <p className="text-sm text-slate-300 mb-6">
                    Você ganhou <strong className="text-[#00B8C4]">+50 pontos</strong> hoje no balcão da padaria.
                  </p>

                  <div className="bg-[#0b1733]/90 border border-[#00B8C4]/30 rounded-2xl p-5 mb-5 text-left shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-sm text-slate-200">
                          Cartão Fidelidade • Cliente Ouro
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#00B8C4] bg-slate-900 px-2.5 py-1 rounded-lg border border-[#00B8C4]/20">
                        {stamps} de 10 Carimbos
                      </span>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-3">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const preenchido = idx < stamps;
                        return (
                          <div
                            key={idx}
                            className={`h-11 rounded-xl flex items-center justify-center border transition-all text-xs font-bold ${
                              preenchido
                                ? "bg-gradient-to-tr from-[#00B8C4] to-[#08284B] border-white text-white shadow-md shadow-[#00B8C4]/40"
                                : "bg-slate-900/60 border-slate-800 text-slate-600"
                            }`}
                          >
                            {preenchido ? "🧀" : idx + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {!mysteryReward ? (
                    <button
                      type="button"
                      onClick={girarRoleta}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:brightness-110 cursor-pointer inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Girar Roleta da Sorte Diária
                    </button>
                  ) : (
                    <div className="bg-amber-500/10 border border-amber-400/40 rounded-xl p-3 text-amber-300 text-xs font-bold inline-flex items-center gap-2 animate-bounce">
                      <Gift className="w-4 h-4 text-amber-400" />
                      Prêmio Ganho: {mysteryReward}
                    </div>
                  )}

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckedIn(false);
                        setMysteryReward(null);
                      }}
                      className="text-xs text-slate-400 hover:text-[#00B8C4] flex items-center gap-1.5 cursor-pointer py-1 px-3 rounded-lg hover:bg-slate-800/50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Testar Próximo Cliente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SMARTPHONE DO CLIENTE (Coluna Direita) */}
          <div className="lg:col-span-4 w-full max-w-sm mx-auto">
            <div className="relative rounded-[40px] border-[6px] border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-[#00B8C4]/10">
              <div className="rounded-[32px] overflow-hidden bg-gradient-to-b from-[#09152b] via-[#070f20] to-[#040813] text-white min-h-[540px] flex flex-col justify-between p-4 pt-6 border border-[#00B8C4]/20">
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mb-2">
                  <span className="font-bold text-white">16:45</span>
                  <span>100% 5G</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#0e1d3d]/95 border border-amber-400/50 shadow-xl mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-black block">
                        Notificação Betuelly Pulse
                      </span>
                      <strong className="text-xs text-white">
                        Pão de Queijo Canastra Saindo Agora!
                      </strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Pontos 2x no check-in no balcão nos próximos 30 minutos.
                  </p>
                </div>

                {/* QR Code de Demonstração */}
                <div className="my-auto text-center py-2">
                  <div className="p-4 rounded-3xl bg-white text-slate-950 shadow-2xl shadow-[#00B8C4]/20 inline-block">
                    <QrCode className="w-36 h-36 mx-auto stroke-[1.8]" />
                  </div>
                  <p className="text-xs text-[#00B8C4] font-semibold mt-3">
                    Apresente este QR Code no Totem
                  </p>
                </div>

                <button
                  type="button"
                  onClick={dispararCheckIn}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00B8C4] to-[#08284B] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Escanear no Totem Agora
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA para o Dono da Padaria fechar negócio via WhatsApp */}
        <div className="text-center pt-6">
          <Link
            href="https://wa.me/5531995172722?text=Ol%C3%A1!%20Testei%20o%20totem%20interativo%20no%20site%20e%20quero%20esse%20sistema%20no%20caixa%20da%20minha%20padaria."
            target="_blank"
            className="inline-flex items-center gap-2.5 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            Quero esse Totem no Caixa da Minha Padaria (Falar no WhatsApp)
          </Link>
        </div>
      </div>
    </section>
  );
}