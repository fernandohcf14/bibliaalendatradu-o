# ABBA PALAVRA — nova página de vendas

Pacote preparado para substituir a rota atual do projeto Lovable/TanStack.

## Arquivos

- `src/routes/index.tsx` — nova landing page completa
- `src/routes/__root.tsx` — root com os pixels preservados e Google Tag corrigido
- `src/sales-page.css` — estilos da nova página
- `src/assets/` — imagens originais + páginas reais extraídas dos PDFs

## Tracking preservado

- Meta Pixel: `938653842041574`
- Google Analytics / Google tag: `G-PF4XX5VB91`
- Meta CAPI: continua usando `sendMetaEvent` já existente no projeto
- Eventos adicionados/organizados na LP: `PageView`, `ViewContent` e `InitiateCheckout`
- O clique de checkout mantém UTM e `fbclid` da URL atual quando existirem.

## Checkout

`https://pay.cakto.com.br/3zswdss_1094286`

Preço exibido: `R$ 27,90`.

## Instalação

1. Substitua `src/routes/index.tsx` pelo arquivo deste pacote.
2. Substitua `src/routes/__root.tsx` pelo arquivo deste pacote.
3. Copie `src/sales-page.css` para `src/sales-page.css`.
4. Copie todo o conteúdo de `src/assets/` para a pasta de assets do projeto.
5. Não remova `src/lib/meta-capi.functions`, pois a LP usa essa função para CAPI.
6. Faça o deploy e valide o Pixel Helper / Events Manager e o DebugView do GA.

## Observação importante

Na documentação anterior o script do Google Tag apontava para `https://googletagmanager.com`, que não é o carregamento padrão do `gtag.js`. Nesta versão foi corrigido para `https://www.googletagmanager.com/gtag/js?id=G-PF4XX5VB91` sem alterar o ID de medição.
