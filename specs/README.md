# Specs

Structured plans and gate outputs for features. Each feature has its own folder.

## Structure

```
specs/
├── brainstorming/
│   └── <name>/
│       └── design.md          # Design document from brainstorming
└── shaped-specs/
    └── <name>/
        ├── spec.md           # Implementation spec
        ├── quality-assurance.md   # QA evidence (when run)
        ├── security-audit.md      # Security audit report (when run)
        └── code-review.md         # Code review (when run)
```

## Paths

| Artifact | Path |
|----------|------|
| Brainstorm design | `specs/brainstorming/<name>/design.md` |
| Shaped spec | `specs/shaped-specs/<name>/spec.md` |
| QA output | `specs/shaped-specs/<name>/quality-assurance.md` |
| Security audit | `specs/shaped-specs/<name>/security-audit.md` |
| Code review | `specs/shaped-specs/<name>/code-review.md` |

Replace `<name>` with the feature or topic name (e.g. `user-auth`, `payments-feature`, `task-app`).
