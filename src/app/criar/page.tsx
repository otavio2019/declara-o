"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  colorLabels,
  colorValues,
  DeclarationColor,
  DeclarationEffect,
  DeclarationType,
  effectLabels,
  typeLabels,
} from "../lib/declaration";

const types: DeclarationType[] = ["love", "birthday", "friendship", "tribute", "special", "custom"];
const colors: DeclarationColor[] = ["pink", "red", "lilac", "blue", "green", "gold", "mono"];
const effects: DeclarationEffect[] = ["none", "hearts", "particles", "glow", "confetti"];

export default function CreateDeclarationPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<DeclarationType>("love");
  const [photo, setPhoto] = useState("");
  const [color, setColor] = useState<DeclarationColor>("pink");
  const [effect, setEffect] = useState<DeclarationEffect>("none");
  const [publicUrl, setPublicUrl] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Escolha uma foto de até 2 MB.");
      event.target.value = "";
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhoto("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/declarations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, message, type, photo: photo || null, color, effect }),
      });
      const responseText = await response.text();
      let data: { slug?: string; error?: string } = {};
      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText) as { slug?: string; error?: string };
        } catch {
          throw new Error(`O servidor retornou uma resposta inválida (${response.status}).`);
        }
      }
      if (!response.ok || !data.slug) throw new Error(data.error || "Não foi possível gerar a declaração.");
      setPublicUrl(`/e/${data.slug}`);
      setStatus("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Não foi possível gerar a declaração.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}${publicUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: title || "Uma declaração especial", text: "Recebi uma declaração especial para você.", url });
        setStatus("Declaração compartilhada!");
        return;
      }
    } catch {
      // O fallback abaixo atende navegadores que cancelam ou não suportam o menu nativo.
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copiado! Agora é só colar onde quiser.");
    } catch {
      setStatus("Não foi possível compartilhar o link.");
    }
  }

  return (
    <main className="min-h-screen bg-[#fff9f5] px-6 py-8 text-[#29232a]">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-bold text-[#8f2942]">declara-o</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <section>
            <p className="font-medium text-[#e85d75]">Crie sua declaração</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Uma mensagem feita para alguém especial.</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl bg-white p-6 shadow-sm">
              <label className="block"><span className="mb-2 block text-sm font-semibold">Nome da pessoa</span><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Mariana" className="w-full rounded-xl border border-[#e8cfd2] px-4 py-3 outline-none focus:border-[#e85d75]" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Título</span><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Você é especial" className="w-full rounded-xl border border-[#e8cfd2] px-4 py-3 outline-none focus:border-[#e85d75]" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Mensagem</span><textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escreva algo que venha do coração..." className="min-h-36 w-full resize-y rounded-xl border border-[#e8cfd2] px-4 py-3 outline-none focus:border-[#e85d75]" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Tipo da declaração</span><select value={type} onChange={(e) => setType(e.target.value as DeclarationType)} className="w-full rounded-xl border border-[#e8cfd2] bg-white px-4 py-3">{types.map((item) => <option key={item} value={item}>{typeLabels[item]}</option>)}</select></label>
              <div className="rounded-xl border border-[#e8cfd2] p-4"><span className="mb-2 block text-sm font-semibold">Adicionar uma foto</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="w-full text-sm" /><p className="mt-2 text-xs text-gray-500">JPG, PNG ou WEBP até 2 MB.</p>{photo && <button type="button" onClick={removePhoto} className="mt-2 text-sm font-semibold underline">Remover foto</button>}</div>
              <fieldset><legend className="mb-2 text-sm font-semibold">Escolha a cor</legend><div className="grid grid-cols-4 gap-2 sm:grid-cols-7">{colors.map((item) => <button key={item} type="button" title={colorLabels[item]} aria-label={colorLabels[item]} onClick={() => setColor(item)} className={`h-9 rounded-full border-2 ${color === item ? "border-[#29232a] ring-2 ring-[#e85d75]" : "border-white"}`} style={{ backgroundColor: colorValues[item] }} />)}</div></fieldset>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Escolha um efeito</span><select value={effect} onChange={(e) => setEffect(e.target.value as DeclarationEffect)} className="w-full rounded-xl border border-[#e8cfd2] bg-white px-4 py-3">{effects.map((item) => <option key={item} value={item}>{effectLabels[item]}</option>)}</select></label>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#e85d75] px-6 py-3 font-medium text-white transition hover:bg-[#c84860] disabled:opacity-60">{isSubmitting ? "Salvando..." : "Criar declaração"}</button>
            </form>
            {error && <p className="mt-4 rounded-xl bg-[#fff0f3] p-4 text-sm text-[#8f2942]">{error}</p>}
            {publicUrl && <div className="mt-5 rounded-xl bg-[#edf7f2] p-4 text-sm text-[#22634c]"><p className="font-semibold">Sua declaração está pronta!</p><div className="mt-3 flex flex-wrap gap-4"><Link href={publicUrl} className="underline">Visualizar</Link><button type="button" onClick={handleShare} className="font-semibold underline">Compartilhar</button><a href={`https://wa.me/?text=${encodeURIComponent(`Veja minha declaração: ${window.location.origin}${publicUrl}`)}`} target="_blank" rel="noreferrer" className="font-semibold underline">WhatsApp</a></div>{status && <p className="mt-2">{status}</p>}</div>}
          </section>
          <section className="self-start rounded-4xl p-6 shadow-xl sm:p-10" style={{ backgroundColor: colorValues[color] }}>
            <p className="mb-4 text-center text-sm font-semibold text-[#8f2942]">Pré-visualização</p>
            <div className={`rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12 ${effect === "glow" ? "shadow-[0_0_35px_rgba(232,93,117,0.45)]" : ""}`}>
              <span className="text-5xl text-[#e85d75]">{effect === "hearts" ? "♡ ♡" : effect === "confetti" ? "✦ ♡ ✦" : "♡"}</span>
              {photo && <Image src={photo} alt="Pré-visualização da foto" width={160} height={160} unoptimized className="mx-auto mt-5 h-40 w-40 rounded-2xl object-cover" />}
              <p className="mt-6 text-sm text-gray-500">{typeLabels[type]} para {name || "alguém especial"}</p>
              <h2 className="mt-3 text-3xl font-bold text-[#8f2942]">{title || "Seu título especial"}</h2>
              <p className="mt-5 whitespace-pre-wrap leading-7 text-gray-600">{message || "Sua mensagem aparecerá aqui enquanto você escreve."}</p>
              <div className="mt-8 h-2 rounded-full bg-[#f4b6c2]" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
