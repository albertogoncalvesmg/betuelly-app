"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Gift, ArrowLeft, Delete, QrCode, Smartphone } from "lucide-react";

export default function TelaBatePonto() {
  const [telefone, setTelefone] = useState("");
  const [modo, setModo] = useState<"scanner" | "teclado">("scanner");
  const [confirmado, setConfirmado] = useState(false);

  const adicionarDigito = (digito: string) => {
    if (telefone.length < 11) setTelefone((prev) => prev + digito);
  };

  const apagarDigito = () => {
    setTelefone((prev) => prev.slice(0, -1));
  };

  const registrarPonto = () => {
    setConfirmado(true);
    setTimeout(() => {
      setConfirmado(false);
      setTelefone("");
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#08284B] text-white flex flex-col justify-between p-6 select-none">
      {/* Topo com Símbolo Oficial Betuelly */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xs text-gray-300 flex items-center gap-1.5 hover:text-white bg-white/10 px-3 py-2 rounded-xl transition"
        >
          <ArrowLeft size={14} /> Voltar à Vitrine
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-xl shadow">
            <img
              src="/BETUELLY_simbolo.svg"
              alt="Símbolo Betuelly"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold tracking-widest text-white block leading-none">
              BETUELLY PULSE
            </span>
            <span className="text-[10px] text-[#00B8C4] font-semibold">
              TERMINAL DO BALCÃO
            </span>
          </div>
        </div>
      </div>

      {/* Centro: Leitor QR Code ou Teclado */}
      <div className="max-w-md w-full mx-auto my-6 bg-[#0d3562] border border-white/15 rounded-3xl p-6 shadow-2xl text-center">
        {!confirmado ? (
          <>
            <div className="w-14 h-14 bg-white rounded-2xl p-2 mx-auto mb-3 shadow-md flex items-center justify-center">
              <img
                src="/BETUELLY_simbolo.svg"
                alt="Betuelly"
                className="w-10 h-10 object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#00B8C4]/20 text-[#00B8C4] px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Gift size={14} /> CLUBE DA PADARIA
            </div>

            <h1 className="text-2xl font-extrabold mb-1">
              Bata seu ponto hoje!
            </h1>
            <p className="text-xs text-gray-300 mb-5">
              A cada <strong>5 visitas</strong>, ganhe 1 Café Expresso + Porção de Pão de Queijo.
            </p>

            {/* Seletor de Modo: Scanner vs Teclado */}
            <div className="grid grid-cols-2 gap-2 bg-[#08284B] p-1.5 rounded-2xl mb-5 border border-white/10">
              <button
                onClick={() => setModo("scanner")}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  modo === "scanner"
                    ? "bg-[#00B8C4] text-[#08284B]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <QrCode size={15} /> Leitor QR / Passe
              </button>
              <button
                onClick={() => setModo("teclado")}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  modo === "teclado"
                    ? "bg-[#00B8C4] text-[#08284B]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Smartphone size={15} /> Digitar WhatsApp
              </button>
            </div>

            {modo === "scanner" ? (
              <div className="py-4">
                <div
                  onClick={registrarPonto}
                  className="cursor-pointer group relative w-52 h-52 mx-auto rounded-3xl bg-[#08284B] border-2 border-dashed border-[#00B8C4] flex flex-col items-center justify-center p-6 hover:bg-[#08284B]/80 transition"
                >
                  <QrCode
                    size={72}
                    className="text-[#00B8C4] mb-3 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-bold text-white">
                    Aproxime o QR Code do seu Clube Betuelly
                  </span>
                  <span className="text-[11px] text-[#00B8C4] mt-1">
                    (Toque aqui para simular a leitura em 1s)
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Visor do Número */}
                <div className="bg-[#08284B] border-2 border-[#00B8C4] rounded-2xl py-3 px-4 mb-4 text-2xl font-mono tracking-widest h-14 flex items-center justify-center">
                  {telefone || (
                    <span className="text-gray-400 text-base">
                      DDD + Seu WhatsApp
                    </span>
                  )}
                </div>

                {/* Teclado Numérico Rápido */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                    <button
                      key={num}
                      onClick={() => adicionarDigito(num)}
                      className="bg-[#08284B] hover:bg-white/10 active:scale-95 transition text-xl font-bold py-3.5 rounded-xl border border-white/10"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setTelefone("31")}
                    className="bg-[#08284B]/60 text-[#00B8C4] text-xs font-bold py-3.5 rounded-xl border border-white/10"
                  >
                    DDD 31
                  </button>
                  <button
                    onClick={() => adicionarDigito("0")}
                    className="bg-[#08284B] hover:bg-white/10 active:scale-95 transition text-xl font-bold py-3.5 rounded-xl border border-white/10"
                  >
                    0
                  </button>
                  <button
                    onClick={apagarDigito}
                    className="bg-rose-500/20 text-rose-300 flex items-center justify-center py-3.5 rounded-xl border border-rose-400/20"
                  >
                    <Delete size={20} />
                  </button>
                </div>

                <button
                  onClick={registrarPonto}
                  disabled={telefone.length < 10}
                  className="w-full bg-[#00B8C4] disabled:opacity-40 text-[#08284B] font-extrabold text-base py-4 rounded-xl shadow-lg transition"
                >
                  REGISTRAR MINHA VISITA
                </button>
              </>
            )}
          </>
        ) : (
          <div className="py-8">
            <CheckCircle2
              size={64}
              className="text-[#00B8C4] mx-auto mb-4 animate-bounce"
            />
            <h2 className="text-2xl font-extrabold mb-2">
              Ponto Registrado em 1 Segundo!
            </h2>
            <p className="text-gray-200 text-sm mb-6">
              Comprovante enviado no seu WhatsApp. Você completou{" "}
              <strong>4 de 5 visitas</strong>! Na próxima visita seu Café + Pão de Queijo é por nossa conta.
            </p>
            <div className="bg-[#08284B] p-3.5 rounded-xl text-xs text-[#00B8C4] font-semibold">
              Liberando leitor para o próximo cliente da fila...
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400">
        Ambiente seguro • Adequado à LGPD • Betuelly Tecnologia
      </p>
    </div>
  );
}