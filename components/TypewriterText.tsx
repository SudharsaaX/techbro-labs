"use client";

import { useState, useEffect } from "react";

export function TypewriterText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 80);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts]);

  // Find the longest string to reserve width
  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, "");

  return (
    <span className="relative inline-block text-left">
      {/* Invisible placeholder to reserve width and prevent layout shift */}
      <span className="opacity-0 pointer-events-none whitespace-nowrap select-none">
        {longestText}
        <span className="opacity-0">|</span>
      </span>
      {/* Actual typing text absolutely positioned */}
      <span className="absolute top-0 left-0 whitespace-nowrap gradient-text">
        {displayed}
        <span className="animate-pulse text-accent">|</span>
      </span>
    </span>
  );
}
