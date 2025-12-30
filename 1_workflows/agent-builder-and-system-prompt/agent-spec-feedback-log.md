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

