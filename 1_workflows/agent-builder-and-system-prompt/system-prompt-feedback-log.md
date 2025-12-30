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
