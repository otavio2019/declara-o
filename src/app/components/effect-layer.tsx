import type { DeclarationEffect } from "../lib/declaration";

type EffectLayerProps = {
  effect: DeclarationEffect;
};

const particles = [
  [8, 86, 0],
  [18, 70, 1.2],
  [29, 92, 2.4],
  [42, 76, 0.6],
  [56, 88, 1.8],
  [68, 72, 3],
  [79, 90, 1],
  [91, 76, 2.1],
] as const;

const confetti = [
  [10, 18, 12, 0],
  [22, 34, -18, 1],
  [35, 14, 25, 2],
  [51, 29, -8, 0.5],
  [66, 12, 18, 1.5],
  [78, 32, -24, 2.5],
  [90, 18, 8, 0.8],
] as const;

export function EffectLayer({ effect }: EffectLayerProps) {
  if (effect === "none") return null;

  return (
    <div className={`effect-layer effect-${effect}`} aria-hidden="true">
      {effect === "hearts" &&
        particles.map(([left, bottom, delay], index) => (
          <span
            key={`heart-${index}`}
            className="effect-heart"
            style={{ left: `${left}%`, bottom: `${bottom}%`, animationDelay: `${delay}s` }}
          >
            ♡
          </span>
        ))}
      {effect === "particles" &&
        particles.map(([left, bottom, delay], index) => (
          <span
            key={`particle-${index}`}
            className="effect-particle"
            style={{ left: `${left}%`, bottom: `${bottom}%`, animationDelay: `${delay}s` }}
          />
        ))}
      {effect === "confetti" &&
        confetti.map(([left, top, rotate, delay], index) => (
          <span
            key={`confetti-${index}`}
            className="effect-confetti"
            style={{ left: `${left}%`, top: `${top}%`, transform: `rotate(${rotate}deg)`, animationDelay: `${delay}s` }}
          />
        ))}
    </div>
  );
}
