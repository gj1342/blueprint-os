---
name: discovering-standards
description: Extracts coding patterns, conventions, and architectural decisions from an existing codebase and saves them as standards files. Use when the user asks to document standards, capture patterns, extract conventions, or onboard an AI agent to an existing project.
---

# Discovering Standards

## When to use this skill

- User asks to "document my standards", "capture my conventions", or "extract patterns from my code"
- Onboarding Blueprint OS to an existing project for the first time
- A recurring pattern has emerged that should be formalized
- Tribal knowledge exists in the code but not in writing
- Before brainstorming a new feature in an existing codebase — discover constraints first, then brainstorm within them

## Workflow

- [ ] Identify which area to document (ask user if unclear)
- [ ] Scan relevant files in that area
- [ ] Identify recurring patterns, naming conventions, and architectural decisions
- [ ] Draft a standards file and confirm with the user
- [ ] Save to `standards/<category>.md`
- [ ] Update `standards/README.md` index if the file is new

## Instructions

### Discovery areas

Approach one area at a time. Common areas to document:

- **Tech stack** — languages, frameworks, libraries, versions
- **Folder structure** — how the project is organized and why
- **Naming conventions** — files, variables, components, routes, database columns
- **Component patterns** — how UI components are structured and composed
- **API design** — endpoint naming, request/response shapes, error handling
- **Data models** — schema conventions, relationships, field naming
- **Testing approach** — test file location, naming, tooling, coverage expectations
- **Error handling** — how errors surface, are logged, and returned to clients
- **State management** — how application state is structured and updated
- **Authentication** — how auth is implemented and enforced

### Extraction process

For each area:

1. Read 3–5 representative files
2. Identify what is consistent across them (naming, structure, patterns)
3. Note any exceptions — are they intentional or accidental?
4. Write only what the agent needs to replicate the pattern, not what is obvious

### Standards file format

Save to `standards/<category>.md`:

```markdown
# [Category] Standards

**Last updated:** [YYYY-MM-DD]

## Overview
[One paragraph: what this standard covers and why it exists]

## Conventions

### [Convention name]
[Description of the pattern]

**Example:**
[code example or file path showing the pattern]

**Avoid:**
[counter-example if useful]

## Exceptions
[Known deviations and why they exist]
```

### What to capture vs. skip

**Capture:**
- Decisions that aren't obvious from reading a single file
- Patterns that repeat across the codebase
- Choices that differ from common defaults (e.g., "we use tabs, not spaces")
- Architectural boundaries (e.g., "services never import from controllers")

**Skip:**
- Things the language or framework enforces automatically
- One-off implementations with no pattern
- Preferences with no clear rationale

### File naming

Use lowercase, hyphen-separated names that match the category:

```
standards/tech-stack.md
standards/naming-conventions.md
standards/api-design.md
standards/component-patterns.md
```

## Resources

- Standards directory: `standards/`
- Standards guide: `standards/README.md`
- Next step for new feature work: `.agent/skills/brainstorming/SKILL.md` (brainstorm within discovered constraints)
- Next step before implementation: `.agent/skills/deploying-standards/SKILL.md`
