# Evidence Discovery - Reddit Search Iterations Log

**Purpose:** Track experimental iterations to discover effective Reddit search strategies for hypothesis validation.

**Target Hypothesis:** Meeting Context Lost ([1.1_meeting-context-lost.md](../agentic-calendar/problems-opportunities/1.1_meeting-context-lost.md))

**Success Criteria:**
- 50+ posts collected
- 50%+ relevance rate (posts about work meeting preparation/context)
- Clear supporting or invalidating evidence
- Cost under $5 per iteration

---

## Iteration 1: Generic Queries on All Reddit

**Date:** 2025-11-02  
**Strategy Type:** Broad search with generic pain-point queries  
**Cost:** Unknown (partial run before iteration 2)

### What We Tried

**Queries:**
1. "preparing for meetings waste time"
2. "can't remember what we decided meeting"
3. "meeting notes scattered tools"
4. "joining meetings unprepared"
5. "finding past meeting discussions"

**Settings:**
```json
{
  "searchTerms": ["query"],
  "searchPosts": true,
  "searchComments": false,
  "searchSort": "top",
  "searchTime": "year",
  "maxPostsCount": 10,
  "subreddits": []  // Searched ALL Reddit
}
```

### Results

- **Posts collected:** ~1,375 posts total
- **Relevance rate:** 5-10%
- **Dominant subreddits:** r/BestofRedditorUpdates, r/MaliciousCompliance, personal story subreddits
- **Evidence found:** 0 relevant posts about work meeting context pain

### What Worked
- ✅ Broad query approach captured diverse language

### What Didn't Work
- ❌ Too generic - "preparing" matched dogs, passports, personal life
- ❌ No work context filters
- ❌ Searched all Reddit (dominated by high-engagement drama subreddits)

### Key Learnings

1. Generic pain language without work context = irrelevant results
2. Story/drama subreddits outrank work productivity subreddits in engagement
3. Need to add work-specific terms or target work-focused communities

### Next Iteration Strategy

Refine queries to be more meeting-specific and balance pre/post-meeting pain points.

---

## Iteration 2: Meeting-Specific Queries on All Reddit

**Date:** 2025-11-02  
**Strategy Type:** Refined queries with "meeting" in every query + pre/post balance  
**Cost:** $5.00 (hit monthly limit after 4 searches)

### What We Tried

**Queries (5 planned, 4 executed):**
1. "don't remember what this meeting is about"
2. "scrambling to prepare for meeting"
3. "what did we decide in that meeting"
4. "can't find my meeting notes scattered"
5. ~~"forgot what we discussed in meeting"~~ (not run - limit hit)

**Settings:**
```json
{
  "searchTerms": ["query"],
  "searchPosts": true,
  "searchComments": false,
  "searchSort": "top",
  "searchTime": "year",
  "maxPostsCount": 10,  // Expected 10 posts per search
  "subreddits": []  // Searched ALL Reddit
}
```

### Results

- **Posts collected:** 1,064 posts (275, 275, 275, 239 per search)
- **Relevance rate:** <5%
- **Cost per search:** ~$1.25
- **Dominant subreddits:** r/BestofRedditorUpdates, r/MaliciousCompliance, r/AITAH, r/GuyCry
- **Evidence found:** 0 relevant posts about work meeting context pain

### What Worked
- ✅ Queries included word "meeting" consistently
- ✅ Balanced pre-meeting (prep) and post-meeting (retrieval) pain
- ✅ Disabled comments (avoided additional noise)

### What Didn't Work
- ❌ **Still searched ALL Reddit** - same problem as iteration 1
- ❌ Reddit matched "meeting" in any context (relationship drama, social events)
- ❌ Story/drama subreddits dominated due to higher engagement
- ❌ **Critical cost miscalculation:** Expected 50 posts ($0.70), got 1,064 posts ($5.00)
- ❌ **maxPostsCount misunderstanding:** Set to 10 expecting 10 posts, got 275 per search (actor scraped full thread content despite comments disabled)

### Key Learnings

1. **Adding "meeting" to queries didn't solve the targeting problem** - Still need subreddit focus
2. **Reddit search matches ANY word, not work context** - Need community-level filtering
3. **Cost scales with actual data returned, not intended limit:**
   - `maxPostsCount: 10` means "top 10 threads" not "10 total items"
   - Actor still scrapes full post content and metadata even with comments off
   - Each search returned 25-27x more data than expected
4. **Must test single search first to validate cost** - Estimates unreliable without testing
5. **Query refinement alone cannot fix wrong search scope** - Need structural approach change

### Next Iteration Strategy

**Stop searching all Reddit. Switch to subreddit-targeted search.**

**Proposed Iteration 3:**
- Run ONE small test search directly on r/productivity:
  - `subreddits: ["productivity"]` (not all Reddit)
  - `maxPostsCount: 3` (start smaller to control cost)
  - Simple keyword: "meeting preparation" OR "calendar"
- Measure: actual cost, relevance rate, evidence quality
- If >30% relevant → expand to more queries/subreddits
- If <30% relevant → try different subreddit or pivot strategy

**Budget:** $0.30-0.50 for single test search

---

## Iteration 3: FREE Web Search Discovery (FAILED)

**Date:** 2025-11-04  
**Strategy Type:** Google site search via web_search tool (free discovery before paid Apify)  
**Cost:** $0.00

### What We Tried

**Approach:** Test 5 keywords × 7 subreddits using Google site search (`site:reddit.com/r/[subreddit] "[keyword]"`) to identify which subreddits have meeting discussions before paying for Apify.

**Searches Planned:** 35 via web_search tool

### Results

- **Posts collected:** 0
- **Relevance rate:** N/A
- **Evidence found:** None
- **Tool output:** Generic AI-generated recommendations instead of actual Reddit posts

### What Worked
- ✅ $0 cost

### What Didn't Work
- ❌ web_search tool returns AI summaries, not actual Reddit posts
- ❌ Cannot validate subreddit relevance without post data

### Key Learnings

1. **web_search tool unsuitable for Reddit discovery** - Returns generic advice, not posts
2. **Free discovery not viable** - Must use paid Apify from start
3. **Targeting strategy sound** - Subreddit + keyword approach still valid

### Next Iteration Strategy

Move to small paid Apify tests with `harshmaur/reddit-scraper` (2 subreddits, expected cost $0.20-0.40)

---

## Iteration 4: Subreddit Discovery via Small Apify Tests

**Date:** 2025-11-04  
**Strategy Type:** Paid Apify discovery with minimal post counts  
**Cost:** $0.16

### What We Tried

**Approach:** 2 Apify searches to validate subreddit relevance before scaling

**Searches:** r/productivity + r/managers with "meeting preparation"  
**Settings:** `searchSort: "top"`, `searchTime: "year"`, `maxPostsCount: 2`  
**Expected Cost:** ~$0.20-0.40

### Results

| Metric | r/productivity | r/managers |
|--------|---------------|------------|
| Posts returned | 14 | 25 |
| Relevance rate | 87.5% | 37.5% direct (75% meeting-related) |
| Engagement range | 3-345 upvotes | 159-1409 upvotes |
| Date range | Nov 2024 - Oct 2025 | Dec 2024 - Sep 2025 |

**Total Posts:** 39  
**Actual Cost:** $0.16 ($0.08 actor starts + $0.08 for 39 results @ $0.002/result)  
**Cost per search:** ~$0.04  
**Dataset IDs:** 2ugDhkril15NgnZc5 (productivity), ty3tYoXGkXSyj3OJG (managers)

### What Worked

- ✅ **r/productivity = HIGH VALUE** - 87.5% relevance, authentic meeting prep anxiety
- ✅ **Keyword "meeting preparation" effective** - Captures prep anxiety, prep time, showing up unprepared
- ✅ **Cost dramatically lower** - $0.04/search vs $1.25/search in Iteration 2 (31x cheaper)
- ✅ **Recent & engaged posts** - All within past year, 3-345 upvotes

### What Didn't Work

- ❌ **maxPostsCount doesn't limit results** - Set to 2, got 14 & 25 posts (actor behavior unclear)
- ❌ **r/managers = MEDIUM VALUE** - 37.5% direct relevance (management issues ≠ personal prep pain)

### Key Learnings

1. **Subreddit targeting works** - 87.5% relevance vs <5% in all-Reddit searches
2. **Cost model: $0.02 start + $0.002/result** - Scale-friendly pricing
3. **r/productivity validated as primary target** - Highest signal subreddit found
4. **Evidence exists for hypothesis** - Users express meeting prep anxiety and wasted time
5. **maxPostsCount unreliable** - Don't use for cost control, returns more than specified

### Next Iteration Strategy

**Option A: Deep dive r/productivity (RECOMMENDED)**
- Test 4 additional keywords in proven high-value subreddit
- Keywords: "calendar context", "meeting notes lost", "meeting action items", "meeting follow ups"
- Expected: 50+ posts @ 87.5% relevance rate, cost ~$0.15-0.25

**Option B: Expand subreddit discovery**
- Test 5 remaining subreddits: r/sales, r/ProductManagement, r/consulting, r/AskManagers, r/workstories
- Use proven keyword "meeting preparation"
- Expected: 50-100 posts, cost ~$0.15-0.30

**Decision:** Cost validated ($0.16 for 39 posts). Ready to scale to 50+ post target.

---

## Iteration 5: Deep Dive r/productivity with Pain-Specific Keywords

**Date:** 2025-11-04  
**Strategy Type:** Pain-specific keyword testing in validated subreddit  
**Cost:** ~$0.10 (50 posts @ $0.002/post)

### What We Tried

Based on Iteration 4 calibration feedback (relevance dropped from 87.5% to 50%), tested 4 pain-specific keywords to capture more precise meeting context pain:

**Keywords tested:**
1. "forgot what meeting was about" → 0 results
2. "lost my meeting notes" → 25 results
3. "can't find meeting info" → 25 results
4. "unprepared for meeting" → 0 results

**Settings:** Same as Iteration 4 (r/productivity, top, year, maxPostsCount: 10)

### Results

- **Posts collected:** 50 (0 + 25 + 25 + 0)
- **Relevance rate:** 0% (0/16 visible posts relevant)
- **Cost:** ~$0.10 total
- **Dataset IDs:** xxlBUZn6xjrmzXaUw (0 items), 7t5A5EhOxe5JGswMh (25 items), jXePnY2nTusOuHPdS (25 items), hE0F088Sk8aLYGIug (0 items)

**Critical Finding:** All keywords matched OUT OF CONTEXT
- "lost my meeting notes" → matched posts about "lost motivation", "lost focus", "lost time"
- "can't find meeting info" → matched posts about "can't find time", "can't find motivation"
- Sample mismatches: Procrastination psychology, productivity systems, burnout stories, general note-taking apps

### What Worked

- ✅ Cost control validated - $0.10 for 50 posts
- ✅ Fast iteration (4 searches executed quickly)

### What Didn't Work

- ❌ **Pain keywords matched out of context** - "Lost X" phrases too generic even when X is meeting-specific
- ❌ **Reddit search has no contextual filtering** - Matches keywords anywhere in post, not just meeting discussions
- ❌ **r/productivity wrong focus** - General productivity advice, not specific work meeting pains
- ❌ **0% relevance = search approach exhausted** - Two iterations (50% → 0%) shows keyword refinement failing

### Key Learnings

1. **Pain phrases need full context to work** - "Lost my meeting notes" sounds specific but matches "lost" in any context
2. **Search platform limitation discovered** - Reddit search = keyword matching without semantic/contextual relevance
3. **Keyword refinement has limits** - Iteration 4: "meeting preparation" = 50%, Iteration 5: pain keywords = 0%
4. **Subreddit selection critical** - r/productivity = general advice, need work-specific communities (r/sales, r/ProjectManagement)
5. **When to stop iterating** - Two consecutive iterations with declining relevance (50% → 0%) = signal to pivot

### Next Iteration Strategy

**Keyword refinement exhausted for r/productivity. Two options:**

**Option A: Different subreddits (RECOMMENDED)**
- Test r/sales, r/ProductManagement with "meeting preparation" (proven 50% effective)
- These communities closer to actual recurring meeting pain
- Cost: ~$0.15-0.20 for 2 subreddits

**Option B: Pivot validation method**
- Reddit search may be fundamentally unsuitable for this hypothesis
- Consider user interviews, surveys, or other evidence sources
- Success rate: 50% relevance at best, 0% at worst

---

## Summary of Learnings Across All Iterations

_Updated after each iteration - Universal principles applicable to any hypothesis/search_

### Cost Efficiency Principles

**Broad vs. Targeted Search:**
- **Broad search** (all platform): High volume, low relevance → expensive per relevant result
- **Targeted search** (specific communities): Low volume, high relevance → 10-30x more cost-efficient

**Why targeted wins:**
- Filters out irrelevant communities at search level, not post level
- Community self-selection means users already discussing related topics
- Less noise = higher signal-to-cost ratio

**Pricing pattern (Reddit-specific example):** Base cost + per-result cost (e.g., $0.02 start + $0.002/result)

### Query Construction Principles

**Effective Pattern: Action + Object**
- Structure: [Verb/Action] + [Noun/Object] 
- Examples: "task planning", "email management", "project coordination"
- Captures user behavior at specific workflow moment
- Uses natural language users would actually write

**Why this works:**
- Specific enough to filter irrelevant contexts
- Broad enough to capture variations in user language
- Focuses on moments in user workflow (before/during/after action)
- Avoids product jargon users don't naturally use

**Platform limitation:** Even optimal queries max at ~50% relevance due to keyword matching without context

### Query Anti-Patterns

❌ **Full conversational sentences** - "I can't remember what this X was about"
- Too specific, misses natural language variations
- Users phrase problems differently

❌ **Single generic nouns** - "task", "project", "email"
- Too broad, matches irrelevant contexts
- No workflow moment specified

❌ **Product/technical jargon** - "CRM integration", "API workflow"
- Users describe pain in natural language, not technical terms
- Misses majority who don't know jargon

❌ **Pain phrases with common verbs** - "lost my X", "can't find X"
- Common verbs match out of context (lost time, can't find motivation)
- Platform matches keywords anywhere, not just your context

**Root cause:** Most search platforms do keyword matching without semantic/contextual understanding

### Cost Control Principles

**Test before scaling:**
- Run 1-2 small searches first to validate cost per result
- Platform parameters often unreliable (e.g., "maxPosts" may not limit actual results)
- Cost typically scales with actual data returned, not parameter settings

**Budget planning:**
- Expect search costs: base fee + per-result fee
- Small tests: $0.05-0.10 per search
- Larger searches: Can scale unexpectedly (test first!)

### Community Selection Principles

**Prioritize community fit over keyword optimization:**

**Work-specific > General communities**
- Users in work/role-specific communities discuss actual job pains
- General productivity communities focus on advice/systems, not specific pains
- Example: Role-based (sales, engineering, PM) > General (productivity, life hacks)

**How to evaluate community fit:**
- Does community exist because of the problem space you're researching?
- Are posts about doing the work or about productivity systems?
- High engagement on pain points vs. general advice?

**Diminishing returns signal:**
- If keyword refinement drops relevance (e.g., 50% → 0%), community is wrong fit
- Don't optimize keywords further - test different communities instead
- Community selection matters more than perfect keywords

### Search Platform Insights

**Platform-specific limitations:**
- Most platforms do keyword matching, not semantic search
- No contextual filtering = keywords matched anywhere in content
- Expect max ~50% relevance even with optimal queries

**General methodology principles:**
1. **Targeted search >> Broad search** - 10x better relevance and cost efficiency
2. **Small paid tests essential** - Validate before scaling
3. **Platform parameters unreliable** - Test actual behavior, don't trust documentation
4. **Calibration critical** - Define tight relevance criteria upfront
5. **Community selection > keyword optimization** - Right community matters more than perfect keywords
6. **Recognize diminishing returns** - Declining relevance = signal to pivot, not refine

### When to Stop Iterating (NEW)
**Signals to pivot strategy:**
- Two consecutive iterations with declining relevance (e.g., 50% → 0%)
- Keyword refinement shows no improvement or gets worse
- Platform limitations discovered that can't be overcome (e.g., no contextual search)
- Cost per relevant post exceeds alternative validation methods

**Don't:**
- Keep refining keywords when community is wrong fit
- Assume more specific = better (can match out of context)
- Iterate past platform fundamental limitations

### Rules for Writing Learnings
**Purpose:** Create universal, transferable insights applicable to future searches and hypotheses

**Guidelines:**
1. **Extract principles, not examples** - Not "X keyword works" but "action phrases capture workflow moments"
2. **Explain WHY it works** - Not just what happened, but the underlying reason
3. **Make it transferable** - Should apply to other hypotheses, keywords, platforms
4. **Be specific about mechanisms** - How exactly does this insight improve results?
5. **Include anti-patterns** - What NOT to do is as valuable as what to do
6. **Remove search-specific details** - No subreddit names, specific keywords, or hypothesis details in summary
7. **Frame universally** - "When searching for user pain" not "for meeting hypothesis"

---

## Iteration Template (Copy for new iterations)

```markdown
## Iteration X: [Strategy Name]

**Date:** YYYY-MM-DD  
**Strategy Type:** [Manual Browse / Targeted Search / Multi-Subreddit / etc]  
**Cost:** $X.XX

### What We Tried
[Specific queries, settings, subreddits]

### Results
- Posts collected: X
- Relevance rate: X%
- Cost breakdown: [per search details]
- Evidence found: [brief summary]

### What Worked
- ✅ [What produced good results]

### What Didn't Work
- ❌ [What failed or disappointed]

### Key Learnings
[2-4 specific insights that inform next iteration]

### Next Iteration Strategy
[What to try next based on learnings]
```

