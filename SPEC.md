# ApexTrust Banking MVP Specification (Beta)

## 1) Product Purpose
ApexTrust Banking is a white-label bitcoin banking experience designed to feel like a regulated institution while running as a local demo-grade MVP. The focus is trust and transparency: clear compliance posture, measurable service quality, auditability, and strong user/accountability workflows.

## 2) Branding and Naming Rules (Mandatory)
- Brand: **ApexTrust Banking**.
- Replace all “Nexus Financial” references with “ApexTrust Banking”.
- Email aliases:
  - `admin@nexus.*` -> `admin@apextrust.*`
  - `demo@nexus.*` -> `demo@apextrust.*`
- Reference code prefix: `APT-`.
- localStorage names/prefixes must use `apextrust`.

## 3) MVP Surface Areas

### Client pages
1. Landing
2. Sign Up / Sign In
3. Dashboard
4. Accounts
5. Deposits
6. KYC
7. Cards (GEM-ATR)
8. Compliance Center
9. Settings

### Admin pages
1. Admin Dashboard
2. Clients
3. Deposits
4. Cards
5. KYC Records
6. Compliance/Governance
7. Ops/Audit Logs

## 4) Core Functional Requirements

### 4.1 Signup Provisioning
On successful signup:
- Create profile record.
- Assign `client` role.
- Provision region-specific bank account rails.
- Generate immutable client reference code `APT-XXXXXX`.
- Log event in audit chain.

### 4.2 Regions and Rails
Supported region/account formats:
- US: ACH routing + account number
- UK: FPS sort code + account number
- MX: SPEI CLABE
- BR: PIX key (email-style)
- EU: SEPA IBAN + BIC

### 4.3 Deposits
User can create deposit request:
- Input amount and choose rail/account.
- Generate quote with:
  - FX/rate,
  - fee,
  - net settlement,
  - expiry timestamp.
- Show transfer instructions and highlight that memo/description must include reference code for auto-processing.
- Enforce expiry: expired quotes cannot be settled automatically.
- Simulate settlement into ledger entries.

### 4.4 KYC Gate
KYC statuses: `pending`, `in_review`, `approved`, `rejected`.
- KYC workflow includes document upload metadata + admin decision simulation.
- Feature gates depend on KYC approval.

### 4.5 Card Eligibility (GEM-ATR)
Card issue allowed only when all are true:
- KYC status = approved
- Portfolio value >= $1,000
- Region = US
Otherwise show clear blocking reasons.

### 4.6 Ledger
Balances must be derived from ledger entries (not manually assigned totals).
- Entry fields: id, clientId, type, amount, currency, direction, timestamp, source.
- Display derived portfolio and activity timeline.

### 4.7 Audit and Integrity
Audit log must be append-only for UI actions.
- Hash-chain links each record (`hash(previousHash + recordPayload)`).
- Integrity check reports `OK` if full chain validates; `CHECK` if tampered.
- Export audit log to JSON.

### 4.8 RLS Simulation
Non-admin users can only view own records (client filtering by `clientId`).
Admins can view all records and governance artifacts.

## 5) Compliance and Trust Modules

### 5.1 Compliance Center (Client + Admin context)
Posture fields:
- KYC/AML
- Sanctions
- Data protection
- Incident response
- Change management
- Vendor risk

Service status / SLA KPIs:
- Uptime %
- p95 latency
- Error rate
- Last deploy timestamp
- Last incident timestamp

### 5.2 Ratings and Assertions
User rating model:
- Reliability 1–5
- Support 1–5
- Transparency 1–5
- Optional assertion text
- Optional comment

System provides:
- Aggregate averages
- Distribution histogram/counts
- Export ratings JSON

### 5.3 Incidents
Incident schema:
- `severity`: sev-1 / sev-2 / sev-3
- `status`: investigating / monitoring / resolved
- impact
- mitigation
- RCA
- createdAt / updatedAt / resolvedAt
- owner

Export incidents JSON.

### 5.4 Reports and Exports
Required exports:
- User Transparency Pack (client scope)
- Compliance Report (admin scope)
- Ratings export
- Incidents export
- Audit log export
All downloads must be valid JSON.

## 6) Single-File MVP Technical Constraints
- `app/index.html` is self-contained with embedded CSS + JS.
- No runtime dependencies required.
- No console errors in normal navigation flow.
- State persisted in localStorage (`apextrust_*` keys).

## 7) Data Model (Demo)

### Entities
- User
- Account
- DepositQuote
- DepositRequest
- LedgerEntry
- KYCRecord
- Card
- CompliancePosture
- Incident
- Rating
- AuditEvent
- PolicyConsent

### Key Relationships
- User 1..N Accounts
- User 1..N LedgerEntries
- User 1..N Deposits
- User 1..1 KYCRecord
- User 1..N Cards
- User 1..N Ratings
- AuditEvent is global append-only chain

## 8) User Flows
1. Visitor lands -> signs up -> auto-provision account + reference code.
2. User opens Deposits -> requests quote -> sees expiry + memo requirement.
3. User settles simulated deposit before expiry -> ledger updated -> dashboard KPI refresh.
4. User submits KYC -> admin approves -> card eligibility recalculated.
5. Eligible US user issues card -> can freeze/unfreeze and simulate purchase.
6. User submits service rating/assertion.
7. Admin monitors compliance posture/incidents/audit chain and exports reports.

## 9) Acceptance Criteria (Pass/Fail)
- All listed client/admin pages reachable from nav.
- Signup automatically creates profile, role, account rails, reference code.
- Deposit quote expiry enforced.
- Memo/reference instruction prominently displayed.
- Card issuance blocked unless KYC approved + >=$1,000 portfolio + US region.
- Audit integrity check returns OK by default and CHECK when tampered.
- All required exports download valid JSON.
- Admin views reflect aggregate platform state.
- Branding and key prefixes fully migrated to ApexTrust / APT / apextrust.

## 10) Out of Scope (MVP)
- Real payment rail integrations.
- Real KYC API integration.
- Real card processor integration.
- Production security hardening and legal disclosures.
