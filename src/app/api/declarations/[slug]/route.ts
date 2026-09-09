import { getSupabase } from "../../../../lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  let supabase;
  try {
    supabase = getSupabase();
  } catch (error) {
    console.error("Configuração do Supabase ausente:", error);
    return Response.json(
      { error: "O Supabase não está configurado no servidor. Cadastre as variáveis na Vercel." },
      { status: 500 },
    );
  }
  const { slug } = await params;
  const { data, error } = await supabase
    .from("declarations")
    .select("name, title, message, type, color, effect, photo")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar declaração:", error);
    return Response.json(
      { error: "Não foi possível buscar a declaração." },
      { status: 500 },
    );
  }

  if (!data) {
    return Response.json(
      { error: "Declaração não encontrada." },
      { status: 404 },
    );
  }

  return Response.json(data);
}
