import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, ShieldCheck } from "lucide-react";
import laboratorio7 from "../assets/laboratorio-7.png";
import "../funil-pos-compra.css";

export const Route = createFileRoute("/downsell")({ component: DownsellPage });

function track(name: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, {
    currency: "BRL",
    value: 19.9,
    item_name: "Laboratório Essencial — 7 Passagens",
  });
  window.fbq?.("trackCustom", name, {
    currency: "BRL",
    value: 19.9,
    content_name: "Laboratório Essencial — 7 Passagens",
  });
}

function DownsellPage() {
  useEffect(() => {
    track("view_downsell");

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
    const onAccept = () => track("downsell_accept_click");
    const onReject = () => track("downsell_decline_click");

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
      <section className="pc-hero compact">
        <div className="pc-wrap pc-grid">
          <div className="pc-copy">
            <div className="pc-kicker">UMA OPÇÃO MENOR PARA COMEÇAR</div>
            <h1>Quer praticar, mas <em>prefere começar com menos?</em></h1>
            <p className="pc-lead">Em vez das 21 passagens, leve a edição <strong>Laboratório Essencial</strong> com 7 estudos guiados completos. É uma versão menor do programa — não o mesmo produto com desconto.</p>
            <div className="pc-price-line"><span>Edição Essencial</span><strong>R$ 19,90</strong><small>pagamento único</small></div>
          </div>
          <div className="pc-cover"><img src={laboratorio7} alt="Laboratório Essencial — 7 Passagens" /></div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-wrap pc-narrow">
          <div className="pc-label">O QUE VOCÊ RECEBE</div>
          <h2>Os 7 primeiros estudos para transformar teoria em prática acompanhada.</h2>
          <div className="pc-cards">
            {[
              ["7 estudos completos", "Uma seleção inicial para começar sem assumir o Laboratório de 21 passagens."],
              ["Mesma metodologia", "Forma → gramática → contexto → tradução → conclusão segura."],
              ["Próximo passo real", "Vai além do reconhecimento inicial sem refazer as aulas do produto principal."],
              ["Sem perda da compra anterior", "O Bíblia Além da Tradução e seus bônus continuam exatamente como foram adquiridos."],
            ].map(([t,d]) => <article key={t}><Check size={18}/><div><strong>{t}</strong><p>{d}</p></div></article>)}
          </div>

          <div className="pc-offer-box">
            <span className="pc-badge">LABORATÓRIO ESSENCIAL</span>
            <h2>Comece com 7 Passagens</h2>
            <p className="pc-center-copy">Se 21 estudos não fazem sentido para você agora, comece menor e ainda assim leve a aplicação guiada para o seu estudo bíblico.</p>
            <div className="pc-bigprice"><small>R$</small><strong>19</strong><sup>,90</sup></div>
            <div
              className="pc-cakto-buttons"
              dangerouslySetInnerHTML={{
                __html: `
                  <cakto-upsell-buttons>
                    <cakto-upsell-accept
                      bg-color="#0f7865"
                      text-color="#ffffff"
                      upsell-accept-url="members_area"
                      offer-id="382t7cp"
                      app-base-url="https://app.cakto.com.br"
                      offer-type="downsell"
                      upsell-reject-url="members_area"
                    >
                      Sim, quero começar pelos 7 estudos
                    </cakto-upsell-accept>
                    <cakto-upsell-reject
                      upsell-reject-url="members_area"
                    >
                      Não, quero seguir com minha compra atual
                    </cakto-upsell-reject>
                  </cakto-upsell-buttons>
                `,
              }}
            />
            <div className="pc-safe"><ShieldCheck size={18}/> Oferta opcional • pagamento único • cobrança em 1 clique pela Cakto</div>
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
