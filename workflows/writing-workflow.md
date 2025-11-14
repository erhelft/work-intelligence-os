# Writing Workflow

## Purpose
Operational workflow to turn a provided **Essence** into a finished piece that follows **writing-style.mdc**.

## Inputs
* **User provides:** Essence (2–6 sentences). Optional style notes (tone, audience, constraints).
* **You decide during pre-checks:** Type
* **You decide during section loop:** Flow mode, Evidence mode, and working knobs (length, directness, formality, cadence, person, opener, maxim_density, citations).

## Writing Logic

### Choosing a Template
* Look for a matching template under `docs/` (e.g., `docs/prd.md`, `docs/strategy.md`, `docs/artifact.md`).
* If a fit exists, use it. If not, continue without a template and rely on Type + Flow + Evidence rules from **writing-style.mdc**.

### Choosing Type
* **Founder memo**: strategy/vision with multiple themes; requires a winning picture + next steps.
* **Operator brief**: decision + action; requires scope-cut, decision, rationale, actions, owners, dates.

### Choosing Flow Mode (per section)
* **Flowing** = one thesis with a single, linear causal chain. If removing any sentence breaks the chain, keep Flowing.
* **Structured** = one thesis with 3+ parallel facets that could stand alone or be reordered. If you can drop any facet and the rest still reads fine, use Structured.
* **Staccato** = same thesis, but the reader needs to decide/act fast. Use single-line bullets that move something.
* Full definitions live in **writing-style.mdc**.

#### Tiebreakers
* Exec skim or meeting notes → Staccato.
* Two facets only and time to read → Flowing.
* Three or more facets or you want scannability → Structured.

### Choosing Evidence Mode (per section)
* **Strong** when you have real numbers or validated examples.
* **Directional** when you have light evidence or early numbers.
* **Exploratory** when you have mechanism + predictions/falsifiers but no proof.
* Never invent evidence. Full definitions live in **writing-style.mdc**.

## Workflow (gated — the user comments/approves at each step)
1. **Pre-checks → user approves**
2. **Outline → user approves**
3. **Section loops → user approves**
4. **Full draft → user approves**
5. **Final checks + suggested edits → user approves**

### Pre-checks (you draft; user confirms all at once)

#### Focus
* Context: where this writing fits in the bigger picture
* Section objective: what this section must achieve
* Target audience: who will read this
* Length: full document or single section

#### Style
* Template: PRD / Artifact / None (must exist under `docs/` if used)
* Type: Founder memo / Operator brief

### Outline Step (you draft; user approves)
* Generate a one-line thesis and a one-sentence essence
* Produce section headers as signposts that advance the thesis
* Add one value line per section (user or business value)

### Section Loop (you draft; user approves)
For each section:
* Write one paragraph embedding the essence and core claim.
* State the planned flow mode and evidence mode for this section
* Add one takeaway tying back to the thesis

### Draft Step (you draft; user approves)
* Write the full draft using the rules in **writing-style.mdc** (do not re-summarize them here)
* Use signpost headers and explicit transitions
* Keep sentences short; paragraphs brief
* Use specific examples and anchor numbers when possible
* Keep a human voice and a value-first POV

## Quality Gates (you run before handing over)

### Gate A. Spine
* Title is a thesis
* Essence line present at the top
* Headers are stances, not labels

### Gate B. Sections
* Each section has a value line and a clear claim
* Right flow mode and **right** evidence mode are chosen and named
* Takeaway links back to the thesis

### Gate C. Clarity
* Flowing claim pattern present inside paragraphs
* Contrast or scope-cut used where helpful
* No jargon or hype words

### Gate D. Type Specifics
* Founder memo: winning picture + next steps present
* Operator brief: decision + actions + owners + dates present

### Edit Step
* Remove filler/softeners; swap passive → active
* Replace adjectives with examples or numbers when available
* Tighten transitions; vary sentence length within short→medium

## Final Checks (you run)
* Apply this workflow's **Quality gates** (this file is the source of truth for checks)
* Confirm human-voice rules and value-first POV per section
* Confirm chosen flow/evidence modes are still right
* Confirm knob settings at top of the file
