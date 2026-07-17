/**
 * Opens a print-friendly report window. Users can choose "Save as PDF" in the print dialog.
 */
export function openPrintReport(options: {
  title: string;
  subtitle?: string;
  bodyHtml: string;
}): void {
  if (typeof window === "undefined") return;

  const { title, subtitle, bodyHtml } = options;
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=840,height=900");
  if (!printWindow) return;

  const escapedTitle = escapeHtml(title);
  const escapedSubtitle = subtitle ? escapeHtml(subtitle) : "";

  printWindow.document.write(`<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="utf-8" />
  <title>${escapedTitle}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      font-family: "Segoe UI", system-ui, sans-serif;
      color: #1c1917;
      line-height: 1.5;
      background: #fff;
    }
    h1 { font-size: 1.5rem; margin: 0 0 0.25rem; }
    .subtitle { color: #57534e; margin: 0 0 1.5rem; font-size: 0.95rem; }
    .meta { color: #78716c; font-size: 0.8rem; margin-bottom: 1.5rem; }
    section {
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 16px 18px;
      margin-bottom: 14px;
      break-inside: avoid;
    }
    h2 { font-size: 0.95rem; margin: 0 0 0.75rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th, td { text-align: left; padding: 6px 0; vertical-align: top; }
    th { color: #78716c; font-weight: 500; width: 45%; }
    td { font-weight: 600; }
    ul { margin: 0; padding-left: 1.1rem; }
    li { margin: 0.25rem 0; }
    .muted { color: #78716c; font-size: 0.8rem; margin-top: 1.5rem; }
    .positive { color: #166534; }
    .negative { color: #991b1b; }
    @media print {
      body { padding: 12px; }
      section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>${escapedTitle}</h1>
  ${escapedSubtitle ? `<p class="subtitle">${escapedSubtitle}</p>` : ""}
  <p class="meta">Penger i Fokus · ${escapeHtml(new Date().toLocaleDateString("nb-NO"))}</p>
  ${bodyHtml}
  <p class="muted">Veiledende beregning — erstatter ikke profesjonell rådgivning.</p>
  <script>
    window.addEventListener("load", () => {
      setTimeout(() => window.print(), 150);
    });
  </script>
</body>
</html>`);

  printWindow.document.close();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function reportSection(title: string, innerHtml: string): string {
  return `<section><h2>${escapeHtml(title)}</h2>${innerHtml}</section>`;
}

export function reportRows(
  rows: Array<{ label: string; value: string; tone?: "positive" | "negative" }>,
): string {
  const cells = rows
    .map((row) => {
      const cls = row.tone ? ` class="${row.tone}"` : "";
      return `<tr><th>${escapeHtml(row.label)}</th><td${cls}>${escapeHtml(row.value)}</td></tr>`;
    })
    .join("");
  return `<table>${cells}</table>`;
}
