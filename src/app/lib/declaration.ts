export type DeclarationTemplate = "romantic" | "special" | "story";
export type DeclarationType =
  | "love"
  | "birthday"
  | "friendship"
  | "tribute"
  | "special"
  | "custom";
export type DeclarationColor =
  | "pink"
  | "red"
  | "lilac"
  | "blue"
  | "green"
  | "gold"
  | "mono";
export type DeclarationEffect =
  | "none"
  | "hearts"
  | "particles"
  | "glow"
  | "confetti";

export type Declaration = {
  name: string;
  title: string;
  message: string;
  type: DeclarationType;
  color: DeclarationColor;
  effect: DeclarationEffect;
  photo?: string | null;
};

export const declarationStorageKey = "declara-o-declarations";

export const templateLabels: Record<DeclarationTemplate, string> = {
  romantic: "Declaração de amor",
  special: "Homenagem especial",
  story: "Nossa história",
};

export const typeLabels: Record<DeclarationType, string> = {
  love: "Declaração de amor",
  birthday: "Aniversário",
  friendship: "Amizade",
  tribute: "Homenagem",
  special: "Pedido especial",
  custom: "Mensagem personalizada",
};

export const colorValues: Record<DeclarationColor, string> = {
  pink: "#fff0f3",
  red: "#ffe8e8",
  lilac: "#f2edff",
  blue: "#eaf4ff",
  green: "#edf7f2",
  gold: "#fff7df",
  mono: "#f2f2f2",
};

export const colorLabels: Record<DeclarationColor, string> = {
  pink: "Rosa",
  red: "Vermelho",
  lilac: "Lilás",
  blue: "Azul",
  green: "Verde",
  gold: "Dourado",
  mono: "Preto e branco",
};

export const effectLabels: Record<DeclarationEffect, string> = {
  none: "Sem efeito",
  hearts: "Corações flutuando",
  particles: "Partículas suaves",
  glow: "Brilho",
  confetti: "Confetes",
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
