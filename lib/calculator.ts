import fs from "node:fs";
import path from "node:path";

/**
 * The Google Ads investment calculator is a standalone, WordPress-ready
 * HTML/CSS/JS snippet. public/embed/nordic-wide-calculator.html is the single
 * source of truth: it is served as-is for copying into WordPress and split
 * here so the same code can be rendered inside a Next.js page.
 */
const SNIPPET_PATH = path.join(process.cwd(), "public", "embed", "nordic-wide-calculator.html");

export const calculatorSnippetPath = "/embed/nordic-wide-calculator.html";

export interface CalculatorEmbed {
  css: string;
  markup: string;
  script: string;
}

function between(source: string, start: string, end: string): string {
  const from = source.indexOf(start);
  const to = source.lastIndexOf(end);
  if (from === -1 || to === -1 || to <= from) {
    throw new Error(`Calculator snippet is missing ${start}…${end}`);
  }
  return source.slice(from + start.length, to);
}

export function loadCalculatorEmbed(): CalculatorEmbed {
  const source = fs.readFileSync(SNIPPET_PATH, "utf8");
  const css = between(source, "<style>", "</style>");
  const script = between(source, "<script>", "</script>");
  const markup = between(source, "</style>", "<script>").trim();
  return { css, markup, script };
}
