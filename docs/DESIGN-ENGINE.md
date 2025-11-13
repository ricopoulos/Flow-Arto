# DESIGN-ENGINE.md
## Flow Studio Universal Design Intelligence

**Version:** 1.0
**Purpose:** Define a style-agnostic, intelligent design system that powers all Flow Studio projects through multi-agent collaboration.

---

## 🎯 Philosophy

Flow Studio is not a fixed design system—it's a **design intelligence engine** that adapts to any aesthetic, audience, or business context. Whether you're building a premium medical platform, a playful kids' app, a luxury real estate portal, or a minimalist SaaS product, the Design Engine provides the **principles, processes, and patterns** to create exceptional, conversion-focused experiences.

### Core Beliefs
- **Clarity over cleverness** — Users should never be confused
- **Hierarchy guides attention** — Visual weight directs the eye
- **Emotional resonance matters** — Design should feel right for the context
- **Accessibility is non-negotiable** — WCAG AA+ for all projects
- **Consistency builds trust** — Predictable patterns reduce cognitive load
- **Responsiveness is baseline** — Mobile-first, fluid layouts
- **Psychology informs design** — Leverage cognitive principles (contrast, proximity, repetition, alignment)

---

## 🧠 Core UX Principles

### 1. Clarity
Every element must have a clear purpose. Remove ambiguity through:
- Descriptive labels and microcopy
- Clear visual affordances (buttons look clickable, links are underlined or distinct)
- Predictable interaction patterns
- Progressive disclosure (show complexity only when needed)

### 2. Visual Hierarchy
Guide user attention through controlled contrast:
- **Size:** Larger elements demand attention
- **Weight:** Bold text stands out
- **Color:** High-contrast elements draw the eye
- **Position:** Top-left carries most weight in LTR languages
- **Spacing:** Whitespace creates separation and grouping

### 3. Emotional Resonance
Design should match the psychological context:
- **Trust:** Medical, finance, legal → clean, structured, professional
- **Playfulness:** Kids, entertainment → vibrant, soft, organic shapes
- **Luxury:** Real estate, premium goods → refined, spacious, exclusive
- **Efficiency:** SaaS, productivity → minimal, focused, functional

### 4. Accessibility (WCAG AA+)
- Minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation support (visible focus states)
- Screen reader compatibility (semantic HTML, ARIA where needed)
- Touch targets ≥44×44px
- Readable typography (16px minimum body, 1.5+ line-height)
- No color-only information conveyance

### 5. Consistency
Establish and maintain patterns:
- Reusable component tokens (buttons, cards, forms)
- Consistent spacing rhythm (4px/8px base scale)
- Predictable navigation and interaction
- Uniform voice and tone in copy

### 6. Responsiveness
Mobile-first, fluid layouts:
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Flexible grids, not fixed widths
- Touch-friendly interactions
- Performance-conscious assets (images, fonts)

### 7. Design Psychology
Leverage cognitive principles:
- **Contrast:** Guide attention to CTAs
- **Proximity:** Group related elements
- **Repetition:** Reinforce patterns for recognition
- **Alignment:** Create visual order
- **Hick's Law:** Limit choices to reduce decision fatigue
- **Fitts's Law:** Make important targets large and close
- **Serial Position Effect:** Place key info first or last

---

## 🎨 Dynamic Token Generation (Per-Project)

Flow Studio does **not use global tokens**. Instead, tokens are **generated dynamically** for each project based on:
- Target audience and emotional goals
- Brand attributes (if provided)
- Industry conventions and expectations
- Accessibility requirements

### Token Categories

#### 1. Colors
Generate 8–12 semantic colors with validated contrast:
- **Primary:** Main brand color (CTAs, links, key UI)
- **Secondary:** Supporting accent (highlights, secondary actions)
- **Neutral scale:** 50 / 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900
- **Surface:** Backgrounds (white, off-white, subtle tints)
- **Semantic colors:** Success, warning, error, info
- **Overlays:** Modal backgrounds, shadows

**Contrast validation required:**
- Text on surface: ≥7:1 for body, ≥4.5:1 for large text
- Interactive elements: ≥3:1 against adjacent colors

#### 2. Typography
Define font families, sizes, weights, and line heights:
- **Headings:** Serif, display, or geometric sans (brand-dependent)
- **Body:** Clean, highly readable sans-serif
- **Monospace:** Code, data, technical content (if applicable)

**Type scale:** 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 64 / 80 px
**Line heights:** 1.2–1.35 (headings), 1.5–1.7 (body)
**Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

#### 3. Spacing
4px or 8px base scale:
- **4px scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 px
- **8px scale:** 8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128 px

Apply consistently to margins, padding, gaps.

#### 4. Border Radii
- **None:** 0px (sharp, technical)
- **Subtle:** 2–4px (modern, clean)
- **Moderate:** 8–12px (friendly, approachable)
- **Soft:** 16–24px (playful, organic)
- **Pills:** 9999px (buttons, badges)

#### 5. Shadows
Elevation system (0–5 levels):
- **None:** Flat design
- **Level 1:** Subtle lift (cards on surface)
- **Level 2:** Moderate elevation (dropdowns, popovers)
- **Level 3:** Strong elevation (modals, overlays)
- **Focus:** High-contrast outline for keyboard navigation

#### 6. Motion (Optional)
Timing and easing for transitions:
- **Fast:** 150ms (hover states, toggles)
- **Medium:** 250ms (panel slides, fades)
- **Slow:** 400ms (page transitions, complex animations)
- **Easing:** ease-in-out, cubic-bezier for custom curves

---

## 🤖 Multi-Agent Collaboration

Flow Studio uses specialized AI agents that work together to produce cohesive, high-quality design outputs.

### Agent Roles

#### 1. **Arto (UI/UX Strategist)**
**Focus:** Layout, information architecture, content strategy

**Responsibilities:**
- Interpret user intent and business goals
- Define page structure (sections, hierarchy, flow)
- Create content skeletons (headlines, subheads, copy hooks)
- Map user journeys and conversion funnels
- Output: `design/layout.[project-name].md`

**Inputs:**
- User brief (audience, goals, tone)
- Industry/context research
- Existing brand guidelines (if any)

**Outputs:**
- Section-by-section layout with hierarchy
- Copy scaffolding and messaging strategy
- Interaction patterns (forms, CTAs, navigation)

#### 2. **Stylist (Design Token Generator)**
**Focus:** Visual polish, color, typography, spacing

**Responsibilities:**
- Generate project-specific design tokens
- Ensure accessibility (contrast validation)
- Define typography scale and font pairings
- Establish spacing rhythm and component styles
- Output: `design/tokens.[project-name].json`

**Inputs:**
- Arto's layout structure
- User aesthetic preferences (luxury, playful, minimal, etc.)
- Accessibility requirements (WCAG AA+)

**Outputs:**
- Complete token JSON (colors, typography, spacing, radii, shadows)
- Contrast validation report
- Font recommendations with rationale

#### 3. **Builder (HTML/CSS Developer)**
**Focus:** Semantic code, responsive implementation, accessibility

**Responsibilities:**
- Translate layout + tokens into clean HTML/CSS
- Ensure semantic, accessible markup
- Implement responsive, mobile-first layouts
- Use token-driven CSS (no hardcoded values)
- Output: `web/[project-name]/index.html` and `styles.css`

**Inputs:**
- Arto's layout.md
- Stylist's tokens.json
- User technical constraints (vanilla CSS vs Tailwind CDN)

**Outputs:**
- Semantic HTML5 with ARIA where needed
- Token-driven, mobile-first CSS
- Accessible forms, buttons, navigation
- Inline comments explaining key decisions

#### 4. **Curator (Design Evaluator)**
**Focus:** Quality assurance, critique, improvement suggestions

**Responsibilities:**
- Review all outputs vs original brief
- Evaluate UX, aesthetics, clarity, accessibility
- Identify inconsistencies or weaknesses
- Suggest A/B testing ideas or next steps
- Output: `curator/[project-name]-report.md`

**Inputs:**
- Complete design package (layout, tokens, HTML/CSS)
- Original user brief and requirements
- (Optional) Browser screenshots and console logs

**Outputs:**
- Comprehensive evaluation report
- Accessibility audit results
- Aesthetic and UX critique
- Recommendations for iteration

#### 5. **Maestro (Orchestrator)**
**Focus:** Workflow coordination, final integration

**Responsibilities:**
- Coordinate agent handoffs
- Ensure consistency across outputs
- Merge feedback and improvements
- Produce final deliverables package
- Document next steps and recommendations

**Inputs:**
- All agent outputs
- User feedback during review gates

**Outputs:**
- Final, production-ready design package
- Bootstrap/quickstart documentation
- Next-step roadmap (if applicable)

---

## 🔄 Typical Workflow

### Phase 1: Clarification
- Confirm project goals, audience, tone
- Identify aesthetic direction (luxury, playful, minimal, etc.)
- Define success metrics (conversion, engagement, trust)
- Output: **Design Brief** (in conversation or as doc)

### Phase 2: Style Exploration
- Research industry conventions and competitors
- Propose color palettes, typography, mood
- Present 2–3 directions (if requested)
- Lock in aesthetic before building tokens

### Phase 3: Token Generation (Stylist)
- Generate complete token set based on locked aesthetic
- Validate all contrast ratios (WCAG AA+)
- Document font choices with rationale
- Output: `design/tokens.[project-name].json`

**Review Gate:** User approves tokens before layout

### Phase 4: Layout & Information Architecture (Arto)
- Define page structure (sections, components)
- Create content hierarchy and messaging hooks
- Map user flow and conversion points
- Output: `design/layout.[project-name].md`

**Review Gate:** User approves layout before building

### Phase 5: Component Development (Builder)
- Translate layout + tokens into semantic HTML/CSS
- Ensure mobile-first responsiveness
- Implement accessible forms, buttons, navigation
- Output: `web/[project-name]/index.html` and `styles.css`

**Review Gate:** User reviews initial build

### Phase 6: Visual QA (Optional, MCP-Powered)
- Use Playwright MCP to capture screenshots
- Check console for errors/warnings
- Validate visual rendering across viewports
- Tools: `browser_navigate`, `browser_take_screenshot`, `browser_console_messages`

**Screenshot Policy:**
- JPEG format, quality ≈60
- Max dimensions: 1200×800px
- ≤3 screenshots per project (desktop, tablet, mobile)
- Save file path only, don't inline

### Phase 7: Evaluation & Recommendations (Curator)
- Review all outputs vs original brief
- Audit UX, aesthetics, accessibility, clarity
- Identify strengths and improvement areas
- Suggest A/B testing ideas, next features
- Output: `curator/[project-name]-report.md`

**Review Gate:** User reviews curator report

### Phase 8: Final Integration (Maestro)
- Merge all outputs and feedback
- Package final deliverables
- Document next steps
- Output: Complete design package + bootstrap docs

---

## 📦 Standard Deliverables

Every Flow Studio project produces:

1. **Design Brief** (in conversation or doc)
   - Goals, audience, tone, success metrics

2. **Layout Map** (`design/layout.[project-name].md`)
   - Section structure, hierarchy, content skeleton

3. **Token File** (`design/tokens.[project-name].json`)
   - Colors, typography, spacing, radii, shadows

4. **HTML/CSS Mock** (`web/[project-name]/index.html` + `styles.css`)
   - Responsive, semantic, accessible, token-driven

5. **Evaluation Report** (`curator/[project-name]-report.md`)
   - UX/aesthetic critique, accessibility audit, recommendations

6. **Bootstrap Documentation** (optional)
   - Quickstart guide, file structure, next steps

---

## ✅ Quality Checklist

Every Flow Studio output must meet these standards:

### Accessibility (WCAG AA+)
- [ ] Text contrast ≥4.5:1 (normal), ≥3:1 (large)
- [ ] Semantic HTML (headings, landmarks, lists)
- [ ] Keyboard navigation (visible focus states)
- [ ] ARIA labels where needed (forms, buttons, icons)
- [ ] Touch targets ≥44×44px
- [ ] Alt text for all images

### Visual Design
- [ ] Clear visual hierarchy (size, weight, color)
- [ ] Consistent spacing rhythm (4px/8px scale)
- [ ] Readable typography (16px+ body, 1.5+ line-height)
- [ ] Emotional resonance (matches context and audience)
- [ ] High-polish finish (aligned, balanced, refined)

### Code Quality
- [ ] Semantic HTML5
- [ ] Token-driven CSS (no hardcoded values)
- [ ] Mobile-first, responsive layout
- [ ] No console errors or warnings
- [ ] Inline comments for key decisions
- [ ] Accessible forms (labels, error states, validation)

### UX & Conversion
- [ ] Clear calls-to-action (high contrast, obvious)
- [ ] Logical information flow (F-pattern, Z-pattern)
- [ ] Reduced cognitive load (limited choices, progressive disclosure)
- [ ] Trust signals (testimonials, credentials, clarity)
- [ ] Fast perceived performance (no layout shift, optimized assets)

---

## 🛠️ Tools & Constraints

### Development Environment
- **Platform:** Claude Code Web (browser-based, no local installs)
- **Stack:** Vanilla HTML/CSS or Tailwind CDN (no frameworks)
- **Assets:** Google Fonts, inline SVG icons, CDN images

### MCP Tools (Optional)
Flow Studio can use Model Context Protocol tools for enhanced QA:

**Playwright MCP:**
- `browser_navigate`: Open page in headless browser
- `browser_take_screenshot`: Capture visual rendering (JPEG, ≤3 per project)
- `browser_console_messages`: Check for errors/warnings

**Usage Policy:**
- Screenshots saved to `screenshots/[project-name]-[viewport].jpg`
- Max 3 screenshots: desktop (1280px), tablet (768px), mobile (375px)
- Console checks before final delivery

---

## 🚫 Non-Goals

Flow Studio intentionally **does not**:
- Build full applications (prototypes only)
- Integrate backends or APIs (static HTML/CSS)
- Set up CI/CD pipelines (manual deployment)
- Use heavy JS frameworks (React, Vue, Angular)
- Generate production-ready code (refinement expected)
- Create real user data or metrics (conceptual only)

---

## 🧭 Review Gates (Stop & Ask)

To ensure alignment and quality, Flow Studio pauses for user approval at these checkpoints:

1. **After Design Brief** — Confirm goals, audience, aesthetic
2. **After Stylist Tokens** — Approve colors, typography, spacing
3. **After Arto Layout** — Approve structure, sections, messaging
4. **After Builder Mock** — Review HTML/CSS rendering
5. **After Curator Report** — Discuss findings and next steps

---

## 🌐 Aesthetic Profiles (Examples)

To demonstrate flexibility, here are example token directions for different contexts:

### Premium Medical
- **Colors:** Deep blue, warm gray, white, subtle gold accent
- **Typography:** Serif headings (Playfair Display), sans body (Inter)
- **Spacing:** Generous whitespace, 8px scale
- **Radii:** Subtle (4–8px), professional
- **Mood:** Trust, clarity, sophistication

### Playful Kids
- **Colors:** Bright primary palette, soft pastels, high contrast
- **Typography:** Rounded sans (Nunito, Quicksand)
- **Spacing:** Comfortable, 8px scale
- **Radii:** Soft (16–24px), organic
- **Mood:** Fun, safe, energetic

### Luxury Real Estate
- **Colors:** Navy, gold, champagne, white, charcoal
- **Typography:** Refined serif (Cormorant, Crimson Pro), elegant sans (Montserrat)
- **Spacing:** Spacious, 8px scale with large gaps
- **Radii:** Minimal (0–4px), architectural
- **Mood:** Exclusive, refined, aspirational

### Minimalist SaaS
- **Colors:** Monochrome with single brand accent (blue, green, purple)
- **Typography:** Geometric sans (Inter, DM Sans, Work Sans)
- **Spacing:** Tight, efficient, 4px scale
- **Radii:** Moderate (8px), functional
- **Mood:** Efficient, modern, focused

---

## 🎓 Learning Resources

For deeper understanding of Flow Studio's design principles:

- **Accessibility:** [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- **Typography:** [Practical Typography (Matthew Butterick)](https://practicaltypography.com/)
- **Color Theory:** [Refactoring UI Color Palette](https://www.refactoringui.com/)
- **Design Psychology:** *100 Things Every Designer Needs to Know About People* (Susan Weinschenk)
- **Responsive Design:** [Every Layout](https://every-layout.dev/)

---

## 📝 Version History

- **1.0** (2025-11-12): Initial release — universal design intelligence spec

---

## 🚀 Getting Started

To use Flow Studio in Claude Code Web:

1. Read this DESIGN-ENGINE.md
2. Provide a project brief (audience, goals, tone, aesthetic)
3. Specify deliverables (layout, tokens, HTML/CSS, report)
4. Flow Studio will execute the multi-agent workflow phase-by-phase
5. Review and approve at each checkpoint
6. Receive final design package with all artifacts

---

**Flow Studio: Design Intelligence, Not Design Systems.**
