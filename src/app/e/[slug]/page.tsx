"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Declaration, templateLabels } from "../../lib/declaration";

const templateStyles: Record<Declaration["template"], string> = {
  romantic: "bg-[#fff0f3] text-[#8f2942]",
  special: "bg-[#fff7df] text-[#825d11]",
  story: "bg-[#edf7f2] text-[#22634c]",
};

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
    try {
      if (navigator.share) {
        await navigator.share({
          title: declaration?.title || "Uma declaração especial",
          text: "Recebi uma declaração especial para você.",
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Link copiado!");
    } catch {
      setShareStatus("Não foi possível compartilhar agora.");
    }
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fff9f5] px-6 text-[#29232a]">
        <p>Carregando sua declaração...</p>
      </main>
    );
  }

  if (!declaration) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fff9f5] px-6 text-center text-[#29232a]">
        <div>
          <p className="font-medium text-[#e85d75]">Link indisponível</p>
          <h1 className="mt-3 text-3xl font-bold">
            Esta declaração não foi encontrada.
          </h1>
          <Link
            href="/criar"
            className="mt-6 inline-block rounded-full bg-[#e85d75] px-6 py-3 font-medium text-white"
          >
            Criar uma declaração
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-8 text-[#29232a]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col items-center justify-center">
        <Link href="/" className="mb-8 font-bold text-[#8f2942]">
          declara-o
        </Link>

        <section
          className={`w-full rounded-4xl p-6 shadow-xl sm:p-12 ${templateStyles[declaration.template]}`}
        >
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-16">
            <span className="text-6xl text-[#e85d75]">♡</span>
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
            <p className="mt-6 text-sm text-gray-500">
              {templateLabels[declaration.template]} para {declaration.name}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#8f2942] sm:text-5xl">
              {declaration.title}
            </h1>
            <p className="mt-8 whitespace-pre-wrap text-lg leading-8 text-gray-600">
              {declaration.message}
            </p>
            <div className="mx-auto mt-10 h-2 max-w-xs rounded-full bg-[#f4b6c2]" />
          </div>
        </section>

        <button
          type="button"
          onClick={handleShare}
          className="mt-8 rounded-full bg-[#8f2942] px-6 py-3 font-medium text-white transition hover:bg-[#6f1f34]"
        >
          Compartilhar declaração
        </button>
        {shareStatus && <p className="mt-3 text-sm text-[#8f2942]">{shareStatus}</p>}

        <Link
          href="/criar"
          className="mt-4 text-sm font-medium text-[#8f2942] underline"
        >
          Criar sua própria declaração
        </Link>
      </div>
    </main>
  );
}
