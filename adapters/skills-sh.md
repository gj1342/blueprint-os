# Using skills.sh with Blueprint OS

[skills.sh](https://skills.sh) is an open registry of reusable agent skills. Skills install directly into `.agent/skills/` — the same directory Blueprint OS uses — so they work together with no extra configuration.

---

## How it works

```
npx skills add <owner/repo>
```

This command installs one or more skills from a GitHub repo into your project's `.agent/skills/` folder. Installed skills are immediately available to your agent as Blueprint OS skills.

Skills.sh supports Cursor, Antigravity, Claude Code, Codex, Cline, Windsurf, and more — the same tools Blueprint OS targets.

---

## Discovering skills

**Option 1 — Use the find-skills skill:**

```bash
npx skills add find-skills
```

This installs a meta-skill that can search the registry for you. Then ask your agent:

```
Use the find-skills skill to find a skill for [task]
```

**Option 2 — Browse the registry directly:**

Visit [skills.sh](https://skills.sh) and search by keyword or browse by category.

**Option 3 — Search by GitHub org:**

Many popular tool maintainers publish official skills:

| Publisher | Install command | What's inside |
|---|---|---|
| Vercel | `npx skills add vercel-labs/agent-skills` | React, Next.js, Vercel deployment |
| Supabase | `npx skills add supabase/agent-skills` | Postgres, auth, storage best practices |
| Anthropic | `npx skills add anthropics/skills` | PDF, PPTX, DOCX, frontend design, MCP |
| Expo | `npx skills add expo/skills` | React Native, EAS, native APIs |
| Obra | `npx skills add obra/superpowers` | Planning, debugging, git worktrees, subagents |
| wshobson | `npx skills add wshobson/agents` | API design, testing, architecture patterns |

---

## Installing skills

```bash
# Single repo (may contain multiple skills)
npx skills add supabase/agent-skills

# Install a specific skill by name
npx skills add obra/superpowers systematic-debugging
```

Skills land in `.agent/skills/<skill-name>/SKILL.md`. Open them to inspect what was installed.

---

## Evaluating a skill after install

After installing, read the skill's `SKILL.md` and ask:

1. Does the workflow match your needs exactly? → Use as-is
2. Does it cover 70–80% of your need? → Customize it
3. Does it cover a completely different use case? → Delete it and build from scratch

---

## Customizing an installed skill

Open `.agent/skills/<skill-name>/SKILL.md` and:

- **Keep** the core workflow steps and any low-freedom (exact command) sections
- **Update** paths, naming conventions, and tool references to match your project
- **Add** a `## Project context` section at the bottom with project-specific notes
- **Remove** sections that don't apply to your stack

When your changes are substantial, rename the folder to distinguish your fork from upstream:

```
.agent/skills/supabase-postgres/     ← upstream name
.agent/skills/postgres-migrations/   ← your customized version
```

---

## Publishing your own skills

If you've built a Blueprint OS skill that others would benefit from, you can publish it to skills.sh.

**Requirements:**
- Skill must be in a public GitHub repository
- Must follow the standard `SKILL.md` format with valid YAML frontmatter
- `name` must be unique and in gerund form
- `description` must be written in third person with clear triggers

**Publishing steps:**

1. Push your `.agent/skills/<skill-name>/` folder to a public GitHub repo
2. Submit your skill at [skills.sh](https://skills.sh) (follow the site's submission process)
3. Others can then install it with `npx skills add <your-github-username>/<repo>`

**Tip:** Structure your repo so each skill is its own folder at the root — that's the convention the `npx skills add` command expects.

---

## Recommended skills for Blueprint OS workflows

These community skills complement Blueprint OS directly:

| Skill | Install | Pairs with |
|---|---|---|
| `systematic-debugging` | `npx skills add obra/superpowers` | Any execution phase |
| `writing-plans` | `npx skills add obra/superpowers` | `shaping-specs` |
| `executing-plans` | `npx skills add obra/superpowers` | After `deploying-standards` |
| `requesting-code-review` | `npx skills add obra/superpowers` | After execution |
| `api-design-principles` | `npx skills add wshobson/agents` | `discovering-standards` for API projects |
| `test-driven-development` | `npx skills add obra/superpowers` | Before writing new features |

---

## Notes

- skills.sh skills use the same `SKILL.md` format as Blueprint OS — no conversion needed
- If `npx skills add` is not available, clone the repo and copy the skill folder manually into `.agent/skills/`
- Community skills may not follow all Blueprint OS conventions — review before use
- Pin to a specific commit if you need a stable, reproducible skill version
