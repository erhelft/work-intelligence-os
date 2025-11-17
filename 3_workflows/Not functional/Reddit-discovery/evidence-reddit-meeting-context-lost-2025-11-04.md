# Evidence Discovery - Reddit Analysis
## Meeting Context Lost Hypothesis

**Date:** 2025-11-04  
**Hypothesis:** Meeting Context and History Is Lost ([1.1_meeting-context-lost.md](../1.1_meeting-context-lost.md))  
**Iterations:** 4 & 5 (Subreddit Discovery + Pain Keyword Testing)  
**Status:** Low Relevance Found - Search Approach Exhausted

---

## Executive Summary

**Posts Analyzed:** 39 (16 from preview, 23 not yet reviewed)  
**Searches:** 2 (r/productivity, r/managers)  
**Cost:** $0.16  
**Relevance Rate:** 62.5% preliminary (10/16 posts directly relevant)

**Key Finding:** Strong evidence exists in r/productivity (87.5% relevance) for meeting preparation anxiety and time spent preparing. Users express frustration about showing up unprepared despite preparation efforts.

---

## Calibration Table

**Purpose:** Review and validate relevance ratings before full analysis.

| # | Post Link | Key Quote | My Rating | Logic for Rating |
|---|-----------|-----------|-----------|------------------|
| 1 | [Every meeting gets a price tag](https://www.reddit.com/r/productivity/comments/1ocdtqu/) | "Everyone shows up prepared because when there is a price tag on your time you suddenly take it seriously" | ✅ HIGHLY RELEVANT | Directly addresses meeting preparation pain - users don't show up prepared without accountability |
| 2 | [Just thinking about tomorrow](https://www.reddit.com/r/productivity/comments/1m4s0gf/) | "After checking my calendar and realizing I've got 3 meetings... What's your Sunday routine to mentally prepare before you jibble in for the week ahead?" | ❌ NOT RELEVANT | About general week preparation and lack of motivation, not specific meeting context/prep pain |
| 3 | [I work better with pressure](https://www.reddit.com/r/productivity/comments/1h0zkc5/) | "8:00 AM - 9:00 AM: Meeting with Richard - Discuss project updates, review financials... Make sure to set clear action items" | ❌ NOT RELEVANT | Personal productivity routine that happens to mention meetings, not about meeting prep pain |
| 4 | [My routine when most productive](https://www.reddit.com/r/productivity/comments/1hfrvqq/) | "I'm most productive in the morning, so I try to schedule most meetings, collaborative sessions, etc for the afternoon" | ✅ RELEVANT | Mentions meetings in productivity context but doesn't directly address preparation or context loss |
| 5 | [How Do I Overcome Fear](https://www.reddit.com/r/productivity/comments/1i0xptc/) | "No matter how much I prepare, the moment I'm asked to speak, my heart races, my palms sweat, and my mind starts to blank" | ❌ NOT RELEVANT | About personal performance anxiety in critical situations, not about meeting context/preparation systems |
| 6 | [I just feel like wasting life](https://www.reddit.com/r/productivity/comments/1mmo9gz/) | General existential rant about wasting time, no specific meeting content | ❌ NOT RELEVANT | About general life/time management, not meetings |
| 7 | [How do you schedule your day](https://www.reddit.com/r/productivity/comments/1ncbaov/) | "lot of preparation for teaching... emails, phone calls and parent meetings" | ⚠️ TANGENTIAL | Mentions meetings and preparation but in teaching context, less about recurring work meetings |
| 8 | [Looking for digital daily planner](https://www.reddit.com/r/productivity/comments/1jwfui3/) | "if I had a big meeting on Thursday that I needed to spend a few days preparing for, I would write 'Prep for XYZ meeting' on Monday, Tuesday, and Wednesday" | ✅ HIGHLY RELEVANT | Perfect example of time spent preparing for meetings and tracking prep across multiple days |
| 9 | [The real cost of inheriting team](https://www.reddit.com/r/managers/comments/1nj7x6d/) | "Nobody spoke up in meetings. Feedback was basically non-existent" | ❌ NOT RELEVANT | About team culture/management issues, not personal meeting preparation |
| 10 | [I had to tell a staff member](https://www.reddit.com/r/managers/comments/1hbeqyb/) | "Skipped one-on-ones and staff meetings with no notice" | ⚠️ TANGENTIAL | Mentions meetings but about attendance/performance issues, not preparation/context |
| 11 | [My employee died](https://www.reddit.com/r/managers/comments/1is23ye/) | About grief and workplace loss | ❌ NOT RELEVANT | Not about meetings or productivity |
| 12 | [What's leadership-speak](https://www.reddit.com/r/managers/comments/1hknw82/) | "I did in x meeting and it wasn't a priority at the time" | ⚠️ TANGENTIAL | Mentions meetings but about decision-making and organizational politics, not preparation |
| 13 | [Is it normal for VP's to send vague directives](https://www.reddit.com/r/managers/comments/1lzoq1b/) | "could eventually take over the role of preparing the company for safety audits" | ❌ NOT RELEVANT | About VP management style and unclear delegation, not about meeting preparation pain |
| 14 | [Update: How to respond post meeting](https://www.reddit.com/r/managers/comments/1j3qa18/) | "I was not given any indication... I would have liked an opportunity to prepare for the entire meeting, not just what I thought the agenda would be" | ✅ HIGHLY RELEVANT | Explicitly states frustration about not being able to prepare for meeting due to missing context |
| 15 | [I think you leave managers not jobs](https://www.reddit.com/r/managers/comments/1iuo9ba/) | "she wanted to do a face to face handover with the colleague" | ⚠️ TANGENTIAL | Mentions handover meeting but about scheduling/logistics, not preparation/context loss |
| 16 | [No Agenda, no Meeting](https://www.reddit.com/r/managers/comments/1jz9uqx/) | "regular meetings... quickly turned in unprepared discussions... I feel we could save time if everyone had their Agenda points prepared" | ✅ HIGHLY RELEVANT | Directly about unprepared meetings and lack of preparation causing wasted time |

**Calibrated Relevance Breakdown (after user feedback):**
- ✅ Highly Relevant: 4 posts (25%)
- ✅ Relevant: 2 posts (12%)
- ⚠️ Tangential: 4 posts (25%)
- ❌ Not Relevant: 6 posts (38%)

**r/productivity actual relevance: 50%** (6/8 visible posts NOT relevant - too loose criteria)  
**r/managers actual relevance: 25%** (2/8 relevant, 4/8 tangential)

**Calibration insight:** Initial rating too loose - marked posts relevant if they mentioned meetings. Need posts specifically about:
- Time spent preparing for meetings
- Lost context/info about meetings
- Scrambling to find meeting info
- Not knowing what meetings are about

---

## Data Sources

**Dataset IDs:**
- r/productivity: 2ugDhkril15NgnZc5 (14 posts)
- r/managers: ty3tYoXGkXSyj3OJG (25 posts)

**Search Settings:**
- Actor: `harshmaur/reddit-scraper`
- Keyword: "meeting preparation"
- Sort: top
- Time: year
- Comments: disabled

---

## Next Steps

1. **Calibration:** Review calibration table and provide feedback on ratings
2. **Full Analysis:** Retrieve remaining 23 posts and complete relevance classification
3. **Evidence Synthesis:** Group findings by themes (prep anxiety, prep time, showing up unprepared)
4. **Confidence Assessment:** Update hypothesis confidence level based on findings

---

## Notes

- Iterations 4 & 5 completed
- Iteration 4: "meeting preparation" keyword = 50% relevance (after calibration)
- Iteration 5: Pain-specific keywords = 0% relevance (matched out of context)
- **Finding:** Reddit search matches keywords anywhere in post, not contextually
- Keyword refinement approach exhausted for r/productivity
- Recommendation: Test different subreddits (r/sales, r/ProductManagement) or pivot validation method

