import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { sendMetaEvent } from "../lib/meta-capi.functions";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Sparkles,
  Volume2,
  Brain,
  Layers,
  Type,
  X,
} from "lucide-react";

import abbaMark from "../assets/abba-mark.png";
import kitCutout from "../assets/abba-kit-cutout.png";
import { Testimonials } from "../components/Testimonials";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Bíblia Além da Tradução — ABBA PALAVRA" },
      {
        name: "description",
        content:
          "Seu primeiro contato com o Hebraico Bíblico — mesmo começando do zero. Descubra as palavras por trás da tradução. Pagamento único de R$ 17,90.",
      },
      { property: "og:title", content: "Bíblia Além da Tradução — ABBA PALAVRA" },
      {
        property: "og:description",
        content:
          "Seu primeiro contato com o Hebraico Bíblico — mesmo começando do zero. Descubra as palavras por trás da tradução.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const CHECKOUT_URL = "https://pay.cakto.com.br/3zswdss_1094286";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __metaPvId?: string;
  }
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function metaCookies(): { fbp?: string; fbc?: string } {
  const fbp = readCookie("_fbp");
  const fbc = readCookie("_fbc");
  return { ...(fbp ? { fbp } : {}), ...(fbc ? { fbc } : {}) };
}

function genEventId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function trackInitiateCheckout() {
  const eventId = genEventId("ic");
  window.fbq?.("track", "InitiateCheckout", {}, { eventID: eventId });
  void sendMetaEvent({
    data: {
      eventName: "InitiateCheckout",
      eventId,
      eventSourceUrl: window.location.href,
      ...metaCookies(),
    },
  });
}

function CtaButton({ children, href = CHECKOUT_URL }: { children: string; href?: string }) {
  return (
    <a
      href={href}
      className="cta-button"
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackInitiateCheckout}
    >
      {children}
      <ArrowRight className="size-4" strokeWidth={2.5} />
    </a>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-accent/60" />
      <span className="size-1.5 rounded-full bg-accent" />
      <span className="h-px w-16 bg-accent/60" />
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="relative overflow-hidden bg-forest-deep text-forest-foreground">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-12 text-center lg:pb-28">
          
          <h1 className="font-display fade-up fade-up-delay-1 mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
            Descubra o que existe por trás das palavras da Bíblia.
          </h1>
          <p className="fade-up fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-forest-foreground/85 sm:text-xl">
            Seu primeiro contato com o Hebraico Bíblico — mesmo começando do zero.
          </p>
          <img
            src={kitCutout}
            alt="Kit Bíblia Além da Tradução — produto principal e bônus"
            className="fade-up fade-up-delay-2 mt-10 w-full max-w-4xl object-contain"
            width={1376}
            height={768}
          />
          <p className="fade-up fade-up-delay-2 mt-8 max-w-xl text-base leading-relaxed text-forest-foreground/65">
            Você já leu uma passagem e pensou: “Será que essa palavra significa
            exatamente isso no original?” Agora você pode começar a descobrir
            esse universo sem faculdade de Teologia, sem dominar hebraico e sem
            gramáticas complicadas.
          </p>
          <div className="fade-up fade-up-delay-3 mt-9">
            <CtaButton>Quero descobrir a Bíblia além da tradução</CtaButton>
            <p className="mt-4 text-sm text-forest-foreground/60">
              Pagamento único • Acesso imediato • R$17,90
            </p>
          </div>
        </div>

      </header>

      {/* O QUE VOCÊ VAI DESCOBRIR */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="eyebrow text-center text-accent">O que você vai descobrir</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-tight sm:text-5xl">
          Um primeiro passo simples para entrar no mundo do Hebraico Bíblico
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
          Você não precisa memorizar centenas de regras ou saber falar hebraico.
          O objetivo é apresentar os fundamentos de maneira clara e prática.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              t: "Comece do absoluto zero",
              d: "Nunca estudou hebraico? Sem problema. Você vai conhecer os fundamentos necessários para começar, sem assumir conhecimento prévio.",
            },
            {
              n: "02",
              t: "Conheça o alfabeto hebraico",
              d: "Descubra as letras, seus nomes, sons e características — e comece a reconhecer elementos que antes pareciam desconhecidos.",
            },
            {
              n: "03",
              t: "Aprenda suas primeiras palavras bíblicas",
              d: "Conheça palavras importantes das Escrituras e perceba suas conexões e significados, muito além de decorar.",
            },
            {
              n: "04",
              t: "Entenda o conceito de raízes",
              d: "Descubra como palavras se relacionam através de suas raízes e aprenda a enxergar a Bíblia de uma maneira diferente.",
            },
            {
              n: "05",
              t: "Aprenda a ler e pronunciar",
              d: "Contato com transliteração e pronúncia das palavras estudadas, tornando o aprendizado acessível desde o início.",
            },
            {
              n: "06",
              t: "Coloque o conhecimento em prática",
              d: "Exemplos extraídos das Escrituras para você observar como as palavras aparecem dentro do texto bíblico.",
            },
          ].map((item) => (
            <article
              key={item.n}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="font-display text-4xl font-semibold text-accent/70 transition-colors group-hover:text-accent">
                {item.n}
              </span>
              <h3 className="font-display mt-3 text-2xl font-semibold leading-snug">
                {item.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SHALOM */}
      <section className="bg-forest py-20 text-forest-foreground lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="arch-frame flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center gap-4 border border-copper/40 bg-forest-deep px-8 text-center shadow-2xl shadow-black/30">
              <p className="hebrew text-7xl text-cream sm:text-8xl" dir="rtl">שָׁלוֹם</p>
              <p className="eyebrow text-copper-soft">Shalom</p>
              <Divider />
              <p className="text-sm text-forest-foreground/60">
                Muito mais do que uma palavra estrangeira
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow text-copper-soft">Veja a Bíblia por outra perspectiva</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Uma palavra pode abrir uma nova porta de compreensão
            </h2>
            <p className="mt-6 leading-relaxed text-forest-foreground/80">
              Ao começar a estudar o idioma original, você passa a perceber que
              palavras bíblicas possuem contexto, estrutura, relações e nuances
              que uma simples tradução nem sempre consegue mostrar completamente.
            </p>
            <p className="mt-4 leading-relaxed text-forest-foreground/80">
              Não queremos que você apenas memorize hebraico. Queremos que você
              comece a <strong className="text-copper-soft">enxergar a Bíblia de outra maneira</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="eyebrow text-center text-accent">O que você recebe</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-tight sm:text-5xl">
          Tudo o que você precisa para começar sua jornada
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-muted-foreground">
          Um material introdutório + recursos complementares para você começar a
          explorar o Hebraico Bíblico.
        </p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl bg-forest p-7 text-forest-foreground sm:col-span-2 lg:col-span-3 lg:flex lg:items-center lg:gap-10">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-copper/20">
              <BookOpen className="size-6 text-copper-soft" />
            </div>
            <div className="mt-5 lg:mt-0">
              <p className="eyebrow text-copper-soft">Produto principal</p>
              <h3 className="font-display mt-2 text-3xl font-semibold">Bíblia Além da Tradução</h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-forest-foreground/75">
                O material principal para começar seus estudos de Hebraico Bíblico
                do zero: fundamentos, alfabeto, palavras importantes, raízes e
                aplicação em exemplos bíblicos.
              </p>
            </div>
          </article>
          {[
            { icon: Type, t: "Bônus 1 — Alfabeto Hebraico Visual", d: "Material de apoio para consultar as letras, seus nomes e características enquanto você estuda." },
            { icon: Volume2, t: "Bônus 2 — Guia de Pronúncia", d: "Um apoio para compreender a pronúncia e a leitura das palavras apresentadas no material." },
            { icon: Layers, t: "Bônus 3 — 50 Palavras Bíblicas Essenciais", d: "Uma seleção de palavras importantes para construir seu vocabulário e reconhecer termos recorrentes." },
            { icon: CalendarDays, t: "Bônus 4 — Desafio 30 Dias de Hebraico", d: "Um roteiro simples para transformar o estudo em prática diária — sem precisar de horas por dia." },
            { icon: Brain, t: "Bônus 5 — Flashcards", d: "Material de apoio para revisar as palavras e os conceitos estudados." },
            { icon: Sparkles, t: "Bônus 6 — As Palavras de Jesus", d: "Uma introdução ao aramaico bíblico e à importância desse idioma para o estudo das Escrituras." },
          ].map((b) => (
            <article
              key={b.t}
              className="rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-accent/15">
                <b.icon className="size-5 text-accent" />
              </div>
              <h3 className="font-display mt-4 text-xl font-semibold leading-snug">{b.t}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="eyebrow text-center text-accent">Para quem é este material?</p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-center text-4xl font-semibold leading-tight sm:text-5xl">
            Feito para você que ama estudar a Bíblia
          </h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display text-2xl font-semibold">O Bíblia Além da Tradução é para você se...</h3>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Ama estudar a Bíblia e quer ir além da leitura tradicional.",
                  "Tem curiosidade sobre o significado das palavras no idioma original.",
                  "Já se perguntou se determinada tradução transmite exatamente o que foi escrito.",
                  "Gostaria de conhecer hebraico, mas acha que um idioma bíblico é complicado demais.",
                  "Nunca estudou hebraico e quer começar do zero.",
                  "Quer uma forma prática de começar antes de investir em um curso aprofundado.",
                  "Deseja enriquecer seus estudos bíblicos, devocionais, aulas ou mensagens.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-forest-deep p-8 text-forest-foreground">
              <h3 className="font-display text-2xl font-semibold">E você NÃO precisa...</h3>
              <p className="font-display mt-5 border-l-2 border-copper pl-4 text-2xl font-semibold leading-snug text-copper-soft">
                Você não precisa saber hebraico para começar.
              </p>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Ser teólogo.",
                  "Saber hebraico.",
                  "Conhecer grego ou aramaico.",
                  "Ter experiência acadêmica.",
                  "Comprar livros caros.",
                  "Dedicar horas todos os dias.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-forest-foreground/80">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-copper/15">
                      <X className="size-3.5 text-copper-soft" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-display mt-8 border-t border-copper/25 pt-6 text-xl italic text-copper-soft">
                Você só precisa ter curiosidade e vontade de descobrir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UMA NOVA FORMA DE ESTUDAR */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
        <p className="eyebrow text-accent">Uma nova forma de estudar a Bíblia</p>
        <h2 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Primeiro, desperte a curiosidade. Depois, os fundamentos. Então, a prática.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          Talvez você já tenha encontrado gramáticas complicadas, termos
          acadêmicos e centenas de regras antes de conseguir ler uma palavra.
          O Bíblia Além da Tradução parte de outro princípio: você não precisa se
          tornar um especialista para começar a descobrir o que existe por trás
          da tradução.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
          {["Uma letra", "Uma palavra", "Uma raiz", "Uma passagem", "Uma nova relação com o texto"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-accent/40 bg-card px-5 py-2.5">{step}</span>
                {i < arr.length - 1 && <ArrowRight className="size-4 text-accent" />}
              </span>
            ),
          )}
        </div>
        <p className="font-display mt-10 text-2xl italic text-muted-foreground">
          Uma palavra de cada vez.
        </p>
      </section>

      {/* SOBRE */}
      <section className="bg-forest py-20 text-forest-foreground lg:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <img
            src={abbaMark}
            alt="Logo ABBA PALAVRA"
            className="mx-auto h-16 w-auto object-contain brightness-0 invert"
            loading="lazy"
            width={288}
            height={128}
          />
          <h2 className="font-display mt-8 text-4xl font-semibold leading-tight sm:text-5xl">
            Quem está por trás do ABBA PALAVRA?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-forest-foreground/85">
            O ABBA PALAVRA nasceu com uma missão simples: tornar o conhecimento
            por trás das Escrituras mais acessível para quem ama a Bíblia e deseja
            estudá-la com mais profundidade.
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-forest-foreground/75">
            Com cuidado e respeito pelo texto bíblico, queremos abrir a porta para
            um universo que durante muito tempo pareceu reservado a especialistas
            — sem transformar você em um acadêmico.
          </p>
          <p className="font-display mt-6 text-2xl italic text-copper-soft">
            A Bíblia é profunda. Mergulhar nela pode ser fascinante.
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <Testimonials />

      {/* OFERTA */}
      <section id="oferta" className="mx-auto max-w-6xl scroll-mt-10 px-6 py-20 lg:py-28">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-forest-deep text-forest-foreground shadow-2xl shadow-forest/30 lg:grid-cols-[1fr_0.85fr]">
          <div className="p-10 lg:p-14">
            <p className="eyebrow text-copper-soft">Comece agora</p>
            <h2 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Seu primeiro passo para descobrir a Bíblia além da tradução
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-forest-foreground/75">
              Sem esperar meses. Sem faculdade. Sem saber hebraico. Comece pelo
              básico, comece do zero, comece por uma palavra.
            </p>
            <p className="eyebrow mt-8 text-forest-foreground/60">Você recebe</p>
            <h3 className="font-display mt-2 text-2xl font-semibold text-forest-foreground">
              Bíblia Além da Tradução
            </h3>
            <div className="mt-8 flex items-end gap-3">
              <span className="text-sm uppercase tracking-widest text-forest-foreground/60">
                Pagamento único • Acesso imediato
              </span>
            </div>
            <p className="font-display mt-2 text-6xl font-semibold text-copper-soft sm:text-7xl">
              R$ 27<span className="text-4xl">,90</span>
            </p>
            <div className="mt-8">
              <CtaButton>Quero começar agora</CtaButton>
              <p className="mt-4 text-sm text-forest-foreground/60">
                Pagamento único • Acesso imediato
              </p>
            </div>
          </div>
          <div className="border-t border-copper/20 bg-forest p-10 lg:border-l lg:border-t-0 lg:p-14">
            <h3 className="font-display text-2xl font-semibold">
              Materiais complementares e bônus
            </h3>
            <ul className="mt-6 space-y-3.5">
              {[
                "Material principal — Bíblia Além da Tradução",
                "Alfabeto Hebraico Visual",
                "Guia de Pronúncia",
                "50 Palavras Bíblicas Essenciais",
                "Desafio 30 Dias de Hebraico",
                "Flashcards",
                "Introdução às Palavras de Jesus e ao Aramaico",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-forest-foreground/85">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-copper/20">
                    <Check className="size-3.5 text-copper-soft" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-copper/30 bg-forest-deep/60 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-soft">
                Garantia de 7 dias
              </p>
              <p className="mt-2 text-sm leading-relaxed text-forest-foreground/70">
                Experimente sem risco. Se dentro de 7 dias você entender que o
                material não é para você, basta solicitar o reembolso dentro das
                condições da garantia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="eyebrow text-center text-accent">Perguntas frequentes</p>
          <h2 className="font-display mt-4 text-center text-4xl font-semibold sm:text-5xl">
            Tire suas dúvidas
          </h2>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Preciso saber hebraico para começar?",
                a: "Não. O Bíblia Além da Tradução foi criado justamente para quem está começando do zero.",
              },
              {
                q: "É um curso completo de Hebraico Bíblico?",
                a: "Não. O Bíblia Além da Tradução é um guia introdutório e uma porta de entrada: apresenta os fundamentos para você começar a reconhecer letras, palavras, raízes e conceitos importantes das Escrituras.",
              },
              {
                q: "Preciso ter conhecimento de Teologia?",
                a: "Não. O material foi pensado para ser acessível mesmo para quem não possui formação teológica ou acadêmica.",
              },
              {
                q: "Quanto tempo preciso estudar por dia?",
                a: "Você estuda no seu próprio ritmo. O Desafio de 30 Dias foi criado para transformar pequenos períodos de estudo em uma rotina consistente.",
              },
              {
                q: "Vou aprender a falar hebraico?",
                a: "O objetivo não é ensinar hebraico moderno para conversação. O foco é apresentar fundamentos do Hebraico Bíblico e ajudar você a compreender elementos do texto das Escrituras no idioma original.",
              },
              {
                q: "E o aramaico?",
                a: "O material inclui uma introdução ao aramaico e às palavras de Jesus, mas o foco principal é o primeiro contato com o Hebraico Bíblico.",
              },
              {
                q: "Como recebo o material?",
                a: "Após a confirmação do pagamento, você receberá as instruções de acesso ao material digital.",
              },
              {
                q: "O pagamento é único?",
                a: "Sim. Você paga uma única vez e não existe mensalidade para este produto.",
              },
              {
                q: "Posso estudar pelo celular?",
                a: "Sim. Por ser um material digital, você poderá estudar utilizando computador, tablet ou celular, conforme o formato disponibilizado.",
              },
              {
                q: "E se eu perceber que não é para mim?",
                a: "Você conta com a garantia de 7 dias para conhecer o material sem risco.",
              },
            ].map((item) => (
              <details key={item.q} className="faq group rounded-xl border border-border bg-card px-6 transition-colors open:border-accent/40">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left font-semibold">
                  {item.q}
                  <span className="faq-icon flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition-transform duration-300">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-base leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden bg-forest-deep py-24 text-center text-forest-foreground lg:py-32">
        <p className="hebrew pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-[26rem] leading-none text-copper/5" dir="rtl" aria-hidden="true">
          א
        </p>
        <div className="relative mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            A Bíblia que você já conhece pode ter muito mais para descobrir
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-forest-foreground/75">
            Você já tem a Bíblia. Agora talvez seja hora de começar a descobrir
            algumas das palavras que estão por trás da tradução.
          </p>
          <div className="mt-10">
            <CtaButton>Quero descobrir mais</CtaButton>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-forest-foreground/50">
            Comece do zero. Descubra as palavras. Aprofunde sua leitura.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-copper/15 bg-forest-deep py-10 text-center text-forest-foreground">
        <p className="font-display text-2xl font-semibold tracking-wide">ABBA PALAVRA</p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-copper-soft/70">
          A Bíblia além da tradução
        </p>
      </footer>
    </div>
  );
}
