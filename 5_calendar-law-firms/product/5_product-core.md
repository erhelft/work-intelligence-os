# Product Core - Feature Capture

This document captures feature ideas using the following framework:
1. **Value** - Why it matters
2. **What it does** - High-level description
3. **Type** - Strategic classification (table-stakes | delight | differentiator)
4. **Introduction** - When user discovers this
5. **Phase** - When to build it (MVP | 2 | 3 | Future)
6. **User Flow** - Functional area (what type of activity)
7. **User Phase** - Journey stage (where user is in maturity)
8. **Product Values** - Which values from `4_product-values.md` this connects to
9. **Product Approach** - Which approaches from `4_product-values.md` this aligns with

**Note**: If a feature can't connect strongly to our values/approach, it's either wrong or our values need updating.

**User Flow & User Phase work as a matrix** - flows are functional categories that stay constant, phases are journey stages that evolve as users mature. A feature can span multiple phases.

## User Flow Categories
- **Onboarding & Setup** - Initial configuration, connections, preferences
- **Scheduling** - Creating/booking new meetings
- **Rescheduling** - Handling changes to existing meetings
- **Calendar Management** - Viewing, organizing, optimizing calendar
- **Preferences & Settings** - Configuration adjustments
- **Notifications & Reminders** - Communication about calendar events
- **Analytics & Insights** - Understanding patterns, seeing impact

## User Phase Categories
- **Onboarding** - First login through first successful meeting scheduled
- **Adoption** - Learning the system, establishing habits (weeks 1-4)
- **Active** - Regular, confident usage
- **Power User** - Advanced features, teaching others, customization

---

## Feature: Intelligent Onboarding Configuration

**Value**: 
Removes friction from setup while demonstrating the product's core intelligence. Users see immediate personalization instead of filling out forms. Proves the "learns and adapts" promise on day 1.

**What it does**: 
When a user connects their calendar during onboarding, the system analyzes 2-4 weeks of historical data to detect patterns (meeting duration preferences, buffer time habits, busy/focus time blocks, timezone patterns). Surfaces findings with supporting evidence ("We noticed you schedule most 1:1s for 30 minutes - 18 out of 23 meetings last month"). Uses these insights to pre-configure default settings. User can accept, adjust, or override any setting.

**Type**: Delight

**Introduction**: During onboarding, immediately after calendar connection

**Phase**: MVP

**User Flow**: Preferences & Settings

**User Phase**: Onboarding

**Product Values**:
- **"Personalization creates trust"** - System demonstrates it knows the user from day 1 by analyzing their existing patterns
- **"What we can know without asking, don't ask"** - Infers preferences from behavior rather than forcing form-filling
- **"Context, memory, preferences"** - Shows ability to learn from historical behavior immediately

**Product Approach**:
- **"Moat thinking"** - Demonstrates the learning capability that improves over time, starting from onboarding
- **"Hook & value should be evident in single player mode on day 1"** - Immediate personalization without waiting
- **"Users don't work for the product"** - Product does the analysis work, not the user

---


