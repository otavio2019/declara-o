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
    <main className="min-h-screen bg-[#080b13] px-6 py-8 text-[#f5f7fb]">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="font-bold text-[#6ee7ff]">declara-o</Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <section>
            <p className="font-medium text-[#6ee7ff]">Crie sua declaração</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Uma mensagem feita para alguém especial.</h1>
            <form onSubmit={handleSubmit} className="portfolio-card mt-8 space-y-5 rounded-3xl p-6 shadow-sm sm:p-7">
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#f5f7fb]">Nome da pessoa</span><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Mariana" className="w-full rounded-xl border border-[#2d405c] bg-[#0b1220] px-4 py-3 text-[#f5f7fb] outline-none transition focus:border-[#6ee7ff] focus:ring-2 focus:ring-[#6ee7ff]/20" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#f5f7fb]">Título</span><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Você é especial" className="w-full rounded-xl border border-[#2d405c] bg-[#0b1220] px-4 py-3 text-[#f5f7fb] outline-none transition focus:border-[#6ee7ff] focus:ring-2 focus:ring-[#6ee7ff]/20" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#f5f7fb]">Mensagem</span><textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escreva algo que venha do coração..." className="min-h-36 w-full resize-y rounded-xl border border-[#2d405c] bg-[#0b1220] px-4 py-3 text-[#f5f7fb] outline-none transition focus:border-[#6ee7ff] focus:ring-2 focus:ring-[#6ee7ff]/20" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Tipo da declaração</span><select value={type} onChange={(e) => setType(e.target.value as DeclarationType)} className="w-full rounded-xl border border-[#2d405c] bg-[#0b1220] px-4 py-3 text-[#f5f7fb] outline-none focus:border-[#6ee7ff]">{types.map((item) => <option key={item} value={item}>{typeLabels[item]}</option>)}</select></label>
              <div className="rounded-xl border border-[#2d405c] bg-[#0b1220] p-4"><span className="mb-2 block text-sm font-semibold">Adicionar uma foto</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="w-full text-sm" /><p className="mt-2 text-xs text-slate-400">JPG, PNG ou WEBP até 2 MB.</p>{photo && <button type="button" onClick={removePhoto} className="mt-2 text-sm font-semibold text-[#6ee7ff] underline">Remover foto</button>}</div>
              <fieldset><legend className="mb-2 text-sm font-semibold">Escolha a cor</legend><div className="grid grid-cols-4 gap-2 sm:grid-cols-7">{colors.map((item) => <button key={item} type="button" title={colorLabels[item]} aria-label={colorLabels[item]} onClick={() => setColor(item)} className={`h-9 rounded-full border-2 ${color === item ? "border-[#f5f7fb] ring-2 ring-[#6ee7ff]" : "border-[#24324a]"}`} style={{ backgroundColor: colorValues[item] }} />)}</div></fieldset>
              <label className="block"><span className="mb-2 block text-sm font-semibold">Escolha um efeito</span><select value={effect} onChange={(e) => setEffect(e.target.value as DeclarationEffect)} className="w-full rounded-xl border border-[#2d405c] bg-[#0b1220] px-4 py-3 text-[#f5f7fb] outline-none focus:border-[#6ee7ff]">{effects.map((item) => <option key={item} value={item}>{effectLabels[item]}</option>)}</select></label>
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#6ee7ff] px-6 py-3 font-medium text-white transition hover:bg-[#39d8ff] disabled:opacity-60">{isSubmitting ? "Salvando..." : "Criar declaração"}</button>
            </form>
            {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-950/40 p-4 text-sm text-red-200">{error}</p>}
            {publicUrl && <div className="mt-5 rounded-xl border border-[#6ee7ff]/30 bg-[#0f2935] p-4 text-sm text-[#d9faff]"><p className="font-semibold">Sua declaração está pronta!</p><div className="mt-3 flex flex-wrap gap-4"><Link href={publicUrl} className="text-[#6ee7ff] underline">Visualizar</Link><button type="button" onClick={handleShare} className="font-semibold text-[#6ee7ff] underline">Compartilhar</button><a href={`https://wa.me/?text=${encodeURIComponent(`Veja minha declaração: ${window.location.origin}${publicUrl}`)}`} target="_blank" rel="noreferrer" className="font-semibold text-[#6ee7ff] underline">WhatsApp</a></div>{status && <p className="mt-2">{status}</p>}</div>}
          </section>
          <section className="self-start rounded-3xl border border-[#24324a] p-4 shadow-xl sm:p-6" style={{ backgroundColor: colorValues[color] }}>
            <p className="mb-4 text-center text-sm font-semibold text-[#6ee7ff]">Pré-visualização</p>
            <div className={`rounded-2xl border border-white/10 bg-[#0b1220]/90 p-7 text-center shadow-sm sm:p-10 ${effect === "glow" ? "shadow-[0_0_35px_rgba(110,231,255,0.35)]" : ""}`}>
              <span className="text-5xl text-[#6ee7ff]">{effect === "hearts" ? "♡ ♡" : effect === "confetti" ? "✦ ♡ ✦" : "♡"}</span>
              {photo && <Image src={photo} alt="Pré-visualização da foto" width={160} height={160} unoptimized className="mx-auto mt-5 h-40 w-40 rounded-2xl object-cover" />}
              <p className="mt-6 text-sm text-slate-400">{typeLabels[type]} para {name || "alguém especial"}</p>
              <h2 className="mt-3 text-3xl font-bold text-[#6ee7ff]">{title || "Seu título especial"}</h2>
              <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-300">{message || "Sua mensagem aparecerá aqui enquanto você escreve."}</p>
              <div className="mt-8 h-2 rounded-full bg-[#8b5cf6]" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
