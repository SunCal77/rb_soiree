"use client";

import { useState } from "react";

export function FilterSection({
  title,
  children,
  openByDefault = true,
}: {
  title: string;
  children: React.ReactNode;
  openByDefault?: boolean;
}) {
  const [open, setOpen] = useState(openByDefault);
  return (
    <div className="ml-filter">
      <div className="ml-filter__head" onClick={() => setOpen((o) => !o)}>
        <span className="ml-filter__title">{title}</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && <div className="ml-filter__list">{children}</div>}
    </div>
  );
}
