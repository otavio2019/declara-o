"use client";
import Link from "next/link";

import { FormEvent, useState } from "react";

export default function CriarDeclaracao() {
  const [recipientName, setRecipientName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("romantico");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Declaração criada com sucesso!");
  }

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
          </section>

          <section className="lg:pt-16">
            <div className="sticky top-8 rounded-[2rem] bg-[#fdecef] p-6 shadow-xl">
              <p className="mb-4 text-center text-sm font-semibold text-[#8f2942]">
                Pré-visualização
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
