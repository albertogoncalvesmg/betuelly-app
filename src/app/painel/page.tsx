"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  AlertTriangle,
  Gift,
  MessageCircle,
  RefreshCw,
  ArrowLeft,
  Flame,
  Sparkles,
  CheckCircle2,
  Clock,
  Megaphone,
  Zap,
  Rocket,
  Copy,
  Check,
  Camera,
  Crown,
  BarChart3,
  Send,
  QrCode,
  Printer,
  Smartphone,
  ExternalLink,
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

type TipoCampanhaCanal =
  | "lancamento"
  | "relampago"
  | "campanha"
  | "vip"
  | "enquete";

export default function PainelGestao() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomePadaria, setNomePadaria] = useState("Padaria Piloto Betuelly");
  const [whatsappPadaria, setWhatsappPadaria] = useState("31995172722");
  const [metaVisitas, setMetaVisitas] = useState(5);
  const [brindePadaria, setBrindePadaria] = useState(
    "1 Café Expresso + Pão de Queijo"
  );

  // Navegação entre os 3 módulos do Painel
  const [abaAtiva, setAbaAtiva] = useState<
    "marketing" | "qrcode" | "clientes"
  >("marketing");

  // Estados do Estúdio de Marketing (Canal do WhatsApp)
  const [tipoCampanha, setTipoCampanha] =
    useState<TipoCampanhaCanal>("lancamento");
  const [produtoInput, setProdutoInput] = useState(
    "Croissant Artesanal Recheado com Nutella"
  );
  const [precoNormalInput, setPrecoNormalInput] = useState("R$ 16,90");
  const [precoPromoInput, setPrecoPromoInput] = useState("R$ 11,90");
  const [escassezInput, setEscassezInput] = useState(
    "Apenas 20 unidades hoje até às 18h"
  );
  const [copiado, setCopiado] = useState(false);

  // Estados do Gerador de Placa QR Code de Balcão
  const [linkCanalInput, setLinkCanalInput] = useState(
    "https://whatsapp.com/channel/0029VaExemploBetuelly"
  );
  const [usarWhatsappDireto, setUsarWhatsappDireto] = useState(true);
  const [tituloPlacaInput, setTituloPlacaInput] = useState(
    "ENTRE NO NOSSO CANAL VIP!"
  );
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
        setBrindePadaria(
          padaria.descricao_brinde || "1 Café + Pão de Queijo"
        );
      }

      const { data: listaClientes, error } = await supabase
        .from("clientes")
        .select("*")
        .order("ultima_visita_em", { ascending: false });

      if (error) throw error;
      setClientes(listaClientes || []);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const calcularDiasAusente = (dataIso: string) => {
    if (!dataIso) return 0;
    const ultima = new Date(dataIso).getTime();
    const agora = new Date().getTime();
    return Math.floor((agora - ultima) / (1000 * 60 * 60 * 24));
  };

  const formatarTelefone = (tel: string) => {
    const limpo = tel.replace(/\D/g, "");
    if (limpo.length === 11) {
      return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}`;
    }
    return tel;
  };

  // Disparos individuais 1-a-1 da tabela de clientes
  const dispararWhatsApp = (
    cliente: Cliente,
    tipoScript: "status" | "resgate" | "fornada" | "vitrine"
  ) => {
    const numeroLimpo = cliente.telefone.replace(/\D/g, "");
    const numeroComDDI = numeroLimpo.startsWith("55")
      ? numeroLimpo
      : `55${numeroLimpo}`;
    const nomeCliente = cliente.nome || "Cliente";
    const faltam = Math.max(0, metaVisitas - cliente.total_visitas);

    let mensagem = "";

    if (tipoScript === "status") {
      if (cliente.total_visitas >= metaVisitas) {
        mensagem = `Olá, ${nomeCliente}! Parabéns! 🎉 Você completou as suas ${cliente.total_visitas} visitas no Clube da *${nomePadaria}*!\n\nO seu presente (*${brindePadaria}*) já está liberado. Basta mostrar esta mensagem no caixa na sua próxima visita!\n\n_(Para deixar de receber os nossos avisos, responda SAIR)_`;
      } else {
        mensagem = `Olá, ${nomeCliente}! O seu ponto foi registado na *${nomePadaria}*.\nVocê acumulou *${cliente.total_visitas} de ${metaVisitas} visitas* no nosso Clube! 🎉\nFaltam apenas ${faltam} visitas para resgatar o seu presente: *${brindePadaria}*.\n\nAgradecemos a preferência e esperamos por si amanhã!\n_(Para deixar de receber os nossos avisos, responda SAIR)_`;
      }
    } else if (tipoScript === "resgate") {
      mensagem = `Olá, ${nomeCliente}! Reparamos que não nos visita há alguns dias e sentimos a sua falta na *${nomePadaria}*.\n\nPara deixar a sua semana mais saborosa, passando aqui hoje ou amanhã e pedindo o seu café ou lanche, uma porção quentinha de pão de queijo é por nossa conta! ☕🧀\n\nBasta mostrar esta mensagem no caixa. Até já!\n_(Para deixar de receber os nossos avisos, responda SAIR)_`;
    } else if (tipoScript === "fornada") {
      mensagem = `Aviso rápido da *${nomePadaria}*! 🚨\n\nAcabou de sair do forno uma fornada especial de Pão de Queijo Recheado e Rosca Rainha.\nComo costuma visitar-nos neste horário, estamos a avisar em primeira mão. Se quiser que a nossa equipa reserve a sua unidade antes que acabe, responda *RESERVAR*! 🥖🔥\n\n_(Para deixar de receber os nossos avisos, responda SAIR)_`;
    } else if (tipoScript === "vitrine") {
      mensagem = `Boa noite, ${nomeCliente}! Para encerrar o dia com a vitrine renovada na *${nomePadaria}*, montámos 5 Combos Especiais (Fatias de Torta + Salgados) com *30% de desconto*. 🍰🍕\n\nÉ válido apenas para retirada até às 20h00 de hoje. Para garantir o seu, responda *QUERO O COMBO* e enviamos a chave PIX de reserva!\n\n_(Para deixar de receber os nossos avisos, responda SAIR)_`;
    }

    const url = `https://wa.me/${numeroComDDI}?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  };

  const resgatarBrinde = async (cliente: Cliente) => {
    const confirmar = window.confirm(
      `Confirmar a entrega do brinde (${brindePadaria}) para o número ${formatarTelefone(
        cliente.telefone
      )} e reiniciar a contagem para 0?`
    );
    if (!confirmar) return;

    try {
      await supabase
        .from("clientes")
        .update({ total_visitas: 0 })
        .eq("id", cliente.id);
      await carregarDados();
    } catch (err) {
      alert("Erro ao atualizar resgate de brinde.");
    }
  };

  // Gerador Inteligente de Copy para o Canal do WhatsApp
  const gerarTextoCanal = () => {
    const numPadariaLimpo = whatsappPadaria.replace(/\D/g, "");
    const ddiPadaria = numPadariaLimpo.startsWith("55")
      ? numPadariaLimpo
      : `55${numPadariaLimpo}`;

    const textoReservaUrl = encodeURIComponent(
      `Olá! Vi no Canal do WhatsApp e quero reservar: ${produtoInput} (${precoPromoInput})`
    );
    const linkReservaDireta = `https://wa.me/${ddiPadaria}?text=${textoReservaUrl}`;

    if (tipoCampanha === "lancamento") {
      return `🚀 *NOVIDADE SAINDO DO FORNO NA ${nomePadaria.toUpperCase()}!* 🚀\n\nVocês pediram e a nossa confeitaria criou: chegou o novo *${produtoInput}*! 🥐✨\n\nFeito com ingredientes selecionados, massa fresquinha e aquele sabor inconfundível para transformar o seu café.\n\n🎁 *Oferta Especial de Estreia (Só para membros do Canal):*\nDe ~${precoNormalInput}~ por apenas *${precoPromoInput}*!\n⏳ _${escassezInput}_\n\n👇 *Garanta o seu antes que esgote clicando no link abaixo:*\n${linkReservaDireta}\n\n_Gostou da novidade? Deixe um ❤️ ou 🔥 aqui na mensagem!_`;
    }

    if (tipoCampanha === "relampago") {
      return `⚡ *PROMOÇÃO RELÂMPAGO — FORNADA QUENTE!* ⚡\n\nAcabou de sair do forno na *${nomePadaria}*: *${produtoInput}* quentinho e crocante! 🔥\n\nPara quem está atento aqui no nosso Canal VIP, liberámos um lote com desconto imediato:\n\n💥 De ~${precoNormalInput}~ por *${precoPromoInput}*\n⚠️ *Atenção:* ${escassezInput}.\n\n🏃‍♂️ Passe agora no balcão ou clique abaixo para reservar a sua unidade via PIX:\n${linkReservaDireta}`;
    }

    if (tipoCampanha === "campanha") {
      return `🎯 *CAMPANHA ESPECIAL DA SEMANA — ${nomePadaria.toUpperCase()}* ☕🥖\n\nNada melhor do que reunir a família ou fazer aquela pausa especial no dia com produto fresco de verdade!\n\nPreparamos o nosso *${produtoInput}* numa condição imperdível:\n✅ Valor normal: ~${precoNormalInput}~\n✅ Valor da Campanha: *${precoPromoInput}*\n📌 _${escassezInput}_\n\n📲 *Encomende ou reserve para retirar sem fila:*\n${linkReservaDireta}\n\n_Reaja com 👍 se você não abre mão de pão quentinho todos os dias!_`;
    }

    if (tipoCampanha === "vip") {
      return `👑 *SENHA SECRETA DOS MEMBROS DO CANAL!* 🤫\n\nQuem faz parte do Canal Oficial da *${nomePadaria}* tem privilégios que mais ninguém tem.\n\nHoje, o nosso *${produtoInput}* sai de ~${precoNormalInput}~ por *${precoPromoInput}* exclusivamente para vocês!\n\n🔑 *Como resgatar:* Passe na padaria (${escassezInput}) e diga no caixa a senha *"SOU VIP DO CANAL"* ou clique abaixo para deixar separado:\n${linkReservaDireta}`;
    }

    return `📊 *VOCÊ DECIDE A PRÓXIMA FORNADA COM DESCONTO!* 🔥\n\nDaqui a pouco sai fornada especial na *${nomePadaria}* com preço promocional de *${precoPromoInput}*, mas queremos saber o que vocês estão com mais vontade de comer hoje!\n\nVote reagindo a esta mensagem:\n❤️ = *${produtoInput}*\n🔥 = *Pão de Queijo Recheado + Café Expresso*\n\nA opção mais votada até às 15h entra em promoção relâmpago aqui no Canal! Vote agora 👇`;
  };

  const obterDicaVisual = () => {
    if (tipoCampanha === "lancamento") {
      return "Tire uma foto bem de perto (macro) partindo o produto ao meio para mostrar o recheio ou a maciez da massa sob boa iluminação.";
    }
    if (tipoCampanha === "relampago") {
      return "Grave um vídeo curto de 5 segundos tirando a assadeira do forno ou na vitrine, mostrando o vapor a sair.";
    }
    if (tipoCampanha === "campanha") {
      return "Monte uma mesa bonita com o produto acompanhado de uma chávena de café expresso para aumentar o desejo pelo combo.";
    }
    if (tipoCampanha === "vip") {
      return "Use uma foto do produto com um selo ou texto simples na imagem: 'Exclusivo Membros do Canal'.";
    }
    return "Publique uma foto dividida com as duas opções da votação lado a lado para estimular o toque nas reações.";
  };

  const copiarAnuncio = () => {
    navigator.clipboard.writeText(gerarTextoCanal());
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const compartilharNoWhatsApp = () => {
    const texto = gerarTextoCanal();
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  const selecionarPredefinicao = (tipo: TipoCampanhaCanal) => {
    setTipoCampanha(tipo);
    if (tipo === "lancamento") {
      setProdutoInput("Croissant Artesanal Recheado com Nutella");
      setPrecoNormalInput("R$ 16,90");
      setPrecoPromoInput("R$ 11,90");
      setEscassezInput("Apenas 20 unidades hoje até às 18h");
    } else if (tipo === "relampago") {
      setProdutoInput("Fornada de Pão de Queijo Canastra + Café");
      setPrecoNormalInput("R$ 14,00");
      setPrecoPromoInput("R$ 9,90");
      setEscassezInput("Válido somente na próxima 1 hora (15 combos)");
    } else if (tipo === "campanha") {
      setProdutoInput("Combo Café da Tarde Família (Rosca + Salgados + Suco)");
      setPrecoNormalInput("R$ 49,90");
      setPrecoPromoInput("R$ 36,90");
      setEscassezInput("Campanha válida de Terça a Quinta");
    } else if (tipo === "vip") {
      setProdutoInput("Fatia Generosa de Torta Holandesa");
      setPrecoNormalInput("R$ 15,00");
      setPrecoPromoInput("R$ 9,50");
      setEscassezInput("Somente para os 10 primeiros a apresentarem no caixa");
    } else if (tipo === "enquete") {
      setProdutoInput("Sonho de Doce de Leite Artesanal");
      setPrecoNormalInput("R$ 12,00");
      setPrecoPromoInput("R$ 7,90");
      setEscassezInput("Votação encerra às 15h");
    }
  };

  // URL final codificada no QR Code de Balcão
  const obterUrlDestinoQrCode = () => {
    if (usarWhatsappDireto) {
      const numLimpo = whatsappPadaria.replace(/\D/g, "");
      const ddi = numLimpo.startsWith("55") ? numLimpo : `55${numLimpo}`;
      const msg = encodeURIComponent(
        `Olá! Estou aqui no balcão da ${nomePadaria} e quero entrar na Lista/Canal VIP para receber as fornadas quentes e garantir meu brinde de boas-vindas!`
      );
      return `https://wa.me/${ddi}?text=${msg}`;
    }
    return linkCanalInput || "https://whatsapp.com";
  };

  const urlImagemQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&color=08284B&data=${encodeURIComponent(
    obterUrlDestinoQrCode()
  )}`;

  const imprimirPlaca = () => {
    window.print();
  };

  // Métricas resumidas
  const totalClientes = clientes.length;
  const totalVisitasSomadas = clientes.reduce(
    (acc, c) => acc + (c.total_visitas || 0),
    0
  );
  const prontosParaBrinde = clientes.filter(
    (c) => c.total_visitas >= metaVisitas
  ).length;
  const clientesAusentes = clientes.filter(
    (c) => calcularDiasAusente(c.ultima_visita_em) >= 5
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1E242B] p-6 print:bg-white print:p-0">
      {/* Cabeçalho (Oculto na impressão) */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-[#08284B] p-2.5 rounded-xl">
            <img
              src="/BETUELLY_simbolo.svg"
              alt="Betuelly"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00B8C4] block">
              BETUELLY PULSE • MOTOR DE RECORRÊNCIA & MARKETING
            </span>
            <h1 className="text-xl font-extrabold text-[#08284B]">
              {nomePadaria} — Painel de Gestão
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={carregarDados}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#08284B] px-4 py-2.5 rounded-xl text-xs font-bold transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Atualizar Dados
          </button>
          <Link
            href="/ponto"
            className="bg-[#00B8C4] hover:bg-[#00a2ad] text-[#08284B] px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-sm"
          >
            Abrir Terminal do Caixa
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-[#08284B] px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Vitrine
          </Link>
        </div>
      </div>

      {/* Cartões de Indicadores - KPIs (Ocultos na impressão) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 print:hidden">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES CADASTRADOS</span>
            <Users size={18} className="text-[#08284B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">
            {totalClientes}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Base ativa no Supabase
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CHECK-INS NO CICLO</span>
            <CheckCircle2 size={18} className="text-[#00B8C4]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">
            {totalVisitasSomadas}
          </p>
          <span className="text-[11px] text-gray-500">
            Presenças registadas no balcão
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>PRONTOS PARA BRINDE</span>
            <Gift size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">
            {prontosParaBrinde}
          </p>
          <span className="text-[11px] text-gray-500">
            Atingiram {metaVisitas} de {metaVisitas} visitas
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES EM RISCO (+5 DIAS)</span>
            <AlertTriangle size={18} className="text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-rose-600">
            {clientesAusentes}
          </p>
          <span className="text-[11px] text-rose-600 font-semibold">
            Precisam de disparo de resgate
          </span>
        </div>
      </div>

      {/* Seletor de Módulos do Painel (Oculto na impressão) */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-6 print:hidden">
        <button
          onClick={() => setAbaAtiva("marketing")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${
            abaAtiva === "marketing"
              ? "bg-[#08284B] text-white"
              : "bg-white text-[#08284B] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Megaphone size={16} className="text-[#00B8C4]" />
          1. Estúdio de Marketing (Canal do WhatsApp)
        </button>

        <button
          onClick={() => setAbaAtiva("qrcode")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${
            abaAtiva === "qrcode"
              ? "bg-[#08284B] text-white"
              : "bg-white text-[#08284B] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <QrCode size={16} className="text-[#00B8C4]" />
          2. Placa QR Code de Balcão (Captar Seguidores)
        </button>

        <button
          onClick={() => setAbaAtiva("clientes")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-sm ${
            abaAtiva === "clientes"
              ? "bg-[#08284B] text-white"
              : "bg-white text-[#08284B] border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Users size={16} className="text-[#00B8C4]" />
          3. Base de Clientes & Disparos 1-a-1 ({totalClientes})
        </button>
      </div>

      {/* MÓDULO 1: ESTÚDIO DE MARKETING PARA CANAL DO WHATSAPP */}
      {abaAtiva === "marketing" && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">
                PASSO 1 • ESCOLHA O GATILHO DE CAMPANHA
              </span>
              <h2 className="text-lg font-extrabold text-[#08284B]">
                Gerador de Anúncios para Canal do WhatsApp
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Selecione o objetivo da publicação. O sistema aplica gatilhos de escassez, urgência e insere o link direto de reserva no WhatsApp da padaria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              <button
                onClick={() => selecionarPredefinicao("lancamento")}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                  tipoCampanha === "lancamento"
                    ? "border-[#00B8C4] bg-[#00B8C4]/10 text-[#08284B]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Rocket
                  size={18}
                  className="text-[#00B8C4] shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-xs font-extrabold block">
                    Lançamento de Produto
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Apresenta novidade com oferta de estreia
                  </span>
                </div>
              </button>

              <button
                onClick={() => selecionarPredefinicao("relampago")}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                  tipoCampanha === "relampago"
                    ? "border-amber-500 bg-amber-50 text-[#08284B]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-extrabold block">
                    Promoção Relâmpago
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Queima rápida de fornada em 1 hora
                  </span>
                </div>
              </button>

              <button
                onClick={() => selecionarPredefinicao("campanha")}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                  tipoCampanha === "campanha"
                    ? "border-emerald-500 bg-emerald-50 text-[#08284B]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Megaphone
                  size={18}
                  className="text-emerald-600 shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-xs font-extrabold block">
                    Campanha / Combo Família
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Aumenta o ticket médio da semana
                  </span>
                </div>
              </button>

              <button
                onClick={() => selecionarPredefinicao("vip")}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                  tipoCampanha === "vip"
                    ? "border-purple-500 bg-purple-50 text-[#08284B]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Crown size={18} className="text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-extrabold block">
                    Oferta VIP com Senha
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Recompensa exclusiva para seguidores
                  </span>
                </div>
              </button>

              <button
                onClick={() => selecionarPredefinicao("enquete")}
                className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 sm:col-span-2 ${
                  tipoCampanha === "enquete"
                    ? "border-rose-500 bg-rose-50 text-[#08284B]"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <BarChart3
                  size={18}
                  className="text-rose-600 shrink-0 mt-0.5"
                />
                <div>
                  <span className="text-xs font-extrabold block">
                    Enquete de Fornada (Interação com Emojis)
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Faz os seguidores votarem com ❤️ ou 🔥 na promoção da tarde
                  </span>
                </div>
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4] block">
                PASSO 2 • PERSONALIZE OS DADOS DO PRODUTO
              </span>

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">
                  Nome do Produto ou Combo em Destaque
                </label>
                <input
                  type="text"
                  value={produtoInput}
                  onChange={(e) => setProdutoInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#08284B] mb-1">
                    Preço Normal (De)
                  </label>
                  <input
                    type="text"
                    value={precoNormalInput}
                    onChange={(e) => setPrecoNormalInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#08284B] mb-1">
                    Preço na Oferta (Por)
                  </label>
                  <input
                    type="text"
                    value={precoPromoInput}
                    onChange={(e) => setPrecoPromoInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-emerald-700 focus:outline-none focus:border-[#00B8C4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">
                  Regra de Escassez / Limite de Tempo
                </label>
                <input
                  type="text"
                  value={escassezInput}
                  onChange={(e) => setEscassezInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#08284B] text-white rounded-2xl p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">
                  PREVIEW • CANAL DO WHATSAPP
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-bold">
                  Com Link de Reserva
                </span>
              </div>

              <div className="bg-[#0b141a] text-gray-100 p-4 rounded-2xl border border-white/10 text-xs leading-relaxed whitespace-pre-wrap font-sans shadow-inner mb-4">
                {gerarTextoCanal()}
              </div>

              <div className="bg-white/10 border border-white/15 rounded-xl p-3.5 mb-6 flex items-start gap-3">
                <Camera size={18} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#00B8C4] block mb-0.5">
                    Dica Visual para Acompanhar o Texto:
                  </span>
                  <p className="text-[11px] text-gray-200 leading-normal">
                    {obterDicaVisual()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={copiarAnuncio}
                className="w-full bg-[#00B8C4] hover:bg-[#00a2ad] text-[#08284B] py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-sm"
              >
                {copiado ? (
                  <>
                    <Check size={16} /> Texto Copiado! Agora cole no seu Canal
                  </>
                ) : (
                  <>
                    <Copy size={16} /> 1. Copiar Anúncio Pronto
                  </>
                )}
              </button>

              <button
                onClick={compartilharNoWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Send size={15} /> 2. Abrir WhatsApp para Publicar no Canal / Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO 2: GERADOR DE PLACA QR CODE DE BALCÃO (CAPTAÇÃO VIP) */}
      {abaAtiva === "qrcode" && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">
          {/* Coluna Esquerda: Configurações da Placa (Oculta na impressão) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 print:hidden">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B8C4]">
              CAPTAÇÃO NO CAIXA • DISPLAY DE ACRÍLICO / BALCÃO
            </span>
            <h2 className="text-lg font-extrabold text-[#08284B] mt-0.5">
              Configurar Placa QR Code do Canal VIP
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Personalize a placa abaixo e clique em imprimir. Quando o cliente aponta a câmara do telemóvel na fila do caixa, entra diretamente no seu Canal VIP ou envia mensagem para receber alertas de fornada.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-2">
                  Para onde o QR Code deve levar o cliente?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setUsarWhatsappDireto(true)}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      usarWhatsappDireto
                        ? "border-[#00B8C4] bg-[#00B8C4]/10 font-extrabold text-[#08284B]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    📲 WhatsApp da Padaria
                    <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                      Abre conversa com pedido de entrada VIP
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUsarWhatsappDireto(false)}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      !usarWhatsappDireto
                        ? "border-[#00B8C4] bg-[#00B8C4]/10 font-extrabold text-[#08284B]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    📢 Link Direto do Canal
                    <span className="block text-[10px] font-normal text-gray-500 mt-0.5">
                      Usa o link público do Canal do WhatsApp
                    </span>
                  </button>
                </div>
              </div>

              {!usarWhatsappDireto && (
                <div>
                  <label className="block text-xs font-bold text-[#08284B] mb-1">
                    Cole aqui o Link do seu Canal do WhatsApp
                  </label>
                  <input
                    type="text"
                    value={linkCanalInput}
                    onChange={(e) => setLinkCanalInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]"
                    placeholder="https://whatsapp.com/channel/..."
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">
                  Título Principal da Placa
                </label>
                <input
                  type="text"
                  value={tituloPlacaInput}
                  onChange={(e) => setTituloPlacaInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:border-[#00B8C4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">
                  Subtítulo Explicativo
                </label>
                <textarea
                  rows={2}
                  value={subtituloPlacaInput}
                  onChange={(e) => setSubtituloPlacaInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#00B8C4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#08284B] mb-1">
                  🎁 Isca de Balcão (Recompensa Imediata no Caixa)
                </label>
                <input
                  type="text"
                  value={iscaBalcaoInput}
                  onChange={(e) => setIscaBalcaoInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-sm font-semibold text-[#08284B] focus:outline-none focus:border-[#00B8C4]"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={imprimirPlaca}
                  className="flex-1 bg-[#08284B] hover:bg-[#0d3868] text-white py-3.5 px-5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Printer size={16} className="text-[#00B8C4]" />
                  Imprimir Placa de Balcão (A4 / A5)
                </button>

                <a
                  href={obterUrlDestinoQrCode()}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-[#08284B] py-3.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink size={15} /> Testar Link
                </a>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Placa Pronta para Impressão */}
          <div className="lg:col-span-6 flex justify-center print:col-span-12">
            <div className="w-full max-w-md bg-[#08284B] text-white rounded-3xl p-8 shadow-xl border-4 border-[#00B8C4] text-center relative overflow-hidden print:shadow-none print:mt-6">
              {/* Topo Institucional */}
              <div className="inline-flex items-center gap-2 bg-[#00B8C4]/20 border border-[#00B8C4]/40 text-[#00B8C4] px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest mb-4">
                <Sparkles size={13} /> {nomePadaria}
              </div>

              <h3 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">
                {tituloPlacaInput}
              </h3>

              <p className="text-xs text-gray-200 leading-relaxed max-w-sm mx-auto mb-6">
                {subtituloPlacaInput}
              </p>

              {/* Moldura do QR Code */}
              <div className="bg-white p-5 rounded-2xl inline-block shadow-lg border-4 border-[#00B8C4] mb-5">
                <img
                  src={urlImagemQrCode}
                  alt="QR Code Canal VIP"
                  className="w-52 h-52 object-contain mx-auto"
                />
                <span className="block text-[11px] font-extrabold text-[#08284B] uppercase tracking-wider mt-2">
                  Aponte a câmara do telemóvel
                </span>
              </div>

              {/* Passo a Passo Rápido */}
              <div className="grid grid-cols-3 gap-2 text-left bg-white/10 rounded-xl p-3 mb-5 border border-white/10 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#00B8C4] text-[#08284B] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>Abra a câmara</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#00B8C4] text-[#08284B] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>Leia o QR Code</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#00B8C4] text-[#08284B] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>Entre no VIP!</span>
                </div>
              </div>

              {/* Destaque da Isca de Balcão */}
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

      {/* MÓDULO 3: TABELA DE CLIENTES E DISPAROS 1-A-1 */}
      {abaAtiva === "clientes" && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden print:hidden">
          <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-[#08284B]">
                Base de Clientes & Disparos Individuais (WhatsApp 1-a-1)
              </h2>
              <p className="text-xs text-gray-500">
                Clique num gatilho abaixo para abrir o WhatsApp direto do cliente com a mensagem personalizada.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-gray-500">
              A carregar clientes do Supabase...
            </div>
          ) : clientes.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-gray-600 font-bold mb-2">
                Nenhum cliente registado ainda.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Vá ao Terminal do Caixa (`/ponto`) e registe a primeira visita para ver os dados aqui.
              </p>
              <Link
                href="/ponto"
                className="inline-block bg-[#08284B] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Ir para o Bate-Ponto
              </Link>
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
                    const diasSemVir = calcularDiasAusente(c.ultima_visita_em);
                    const ganhouBrinde = c.total_visitas >= metaVisitas;

                    return (
                      <tr key={c.id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-4 font-bold text-[#08284B]">
                          {formatarTelefone(c.telefone)}
                          {c.nome && (
                            <span className="block text-xs text-gray-500 font-normal">
                              {c.nome}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                                ganhouBrinde
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-[#00B8C4]/15 text-[#08284B]"
                              }`}
                            }`}
                            >
                              {c.total_visitas} / {metaVisitas} visitas
                            </span>
                            {ganhouBrinde && (
                              <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                                <Gift size={13} /> Brinde Liberado!
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400" />
                            {diasSemVir === 0
                              ? "Hoje"
                              : `Há ${diasSemVir} dia(s)`}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => dispararWhatsApp(c, "status")}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <MessageCircle size={13} /> Status Clube
                            </button>

                            <button
                              onClick={() => dispararWhatsApp(c, "fornada")}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <Flame size={13} /> Fornada Quente
                            </button>

                            <button
                              onClick={() => dispararWhatsApp(c, "resgate")}
                              className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <AlertTriangle size={13} /> Resgatar Sumido
                            </button>

                            <button
                              onClick={() => dispararWhatsApp(c, "vitrine")}
                              className="bg-[#08284B] hover:bg-[#0d3868] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            >
                              <Sparkles size={13} /> Queima Vitrine
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right">
                          {ganhouBrinde ? (
                            <button
                              onClick={() => resgatarBrinde(c)}
                              className="bg-amber-500 hover:bg-amber-600 text-[#08284B] px-3 py-1.5 rounded-lg text-xs font-extrabold transition shadow-sm"
                            >
                              Entregar Brinde (Zerar)
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-400">
                              Em acumulação
                            </span>
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