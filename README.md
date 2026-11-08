# 🌲 PineNotes — Student Notes Library

A light, white-theme, no-server notes app built with **HTML + CSS + JavaScript** only. **No payments, no backend required.**

## Departments (Publish select area)
Computer Systems and Architecture · Software Development · Networking and Internet Technologies · Electronics and Telecommunication · Professional Accounting · Multimedia Production · Tourism and Hospitality · Food and Beverage Operations · Building and Construction Services

## Account System (new)
- **Separate pages:** `/login` (Login page) and `/register` (Create Account page) — different pages, not tabs in one card. Also available inside the app as Login page / Create Account page.
- Login + Create Account: username + password only, no email. Display name, hashed passwords (SHA-256), unique usernames, change password, delete account.
- After login: Are you Teacher or Student? Student -> main PineNotes library. Teacher -> Teacher Registration page (full name, Teacher ID, school, department, subjects, phone, experience + confirmation). Students who try teacher path must fill real teacher data — by design they will stop and switch to Student.
- Teacher Dashboard: publish, browse library, manage/moderate notes, export report, view account, stats.
- Account page: avatar with 1st letter of username/name, role, member since, uploads/favorites/downloads, teacher data, change password, delete account, logout.
- Accounts are real per-browser accounts (saved in localStorage, hashed passwords). For shared accounts across all devices, connect a free backend later (Supabase/Firebase) — see Vercel section below.

## Deploy on Vercel (ready to use) 🚀
PineNotes is ready for Vercel — no build step, no payments needed for the static version.

1. Go to vercel.com → **Add New → Project**
2. **Import** this `pine` folder (or push `pine/` to GitHub and import the repo)
3. Framework Preset: **Other** · Build Command: *(leave empty)* · Output Directory: *(leave empty / `.`)*
4. Click **Deploy** — you get a live URL like `pinenotes.vercel.app`
5. Pages: `/` (app after login) · `/login` · `/register` — clean URLs via `vercel.json`
6. Optional custom DNS: Vercel → Project → Settings → Domains → add your DNS and point the CNAME as Vercel shows.

> **Honest note about "real accounts":** On Vercel static hosting alone, accounts live in each visitor's browser (localStorage) — they work, but they don't sync across phones/computers. For true shared accounts (one username works everywhere), add a free backend like Supabase (free tier) and swap the localStorage functions in `app.js` for Supabase Auth — the pages don't need to change. No payments are required for either path.

## Ask Pine AI 🤖 — now understands what you ask
- Floating **Ask Pine AI** button (bottom-right) on every page
- **Intent detection:** greetings, summarize, explain/define, quiz, maths solving (quadratic, Ohm, F=ma, %), study plans, examples, follow-ups (“more”, “example”) — with memory of your last topic/note
- **Expanded knowledge:** all 9 departments (Computer Systems, Software Development, Networking, Electronics & Telecommunication, Professional Accounting, Multimedia, Tourism & Hospitality, Food & Beverage, Building & Construction) + general topics
- **Optional Real Cloud AI:** tap ⚙️ in the AI panel, paste a free API key (Google Gemini / Groq / OpenAI), Save & Connect. Answers then come from a real LLM in the cloud. Key stays in this browser only. Offline mode still works with no key, no payments.
- Works from the notes library — publish a note and Pine AI can summarize/quiz it instantly
- Honest limit: offline mode is a smart knowledge engine, not a cloud LLM. For production school use, keep API keys server-side (Vercel function) — see note below.

## Features (all free, no server)
- Search bar + subject filters + file-type filter + sorting (Newest / Popular / A–Z / Oldest) + grid/list view + tags search
- Dashboard: total notes, subjects, downloads, contributors, favorites, department chart, top downloaded, latest, most viewed, top contributors
- Real downloads (Blob / data-URL, no fake buttons)
- In-browser preview (TXT/PDF) before download, with view tracking + recently viewed
- Favorites ⭐ (per-browser localStorage) + Favorites page + Print favorites + Export backup (JSON)
- Share: copy link, device share, QR code (free QR image service, graceful offline fallback)
- Publish/Upload: drag-and-drop, 50 MB check, duplicate warning, class/year + tags fields, rights checkbox
- 🔒 Security: CSP, XSS escaping, blocked executables (.exe/.bat/.sh/.js etc.), allowed-type list, Report ⚑ button, Clear my data, no tracking
- PWA/offline: manifest.json + sw.js + offline.html — installable, works offline after first visit, no payments
- Accessibility: skip link, "/" search shortcut, Esc close, reduced-motion + print styles
- Help & FAQ page, About page, Contact page — contact: shemalucky83@gmail.com · +250 795 605 242
- Pages/sections: Home, Notes, Dashboard, Publish, Favorites, About, Help, Contact (hash anchors, works on any static host)
- Animations, responsive mobile layout, white + pine-green theme, no dark theme, no external JS/CSS dependencies (works offline except QR image)

## Run locally
```bash
cd pine
python3 -m http.server 8000
# open http://localhost:8000
```

## Host on your DNS (any static host — free options)
Upload the whole `pine/` folder — no build, no server code, no payments:
- Netlify Drop / Cloudflare Pages / Vercel / GitHub Pages: drag the folder, point DNS (CNAME/A) to the host.
- Own VPS: copy `pine/` to `/var/www/html/` and point DNS A record to the server IP.

## Honest limitations
- Uploads/favorites/views are stored per-browser (localStorage). Sample notes are shared with everyone.
- For school-wide shared uploads, teacher moderation, and accounts, a backend is needed later (e.g. Supabase/Firebase free tier). PineNotes front-end is ready for that.

## Files
- `index.html` — main app (Student / Teacher / Account pages) + Login & Create Account pages inside the app
- `login.html` + `register.html` — separate standalone Login and Create Account pages (`/login`, `/register` on Vercel)
- `vercel.json` — Vercel clean URLs + security headers, ready to deploy
- `style.css` — white/green theme + animations
- `app.js` — search, dashboard, preview, favorites, share, upload, download, security validation, auth
- `manifest.json` + `sw.js` + `offline.html` — PWA install + offline (no server/payment)

## 🌐 Make notes shared — everyone sees uploads (FREE, 5 min)
Your Vercel site alone cannot share files between devices — the browser blocks that. PineNotes now supports **free Supabase** (no payment, 500 MB DB + 1 GB storage, 50 MB/file):

1. Create free project at https://supabase.com/dashboard
2. SQL Editor → paste **all** of `supabase-setup.sql` → Run
3. Project Settings → API → copy **Project URL** + **anon public key**
4. Edit `supabase-config.js` — paste URL + key, save
5. Redeploy on Vercel (push to GitHub or re-upload `pine/`)

Done: uploads go to Supabase Storage, metadata to the `notes` table, and **every user sees the same library** at https://pine-note.vercel.app. Downloads open the shared public URL.

**Upload limit: 50 MB everywhere** (Publish form, validation, Supabase bucket). Note: without Supabase, browsers cannot store >~4 MB in localStorage — the app warns you and asks you to connect Supabase for large/shared uploads. That is a browser limit, not PineNotes.

**Files added:** `supabase-config.js`, `supabase-setup.sql`
