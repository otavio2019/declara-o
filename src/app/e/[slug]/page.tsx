"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EffectLayer } from "../../components/effect-layer";
import {
  colorValues,
  Declaration,
  effectLabels,
  typeLabels,
} from "../../lib/declaration";

export default function PublicDeclarationPage() {
  const { slug } = useParams<{ slug: string }>();
  const [declaration, setDeclaration] = useState<Declaration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    const loadDeclaration = window.setTimeout(() => {
      fetch(`/api/declarations/${encodeURIComponent(slug)}`)
        .then(async (response) => {
          if (!response.ok) {
            return null;
          }

          return (await response.json()) as Declaration;
        })
        .then(setDeclaration)
        .catch(() => setDeclaration(null))
        .finally(() => setIsLoading(false));
    }, 0);

    return () => window.clearTimeout(loadDeclaration);
  }, [slug]);

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: declaration?.title || "Uma declaração especial",
          text: "Recebi uma declaração especial para você.",
          url,
        });
        setShareStatus("Declaração compartilhada!");
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareStatus("Link copiado! Agora é só colar onde quiser.");
    } catch {
      setShareStatus("Não foi possível compartilhar agora.");
    }
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080b13] px-6 text-[#f5f7fb]">
        <p>Carregando sua declaração...</p>
      </main>
    );
  }

  if (!declaration) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080b13] px-6 text-center text-[#f5f7fb]">
        <div>
          <p className="font-medium text-[#6ee7ff]">Link indisponível</p>
          <h1 className="mt-3 text-3xl font-bold">
            Esta declaração não foi encontrada.
          </h1>
          <Link
            href="/criar"
            className="mt-6 inline-block rounded-full bg-[#6ee7ff] px-6 py-3 font-medium text-white"
          >
            Criar uma declaração
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b13] px-6 py-8 text-[#f5f7fb]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center">
        <Link href="/" className="mb-8 font-bold text-[#6ee7ff]">
          declara-o
        </Link>

        <section
          className="w-full rounded-4xl p-6 shadow-xl sm:p-12"
          style={{ backgroundColor: colorValues[declaration.color] }}
        >
          <div className={`relative overflow-hidden rounded-3xl bg-[#0f172a] p-8 text-center shadow-sm sm:p-16 ${declaration.effect === "glow" ? "effect-glow" : ""}`}>
            <EffectLayer effect={declaration.effect} />
            <span className="text-6xl text-[#6ee7ff]">
              {declaration.effect === "hearts"
                ? "♡ ♡"
                : declaration.effect === "confetti"
                  ? "✦ ♡ ✦"
                  : "♡"}
            </span>
            {declaration.photo && (
              <Image
                src={declaration.photo}
                alt={`Foto de ${declaration.name}`}
                width={640}
                height={320}
                unoptimized
                className="mx-auto mt-6 max-h-80 w-full rounded-2xl object-cover"
              />
            )}
            <p className="mt-6 text-sm text-slate-400">
              {typeLabels[declaration.type]} para {declaration.name}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#6ee7ff] sm:text-5xl">
              {declaration.title}
            </h1>
            <p className="mt-8 whitespace-pre-wrap text-lg leading-8 text-slate-300">
              {declaration.message}
            </p>
            <div className="mx-auto mt-10 h-2 max-w-xs rounded-full bg-[#8b5cf6]" />
            <p className="mt-5 text-xs text-slate-500">
              Efeito: {effectLabels[declaration.effect]}
            </p>
          </div>
        </section>

        <button
          type="button"
          onClick={handleShare}
          className="mt-8 rounded-full bg-[#6ee7ff] px-6 py-3 font-medium text-white transition hover:bg-[#6f1f34]"
        >
          Compartilhar
        </button>
        {shareStatus && <p className="mt-3 text-sm text-[#6ee7ff]">{shareStatus}</p>}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Veja minha declaração: ${window.location.href}`)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-sm font-medium text-[#6ee7ff] underline"
        >
          Compartilhar no WhatsApp
        </a>

        <Link
          href="/criar"
          className="mt-4 text-sm font-medium text-[#6ee7ff] underline"
        >
          Criar sua própria declaração
        </Link>
      </div>
    </main>
  );
}
