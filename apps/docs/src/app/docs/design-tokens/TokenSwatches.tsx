"use client";

interface TokenSwatchesProps {
  prefix: string;
  steps: string[];
}

export function TokenSwatches({ prefix, steps }: TokenSwatchesProps) {
  return (
    <div className="token-grid">
      {steps.map((step) => {
        const varName = `${prefix}-${step}`;
        return (
          <div key={step} className="token-swatch">
            <div
              className="token-swatch__color"
              style={{ background: `var(${varName})` }}
            />
            <div className="token-swatch__label">{step}</div>
          </div>
        );
      })}
    </div>
  );
}
