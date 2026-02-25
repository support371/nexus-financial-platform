# ApexTrust Banking

Institutional-grade white-label bitcoin banking platform demo. Single-file HTML/JS/CSS SPA with localStorage state, hash-based routing, and full compliance/audit tooling.

## Quick Start

```bash
# Clone and open
git clone https://github.com/support371/nexus-financial-platform.git
cd nexus-financial-platform
open app/index.html   # macOS
# or: xdg-open app/index.html  (Linux)
# or: start app/index.html      (Windows)
```

No build step, no dependencies. Works in any modern browser.

## Demo Credentials

| Role   | Email                    | Password   | Region |
|--------|--------------------------|------------|--------|
| Admin  | admin@apextrust.demo     | Admin@123  | —      |
| Client | alice@apextrust.demo     | Demo@123   | US     |
| Client | bob@apextrust.demo       | Demo@123   | UK     |
| Client | carlos@apextrust.demo    | Demo@123   | MX     |
| Client | emma@apextrust.demo      | Demo@123   | EU     |

## Smoke-Test Checklist

Run these checks after opening `app/index.html`:

**Landing & Auth**
- [ ] Landing page loads — no console errors
- [ ] Sign up as a new user (pick any region) — reference code `APT-XXXXXXXX` appears on dashboard
- [ ] Sign in as `alice@apextrust.demo` — dashboard shows BTC balance

**Client Flows**
- [ ] **Dashboard** — balance card, fiat value, recent transactions render
- [ ] **Accounts** — shows region-specific rails (ACH routing/account, FPS sort code, CLABE, PIX key, or IBAN+BIC)
- [ ] **Deposits > New Deposit** — enter amount, get quote; 15-minute countdown ticks in real time
- [ ] **Deposits > Step 3** — BTC address shown; reference code memo box marked REQUIRED in red
- [ ] **Deposits > Mark as Sent** — deposit appears in History tab as "pending"
- [ ] **KYC** (sign in as carlos) — 3-step form submits; status changes to "Under Review"
- [ ] **Cards** (sign in as alice) — card renders (alice is US + KYC approved + balance > $1k)
- [ ] **Cards** (sign in as bob) — eligibility checklist shows unmet requirements
- [ ] **Compliance** — score, SLA KPIs, incidents, ratings render; export buttons download JSON
- [ ] **Settings** — profile info and region displayed correctly

**Admin Flows**
- [ ] Sign in as `admin@apextrust.demo`
- [ ] **Admin Dashboard** — platform metrics (users, deposits, BTC volume, KYC, cards, incidents)
- [ ] **Admin KYC** — approve bob; verify bob can now access cards page
- [ ] **Admin Deposits** — confirm a pending deposit; verify alice's balance increases
- [ ] **Admin Cards** — freeze/activate a card
- [ ] **Admin Compliance** — add an incident; edit posture fields; export compliance report
- [ ] **Admin Audit** — click "Verify Integrity" → PASS shown in green; export JSON

**Exports**
- [ ] Compliance: "Download Transparency Pack" → valid JSON downloaded
- [ ] Compliance: "Download Compliance Report" → valid JSON downloaded
- [ ] Admin Audit: "Export Audit Log" → valid JSON downloaded

## Rebrand / Normalization Script

After editing `app/index.html`, run the normalization script to fix encoding artifacts and enforce branding:

```bash
python scripts/normalize_rebrand.py app/index.html
```

This converts smart quotes/dashes to ASCII and applies all ApexTrust branding substitutions.

## Architecture

```
app/index.html          # Complete SPA — all 17 pages, all logic inline
scripts/
  normalize_rebrand.py  # Post-edit normalization + rebrand enforcement
```

**State**: `localStorage` under `apextrust_banking_v1_*` keys
**Routing**: Hash-based (`#/dashboard`, `#/admin/audit`, etc.)
**No build step**: open the HTML file directly
**Deployment**: Azure Static Web Apps, Netlify, GitHub Pages, or any static host

## Pages

**Client**: Landing, Sign In, Sign Up, Dashboard, Accounts, Deposits, KYC, Cards, Compliance, Settings
**Admin**: Dashboard, Clients, Deposits, Cards, KYC, Compliance/Governance, Ops/Audit

## Supported Rails

| Region | Rail | Identifier |
|--------|------|------------|
| US     | ACH  | Routing + Account number |
| UK     | FPS  | Sort code + Account number |
| MX     | SPEI | CLABE (18 digits) |
| BR     | PIX  | PIX key / phone |
| EU     | SEPA | IBAN + BIC |
