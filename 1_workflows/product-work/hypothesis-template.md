# Hypothesis Template

## Purpose
Template for documenting product hypotheses about user pains and opportunities.

## Core Principles

Read these first—getting these wrong undermines everything downstream.

### 1. Pain vs. Opportunity Classification

**The fundamental test: Do users actively suffer from this TODAY?**

* **Current Pain**: Users complain about it now, recognize it as a problem, actively seeking solutions (even if those solutions are inadequate)
* **Future Opportunity**: Users don't know they need this yet, requires demonstrating a new paradigm or possibility they haven't imagined

**Key questions to classify correctly:**
1. Are users already trying to solve this and failing?
2. Do they frame this as a problem in their own words?
3. Or is this something they'd only understand after you show them what's possible?

**Does the solution require significant behavior change?**
* Minimal behavior change → Likely a current pain being solved
* Significant behavior change or new mental model → Likely a future opportunity
* Note: A pain can require behavior change in the solution, but users must already feel the pain

**Warning**: Don't misclassify pains as opportunities. If users actively struggle with something daily, it's a pain—even if no good solutions exist yet.

---

### 2. Problem Space, Not Features

Frame hypotheses around problem categories, not specific solutions.

**Why**: Avoids "feature soup," speaks to outcomes users care about, allows solution flexibility.

**How**: State the problem without mentioning solutions. List 3-5 specific manifestations. Let solutions emerge from examples.

**Test**: Can you state the problem independent of technology? Would users recognize the problem description?

---

### 3. Concrete Over Abstract

Users think in specific tasks ("finish report by Friday"), not concepts ("productivity").

**Why abstract fails**: No clear success criteria, feels "nice to have," hard to measure.

**Why concrete works**: Obvious failure modes, immediate user recognition, creates urgency.

**Test**: Would a user describe their problem this way?

---

### 4. Reality Check: Control, Access, and Data

Test whether your hypothesis assumes things users can't actually do or access.

**Check for:**
* **Control**: Can users enforce what solution requires? (Hierarchy, external dependencies, competing priorities)
* **System access**: Can users access/modify the systems needed?
* **Data availability**: Does solution require data users don't have or can't get?

**Classification:**
* **Imperfect but valuable** (keep it): Works 50-70% of time, partial success delivers value, surfaces needs even when can't fully solve
* **Fundamentally impractical** (remove it): Requires control/access users don't have, exceptions are the rule, unusable for most

**When constraints matter**: Add "Pushback & Reply" showing both ideal case and realistic case with constraints.

---

### 5. Individual vs. Organizational Hypotheses

These require fundamentally different framing:

**Individual**: Pain-feeler = decision-maker, bottom-up adoption, per-person metrics

**Organizational**: ICs feel pain but execs buy, top-down adoption, aggregate metrics (costs, team patterns, cultural impact)

Note which organizations suffer from this vs. which don't—organizational problems are often context-dependent.

---

## Section-Specific Guidelines

### Context (Section 2)
* Explain what this hypothesis relates to and broader project context
* Do NOT repeat the hypothesis itself—that creates redundancy
* Include: project phase, where this fits in strategy, what decisions this informs
* Reference relevant project documents for additional context

### Hypothesis Statement (Section 4)

**For current pain hypotheses:**
1. Start with what users experience: "Users waste time on X..."
2. Explain the root cause: "Because current systems do Y..."
3. Describe the consequences: "Leading to Z impact..."
4. Keep it factual and observable—avoid speculation

**For opportunity hypotheses:**
1. Start with current limitation: "Current tools only do X..."
2. State what becomes possible: "Technology could enable Y..."
3. Focus on outcomes users care about, not technology capabilities
4. Acknowledge this is aspirational, not current pain

**Universal rules:**
* Lead with the claim, details follow
* Use language users would use, not jargon
* Be specific about who, what, when, where
* Avoid hedging unless genuine uncertainty exists

### Impact (Section 6)

**Qualitative**: Keep to 2-3 impacts maximum. If you need more, use bullets.

**Quantitative**: Must include actual numbers or explicit placeholders
* Be specific about per-person vs per-organization metrics
* Use format: `[PLACEHOLDER: Specific metric to quantify]` when data doesn't exist yet
* Never present qualitative impacts as quantitative—if it lacks numbers, it's qualitative
* **Only suggest realistic, measurable metrics**: Don't propose metrics requiring data access we don't have (e.g., email search patterns, system logs we can't access)
* **Favor simple, direct metrics**: Number of messages, days elapsed, meeting count—things users can self-report or we can observe
* **Avoid theoretical percentages**: Don't suggest "percentage of work time" or similar metrics that can't be reliably measured

### Flow and Examples (Section 7)
* **Apply the real-world behavioral test**: Would users actually do this, or only theoretically? Cut scenarios that assume ideal conditions or behaviors that don't match how people actually work
* Be objective and concise—if too long, no one will read it
* Avoid colorful or dramatic language
* Focus on facts and actions, not emotions during the flow
* Keep examples tight and realistic

### Supporting Evidence (Section 9)

**CRITICAL: Never invent evidence**

If evidence doesn't exist yet, say so explicitly. Split into two sections:
* "Evidence we have": Only list what actually exists
* "Evidence we don't have yet": Be honest about gaps

This is a fundamental rule—violating it undermines all decision-making.

**Setting confidence level:**

* **High**: Universal experience + logical certainty OR strong competitor validation
* **Medium**: Pain exists but segment-specific or situation-dependent
* **Low**: Based on speculation or limited observation, not broadly validated

**Quick test**: Ask 5 people in target segment "Do you experience X?"
* 5/5 yes → High confidence (even without formal study)
* 3/5 yes → Medium confidence (need to understand who does/doesn't)
* 1/5 yes → Low confidence (might be niche or misunderstood)

**Avoid miscalibration:**
* **Over**: Basing on theory without user validation, overgeneralizing personal experience, confusing "no solution exists" with "pain must be huge"
* **Under**: Saying "no competitors so unvalidated" (wrong—might just be hard to solve), "just observation" (wrong—systematic observation of universal pain is valid), "no formal data yet" (wrong—professional consensus and logical certainty count)

**Remember**: 
* Some pains are unsolved because they're hard to solve, not because they're small
* Logical certainty counts: Static systems + dynamic needs = predictable conflicts
* Professional consensus matters even without your own data

### Counter-Hypothesis (Section 10)

**Focus on main counter-arguments only**: Don't list every theoretical objection—stick to the 2-4 strongest ones that genuinely challenge the hypothesis.

**Common blind spots to check:**
1. **Control and power dynamics**: Does solution assume users have authority they don't have? What if hierarchy or external parties override?
2. **Behavior change burden**: Is the effort to use the solution greater than the pain it solves?
3. **Privacy and surveillance concerns**: Could solution be perceived as surveillance rather than support?
4. **Existing workarounds**: Do users have informal systems that work "well enough"? What's the switching cost?
5. **Segment limitations**: Does this only apply to certain sizes, industries, or cultures? What makes some users immune?

**Good counter-hypotheses challenge:**
* Whether the pain is worth solving given implementation complexity
* Whether users will actually change behavior to adopt solution
* Whether simpler alternatives might be adequate
* Whether your understanding of the problem is correct

### How to Increase Confidence (Section 11)
* Only suggest feasible research methods
* Don't propose research that requires access to systems we don't have
* Include practical options like: user interviews, surveys, social media scraping, prototype tests
* Each method should specify what success looks like with concrete metrics

---

## Template Structure

## 1. Metadata
**Written by**: [Name]  
**Date**: [YYYY-MM-DD]  
**Last updated**: [YYYY-MM-DD]  
**Status**: [Draft | Testing | Validated | Invalidated]

## 2. Context
[One paragraph explaining what this hypothesis relates to, where it fits in the broader product or strategy, and what scope or segment this affects.]

## 3. Category
**Type**: [Current Pain | Current Opportunity | Future Pain | Future Opportunity]  
**Target audience**: [Specific user segment]  
**Frequency**: [How often users encounter this - daily, weekly, per meeting]

## 4. Hypothesis
[One clear statement of the hypothesis. What do users experience, need, or want?]

## 5. Reason
[Root cause. What fundamentally causes this problem or creates this opportunity?]

## 6. Impact
[High-level description of both qualitative impact (user experience, emotions, behavior) and quantitative impact (time, money, business metrics).]

## 7. Flow and Examples
### Primary Flow
[Detailed walkthrough of user encountering this]

### Additional Examples
[2-3 brief variations showing different contexts]

## 8. Marketing Slogan
**If solved**: "[One-liner selling the solution]"

## 9. Supporting Evidence
**Confidence level**: [High | Medium | Low]

**Evidence we have**:
* [Data, research, user feedback, or observations supporting this]
* [Sources and citations]

**Evidence we don't have yet**:
* [Be explicit about gaps]

## 10. Counter-Hypothesis
**Why this might NOT be true**:
* [Strongest arguments against this hypothesis]
* [Alternative explanation for observed behavior]
* [Reasons users might not care about solving this]

**What would invalidate this**:
* [Specific evidence that would prove this wrong]

## 11. How to Increase Confidence
**Four ways to validate or invalidate**:
1. **[Method 1]**: [Brief description of approach and what success looks like]
2. **[Method 2]**: [Brief description of approach and what success looks like]
3. **[Method 3]**: [Brief description of approach and what success looks like]
4. **[Method 4]**: [Brief description of approach and what success looks like]
