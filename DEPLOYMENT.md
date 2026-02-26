# ApexTrust Banking Deployment Tracker (Template)

## 1) Release Metadata
- Project: ApexTrust Banking
- Environment: __________________
- Build version/tag: __________________
- Commit SHA: __________________
- Date/time (UTC): __________________
- Released by: __________________

## 2) Deployment URL
- Live URL: `https://<placeholder-url>`
- Admin URL: `https://<placeholder-url>/admin` (if applicable)

## 3) Pre-Deployment Checklist
- [ ] Pull latest branch and verify clean git state.
- [ ] Confirm branding strings use ApexTrust Banking.
- [ ] Confirm `APT-` reference code format.
- [ ] Confirm localStorage prefixes are `apextrust`.
- [ ] Run smoke tests from `docs/TEST_PLAN.md` or project checklist.
- [ ] Validate JSON export functions in UI.

## 4) Deploy Steps (Placeholder)
1. Build/package steps: __________________
2. Upload/release command: __________________
3. Cache invalidation/CDN purge: __________________
4. Post-deploy health check command: __________________

## 5) Post-Deployment Validation
- [ ] Landing page loads without console errors.
- [ ] Sign up provisions account + `APT-` reference code.
- [ ] Deposit quote shows expiry and memo requirement.
- [ ] Card eligibility gate enforces KYC + portfolio + US region.
- [ ] Audit chain verification returns expected status.
- [ ] Admin pages render and display platform state.

## 6) Rollback Plan
- Previous stable version/tag: __________________
- Rollback command/process: __________________
- Data impact notes: __________________
- Communication owner: __________________

## 7) Redeploy Procedure (Placeholder)
Use this section when a hotfix is required.
1. Check out hotfix branch.
2. Apply patch and run smoke tests.
3. Create release candidate tag.
4. Redeploy using same process as section 4.
5. Verify incident/log annotations completed.

## 8) Change Log Summary
- Added/changed components: __________________
- Known limitations: __________________
- Follow-up tasks: __________________
