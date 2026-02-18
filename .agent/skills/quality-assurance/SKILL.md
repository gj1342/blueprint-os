---
name: quality-assurance
description: Adds or updates tests to validate behavior against acceptance criteria. Use when the user asks to add tests, run QA, validate acceptance criteria, or ensure test coverage after implementation. Applies to frontend and backend code.
---

# Quality Assurance

## When to use this skill

- Implementation is complete and tests need to be added or updated
- User asks to "add tests", "QA", "validate acceptance criteria", or "test coverage"
- Spec has success criteria that require test evidence
- Before merge when quality gates are in use

## Workflow

- [ ] Load the spec for the current task from `specs/<feature-name>.md`
- [ ] Identify acceptance criteria and success criteria from the spec
- [ ] Load `standards/testing-approach.md` if it exists
- [ ] Add or update tests to cover the acceptance criteria
- [ ] Record test coverage or evidence in the spec or a brief report
- [ ] Flag auth, API, or sensitive data changes for security-audit if applicable

## Instructions

### Test scope by layer

| Layer | Test types | Examples |
|-------|------------|----------|
| Frontend | Unit, integration, E2E | Components, hooks, user flows |
| Backend | Unit, integration, API | Services, handlers, database |
| Shared | Unit | Utilities, validation, data transforms |

Follow project conventions in `standards/testing-approach.md` when present. If no testing standard exists, use common patterns for the stack (e.g., Vitest/Jest for unit, Playwright/Cypress for E2E).

### Acceptance criteria mapping

For each unchecked success criterion in the spec:

1. Determine the test type needed (unit, integration, E2E)
2. Write the test
3. Run the test and confirm it passes
4. Update the spec to mark the criterion as verified or add a brief evidence note

### Evidence recording

Add a section to the spec or append a note:

```markdown
## Test evidence
- [Criterion X]: Covered by `path/to/test.ts` — passes
- [Criterion Y]: Covered by integration test in `path/to/integration.test.ts`
```

### Security-sensitive changes

If the implementation touches authentication, API security, or sensitive data handling, note that the `security-audit` skill should be run before merge.

## Handoff

- If auth/API/sensitive data: recommend running `security-audit` next
- Otherwise: recommend running `code-review` before merge

## Resources

- Spec directory: `specs/`
- Testing standards: `standards/testing-approach.md`
- Next step: `.agent/skills/security-audit/SKILL.md` (for auth/API/sensitive) or `.agent/skills/code-review/SKILL.md`
