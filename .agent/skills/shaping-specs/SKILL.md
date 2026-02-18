---
name: shaping-specs
description: Shapes a structured spec for a feature or task by asking clarifying questions and saving the output to a persistent file. Use when the user wants to plan a feature, create a spec, write a PRD, or define what to build before coding starts.
---

# Shaping Specs

## When to use this skill

- User wants to plan a feature before implementation
- User asks to "create a spec", "write a PRD", or "shape this idea"
- A brainstorm document exists in `specs/brainstorm-<name>.md` and is ready to formalize
- User is starting work on a new feature, epic, or significant change where the approach is already decided

**If the approach is still undecided or the problem is not fully understood, run `brainstorming` first.**
Load `.agent/skills/brainstorming/SKILL.md` and complete that workflow before returning here.
The brainstorm document (`specs/brainstorm-<name>.md`) becomes the starting context for spec shaping.

## Workflow

- [ ] Check for a brainstorm document in `specs/brainstorm-<name>.md` — load it if it exists
- [ ] Load relevant standards from `standards/` if they exist
- [ ] Ask the shaping questions (see below) — skip any already answered in the brainstorm doc
- [ ] Confirm answers with the user before proceeding
- [ ] Write the spec file to `specs/<feature-name>.md`
- [ ] Summarize the spec and confirm it is ready to execute

## Instructions

### Shaping questions

Ask these questions in a conversational flow. Adapt wording to context, but cover every area:

**1. What are we building?**
- What is the feature or task in one sentence?
- What problem does it solve for the user?

**2. Who is it for?**
- Who is the primary user or system consuming this?
- Are there secondary users or systems affected?

**3. What does success look like?**
- What is the expected behavior when it works correctly?
- Are there measurable outcomes or acceptance criteria?

**4. What are the boundaries?**
- What is explicitly out of scope?
- Are there constraints (performance, security, compatibility)?

**5. What already exists?**
- Which files, modules, or components are relevant?
- Is there existing code to extend, or is this net new?

**6. What are the risks?**
- What could go wrong?
- Are there edge cases or failure modes to account for?

**7. What standards apply?**
- Which entries in `standards/` are relevant to this task?

### Spec file format

Save the completed spec to `specs/<feature-name>.md`:

```markdown
# Spec: [Feature Name]

**Date:** [YYYY-MM-DD]
**Status:** Draft | Ready | In Progress | Done

## What we're building
[One paragraph summary]

## Users and context
[Who this is for and why]

## Success criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Scope
**In scope:**
- [Item]

**Out of scope:**
- [Item]

## Relevant files and modules
- `path/to/file.ts` — [why it's relevant]

## Risks and edge cases
- [Risk or edge case]

## Applicable standards
- `standards/[file].md` — [which section]

## Implementation notes
[Any technical direction, decisions, or constraints to carry into execution]
```

### Execution hand-off

After saving the spec, tell the agent (or user) to run the `deploying-standards` skill before executing, so relevant standards are loaded alongside the spec.

After execution, consider running `quality-assurance`, `security-audit` (for auth, API, or sensitive data changes), and `code-review` before merge.

## Resources

- Run first if approach is undecided: `.agent/skills/brainstorming/SKILL.md`
- Standards reference: `standards/README.md`
- Spec output directory: `specs/`
- Deploy before executing: `.agent/skills/deploying-standards/SKILL.md`
- Quality gates after execution: `.agent/skills/quality-assurance/SKILL.md`, `.agent/skills/security-audit/SKILL.md`, `.agent/skills/code-review/SKILL.md`
