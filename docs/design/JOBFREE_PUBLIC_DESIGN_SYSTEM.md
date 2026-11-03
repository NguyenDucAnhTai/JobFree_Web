# JobFree Public Design System

This document is the project-specific design authority for JobFree public marketing pages. The Taste Skill remains the general design-quality framework; explicit JobFree rules here take precedence when they conflict.

## Brand foundation

Preserve the JobFree logo and wordmark, JobFree Yellow, warm cream and white foundation, near-black ink, navy as a controlled contrast surface, Be Vietnam Pro, and bold editorial Vietnamese typography. The personality is practical, energetic, and transparent.

Avoid generic SaaS blue, AI-purple gradients, luxury beige styling, stock corporate imagery, unrelated icon libraries, invented social proof, metrics, pricing, customers, or product capabilities.

## Design dials

- `DESIGN_VARIANCE: 7/10` — Use editorial scale, asymmetry, and JobFree's expressive product illustrations while keeping navigation and content easy to scan. Variation is intentional, not arbitrary.
- `MOTION_INTENSITY: 4/10` — Use motion to communicate entrance, state, or progress. Avoid simultaneous loops and decorative movement that competes with the message.
- `VISUAL_DENSITY: 4/10` — Provide enough detail for employers and workers to understand a shift marketplace, but keep one dominant message and a clear reading order in each viewport.

## Page theme

The default public theme is **LIGHT / WARM**. Cream, white, and subtle sand form the page foundation. Navy is a deliberate visual anchor, normally one major anchor per page; a second dark area is allowed only when it has a clear semantic or compositional purpose.

Yellow supplies brand recognition and CTA energy. Do not create rhythm by repeatedly alternating cream, white, navy, white, and yellow. Use spacing, typography, composition, rules and dividers, scale, editorial alignment, and asymmetric layouts instead.

## Layout families

Choose layout according to the content; do not require every page or section to use every family.

- **Editorial split:** narrative and one supporting visual, with an intentional imbalance.
- **Product visual + narrative:** a product concept paired with the user problem or workflow it explains.
- **Sequential timeline:** ordered steps with clear progression and distinct states.
- **Comparison / before-after:** contrast two workflows or outcomes without inventing quantified gains.
- **Asymmetric feature field:** varied text and visual spans instead of equal card grids.
- **Dense operational board:** a believable product concept when the operational details are the point.
- **Full-bleed statement:** one concise message with a strong typographic anchor.
- **FAQ / disclosure:** accessible disclosure controls for answers and caveats.
- **CTA:** a clear next action with its operational status stated honestly.

## Hero system

Public pages may use different hero families while preserving the same brand rules:

1. **Narrative + product visual** — explain a concrete user need beside an illustrative product concept.
2. **Editorial statement + compact proof** — lead with one idea and only verified supporting evidence.
3. **Process / category-led** — orient the visitor by audience, workflow, or category before the detail.

Every hero has exactly one dominant message. Keep the primary CTA visible without competing statistics. Avoid excessive badges and multiple animated objects competing with the heading. The mobile first viewport must remain readable and recognizable as JobFree.

## Radius and shadows

Normalize to four conceptual levels and use existing project tokens/styles wherever practical:

- **Control / pill:** inputs, compact actions, and pill-shaped brand CTAs.
- **Small card:** compact, repeated content.
- **Feature card:** a larger explanatory block.
- **Hero / product visual:** device or major product concept.

Do not add arbitrary radius or shadow values unless the composition has a clear visual reason. This guidance does not require rewriting existing CSS solely to retrofit tokens.

## Icons

`lucide-react` is the approved functional icon library. Do not migrate libraries solely to follow a generic Taste Skill preference. Custom SVG remains acceptable for decorative artwork and system diagrams, not as a competing functional icon family.

## Motion

Motion should explain hierarchy or state, not decorate every object. Approved uses include entrance reveal, state change, progress, small hover feedback, and limited product-demo movement. Discourage multiple infinite floating cards, unnecessary pulse effects, marquees without content value, and simultaneous competing loops. Respect `prefers-reduced-motion` for all non-essential movement.

## Product mockups

Temporary HTML/CSS product mockups are allowed until production UI screenshots exist. Each must represent planned JobFree behavior, avoid fabricated customer or business proof and operational performance claims, and be clearly identifiable as illustrative UI. Controls that look interactive must work or be rendered as non-interactive presentation. Replace high-value mockups with real product screenshots when they become available.

## Claims policy

Never present an unverified number or capability as a production claim. Evidence is required before publishing claims about response or matching time, support availability, insurance coverage, average rating, active worker count, payout speed, success rate, or customer count. Illustrative sample data is allowed inside a clearly labeled product concept, but must not read as company performance data.

## Accessibility

- Target WCAG AA contrast for normal text.
- All navigation and controls must work with a keyboard; retain normal Tab order and provide visible focus.
- Respect `prefers-reduced-motion` for non-essential animation.
- Use semantic links for navigation and buttons for actions. Give controls accessible names and accurate states.
- Do not ship fake interactive UI. If a control has no action, render it as a non-interactive mock element or clearly explain its disabled state.
- Label forms and disclose when data is not submitted or stored.
