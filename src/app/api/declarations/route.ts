import { createDeclarationSlug, DeclarationTemplate } from "../../lib/declaration";
import { supabase } from "../../../lib/supabase/server";

const templates: DeclarationTemplate[] = ["romantic", "special", "story"];

type DeclarationInput = {
  name?: unknown;
  title?: unknown;
  message?: unknown;
  template?: unknown;
};

export async function POST(request: Request) {
  let input: DeclarationInput;

  try {
    input = (await request.json()) as DeclarationInput;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { name, title, message, template } = input;
  if (
    typeof name !== "string" ||
    typeof title !== "string" ||
    typeof message !== "string" ||
    typeof template !== "string" ||
    !name.trim() ||
    !title.trim() ||
    !message.trim() ||
    !templates.includes(template as DeclarationTemplate)
  ) {
    return Response.json(
      { error: "Preencha todos os campos com valores válidos." },
      { status: 400 },
    );
  }

  const slug = createDeclarationSlug(name);
  const { error } = await supabase.from("declarations").insert({
    slug,
    name: name.trim(),
    title: title.trim(),
    message: message.trim(),
    template,
  });

  if (error) {
    console.error("Erro ao salvar declaração:", error);
    return Response.json(
      { error: "Não foi possível salvar a declaração." },
      { status: 500 },
    );
  }

  return Response.json({ slug }, { status: 201 });
}
