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
} from "lucide-react";
// Reutiliza a conexão do Supabase que já está a funcionar na pasta ponto
import { supabase } from "../ponto/supabase";

interface Cliente {
  id: string;
  telefone: string;
  nome: string | null;
  total_visitas: number;
  status_recorrencia: string;
  ultima_visita_em: string;
}

export default function PainelGestao() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [nomePadaria, setNomePadaria] = useState("Padaria Piloto Betuelly");
  const [metaVisitas, setMetaVisitas] = useState(5);
  const [brindePadaria, setBrindePadaria] = useState("1 Café Expresso + Pão de Queijo");

  const carregarDados = async () => {
    setLoading(true);
    try {
      // 1. Procura configurações da padaria piloto
      const { data: padaria } = await supabase
        .from("padarias")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .maybeSingle();

      if (padaria) {
        setNomePadaria(padaria.nome_fantasia);
        setMetaVisitas(padaria.meta_visitas_brinde || 5);
        setBrindePadaria(padaria.descricao_brinde || "1 Café + Pão de Queijo");
      }

      // 2. Procura os clientes reais ordenados pela visita mais recente
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

  // Função para calcular há quantos dias foi a última visita
  const calcularDiasAusente = (dataIso: string) => {
    if (!dataIso) return 0;
    const ultima = new Date(dataIso).getTime();
    const agora = new Date().getTime();
    return Math.floor((agora - ultima) / (1000 * 60 * 60 * 24));
  };

  // Função para formatar o número (ex: 31995172722 -> (31) 99517-2722)
  const formatarTelefone = (tel: string) => {
    const limpo = tel.replace(/\D/g, "");
    if (limpo.length === 11) {
      return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}`;
    }
    return tel;
  };

  // Função que monta os scripts e abre o WhatsApp Web / App diretamente
  const dispararWhatsApp = (cliente: Cliente, tipoScript: "status" | "resgate" | "fornada" | "vitrine") => {
    const numeroLimpo = cliente.telefone.replace(/\D/g, "");
    const numeroComDDI = numeroLimpo.startsWith("55") ? numeroLimpo : `55${numeroLimpo}`;
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

    const url = `https://wa.me/${numeroComDDI}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  // Função para entregar o brinde e reiniciar o ciclo do cliente para 0
  const resgatarBrinde = async (cliente: Cliente) => {
    const confirmar = window.confirm(
      `Confirmar a entrega do brinde (${brindePadaria}) para o número ${formatarTelefone(cliente.telefone)} e reiniciar a contagem para 0?`
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

  // Métricas resumidas
  const totalClientes = clientes.length;
  const totalVisitasSomadas = clientes.reduce((acc, c) => acc + (c.total_visitas || 0), 0);
  const prontosParaBrinde = clientes.filter((c) => c.total_visitas >= metaVisitas).length;
  const clientesAusentes = clientes.filter((c) => calcularDiasAusente(c.ultima_visita_em) >= 5).length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1E242B] p-6">
      {/* Cabeçalho */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
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
              BETUELLY PULSE • MOTOR DE RECORRÊNCIA
            </span>
            <h1 className="text-xl font-extrabold text-[#08284B]">
              {nomePadaria} — Painel de Retenção
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

      {/* Cartões de Indicadores (KPIs) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES CADASTRADOS</span>
            <Users size={18} className="text-[#08284B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">{totalClientes}</p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Base ativa no Supabase
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CHECK-INS NO CICLO</span>
            <CheckCircle2 size={18} className="text-[#00B8C4]" />
          </div>
          <p className="text-3xl font-extrabold text-[#08284B]">{totalVisitasSomadas}</p>
          <span className="text-[11px] text-gray-500">
            Presenças registadas no balcão
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>PRONTOS PARA BRINDE</span>
            <Gift size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{prontosParaBrinde}</p>
          <span className="text-[11px] text-gray-500">
            Atingiram {metaVisitas} de {metaVisitas} visitas
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-2">
            <span>CLIENTES EM RISCO (+5 DIAS)</span>
            <AlertTriangle size={18} className="text-rose-500" />
          </div>
          <p className="text-3xl font-extrabold text-rose-600">{clientesAusentes}</p>
          <span className="text-[11px] text-rose-600 font-semibold">
            Precisam de disparo de resgate
          </span>
        </div>
      </div>

      {/* Tabela de Clientes e Central de Disparos WhatsApp */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-extrabold text-[#08284B]">
              Base de Clientes & Disparos Inteligentes (WhatsApp)
            </h2>
            <p className="text-xs text-gray-500">
              Clique num gatilho abaixo para abrir o WhatsApp do cliente com a mensagem personalizada pronta a enviar.
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
                            title="Envia confirmação de pontos ou aviso de brinde liberado"
                          >
                            <MessageCircle size={13} /> Status Clube
                          </button>

                          <button
                            onClick={() => dispararWhatsApp(c, "fornada")}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            title="Avisa que saiu fornada quente agora"
                          >
                            <Flame size={13} /> Fornada Quente
                          </button>

                          <button
                            onClick={() => dispararWhatsApp(c, "resgate")}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            title="Envia oferta de pão de queijo para cliente sumido"
                          >
                            <AlertTriangle size={13} /> Resgatar Sumido
                          </button>

                          <button
                            onClick={() => dispararWhatsApp(c, "vitrine")}
                            className="bg-[#08284B] hover:bg-[#0d3868] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                            title="Oferece Combo Fim de Dia com 30% de desconto"
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
    </div>
  );
}