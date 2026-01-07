# Agent Spec Workflow Feedback Log

## Event Scoring Agent — December 29, 2025

**Completeness:** Complete — captured full agent essence

**Accuracy:** Three issues found and corrected:
1. Product context incorrectly said "conflicting events" instead of "all events in timerange"
2. Core task included implementation details ("based on 7-dimension framework") that could change — simplified to just the task
3. Operating model conflated product UI (heatmap, colors) with agent outputs (JSON scores) — refocused on what agent actually produces

**Interview flow:** Three significant issues:

*Problem 1 - User flow questions when not relevant to agent:*
- LLM asked about EA vs lawyer, user's starting state, meeting purpose
- User had to redirect: "Is it clear that event scoring and slot calculation are two different things?"
- LLM course-corrected but wasted time on product flow instead of agent operations

*Problem 2 - Assumed output without verifying:*
- User provided detailed input info but nothing about output
- LLM assumed "Output: Conflict score for each event (Minor/Medium/Major/Available)" without asking
- Should have explicitly asked: "What does the agent output?" instead of guessing

*Problem 3 - Unclear "Key Assumptions" question:*
- User didn't understand what was being asked or why
- Question felt abstract without clear purpose
- Needs better guidance: Why does this matter? What should I be thinking about?

**Characteristics:** Helpful and clear — the 5 dimensions (Sensitivity, Autonomy, Exposure, Reversibility, Blast Radius) worked well to clarify agent's nature

**Open feedback:** Interview sometimes conflated product-level concerns with agent-level concerns. Need clearer boundary between "what the product does" vs "what the agent does" — agent produces JSON output, product uses that to build UI.

---

## Communication Agent — January 7, 2026

**Completeness:** Complete with 7 issues identified and corrected post-interview:

1. **Success metrics were vague, not measurable** - Changed from "Messages are clear" to specific rates: "≥80% response rate within 48 hours," "<5% confusion rate," "0 complaints," etc.

2. **Timing constraints too aggressive** - Email doesn't need 2-5 second response; changed to "10-30 seconds acceptable for email generation"

3. **Core task missed the point** - Original listed characteristics but missed core purpose: "Generate content that progresses conversation forward to achieve next action"

4. **User visibility section repetitive** - Reduced 4 bullets about what EA/lawyer sees to 2 simple bullets; removed irrelevant Intelligence Agent visibility

5. **Tone varying per message type creates inconsistent personality** - Removed individual "Tone:" labels for each message type; added single statement: "Maintain consistent professional, accommodating tone across all message types"

6. **Missing multi-language in key behaviors** - Added explicit bullet about language matching (respond in attendee's language, use default for initial outreach)

7. **Input schema too elaborate, risk of leaking data** - Removed attendee_analysis object and attendees array; simplified to only: next_action, attendee info, conv_history, meeting details. Prevents accidental leakage of other participants' status.

**Accuracy:** Accurate throughout interview - no translation issues or misunderstandings

**Interview flow:** Pre-filling approach worked very well:
- User provided context about Intelligence Agent and product flow upfront
- LLM pre-filled sections based on Intelligence Agent spec and context
- User provided quick feedback rather than answering from scratch
- Made workflow much faster (~30 min vs typical 45-60 min)
- User able to focus on corrections and refinements rather than explaining from zero

Only issue: LLM should have been more critical during pre-filling. Several issues (vague metrics, timing, tone variation) were included in initial draft and caught by user post-interview rather than during section review.

**Characteristics:** Helpful and clear - correctly identified High Sensitivity, High Autonomy, External Exposure, Hard to Reverse, External Blast Radius with appropriate reasoning

**Open feedback:** Pre-filling approach is excellent for agents where significant context exists. Consider:
- Being more critical when pre-filling (apply quality standards proactively)
- Asking "does this meet the quality bar?" before presenting sections
- Running internal validation checks on pre-filled content (are metrics measurable? is tone consistent?)

