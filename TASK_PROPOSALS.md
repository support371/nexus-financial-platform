# Task Proposals from Codebase Review

I reviewed the repository contents (`README.md`) and identified four concrete tasks that map to the requested categories.

## 1) Typo task
**Title:** Fix capitalization/style typo in project heading and quick-start sentence.

- **Issue found:** The heading uses all-lowercase (`# nexus-financial-platform`) and the sentence starts with an awkward fragment (`A) Quick start (demo now): ...`).
- **Proposed fix:** Update to a polished project name and wording, e.g., `# Nexus Financial Platform` and `Quick start (demo): ...`.
- **Why this matters:** Improves professionalism and readability for first-time readers.
- **Acceptance criteria:** README heading and first paragraph are grammatically clean and consistently capitalized.

## 2) Bug-fix task
**Title:** Fix broken quick-start path by adding the referenced static entrypoint.

- **Issue found:** README instructs users to "keep single HTML, deploy to Azure Static Website," but the repository does not contain any HTML entry file.
- **Proposed fix:** Either add a minimal `index.html` for the advertised quick-start flow or update the quick-start instructions to the actual runnable path.
- **Why this matters:** Current quick start is not actionable and can block users from running a demo.
- **Acceptance criteria:** Following "Quick start" from a fresh clone results in a runnable page without guesswork.

## 3) Comment/documentation discrepancy task
**Title:** Reconcile README architecture claims with current repository state.

- **Issue found:** README describes two tracks (single HTML demo vs. Next.js + API + Postgres real build), but no supporting directories/files document or scaffold either path.
- **Proposed fix:** Expand README with explicit "Current status" and implementation plan, or add the corresponding scaffold folders and commands.
- **Why this matters:** Prevents confusion between aspirational architecture and what's currently implemented.
- **Acceptance criteria:** README clearly distinguishes present state vs. planned architecture and points to existing files/scripts.

## 4) Test-improvement task
**Title:** Add a lightweight documentation/quick-start validation test in CI.

- **Issue found:** There are no checks ensuring docs match repository artifacts.
- **Proposed fix:** Add a CI step (e.g., shell script) that validates quick-start prerequisites exist (such as `index.html` or documented app entrypoint) and runs a markdown lint/spell check.
- **Why this matters:** Prevents future drift where instructions become invalid.
- **Acceptance criteria:** CI fails when documented quick-start files are missing or README quality checks fail.
