# System Prompt Workflow Feedback Log


## Event Scoring Agent — December 30, 2025

**Classification Challenge: Reasoning Complexity vs. Operational Simplicity**

Initial classification: Judgment Agent
Rationale: 7-dimension reasoning framework, handles ambiguity, makes holistic judgment calls, spec says "reasoning-based, not a formula"

**User correction → Workflow Executor**

Key factors that drove the correction:
1. **Efficiency requirement**: Runs on many events per call (<5 seconds for 350 events) — needs lean prompt
2. **Low stakes**: Easily reversible, users review outputs before acting
3. **Single defined operation**: One event in, one score out — bounded scope
4. **Structured process**: Check hard rules → evaluate 7 dimensions → assign score

**Insight**: Classification was over-weighted on *reasoning depth* and under-weighted on *operational characteristics*. Even sophisticated reasoning within a single, repeatable, well-defined task is more "Workflow Executor" than "Judgment Agent" when efficiency, scale, and stakes are considered.

**Potential workflow improvement**: Add explicit classification criteria around:
- Scale/performance requirements (batch operations, latency constraints)
- Stakes/reversibility in the classification decision (not just as characteristics)
- Scope boundedness (single operation vs. multi-step coordination)

**Decision**: Hold on workflow changes until we have more data points. Continue monitoring for pattern.

[Processed: January 7, 2026, Iteration #1]

---

## Event Scoring Agent — December 30, 2025 (Outline Configuration)

**Section Depth Optimization & Sensitivity Refinement**

Initial outline approach: Default section depths from Robustness Table applied uniformly; High Sensitivity triggered standard characteristic modifiers across all affected sections.

**User corrections → Multiple refinements**

Key insights from outline review:

1. **Conditional Sensitivity handling**: Classified as High Sensitivity due to private calendar data, but realized most events aren't sensitive if private events are handled properly at the boundary. This is "conditional High Sensitivity" — warrants the classification but doesn't require heavy guardrails throughout every section. Just strong boundaries around private event handling.

2. **Section depth should match actual needs, not defaults**: Initial outline had Operational Boundaries as Standard and Failure Handling as Standard, but user identified both should be Minimal:
   - **Operational Boundaries**: Fully autonomous scoring, escalate only for errors → 2-3 sentences, not a full section
   - **Failure Handling**: Straightforward degradation (missing fields, unclear data, be honest) → minimal guidance sufficient

3. **Decision Logic is the core for this agent**: Despite "Workflow Executor" classification suggesting Minimal Decision Logic, the 7-dimension reasoning framework IS the intelligence layer. Upgraded to Robust. Token budget reallocated from other sections to invest here.

4. **Input Format & Dynamic Context clarity**: Renamed "Dynamic Context" to "Input Format & Dynamic Context" to make clear distinction from output. Also decided to include complete input schema (not just reference) because it's essential reference material for decision-making.

5. **Strategic token allocation**: Rather than rigid adherence to table defaults, optimized sections based on where this specific agent needs depth:
   - Invest: Decision Logic (Robust), Input Format (Standard - complete schema)
   - Save: Operational Boundaries (Minimal), Failure Handling (Minimal), Dynamic Context tag structure (minimal overhead)
   - Result: ~1600 tokens, well within 1200-1800 range, with tokens allocated to high-value sections

**Insight**: The Robustness Table provides starting defaults, but optimal section depths come from understanding where the agent's actual complexity lives. For this agent: complex reasoning (Decision Logic) + clear I/O specification (Input/Output Format), but simple operational model (Boundaries, Failure Handling). Characteristics also apply conditionally — High Sensitivity doesn't mean every section needs expansion if the risk is contained at specific boundaries.

**Potential workflow improvement**: 
- Add guidance in Step 3 to question the defaults: "Where does this agent's complexity actually live?" and "Which characteristic requirements can be contained at boundaries vs. woven throughout?"
- Consider adding a token allocation strategy step before section plan
- Template note that section depths are starting points, not rigid requirements

**Decision**: Strong pattern emerging. After this prompt is complete, consider adding "Section Depth Optimization" guidance to the workflow with these learnings.

[Processed: January 7, 2026, Iteration #1]

---

## Event Scoring Agent — December 30, 2025 (Quality Check Revisions)

**Critical Corrections During Quality Validation**

Initial draft passed configuration and structure checks, but user review surfaced three important corrections during Step 5 validation.

**User corrections → Three critical fixes**

Key issues identified:

1. **Non-English title handling was too weak**: Initial guidance was buried in Failure Handling section with soft language ("Attempt translation if in common language"). This is critical functionality that must be prominent and directive.
   - **Fix**: Move to Decision Logic, Event Type dimension with strong directive: "ALWAYS attempt translation—use your multilingual capabilities. Never disregard a title because it's not in English."
   - **Why critical**: Legal firms are increasingly global; non-English titles for client meetings, international calls, etc. are common. Skipping these would create blind spots in scheduling.

2. **Input format was wrong (single vs array)**: Prompt said "You receive a single event object" but the agent actually processes arrays of up to 350 events per request (one per attendee).
   - **Fix**: Update Input Format section to clarify array processing: "You receive an array of event objects to score. Each event represents one calendar event for one attendee. You may receive up to 350 events per request. Process each event independently."
   - **Why critical**: Wrong mental model could cause agent to expect different data structure, potentially fail on actual inputs.

3. **Key Terminology section questioned**: User asked for examples of its value to confirm it should stay.
   - **Resolution**: Provided examples showing how terminology anchors interpretation (e.g., "Coffee with Sarah Chen, CEO" + "Client-facing event = highest friction" context → correct major conflict assessment). User confirmed value; section stays.

**Insight**: Quality validation isn't just structural checklist—domain experts catch critical functional requirements that template-based generation might miss. The "how will this actually be used" questions are essential, especially for:
- Edge cases that are common in the target domain (non-English titles in global law firms)
- Data structure mismatches between spec and prompt (single vs array)
- Section utility that seems obvious to AI but needs user validation

**Potential workflow improvement**: 
- Add Step 5 checklist item: "Validate input/output data structures match spec exactly"
- Add Step 5 checklist item: "Verify critical edge cases from spec are prominently addressed, not buried"
- Consider adding "functional validation" questions in Step 5 that force review of actual usage scenarios

**Decision**: Corrections applied. Pattern suggests quality check should include explicit data structure validation and edge case prominence review.

[Processed: January 7, 2026, Iteration #1]

---

## Event Scoring Agent — December 30, 2025 (Context Contract Streamlining)

**Context Contract Purpose Clarity**

Initial approach: Generated comprehensive context contract (~450 lines) with extensive documentation including: referenced-in-prompt sections, detailed validation rules, context mapping table, verbose examples, and full integration notes.

**User correction → Focus on core purpose**

Key realization from user challenge:

**Question: "Why do we need [all these sections]? The goal is to help my CTO make sure the schemas in the system prompt vs. the code are aligned."**

This clarified the document's true purpose: **Schema alignment verification**, not comprehensive integration documentation.

User evaluation of each section:
1. **"Referenced in prompt" sections**: Unnecessary — line number references are workflow noise, not schema verification
2. **Validation rules**: Mixed value — pre-processing requirements (meeting room filtering) ARE schema-relevant; prompt-internal behavior ("agent notes field not available") is NOT
3. **Context mapping table**: Redundant — if schemas are clear, CTO can verify alignment directly by comparing Input Format ↔ code structure
4. **Signal detected/impact details**: Keep structure, but exhaustive examples of what "detected" strings look like aren't needed for schema verification
5. **Input/output examples**: Questioned but decided to keep — helps clarify structure
6. **Integration notes**: Questioned but decided to keep — practical value for implementation

**Changes applied:**
- ❌ Removed: "Referenced in prompt" sections (line number noise)
- ❌ Removed: Context mapping table (redundant 12-row verification)
- ❌ Removed: Prompt-internal validation rules (kept only data transformation requirements)
- ✅ Kept: Complete schemas, examples, integration notes
- **Result**: ~450 lines → ~310 lines (~30% reduction)

**Insight**: Context contracts risk over-documentation by trying to be comprehensive rather than purpose-driven. The critical question is: "What is the user trying to verify/accomplish with this document?" In this case:
- **Schema alignment** (field names, types, required vs. optional)
- **Data transformation requirements** (pre-processing that affects schema)
- **Usage clarity** (examples help prevent misinterpretation)

Everything else—line references, internal prompt behavior, proof-of-consistency tables—is workflow artifact bloat that obscures the core purpose.

**Potential workflow improvement**: 
- Step 6 should start by clarifying: "Who is the audience and what decision are they making with this document?"
- Context contract template should have two tracks: "Schema Alignment Only" vs. "Full Integration Documentation"
- Default to leaner "Schema Alignment" unless user explicitly needs comprehensive integration docs

**Decision**: Pattern confirmed. Context contracts should be purpose-driven (schema alignment for technical handoff) rather than comprehensively documenting all relationships. Add audience/purpose clarification to Step 6.

[Processed: January 7, 2026, Iteration #1]

---

## Scheduling Intelligence Agent — January 6, 2026 (Workflow Mode Detection)

**Issue: Continuing in Ask Mode When Write Operations Required**

During Step 3 outline approval, the workflow was about to proceed to Step 4 (writing the system prompt file). Instead of detecting that write operations would be needed and prompting the user to switch to agent mode, the AI began attempting to output the prompt in chat.

**User correction → Request to switch modes proactively**

Key insight: When a workflow step will require file creation/modification, the AI should:
1. Detect the upcoming write operation requirement
2. Explicitly ask user to switch to agent mode before proceeding
3. Wait for mode switch confirmation before continuing with generation

**Why this matters:**
- Avoids generating long content in chat that then needs to be copied/pasted
- Maintains clean workflow progression
- Respects the tool access boundaries

**Potential workflow improvement:**
- Add explicit check at end of Step 3: "We're about to generate files. Please switch to agent mode if you haven't already."
- System prompt workflow Step 4 should start with mode check
- Consider adding mode check guidance to all file-generating workflow steps

**Decision**: Log pattern. If this recurs across multiple workflows, add explicit mode-checking guidance to workflow templates.

[Processed: January 7, 2026, Iteration #1]

---

## Scheduling Intelligence Agent — January 7, 2026 (Quality Review Refinements)

**Multiple Clarifications from User Review**

Initial draft generated following template structure and characteristic modifiers. User review surfaced several conceptual misalignments and opportunities for clarity improvements.

**User corrections → Six key refinements**

Key insights from user feedback:

1. **Escalation level confusion**: Initial Identity section said agent "escalates when attendees propose alternatives" but this conflated attendee-level actions (which output Escalate.* next_action) with event-level escalations (which change event.next_action to Waiting.*). Attendee can escalate without event escalating if it doesn't affect event state.
   - **Fix**: Changed to "escalates when event-level coordination requires user decision"
   - **Learning**: Distinguish between agent's output types (attendee vs. event) and what "escalation" means at each level

2. **Sensitive data protection target**: Hard Boundaries prohibited "logging email addresses, names in error outputs" targeting system logging concerns. User clarified the real risk is **cross-attendee data leakage** — showing participant A's details when EA is viewing participant B's coordination.
   - **Fix**: Changed to prohibit including one attendee's score/reason/messages when analyzing another attendee
   - **Learning**: In multi-participant systems, data isolation between participants is more critical than general logging restrictions for internal-facing agents

3. **Input schema documentation approach**: Initial Dynamic Context had minimal field listings. User questioned if agent knew what it was receiving. Rather than field-by-field schema (Event Scoring Agent approach), user preferred **conceptual purpose explanation**: "scheduling_operation contains event-level data... use this to understand full event context"
   - **Fix**: Rewrote with conceptual explanations and "use this to understand" guidance
   - **Learning**: For self-explanatory field names, conceptual purpose > exhaustive schema. Agent needs to know WHAT to look WHERE, not every field name.

4. **Event reasoning in examples creates confusion**: Example 2 showed event_analysis with score 65 when David (only attendee shown) had score 85. Without full context about other attendees, this was confusing and potentially misleading.
   - **Fix**: Removed event_analysis from Examples 2-4, kept only in Example 1 to establish pattern
   - **Learning**: Examples need complete context to be instructive. Partial examples can teach wrong patterns.

5. **Granularity scaling with attendee count**: Event reason principle was missing critical guidance on text length management. With 1 attendee, event reason should mirror attendee reason. With 5+ attendees, can't list all names without bloating.
   - **Fix**: Added principle: "1 attendee: mirror exactly; 2-3: use names; 4+: summarize without names"
   - **Learning**: Output format guidance needs to address scalability explicitly when dealing with variable-count entities

6. **Follow-up timing logic contradictions**: Initial guidance said "high urgency = 1-2 days when meeting within 3 days" but if meeting is in 3 days and you follow up in 2 days, that's only 1 day before meeting. "Final attempt" timing had no room in the sequence.
   - **Fix**: Changed to spacing based on days-until-meeting: >7 days = 3-4 day spacing, 4-7 days = 2-3, <4 days = 1-2
   - **Learning**: Timing logic needs mathematical coherence. Test edge cases: "If I apply this rule, does the sequence make sense?"

7. **Attendee criticality inference vs. checking field**: Event Score Dimension 1 described inferring whether attendee is required/optional from signals (external = required, etc.). User pointed out `is_optional` is provided in input schema.
   - **Fix**: Changed to "Check `is_optional` field" with inference signals as backup
   - **Learning**: When data is provided, don't make agent infer. Check field first, use heuristics only as fallback.

**Insight**: Quality review by domain expert catches conceptual misalignments that template-based generation misses. Key patterns:
- Distinguish between output layers (attendee vs. event level) 
- Understand risk models specific to domain (cross-participant leakage vs. general logging)
- Balance schema detail with conceptual clarity based on field self-documentation
- Ensure examples have enough context to be instructive
- Test timing/sequence logic for mathematical coherence
- Check data before inferring

**Potential workflow improvement**:
- Add Step 5 checklist: "Validate timing/sequence logic for mathematical coherence"
- Add Step 5 checklist: "If agent handles multiple entities of same type (attendees, events, etc.), verify granularity scaling guidance"
- Add Step 5 checklist: "Verify agent checks provided fields before inferring from signals"
- Consider adding "examples completeness" check: do examples have enough context to be instructive without misleading?

**Decision**: Strong patterns emerging across Event Scoring and Scheduling Intelligence agents. After this workflow completes, review Step 5 quality checklist for enhancements addressing: timing logic coherence, scalability guidance, check-before-infer principle, example completeness.

[Processed: January 7, 2026, Iteration #1]
