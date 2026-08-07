# SEO content roadmap

Future blog topics for `src/content/blog/`, organized by search intent and
mapped to an existing service/cluster so each new post has somewhere useful
to link. This is a planning list, not a queue of drafts — nothing here has
been written yet. No search volumes are listed below because none have been
verified; prioritize by commercial proximity (how close the reader is to
needing a quote) instead.

Add new posts using the existing frontmatter shape (`src/content.config.ts`):
`title`, `description`, `publishDate`, `tags`, `cluster`, `relatedService`
(optional). See `src/components/BlogServiceCTA.astro` for how `relatedService`
surfaces a compact CTA at the end of the post.

## How to use this list

Each row is: **Topic** — working title idea, the **intent** a searcher has,
the **cluster** it belongs to, the **service** it should link to via
`relatedService`, and a **priority**. Priority is based on how directly the
topic connects to a buying decision (higher = closer to "I need to call
someone"), not on any specific keyword volume claim.

## Pool Maintenance

| Topic | Intent | Related service | Priority |
|---|---|---|---|
| What does pool cleaning cost in San Diego? | Commercial ("how much will this cost me") | `weekly-cleaning-maintenance` | High |
| Weekly vs. biweekly pool service: which does your pool need? | Commercial / comparison | `weekly-cleaning-maintenance` | High |
| How often should you clean your pool filter? | Informational, maintenance-adjacent | `weekly-cleaning-maintenance` | Medium |
| Why is my pool's pH rising and how do I fix it? | Informational / troubleshooting | `weekly-cleaning-maintenance` | Medium |
| How much chlorine does my pool actually need? | Informational, dosing question — pairs well with the volume calculator | `weekly-cleaning-maintenance` | Medium |

## Pool Equipment

| Topic | Intent | Related service | Priority |
|---|---|---|---|
| Pump running but no water flow: causes and what to check first | Troubleshooting, pre-repair-call | `pool-repair` | High |
| How long does a pool pump actually last? | Informational, replacement-timing | `equipment-installation` | Medium |
| Pentair vs. Hayward vs. Jandy: how to think about equipment brands | Comparison / consideration-stage | `equipment-installation` | Medium |
| Pool pump run schedules and San Diego electricity rates | Informational, cost-savings angle (time-of-use rates) | `equipment-installation` | Medium |

## Pool Problems

| Topic | Intent | Related service | Priority |
|---|---|---|---|
| Why is my pool losing water? Evaporation vs. an actual leak | Troubleshooting, overlaps with existing leak posts — angle this one around normal evaporation rates specifically | `pool-repair` | High |
| Salt air and pool equipment: what actually corrodes and how to slow it | Informational, coastal-specific | `pool-repair` | Medium |
| Santa Ana winds and your pool: debris, evaporation, and chemistry swings | Informational, seasonal/local | `weekly-cleaning-maintenance` | Low |
| Hard water in San Diego pools: scale, cloudiness, and what to do about it | Informational / troubleshooting | `weekly-cleaning-maintenance` | Low |

## San Diego Pool Care

(Mostly covered by the existing "How to Choose a Pool Service Company" and
"Why Regular Pool Maintenance Matters" posts — no new topics queued here
yet. Revisit once the above clusters are filled in.)

## Internal linking notes

- Every new post should link back to its `relatedService`'s service page at
  least once in the body, not just via the `BlogServiceCTA` at the end.
- Posts sharing a tag automatically surface as "Related articles" on each
  other (see `src/pages/blog/[slug].astro`) — keep tags consistent with the
  existing set (`Pool Maintenance`, `Equipment`, `Leak Detection`, `Pool
  Repair`, `Cost Savings`, `Green Pool Recovery`, `San Diego`) rather than
  inventing new ones per post.
- If a topic naturally references a specific city's conditions (e.g. coastal
  salt air), link to that location page rather than writing new location
  content — see `CLAUDE.md`'s guidance against thin/duplicate location pages.
