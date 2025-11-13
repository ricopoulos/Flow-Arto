# BRAND-ENGINE – Universal Brand Definition for Flow Studio

Purpose:
Provide a consistent way for Flow Studio agents to understand and apply a brand across any design (landing pages, dashboards, websites, components).

This is NOT a visual style guide.
It is a **machine-readable brand description** that Arto, Stylist, Builder, Curator and Maestro can use when generating or evaluating designs.

---

## 1. Brand Config Files

Each brand is defined in a JSON file:

- Location: `brands/{brand-name}.json`
- Template: `brands/_template.brand.json`

Examples:
- `brands/flow-studio.json`
- `brands/carlton-select.json`
- `brands/cdgp.json`

Agents must NEVER hardcode brand into code.
They must read from the appropriate brand config.

---

## 2. Brand Schema Overview

Each brand file MUST include:

- `meta` – name, domain, sector, maturity level.
- `voice` – tone, personality, key phrases.
- `audience` – who we're speaking to.
- `emotions` – what the brand should make people feel.
- `visual` – high-level visual direction (not tokens).
- `constraints` – what must NOT be done.
- `examples` – links to reference sites or moodboards.

Tokens (colors, typography, etc.) are derived **from this** plus the token template, not stored here.

---

## 3. Example Schema (high-level)

```jsonc
{
  "meta": {
    "name": "Carlton Select",
    "sector": "Real Estate / Foreclosure Investment",
    "domain": "carltonselect.com",
    "maturity": "established"
  },
  "voice": {
    "tone": ["confident", "calm", "expert"],
    "style": ["short sentences", "no hype", "data-informed"],
    "phrasesToAvoid": ["get rich quick", "no risk"],
    "phrasesToEmphasize": ["curated", "vetted", "high-signal", "structured"]
  },
  "audience": {
    "primary": "Accredited real estate investors",
    "secondary": "Fund managers and family offices",
    "painPoints": [
      "Too many low quality deals",
      "Time wasted on bad leads",
      "Lack of structured analysis"
    ],
    "desiredOutcomes": [
      "Fewer, better deals",
      "Higher confidence decisions",
      "Time leverage"
    ]
  },
  "emotions": {
    "shouldFeel": ["clarity", "trust", "calm control"],
    "shouldNotFeel": ["hype", "urgency panic", "gambling"]
  },
  "visual": {
    "density": "calm-medium",
    "mood": ["premium", "measured", "Miami but refined"],
    "imagery": ["properties", "maps", "data visualizations"],
    "avoidImagery": ["stocky handshake photos", "cheesy skyscraper collages"]
  },
  "constraints": {
    "mustAvoid": [
      "Flashy gradients that feel crypto-like",
      "Overloaded typography",
      "Exclamation marks in CTAs"
    ],
    "mustRespect": [
      "WCAG AA at minimum",
      "Serious tone suitable for regulated finance"
    ]
  },
  "examples": {
    "referenceWebsites": [
      "https://example.com/clean-saas",
      "https://example.com/premium-investing"
    ],
    "notes": "These are for FLAIR, not copy or structure."
  }
}
```

This structure is illustrative. Actual JSON is defined in `brands/_template.brand.json`.

---

## 4. How Agents Should Use Brand Files

**Arto (UX Strategist)**
- Reads brand config before proposing layout, hierarchy, and style directions.
- Aligns emotional tone, density, and structure with brand.

**Stylist (Design Polish)**
- Uses emotions, visual, and constraints to pick palettes, typography, and spacing.
- Ensures nothing violates brand constraints.

**Builder (Components)**
- Uses brand cues to choose component expression:
  - Radii
  - Shadow intensity
  - Layout density

**Curator (Evaluator)**
- Evaluates whether final UI feels on-brand.
- Flags mismatches between brand file and visual result.

**Maestro (Orchestrator)**
- Ensures the correct brand config file is used for each run.
- May support A/B tests with multiple brand variants.

---

## 5. Brand Selection

Brand to use can be specified via:
- Configuration flag
- Branch naming convention
- Manual instruction in the prompt

If no brand is specified, default to `brands/flow-studio.json` for Flow Studio marketing assets.

---

## 6. Extensibility

Brand config can be extended with:
- `seo` – tagline, meta description, keyword themes.
- `legal` – disclaimers required in footer.
- `localization` – primary language, region.
- `motion` – motion tolerance, energy level.

All extensions must remain machine-readable and avoid locking into specific hex codes or static tokens.

**The brand engine describes who we are and how we should feel, not the exact pixels.**
