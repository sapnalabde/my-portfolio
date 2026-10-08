/**
 * GET /api/submissions?key=<ADMIN_KEY>
 * Renders the saved "Direct Note" submissions.
 *
 * - Add ?format=json to get raw JSON instead of the HTML table.
 * - Protected by a simple key. Set ADMIN_KEY in your environment
 *   (Vercel project env vars / local .env). Defaults to "sapna-dev-key"
 *   when unset so the dummy link works out of the box in local dev.
 *
 * NOTE: On Vercel production the filesystem is ephemeral, so this reads
 * whatever is bundled in data/submissions.json at deploy time plus any
 * writes made during the current warm instance. Use a DB/KV for durability.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');
const ADMIN_KEY = process.env.ADMIN_KEY || 'sapna-dev-key';

async function readSubmissions() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  const key = req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: 'Unauthorized. Append ?key=<ADMIN_KEY>.' });
  }

  const submissions = await readSubmissions();

  if (req.query.format === 'json') {
    return res.status(200).json({ ok: true, count: submissions.length, submissions });
  }

  const rows = submissions
    .slice()
    .reverse()
    .map(
      (s) => `
        <tr>
          <td>${escapeHtml(new Date(s.receivedAt).toLocaleString())}</td>
          <td>${escapeHtml(s.name)}</td>
          <td><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></td>
          <td>${escapeHtml(s.subject)}</td>
          <td>${escapeHtml(s.message)}</td>
        </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Direct Notes — Submissions</title>
  <style>
    body { font-family: system-ui, sans-serif; background:#0a0e17; color:#e2e8f0; margin:0; padding:2rem; }
    h1 { color:#f59e0b; font-size:1.5rem; }
    p.meta { color:#94a3b8; font-size:0.85rem; }
    table { width:100%; border-collapse:collapse; margin-top:1rem; font-size:0.85rem; }
    th, td { border:1px solid #1e293b; padding:0.6rem 0.75rem; text-align:left; vertical-align:top; }
    th { background:#111726; color:#fbbf24; position:sticky; top:0; }
    tr:nth-child(even) td { background:#0f131d; }
    a { color:#fbbf24; }
    .empty { color:#64748b; margin-top:2rem; }
  </style>
</head>
<body>
  <h1>Direct Notes — Submissions</h1>
  <p class="meta">${submissions.length} total · newest first · <a href="?key=${encodeURIComponent(key)}&amp;format=json">view raw JSON</a></p>
  ${
    submissions.length
      ? `<table>
          <thead>
            <tr><th>Received</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>`
      : '<p class="empty">No submissions yet.</p>'
  }
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
