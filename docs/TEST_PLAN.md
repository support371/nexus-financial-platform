# ApexTrust Banking Smoke Test Plan

## Stage 1 — Startup and Navigation
1. Open `app/index.html` in browser.
2. Confirm landing loads with no console errors.
3. Confirm navigation reaches all client pages.
4. Sign in as admin and confirm admin page appears.

## Stage 2 — Signup and Provisioning
1. Create a new client account in each region (US/UK/MX/BR/EU).
2. Confirm each signup generates:
   - client role
   - `APT-` reference code
   - region-specific account identifier
3. Confirm account appears under Accounts page.

## Stage 3 — Deposits and Ledger
1. Create a quote and confirm fee/net/expiry are visible.
2. Confirm memo warning requires reference code.
3. Settle a valid quote and confirm portfolio increases from ledger.
4. Wait for quote expiry and confirm expired quote cannot settle.

## Stage 4 — KYC + Cards
1. Submit KYC doc as client; status moves to `in_review`.
2. Approve KYC as admin.
3. Verify card issue remains blocked until portfolio >= $1,000 and region is US.
4. Issue card, freeze/unfreeze, and simulate purchase.

## Stage 5 — Compliance, Incidents, Audit, Exports
1. Submit service rating + assertion as client.
2. Confirm rating averages and distribution update.
3. Confirm incident register visible.
4. Export:
   - user transparency pack
   - ratings
   - incidents
   - audit log
   - compliance report (admin)
5. Verify audit integrity returns `OK`, then tamper test should show `CHECK`.
