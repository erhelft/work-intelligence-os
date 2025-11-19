# Workflow: Section Summary & Document Updates

## Input Required
- Path to completed document
- Phase name/number (if applicable)

---

## Step 1: Extract from Completed Doc

Read the completed document and extract:

### 1. One-Pager Section Summary
- Capture the essence in 2-3 sentences
- If distinct aspects exist (vision vs strategy, framework vs outcome), use 2-3 sentences per aspect
- Prefer concise; maximum ~10 sentences total across all aspects
- **Guideline**: Write for an external investor. Deliver the core concept—what we're doing and why—not how we got there. Focus on outcomes and decisions, not process or methodology.

### 2. Key Insights/Assumptions (3-5 max)
For each insight:
- Statement (what we believe)
- Confidence level (High/Medium/Low)
- Source section in document (for reference)
- Signal + expected timeline (when/how we'll validate)

### 3. Phase Summary (for masterplan)
- Dates (Month Year or Month-Month Year format)
- Documents created + brief description of what each contains
- Main outcomes (3-5 bullet points capturing what was learned/decided)

---

## Step 2: Update One-Pager

1. Search 0_one_pager.md for section headers (lines starting with ##)
2. Identify where new section belongs based on content flow
3. Add new section with one-pager summary from Step 1

**CRITICAL RULE**: Only include insights/decisions that are **explicitly stated** in the source documents. Rephrase for clarity and investor audience, but NEVER synthesize new insights, sequences, or conclusions that weren't in the original docs. If something seems implied but wasn't explicitly written, do NOT include it.

---

## Step 3: Update Masterplan

**If marking phase complete:**

1. Search 0_the_masterplan.md for "PHASE [N]: [NAME]"
2. Read that section only (use context around search result)
3. Replace with completed phase format:

```markdown
### PHASE [N]: [NAME]
**Status**: ✅ Complete
**Dates**: [Month Year] or [Month-Month Year]

**Documents Created**:
- doc-name.md: Brief description of what it contains
- doc-name-2.md: Brief description (if multiple docs)

**Main Outcomes**:
- Key result/learning 1
- Key result/learning 2
- Key result/learning 3
```

**If adding next phase outline:**

1. Find where to insert (after last phase section)
2. Add outline format:

```markdown
### PHASE [N]: [NAME]
**Status**: 🔜 Not Started
**Duration**: [estimate]

**Goal**: [one sentence]

**Method**: [approach]

**Target**: [scope]

**Main Points**: 
- [bullet 1]
- [bullet 2]
- [bullet 3]
```

---

## Step 4: Update Insights & Assumptions

1. Search 0_assumptions_insights.md for "## [CATEGORY]" (Strategy/Product/GTM/Technical/Business Model)
2. Within that category, find appropriate confidence level subsection (### High Confidence, ### Medium Confidence, ### Low Confidence)
3. Append new insight to appropriate confidence subsection:

```markdown
**[Insight statement]**
*Source: [doc-name.md] - [Section Name]*
Signal: [what activity] ([when/timeline])
```

**Note**: Insights are grouped by confidence level within each category. Do not include confidence emoji in the insight itself—the subsection header indicates confidence level.

**If category doesn't exist:**
1. Read category headers only (lines with ##)
2. Add new category at appropriate position with confidence subsections and insights

**If confidence subsection doesn't exist:**
1. Add subsection (### High Confidence / ### Medium Confidence / ### Low Confidence)
2. Add insight below that subsection

---

## Anti-Patterns (Don't Do This)

❌ "Read the entire 0_the_masterplan.md and rewrite it with updates"
✅ "Search for PHASE [N] in 0_the_masterplan.md, read that section only, update it"

❌ "Read all of 0_assumptions_insights.md and add new ones"
✅ "Search for ## [Category] in 0_assumptions_insights.md, read that section, append new insight"

❌ "Review full 0_one_pager.md to decide where new section goes"
✅ "Read section headers only (lines with ##), identify placement, insert"

❌ "Re-read completed doc multiple times while updating each file"
✅ "Extract everything needed once in Step 1, then use that extraction for all updates"

---

## Key Rules

1. **Use search/grep to find sections** - don't read entire files
2. **Read only the section being updated** - use search result context
3. **Extract once in Step 1** - don't re-read completed doc for each update
4. **Update surgically** - insert/replace specific sections only, never rewrite full documents
