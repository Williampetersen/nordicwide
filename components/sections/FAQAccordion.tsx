"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { cx } from "@/lib/cx";
import type { FAQItem } from "@/types/content";

import styles from "./FAQAccordion.module.css";

/** WAI-ARIA recommends dropping the region role when there are many panels. */
const MAX_REGION_PANELS = 6;

interface FAQAccordionProps {
  items: FAQItem[];
  /** Id of the item open on first render. Pass null to start fully collapsed. */
  defaultOpenId?: string | null;
}

/**
 * Accessible accordion: one item open at a time, buttons inside headings,
 * Arrow Up/Down, Home and End move between questions.
 */
export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId === undefined ? (items[0]?.id ?? null) : defaultOpenId,
  );
  const baseId = useId();
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const useRegions = items.length <= MAX_REGION_PANELS;

  const focusTrigger = (index: number) => triggerRefs.current[index]?.focus();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = items.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index === lastIndex ? 0 : index + 1,
      ArrowUp: index === 0 ? lastIndex : index - 1,
      Home: 0,
      End: lastIndex,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTrigger(target);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = item.id === openId;
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className={cx(styles.item, isOpen && styles.open)}>
            <h3 className={styles.heading}>
              <button
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
                id={triggerId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role={useRegions ? "region" : undefined}
              aria-labelledby={useRegions ? triggerId : undefined}
              className={styles.panel}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
