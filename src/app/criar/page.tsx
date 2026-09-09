"use client";
import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
=======

>>>>>>> c8eba36e017b18c96a6ae12fe10569ef2a9bd553
import { FormEvent, useState } from "react";

export default function CriarDeclaracao() {
  const [recipientName, setRecipientName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
<<<<<<< HEAD
  const [template, setTemplate] = useState<DeclarationTemplate>("romantic");
  const [photo, setPhoto] = useState("");
  const [publicUrl, setPublicUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
=======
  const [template, setTemplate] = useState("romantico");
>>>>>>> c8eba36e017b18c96a6ae12fe10569ef2a9bd553

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

<<<<<<< HEAD
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

=======
    alert("Declaração criada com sucesso!");
  }

>>>>>>> c8eba36e017b18c96a6ae12fe10569ef2a9bd553
  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-10 text-[#29232a]">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-[#8f2942] transition hover:text-[#e85d75]"
          >
            declara-o
          </a>

          <a
            href="/"
            className="text-sm font-medium text-gray-600 transition hover:text-[#e85d75]"
          >
            Voltar para início
          </a>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <p className="font-medium text-[#e85d75]">Nova declaração</p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Crie algo especial
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              Preencha os dados abaixo para começar a criar uma experiência
              personalizada para alguém importante.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 rounded-3xl bg-white p-6 shadow-sm"
            >
              <div>
                <label
                  htmlFor="recipientName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Para quem é a declaração?
                </label>

<<<<<<< HEAD
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
=======
>>>>>>> c8eba36e017b18c96a6ae12fe10569ef2a9bd553
                <input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  placeholder="Ex.: Ana"
                  required
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#e85d75] focus:ring-2 focus:ring-[#fdecef]"
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Título da declaração
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Ex.: Você torna tudo mais bonito"
                  required
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#e85d75] focus:ring-2 focus:ring-[#fdecef]"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Sua mensagem
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Escreva uma mensagem especial..."
                  required
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#e85d75] focus:ring-2 focus:ring-[#fdecef]"
                />
              </div>

              <div>
                <label
                  htmlFor="template"
                  className="mb-2 block text-sm font-semibold"
                >
                  Escolha um modelo
                </label>

                <select
                  id="template"
                  value={template}
                  onChange={(event) => setTemplate(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#e85d75] focus:ring-2 focus:ring-[#fdecef]"
                >
                  <option value="romantico">Carta romântica</option>
                  <option value="homenagem">Homenagem especial</option>
                  <option value="memorias">Nossa história</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#e85d75] px-6 py-3 font-semibold text-white transition hover:bg-[#c84860]"
              >
                Continuar declaração
              </button>
            </form>
<<<<<<< HEAD

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
=======
          </section>

          <section className="lg:pt-16">
            <div className="sticky top-8 rounded-[2rem] bg-[#fdecef] p-6 shadow-xl">
              <p className="mb-4 text-center text-sm font-semibold text-[#8f2942]">
                Pré-visualização
>>>>>>> c8eba36e017b18c96a6ae12fe10569ef2a9bd553
              </p>

              <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <span className="text-5xl text-[#e85d75]">♡</span>

                <p className="mt-6 text-sm text-gray-500">
                  Para {recipientName || "alguém especial"}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-[#8f2942]">
                  {title || "Sua declaração aparecerá aqui"}
                </h2>

                <p className="mt-5 whitespace-pre-line leading-7 text-gray-600">
                  {message ||
                    "Digite sua mensagem ao lado para visualizar como ela ficará."}
                </p>

                <div className="mt-8 h-2 rounded-full bg-[#f4b6c2]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
