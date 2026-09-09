"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  DeclarationTemplate,
  templateLabels,
} from "../lib/declaration";

const templates: DeclarationTemplate[] = ["romantic", "special", "story"];

const templateStyles: Record<DeclarationTemplate, string> = {
  romantic: "bg-[#fff0f3] text-[#8f2942]",
  special: "bg-[#fff7df] text-[#825d11]",
  story: "bg-[#edf7f2] text-[#22634c]",
};

export default function CreateDeclarationPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState<DeclarationTemplate>("romantic");
  const [photo, setPhoto] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/declarations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, message, template, photo: photo || null }),
      });
      const data = (await response.json()) as { slug?: string; error?: string };

      if (!response.ok || !data.slug) {
        throw new Error(data.error || "Não foi possível gerar a declaração.");
      }

      setPublicUrl(`/e/${data.slug}`);
      setCopyStatus("");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Não foi possível gerar a declaração.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleShareLink() {
    const url = `${window.location.origin}${publicUrl}`;

    try {
      // Usa o menu nativo no celular e copia o endereço em navegadores sem suporte.
      if (navigator.share) {
        await navigator.share({
          title: title || "Uma declaração especial",
          text: "Recebi uma declaração especial para você.",
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopyStatus("Link copiado!");
    } catch {
      setCopyStatus("Não foi possível compartilhar agora.");
    }
  }

  function handleReset() {
    setName("");
    setTitle("");
    setMessage("");
    setTemplate("romantic");
    setPhoto("");
    setPublicUrl("");
    setCopyStatus("");
  }

  const previewTitle = title || "Seu título especial";
  const previewMessage =
    message || "Sua mensagem aparecerá aqui enquanto você escreve.";
  const previewName = name || "Alguém especial";

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-8 text-[#29232a]">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-bold text-[#8f2942]">
          declara-o
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <section>
            <p className="font-medium text-[#e85d75]">Sua declaração</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Crie uma mensagem para guardar para sempre.
            </h1>
            <p className="mt-4 leading-7 text-gray-600">
              Preencha os dados e acompanhe a prévia da sua declaração em tempo
              real.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Nome da pessoa homenageada
                </span>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-[#e8cfd2] bg-white px-4 py-3 outline-none focus:border-[#e85d75]"
                  placeholder="Ex.: Mariana"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Adicionar uma foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      setPhoto("");
                      return;
                    }

                    if (file.size > 2 * 1024 * 1024) {
                      setFormError("Escolha uma foto de até 2 MB.");
                      event.target.value = "";
                      return;
                    }

                    // A imagem fica em formato Data URL para a prévia e o envio ao servidor.
                    const reader = new FileReader();
                    reader.onload = () => setPhoto(String(reader.result));
                    reader.readAsDataURL(file);
                  }}
                  className="w-full rounded-xl border border-[#e8cfd2] bg-white px-4 py-3 text-sm"
                />
                <span className="mt-2 block text-xs text-gray-500">
                  Opcional. Formatos de imagem até 2 MB.
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Título</span>
                <input
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-xl border border-[#e8cfd2] bg-white px-4 py-3 outline-none focus:border-[#e85d75]"
                  placeholder="Ex.: Você torna tudo mais bonito"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Mensagem</span>
                <textarea
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-36 w-full resize-y rounded-xl border border-[#e8cfd2] bg-white px-4 py-3 outline-none focus:border-[#e85d75]"
                  placeholder="Escreva algo que venha do coração..."
                />
              </label>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Modelo</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {templates.map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-xl border p-3 text-sm transition ${
                        template === option
                          ? "border-[#e85d75] ring-2 ring-[#fdecef]"
                          : "border-[#e8cfd2] bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="template"
                        value={option}
                        checked={template === option}
                        onChange={() => setTemplate(option)}
                        className="sr-only"
                      />
                      {templateLabels[option]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#e85d75] px-6 py-3 font-medium text-white transition hover:bg-[#c84860] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Salvando..." : "Gerar minha declaração"}
              </button>
            </form>

            {formError && (
              <p className="mt-4 rounded-xl bg-[#fff0f3] p-4 text-sm text-[#8f2942]">
                {formError}
              </p>
            )}

            {publicUrl && (
              <div className="mt-5 rounded-xl bg-[#edf7f2] p-4 text-sm text-[#22634c]">
                <p className="font-semibold">Sua declaração está pronta.</p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <Link href={publicUrl} className="underline">
                    Abrir página pública
                  </Link>
                  <button type="button" onClick={handleShareLink} className="font-semibold underline">
                    Compartilhar
                  </button>
                </div>
                {copyStatus && <p className="mt-2">{copyStatus}</p>}
                <button type="button" onClick={handleReset} className="mt-4 text-[#22634c] underline">
                  Criar outra declaração
                </button>
              </div>
            )}
          </section>

          <section className={`self-start rounded-4xl p-6 shadow-xl sm:p-10 ${templateStyles[template]}`}>
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
              <span className="text-5xl text-[#e85d75]">♡</span>
              {photo && (
                <Image
                  src={photo}
                  alt="Pré-visualização da foto"
                  width={160}
                  height={160}
                  unoptimized
                  className="mx-auto mt-5 h-40 w-40 rounded-2xl object-cover"
                />
              )}
              <p className="mt-6 text-sm text-gray-500">Para {previewName}</p>
              <h2 className="mt-3 text-3xl font-bold">{previewTitle}</h2>
              <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-600">
                {previewMessage}
              </p>
              <div className="mt-8 h-2 rounded-full bg-[#f4b6c2]" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
