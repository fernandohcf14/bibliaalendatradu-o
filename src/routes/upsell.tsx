import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Check, ShieldCheck } from "lucide-react";
import laboratorio21 from "../assets/laboratorio-21.png";
import "../funil-pos-compra.css";

export const Route = createFileRoute("/upsell")({ component: UpsellPage });

function track(name: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, { currency: "BRL", value: 39.9, item_name: "Laboratório de Leitura — 21 Passagens" });
  window.fbq?.("trackCustom", name, { currency: "BRL", value: 39.9, content_name: "Laboratório de Leitura — 21 Passagens" });
}

function UpsellPage() {
  useEffect(() => {
    track("view_upsell");

    const scriptId = "cakto-upsell-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const accept = document.querySelector("cakto-upsell-accept");
    const reject = document.querySelector("cakto-upsell-reject");
    const onAccept = () => track("upsell_accept_click");
    const onReject = () => track("upsell_decline_click");

    accept?.addEventListener("click", onAccept);
    reject?.addEventListener("click", onReject);

    return () => {
      accept?.removeEventListener("click", onAccept);
      reject?.removeEventListener("click", onReject);
    };
  }, []);

  return (
    <main className="pc-page">
      <header className="pc-topbar"><strong>ABBA PALAVRA</strong><span>A Bíblia além da tradução.</span></header>

      <section className="pc-hero">
        <div className="pc-wrap pc-grid">
          <div className="pc-copy">
            <div className="pc-kicker">SUA COMPRA ANTERIOR JÁ ESTÁ CONFIRMADA</div>
            <h1>Você aprendeu a reconhecer. <em>Agora veja isso funcionando em 21 textos bíblicos.</em></h1>
            <p className="pc-lead">O <strong>Laboratório de Leitura</strong> é a próxima etapa: aplicação acompanhada em novas passagens, sem repetir o conteúdo introdutório que você acabou de comprar.</p>
            <div className="pc-price-line"><span>Oferta pós-compra</span><strong>R$ 39,90</strong><small>pagamento único</small></div>
          </div>
          <div className="pc-cover"><img src={laboratorio21} alt="Laboratório de Leitura — 21 Passagens" /></div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-wrap pc-narrow">
          <div className="pc-label">A PRÓXIMA TRANSFORMAÇÃO</div>
          <h2>Do “eu entendi a teoria” para “eu consigo acompanhar a análise”.</h2>
          <p>O produto principal ensina os fundamentos. Aqui, você observa o método funcionando repetidamente em textos diferentes até a sequência de análise começar a ficar natural.</p>
          <div className="pc-cards">
            {[
              ["21 novas passagens", "Textos diferentes das quatro leituras guiadas do Bíblia Além da Tradução."],
              ["Método repetível", "Forma → gramática → contexto → tradução → conclusão segura."],
              ["Sem atalhos místicos", "A profundidade vem de observar melhor o texto, não de inventar significados secretos."],
              ["Aplicação acompanhada", "Você não recebe apenas respostas: acompanha o raciocínio que leva até elas."],
            ].map(([t,d]) => <article key={t}><Check size={18}/><div><strong>{t}</strong><p>{d}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="pc-section pc-dark">
        <div className="pc-wrap pc-narrow">
          <div className="pc-label light">COMO CADA ESTUDO FUNCIONA</div>
          <h2>Uma estrutura consistente para você aprender a pensar diante do texto.</h2>
          <div className="pc-steps">
            {[
              ["01","Observe primeiro","Leia a passagem e identifique o que já consegue reconhecer."],
              ["02","Desmonte a forma","Veja partículas, sufixos, classe gramatical e elementos relevantes."],
              ["03","Consulte com critério","Campo semântico e ferramentas entram como apoio — nunca como máquina de significados."],
              ["04","Volte ao contexto","Compare traduções e deixe a frase limitar as possibilidades."],
              ["05","Conclua com segurança","Separe o que o texto sustenta do que seria exagero afirmar."],
            ].map(([n,t,d]) => <div className="pc-step" key={n}><span>{n}</span><div><strong>{t}</strong><p>{d}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-wrap pc-narrow">
          <div className="pc-clarity"><BookOpen size={24}/><div><strong>Importante</strong><p>Você não precisa deste Laboratório para receber ou aproveitar o que já comprou. Esta é uma oferta opcional para quem quer avançar agora para mais prática guiada.</p></div></div>
          <div className="pc-offer-box">
            <span className="pc-badge">ACESSO AO LABORATÓRIO COMPLETO</span>
            <h2>21 Passagens Guiadas</h2>
            <ul>
              <li><Check size={17}/> 21 estudos completos e progressivos</li>
              <li><Check size={17}/> aplicação em diferentes gêneros e livros bíblicos</li>
              <li><Check size={17}/> estrutura de análise que você pode reutilizar</li>
              <li><Check size={17}/> material digital para estudar no seu ritmo</li>
            </ul>
            <div className="pc-bigprice"><small>R$</small><strong>39</strong><sup>,90</sup></div>
            <div
              className="pc-cakto-buttons"
              dangerouslySetInnerHTML={{
                __html: `
                  <cakto-upsell-buttons>
                    <cakto-upsell-accept
                      bg-color="#0f7865"
                      text-color="#ffffff"
                      upsell-accept-url="members_area"
                      offer-id="uny6wfr"
                      app-base-url="https://app.cakto.com.br"
                      offer-type="upsell"
                      upsell-reject-url="https://bibliaalemdatraducao.abbapalavra.online/downsell"
                    >
                      Sim, quero os 21 estudos por R$ 39,90
                    </cakto-upsell-accept>
                    <cakto-upsell-reject
                      upsell-reject-url="https://bibliaalemdatraducao.abbapalavra.online/downsell"
                    >
                      Não, prefiro uma opção menor
                    </cakto-upsell-reject>
                  </cakto-upsell-buttons>
                `,
              }}
            />
            <div className="pc-safe"><ShieldCheck size={18}/> Compra adicional opcional • pagamento único • cobrança em 1 clique pela Cakto</div>
          </div>
        </div>
      </section>
    </main>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
