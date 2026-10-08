/**
 * POST /api/contact
 * Saves a "Direct Note" submission to data/submissions.json.
 *
 * NOTE ON PERSISTENCE:
 * - Local dev (vercel dev): writes are persisted to data/submissions.json on disk.
 * - Vercel production: the filesystem is read-only/ephemeral, so the write is
 *   best-effort. The submission is always logged to the function logs, and the
 *   request still succeeds so the UI flow works. For durable production storage,
 *   swap the file write for a database or Vercel KV.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json');

async function readSubmissions() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // req.body may be a string depending on runtime; normalize it.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();

  // Server-side validation.
  if (!name || !/\S+@\S+\.\S+/.test(email) || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Name, a valid email, and a message are required.'
    });
  }

  const submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject: subject || '(no subject)',
    message,
    receivedAt: new Date().toISOString()
  };

  // Always log so the submission is captured even when the FS is read-only.
  console.log('[contact] new submission:', JSON.stringify(submission));

  try {
    const submissions = await readSubmissions();
    submissions.push(submission);
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2) + '\n', 'utf-8');
    return res.status(200).json({ ok: true, persisted: true, id: submission.id });
  } catch (err) {
    // Read-only filesystem (e.g. Vercel production) — succeed gracefully.
    console.warn('[contact] could not write to file (read-only FS?):', err.message);
    return res.status(200).json({ ok: true, persisted: false, id: submission.id });
  }
}
