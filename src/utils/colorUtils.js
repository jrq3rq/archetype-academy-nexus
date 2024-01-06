import { darken, lighten, parseToHsl } from "polished";

export const isColorLight = (color) => {
  const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128; // YIQ contrast threshold
};

export const adjustColor = (color, amount = 0.2) => lighten(amount, color);

export const getTextColor = (bgColor) => {
  return isColorLight(bgColor) ? "#000000" : "#FFFFFF"; // Dark text for light backgrounds, light text for dark backgrounds
};
