# 🤖 Flow Studio AI Agents - The Real Intelligence

## What Changed?

Flow Studio has been **transformed** from a static multi-theme website into a **genuine AI-powered design agent platform**.

### Before (v1.0)
- ❌ 8 manually coded themes in `themes.js`
- ❌ No AI integration
- ❌ Agents existed only in documentation
- ❌ Manual design token creation
- ❌ Static, unchanging output
- ❌ Limited creative exploration

### After (v2.0) ✨
- ✅ **Real AI agents** powered by Claude Sonnet 4.5
- ✅ **Intelligent design generation** from brand configurations
- ✅ **Swarm coordination** (hierarchical, mesh, adaptive topologies)
- ✅ **Persistent memory** - agents learn over time
- ✅ **SPARC methodology** - systematic, professional workflow
- ✅ **20+ theme variations** generated intelligently
- ✅ **Quality assurance** - automated evaluation and refinement

---

## 🌊 The Agent Swarm

### 1. Researcher Agent
**Role:** Design Trend Analyst

**Capabilities:**
- Analyzes 2025 web design trends
- Researches color theory and palettes
- Studies typography pairings
- Identifies motion design patterns
- Provides brand-specific recommendations

**Example:**
```js
const researcher = new ResearcherAgent();
const trends = await researcher.analyzeTrends();
const brandAnalysis = await researcher.analyzeBrand(brandConfig);
```

### 2. Stylist Agent
**Role:** Visual Design Specialist

**Capabilities:**
- Generates design tokens from brand configurations
- Creates color palettes with WCAG AAA compliance
- Selects typography pairings
- Defines motion parameters
- Generates multiple theme variations

**Example:**
```js
const stylist = new StylistAgent();
const tokens = await stylist.generateTokensFromBrand(brandConfig);
const themes = await stylist.generateThemeVariations(tokens, 20);
```

### 3. Curator Agent
**Role:** Quality Assurance Specialist

**Capabilities:**
- Validates WCAG contrast ratios
- Checks brand alignment
- Audits design token quality
- Evaluates theme variations
- Generates detailed quality reports

**Example:**
```js
const curator = new CuratorAgent();
const evaluation = await curator.evaluateTokens(tokens, brandConfig);
const themeReport = await curator.evaluateThemes(themes, tokens, brandConfig);
```

### 4. Arto Agent _(Coming Soon)_
**Role:** UX Strategist
- Layout hierarchy design
- Responsive grid systems
- Component architecture

### 5. Builder Agent _(Coming Soon)_
**Role:** Component Engineer
- Semantic HTML generation
- Token-driven CSS
- Accessible components

### 6. Maestro Agent _(Coming Soon)_
**Role:** Workflow Orchestrator
- Multi-agent coordination
- Task decomposition
- Result synthesis

---

## 🚀 Getting Started

### 1. Setup

```bash
# Install dependencies
npm install

# Create .env file with your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

Get your API key from: https://console.anthropic.com/

### 2. Generate a Complete Design System

```bash
# Generate tokens, themes, and evaluation reports
node cli/flow-studio.js generate brands/flow-studio.json -o output/flow-studio
```

This will:
1. **Research** - Analyze 2025 trends and your brand
2. **Generate Tokens** - Create comprehensive design tokens
3. **Generate Themes** - Create 20 intelligent theme variations
4. **Evaluate** - QA everything for quality and accessibility
5. **Refine** - Auto-fix critical issues

**Output:**
```
output/flow-studio/
├── trend-analysis.json          # 2025 design trends
├── brand-analysis.json          # Brand-specific recommendations
├── design-tokens.json           # Complete design system tokens
├── themes.json                  # 20 theme variations
├── token-evaluation.json        # Quality report (JSON)
├── token-evaluation.md          # Quality report (Markdown)
├── theme-evaluation.json        # Theme quality & rankings
├── theme-evaluation.md          # Human-readable report
└── workflow-summary.json        # Overall summary
```

### 3. Quick Commands

**Generate tokens only:**
```bash
node cli/flow-studio.js tokens brands/flow-studio.json -o tokens.json
```

**Generate 30 theme variations:**
```bash
node cli/flow-studio.js themes design-tokens.json -c 30 -o themes.json
```

**Check agent swarm status:**
```bash
node cli/flow-studio.js swarm init
node cli/flow-studio.js swarm stats
```

**Show examples:**
```bash
node cli/flow-studio.js example
```

---

## 🧠 The Intelligence

### SPARC Methodology

Flow Studio implements Ruv's **SPARC** approach:

1. **S**pecification - Research trends, analyze brand
2. **P**seudocode - _N/A for design (future: layout algorithms)_
3. **A**rchitecture - Generate design tokens structure
4. **R**efinement - Evaluate quality, auto-fix issues
5. **C**ode - Generate themes and components

### Swarm Coordination

**Hierarchical Topology** (default):
- Maestro orchestrates workflow
- Specialized agents execute in sequence
- Results feed into next stage
- Best for complex, multi-phase projects

**Mesh Topology:**
- Agents work in parallel
- Peer collaboration
- Faster for independent tasks

**Adaptive Topology:**
- Analyzes task complexity
- Chooses best topology automatically

### Persistent Memory

Agents learn from every interaction:
```
.flow-studio/memory/
├── agent-memory.json    # All agent memories
└── workflows.json       # Workflow history
```

Agents remember:
- Previous tasks and results
- Successful patterns
- User preferences
- Quality improvements

---

## 📊 What Makes This Different?

### Old Approach (Most AI Tools)
1. User writes prompt
2. AI generates code
3. User reviews and edits manually
4. Repeat

**Problems:**
- No systematic approach
- Inconsistent quality
- No learning
- Generic output

### Flow Studio Approach (Ruv-Inspired)
1. **Researcher** analyzes trends + brand
2. **Stylist** generates tokens + themes intelligently
3. **Curator** validates quality automatically
4. **Refinement** fixes issues before delivery
5. **Memory** learns for next time

**Benefits:**
- Systematic, professional workflow
- Consistent, high quality
- Learns and improves
- Brand-aligned, on-trend output

---

## 🎨 Example: The Transformation

### Input (brands/flow-studio.json)
```json
{
  "meta": { "name": "Flow Studio" },
  "voice": { "tone": ["intelligent", "capable"] },
  "visual": {
    "colorTemperature": "cool-neutral",
    "sophistication": "premium",
    "contrast": "medium-high"
  }
}
```

### Output (20 Theme Variations)

Instead of 8 manually coded themes, you get:

1. **Perceptual Slate** - OKLCH colors, glassmorphism
2. **Kinetic Pro** - Variable fonts, spring animations
3. **Depth Premium** - 3D shadows, layered design
4. **Minimal Intelligence** - Clean, ultra-accessible
5. **Bold Gradient** - Color blocking, asymmetric grids
6. **Editorial Elite** - Type-hero, sophisticated
7. **Glassy Tech** - Frosted glass, blur effects
8. **Dark Premium** - High contrast, dramatic
9. ... 12 more creative variations

Each theme:
- ✅ WCAG AAA accessible
- ✅ Brand-aligned
- ✅ 2025 trend-informed
- ✅ Perceptually designed
- ✅ Professionally crafted

---

## 🔬 Technical Details

### Architecture

```
flow-studio/
├── lib/
│   ├── ai.js              # Anthropic API integration
│   ├── agent.js           # Base agent class
│   ├── swarm.js           # Swarm coordination
│   └── memory.js          # Persistent memory
├── agents/
│   ├── researcher.js      # Trend analyst
│   ├── stylist.js         # Design generator
│   ├── curator.js         # QA specialist
│   ├── arto.js           # (Coming soon)
│   ├── builder.js        # (Coming soon)
│   └── maestro.js        # (Coming soon)
├── workflows/
│   └── generate-design-system.js  # Main pipeline
└── cli/
    └── flow-studio.js     # Command-line interface
```

### Agent Communication

```js
// Agents thinking (AI-powered)
const result = await agent.think(task, context, options);

// Agent collaboration
const combined = await agent.collaborateWith(otherAgent, task);

// Swarm execution
const swarm = new AgentSwarm();
swarm.addAgent('researcher');
swarm.addAgent('stylist');
const result = await swarm.execute(task);
```

### AI Integration

- **Model:** Claude Sonnet 4.5 (latest, most capable)
- **Temperature:** Adaptive (0.3 for QA, 0.9 for creativity)
- **Context:** Brand config + trends + previous work
- **Output:** Structured JSON for reliability
- **Retry Logic:** Automatic retry on failures
- **Memory:** Persistent across sessions

---

## 🎯 What's Next?

### Immediate
- [x] Core agent infrastructure
- [x] Researcher, Stylist, Curator agents
- [x] Brand → Tokens → Themes workflow
- [x] CLI interface
- [x] Memory system

### Phase 2
- [ ] Arto agent (layout/UX)
- [ ] Builder agent (components)
- [ ] Maestro agent (orchestration)
- [ ] Component generation
- [ ] Full SPARC workflow

### Phase 3
- [ ] Web UI for non-developers
- [ ] GitHub Pages auto-deployment
- [ ] Real-time collaboration
- [ ] A/B testing themes
- [ ] User preference learning

---

## 💡 The Ruv "Vibe"

What we learned from claude-flow:

1. **Natural Language First** - Describe intent, not implementation
2. **Agents Are Real** - Not metaphors, actual code
3. **Memory Compounds** - Learn from every interaction
4. **Systematic Approach** - SPARC methodology
5. **Swarm Intelligence** - Multiple specialists > one generalist
6. **Persistent State** - Resume and build on previous work

Flow Studio v2.0 brings this philosophy to design systems.

---

## 🤝 Contributing

Want to improve the agents?

1. Add new capabilities to existing agents
2. Create new specialized agents
3. Improve prompts for better output
4. Add new workflows
5. Enhance memory/learning systems

---

## 📚 Learn More

- **Claude Code Web:** https://docs.claude.com/
- **claude-flow:** https://github.com/ruvnet/claude-flow
- **SPARC Methodology:** See claude-flow docs
- **Design Tokens:** https://designtokens.org/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG22/quickref/

---

**Built with:**
- Claude Sonnet 4.5 (Anthropic)
- Swarm Intelligence Architecture
- SPARC Methodology
- Love for systematic, intelligent design

*Flow Studio v2.0 - Where AI meets design excellence* 🌊
