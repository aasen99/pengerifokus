"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { FORDELSPROGRAMMER_TITLE } from "@/data/content-labels";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";

interface NavItem {
  href: string;
  label: string;
}

const primaryNav: NavItem[] = [
  { href: "/guider", label: "Guider" },
  { href: "/verktoy", label: "Verktøy" },
  { href: "/tilbud", label: "Tilbud" },
];

const secondaryNav: NavItem[] = [
  { href: "/fordeler", label: "Fordeler" },
  { href: "/formuesbyggere", label: "Profiler" },
  { href: "/ordbok", label: "Ordbok" },
];

const mobileMoreNav: NavItem[] = [
  { href: "/fordeler", label: FORDELSPROGRAMMER_TITLE },
  { href: "/formuesbyggere", label: FORMUESBYGGERE_TITLE },
  { href: "/ordbok", label: "Ordbok" },
];

function isNavActive(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(isActive: boolean, variant: "primary" | "secondary" | "mobile") {
  if (variant === "primary") {
    return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-white text-stone-900 shadow-sm"
        : "text-stone-600 hover:text-stone-900"
    }`;
  }

  if (variant === "secondary") {
    return `text-sm transition-colors ${
      isActive
        ? "font-semibold text-orange-700"
        : "text-stone-500 hover:text-stone-800"
    }`;
  }

  return `rounded-lg px-3 py-2.5 text-sm font-medium ${
    isActive ? "bg-orange-50 text-orange-800" : "text-stone-600 hover:bg-stone-50"
  }`;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800 text-sm font-bold text-white">
            P
          </span>
          <span className="text-lg font-bold text-stone-900">
            Penger i Fokus
          </span>
        </Link>

        <nav
          className="hidden flex-1 justify-center lg:flex"
          aria-label="Hovednavigasjon"
        >
          <div className="inline-flex items-center gap-0.5 rounded-full bg-stone-100/90 p-1">
            {primaryNav.map((item) => {
              const isActive = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(isActive, "primary")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <nav
          className="hidden shrink-0 items-center gap-3 lg:flex"
          aria-label="Sekundærnavigasjon"
        >
          {secondaryNav.map((item, index) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <span key={item.href} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span className="text-stone-300" aria-hidden="true">
                    ·
                  </span>
                )}
                <Link
                  href={item.href}
                  className={navLinkClass(isActive, "secondary")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 hover:bg-stone-100 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-stone-200 bg-white px-4 py-3 lg:hidden"
          aria-label="Mobilmeny"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {primaryNav.map((item) => {
                const isActive = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass(isActive, "mobile")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div>
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Mer innhold
              </p>
              <div className="mt-1 flex flex-col gap-1">
                {mobileMoreNav.map((item) => {
                  const isActive = isNavActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={navLinkClass(isActive, "mobile")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
