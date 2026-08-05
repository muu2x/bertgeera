CLAUDE.md
Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

Tradeoff: These guidelines bias toward caution over speed. For trivial tasks, use judgment.

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

These guidelines are working if: fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# PROJECT: Clover

## What we're building
Clover is a **direct-to-consumer (B2C) pet memorial**. An owner whose pet has died gets a crafted, shareable digital tribute + a downloadable keepsake — built on the same content engine as its sibling human product, **Meadow** (a *separate* project/brand), but with a deliberately different soul.

**Don't confuse Clover with its siblings.** Clover is specifically the **memorial ebook/tribute for a pet who has died** (real captured media, remembrance). **Meadow** is the *human* memorial (shares this engine, firewalled brand). **Marigold** is a **separate** interactive/**virtual living-pet** product (the "Nintendogs" idea) — a different engine and soul that Clover shares nothing with. The whole "3D / animated / interactive pet model" category is **Marigold's, not Clover's** (closed for Clover in [`docs/PET_DIMENSIONAL_MEDIA_DECISION.md`](docs/PET_DIMENSIONAL_MEDIA_DECISION.md)); Clover's RED LINE (invariant #2) is the boundary.

**Clover and Meadow share an engine, not a brand.** Meadow is reverent, restrained, artistic — dignity *is* the product, and it moves the circle who knew the person. Clover is **warm, celebratory, a little "meme"** — *"he was the bestest boy, in a better place now, I miss him — haha remember when he…"*. And the key asymmetry: a pet is **universally relatable**. A good boy looking back into the sunset makes a *stranger* tear up — a human tribute only moves people who knew them. So a Clover tribute is inherently **shareable**, and social sharing is a real growth channel, not an afterthought. Keep the two **firewalled**: no cross-branding, never "Meadow also does pets." Full rationale + architecture: [`docs/CLOVER.md`](docs/CLOVER.md).

The reused engine (brand-neutral, from Meadow): grounded AI narrative, the keepsake reader / pagination / exporter, the media pipeline, the design system.

## Tone & soul (what makes Clover *Clover*)
- **Warm and celebratory, not solemn.** Made to raise a smile through the tears. Face-forward, joyful real media is welcome — the opposite of Meadow's restraint.
- **Shareable by design.** The artifact should make even a stranger feel something → they share it. Optimize the public tribute + its share card for that moment.
- **Craft, not cheap.** "Meme" is the *register*, not the quality bar. Heartfelt and well-made — never a low-effort template or an ironic joke.
- Motion can be playful; still honor `prefers-reduced-motion` and the LCP budget.

## Stack (authoritative — inherited from the shared engine)
- **Frontend:** Next.js (App Router). Keep the serve layer host-agnostic.
- **API/compute:** TypeScript, Lambda-shaped behind an HTTP API.
- **DB:** PostgreSQL.
- **AI:** Amazon Bedrock — **Claude Haiku 4.5** (`anthropic.claude-haiku-4-5`) default, **Claude Sonnet 5** (`anthropic.claude-sonnet-5`) premium. NOT "Claude 3.5" (retired). **Load the `claude-api` skill before writing any Bedrock/Claude code.**
- **Media:** browser → S3 (presigned) → transcode → CDN. Media never flows through the API.
- **Keepsake export:** HTML → PDF/EPUB from the same reader components.

## Non-negotiable invariants (retooled for a B2C pet product)
1. **Account data isolation.** An owner can only ever read their own pets' data. Enforce at the data layer; **fail closed** (missing/invalid identity → zero rows, never everything). *Clover has NO funeral-home tenant — the isolation key is the owner account, not a `funeral_home_id`.* Any PR touching data access includes a test proving owner A can't read owner B's rows.
2. **The AI must never hallucinate.** The narrative reshapes the owner's **provided** facts only — never invents stories about their pet. "Invent nothing" prompt + programmatic grounding validation + **owner review before anything goes public**. **RED LINE (kept from Meadow):** no synthetic/cloned pet voice, no "deadbot," no generated likeness — **real captured media only.** *"Voice" = the owner's real captured audio (the pet's own bark/purr/collar-jingle, or the owner's own voice); a pet is never made to "speak."*
3. **Warm, shareable, still fast.** The public tribute is a joyful, share-optimized experience. Playful motion is fine; always honor `prefers-reduced-motion`; **LCP < 2.0s on 4G.**
4. **Accessibility is a launch gate:** WCAG 2.2 AA. Grieving people of every age and ability.
5. **Normal privacy/security — NOT the human-death compliance apparatus.** Pets have no legal personhood, so we drop the funeral-grade Law 25 / PIPEDA deceased-person machinery (formal PIA / ROPA / retention records / DPIA, funeral residency mandates). Keep the **normal** consumer basics: protect the owner's PII (email, payment), encrypt in transit + at rest, don't leak data across accounts, a plain privacy policy + terms of service. Nothing heavier.
6. **Media never flows through the API** — browsers upload directly to S3 via presigned URLs.
7. **Per-tribute cost target.** Lower price point than the human product, so cost discipline matters — guard transcode + CDN egress; cache aggressively.

## Money & units
Direct-to-consumer — **no wholesale, no reseller.** Indicative (validate, nothing locked): a one-time keepsake (tribute + ebook) ~**$19–49**; optional hosted "living page" longevity fee; physical add-ons (QR tag, memorial print). Prices CAD unless noted.

## Working with agents & verification
- Specialist subagents are in `.claude/agents/`. Route work to them.
- **Verify experience work with the Playwright MCP** (`.mcp.json`) — screenshot + interaction proof of the tribute + share card, not just unit tests.
- **Load the `claude-api` skill before any Bedrock/Claude code** — the source of truth for model IDs, structured outputs, prompt caching.

## Project management & conventions
- **Entry:** [README.md](README.md). **North-star:** [docs/CLOVER.md](docs/CLOVER.md). **Build checklist:** [docs/ROADMAP.md](docs/ROADMAP.md).
- **Commits:** Conventional Commits (`type(scope): summary`); branch `type/short-desc` off `main`.
- **TODO seam:** `TODO(scope):` / `FIXME(scope):` / `HACK(scope):` / `SECURITY(scope):`, each linked to a ROADMAP item. Grep: `TODO(\|FIXME(\|HACK(\|SECURITY(`.
- **Change logging:** update [CHANGELOG.md](CHANGELOG.md) `[Unreleased]` with any user-facing/architectural change. Version in [VERSION](VERSION) (semver).
- **Keep `docs/` in sync** with the code it describes.

## Origin note (read once)
This repo was **seeded from the Meadow engine.** Code symbols and some docs still say `meadow` / `memoir` / `funeral_home` until the rename + re-architecture pass (see [docs/ROADMAP.md](docs/ROADMAP.md) Phase 0 and [docs/CLOVER.md](docs/CLOVER.md) §3): the B2B2C tenancy / wholesale billing / admin-console plumbing is being **stripped** for the thin B2C model. Don't treat leftover Meadow naming as canonical — treat CLOVER.md as the intent.
