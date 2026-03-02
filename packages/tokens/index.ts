import tokens from "./tokens.json";

export const orbiTokens = tokens;

export type OrbiTokens = typeof orbiTokens;
export type OrbiColorScale = typeof orbiTokens.colors.neutral;
export type OrbiSpacing = typeof orbiTokens.spacing;
export type OrbiRadius = typeof orbiTokens.radius;
export type OrbiShadow = typeof orbiTokens.shadow;
export type OrbiTypography = typeof orbiTokens.typography;
export type OrbiMotion = typeof orbiTokens.motion;
