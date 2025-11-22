# Phase 1 MVP - Calendar Intelligence for Law Firms

## What We're Trying to Learn

### 1. Are we succeeding? (General)
- Number of new meetings scheduled through our system
- % of new meetings scheduled through our system (vs. manual scheduling)

### 2. Do users adopt the solution? (Engagement)
- Number of users who scheduled more than 3 meetings
- % of users who scheduled more than 20% of their new meetings through system
- % of users still using the product after week 1, 2, 3, 4
- Distribution of usage: Partners vs. EAs vs. Junior lawyers

### 3. Did we increase billable hours? (Business Impact)
- Number of billable hours per user (before/after)
- Number of human scheduling emails per meeting (before/after)
- Time from "scheduling request" to "meeting booked" (before/after)

### 4. Are we doing a good job at scheduling? (Product Quality)
- % of system suggestions accepted by user
- % of system suggestions declined or moved by user
- % of scheduled events that were rescheduled later
- Split by meeting type (external client, deposition, internal, etc.)

---

## Scheduling Flows in Scope

### Single-Party Only (MVP Constraint)
MVP handles only 1:1 meetings (two people total). Multi-party coordination is Phase 2.

### External Meetings (Client-Facing)

**Flow 1A: User schedules with external party**
- Partner/EA wants to schedule meeting with client
- Example: Partner needs client update call

**Flow 2A: External party schedules with user**
- Client wants to schedule meeting with partner
- Example: New client requests consultation

### Internal Meetings (Firm-Only)

**Flow 1C: User schedules with internal party**
- Partner wants to schedule with associate/colleague
- Example: Partner needs case strategy discussion with associate

**Flow 2C: Internal party schedules with user**
- Associate/colleague wants time with partner
- Example: Associate requests guidance from partner

---

## Scheduling Capabilities

### Core Features
1. **Autonomous scheduling**
   - AI agent handles scheduling conversations with user
   - Negotiates time, finds conflicts, confirms meetings

2. **Timezone conversion**
   - Automatic timezone detection and conversion
   - Display times in both user and client timezones

3. **Scheduling medium**
   - TBD: Email, WhatsApp, phone, or other channel
   - Must support back-and-forth conversation

---

## User Interface - BIG TBD

1. **Web application**
   - Configuration and management dashboard
   - Interface for scheduling flows

---

## System Requirements

### Core Infrastructure
1. **User authentication**
   - Signup/login system

2. **Calendar provider authentication**
   - Microsoft OAuth integration
   - Google OAuth integration (future)

3. **Calendar access & permissions**
   - Read/write access to user's work calendar
   - Read/write access to calendars user manages (EA managing partner calendars)
   - Same permission level as EA would have (all of the organizaition probably)

4. **Personal calendar integration**
   - Access to user's personal calendar (separate from work)
   - Conflict detection across personal + work calendars

5. **Data model**
   - Connect and query across multiple calendars (personal + work)
   - Unified availability view

6. **Email access & permissions**
   - Send emails on user's behalf
   - OAuth integration with email provider

7. **Observability & monitoring**
   - System health monitoring
   - Error tracking and alerting
   - Usage analytics

