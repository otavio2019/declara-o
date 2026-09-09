import { supabase } from "../../../../lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("declarations")
    .select("name, title, message, template, photo")
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
