import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import "../funil-pos-compra.css";

export const Route = createFileRoute("/obrigado")({ component: ObrigadoPage });

function ObrigadoPage() {
  return (
    <main className="pc-page">
      <header className="pc-topbar"><strong>ABBA PALAVRA</strong><span>A Bíblia além da tradução.</span></header>
      <section className="pc-thanks">
        <div className="pc-wrap pc-narrow">
          <div className="pc-thanks-icon"><CheckCircle2 size={42} /></div>
          <div className="pc-kicker">PEDIDO CONCLUÍDO</div>
          <h1>Obrigado por estudar com a ABBA PALAVRA.</h1>
          <p className="pc-lead">Seu fluxo de compra foi concluído. O acesso aos materiais e as confirmações da compra serão enviados pelos canais informados no checkout da Cakto.</p>
          <div className="pc-thanks-grid">
            <article><Mail size={22}/><div><strong>Confira seu e-mail</strong><p>Procure pela confirmação da Cakto e pelas instruções de acesso aos produtos adquiridos.</p></div></article>
            <article><ShieldCheck size={22}/><div><strong>Sua compra anterior permanece intacta</strong><p>As ofertas adicionais eram opcionais e não alteram o que você já comprou.</p></div></article>
          </div>
          <p className="pc-thanks-note">Caso a mensagem não apareça imediatamente, confira também as pastas Promoções, Atualizações e Spam.</p>
        </div>
      </section>
    </main>
  );
}
