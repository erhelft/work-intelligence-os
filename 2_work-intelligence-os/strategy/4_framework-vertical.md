# Framework: Vertical Selection

## Purpose

This framework helps evaluate which industry vertical to target for building the Business Intelligence OS. The right vertical must enable both strategic learning (so we can build intelligence that matters) and viable business economics (so we can build a sustainable business).

**Critical Context**: This framework evaluates **vertical characteristics** before choosing a specific use case.

---

## The Three Requirements

Every viable vertical must satisfy three categories of criteria:

1. **Big Enough** - Business viability and scale potential
2. **Suitable for Learning** - Can we build meaningful intelligence?
3. **Approachable** - Can we actually go to market and deploy?

---

## 1. Must Be Big Enough

### TAM (Total Addressable Market)
**Question**: Are there enough companies with similar characteristics we can serve?

**Why it matters**: Need sufficient market size to build a venture-scale business

**Assessment**: 
- How many companies exist in this vertical?
- What % could realistically adopt our solution?
- What's the realistic revenue per customer?

**Examples**:
- Law firms in US: ~450K firms, ~200K with 2+ lawyers ✓
- Enterprise SaaS companies: ~50K globally ✓
- Independent coffee shops: 20K+ but low willingness to pay ✗

---

### Willingness to Pay
**Question**: Is this a high-margin business that can afford premium pricing?

**Why it matters**: Intelligence products require ongoing investment; customers need budget and perceived ROI to justify cost

**Assessment**:
- What are typical profit margins in this vertical?
- Do they currently pay for premium software/services?
- Is operational efficiency a strategic priority?

**Examples**:
- Law firms: High billable rates, already pay premium for practice management ✓
- Management consulting: Very high margins, invest heavily in productivity ✓
- Non-profit organizations: Tight budgets, low margins ✗

---

### Cross-Organization Learning Potential
**Question**: Can insights from one company in the vertical help others? Or is every organization completely unique?

**Why it matters**: 
- **Scale**: If patterns transfer, you can serve more customers faster
- **Moat**: Your product gets better faster with more data
- **Network effects**: Later entrants benefit from collective intelligence

**Assessment**:
- Do companies in this vertical face similar operational challenges?
- Are workflows, roles, and processes somewhat standardized?
- Can best practices transfer across organizations?

**Examples**:
- Law firms (same practice area): Case types repeat, client patterns similar, workflows standardized ✓
- Management consulting: Project structures similar, deliverable patterns repeat ✓
- Creative agencies: Each has unique culture, processes, and style; limited pattern transfer ✗
- Early-stage startups: Each is unique; strategic decisions don't generalize well ✗

---

## 2. Must Be Suitable for Learning

### Observable Work
**Question**: Does work in this vertical leave rich digital traces?

**Why it matters**: AI needs data to learn from. If work happens in offline conversations, whiteboards, or heads, there's nothing to learn from.

**Assessment**:
- Do they use digital communication tools? (email, Slack, calendar)
- Do they create documents that capture decisions and context?
- Can you access meeting recordings, notes, and outcomes?

**Examples**:
- Accounting firms: Highly observable (emails, spreadsheets, tax filings, billable hours) ✓
- Professional services: Very observable (emails, calendars, documents, client communications) ✓
- Creative brainstorming: Less observable (verbal discussions, design taste, intuition) ~
- Physical retail: Minimal digital traces of decision-making ✗

---

### Bounded Context
**Question**: Is work structured in relatively independent units, or is everything interconnected?

**Why it matters**: 
- **Bounded = Easier learning**: Each case/project is independent, cleaner patterns to learn
- **Interconnected = Harder learning**: Everything affects everything, complex dependencies
- **BUT**: Some interconnection is valuable (organizational coherence is the vision)

**Sweet spot**: Modular but interconnected work - some independence (learn patterns) but some connection (value in connecting knowledge)

**Assessment**:
- Is work organized into discrete projects/cases/engagements?
- Can one project largely succeed/fail independent of others?
- Or does everything affect everything else?

**Examples**:
- Law firms: Cases are largely independent, but client relationships span cases ✓ (sweet spot)
- Consulting firms: Projects bounded, but firm knowledge compounds ✓ (sweet spot)
- Early-stage startups: Product, hiring, fundraising all deeply interdependent ✗ (too interconnected)
- Transactional work (call centers): Each transaction completely independent ✗ (too bounded, less need for intelligence)

**Note**: This is about the **nature of work in the vertical**, not the specific use case.

---

### Context Richness
**Question**: Do decisions in this vertical come with rich, meaningful surrounding context?

**Why it matters**: Intelligence requires understanding *why* decisions were made, what constraints existed, what stakeholders cared about. Thin context = thin intelligence.

**Assessment**:
- Do decisions have history and background?
- Are there clear stakeholders with stated preferences?
- Can you understand constraints, trade-offs, and reasoning?

**Examples**:
- Law firms: Very rich (case history, client relationships, legal precedent, partner preferences) ✓
- Strategic consulting: Very rich (client context, market dynamics, organizational politics) ✓
- Call centers: Thin (transactional, limited context per interaction) ✗
- Simple task work: Minimal context (just execute the task) ✗

**Note**: This is independent of "Bounded Context" - you can have rich context within bounded projects.

---

### Preference Stability
**Question**: Do priorities and preferences stay relatively consistent, or do they shift constantly?

**Why it matters**: If priorities change randomly every week, learned intelligence becomes obsolete quickly. Stable enough preferences allow learning to compound.

**Assessment**:
- Do key decision-makers maintain consistent priorities over quarters/years?
- Or do strategies and priorities shift weekly?
- Is preference evolution observable and learnable?

**Examples**:
- Law firm partners: Priorities consistent for quarters/years (client preferences, work style, risk tolerance) ✓
- Established companies: Strategic priorities evolve predictably over quarters ✓
- Startup CEO during fundraising: Strategy shifts weekly based on last investor conversation ✗
- Rapidly changing industries: Constant pivots, hard to learn stable patterns ✗

**Note**: Some evolution is fine if it's observable and predictable. Avoid complete chaos or random changes.

---

## 3. Must Be Approachable

### Right-Sized Target Segment
**Question**: Can we find companies that are big enough to have budget but small enough to learn deeply?

**Why it matters**: 
- **Too small**: Can't afford premium pricing, not enough organizational complexity
- **Too large**: Context too complex to learn initially, longer sales cycles
- **Sweet spot**: Sufficient budget + manageable complexity

**Assessment**:
- What company size range should we target initially?
- Do companies at this size have dedicated budgets for productivity tools?
- Is organizational complexity manageable for initial learning?

**Examples**:
- Mid-size professional services firms (20-200 people): Budget + manageable complexity ✓
- Solo practitioners: Limited budget and organizational intelligence to build ✗
- Large enterprises (5000+ people): Too complex for initial deployment ✗

**Note**: This is about choosing **company size within the vertical**, not just the vertical itself.

---

### Low Regulation / Implementation Friction
**Question**: Can we deploy quickly without extensive compliance hurdles?

**Why it matters**: 
- High regulation = long implementation cycles = slow learning loops
- Data access blocked by compliance = can't build intelligence
- Speed to deployment = speed to learning

**Assessment**:
- Are there industry-specific regulations blocking data access?
- How long does typical software deployment take?
- Are there compliance approvals required before deployment?

**Examples**:
- Professional services (law, consulting): Manageable (client confidentiality handled with standard practices) ✓
- SaaS/Tech companies: Low friction (rapid deployment) ✓
- Healthcare: High friction (HIPAA, patient privacy, clinical workflows) ✗
- Banking/Finance: High friction (compliance, regulatory approvals, data restrictions) ✗

---

### Domain Expertise Access
**Question**: Can we access domain experts to build properly?

**Why it matters**: Building intelligence for a vertical requires understanding how the business actually works. Need access to practitioners who can teach us the domain.

**Assessment**:
- Are there former practitioners available as advisors/consultants?
- Can we hire people with domain expertise?
- Is there good public information about how the industry works?

**Examples**:
- Professional services: Many former lawyers/consultants available as advisors ✓
- Tech/SaaS: Easy to find former operators, well-documented practices ✓
- Highly specialized industries (aerospace engineering): Limited access to experts ✗
- Secretive industries: Hard to learn inside practices ✗

---

### Integration Accessibility
**Question**: Does this vertical use accessible, standard tools we can integrate with?

**Why it matters**: If the vertical uses proprietary systems that are hard to integrate with, deployment becomes extremely difficult.

**Assessment**:
- Do companies use standard SaaS tools (Google Workspace, Slack, Microsoft 365)?
- Or do they use proprietary, vertical-specific systems?
- How open are their tools to integration?

**Examples**:
- Professional services: Mostly standard SaaS tools (Google Workspace, Slack, basic practice management) ✓
- Tech/SaaS companies: Very standard tools (Slack, Notion, Google Workspace) ✓
- Healthcare: Proprietary EMR systems (Epic, Cerner) - hard to integrate ✗
- Manufacturing: Proprietary ERP systems - hard to integrate ✗
- Banking: Proprietary core banking systems - hard to integrate ✗

**Caveat**: Even within standard-tool verticals, *relevance* depends on use case. Building meeting intelligence needs calendar access (standard). Building workflow automation might need vertical-specific system access.

---

## How to Use This Framework

### Step 1: Identify Candidate Verticals
List 5-10 potential industry verticals to evaluate

### Step 2: Score Each Vertical
For each criterion:
- ✓ Strong fit
- ~ Moderate fit / Depends on specifics
- ✗ Poor fit / Deal-breaker

### Step 3: Look for Must-Haves
Any vertical with ✗ on critical criteria (TAM, Observable Work, Regulation) is likely eliminated

### Step 4: Compare Trade-offs
Remaining verticals will have different profiles. Look for:
- Which has the best overall profile?
- Which aligns best with our capabilities and resources?
- Which has the fewest deal-breaking constraints?

### Step 5: Shortlist for Deeper Research
Select 2-3 verticals for deeper investigation before final decision

---

## What Comes After Vertical Selection

Once you've chosen a vertical, the next step is **use case selection** within that vertical. That requires a different framework evaluating:

- Pain acuteness (which specific friction is worth solving?)
- Pattern repetition (which patterns repeat enough to learn?)
- Feedback loop speed (how fast can we tell if we're helpful?)
- Competitive positioning (who are we competing with?)
- Bounded scope (what's the right entry problem?)

Those questions can only be answered *after* choosing the vertical.

---

## Summary: The Three Requirements

**Big Enough**:
1. TAM - Sufficient market size
2. Willingness to Pay - Premium pricing viable
3. Cross-Organization Learning - Patterns transfer, enabling scale

**Suitable for Learning**:
1. Observable Work - Digital traces to learn from
2. Bounded Context - Modular work (but some interconnection)
3. Context Richness - Decisions have meaningful surrounding information
4. Preference Stability - Priorities consistent enough to learn

**Approachable**:
1. Right-Sized Target Segment - Budget + manageable complexity
2. Low Regulation / Implementation Friction - Fast deployment cycles
3. Domain Expertise Access - Can learn the domain
4. Integration Accessibility - Can plug into their tools

