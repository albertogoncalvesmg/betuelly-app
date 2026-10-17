import Link from "next/link";
import { 
  Flame, 
  Users, 
  Cake, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";

export default function VitrineBetuelly() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#1E242B] font-sans">
      {/* CABEÇALHO */}
      <header className="bg-[#08284B] text-white sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Símbolo B estilizado */}
            <div className="w-10 h-10 rounded-xl bg-[#00B8C4]/20 border-2 border-[#00B8C4] flex items-center justify-center font-bold text-xl text-[#00B8C4]">
              B
            </div>
            <div>
              <span className="font-bold tracking-widest text-lg block leading-none">
                BETUELLY
              </span>
              <span className="text-[11px] text-gray-300 tracking-tight">
                Tecnologia aplicada a quem empreende
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/painel"
              className="text-xs md:text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Ver Demo do Sistema
            </Link>
            <a
              href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20conhecer%20o%20Piloto%20Betuelly%20Pulse"
              target="_blank"
              className="text-xs md:text-sm bg-[#00B8C4] hover:bg-[#009da8] text-[#08284B] font-bold px-4 py-2 rounded-lg transition"
            >
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </header>

      {/* PRIMEIRA DOBRA (HERO) */}
      <section className="bg-[#08284B] text-white py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#00B8C4]/20 text-[#00B8C4] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              ESPECIALISTA EM PADARIAS & COMÉRCIO LOCAL — GRANDE BH
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Você sabe quantos clientes compraram hoje. <span className="text-[#00B8C4]">Mas sabe quantos deixaram de voltar?</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              A <strong>Betuelly</strong> transforma o movimento anónimo do seu balcão em clientes identificados, vendas de fornadas em tempo real e encomendas automatizadas pelo WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5531999999999?text=Ol%C3%A1%20Alberto,%20quero%20participar%20do%20Projeto%20Piloto%20Betuelly"
                className="bg-[#00B8C4] hover:bg-[#009da8] text-[#08284B] font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-base shadow-lg"
              >
                Participar do Projeto Piloto <ArrowRight size={18} />
              </a>
              <Link
                href="/ponto"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-base"
              >
                Testar "Bate-Ponto" Ao Vivo
              </Link>
            </div>
          </div>

          {/* CARTÃO DEMONSTRATIVO DO PULSE */}
          <div className="bg-[#0d3562] border border-white/15 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs text-[#00B8C4] font-bold uppercase tracking-wider">
                  BETUELLY PULSE — PAINEL AO VIVO
                </p>
                <h3 className="text-lg font-bold">Resumo da Operação Hoje</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium">
                ● Ativo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#08284B] p-4 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400">Visitas Identificadas Hoje</p>
                <p className="text-2xl font-bold text-white mt-1">184</p>
                <span className="text-[11px] text-[#00B8C4]">+22 novos cadastros</span>
              </div>
              <div className="bg-[#08284B] p-4 rounded-xl border border-amber-400/40">
                <p className="text-xs text-amber-300">Clientes em Risco (Ausentes)</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">37</p>
                <span className="text-[11px] text-gray-300">Atrasados no padrão habitual</span>
              </div>
            </div>

            <div className="bg-[#08284B]/80 p-4 rounded-xl border border-[#00B8C4]/40 mb-4">
              <p className="text-xs text-[#00B8C4] font-semibold mb-1">
                ⚡ AÇÃO RECOMENDADA AGORA (17h15)
              </p>
              <p className="text-sm text-gray-200 mb-3">
                37 clientes habituais da tarde não vieram esta semana. Deseja enviar o alerta de <strong>Fornada Quente</strong> para trazê-los hoje?
              </p>
              <Link
                href="/painel"
                className="w-full block text-center bg-[#00B8C4] text-[#08284B] font-bold py-2.5 rounded-lg text-sm hover:opacity-90"
              >
                Simular Disparo no Painel →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AS 3 ARMAS DO BETUELLY PULSE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#08284B] mb-4">
            Não vendemos "posts de Instagram". Entregamos caixa e recorrência.
          </h2>
          <p className="text-gray-600">
            O <strong>Betuelly Pulse</strong> resolve os 3 maiores ralos financeiros de uma padaria sem precisar de trocar o seu sistema de caixa atual.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Pilar 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                1. Clube "Bate-Ponto" & Resgate de Sumidos
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                O cliente digita o WhatsApp em 3 segundos no balcão. O sistema aprende de quantos em quantos dias ele costuma ir e avisa automaticamente quando ele começa a sumir.
              </p>
            </div>
            <Link
              href="/ponto"
              className="text-sm font-bold text-[#08284B] hover:text-[#00B8C4] flex items-center gap-1"
            >
              Abrir Tela do Balcão <ArrowRight size={16} />
            </Link>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Flame size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                2. Botão Fornada Quente & Fim de Tarde
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Saiu fornada especial ou sobraram tortas e salgados às 18h30? Aperte um botão e avise apenas os clientes do turno da tarde para zerar a sobra de vitrine via PIX.
              </p>
            </div>
            <Link
              href="/painel"
              className="text-sm font-bold text-[#08284B] hover:text-[#00B8C4] flex items-center gap-1"
            >
              Abrir Painel do Dono <ArrowRight size={16} />
            </Link>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#08284B] text-[#00B8C4] flex items-center justify-center mb-6">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#08284B] mb-3">
                3. Máquina de Encomendas & Kits Festa
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Link rápido para o cliente encomendar bolos, cento de salgados e coffee break sem tomar tempo do caixa. E o sistema lembra o cliente 11 meses depois do próximo aniversário.
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
      <section className="bg-white border-y border-gray-200 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B8C4]">
              POR TRÁS DA TECNOLOGIA, VIVÊNCIA REAL DE PADARIA
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#08284B] mt-2 mb-4">
              Criado por quem conhece a rotina do forno ao balcão.
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              A <strong>Betuelly</strong> nasceu de uma marca familiar no comércio há mais de 35 anos e hoje une duas pontas raras: <strong>desenvolvimento de software moderno</strong> e <strong>experiência real dentro de padarias</strong>.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Como filho de donos de padaria, ex-padeiro e representante comercial do setor na Grande BH, <strong>Alberto Gonçalves</strong> desenhou o Betuelly Pulse inspirado na eficiência do comércio eletrónico norte-americano, adaptado para a rotina real do empresário mineiro.
            </p>
          </div>
          <div className="bg-[#08284B] text-white p-6 rounded-2xl">
            <h4 className="font-bold text-lg text-[#00B8C4] mb-3">
              Projeto Piloto — Grande BH
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-200 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Sem trocar o seu ERP/PDV atual
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Sem obrigar o cliente a baixar app
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Implantação guiada em 48 horas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00B8C4] shrink-0" />
                Adequado às normas da LGPD
              </li>
            </ul>
            <a
              href="https://wa.me/5531999999999"
              className="block w-full text-center bg-[#00B8C4] text-[#08284B] font-bold py-3 rounded-xl text-sm"
            >
              Falar Diretamente com o Alberto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}