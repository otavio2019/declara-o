import {
  createDeclarationSlug,
  DeclarationColor,
  DeclarationEffect,
  DeclarationType,
} from "../../lib/declaration";
import { getSupabase } from "../../../lib/supabase/server";

const types: DeclarationType[] = ["love", "birthday", "friendship", "tribute", "special", "custom"];
const colors: DeclarationColor[] = ["pink", "red", "lilac", "blue", "green", "gold", "mono"];
const effects: DeclarationEffect[] = ["none", "hearts", "particles", "glow", "confetti"];

type DeclarationInput = {
  name?: unknown;
  title?: unknown;
  message?: unknown;
  type?: unknown;
  color?: unknown;
  effect?: unknown;
  photo?: unknown;
};

export async function POST(request: Request) {
  const supabase = getSupabase();
  let input: DeclarationInput;

  try {
    input = (await request.json()) as DeclarationInput;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { name, title, message, photo, type, color, effect } = input;

  if (
    typeof name !== "string" ||
    typeof title !== "string" ||
    typeof message !== "string" ||
    typeof type !== "string" ||
    typeof color !== "string" ||
    typeof effect !== "string" ||
    !name.trim() ||
    !title.trim() ||
    !message.trim() ||
    !types.includes(type as DeclarationType) ||
    !colors.includes(color as DeclarationColor) ||
    !effects.includes(effect as DeclarationEffect)
  ) {
    return Response.json(
      { error: "Preencha todos os campos com valores válidos." },
      { status: 400 },
    );
  }

  if (
    photo !== undefined &&
    photo !== null &&
    (typeof photo !== "string" || !photo.startsWith("data:image/"))
  ) {
    return Response.json(
      { error: "A foto enviada não é válida." },
      { status: 400 },
    );
  }

  const slug = createDeclarationSlug(name);
  const { error } = await supabase.from("declarations").insert({
    slug,
    name: name.trim(),
    title: title.trim(),
    message: message.trim(),
    template: type === "love" ? "romantic" : type === "tribute" ? "special" : "story",
    type,
    color,
    effect,
    photo: photo || null,
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
