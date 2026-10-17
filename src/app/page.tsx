import Link from "next/link";
import {
  Flame,
  Users,
  Cake,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function VitrineBetuelly() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1E242B] font-sans">
      {/* CABEÇALHO COM LOGOMARCA E LOGOTIPO OFICIAL */}
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
              Ver Painel Demo
            </Link>
            <a
              href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20conhecer%20o%20Piloto%20Betuelly%20Pulse"
              target="_blank"
              className="text-xs md:text-sm bg-[#08284B] hover:bg-[#0d3562] text-white font-bold px-5 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#00B8C4]"></span>
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </header>

      {/* PRIMEIRA DOBRA (HERO) COM A FOTO DA PADARIA CHEIA */}
      <section className="bg-[#08284B] text-white py-14 md:py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          {/* Coluna de Texto (6 colunas) */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 bg-[#00B8C4]/20 border border-[#00B8C4]/40 text-[#00B8C4] text-xs font-bold px-3.5 py-1.5 rounded-full mb-5">
              <Sparkles size={14} /> ESPECIALISTA EM PADARIAS & COMÉRCIO LOCAL — GRANDE BH
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Sua vitrine cheia faz o cliente entrar.{" "}
              <span className="text-[#00B8C4]">
                A Betuelly faz ele voltar toda semana.
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              Transforme o movimento anônimo do seu balcão em clientes identificados, dispare avisos de <strong>Fornada Quente</strong> para zerar sobras de vitrine e receba <strong>Encomendas de Festas</strong> no automático pelo WhatsApp.
            </p>

            {/* BOTÕES POLIDOS EM UMA ÚNICA LINHA (SEM QUEBRAR TEXTO) */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20participar%20do%20Projeto%20Piloto%20Betuelly"
                target="_blank"
                className="bg-[#00B8C4] hover:bg-[#00a3ad] text-[#08284B] font-extrabold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base shadow-lg transition whitespace-nowrap"
              >
                Participar do Projeto Piloto <ArrowRight size={18} className="shrink-0" />
              </a>
              <Link
                href="/ponto"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base transition whitespace-nowrap"
              >
                Simular &quot;Bate-Ponto&quot; Ao Vivo
              </Link>
            </div>
          </div>

          {/* Coluna da Imagem Principal da Padaria (6 colunas) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#00B8C4]/40 shadow-2xl bg-[#0d3562]">
              <img
                src="/padaria-vitrine.jpg"
                alt="Padaria movimentada utilizando Betuelly no balcão"
                className="w-full h-[340px] md:h-[420px] object-cover"
              />
              {/* Badge Flutuante sobre a Foto */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#08284B]/95 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-xl shrink-0">
                    <img
                      src="/BETUELLY_simbolo.svg"
                      alt="Betuelly Pulse"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#00B8C4] uppercase">
                      BETUELLY PULSE ATIVO NO BALCÃO
                    </p>
                    <p className="text-xs md:text-sm text-white font-semibold">
                      +184 clientes identificados hoje • 37 alertas de retorno
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

      {/* SEÇÃO: COMO FUNCIONA NO CAIXA (COM A FOTO DO SCANNER QR) */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <img
              src="/padaria-scanner.jpg"
              alt="Cliente registrando presença em 1 segundo no scanner Betuelly"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-[#08284B] text-[#00B8C4] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              <QrCode size={15} /> ZERO ATRITO NA FILA DO CAIXA
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#08284B] mb-4 leading-tight">
              Identificação em 1 segundo. Tão rápida quanto um PIX.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Sabemos que às 07h30 da manhã a fila do seu caixa não pode parar. Por isso, com o <strong>Betuelly Pulse</strong>, a sua atendente não precisa digitar cadastros longos nem trocar de sistema.
            </p>

            <ul className="space-y-3.5 text-sm text-gray-700 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <span>
                  <strong>Leitura Óptica ou Toque Rápido:</strong> O cliente aproxima o QR Code do Clube no leitor ao lado do caixa (ou digita o WhatsApp no tablet) em menos de 2 segundos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <span>
                  <strong>Monitoramento Inteligente de Ausência:</strong> Se um cliente que compra pão de queijo toda segunda, quarta e sexta ficar 5 dias sem aparecer, o sistema avisa você na hora.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#00B8C4] shrink-0 mt-0.5" />
                <span>
                  <strong>Recompensa com Margem Protegida:</strong> O cliente acumula visitas para ganhar itens de fabricação própria da sua padaria (baixo custo para você, alto valor para ele).
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/ponto"
                className="bg-[#08284B] hover:bg-[#0d3562] text-white font-bold px-5 py-3 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap"
              >
                Testar Simulador do Caixa <ArrowRight size={16} />
              </Link>
              <Link
                href="/painel"
                className="border border-[#08284B] text-[#08284B] hover:bg-gray-50 font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap"
              >
                Ver Painel de Clientes Sumidos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OS 3 MOTORES DE CAIXA DO BETUELLY PULSE */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#08284B] mb-4">
            Três motores para aumentar o faturamento da sua padaria
          </h2>
          <p className="text-gray-600">
            Desenvolvido especificamente para a rotina de padarias, confeitarias e restaurantes da Grande Belo Horizonte.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                1. Clube &quot;Bate-Ponto&quot; & Resgate de Sumidos
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Identifique quem frequenta o seu balcão, descubra a frequência real de cada cliente e dispare campanhas automáticas de resgate quando ele deixar de ir.
              </p>
            </div>
            <Link
              href="/ponto"
              className="text-sm font-bold text-[#08284B] hover:text-[#00B8C4] flex items-center gap-1"
            >
              Abrir Tela do Balcão <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                2. Botão Fornada Quente & Queima de Vitrine
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Saiu fornada especial às 16h30 ou sobraram tortas às 19h00? Com 1 clique, avise apenas os clientes daquele turno e transforme sobra de vitrine em PIX imediato.
              </p>
            </div>
            <Link
              href="/painel"
              className="text-sm font-bold text-[#08284B] hover:text-[#00B8C4] flex items-center gap-1"
            >
              Abrir Painel do Dono <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                3. Máquina de Encomendas & Kits Festa
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Catálogo express para o cliente fechar bolos, cento de salgados e coffee break sem ocupar o caixa — com lembrete automático do aniversário no ano seguinte.
              </p>
            </div>
            <Link
              href="/encomendas"
              className="text-sm font-bold text-[#08284B] hover:text-[#00B8C4] flex items-center gap-1"
            >
              Abrir Catálogo de Encomendas <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* QUEM ESTÁ POR TRÁS (AUTORIDADE DO ALBERTO) */}
      <section className="bg-white border-t border-gray-200 py-16 px-6 mt-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B8C4]">
              POR TRÁS DA TECNOLOGIA, VIVÊNCIA REAL DE PADARIA
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#08284B] mt-2 mb-4">
              Criado por quem conhece a rotina do forno ao balcão.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              A <strong>Betuelly</strong> resgata o legado de uma marca familiar criada no comércio há mais de 35 anos e une duas experiências fundamentais: <strong>desenvolvimento de tecnologia</strong> e <strong>vivência prática dentro de padarias</strong>.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Filho de donos de padaria, ex-padeiro e representante comercial de insumos na Grande BH, <strong>Alberto Gonçalves</strong> trouxe a praticidade do comércio digital dos Estados Unidos adaptada exatamente para a realidade do empresário brasileiro.
            </p>
          </div>

          <div className="bg-[#08284B] text-white p-7 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
              <div className="bg-white p-1.5 rounded-lg">
                <img
                  src="/BETUELLY_simbolo.svg"
                  alt="Betuelly"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-base text-white leading-none">
                  BETUELLY PULSE
                </h4>
                <span className="text-xs text-[#00B8C4]">
                  Projeto Piloto — Grande BH
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-200 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Sem trocar o seu sistema de caixa atual
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Sem obrigar o cliente a baixar aplicativo
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Implantação completa em 48 horas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                100% adequado à LGPD
              </li>
            </ul>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              className="block w-full text-center bg-[#00B8C4] hover:bg-[#00a3ad] text-[#08284B] font-extrabold py-3.5 rounded-xl text-sm transition"
            >
              Falar Diretamente com o Alberto
            </a>
          </div>
        </div>
      </section>

      {/* RODAPÉ OFICIAL (COM DATA FIXA 2026 SEM ERRO NO NEXT.JS) */}
      <footer className="bg-[#08284B] text-white py-10 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl">
              <img
                src="/BETUELLY_simbolo.svg"
                alt="Símbolo Betuelly"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold tracking-[0.18em] text-base block leading-none">
                BETUELLY
              </span>
              <span className="text-xs text-gray-400">
                Tecnologia aplicada à realidade de quem empreende.
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 Betuelly Tecnologia • Belo Horizonte, MG
          </p>
        </div>
      </footer>
    </div>
  );
}