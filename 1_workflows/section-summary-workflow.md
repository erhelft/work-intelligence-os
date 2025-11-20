# Workflow: Section Summary & Document Updates

## Input Required

Before starting, answer these questions:

**1. Which project does this completed work belong to?**
- Intelligence OS strategy? (`4_work-intelligence-os/`)
- Calendar for Law Firms execution? (`5_calendar-law-firms/`)
- Other? (specify project folder)

**2. Provide the file paths for the three tracking documents to update:**
- One-pager path: _______________ (e.g., `4_work-intelligence-os/0_intelligence-one-pager.md`)
- Masterplan path: _______________ (e.g., `4_work-intelligence-os/0_intelligence-masterplan.md`)
- Assumptions path: _______________ (e.g., `4_work-intelligence-os/0_intelligence-assumptions.md`)

**3. Path to completed document:** _______________

**4. Phase name/number (if applicable):** _______________

**Note**: This prompt-first approach prevents accidental updates to wrong files and allows flexibility for future projects.

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

1. Open the **one-pager file path** you specified in Input Required
2. Search for section headers (lines starting with ##)
3. Identify where new section belongs based on content flow
4. Add new section with one-pager summary from Step 1

**CRITICAL RULE**: Only include insights/decisions that are **explicitly stated** in the source documents. Rephrase for clarity and investor audience, but NEVER synthesize new insights, sequences, or conclusions that weren't in the original docs. If something seems implied but wasn't explicitly written, do NOT include it.

---

## Step 3: Update Masterplan

**If marking phase complete:**

1. Open the **masterplan file path** you specified in Input Required
2. Search for "PHASE [N]: [NAME]"
3. Read that section only (use context around search result)
4. Replace with completed phase format:

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

1. Open the **masterplan file path** you specified in Input Required
2. Find where to insert (after last phase section)
3. Add outline format:

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

1. Open the **assumptions file path** you specified in Input Required
2. Search for "## [CATEGORY]" (Strategy/Product/GTM/Technical/Business Model)
3. Within that category, find appropriate confidence level subsection (### High Confidence, ### Medium Confidence, ### Low Confidence)
4. Append new insight to appropriate confidence subsection:

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

❌ "Read the entire masterplan and rewrite it with updates"
✅ "Search for PHASE [N] in the specified masterplan file, read that section only, update it"

❌ "Read all of assumptions file and add new ones"
✅ "Search for ## [Category] in the specified assumptions file, read that section, append new insight"

❌ "Review full one-pager to decide where new section goes"
✅ "Read section headers only (lines with ##), identify placement, insert"

❌ "Re-read completed doc multiple times while updating each file"
✅ "Extract everything needed once in Step 1, then use that extraction for all updates"

❌ "Update wrong project's files (Intelligence vs Calendar)"
✅ "Answer Input Required questions first, then use those specified paths for all updates"

---

## Key Rules

1. **Use search/grep to find sections** - don't read entire files
2. **Read only the section being updated** - use search result context
3. **Extract once in Step 1** - don't re-read completed doc for each update
4. **Update surgically** - insert/replace specific sections only, never rewrite full documents
