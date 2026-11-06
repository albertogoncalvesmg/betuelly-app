"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Tablet,
  BarChart3,
  Wand2,
  Store,
  Flame,
  Sparkles,
  QrCode,
  Smartphone,
  ChevronRight,
  Award,
  Eye,
  Camera,
  CheckCircle2,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  RotateCcw,
  ArrowRight,
  Star,
  Layers,
  Ratio,
  Sliders,
  Upload,
  Trophy,
  Gift,
  Volume2,
  VolumeX,
  MessageCircle,
} from "lucide-react";

// DADOS DOS PRODUTOS DA PADARIA
const PRODUTOS_PADARIA = [
  {
    id: "pao-de-queijo-canastra",
    name: "Pão de Queijo Canastra Real",
    category: "fornada",
    price: 4.5,
    description:
      "Receita artesanal mineira com Queijo Canastra curado. Casquinha dourada crocante e miolo super elástico.",
    imageUrl:
      "https://images.unsplash.com/photo-1598142981084-e4359eb23e8e?auto=format&fit=crop&w=800&q=80",
    isHotFresh: true,
    freshTime: "Há 5 minutos",
    tags: ["Mais Vendido", "Fornada Quente", "Sem Glúten"],
    rating: 4.9,
  },
  {
    id: "pao-frances-tradicional",
    name: "Pão Francês de Casca Dourada",
    category: "fornada",
    price: 1.2,
    description:
      "Fermentação lenta de 18 horas. Pestana aberta, estalo sonoro ao apertar e miolo aerado que derrete na boca.",
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    isHotFresh: true,
    freshTime: "Saindo agora",
    tags: ["Fornada Quente", "Tradição"],
    rating: 4.8,
  },
  {
    id: "bolo-cenoura-brigadeiro",
    name: "Bolo de Cenoura com Calda Vulcão",
    category: "doces",
    price: 16.9,
    description:
      "Massa fofa e bem laranjinha, coberta com calda brilhante de brigadeiro de panela com chocolate 50% cacau.",
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    isHotFresh: false,
    tags: ["Favorito da Tarde", "Chocolate Artesanal"],
    rating: 5.0,
  },
  {
    id: "sonho-doce-de-leite",
    name: "Sonho Recheado com Doce de Leite Viçosa",
    category: "doces",
    price: 9.5,
    description:
      "Massa levíssima frita no ponto perfeito, recheio generoso do autêntico doce de leite mineiro e polvilhado.",
    imageUrl:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isHotFresh: true,
    freshTime: "Há 12 minutos",
    tags: ["Artesanal", "Fornada Quente"],
    rating: 4.9,
  },
  {
    id: "pao-na-chapa-requeijao",
    name: "Pão na Chapa com Requeijão Tostado",
    category: "salgados",
    price: 8.5,
    description:
      "Pão francês fresquinho prensado na chapa com manteiga da fazenda e crostinha dourada de requeijão cremoso.",
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    isHotFresh: false,
    tags: ["Café da Manhã", "Clássico Paulista"],
    rating: 4.9,
  },
  {
    id: "cafe-pingado-especial",
    name: "Pingado Especial no Copo Americano",
    category: "cafes",
    price: 6.0,
    description:
      "Café arábica de torra média com leite vaporizado sedoso servido no icônico copo americano de vidro.",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    isHotFresh: true,
    tags: ["Café Especial", "Combina com Pão de Queijo"],
    rating: 4.7,
  },
  {
    id: "coxinha-cremosa-catupiry",
    name: "Coxinha Dourada com Catupiry Real",
    category: "salgados",
    price: 9.9,
    description:
      "Massa cremosa de caldo de frango caipira, frango desfiado bem temperado com ervas frescas e Catupiry.",
    imageUrl:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    isHotFresh: true,
    freshTime: "Há 8 minutos",
    tags: ["Salgado Gourmet", "Crocante"],
    rating: 4.8,
  },
];

// DADOS DO GRÁFICO DE VENDAS E PICOS DE FORNADA
const CURVA_VENDAS = [
  { hour: "06h", sales: 650, checkins: 14, fornada: false },
  { hour: "07h", sales: 1420, checkins: 38, fornada: true },
  { hour: "08h", sales: 2350, checkins: 62, fornada: true },
  { hour: "10h", sales: 1100, checkins: 22, fornada: false },
  { hour: "12h", sales: 1890, checkins: 45, fornada: false },
  { hour: "14h", sales: 1250, checkins: 28, fornada: false },
  { hour: "16h", sales: 2980, checkins: 84, fornada: true }, // Pico Fornada Quente!
  { hour: "17h", sales: 3420, checkins: 96, fornada: true },
  { hour: "18h", sales: 2600, checkins: 71, fornada: true },
  { hour: "19h", sales: 1400, checkins: 35, fornada: false },
];

export default function DemoBetuellyPulsePage() {
  const [activeTab, setActiveTab] = useState<"counter" | "dashboard" | "studio" | "showcase">("counter");
  const [showCustomerPhone, setShowCustomerPhone] = useState(true);
  const [showSceneGuide, setShowSceneGuide] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [stamps, setStamps] = useState(8);
  const [mysteryReward, setMysteryReward] = useState<string | null>(null);
  const [categoriaVitrine, setCategoriaVitrine] = useState("all");

  // Alerta Fornada Quente
  const [activeFornada, setActiveFornada] = useState({
    title: "🔥 Fornada Quente no Balcão!",
    item: "Pão de Queijo Canastra Real",
    discount: "Pontuação 2x no Check-in durante os próximos 30 minutos",
    active: true,
  });

  // Estúdio Criativo Estados
  const [promptTexto, setPromptTexto] = useState(
    "A high-end commercial photography of a modern, bustling Brazilian bakery (padaria). In the foreground, a beautifully lit glass display counter filled with fresh, appetizing pães de queijo, golden breads, and cakes. At the counter, a happy male customer is effortlessly scanning a QR code on his smartphone against a sleek, modern tablet facing him. The tablet screen features a clean, premium interface in deep navy blue and bright turquoise colors, showing a loyalty check-in success animation. 8k resolution, photorealistic, highly detailed."
  );
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resSize, setResSize] = useState("1K Ultra HD");

  // Relógio do Totem
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Chime sonoro harmônico Web Audio API nativo
  const playChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const emitir = (freq: number, start: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };
      emitir(523.25, 0.0, 0.25);
      emitir(659.25, 0.08, 0.25);
      emitir(783.99, 0.16, 0.35);
      emitir(1046.5, 0.26, 0.55);
    } catch {}
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    playChime();
    setStamps((prev) => (prev >= 10 ? 1 : prev + 1));
  };

  const girarRoleta = () => {
    const premios = [
      "☕ 1 Café Expresso Grátis na próxima visita",
      "🧀 +50 Pontos Bônus Fornada Quente",
      "🥐 1 Pão Francês com Manteiga na Chapa",
      "⭐ 15% OFF no Bolo de Cenoura Vulcão",
    ];
    setMysteryReward(premios[Math.floor(Math.random() * premios.length)]);
  };

  const itensFiltrados = PRODUTOS_PADARIA.filter((item) => {
    if (categoriaVitrine === "all") return true;
    return item.category === categoriaVitrine;
  });

  return (
    <div className="min-h-screen bg-[#050B17] text-slate-100 flex flex-col font-sans antialiased selection:bg-[#00B8C4] selection:text-slate-950">
      
      {/* 1. HEADER SUPERIOR COM LOGO E ABAS IDÊNTICAS AO STUDIO */}
      <header className="sticky top-0 z-40 bg-[#070E20]/95 backdrop-blur-xl border-b border-[#00B8C4]/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Subtítulo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00B8C4] via-teal-300 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-[#00B8C4]/25">
                🍞
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-slate-950">
                🔥
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">FORNADA QUENTE</span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00B8C4]/10 text-[#00B8C4] border border-[#00B8C4]/30">
                  PADARIA & ESTÚDIO AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Sistema de Fidelidade, Totem de Balcão e Fotografia Comercial Gemini
              </p>
            </div>
          </div>

          {/* Abas Centrais */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-[#0a1530] p-1 rounded-2xl border border-[#00B8C4]/20">
            <button
              onClick={() => setActiveTab("counter")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "counter"
                  ? "bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 shadow-md shadow-[#00B8C4]/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Totem & Balcão</span>
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 shadow-md shadow-[#00B8C4]/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Painel do Padeiro</span>
            </button>

            <button
              onClick={() => setActiveTab("studio")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "studio"
                  ? "bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 shadow-md shadow-[#00B8C4]/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Estúdio AI</span>
              <span className="hidden md:inline text-[9px] bg-slate-900/60 text-[#00B8C4] px-1 rounded border border-[#00B8C4]/20">
                Nano Banana
              </span>
            </button>

            <button
              onClick={() => setActiveTab("showcase")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "showcase"
                  ? "bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 shadow-md shadow-[#00B8C4]/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vitrine da Padaria</span>
            </button>
          </nav>

          {/* Botão Cena Comercial */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSceneGuide(!showSceneGuide)}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-[#00B8C4] border border-[#00B8C4]/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#00B8C4]" />
              <span className="hidden lg:inline">Cena Comercial</span>
            </button>
          </div>
        </div>
      </header>

      {/* Explicação da Cena Comercial (Modal Retrátil) */}
      {showSceneGuide && (
        <div className="bg-gradient-to-r from-[#0d1f42] via-[#09152e] to-[#071022] border-b border-[#00B8C4]/30 p-6 animate-in slide-in-from-top-4">
          <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00B8C4]/20 text-[#00B8C4] text-xs font-bold border border-[#00B8C4]/40">
                Direção Artística & Fotografia Comercial 8K
              </span>
              <h3 className="text-xl font-extrabold text-white">
                A Experiência Fotográfica & Tecnológica da Padaria Brasileira Moderna
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Uma vitrine iluminada com pães de queijo e bolos dourados, cliente escaneando o QR Code
                em um totem moderno em azul marinho e turquesa, e o dono da padaria comemorando o
                aumento de vendas com alertas de Fornada Quente.
              </p>
            </div>
            <button onClick={() => setShowSceneGuide(false)} className="text-slate-400 hover:text-white p-2">✕</button>
          </div>
        </div>
      )}

      {/* 2. CONTEÚDO PRINCIPAL (ALTERNÂNCIA DE ABAS) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        
        {/* ==================== ABA 1: TOTEM & BALCÃO ==================== */}
        {activeTab === "counter" && (
          <div className="space-y-8">
            {/* Barra de Controle de Contexto */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#09152b]/80 border border-[#00B8C4]/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00B8C4] animate-ping" />
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    BALCÃO DA PADARIA • TOTEM DE ATENDIMENTO AO VIVO
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Interface em Azul Marinho Profundo & Turquesa Brilhante (Conforme solicitado)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400">Cliente atual:</span>
                <select className="bg-[#081226] border border-[#00B8C4]/30 rounded-xl px-3 py-1.5 text-xs text-[#00B8C4] font-bold focus:outline-none">
                  <option>Lucas Mendes (Ouro)</option>
                  <option>Camila Rocha (Mestre)</option>
                </select>

                <button
                  onClick={() => setShowCustomerPhone(!showCustomerPhone)}
                  className="py-1.5 px-3 rounded-xl text-xs font-bold border border-[#00B8C4]/30 bg-[#00B8C4]/15 text-[#00B8C4] hover:bg-[#00B8C4]/25 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  {showCustomerPhone ? "Ocultar Celular" : "Exibir Celular"}
                </button>
              </div>
            </div>

            {/* Layout Split: Tablet Totem + Celular do Cliente */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* O TABLET DO BALCÃO */}
              <div className={showCustomerPhone ? "lg:col-span-8" : "lg:col-span-12"}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-[#070D1E] flex flex-col min-h-[580px]">
                  
                  {/* Topo do Tablet */}
                  <div className="bg-[#0B1528] px-6 py-4 border-b border-[#00B8C4]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00B8C4] to-[#08284B] flex items-center justify-center text-slate-950 font-bold shadow-md shadow-[#00B8C4]/30">
                        FQ
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base tracking-wide text-white">FORNADA QUENTE</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00B8C4]/10 text-[#00B8C4] border border-[#00B8C4]/30">
                            TOTEM FIDELIDADE
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Padaria Artesanal & Café Especial</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold font-mono text-[#00B8C4]">{currentTime || "16:45"}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest">HORÁRIO DE PICO</div>
                      </div>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300"
                      >
                        {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00B8C4]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Banner Fornada Quente */}
                  <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
                      <div>
                        <span className="font-bold text-amber-300 text-sm">{activeFornada.title}</span>
                        <span className="text-xs text-slate-300 ml-2 hidden sm:inline">
                          {activeFornada.item} • {activeFornada.discount}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      2x Pontos Ativos
                    </span>
                  </div>

                  {/* Tela Interativa do Totem */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-radial from-[#0e1d3d] via-[#091124] to-[#050914] relative">
                    {!isCheckedIn ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-3xl mx-auto w-full">
                        {/* Mirante QR Code com Laser */}
                        <div className="md:col-span-7 flex flex-col items-center text-center">
                          <div className="relative p-6 rounded-3xl bg-[#0c1833]/80 border-2 border-[#00B8C4]/40 shadow-xl group">
                            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#00B8C4]" />
                            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#00B8C4]" />
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#00B8C4]" />
                            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00B8C4]" />

                            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-gradient-to-b from-[#0e2145] to-[#071022] flex flex-col items-center justify-center p-4 border border-[#00B8C4]/20">
                              <div className="w-20 h-20 rounded-2xl bg-[#00B8C4]/10 border border-[#00B8C4]/40 flex items-center justify-center mb-3">
                                <QrCode className="w-12 h-12 text-[#00B8C4]" />
                              </div>
                              <span className="text-white font-bold text-sm tracking-wide">
                                Aponte seu QR Code
                              </span>
                              <span className="text-[11px] text-[#00B8C4]/70 mt-1 max-w-[180px]">
                                No leitor ou câmera do totem para pontuar
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={handleCheckIn}
                            className="mt-5 w-full max-w-xs py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-[#00B8C4]/25 hover:brightness-110 transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Smartphone className="w-4 h-4" />
                            Escanear Celular do Cliente
                          </button>
                          <p className="text-[11px] text-slate-400 mt-2">
                            Simula o cliente aproximando o smartphone do balcão
                          </p>
                        </div>

                        {/* Coluna Telefone */}
                        <div className="md:col-span-5 flex flex-col justify-center space-y-4">
                          <div className="bg-[#0e1c39]/70 border border-[#00B8C4]/20 rounded-2xl p-5">
                            <span className="text-xs font-bold text-[#00B8C4] uppercase tracking-wider block mb-1">
                              OU DIGITE SEU CELULAR
                            </span>
                            <p className="text-xs text-slate-400 mb-3">
                              Cadastre-se ou pontue digitando seu número DDD + Celular:
                            </p>
                            <input
                              type="tel"
                              placeholder="(11) 98765-4321"
                              className="w-full bg-[#081226] border border-[#00B8C4]/30 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none mb-3"
                            />
                            <button
                              onClick={handleCheckIn}
                              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#00B8C4] border border-[#00B8C4]/30 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              Confirmar Check-in <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="bg-[#09152b]/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
                            <div className="flex items-center gap-2 text-white font-bold">
                              <Trophy className="w-4 h-4 text-amber-400" /> Clube do Pão Artesanal
                            </div>
                            <p>• 10 carimbos = 1 Fornada de Pão de Queijo grátis</p>
                            <p>• Ganhe 2x pontos nos alertas de Fornada Quente</p>
                            <p>• Café de boas-vindas na sua primeira visita</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ESTADO DE SUCESSO DO CHECK-IN */
                      <div className="max-w-2xl mx-auto w-full text-center py-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="relative inline-flex items-center justify-center mb-4">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00B8C4] to-teal-300 flex items-center justify-center text-slate-950 shadow-xl shadow-[#00B8C4]/40">
                            <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
                          </div>
                        </div>

                        <div className="space-y-1 mb-6">
                          <span className="text-xs font-bold tracking-widest text-[#00B8C4] uppercase">
                            Check-in Confirmado com Sucesso!
                          </span>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Olá, Lucas Mendes!</h2>
                          <p className="text-sm text-slate-300">
                            Você ganhou <strong className="text-[#00B8C4] font-bold">+50 pontos</strong> hoje na Padaria Fornada Quente.
                          </p>
                        </div>

                        {/* Cartão de 10 Carimbos */}
                        <div className="bg-[#0b1733]/90 border border-[#00B8C4]/30 rounded-2xl p-5 mb-6 text-left shadow-xl">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-sm text-white">Cartão Fidelidade • Cliente Ouro</span>
                            <span className="text-xs font-extrabold text-[#00B8C4] bg-[#041527] px-2.5 py-1 rounded-lg border border-[#00B8C4]/20">
                              {stamps} de 10 Carimbos
                            </span>
                          </div>

                          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-3">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-11 rounded-xl flex items-center justify-center border text-xs font-bold transition-all ${
                                  i < stamps
                                    ? "bg-gradient-to-tr from-[#00B8C4] to-teal-300 border-white text-slate-950 shadow-md shadow-[#00B8C4]/40"
                                    : "bg-slate-900/60 border-slate-800 text-slate-600"
                                }`}
                              >
                                {i < stamps ? "🧀" : i + 1}
                              </div>
                            ))}
                          </div>
                        </div>

                        {!mysteryReward ? (
                          <button
                            onClick={girarRoleta}
                            className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 font-extrabold text-xs uppercase shadow-lg hover:brightness-110 cursor-pointer inline-flex items-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" /> Girar Roleta da Sorte Diária
                          </button>
                        ) : (
                          <div className="bg-amber-500/10 border border-amber-400/40 rounded-xl p-3 text-amber-300 text-xs font-bold inline-flex items-center gap-2 animate-bounce">
                            <Gift className="w-4 h-4 text-amber-400" /> Prêmio Ganho: {mysteryReward}
                          </div>
                        )}

                        <div className="mt-6 flex justify-center">
                          <button
                            onClick={() => {
                              setIsCheckedIn(false);
                              setMysteryReward(null);
                            }}
                            className="text-xs text-slate-400 hover:text-[#00B8C4] flex items-center gap-1.5 cursor-pointer py-1 px-3 rounded-lg hover:bg-slate-800/50"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Finalizar e Voltar para Próximo Cliente
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#070E1E] px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Totem Balcão Principal • Conectado à Rede Wi-Fi Padaria
                    </span>
                    <span>Fornada Quente OS v2.4</span>
                  </div>
                </div>
              </div>

              {/* O SMARTPHONE DO CLIENTE (Igual ao Print 1) */}
              {showCustomerPhone && (
                <div className="lg:col-span-4 max-w-sm mx-auto w-full">
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">SMARTPHONE DO CLIENTE</span>
                    <span className="text-[11px] text-slate-400">Mostrando QR Code no balcão</span>
                  </div>

                  <div className="rounded-[40px] border-[6px] border-slate-700 bg-slate-950 p-3 shadow-2xl">
                    <div className="rounded-[32px] overflow-hidden bg-gradient-to-b from-[#09152b] via-[#070f20] to-[#040813] text-white min-h-[560px] flex flex-col justify-between p-4 pt-6 border border-[#00B8C4]/20">
                      
                      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mb-2">
                        <span className="font-bold text-white">16:45</span>
                        <span>5G 100%</span>
                      </div>

                      {/* Notificação no Celular */}
                      <div className="p-3 rounded-2xl bg-[#0e1d3d]/95 border border-amber-400/50 shadow-xl mb-3">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
                          <div>
                            <span className="text-[10px] text-amber-400 uppercase font-black block">NOTIFICAÇÃO FORNADA QUENTE</span>
                            <strong className="text-xs text-white">Pão de Queijo Canastra Saindo Agora!</strong>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">Pontuação 2x no check-in no balcão nos próximos 30 minutos!</p>
                      </div>

                      {/* Card do Cliente */}
                      <div className="flex items-center justify-between bg-[#0b1836]/60 p-3 rounded-2xl border border-[#00B8C4]/20 mb-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                            alt="Lucas"
                            className="w-10 h-10 rounded-full object-cover border border-[#00B8C4]/40"
                          />
                          <div>
                            <h4 className="text-sm font-extrabold text-white">Lucas Mendes</h4>
                            <span className="text-[10px] text-[#00B8C4]">Cliente VIP • Ouro</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-emerald-400">480 pts</div>
                          <span className="text-[9px] text-slate-400">Saldo Atual</span>
                        </div>
                      </div>

                      {/* QR Code Grande Branco */}
                      <div className="my-auto py-2 text-center">
                        <div className="p-4 rounded-3xl bg-white text-slate-950 shadow-2xl inline-block">
                          <QrCode className="w-40 h-40 stroke-[1.8]" />
                          <div className="text-[11px] font-mono font-bold text-slate-700 mt-1">FQ-LOYALTY-CUST-1</div>
                        </div>
                        <p className="text-xs text-[#00B8C4] font-semibold mt-3">Aproxime este QR Code do Totem no Balcão</p>
                      </div>

                      {/* Carimbos no Celular */}
                      <div className="bg-[#0b1733]/80 p-3 rounded-2xl border border-[#00B8C4]/20 mb-2">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-300">Carimbos do Clube</span>
                          <span className="text-[#00B8C4] font-bold">{stamps} / 10</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#00B8C4] to-teal-300" style={{ width: `${stamps * 10}%` }} />
                        </div>
                      </div>

                      <button
                        onClick={handleCheckIn}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00B8C4] to-teal-300 text-slate-950 font-black text-xs uppercase shadow-lg cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Smartphone className="w-4 h-4" /> ESCANEAR NO TOTEM DO BALCÃO
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== ABA 2: PAINEL DO PADEIRO (COM GRÁFICO IDÊNTICO AO PRINT 2) ==================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Topo do Painel */}
            <div className="p-6 rounded-3xl bg-[#0e172e] border border-[#00B8C4]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B8C4] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  PAINEL DO PROPRIETÁRIO & BALCÃO
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Gestão de Vendas & Retenção de Clientes
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Monitore o aumento de faturamento em tempo real, fluxo de clientes no totem de check-in e envie alertas de fornada quente.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("🔥 Notificação de Fornada Quente disparada para 480 clientes cadastrados e transmitida ao Totem de Balcão!")}
                  className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/30 hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <Flame className="w-5 h-5 fill-slate-950" />
                  Disparar Fornada Quente!
                </button>
                <button
                  onClick={() => setActiveTab("studio")}
                  className="py-3 px-5 rounded-xl bg-[#0e1d3d] hover:bg-[#132854] text-[#00B8C4] border border-[#00B8C4]/40 font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" /> Estúdio de Fotos AI
                </button>
              </div>
            </div>

            {/* 4 Cards de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#09152b] border border-[#00B8C4]/20">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Faturamento Hoje</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">R$ 5.840,00</div>
                <span className="text-xs text-emerald-400 font-semibold mt-2 block">+38.4% vs média dos dias normais</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#09152b] border border-[#00B8C4]/20">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Taxa de Retenção de Clientes</span>
                  <Users className="w-4 h-4 text-[#00B8C4]" />
                </div>
                <div className="text-2xl font-extrabold text-white">84.6%</div>
                <span className="text-xs text-[#00B8C4] font-semibold mt-2 block">4.8x visitas/semana por cliente</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#09152b] border border-[#00B8C4]/20">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Check-ins no Totem Hoje</span>
                  <QrCode className="w-4 h-4 text-teal-300" />
                </div>
                <div className="text-2xl font-extrabold text-white">142</div>
                <span className="text-xs text-teal-300 font-semibold mt-2 block">+62 check-ins nos picos de fornada</span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 to-[#09152b] border border-amber-500/20">
                <div className="flex justify-between text-xs text-amber-300 mb-2">
                  <span>Status da Fornada</span>
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-lg font-bold text-amber-200">Pão de Queijo Canastra Real</div>
                <span className="text-xs text-amber-400 mt-2 block">Até 17:15 (2x Pontos)</span>
              </div>
            </div>

            {/* O GRÁFICO DE VENDAS COM PICOS DE FORNADA + CHECK-INS AO VIVO */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Gráfico Visual de Barras com as chamas */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#00B8C4]" />
                      Curva de Vendas por Horário & Picos de Fornada Quente
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Observe como as notificações de pão fresquinho geram picos imediatos de vendas e fluxo no balcão
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-[#00B8C4]">
                      <span className="w-3 h-3 rounded bg-[#00B8C4]" /> Vendas (R$)
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <span className="w-3 h-3 rounded bg-amber-400" /> Fornada Quente
                    </span>
                  </div>
                </div>

                {/* Área Gráfica */}
                <div className="relative h-64 w-full pt-4">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-b border-[#00B8C4] w-full" />
                    <div className="border-b border-[#00B8C4] w-full" />
                    <div className="border-b border-[#00B8C4] w-full" />
                    <div className="border-b border-[#00B8C4] w-full" />
                  </div>

                  <div className="h-full flex items-end justify-between gap-2 px-2 z-10 relative">
                    {CURVA_VENDAS.map((pt, i) => {
                      const alt = Math.min(100, (pt.sales / 3600) * 100);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                          {pt.fornada && (
                            <div className="mb-1 text-[10px] text-amber-400 font-black animate-pulse">🔥</div>
                          )}
                          <div
                            style={{ height: `${alt}%` }}
                            className={`w-full max-w-[32px] rounded-t-lg transition-all ${
                              pt.fornada
                                ? "bg-gradient-to-t from-amber-600 via-orange-500 to-amber-300 shadow-lg shadow-amber-500/30"
                                : "bg-gradient-to-t from-cyan-900 via-cyan-600 to-teal-400/80"
                            }`}
                          />
                          <span className="text-[11px] font-mono text-slate-400 mt-2">{pt.hour}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  💡 Dica de Sucesso: As fornadas das <strong>08:00</strong> e <strong>16:45</strong> concentram mais de 65% dos check-ins de clientes VIP.
                </div>
              </div>

              {/* Lista de Check-ins ao Vivo */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00B8C4] animate-ping" />
                    <h3 className="font-extrabold text-base text-white">Check-ins ao Vivo no Balcão</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">Totem Principal</span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  <div className="p-3 rounded-2xl bg-[#09152c] border border-[#00B8C4]/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                        alt="Lucas"
                        className="w-10 h-10 rounded-full object-cover border border-[#00B8C4]/30"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">Lucas Mendes</div>
                        <div className="text-[11px] text-[#00B8C4]">8 de 10 carimbos</div>
                        <div className="text-[10px] text-amber-300">Bônus Fornada Quente: +25 pts extras</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">+50 pts</span>
                      <div className="text-[10px] text-slate-400">Há 2 minutos</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#09152c] border border-[#00B8C4]/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
                        alt="Beatriz"
                        className="w-10 h-10 rounded-full object-cover border border-[#00B8C4]/30"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">Beatriz Lima</div>
                        <div className="text-[11px] text-[#00B8C4]">2 de 10 carimbos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">+30 pts</span>
                      <div className="text-[10px] text-slate-400">Há 18 minutos</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#09152c] border border-[#00B8C4]/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"
                        alt="Rafael"
                        className="w-10 h-10 rounded-full object-cover border border-[#00B8C4]/30"
                      />
                      <div>
                        <div className="font-bold text-sm text-white">Rafael Silva</div>
                        <div className="text-[11px] text-[#00B8C4]">4 de 10 carimbos</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">+40 pts</span>
                      <div className="text-[10px] text-slate-400">Há 45 minutos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ABA 3: ESTÚDIO AI (IGUAL AO PRINT 3) ==================== */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0d1e40] border border-[#00B8C4]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00B8C4] flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4" /> ESTÚDIO CRIATIVO GEMINI NANO BANANA 2.1
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Criação & Edição de Fotografia Comercial de Padaria
                </h1>
                <p className="text-sm text-slate-300 max-w-2xl mt-1">
                  Gere fotos ultra-realistas com iluminação âmbar cinematográfica para pães, bolos, café e a cena do totem de check-in, ou edite imagens existentes com comandos em texto.
                </p>
              </div>

              <div className="bg-[#060c1c] border border-[#00B8C4]/30 px-3.5 py-2 rounded-2xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B8C4] animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-white">gemini-nano-banana-2.1</div>
                  <div className="text-[10px] text-[#00B8C4]">Aprimorado com Gemini 3.8 Flash</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controles de Prompt */}
              <div className="lg:col-span-6 p-6 rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#00B8C4] uppercase">PROMPT CRIATIVO EM TEXTO</label>
                  <span className="text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/30">
                    Aprimorar com Gemini 3.8
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={promptTexto}
                  onChange={(e) => setPromptTexto(e.target.value)}
                  className="w-full bg-[#081226] border border-[#00B8C4]/30 rounded-2xl p-4 text-xs text-white leading-relaxed focus:outline-none"
                />

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-2">
                    SUGESTÕES PRONTAS (CLIQUE PARA APLICAR):
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setPromptTexto("A high-end commercial photography of a modern, bustling Brazilian bakery (padaria)...")}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-[#00B8C4]/40"
                    >
                      <div className="font-semibold text-white truncate">Cena Comercial da Padaria</div>
                      <div className="text-[10px] text-slate-500">16:9 • Fotografia Comercial</div>
                    </button>
                    <button
                      onClick={() => setPromptTexto("Macro commercial food photography of traditional Brazilian pães de queijo straight from the oven, blistered golden exterior...")}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-[#00B8C4]/40"
                    >
                      <div className="font-semibold text-white truncate">Pão de Queijo Canastra (Macro)</div>
                      <div className="text-[10px] text-slate-500">1:1 • Fotografia Comercial</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Proporção da Imagem:</label>
                    <div className="flex gap-1">
                      {["16:9", "1:1", "9:16", "4:3"].map((r) => (
                        <button
                          key={r}
                          onClick={() => setAspectRatio(r)}
                          className={`flex-1 py-1 text-xs rounded-lg font-bold border ${
                            aspectRatio === r ? "bg-[#00B8C4]/20 border-[#00B8C4] text-[#00B8C4]" : "bg-slate-900 border-slate-800 text-slate-400"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Resolução Nano Banana:</label>
                    <div className="flex gap-1">
                      {["1K Ultra HD", "2K Ultra HD"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setResSize(s)}
                          className={`flex-1 py-1 text-xs rounded-lg font-bold border ${
                            resSize === s ? "bg-[#00B8C4]/20 border-[#00B8C4] text-[#00B8C4]" : "bg-slate-900 border-slate-800 text-slate-400"
                          }`}
                        >
                          {s.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert("✨ Conectado ao servidor Gemini Studio do applet. A geração requer chave ativa no painel de segredos.")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00B8C4] to-teal-400 text-slate-950 font-black text-xs uppercase shadow-xl cursor-pointer"
                >
                  GERAR FOTOGRAFIA COMERCIAL AGORA
                </button>
              </div>

              {/* Visualizador de Resultados */}
              <div className="lg:col-span-6 p-6 rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 flex flex-col justify-center items-center text-center min-h-[460px]">
                <div className="w-16 h-16 rounded-2xl bg-[#00B8C4]/10 border border-[#00B8C4]/30 flex items-center justify-center text-[#00B8C4] mb-3">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base">Nenhuma foto gerada ainda</h4>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Digite um prompt ou escolha um modelo ao lado e clique em "Gerar Fotografia Comercial Agora".
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ABA 4: VITRINE DA PADARIA (COM FOTOS REAIS DO PRINT 4) ==================== */}
        {activeTab === "showcase" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> VITRINE ARTESANAL ILUMINADA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Balcão de Pães, Fornadas & Confeitaria
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Pães de queijo Canastra, pão francês estalando de crocante e bolos clássicos produzidos diariamente com receitas artesanais.
                </p>
              </div>

              <div className="flex gap-1.5 bg-[#081226] p-1.5 rounded-2xl border border-[#00B8C4]/20">
                {[
                  { id: "all", label: "Todos os Itens" },
                  { id: "fornada", label: "🔥 Fornadas" },
                  { id: "salgados", label: "🧀 Salgados" },
                  { id: "doces", label: "🍰 Doces" },
                  { id: "cafes", label: "☕ Cafés" },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategoriaVitrine(c.id)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      categoriaVitrine === c.id ? "bg-[#00B8C4] text-slate-950" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid dos Cards de Pães e Bolos (Com Fotos e Estilo do Print 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {itensFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#09152b] border border-[#00B8C4]/20 overflow-hidden flex flex-col justify-between hover:border-[#00B8C4]/50 transition-all group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09152b] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {item.isHotFresh && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950">
                          <Flame className="w-3 h-3 fill-slate-950" /> FORNADA QUENTE
                        </span>
                      )}
                      {item.freshTime && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-300 border border-amber-400/30">
                          {item.freshTime}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-slate-950/80 border border-[#00B8C4]/30 flex items-center gap-1 text-xs font-bold text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white font-extrabold text-lg">
                      R$ {item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-base text-white">{item.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-[#00B8C4]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab("studio")}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#0d1d3a] hover:bg-[#132c57] text-[#00B8C4] border border-[#00B8C4]/30 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3.5 h-3.5" /> Editar Foto IA
                      </button>
                      <button
                        onClick={() => alert(`🔥 Alerta de Fornada Quente para ${item.name} disparado no balcão!`)}
                        className="py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5" /> Fornada
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="bg-[#050A18] border-t border-slate-900 px-6 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00B8C4]" />
            <span>Fornada Quente • Plataforma de Fidelidade & Estúdio Criativo para Padarias</span>
          </div>
          <Link href="https://wa.me/5531995172722" target="_blank" className="text-[#00B8C4] hover:underline font-bold">
            Falar com a Betuelly no WhatsApp: (31) 99517-2722
          </Link>
        </div>
      </footer>
    </div>
  );
}