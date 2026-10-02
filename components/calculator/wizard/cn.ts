import styles from "./wizard.module.css";

/** Maps plain class names to this module's scoped class names. */
export function cn(...names: Array<string | false | null | undefined>): string {
  return names
    .filter(Boolean)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => styles[token] ?? token)
    .join(" ");
}
