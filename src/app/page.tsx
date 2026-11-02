import Link from "next/link";
import {
  Flame,
  Users,
  Cake,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Sparkles,
  ChevronDown,
  HelpCircle
} from "lucide-react";

export default function VitrineBetuelly() {
  const faqs = [
    {
      pergunta: "Preciso trocar o sistema de caixa atual da minha padaria?",
      resposta: "Não. A implantação do Betuelly Pulse funciona de forma paralela e não interfere no seu ERP ou sistema fiscal atual. O objetivo é somar inteligência, não causar transtornos na sua operação."
    },
    {
      pergunta: "O registro atrapalha o atendimento no caixa?",
      resposta: "A experiência foi pensada exatamente para a rotina de alto fluxo do balcão. O cliente apenas aproxima o QR Code ou digita o WhatsApp em um tablet dedicado, um processo que leva segundos e não exige o envolvimento direto do operador de caixa."
    },
    {
      pergunta: "O sistema identifica se o cliente foi à concorrência?",
      resposta: "Não. O sistema analisa exclusivamente o histórico de frequência do cliente dentro do seu estabelecimento, sinalizando mudanças de padrão e ausências prolongadas para que você possa agir no momento certo."
    },
    {
      pergunta: "A Betuelly garante aumento nas minhas vendas?",
      resposta: "Nenhuma tecnologia séria pode garantir aumento de faturamento sem analisar a sua operação. O que a Betuelly entrega é a organização do relacionamento, a identificação clara de oportunidades e as ferramentas de automação para que as suas ações comerciais tenham o máximo de resultado."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1E242B] font-sans">
      {/* CABEÇALHO */}
      <header className="bg-white text-[#08284B] sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <img
              src="/BETUELLY_simbolo.svg"
              alt="Símbolo Betuelly"
              className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <span className="font-extrabold tracking-[0.18em] text-xl text-[#08284B] block leading-none">
                BETUELLY
              </span>
              <span className="text-[11px] text-gray-500 font-medium tracking-tight block mt-1">
                Tecnologia aplicada à realidade de quem empreende.
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/painel"
              className="hidden sm:inline-block text-xs md:text-sm text-[#08284B] font-semibold hover:bg-gray-100 px-4 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              Painel Demonstrativo
            </Link>
            <a
              href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20para%20a%20minha%20padaria"
              target="_blank"
              className="text-xs md:text-sm bg-[#08284B] hover:bg-[#0d3562] text-white font-bold px-5 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#00B8C4]"></span>
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION - PROMESSA AJUSTADA E REALISTA */}
      <section className="bg-[#08284B] text-white py-14 md:py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 bg-[#00B8C4]/20 border border-[#00B8C4]/40 text-[#00B8C4] text-xs font-bold px-3.5 py-1.5 rounded-full mb-5">
              <Sparkles size={14} /> TECNOLOGIA E RELACIONAMENTO PARA PADARIAS
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Sua vitrine atrai clientes. <span className="text-[#00B8C4]">A Betuelly ajuda a trazê-los de volta.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              Sua padaria já trabalha para conquistar clientes todos os dias. Nós ajudamos a organizar o relacionamento com eles, identificar oportunidades de retorno e transformar informações do balcão em ações comerciais inteligentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20agendar%20o%20diagn%C3%B3stico%20gratuito"
                target="_blank"
                className="bg-[#00B8C4] hover:bg-[#00a3ad] text-[#08284B] font-extrabold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-lg transition whitespace-nowrap"
              >
                Solicitar Análise da Minha Padaria <ArrowRight size={18} className="shrink-0" />
              </a>
              <Link
                href="/ponto"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base transition whitespace-nowrap"
              >
                Ver Simulador do Balcão
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#00B8C4]/40 shadow-2xl bg-[#0d3562]">
              <img
                src="/padaria-vitrine.jpg"
                alt="Padaria movimentada"
                className="w-full h-[340px] md:h-[420px] object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#08284B]/95 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-xl shrink-0">
                    <img src="/BETUELLY_simbolo.svg" alt="Betuelly" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#00B8C4] uppercase">
                      PAINEL DEMONSTRATIVO (DADOS SIMULADOS)
                    </p>
                    <p className="text-xs md:text-sm text-white font-semibold">
                      184 registros no exemplo • 37 alertas de retorno
                    </p>
                  </div>
                </div>
                <Link
                  href="/painel"
                  className="bg-[#00B8C4] text-[#08284B] text-xs font-extrabold px-3.5 py-2.5 rounded-lg shrink-0 hover:opacity-90 whitespace-nowrap"
                >
                  Ver Painel →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 - O PROBLEMA (FOCO NO EMPRESÁRIO) */}
      <section className="py-16 px-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#08284B] mb-6">
            O movimento acontece todos os dias. Mas quanto você realmente sabe sobre ele?
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-12">
            Muitas padarias têm dificuldade para entender quem são seus clientes habituais, com que frequência retornam e quais ações podem estimular novas compras sem prejudicar a margem.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-[#F7F8F6] rounded-2xl border border-gray-200">
              <h3 className="font-bold text-[#08284B] mb-2">Clientes Não Identificados</h3>
              <p className="text-sm text-gray-600">É difícil reconhecer padrões de frequência quando as informações do balcão não são registradas de forma estruturada.</p>
            </div>
            <div className="p-6 bg-[#F7F8F6] rounded-2xl border border-gray-200">
              <h3 className="font-bold text-[#08284B] mb-2">Oportunidades Perdidas</h3>
              <p className="text-sm text-gray-600">Sem acompanhar o histórico, fica quase impossível identificar quando um bom cliente está deixando de frequentar a casa.</p>
            </div>
            <div className="p-6 bg-[#F7F8F6] rounded-2xl border border-gray-200">
              <h3 className="font-bold text-[#08284B] mb-2">Ações Sem Medição</h3>
              <p className="text-sm text-gray-600">Fazer promoções é fácil; o difícil é acompanhar com exatidão o retorno financeiro que cada campanha gerou no caixa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 - COMO FUNCIONA NO CAIXA (SEM PROMETER "1 SEGUNDO ABSOLUTO") */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <img
              src="/padaria-scanner.jpg"
              alt="Cliente registrando presença no leitor Betuelly"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-[#08284B] text-[#00B8C4] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              <QrCode size={15} /> PENSADO PARA A ROTINA DO CAIXA
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#08284B] mb-4 leading-tight">
              Registro simples. Resultados organizados.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              A implantação precisa respeitar o ritmo da sua padaria e o trabalho da equipe. Construímos um fluxo de identificação otimizado para não causar gargalos no atendimento de pico.
            </p>

            <ul className="space-y-4 text-sm text-gray-700 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <span>
                  <strong>Identificação Ágil:</strong> O cliente interage com o leitor QR Code ou informa o número no terminal dedicado, mantendo o fluxo do caixa livre.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <span>
                  <strong>Histórico Inteligente:</strong> O sistema sinaliza mudanças relevantes de frequência para que você avalie quando uma ação comercial faz sentido.
                </span>
              </li>
            </ul>

            <Link
              href="/ponto"
              className="inline-flex bg-[#08284B] hover:bg-[#0d3562] text-white font-bold px-6 py-3.5 rounded-xl text-sm items-center gap-2 transition"
            >
              Testar Fluxo de Registro <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 - OS BENEFÍCIOS REFINADOS */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#08284B] mb-4">
            A tecnologia precisa fazer sentido no seu negócio
          </h2>
          <p className="text-gray-600">
            Três pilares estratégicos desenvolvidos para a realidade comercial de padarias.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#08284B] mb-3">1. Inteligência de Relacionamento</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Organize os registros dos seus clientes, observe padrões de frequência e avalie oportunidades para estruturar ações de fidelização mais assertivas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
              <Flame size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#08284B] mb-3">2. Apoio à Gestão de Produção</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Utilize nossa ferramenta de campanhas segmentadas para avisar clientes sobre fornadas especiais e criar ações que ajudem a reduzir sobras no fim do dia.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
              <Cake size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#08284B] mb-3">3. Organização de Encomendas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Um catálogo express que facilita o pedido de kits festa e coffee breaks pelo cliente, organizando as informações e mantendo um histórico de datas comemorativas.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 - FAQ (ADICIONADA CONFORME A AUDITORIA) */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <HelpCircle size={28} className="text-[#00B8C4]" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#08284B]">
            Perguntas Frequentes
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#08284B] mb-2 flex items-start gap-2">
                <ChevronDown size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                {faq.pergunta}
              </h3>
              <p className="text-sm text-gray-600 pl-7 leading-relaxed">
                {faq.resposta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION FINAL REVISADO */}
      <section className="bg-[#08284B] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Sua padaria pode conhecer melhor seus clientes.</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Vamos conversar sobre a rotina do seu negócio, entender os seus desafios no balcão e avaliar como as soluções da Betuelly podem ajudar na sua operação.
          </p>
          <a
            href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20agendar%20uma%20conversa%20para%20avaliar%20a%20implanta%C3%A7%C3%A3o%20da%20Betuelly"
            target="_blank"
            className="inline-flex bg-[#00B8C4] hover:bg-[#00a3ad] text-[#08284B] font-extrabold px-8 py-4 rounded-xl shadow-lg transition text-lg"
          >
            Agendar Conversa de Avaliação
          </a>
        </div>
      </section>

      {/* RODAPÉ OFICIAL */}
      <footer className="bg-[#041527] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/BETUELLY_simbolo.svg" alt="Símbolo Betuelly" className="w-8 h-8 opacity-80" />
            <div>
              <span className="font-extrabold tracking-[0.18em] text-base block text-gray-300">BETUELLY</span>
              <span className="text-xs text-gray-500">Crescimento comercial para negócios reais.</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Betuelly Tecnologia • Grande Belo Horizonte, MG
          </p>
        </div>
      </footer>
    </div>
  );
}
