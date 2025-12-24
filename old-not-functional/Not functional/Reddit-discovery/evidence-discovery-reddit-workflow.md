# Evidence Discovery - Reddit Workflow

## Purpose
Operational workflow to search Reddit for evidence supporting or invalidating a product hypothesis and produce a structured evidence report with quantified findings.

## Prerequisites & Inputs

**Required:**
- [ ] Hypothesis file path: _______
- [ ] Output folder path: _______

**Optional:**
- [ ] Custom search queries (overrides hypothesis-derived queries): _______

**This Workflow Will Produce:**
- [ ] File: `evidence-reddit-[hypothesis-name]-[date].md`

## Tools

**This workflow requires Apify MCP** for Reddit scraping.

**Actor:** `harshmaur/reddit-scraper` - sorts by top posts from past year, $0.02 start + $0.002 per result

## Goal

Validate or invalidate a specific product hypothesis by gathering real-world evidence from Reddit discussions, quantifying support/opposition, and presenting findings in a scannable, decision-ready format that enables confidence level adjustments.

## Chat Management

**Start a fresh conversation for each hypothesis test.**

**Why:** Reddit scraping returns large datasets with multiple posts and comments. Each hypothesis test is independent and doesn't need context from previous tests.

**Before starting:**
* Verify clean chat (no previous hypothesis evidence in context)
* If conversation contains previous hypothesis research, start new chat
* Exception: When comparing evidence across related hypotheses

## Workflow (gated — user approves at each step)

### Step 1: Hypothesis Intake and Query Planning

**Objective:** Extract testable claims from hypothesis and design targeted Reddit searches before spending on API calls.

* User provides hypothesis file path
* You read hypothesis file and extract:
  * Core claim (Section 4: Hypothesis)
  * Target audience (Section 3: Category)
  * Current confidence level (Section 9: Supporting Evidence)
  * Specific pain points or opportunities mentioned (Section 7: Flow and Examples)
* Generate 3–5 search query variations based on hypothesis
* Identify 3–5 relevant subreddits based on target audience
* Define what would constitute supporting vs. invalidating evidence

**Deliverable: Search Plan**

Present the search plan in this format:

**Hypothesis Being Tested:**
[One-sentence summary of the hypothesis]

**Current Confidence Level:** [High/Medium/Low]

**Target Subreddits:**
1. r/[subreddit] - [why relevant]
2. r/[subreddit] - [why relevant]
3. r/[subreddit] - [why relevant]

**Search Queries:**
1. "[query 1]" - [what this tests]
2. "[query 2]" - [what this tests]
3. "[query 3]" - [what this tests]

**Estimated Cost:**
* Searches planned: 5 (minimum for 50 results)
* Results per search: 10 (to control costs)
* Estimated total: 5 × $0.07 ≈ $0.35

**Gate: User approves search plan and cost estimate**

### Step 2: Search Execution and Self-Analysis

**Objective:** Execute 5 searches (50 results minimum), analyze result quality, and decide whether expansion is needed.

Execute 5 searches from approved plan with `maxPostsCount: 10` per search.

For each search:
* Use `searchSort: "top"` to prioritize high-engagement posts
* Use `searchTime: "year"` (or user-specified timeframe)
* Target specific subreddit if specified, otherwise search all Reddit
* Collect results with: title, URL, subreddit, score (upvotes), date, post body, author

**Self-Analysis of Results:**

After collecting ~50 results, analyze:
* **Relevance rate:** What % of posts are on-topic?
* **Evidence quality:** Direct mentions of the pain/opportunity vs. tangential references?
* **Adjacent signals:** Are users mentioning related pains or use cases worth exploring?

**Decide on expansion:**
* **If strong results** (60%+ relevance, clear themes, high engagement) → Proceed to Step 3
* **If weak results** (low relevance, tangential mentions only) → Recommend expanding to 3-5 additional searches with adjusted queries

**Deliverable: Search Results Summary**

If expansion is NOT needed, streamline directly to Step 3 without gating.

If expansion IS needed, present:
* **Current results:** [total posts], [% relevant], [key gaps]
* **Recommendation:** Expand with [number] additional searches focusing on [what]
* **Adjusted queries:** [list new queries]
* **Additional cost:** ~$[amount]

**Gate (only if expansion recommended): User approves expansion or proceeds with current results**

### Step 3: Evidence Synthesis and Report Creation

**Objective:** Create final evidence report with quantified findings, qualitative assessment, and raw data appendix.

Generate markdown report with these sections:

#### 1. Executive Summary
Brief statement of confidence level change (old → new), support/invalidate ratio, and 3–5 key takeaways

#### 2. Quantified Findings
Full breakdown with counts and percentages: total analyzed, supporting, invalidating, neutral, average engagement, date range, subreddits covered

#### 3. Key Claims and Evidence
Group findings by themes (both supporting and invalidating). For each theme: description, mention count, and one strong quote with attribution (user, subreddit, score, link)

#### 4. Confidence Recommendation Justification
Detailed analysis referencing the quantified data: sample size, signal strength, evidence quality, engagement, recency. Explain why confidence should change and what gaps remain. Suggest any hypothesis updates based on Reddit language.

#### 5. Adjacent Hypotheses Discovered
Capture related pain points, use cases, or alternative framings found during search. For each: brief description, relation to original hypothesis, evidence strength (mention frequency, engagement), example quote, and recommendation (test separately? part of same hypothesis? different segment?)

#### 6. Raw Source Appendix
Table with all posts: title, subreddit, score, date, classification, key claim, URL

Create the file in the user-specified output folder.

**Gate: User reviews final report**

## Output

**File Creation Instructions:**
Create a **dedicated new markdown file** in the folder specified by the user.

**File Naming:** Use format `evidence-reddit-[hypothesis-name]-[date].md`
* Example: `evidence-reddit-meeting-context-lost-2025-11-02.md`

**If no folder specified:** Ask user where to save the file before creating it.

## Next Steps

After reviewing this evidence report, would you like to:
1. Update the hypothesis file (Section 9: Supporting Evidence) with new confidence level and Reddit evidence?
2. Run additional evidence searches (different subreddits, time ranges, or queries)?
3. Expand to other platforms (Twitter, HN, forums) for broader validation?
4. Move to direct user validation (interviews or surveys)?
5. Proceed with product decisions based on current confidence level?

## Success Criteria

The evidence discovery workflow succeeds when:

* **Sufficient sample:** Minimum 50 results collected (5 searches × 10 results)
* **Relevant results:** At least 50% of posts are on-topic and classifiable
* **Quantified findings:** Clear numerical breakdown of support/opposition with percentages
* **Qualitative depth:** Key themes identified with strong quotes
* **Decision-ready:** Clear confidence recommendation with justification
* **Scannable:** Report understood in 2–3 minutes
* **Traceable:** All claims link to specific Reddit sources

## Research Quality Guidelines

### Search Quality
* Use hypothesis-derived language, not product jargon
* Target subreddits where users naturally discuss the pain (not product marketing spaces)
* Prioritize high-engagement posts (sort by "top" not "new")
* Search within past year for recency (unless testing historical patterns)
* **Community selection > keyword optimization** - Wrong subreddit can't be fixed with better keywords
* Test work-specific communities (r/sales, r/ProjectManagement) over general ones (r/productivity)

### Query Selection Guidelines
**What works:**
* Action + object phrases: "meeting preparation", "task planning", "email management"
* Specific workflow moments: before/during/after a specific activity
* Natural user language, avoid product/technical jargon

**What doesn't work:**
* Pain phrases with common words: "lost my X", "can't find X" (matches out of context)
* Full conversational sentences (too specific, miss variations)
* Single generic nouns without context (e.g., "meeting", "notes")

**Platform limitation:** Reddit search matches keywords anywhere without contextual understanding. Expect max ~50% relevance even with good queries.

### Classification Standards
* **Supporting:** Users experience the hypothesized pain/opportunity
* **Invalidating:** Users don't experience the pain, have good workarounds, or prefer status quo
* **Off-topic:** Not relevant (exclude from analysis)

### Quote Selection Standards
Select quotes with authentic user language and specific examples from high-engagement posts. Avoid cherry-picking only confirming evidence.

### Evidence Strength Assessment
* **High confidence in findings:** 50+ relevant posts, clear majority support/invalidate (70%+), high engagement, recent
* **Medium confidence in findings:** 30–50 posts, moderate majority (55–70%), mixed engagement or dates
* **Low confidence in findings:** <30 posts, unclear pattern (<55% either direction), low engagement, or mostly old

### Bias Mitigation
* Actively look for invalidating evidence, not just confirmation
* Include counter-arguments in qualitative analysis
* Note when evidence is one-sided (could indicate search bias or real consensus)
* Distinguish between "no evidence found" vs. "evidence of absence"

### When to Stop Iterating
**Pivot to different approach when:**
* Two consecutive iterations show declining relevance (e.g., 50% → 0%)
* Keyword refinement shows no improvement or gets worse
* Platform limitations discovered that can't be overcome (e.g., no contextual search)
* Cost per relevant post exceeds alternative validation methods (interviews, surveys)

**Don't:**
* Keep refining keywords when community is wrong fit
* Assume more specific keywords = better results (can match out of context)
* Iterate past fundamental platform limitations

### Capturing Adjacent Signals
* While classifying posts, note pain points or use cases users mention that aren't the primary hypothesis
* Track related themes even if tangential to main hypothesis
* These might be: different segments experiencing the pain differently, upstream/downstream problems, alternative framings
* Don't force these into supporting/invalidating classification - capture separately as adjacent signals

