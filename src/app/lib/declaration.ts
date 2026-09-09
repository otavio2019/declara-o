export type DeclarationTemplate = "romantic" | "special" | "story";

export type Declaration = {
  name: string;
  title: string;
  message: string;
  template: DeclarationTemplate;
  photo?: string | null;
};

export const declarationStorageKey = "declara-o-declarations";

export const templateLabels: Record<DeclarationTemplate, string> = {
  romantic: "Declaração de amor",
  special: "Homenagem especial",
  story: "Nossa história",
};

export function createDeclarationSlug(name: string) {
  const normalizedName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${normalizedName || "declaracao"}-${Date.now().toString(36)}`;
}
