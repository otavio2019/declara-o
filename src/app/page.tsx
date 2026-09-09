import Link from "next/link";
import Image from "next/image";


const declarationTypes = [
  {
    title: "Declaração de amor",
    description: "Transforme seus sentimentos em uma experiência inesquecível para alguém especial.",
    icon: "♡",
  },
  {
    title: "Homenagem especial",
    description: "Crie uma mensagem única para alguém importante.",
    icon: "✦",
  },
  {
    title: "Nossa história",
    description: "Reúna memórias, fotos e momentos especiais.",
    icon: "∞",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b13] text-[#f5f7fb]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/coracao.png"
            alt="Coração"
            width={60}
            height={60}
            className="object-contain"
          />


          <h1 className="text-2xl font-bold text-[#6ee7ff]">
            declara-o
          </h1>
        </Link>

        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#como-funciona" className="hover:text-[#6ee7ff]">
            Como funciona
          </a>

          <a href="#modelos" className="hover:text-[#6ee7ff]">
            Modelos
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-4 font-medium text-[#6ee7ff]">
            Feito para sentimentos especiais
          </p>

          <h2 className="max-w-xl text-5xl font-bold leading-tight md:text-6xl">
            Transforme seus sentimentos em uma experiência inesquecível.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Crie declarações personalizadas com mensagens, fotos e detalhes
            especiais para alguém importante.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/criar"
              className="rounded-full bg-[#6ee7ff] px-6 py-3 font-medium text-white transition hover:bg-[#39d8ff]"
            >
              Criar minha declaração
            </Link>

            <a
              href="#modelos"
              className="rounded-full border border-[#6ee7ff] px-6 py-3 font-medium text-[#6ee7ff] transition hover:bg-[#0f172a]"
            >
              Ver exemplos
            </a>
          </div>
        </div>

        <div className="relative rounded-4xl bg-[#0f172a] p-8 shadow-xl">
          <div className="rounded-3xl bg-[#0f172a] p-8 text-center shadow-sm">
            <span className="text-5xl text-[#6ee7ff]">♡</span>

            <p className="mt-6 text-sm text-slate-400">
              Para alguém muito especial
            </p>

            <h3 className="mt-3 text-3xl font-bold text-[#6ee7ff]">
              Você torna tudo mais bonito
            </h3>

            <p className="mt-5 leading-7 text-slate-300">
              Algumas pessoas chegam e transformam os dias comuns em memórias
              que queremos guardar para sempre.
            </p>

            <div className="mt-8 h-2 rounded-full bg-[#8b5cf6]" />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#0f172a] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-medium text-[#6ee7ff]">É simples começar</p>

            <h2 className="mt-3 text-4xl font-bold">
              Crie algo especial em poucos passos
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#24324a] p-6">
              <span className="text-3xl">01</span>
              <h3 className="mt-6 text-xl font-bold">Escolha um modelo</h3>
              <p className="mt-3 text-slate-300">
                Comece com um modelo pensado para o tipo de mensagem que você
                deseja criar.
              </p>
            </div>

            <div className="rounded-3xl border border-[#24324a] p-6">
              <span className="text-3xl">02</span>
              <h3 className="mt-6 text-xl font-bold">Personalize</h3>
              <p className="mt-3 text-slate-300">
                Adicione sua mensagem, fotos, cores e outros detalhes
                importantes.
              </p>
            </div>

            <div className="rounded-3xl border border-[#24324a] p-6">
              <span className="text-3xl">03</span>
              <h3 className="mt-6 text-xl font-bold">Compartilhe</h3>
              <p className="mt-3 text-slate-300">
                Gere um link especial e envie sua experiência para quem você
                ama.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="modelos" className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-medium text-[#6ee7ff]">Para cada momento</p>

        <h2 className="mt-3 text-4xl font-bold">Escolha o tipo da sua mensagem</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {declarationTypes.map((type) => (
            <div
              key={type.title}
              className="rounded-3xl bg-[#0f172a] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-4xl text-[#6ee7ff]">{type.icon}</span>

              <h3 className="mt-6 text-xl font-bold">{type.title}</h3>

              <p className="mt-3 leading-7 text-slate-300">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#8b5cf6] px-6 py-8 text-center text-sm text-slate-400">
        <p>© 2026 declara-o. Feito para sentimentos especiais.</p>
      </footer>
    </main>
  );
}
