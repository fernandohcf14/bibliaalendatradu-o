import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent } from "react";
import { sendMetaEvent } from "../lib/meta-capi.functions";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  Headphones,
  Heart,
  Layers3,
  PenLine,
  ShieldCheck,
  Sparkles,
  Type,
  X,
  ZoomIn,
} from "lucide-react";

import "../sales-page.css";

import abbaMark from "../assets/abba-mark.png";
import heroArch from "../assets/hero-arch.jpg";
import bookMockup from "../assets/abba-book.png";
import kitCutout from "../assets/abba-kit-cutout.png";

import main01 from "../assets/main-01.jpg";
import main12 from "../assets/main-12.jpg";
import main32 from "../assets/main-32.jpg";
import main48 from "../assets/main-48.jpg";
import main56 from "../assets/main-56.jpg";

import cali001 from "../assets/cali-001.jpg";
import cali004 from "../assets/cali-004.jpg";
import cali009 from "../assets/cali-009.jpg";
import cali054 from "../assets/cali-054.jpg";
import cali065 from "../assets/cali-065.jpg";
import cali080 from "../assets/cali-080.jpg";
import cali114 from "../assets/cali-114.jpg";
import cali117 from "../assets/cali-117.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Bíblia Além da Tradução — ABBA PALAVRA" },
      {
        name: "description",
        content:
          "Comece a reconhecer letras, palavras e raízes do Hebraico Bíblico — mesmo partindo do zero. Bíblia Além da Tradução + bônus por R$ 27,90.",
      },
      { property: "og:title", content: "Bíblia Além da Tradução — ABBA PALAVRA" },
      {
        property: "og:description",
        content:
          "Você não precisa aprender hebraico inteiro para começar a reconhecer o que está vendo no texto bíblico.",
      },
      { property: "og:image", content: kitCutout },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const CHECKOUT_URL = "https://pay.cakto.com.br/3zswdss_1094286";
const GOOGLE_ADS_ID = "AW-18445909721";

const mainPreview = [
  { src: main01, alt: "Capa interna do Bíblia Além da Tradução" },
  { src: main12, alt: "Página real do módulo Alef-Bet" },
  { src: main32, alt: "Página real sobre sufixos pronominais" },
  { src: main48, alt: "Página real sobre palavras hebraicas" },
  { src: main56, alt: "Página real sobre uso de interlinear" },
];

const caligraphyPreview = [
  { src: cali001, alt: "Capa do Caderno de Escrita Hebraica" },
  { src: cali004, alt: "Mapa do Alef-Bet no caderno de escrita" },
  { src: cali009, alt: "Treino guiado da letra Alef" },
  { src: cali054, alt: "Treino das formas finais do hebraico" },
  { src: cali065, alt: "Treino dos sinais vocálicos Niqqud" },
  { src: cali080, alt: "Prática com palavras bíblicas" },
  { src: cali114, alt: "Teste de reconhecimento e escrita" },
  { src: cali117, alt: "Certificado do Caderno de Escrita Hebraica" },
];

const bonuses = [
  {
    icon: PenLine,
    title: "Caderno de Escrita Hebraica 2.0",
    tag: "Bônus em destaque",
    description:
      "Um companheiro de prática com 118 páginas para sua mão aprender as formas enquanto seus olhos ganham familiaridade com o hebraico. Você observa, traça, escreve e reconhece — até as letras deixarem de parecer estranhas.",
  },
  {
    icon: Type,
    title: "Alfabeto Hebraico Visual",
    tag: "Consulta rápida",
    description:
      "Seu mapa de bolso do Alef-Bet: letras, formas finais e referências visuais para consultar sempre que bater aquela dúvida durante o estudo.",
  },
  {
    icon: Headphones,
    title: "Guia de Pronúncia",
    tag: "Para dar voz às palavras",
    description:
      "Criado para que você não fique apenas olhando para os caracteres. Use como apoio para aproximar som, transliteração e leitura de forma simples.",
  },
  {
    icon: BookOpen,
    title: "50 Palavras Bíblicas Essenciais",
    tag: "Vocabulário inicial",
    description:
      "Uma seleção carinhosa de palavras recorrentes para você construir repertório aos poucos e começar a reencontrá-las em estudos, sermões e textos bíblicos.",
  },
  {
    icon: CalendarDays,
    title: "Desafio 30 Dias de Hebraico",
    tag: "Constância sem peso",
    description:
      "Pequenos passos organizados em uma rotina leve. A proposta é ajudar você a continuar — mesmo quando só houver alguns minutos disponíveis no dia.",
  },
  {
    icon: Layers3,
    title: "Flashcards de Hebraico Bíblico",
    tag: "Revisão inteligente",
    description:
      "Cartões rápidos para revisar letras, palavras e conceitos sem transformar o estudo em obrigação. Veja, tente lembrar e confira.",
  },
  {
    icon: Sparkles,
    title: "As Palavras de Jesus",
    tag: "Introdução ao Aramaico",
    description:
      "Um primeiro encontro com o aramaico presente no contexto bíblico e com expressões preservadas no Novo Testamento — para ampliar sua curiosidade com responsabilidade.",
  },
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __metaPvId?: string;
  }
}

function ensureGoogleTag() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
  }

  // Evita carregar o gtag.js duas vezes caso o __root.tsx já tenha feito isso.
  const hasGoogleTagScript = Array.from(document.scripts).some((script) =>
    script.src.includes("googletagmanager.com/gtag/js"),
  );

  if (!hasGoogleTagScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    script.dataset.abbaGoogleTag = "1";
    document.head.appendChild(script);
  }

  // Ativa a Google tag desta campanha. A compra é confirmada pela integração da Cakto.
  window.gtag("config", GOOGLE_ADS_ID);
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
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

function checkoutWithAttribution() {
  if (typeof window === "undefined") return CHECKOUT_URL;
  const target = new URL(CHECKOUT_URL);
  const current = new URL(window.location.href);
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
    "gbraid",
    "wbraid",
  ].forEach((key) => {
    const value = current.searchParams.get(key);
    if (value) target.searchParams.set(key, value);
  });
  return target.toString();
}

function trackInitiateCheckout(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.href = checkoutWithAttribution();

  const eventId = genEventId("ic");
  window.fbq?.(
    "track",
    "InitiateCheckout",
    { value: 27.9, currency: "BRL", content_name: "Bíblia Além da Tradução" },
    { eventID: eventId },
  );
  // Este evento mede início de checkout. A conversão de COMPRA é disparada pela Cakto
  // somente após aprovação do pagamento (Google Ads label: bJPkCNyi0_QcENn92NtE).
  window.gtag?.("event", "begin_checkout", {
    currency: "BRL",
    value: 27.9,
    items: [{ item_name: "Bíblia Além da Tradução" }],
  });
  void sendMetaEvent({
    data: {
      eventName: "InitiateCheckout",
      eventId,
      eventSourceUrl: window.location.href,
      ...metaCookies(),
    },
  });
}

function CtaButton({ children, variant = "gold" }: { children: string; variant?: "gold" | "light" }) {
  return (
    <a
      href={CHECKOUT_URL}
      className={`abba-cta ${variant === "light" ? "abba-cta-light" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackInitiateCheckout}
    >
      <span>{children}</span>
      <ArrowRight size={18} strokeWidth={2.4} />
    </a>
  );
}

function PreviewStrip({
  items,
  onOpen,
  compact = false,
}: {
  items: { src: string; alt: string }[];
  onOpen: (src: string, alt: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`abba-preview-strip ${compact ? "compact" : ""}`}>
      {items.map((item, index) => (
        <button
          type="button"
          key={`${item.src}-${index}`}
          className="abba-preview-card"
          onClick={() => onOpen(item.src, item.alt)}
          aria-label={`Ampliar: ${item.alt}`}
        >
          <img src={item.src} alt={item.alt} loading="lazy" />
          <span className="abba-preview-zoom"><ZoomIn size={16} /> ampliar</span>
        </button>
      ))}
    </div>
  );
}

function LandingPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    ensureGoogleTag();

    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));

    const key = "abba_viewcontent_2026";
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      const eventId = genEventId("vc");
      window.fbq?.(
        "track",
        "ViewContent",
        { value: 27.9, currency: "BRL", content_name: "Bíblia Além da Tradução" },
        { eventID: eventId },
      );
      window.gtag?.("event", "view_item", {
        currency: "BRL",
        value: 27.9,
        items: [{ item_name: "Bíblia Além da Tradução" }],
      });
      void sendMetaEvent({
        data: {
          eventName: "ViewContent",
          eventId,
          eventSourceUrl: window.location.href,
          ...metaCookies(),
        },
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <main className="abba-page">
      <header className="abba-hero">
        <img className="abba-hero-art" src={heroArch} alt="" aria-hidden="true" />
        <div className="abba-grain" aria-hidden="true" />
        <nav className="abba-nav">
          <div className="abba-brand">
            <img src={abbaMark} alt="" className="abba-brand-mark" />
            <div>
              <strong>ABBA PALAVRA</strong>
              <span>A Bíblia além da tradução.</span>
            </div>
          </div>
          <a href="#oferta" className="abba-nav-link">Ver a oferta <ChevronRight size={15} /></a>
        </nav>

        <div className="abba-hero-grid">
          <div className="abba-hero-copy">
            <div className="abba-kicker">HEBRAICO BÍBLICO PARA QUEM ESTÁ COMEÇANDO</div>
            <h1>Quando alguém diz <em>“no hebraico original...”</em>, você consegue acompanhar?</h1>
            <p className="abba-lead">
              Você não precisa aprender hebraico inteiro para começar. Aprenda a <strong>reconhecer suas primeiras letras, palavras e raízes bíblicas</strong> — mesmo começando do zero.
            </p>
            <div className="abba-hero-points">
              <span><Check size={16} /> Material principal com 64 páginas</span>
              <span><Check size={16} /> 7 bônus de apoio</span>
              <span><Check size={16} /> Caderno de escrita com 118 páginas</span>
            </div>
            <div className="abba-hero-buy">
              <CtaButton>Quero começar a reconhecer</CtaButton>
              <div className="abba-price-note">
                <strong>R$ 27,90</strong>
                <span>pagamento único • acesso imediato • garantia de 7 dias</span>
              </div>
            </div>
          </div>

          <div className="abba-hero-visual" data-reveal>
            <div className="abba-halo" />
            <img src={bookMockup} alt="Bíblia Além da Tradução — ABBA PALAVRA" className="abba-book" />
            <div className="abba-word-card card-one"><span dir="rtl">שָׁלוֹם</span><small>shalom</small></div>
            <div className="abba-word-card card-two"><span dir="rtl">דָּבָר</span><small>davar</small></div>
          </div>
        </div>
      </header>

      <section className="abba-identification abba-section" data-reveal>
        <div className="abba-container narrow">
          <div className="abba-section-label">Talvez você já tenha vivido isso</div>
          <h2>Você ama a Bíblia. O problema é que, quando chega no “original”, parece que a conversa muda de idioma.</h2>
          <div className="abba-situations">
            {["O pastor cita uma palavra em hebraico e você só consegue anotar como ouviu.", "Você vê letras hebraicas em um estudo e tudo parece um bloco indecifrável.", "Você quer conferir uma palavra no interlinear, mas não sabe por onde começar."].map((text) => (
              <div className="abba-situation" key={text}><span>“</span><p>{text}</p></div>
            ))}
          </div>
          <p className="abba-empathy">
            A proposta do <strong>Bíblia Além da Tradução</strong> não é transformar você em linguista. É dar a primeira chave para que você pare de apenas ouvir sobre o original e comece a <strong>reconhecer o que está vendo</strong>.
          </p>
        </div>
      </section>

      <section className="abba-method abba-section">
        <div className="abba-container">
          <div className="abba-section-heading centered" data-reveal>
            <div className="abba-section-label light">UM CAMINHO POSSÍVEL</div>
            <h2>Ouvir. Reconhecer. Entender. Aprofundar.</h2>
            <p>Um primeiro contato progressivo, sem jogar gramática pesada em você antes da hora.</p>
          </div>
          <div className="abba-method-grid">
            {[
              ["01", "Ouvir", "Você começa pelas palavras que já aparecem em sermões, estudos e conteúdos bíblicos."],
              ["02", "Reconhecer", "As formas deixam de ser símbolos estranhos e passam a ganhar nome, som e identidade."],
              ["03", "Entender", "Você conecta transliteração, significado, raízes e pequenas estruturas do texto."],
              ["04", "Aprofundar", "Com uma base inicial, interlineares e estudos de palavras começam a fazer muito mais sentido."],
            ].map(([n, title, text]) => (
              <article className="abba-method-card" key={title} data-reveal>
                <span>{n}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="abba-product abba-section" id="produto">
        <div className="abba-container">
          <div className="abba-product-intro" data-reveal>
            <div>
              <div className="abba-section-label">VEJA O QUE VOCÊ VAI ESTUDAR</div>
              <h2>Não compre no escuro. Veja páginas reais do material.</h2>
              <p>
                A nova edição foi organizada como uma jornada de reconhecimento: Alef-Bet, vocalização, pequenas estruturas, raízes, vocabulário, leitura guiada e uso consciente de ferramentas como o interlinear.
              </p>
            </div>
            <div className="abba-stat-pair">
              <div><strong>64</strong><span>páginas no material principal</span></div>
              <div><strong>0 → 1</strong><span>feito para quem está começando</span></div>
            </div>
          </div>
          <PreviewStrip items={mainPreview} onOpen={(src, alt) => setLightbox({ src, alt })} />
          <p className="abba-caption">Clique em qualquer página para ampliar.</p>
        </div>
      </section>

      <section className="abba-shalom abba-section">
        <div className="abba-container abba-shalom-grid">
          <div className="abba-shalom-card" data-reveal>
            <span className="abba-hebrew" dir="rtl">שָׁלוֹם</span>
            <strong>SHALOM</strong>
            <div className="abba-mini-line" />
            <p>paz • bem-estar • integridade</p>
          </div>
          <div data-reveal>
            <div className="abba-section-label light">UMA PALAVRA DE CADA VEZ</div>
            <h2>A sensação que buscamos é simples: “eu já consigo reconhecer isso”.</h2>
            <p>
              Em vez de prometer “segredos escondidos”, o material ensina você a observar forma, som, contexto e estrutura. Assim, uma palavra deixa de ser apenas uma curiosidade dita por outra pessoa e passa a ser algo que você também consegue identificar.
            </p>
            <div className="abba-soft-note"><Eye size={19} /> O objetivo é enriquecer sua leitura — não invalidar boas traduções da Bíblia.</div>
          </div>
        </div>
      </section>

      <section className="abba-caligraphy abba-section" id="caligrafia">
        <div className="abba-container">
          <div className="abba-caligraphy-head" data-reveal>
            <div className="abba-caligraphy-copy">
              <div className="abba-bonus-pill">BÔNUS ESPECIAL • EDIÇÃO 2.0</div>
              <h2>O bônus que transforma reconhecimento em familiaridade: <span>Caderno de Escrita Hebraica</span></h2>
              <p>
                Aprender um novo alfabeto só olhando pode ser frustrante. Por isso, este bônus foi reconstruído para acompanhar sua mão e seus olhos: <strong>observe, trace, escreva e reconheça.</strong>
              </p>
              <div className="abba-cali-features">
                <span><Check size={16} /> 118 páginas de prática guiada</span>
                <span><Check size={16} /> 22 letras + 5 formas finais</span>
                <span><Check size={16} /> Niqqud, letras parecidas e palavras bíblicas</span>
                <span><Check size={16} /> Testes, progresso e certificado simbólico</span>
              </div>
              <div className="abba-heart-note"><Heart size={19} /> Feito para você praticar sem pressa, sem vergonha de errar e sem transformar o estudo em peso.</div>
            </div>
            <div className="abba-cali-number"><strong>118</strong><span>páginas para praticar</span></div>
          </div>
          <PreviewStrip items={caligraphyPreview} onOpen={(src, alt) => setLightbox({ src, alt })} compact />
          <p className="abba-caption light-caption">Páginas reais do bônus. Clique para ampliar.</p>
        </div>
      </section>

      <section className="abba-bonuses abba-section" id="bonus">
        <div className="abba-container">
          <div className="abba-section-heading centered" data-reveal>
            <div className="abba-section-label">UM KIT PENSADO PARA ACOMPANHAR VOCÊ</div>
            <h2>Cada bônus resolve um pequeno atrito do início.</h2>
            <p>Você não recebe uma pilha de arquivos soltos. Cada material tem uma função dentro da sua primeira jornada.</p>
          </div>
          <div className="abba-bonus-layout">
            <div className="abba-kit-wrap" data-reveal>
              <img src={kitCutout} alt="Kit completo Bíblia Além da Tradução e seus bônus" />
              <div className="abba-kit-glow" />
            </div>
            <div className="abba-bonus-list">
              {bonuses.map((bonus, index) => (
                <article className={`abba-bonus-row ${index === 0 ? "featured" : ""}`} key={bonus.title} data-reveal>
                  <div className="abba-bonus-icon"><bonus.icon size={21} /></div>
                  <div>
                    <span className="abba-bonus-tag">{bonus.tag}</span>
                    <h3>{bonus.title}</h3>
                    <p>{bonus.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="abba-fit abba-section">
        <div className="abba-container abba-fit-grid">
          <div className="abba-fit-card" data-reveal>
            <div className="abba-section-label">É PARA VOCÊ SE...</div>
            <h2>Você quer começar com clareza, não com pressão.</h2>
            <ul>
              {["Ama estudar a Bíblia e sente curiosidade pelo idioma original.", "Já ouviu explicações de palavras hebraicas e gostaria de acompanhar melhor.", "Nunca estudou hebraico e precisa de uma porta de entrada organizada.", "Quer reconhecer letras e palavras antes de pensar em um curso longo.", "Gosta de estudar no próprio ritmo, pelo celular, tablet ou computador."].map((item) => <li key={item}><Check size={17} />{item}</li>)}
            </ul>
          </div>
          <div className="abba-fit-card dark" data-reveal>
            <div className="abba-section-label light">O QUE NÃO PROMETEMOS</div>
            <h2>Sem atalhos mágicos. Sem “códigos secretos”.</h2>
            <ul>
              {["Você não vai sair fluente em hebraico.", "O material não substitui uma formação acadêmica completa.", "Não ensinamos que toda tradução está errada.", "Não usamos letras hebraicas como numerologia ou etimologia mística."].map((item) => <li key={item}><X size={17} />{item}</li>)}
            </ul>
            <p>O que entregamos é mais simples — e mais útil para o começo: uma base para reconhecer, observar e continuar aprendendo.</p>
          </div>
        </div>
      </section>

      <section className="abba-brand-section abba-section">
        <div className="abba-container abba-brand-grid">
          <div className="abba-brand-seal" data-reveal>
            <img src={abbaMark} alt="Símbolo ABBA PALAVRA" />
          </div>
          <div data-reveal>
            <div className="abba-section-label light">ABBA PALAVRA</div>
            <h2>Conhecimento bíblico profundo pode ser apresentado com reverência e simplicidade.</h2>
            <p>
              O ABBA PALAVRA nasceu para tornar o estudo das Escrituras mais acessível sem tratar você como acadêmico — e sem tratar a Bíblia como entretenimento sensacionalista.
            </p>
            <blockquote>“A Bíblia além da tradução.”</blockquote>
          </div>
        </div>
      </section>

      <section className="abba-offer abba-section" id="oferta">
        <div className="abba-container">
          <div className="abba-offer-card" data-reveal>
            <div className="abba-offer-copy">
              <div className="abba-section-label light">COMECE PELO PRIMEIRO PASSO</div>
              <h2>Seu primeiro contato com o Hebraico Bíblico pode começar hoje.</h2>
              <p>Material principal + 7 bônus para acompanhar sua jornada, com destaque para o novo Caderno de Escrita Hebraica 2.0.</p>
              <div className="abba-offer-stack">
                {["Bíblia Além da Tradução — edição ampliada", "Caderno de Escrita Hebraica 2.0 — 118 páginas", "Alfabeto Hebraico Visual", "Guia de Pronúncia", "50 Palavras Bíblicas Essenciais", "Desafio 30 Dias de Hebraico", "Flashcards de Hebraico Bíblico", "As Palavras de Jesus — introdução ao Aramaico"].map((item) => <span key={item}><Check size={16} />{item}</span>)}
              </div>
            </div>
            <div className="abba-offer-buy">
              <img src={bookMockup} alt="Bíblia Além da Tradução" />
              <span className="abba-one-time">PAGAMENTO ÚNICO</span>
              <div className="abba-price"><small>R$</small><strong>17</strong><sup>,90</sup></div>
              <CtaButton>Quero meu acesso agora</CtaButton>
              <div className="abba-secure"><ShieldCheck size={18} /><span>Compra protegida por 7 dias<br />Acesso digital após confirmação</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="abba-guarantee abba-section">
        <div className="abba-container narrow centered" data-reveal>
          <div className="abba-guarantee-icon"><ShieldCheck size={31} /></div>
          <div className="abba-section-label">GARANTIA DE 7 DIAS</div>
          <h2>Você pode conhecer o material antes de decidir ficar com ele.</h2>
          <p>Se dentro do prazo da garantia você entender que a proposta não é para você, poderá solicitar o reembolso conforme as condições da oferta.</p>
        </div>
      </section>

      <section className="abba-faq abba-section">
        <div className="abba-container narrow">
          <div className="abba-section-heading centered" data-reveal>
            <div className="abba-section-label">ANTES DE COMEÇAR</div>
            <h2>Perguntas frequentes</h2>
          </div>
          <div className="abba-faq-list">
            {[
              ["Preciso saber hebraico?", "Não. Todo o caminho foi pensado para quem está começando do zero."],
              ["É um curso completo de Hebraico Bíblico?", "Não. É uma introdução estruturada para você reconhecer letras, palavras, raízes e elementos iniciais do texto bíblico."],
              ["Vou aprender a falar hebraico moderno?", "Não. O foco é Hebraico Bíblico e leitura inicial, não conversação em hebraico moderno."],
              ["O Caderno de Escrita está incluso?", "Sim. A nova versão do Caderno de Escrita Hebraica 2.0, com 118 páginas, faz parte do pacote como bônus em destaque."],
              ["Consigo usar pelo celular?", "Sim. Os materiais são digitais. Para as páginas de escrita, você também pode imprimir as folhas que quiser praticar à mão."],
              ["O pagamento é mensal?", "Não. O valor de R$ 27,90 é um pagamento único para esta oferta."],
              ["Como recebo o acesso?", "Após a confirmação do pagamento, você recebe as instruções de acesso aos materiais digitais."],
              ["E se eu comprar e perceber que não era o que eu esperava?", "A oferta conta com garantia de 7 dias, conforme as condições informadas no checkout."],
            ].map(([q, a]) => (
              <details key={q} className="abba-faq-item" data-reveal>
                <summary>{q}<span>+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="abba-final abba-section">
        <div className="abba-final-letter" dir="rtl" aria-hidden="true">א</div>
        <div className="abba-container narrow centered" data-reveal>
          <span className="abba-hebrew-small" dir="rtl">בְּכָל־דְּרָכֶיךָ דָעֵהוּ</span>
          <h2>Você não precisa saber tudo. Só precisa começar.</h2>
          <p>Comece por uma letra. Depois uma palavra. Depois uma passagem que você já ama — vista com novos olhos.</p>
          <CtaButton>Quero começar por R$ 27,90</CtaButton>
        </div>
      </section>

      <footer className="abba-footer">
        <div className="abba-brand footer-brand">
          <img src={abbaMark} alt="" className="abba-brand-mark" />
          <div><strong>ABBA PALAVRA</strong><span>A Bíblia além da tradução.</span></div>
        </div>
        <p>Material educacional digital • Hebraico Bíblico introdutório</p>
      </footer>

      <div className="abba-mobile-cta">
        <div><span>Oferta atual</span><strong>R$ 27,90</strong></div>
        <CtaButton>Quero começar</CtaButton>
      </div>

      {lightbox && (
        <div className="abba-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <button type="button" className="abba-lightbox-close" onClick={() => setLightbox(null)} aria-label="Fechar"><X size={22} /></button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
