"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, AlertTriangle, Gift, MessageCircle, RefreshCw, ArrowLeft,
  Flame, Sparkles, CheckCircle2, Clock, Megaphone, Zap, Rocket,
  Copy, Check, Camera, Crown, BarChart3, Send, QrCode, Printer,
  Smartphone, ExternalLink, Image as ImageIcon, X, Download,
} from "lucide-react";
import { supabase } from "../ponto/supabase";

interface Cliente {
  id: string;
  telefone: string;
  nome: string | null;
  total_visitas: number;
  status_recorrencia: string;
  ultima_visita_em: string;
}

type TipoCampanhaCanal = "lancamento" | "relampago" | "campanha" | "vip" | "enquete";

const MODELOS_CAMPANHA: Record<
  TipoCampanhaCanal,
  { titulo: string; desc: string; prod: string; de: string; por: string; escassez: string; dica: string }
> = {
  lancamento: {
    titulo: "Lançamento de Produto",
    desc: "Apresenta novidade com oferta de estreia",
    prod: "Croissant Artesanal Recheado com Nutella",
    de: "R$ 16,90",
    por: "R$ 11,90",
    escassez: "Apenas 20 unidades hoje até às 18h",
    dica: "Tire uma foto de perto partindo o produto ao meio para mostrar o recheio ou a maciez da massa.",
  },
  relampago: {
    titulo: "Promoção Relâmpago",
    desc: "Queima rápida de fornada em 1 hora",
    prod: "Fornada de Pão de Queijo Canastra + Café",
    de: "R$ 14,00",
    por: "R$ 9,90",
    escassez: "Válido somente na próxima 1 hora (15 combos)",
    dica: "Grave um vídeo curto de 5 segundos tirando a assadeira do forno e mostrando o vapor a sair.",
  },
  campanha: {
    titulo: "Campanha / Combo Família",
    desc: "Aumenta o ticket médio da semana",
    prod: "Combo Café da Tarde Família (Rosca + Salgados + Suco)",
    de: "R$ 49,90",
    por: "R$ 36,90",
    escassez: "Campanha válida de Terça a Quinta",
    dica: "Monte uma mesa com o produto acompanhado de café expresso para aumentar o desejo pelo combo.",
  },
  vip: {
    titulo: "Oferta VIP com Senha",
    desc: "Recompensa exclusiva para seguidores",
    prod: "Fatia Generosa de Torta Holandesa",
    de: "R$ 15,00",
    por: "R$ 9,50",
    escassez: "Somente para os 10 primeiros no caixa",
    dica: "Use uma foto apetitosa do produto destacando que é exclusivo para membros do Canal.",
  },
  enquete: {
    titulo: "Enquete de Fornada (Interação com Emojis)",
    desc: "Faz os seguidores votarem com ❤️ ou 🔥 na promoção da tarde",
    prod: "Sonho de Doce de Leite Artesanal",
    de: "R$ 12,00",
    por: "R$ 7,90",
    escassez: "Votação encerra às 15h",
    dica: "Publique uma foto com as duas opções lado a lado para estimular o toque nas reações.",
  },
};

export default function PainelGestao() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomePadaria, setNomePadaria] = useState("Padaria Piloto Betuelly");
  const [whatsappPadaria, setWhatsappPadaria] = useState("31995172722");
  const [metaVisitas, setMetaVisitas] = useState(5);
  const [brindePadaria, setBrindePadaria] = useState("1 Café Expresso + Pão de Queijo");

  const [abaAtiva, setAbaAtiva] = useState<"marketing" | "qrcode" | "clientes">("marketing");
  const [tipoCampanha, setTipoCampanha] = useState<TipoCampanhaCanal>("lancamento");
  const [produtoInput, setProdutoInput] = useState(MODELOS_CAMPANHA.lancamento.prod);
  const [precoNormalInput, setPrecoNormalInput] = useState(MODELOS_CAMPANHA.lancamento.de);
  const [precoPromoInput, setPrecoPromoInput] = useState(MODELOS_CAMPANHA.lancamento.por);
  const [escassezInput, setEscassezInput] = useState(MODELOS_CAMPANHA.lancamento.escassez);
  const [copiado, setCopiado] = useState(false);

  // Estado para a Imagem Anexada no Estúdio de Marketing
  const [imagemCampanhaUrl, setImagemCampanhaUrl] = useState<string | null>(null);

  const [linkCanalInput, setLinkCanalInput] = useState("https://whatsapp.com/channel/0029VaExemploBetuelly");
  const [usarWhatsappDireto, setUsarWhatsappDireto] = useState(true);
  const [tituloPlacaInput, setTituloPlacaInput] = useState("ENTRE NO NOSSO CANAL VIP!");
  const [subtituloPlacaInput, setSubtituloPlacaInput] = useState(
    "Receba avisos de Fornada Quente e Ofertas Relâmpago com até 30% de desconto direto no seu WhatsApp."
  );
  const [iscaBalcaoInput, setIscaBalcaoInput] = useState(
    "Mostre no caixa que entrou no Canal hoje e ganhe 1 Pão de Queijo quentinho na hora!"
  );

  const carregarDados = async () => {
    setLoading(true);
    try {
      const { data: padaria } = await supabase
        .from("padarias")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .maybeSingle();

      if (padaria) {
        setNomePadaria(padaria.nome_fantasia);
        setWhatsappPadaria(padaria.whatsapp_comercial || "31995172722");
        setMetaVisitas(padaria.meta_visitas_brinde || 5);
        setBrindePadaria(padaria.descricao_brinde || "1 Café + Pão de Queijo");
      }

      const { data: listaClientes, error } = await supabase
        .from("clientes")
        .select("*")
        .order("ultima_visita_em", { ascending: false });

      if (error) throw error;
      setClientes(listaClientes || []);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const calcularDiasAusente = (dataIso: string) => {
    if (!dataIso) return 0;
    return Math.floor((Date.now() - new Date(dataIso).getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatarTelefone = (tel: string) => {
    const limpo = tel.replace(/\D/g, "");
    return limpo.length === 11 ? `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}` : tel;
  };

  const dispararWhatsApp = (cliente: Cliente, tipoScript: "status" | "resgate" | "fornada" | "vitrine") => {
    const limpo = cliente.telefone.replace(/\D/g, "");
    const ddi = limpo.startsWith("55") ? limpo : `55${limpo}`;
    const nome = cliente.nome || "Cliente";
    const faltam = Math.max(0, metaVisitas - cliente.total_visitas);
    let msg = "";

    if (tipoScript === "status") {
      msg = cliente.total_visitas >= metaVisitas
        ? `Olá, ${nome}! Parabéns! 🎉 Você completou as suas ${cliente.total_visitas} visitas no Clube da *${nomePadaria}*!\n\nO seu presente (*${brindePadaria}*) já está liberado. Basta mostrar esta mensagem no caixa!`
        : `Olá, ${nome}! O seu ponto foi registado na *${nomePadaria}*.\nVocê acumulou *${cliente.total_visitas} de ${metaVisitas} visitas* no nosso Clube! 🎉\nFaltam apenas ${faltam} visitas para resgatar: *${brindePadaria}*.`;
    } else if (tipoScript === "resgate") {
      msg = `Olá, ${nome}! Sentimos a sua falta na *${nomePadaria}*.\nPassando aqui hoje ou amanhã e pedindo o seu café ou lanche, uma porção quentinha de pão de queijo é por nossa conta! ☕🧀`;
    } else if (tipoScript === "fornada") {
      msg = `Aviso rápido da *${nomePadaria}*! 🚨\nAcabou de sair do forno uma fornada especial de Pão de Queijo Recheado e Rosca Rainha. Responda *RESERVAR* para separar a sua! 🥖🔥`;
    } else {
      msg = `Boa noite, ${nome}! Montámos 5 Combos Especiais na *${nomePadaria}* com *30% de desconto* até às 20h00. Responda *QUERO O COMBO* para reservar via PIX! 🍰🍕`;
    }

    window.open(`https://wa.me/${ddi}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const resgatarBrinde = async (cliente: Cliente) => {
    if (!window.confirm(`Confirmar entrega do brinde (${brindePadaria}) e zerar contagem?`)) return;
    await supabase.from("clientes").update({ total_visitas: 0 }).eq("id", cliente.id);
    await carregarDados();
  };

  const selecionarPredefinicao = (tipo: TipoCampanhaCanal) => {
    const m = MODELOS_CAMPANHA[tipo];
    setTipoCampanha(tipo);
    setProdutoInput(m.prod);
    setPrecoNormalInput(m.de);
    setPrecoPromoInput(m.por);
    setEscassezInput(m.escassez);
  };

  const lidarComUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ficheiro = e.target.files?.[0];
    if (ficheiro) {
      const urlLocal = URL.createObjectURL(ficheiro);
      setImagemCampanhaUrl(urlLocal);
    }
  };

  const gerarTextoCanal = () => {
    const limpo = whatsappPadaria.replace(/\D/g, "");
    const ddi = limpo.startsWith("55") ? limpo : `55${limpo}`;
    const linkReserva = `https://wa.me/${ddi}?text=${encodeURIComponent(
      `Olá! Vi no Canal do WhatsApp e quero reservar: ${produtoInput} (${precoPromoInput})`
    )}`;

    if (tipoCampanha === "lancamento") {
      return `🚀 *NOVIDADE SAINDO DO FORNO NA ${nomePadaria.toUpperCase()}!* 🚀\n\nChegou o novo *${produtoInput}*! 🥐✨\n\n🎁 *Oferta Especial de Estreia (Só no Canal):*\nDe ~${precoNormalInput}~ por apenas *${precoPromoInput}*!\n⏳ _${escassezInput}_\n\n👇 *Garanta o seu clicando abaixo:*\n${linkReserva}\n\n_Gostou da novidade? Reaja com ❤️ ou 🔥!_`;
    }
    if (tipoCampanha === "relampago") {
      return `⚡ *PROMOÇÃO RELÂMPAGO — FORNADA QUENTE!* ⚡\n\nAcabou de sair do forno na *${nomePadaria}*: *${produtoInput}* quentinho! 🔥\n\n💥 De ~${precoNormalInput}~ por *${precoPromoInput}*\n⚠️ *Atenção:* ${escassezInput}.\n\n🏃‍♂️ Reserve agora no link abaixo:\n${linkReserva}`;
    }
    if (tipoCampanha === "campanha") {
      return `🎯 *CAMPANHA ESPECIAL — ${nomePadaria.toUpperCase()}* ☕🥖\n\nPreparamos o nosso *${produtoInput}* numa condição especial:\n✅ De ~${precoNormalInput}~ por *${precoPromoInput}*\n📌 _${escassezInput}_\n\n📲 *Reserve para retirar sem fila:*\n${linkReserva}`;
    }
    if (tipoCampanha === "vip") {
      return `👑 *SENHA SECRETA DOS MEMBROS DO CANAL!* 🤫\n\nHoje o *${produtoInput}* sai de ~${precoNormalInput}~ por *${precoPromoInput}* na *${nomePadaria}*!\n\n🔑 Diga no caixa a senha *"SOU VIP DO CANAL"* (${escassezInput}) ou deixe separado aqui:\n${linkReserva}`;
    }
    return `📊 *VOCÊ DECIDE A PRÓXIMA FORNADA COM DESCONTO!* 🔥\n\nQual promoção de *${precoPromoInput}* você prefere hoje na *${nomePadaria}*?\n\nVote reagindo:\n❤️ = *${produtoInput}*\n🔥 = *Pão de Queijo Recheado + Café Expresso*\n\n_${escassezInput}_ 👇`;
  };

  const obterUrlDestinoQrCode = () => {
    if (usarWhatsappDireto) {
      const limpo = whatsappPadaria.replace(/\D/g, "");
      const ddi = limpo.startsWith("55") ? limpo : `55${limpo}`;
      const msg = encodeURIComponent(
        `Olá! Estou no balcão da ${nomePadaria} e quero entrar no Canal VIP para receber alertas de fornada e garantir meu brinde!`
      );
      return `https://wa.me/${ddi}?text=${msg}`;
    }
    return linkCanalInput || "https://whatsapp.com";
  };

  const urlImagemQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&color=08284B&data=${encodeURIComponent(
    obterUrlDestinoQrCode()
  )}`;

  const totalClientes = clientes.length;
  const totalVisitasSomadas = clientes.reduce((acc, c) => acc + (c.total_visitas || 0), 0);
  const prontosParaBrinde = clientes.filter((c) => c.total_visitas >= metaVisitas).length;
  const clientesAusentes = clientes.filter((c) => calcularDiasAusente(c.ultima_visita_em) >= 5).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1E242B] p-6 print:bg-white print:p-0">
      {/* Cabeçalho */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-[#08284B] p-2.5 rounded-xl">
            <img src="/BETUELLY_simbolo.svg" alt="Betuelly" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00B8C4] block">
              BETUELLY PULSE • MOTOR DE RECORRÊNCIA & MARKETING
            </span>
            <h1 className="text-xl font-extrabold text-[#08284B]">{nomePadaria} — Painel de Gestão</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={carregarDados} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#08284B] px-4 py-2.5 rounded-xl text-xs font-bold transition">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Atualizar Dados
          </button>
          <Link href="/ponto" className="bg-[#00B8C4] hover:bg-[#00a2ad] text-[#08284B] px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm">
            Abrir Terminal do Caixa
          </Link>
          <Link href="/" className="text-gray-500 hover:text-[#08284B] px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1">
            <ArrowLeft size={14} /> Vitrine
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 print:hidden">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES CADASTRADOS</span><Users size={18} className="text-[#08284B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">{totalClientes}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Base ativa no Supabase</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CHECK-INS NO CICLO</span><CheckCircle2 size={18} className="text-[#00B8C4]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">{totalVisitasSomadas}</p>
          <span className="text-[11px] text-gray-500">Presenças registadas no balcão</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>PRONTOS PARA BRINDE</span><Gift size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{prontosParaBrinde}</p>
          <span className="text-[11px] text-gray-500">Atingiram {metaVisitas} de {metaVisitas} visitas</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES EM RISCO (+5 DIAS)</span><AlertTriangle size={18} className="text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-rose-600">{clientesAusentes}</p>
          <span className="text-[11px] text-rose-600 font-semibold">Precisam de disparo de resgate</span>
        </div>
      </div>

      {/* Navegação de Abas */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-6 print:hidden">
        <button onClick={() => setAbaAtiva("marketing")} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${abaAtiva === "marketing" ? "bg-[#08284B] text-white" : "bg-white text-[#08284B] border border-gray-200"}`}>
          <Megaphone size={16} className="text-[#00B8C4]" /> 1. Estúdio de Marketing (Canal do WhatsApp)
        </button>
        <button onClick={() => setAbaAtiva("qrcode")} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${abaAtiva === "qrcode" ? "bg-[#08284B] text-white" : "bg-white text-[#08284B] border border-gray-200"}`}>
          <QrCode size={16} className="text-[#00B8C4]" /> 2. Placa QR Code de Balcão (Captar Seguidores)
        </button>
        <button onClick={() => setAbaAtiva("clientes")} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${abaAtiva === "clientes" ? "bg-[#08284B] text-white" : "bg-white text-[#08284B] border border-gray-200"}`}>
          <Users size={16} className="text-[#00B8C4]" /> 3. Base de Clientes & Disparos 1-a-1 ({totalClientes})
        </button>
      </div>

      {/* ABA 1: ESTÚDIO DE MARKETING */}
      {abaAtiva === "marketing" && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">PASSO 1 • ESCOLHA O GATILHO DE CAMPANHA</span>
              <h2 className="text-lg font-extrabold text-[#08284B] mt-0.5">Gerador de Anúncios para Canal do WhatsApp</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(["lancamento", "relampago", "campanha", "vip", "enquete"] as TipoCampanhaCanal[]).map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => selecionarPredefinicao(tipo)}
                  className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${tipo === "enquete" ? "sm:col-span-2" : ""} ${
                    tipoCampanha === tipo ? "border-[#00B8C4] bg-[#00B8C4]/10 text-[#08284B]" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {tipo === "lancamento" && <Rocket size={18} className="text-[#00B8C4] shrink-0 mt-0.5" />}
                  {tipo === "relampago" && <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />}
                  {tipo === "campanha" && <Megaphone size={18} className="text-emerald-600 shrink-0 mt-0.5" />}
                  {tipo === "vip" && <Crown size={18} className="text-purple-600 shrink-0 mt-0.5" />}
                  {tipo === "enquete" && <BarChart3 size={18} className="text-rose-600 shrink-0 mt-0.5" />}
                  <div>
                    <span className="text-xs font-extrabold block">{MODELOS_CAMPANHA[tipo].titulo}</span>
                    <span className="text-[11px] text-gray-500">{MODELOS_CAMPANHA[tipo].desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4] block">PASSO 2 • ANEXAR FOTO DO PRODUTO / AÇÃO</span>
              
              {/* Seletor de Ficheiro de Imagem */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-[#00B8C4] bg-gray-50 hover:bg-cyan-50/20 p-3.5 rounded-xl cursor-pointer transition text-xs font-bold text-[#08284B]">
                  <ImageIcon size={18} className="text-[#00B8C4]" />
                  {imagemCampanhaUrl ? "Alterar foto do anúncio" : "Carregar foto do produto / campanha"}
                  <input type="file" accept="image/*" onChange={lidarComUploadImagem} className="hidden" />
                </label>

                {imagemCampanhaUrl && (
                  <>
                    <a
                      href={imagemCampanhaUrl}
                      download="anuncio-betuelly.jpg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl transition text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      title="Descarregar imagem para anexar no WhatsApp"
                    >
                      <Download size={16} /> Descarregar Foto
                    </a>
                    <button
                      onClick={() => setImagemCampanhaUrl(null)}
                      className="bg-rose-100 hover:bg-rose-200 text-rose-700 p-3.5 rounded-xl transition text-xs font-bold flex items-center gap-1"
                      title="Remover imagem"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">Nome do Produto ou Combo em Destaque</label>
                <input type="text" value={produtoInput} onChange={(e) => setProdutoInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#08284B] mb-1">Preço Normal (De)</label>
                  <input type="text" value={precoNormalInput} onChange={(e) => setPrecoNormalInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#08284B] mb-1">Preço na Oferta (Por)</label>
                  <input type="text" value={precoPromoInput} onChange={(e) => setPrecoPromoInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-emerald-700 focus:outline-none focus:border-[#00B8C4]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">Regra de Escassez / Limite de Tempo</label>
                <input type="text" value={escassezInput} onChange={(e) => setEscassezInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#08284B] text-white rounded-2xl p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">PREVIEW • CANAL DO WHATSAPP</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-bold">Com Foto & Link</span>
              </div>

              {/* Caixa simulando o telemóvel com a Imagem e o Texto */}
              <div className="bg-[#0b141a] text-gray-100 rounded-2xl border border-white/10 overflow-hidden shadow-inner mb-4">
                {imagemCampanhaUrl && (
                  <div className="w-full h-48 bg-black relative border-b border-white/10">
                    <img src={imagemCampanhaUrl} alt="Preview Anúncio" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {gerarTextoCanal()}
                </div>
              </div>

              <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 mb-6 flex items-start gap-3">
                <Camera size={18} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#00B8C4] block mb-0.5">Dica Visual para Acompanhar o Texto:</span>
                  <p className="text-[11px] text-gray-200">{MODELOS_CAMPANHA[tipoCampanha].dica}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => { navigator.clipboard.writeText(gerarTextoCanal()); setCopiado(true); setTimeout(() => setCopiado(false), 3000); }}
                className="w-full bg-[#00B8C4] hover:bg-[#00a2ad] text-[#08284B] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-sm"
              >
                {copiado ? <><Check size={16} /> Texto Copiado! Cole no seu Canal</> : <><Copy size={16} /> 1. Copiar Anúncio Pronto</>}
              </button>
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(gerarTextoCanal())}`, "_blank")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send size={15} /> 2. Abrir WhatsApp para Publicar no Canal / Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: PLACA QR CODE DE BALCÃO */}
      {abaAtiva === "qrcode" && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
          <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 print:hidden space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">CAPTAÇÃO NO CAIXA • DISPLAY DE BALCÃO</span>
            <h2 className="text-lg font-extrabold text-[#08284B]">Configurar Placa QR Code do Canal VIP</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button type="button" onClick={() => setUsarWhatsappDireto(true)} className={`p-3 rounded-xl border text-left text-xs transition ${usarWhatsappDireto ? "border-[#00B8C4] bg-[#00B8C4]/10 font-extrabold text-[#08284B]" : "border-gray-200 text-gray-600"}`}>
                📲 WhatsApp da Padaria
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">Abre conversa com pedido de entrada VIP</span>
              </button>
              <button type="button" onClick={() => setUsarWhatsappDireto(false)} className={`p-3 rounded-xl border text-left text-xs transition ${!usarWhatsappDireto ? "border-[#00B8C4] bg-[#00B8C4]/10 font-extrabold text-[#08284B]" : "border-gray-200 text-gray-600"}`}>
                📢 Link Direto do Canal
                <span className="block text-[10px] font-normal text-gray-500 mt-0.5">Usa o link público do Canal do WhatsApp</span>
              </button>
            </div>
            {!usarWhatsappDireto && (
              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">Link do Canal do WhatsApp</label>
                <input type="text" value={linkCanalInput} onChange={(e) => setLinkCanalInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]" />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-[#08284B] mb-1">Título Principal da Placa</label>
              <input type="text" value={tituloPlacaInput} onChange={(e) => setTituloPlacaInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:border-[#00B8C4]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#08284B] mb-1">Subtítulo Explicativo</label>
              <textarea rows={2} value={subtituloPlacaInput} onChange={(e) => setSubtituloPlacaInput(e.target.value)} className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#08284B] mb-1">🎁 Isca de Balcão (Recompensa Imediata)</label>
              <input type="text" value={iscaBalcaoInput} onChange={(e) => setIscaBalcaoInput(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-sm font-semibold text-[#08284B] focus:outline-none focus:border-[#00B8C4]" />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button onClick={() => window.print()} className="flex-1 bg-[#08284B] hover:bg-[#0d3868] text-white py-3.5 px-5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-sm">
                <Printer size={16} className="text-[#00B8C4]" /> Imprimir Placa de Balcão (A4 / A5)
              </button>
              <a href={obterUrlDestinoQrCode()} target="_blank" rel="noreferrer" className="bg-gray-100 hover:bg-gray-200 text-[#08284B] py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition">
                <ExternalLink size={15} /> Testar Link
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center print:col-span-12">
            <div className="w-full max-w-md bg-[#08284B] text-white rounded-3xl p-8 shadow-xl border-4 border-[#00B8C4] text-center print:shadow-none print:mt-6">
              <div className="inline-flex items-center gap-2 bg-[#00B8C4]/20 border border-[#00B8C4]/40 text-[#00B8C4] px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest mb-4">
                <Sparkles size={13} /> {nomePadaria}
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">{tituloPlacaInput}</h3>
              <p className="text-xs text-gray-200 leading-relaxed max-w-sm mx-auto mb-6">{subtituloPlacaInput}</p>
              <div className="bg-white p-5 rounded-2xl inline-block shadow-lg border-4 border-[#00B8C4] mb-5">
                <img src={urlImagemQrCode} alt="QR Code Canal VIP" className="w-52 h-52 object-contain mx-auto" />
                <span className="block text-[11px] font-extrabold text-[#08284B] uppercase tracking-wider mt-2">Aponte a câmara do telemóvel</span>
              </div>
              <div className="bg-amber-400 text-[#08284B] p-3.5 rounded-2xl font-extrabold text-xs shadow-md flex items-center justify-center gap-2">
                <Gift size={18} className="shrink-0" />
                <span>{iscaBalcaoInput}</span>
              </div>
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-gray-300">
                <Smartphone size={12} className="text-[#00B8C4]" />
                <span>Tecnologia Betuelly Pulse • Fidelização & Recorrência</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: TABELA DE CLIENTES */}
      {abaAtiva === "clientes" && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden print:hidden">
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-base font-extrabold text-[#08284B]">Base de Clientes & Disparos Individuais (WhatsApp 1-a-1)</h2>
            <p className="text-xs text-gray-500">Clique num gatilho abaixo para abrir o WhatsApp direto do cliente com a mensagem personalizada.</p>
          </div>
          {loading ? (
            <div className="p-12 text-center text-sm text-gray-500">A carregar clientes do Supabase...</div>
          ) : clientes.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-600 font-bold mb-2">Nenhum cliente registado ainda.</p>
              <Link href="/ponto" className="inline-block bg-[#08284B] text-white px-4 py-2 rounded-xl text-xs font-bold">Ir para o Bate-Ponto</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase border-b border-gray-200">
                    <th className="py-3.5 px-4">Cliente / WhatsApp</th>
                    <th className="py-3.5 px-4">Progresso do Clube</th>
                    <th className="py-3.5 px-4">Última Visita</th>
                    <th className="py-3.5 px-4">Gatilhos Rápidos de WhatsApp</th>
                    <th className="py-3.5 px-4 text-right">Ação no Caixa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {clientes.map((c) => {
                    const dias = calcularDiasAusente(c.ultima_visita_em);
                    const ganhou = c.total_visitas >= metaVisitas;
                    return (
                      <tr key={c.id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-4 font-bold text-[#08284B]">{formatarTelefone(c.telefone)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${ganhou ? "bg-amber-100 text-amber-800" : "bg-[#00B8C4]/15 text-[#08284B]"}`}>
                            {c.total_visitas} / {metaVisitas} visitas
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> {dias === 0 ? "Hoje" : `Há ${dias} dia(s)`}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            <button onClick={() => dispararWhatsApp(c, "status")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"><MessageCircle size={13} /> Status Clube</button>
                            <button onClick={() => dispararWhatsApp(c, "fornada")} className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"><Flame size={13} /> Fornada Quente</button>
                            <button onClick={() => dispararWhatsApp(c, "resgate")} className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"><AlertTriangle size={13} /> Resgatar Sumido</button>
                            <button onClick={() => dispararWhatsApp(c, "vitrine")} className="bg-[#08284B] hover:bg-[#0d3868] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"><Sparkles size={13} /> Queima Vitrine</button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {ganhou ? (
                            <button onClick={() => resgatarBrinde(c)} className="bg-amber-500 hover:bg-amber-600 text-[#08284B] px-3 py-1.5 rounded-lg text-xs font-extrabold transition shadow-sm">Entregar Brinde (Zerar)</button>
                          ) : (
                            <span className="text-[11px] text-gray-400">Em acumulação</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}