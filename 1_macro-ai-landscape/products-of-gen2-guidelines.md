# Building the Products of 2027

Guidelines for building Phase 3+ AI products that understand strategy, not just patterns.

## Design Principles

- **Surfaces for oversight, not control** — Design for exception handling and strategic guidance rather than operational control
- **Show the reasoning** — Users need to see why the AI made decisions, not just what it did
- **Make delegation explicit** — Clear controls for what AI handles autonomously vs what requires approval
- **Design for trust-building** — UI should help users understand AI capability before delegating decisions

## Getting to Phase 2 & 3

- **Build teaching systems** — Must have mechanisms for humans to teach and correct constantly
- **Capture the learning loop** — Every correction and override is training data for strategic understanding
- **Make implicit explicit** — Force users to articulate why they override decisions—that's strategic context
- **Observation before action** — Products must watch before they act; data collection precedes automation

## Human at Decision Gates

- **Classify by stakes and trust** — Assign autonomy levels: human-only / approval required / notification / fully autonomous
- **Stakes determine gates** — High-impact decisions stay human even at Phase 4 capability
- **Trust compounds over time** — Same action might require approval initially, then just notification, then full autonomy
- **Let users define their gates** — Risk tolerance varies; autonomy settings should be configurable

## Data & Context

- **Two types of data** — Observed data (emails, meetings, actions) and learned data (preferences, strategic intent, the "why")
- **Multi-surface capture** — Phase 3 requires presence across multiple tools and surfaces where intent forms
- **Strategic data doesn't exist yet** — You must create new capture mechanisms, not just integrate existing tools
- **Context compounds** — Each interaction adds to understanding; long time horizons create advantage
- **High-intent surfaces** — Be present where decisions form: strategy docs, exec conversations, board meetings, key Slack threads

## Data Models

- **Beyond actions** — Capture intent, relationships, and hidden context—not just what happened
- **Model causality** — Track why decisions were made, what trade-offs were considered, what was rejected and why
- **Relationships are data** — Map connections between people, projects, goals, and strategic priorities
- **Temporal understanding** — Track how strategy evolves over time; last quarter's priority isn't this quarter's

## Defensible Moats

- **Unique strategic context** — Your moat is knowing their business strategy, competitive positioning, and decision-making philosophy
- **Data others can't replicate** — Competitive moats come from capturing context that doesn't exist in any other tool
- **Trust is the ultimate lock-in** — Phase 4 products become like co-founders; replacement risk is existential
- **Switching costs increase with phases** — Phase 1 = lose a feature, Phase 3 = lose months of strategic understanding

## Software Onboarding & Expectations

- **Software that learns** — Requires new onboarding paradigm: set expectations for observation period before value delivery
- **Treat it like talent** — Frame as "training period" similar to hiring; invest time upfront for compound returns
- **Progressive value delivery** — Start with Phase 1 capabilities day one, unlock Phase 2-3 over weeks/months
- **Communicate the learning** — Show what the AI is understanding during observation; build confidence while it learns

## Phase Progression Strategy

- **Ship Phase 1 immediately** — Deliver instant value with behavioral automation while you observe for Phase 2
- **Phase 2 is the battleground** — This is where most competition happens; must win here before advancing
- **Phase 3 is the frontier** — Nobody has solved this yet; requires new data capture and reasoning capabilities
- **Phases compound** — You can't skip levels; each phase builds on the previous one's context

## Pricing & Business Model

- **Shift from per-seat to value-based** — Phase 3+ pricing should reflect strategic leverage, not user count
- **Strategic seat pricing** — Price for executive/leadership access; they're who need Phase 3 capabilities
- **Time-to-value affects pricing** — Can't charge enterprise prices with PLG expectations; observation period requires different model
- **Align pricing with moat strength** — Phase 1 = commodity pricing, Phase 3 = strategic partner pricing

## The Complexity Advantage

Unlike SaaS where simplicity provided leverage (no-touch PLG, easy onboarding, growth hacking), **the next phase rewards complexity**:

- **Deep domain understanding** — Learning specific businesses deeply creates durability
- **High setup friction is a feature** — Observation periods and teaching create switching costs
- **Relationship-based selling** — Phase 3 requires understanding business strategy; that's sold, not self-served
- **Expertise becomes moat** — Generic is commoditized; strategic understanding is defensible

## What Unlocks Phase 3

**Data problem:**
- Capture strategic intent that doesn't exist as machine-readable data
- Be present where "why" is discussed: board meetings, strategy sessions, exec conversations
- Create mechanisms to extract implicit knowledge from founder/exec heads

**Reasoning problem:**
- Current models excel at pattern recognition, struggle with strategic reasoning
- Need causal reasoning, counterfactual analysis, trade-off evaluation
- Requires improvements in foundational model capabilities

## The Incumbent Trap

- **Adding AI to old workflows fails** — Architecture, data models, and UX all built for human-operated assumptions
- **Frankenstein experiences lose** — Half the UI for clicking, half for reviewing AI—neither works well
- **Must rebuild from scratch** — Agent-operated principles must be the foundation, not a feature layer
- **Integration strategies differ** — Phase 3 needs access to high-intent surfaces; standard API integrations insufficient

## Key Insight: Distribution vs Depth

**Old playbook (SaaS):** Maximize distribution, minimize complexity, PLG motion, land-and-expand

**New playbook (AI Phase 3):** Maximize depth, embrace complexity, relationship-based sales, learn-and-lock-in

The companies that win won't have the most users. They'll have the deepest understanding of their users' strategic context.

## What This Means for Builders

- **Pick narrow initially** — Deep domain understanding beats broad generic capability
- **Design for observation** — Product must capture context passively before it can act intelligently
- **Build for phases** — Ship Phase 1 for distribution, Phase 2 for retention, Phase 3 for enterprise value
- **Embrace longer sales cycles** — Phase 3 products are sold to leadership with strategic value props
- **Invest in trust-building** — UI, transparency, and teaching mechanisms that build confidence in AI decisions
- **Think in years, not quarters** — Strategic context compounds; moats strengthen over time horizons
- **Be present at decision formation** — Integrate where intent emerges, not just where actions execute

## Anti-Patterns to Avoid

- **Generic horizontal products** — Phase 3 requires domain depth; "AI for everyone" commoditizes
- **Promising instant value** — Creates wrong expectations when observation period is required
- **Bolting AI onto existing tools** — Incumbent approach fails; requires agent-first rebuild
- **Optimizing for PLG metrics** — Phase 3 products are sold to execs, not self-served by users
- **Ignoring the teaching loop** — Without correction mechanisms, you can't learn strategic context
- **Surface-level integrations** — Phase 3 needs deep access to high-intent surfaces, not basic API connections

