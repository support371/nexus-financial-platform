# Task Proposals from Codebase Review

I reviewed repository documentation and identified concrete follow-up tasks for ApexTrust Banking.

## 1) Typo task
**Title:** Polish documentation language and heading consistency.

- **Issue found:** Some docs may drift in capitalization and institutional tone.
- **Proposed fix:** Enforce style guide and naming consistency (`ApexTrust Banking`, `APT-`, `apextrust_*`).
- **Why this matters:** Maintains bank-grade trust and presentation quality.
- **Acceptance criteria:** All primary docs use consistent naming and polished grammar.

## 2) Bug-fix task
**Title:** Validate quick-start flow remains runnable from a fresh clone.

- **Issue found:** Demo instructions can break if app entrypoint changes.
- **Proposed fix:** Keep `app/index.html` as stable MVP entrypoint and verify periodically.
- **Why this matters:** Ensures users can run the demo without setup friction.
- **Acceptance criteria:** Quick-start steps produce a working UI from a clean checkout.

## 3) Documentation discrepancy task
**Title:** Keep implementation status aligned with roadmap claims.

- **Issue found:** Roadmap and current implementation can diverge over time.
- **Proposed fix:** Maintain a clear split between “current MVP” and “future architecture”.
- **Why this matters:** Prevents confusion for contributors and evaluators.
- **Acceptance criteria:** README and SPEC always reflect present behavior accurately.

## 4) Test-improvement task
**Title:** Add CI checks for docs-to-artifact consistency.

- **Issue found:** Documentation quality and entrypoint validity are not automatically enforced.
- **Proposed fix:** Add CI script to verify required files and lint markdown.
- **Why this matters:** Prevents drift and regressions in delivery quality.
- **Acceptance criteria:** CI fails when documented artifacts are missing or docs quality checks fail.
