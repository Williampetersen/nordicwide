"use client";

import { useEffect } from "react";

interface CalculatorScriptProps {
  code: string;
}

/**
 * Runs the calculator's vanilla script after the markup is in the DOM.
 * A fresh <script> element is used so it also runs after client-side
 * navigation; the script itself skips roots it has already initialised.
 */
export function CalculatorScript({ code }: CalculatorScriptProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.text = code;
    document.body.appendChild(script);
    return () => script.remove();
  }, [code]);

  return null;
}
