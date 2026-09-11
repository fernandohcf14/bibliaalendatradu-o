import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export type Testimonial = {
  /** Nome real do cliente */
  name: string;
  /** Contexto opcional: "Aluno do Bíblia Além da Tradução", idade, cidade */
  context?: string;
  /** Texto do depoimento real */
  text: string;
  /** Avaliação de 1 a 5 — somente quando houver avaliação real. null = não exibir estrelas */
  rating?: number | null;
  /** URL da foto/avatar real — null = exibe as iniciais do nome */
  image?: string | null;
};

/**
 * ------------------------------------------------------------------
 * DEPOIMENTOS REAIS
 * ------------------------------------------------------------------
 * Para adicionar novos depoimentos, inclua objetos neste array.
 * O carrossel se adapta automaticamente.
 *
 * {
 *   name: "Maria Souza",
 *   context: "Aluna do Bíblia Além da Tradução — Salvador, BA",
 *   text: "Depoimento real do cliente.",
 *   rating: 5,
 *   image: "https://...",
 * }
 * ------------------------------------------------------------------
 */
export const testimonials: Testimonial[] = [
  {
    name: "Marcos",
    context: "42 anos — Estudo bíblico",
    text: "Eu sempre tive curiosidade sobre o hebraico, mas achava que seria complicado demais. O material me ajudou a entender os primeiros conceitos de uma forma muito mais simples do que eu imaginava.",
  },
  {
    name: "Ana",
    context: "35 anos — Leitora da Bíblia",
    text: "Uma das coisas que mais gostei foi começar a perceber que existe toda uma história por trás de determinadas palavras que eu já conhecia em português. Isso deixou meus estudos bíblicos ainda mais interessantes.",
  },
  {
    name: "Rafael",
    context: "38 anos — Líder de pequeno grupo",
    text: "Eu não estava procurando um curso acadêmico de hebraico. Queria justamente uma introdução para entender melhor as Escrituras. O material cumpre muito bem essa proposta.",
  },
  {
    name: "Juliana",
    context: "31 anos — Estudante",
    text: "Eu tinha vontade de aprender hebraico há bastante tempo, mas sempre adiava porque parecia algo muito difícil. Gostei da proposta de começar pelas letras e pelas palavras mais importantes.",
  },
  {
    name: "Daniel",
    context: "46 anos — Professor de Escola Bíblica",
    text: "Conhecer um pouco mais sobre as palavras no idioma original trouxe uma nova perspectiva para algumas passagens que eu já havia lido muitas vezes. Foi uma experiência muito interessante.",
  },
  {
    name: "Patrícia",
    context: "40 anos — Estudiosa da Bíblia",
    text: "Para quem sempre teve curiosidade sobre os idiomas bíblicos, mas não sabia por onde começar, achei a proposta muito interessante. É uma introdução acessível e que desperta vontade de continuar estudando.",
  },
];

/** Quantidade de cards exibidos enquanto não houver depoimentos reais */
const PLACEHOLDER_COUNT = 3;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="mx-auto flex h-full w-full max-w-3xl flex-col rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
      <Quote className="size-7 text-accent/60" aria-hidden="true" />
      <blockquote className="font-display mt-5 flex-1 text-xl leading-relaxed sm:text-2xl">
        “{item.text}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="size-12 shrink-0 rounded-full object-cover"
            width={48}
            height={48}
          />
        ) : (
          <span className="font-display flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {initials(item.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block font-semibold leading-tight">{item.name}</span>
          {item.context ? (
            <span className="mt-1 block text-sm leading-snug text-muted-foreground">
              {item.context}
            </span>
          ) : null}
        </span>
      </figcaption>
    </figure>
  );
}

function PlaceholderCard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col rounded-2xl border border-dashed border-accent/35 bg-card/60 p-8 sm:p-10">
      <span className="eyebrow text-accent/80">Em breve</span>
      <p className="font-display mt-5 flex-1 text-xl leading-relaxed text-muted-foreground sm:text-2xl">
        Depoimentos de alunos em breve.
      </p>
      <div className="mt-6 space-y-2.5" aria-hidden="true">
        <span className="block h-2.5 w-full rounded-full bg-border/70" />
        <span className="block h-2.5 w-11/12 rounded-full bg-border/60" />
        <span className="block h-2.5 w-2/3 rounded-full bg-border/50" />
      </div>
      <div className="mt-8 flex items-center gap-4 border-t border-dashed border-border pt-6">
        <span
          className="size-12 shrink-0 rounded-full border border-dashed border-accent/40 bg-secondary"
          aria-hidden="true"
        />
        <span className="min-w-0 space-y-2" aria-hidden="true">
          <span className="block h-2.5 w-28 rounded-full bg-border/70" />
          <span className="block h-2.5 w-36 rounded-full bg-border/50" />
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;
  const total = hasTestimonials ? testimonials.length : PLACEHOLDER_COUNT;
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  };

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-titulo"
      className="bg-secondary py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow text-center text-accent">Depoimentos</p>
        <h2
          id="depoimentos-titulo"
          className="font-display mx-auto mt-4 max-w-3xl text-center text-4xl font-semibold leading-tight sm:text-5xl"
        >
          Quem começa a estudar a Bíblia por uma nova perspectiva
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-muted-foreground">
          {hasTestimonials
            ? "Veja as experiências reais dos primeiros alunos do ABBA PALAVRA."
            : "Esta seção será atualizada com experiências reais dos nossos primeiros alunos."}
        </p>

        <div className="mt-14">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {hasTestimonials
                  ? testimonials.map((item, i) => (
                      <div
                        key={`${item.name}-${i}`}
                        className="w-full shrink-0 px-0 sm:px-12"
                        aria-hidden={i !== activeIndex}
                      >
                        <TestimonialCard item={item} />
                      </div>
                    ))
                  : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full shrink-0 px-0 sm:px-12"
                        aria-hidden={i !== activeIndex}
                      >
                        <PlaceholderCard />
                      </div>
                    ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Depoimento anterior"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2" aria-hidden="true">
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-accent"
                        : "w-2 bg-border hover:bg-accent/40"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Próximo depoimento"
                className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {!hasTestimonials && (
          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            Esta seção será atualizada com experiências reais dos nossos primeiros
            alunos.
          </p>
        )}
      </div>
    </section>
  );
}
