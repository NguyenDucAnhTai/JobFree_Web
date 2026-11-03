# JobFree Admin UI System Design with shadcn/ui v1.0
## One Shared UI Architecture for Admin Data and Admin System

Status: SOURCE OF TRUTH for shared Admin UI implementation  
Owner: Frontend Architecture + Backend/Supabase Architecture  
Product authorities: `JobFree_PRD_Admin_Data_Source_of_Truth.md`, `JobFree_PRD_Admin_System_Source_of_Truth.md`  
Domain contract: `supporting/JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1.md`  
API contract: `supporting/JobFree_API_Contract_v2.0.md`  
Supersedes: frontend architecture and shared UI sections in both retired `UI_Ready_v1.0` PRDs, recoverable through Git history only

## 1. Purpose and boundaries

This document is the single system-design authority for the two internal admin consoles. It defines architecture, module boundaries, UI foundations, component ownership, data access, security integration, testing and delivery constraints.

It MUST NOT redefine business states, permissions, finance rules, metrics, export policy or acceptance outcomes owned by Canonical and the PRDs.

### 1.1 In scope

- Admin Data and Admin System application shell, routes and feature modules.
- A shared admin design system whose primary component library is `shadcn/ui`.
- Frontend contracts for server state, forms, tables, charts, errors, accessibility and tests.
- Integration boundaries for the JobFree API/Supabase services.
- Progressive migration from the current lightweight React/Vite structure.

### 1.2 Explicitly out of scope

- Redesigning the landing page or public marketing experience.
- Importing admin visual tokens, shell layout or dense operational patterns into public pages.
- Replacing canonical domain rules with UI state.
- Direct browser access to privileged tables, service-role credentials, provider secrets or unrestricted writes.
- A generic database editor, SQL console or configurable low-code admin builder.

> **DATA RULE**  
> The landing page remains behaviorally and visually unchanged. Admin work MUST be isolated by route, layout, component import and scoped CSS variables so it cannot cause public-page regressions.

## 2. Architecture principles

1. **One admin design system, two role-focused consoles.** Admin Data and Admin System reuse the same primitives, tokens, shell and state patterns. They differ by routes, permissions, workflows and domain composition.
2. **Product semantics stay outside components.** A button or badge never becomes the source of truth for state, permission or money.
3. **Server authorization is authoritative.** Route guards and hidden controls improve UX; API authorization and RLS enforce access.
4. **Commands are explicit.** High-risk actions use named commands, confirmation, version checks, audit and idempotency where required. No generic high-risk CRUD form.
5. **Read models are intentional.** Admin screens consume scoped DTOs/read models with freshness metadata, not arbitrary table joins in components.
6. **Accessible density.** Operational screens optimize scanning and repeated action without sacrificing keyboard use, focus, labels or contrast.
7. **Progressive adoption.** Existing public code continues to work while admin routes adopt the shared system incrementally.

## 3. Technology baseline

| Concern | Decision |
| --- | --- |
| Application | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS 4 and CSS custom properties |
| Primary admin UI library | `shadcn/ui`, with source-owned components in `src/components/ui` |
| Accessible primitives | Radix UI through shadcn components; direct Radix use only when no suitable shadcn primitive exists |
| Icons | `lucide-react`; no duplicated hand-drawn SVG icon set |
| Routing | React Router; lazy admin feature routes; URL-owned filters and pagination |
| Forms and validation | React Hook Form + Zod; shared server-error mapping |
| Server state | TanStack Query target standard; abortable requests, explicit query keys/staleness and invalidation |
| Tables | TanStack Table through a JobFree `DataTable` wrapper; server pagination/sort/filter |
| Client UI state | Local state by default; Zustand only for shell/global ephemeral state, never as server-record storage |
| Notifications | Sonner for transient feedback; errors also remain visible in the relevant form/page state |
| Motion | Framer Motion only for purposeful transitions; reduced-motion respected |
| Backend boundary | `/api/v2` contracts and controlled Supabase/RPC/Edge Function adapters |
| Tests | Vitest + Testing Library target baseline; Playwright for critical end-to-end flows; deterministic API fixtures/MSW |

Packages listed as a target standard MUST be added only when the implementation slice needs them. Adding a package does not authorize changing public-page behavior.

## 4. Runtime and trust boundaries

```text
Browser
  -> Public routes -----------------> existing public services/styles
  -> Authenticated admin routes
       -> AdminShell
       -> feature query/command hooks
       -> typed API client (/api/v2)
       -> controlled server/RPC/Edge Function
       -> RLS + canonical source/read model
       -> audit/event append
```

| Boundary | Requirement |
| --- | --- |
| Browser | Holds session and display state only; no service-role or provider secret |
| API client | Sends typed DTOs, correlation ID, expected version and idempotency key when required |
| Server command | Re-checks identity, scope, permission, state, freshness and actor separation |
| Read model | Applies projection/masking and exposes freshness/watermark/version metadata |
| Storage | Canonical entity/state/invariant and RLS remain authoritative |
| Audit/event | Every mutation records actor, object, outcome, reason and correlation/causation context |

## 5. Repository and module design

The target layout extends the current repository without forcing a broad rewrite:

```text
src/
  components/
    ui/                 # shadcn source-owned primitives
    admin/              # JobFree compositions shared by both consoles
    shared/             # truly cross-surface utilities only
  features/
    admin-data/         # AD screens, queries, schemas and feature composition
    admin-system/       # AS screens, commands, approvals and configuration
    finance/            # shared finance presentation, never canonical ownership
    auth/               # session, MFA context and access UX
  layouts/
    internal/           # AdminShell and role-aware navigation
    public/             # existing landing/public layout; unchanged by this design
  routes/
    admin-data/
    admin-system/
    public/
  api/                  # typed transport, interceptors and error mapping
  lib/                  # query client, formatters and infrastructure adapters
  models/               # DTO/view models; no duplicated canonical enums
  stores/               # shell-only ephemeral Zustand stores
  test/                 # fixtures, render helpers and API mocks
```

### 5.1 Dependency rules

- Feature modules MAY import `components/ui`, `components/admin`, `api`, `lib` and shared models.
- `components/ui` MUST NOT import feature modules or contain JobFree business rules.
- `components/admin` MAY compose primitives but MUST receive domain values/actions through typed props.
- Admin Data and Admin System MUST NOT import each other's page components. Shared composition moves to `components/admin` or a shared domain feature.
- Public routes/layouts MUST NOT import `components/admin` or admin-only theme files.
- API code MUST NOT import React components.

## 6. shadcn/ui design-system contract

`shadcn/ui` is the primary admin component foundation. Generated source belongs to this repository and is reviewed like application code.

### 6.1 Primitive policy

- Add primitives through the shadcn workflow and keep canonical names under `src/components/ui`.
- Preserve keyboard, ARIA and focus behavior supplied by the primitive.
- Prefer variants via `class-variance-authority`; use `cn()` for class composition.
- Do not fork the same primitive for Admin Data and Admin System.
- Do not place domain fetching, permission evaluation or financial calculations in primitives.
- Direct Radix imports are allowed only inside `components/ui` or when a documented missing primitive requires them.
- Use Lucide icons in icon buttons and provide accessible names/tooltips for unfamiliar actions.

### 6.2 Required primitive set

| Group | shadcn primitives |
| --- | --- |
| Action | Button, Dropdown Menu, Context Menu, Command, Tooltip |
| Input | Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Calendar/Popover |
| Structure | Separator, Tabs, Accordion, Collapsible, Scroll Area, Resizable where justified |
| Feedback | Alert, Alert Dialog, Dialog, Sheet, Sonner, Progress, Skeleton |
| Data | Table, Badge, Avatar, Pagination |
| Navigation | Breadcrumb, Sidebar, Navigation Menu only where appropriate |

### 6.3 JobFree admin compositions

| Component | Responsibility |
| --- | --- |
| `AdminShell` | Permission-aware sidebar, top bar, breadcrumbs, route outlet and global error boundary |
| `PageHeader` | Title, description, freshness, primary command and overflow actions |
| `KpiStrip` / `KpiCard` | Metric ID, unit, cutoff, freshness and drill-down; never computes canonical metric |
| `FilterBar` | Schema-driven filters, URL synchronization, reset and active count |
| `DataTable` | Server pagination/sort/filter, column visibility/pinning, selection and row actions |
| `DomainStatusBadge` | Requires `domain + state`; label/color/icon are presentation only |
| `MoneyCell` | Integer VND rendering, sign, masking and tabular numerals; no float math |
| `FreshnessIndicator` | `computed_at`, watermark and FRESH/STALE/PARTIAL/UNKNOWN state |
| `AsyncState` | Loading, empty, error, stale/partial, forbidden and not-found variants |
| `CommandDialog` | Impact preview, reason/evidence, expected version and explicit confirmation |
| `ApprovalPanel` | Proposal/evidence/maker/checker context; cannot perform execution implicitly |
| `AuditTimeline` | Actor, action, object, outcome, redacted diff and correlation ID |
| `EvidenceViewer` | Signed access, expiry and access audit; no durable raw URL |

## 7. Visual tokens and layout

Admin tokens are semantic CSS variables scoped to the internal admin root, for example `[data-admin-console]`. Public-page variables remain untouched.

| Token group | Contract |
| --- | --- |
| Brand | JobFree yellow is an accent/action signal, not the entire interface background |
| Neutral | White/near-white work surfaces, readable near-black text and restrained gray borders |
| Semantic | Distinct info, success, warning and destructive colors; status never relies on color alone |
| Typography | Existing project font stack; H1 24/32, H2 18/28, body 14/20, dense table 13/18; no viewport-scaled fonts |
| Radius | Controls 6-8px; panels/cards no more than 8px unless a primitive requires otherwise |
| Spacing | 4px base scale; consistent 8/12/16/24/32 rhythm |
| Focus | Visible 2px focus ring with sufficient contrast |
| Numbers | Tabular numerals for money, counts and IDs where useful |

Layout baseline:

- Desktop-first admin experience: 1440px reference, supported from 1024px.
- Sidebar 280px expanded and 72-76px collapsed; content uses available width up to 1600px.
- Dense tables scroll horizontally rather than shrinking critical labels beyond readability.
- At narrower widths, secondary filters/actions move into Sheet/overflow controls; critical state and primary action remain visible.
- Page sections are unframed bands or layouts. Cards are reserved for repeatable units such as KPIs and queue items; no nested card stacks.

## 8. Navigation and route ownership

| Namespace | Layout | Product owner |
| --- | --- | --- |
| `/` and public routes | Existing `Public.layout` | Landing/public experience, unchanged |
| `/admin-data/*` | Shared `AdminShell`, Data navigation model | Admin Data PRD |
| `/admin-system/*` | Shared `AdminShell`, System navigation model | Admin System PRD |

- Route metadata contains title, breadcrumb, required view permission and optional feature flag.
- Navigation visibility is derived from server-provided effective permissions but is not authorization.
- Deep links preserve safe return route and URL filters.
- A forbidden route renders a 403 state without fetching or leaking protected records.
- Unknown object IDs render not-found only after authorization-safe lookup semantics from the API contract.

## 9. Data access and state management

### 9.1 Query contract

- Query keys include feature, endpoint identity and normalized URL filters.
- List/detail data is server paginated and sorted unless a contract explicitly declares a bounded local set.
- Requests support cancellation; superseded searches do not overwrite current results.
- Cached data keeps its server freshness metadata. Client cache age MUST NOT replace source freshness.
- Missing, null, zero, stale, partial and forbidden remain distinct states.

### 9.2 Command contract

- Commands call explicit API endpoints and never mutate cached objects as if confirmed.
- Optimistic UI is forbidden for monetary execution, approval, period close, RBAC, verification decision and sensitive configuration.
- Mutable commands include `expected_version`; retry behavior follows the standard error code.
- Monetary commands include `Idempotency-Key`; `UNKNOWN_RESULT` transitions to inquiry/reconciliation, never blind retry.
- Successful commands invalidate or update only documented query keys and surface the returned audit/correlation reference.

### 9.3 Forms

- Zod schemas mirror request DTO shape but do not replace server validation.
- Server `field_errors` map to controls and a form summary.
- Dirty forms warn before route change where losing input is material.
- Reason/evidence fields required by the command contract cannot be hidden by UI variants.

## 10. Tables, analytics and operational states

- `DataTable` accepts typed column definitions, server query state and an explicit row identity.
- Selection is cleared or reconciled when filters/data version changes; bulk actions revalidate all selected IDs server-side.
- Column state MAY persist per user, but hidden PII fields are excluded before data reaches the browser.
- Charts use a maintained React chart library behind a JobFree wrapper and include a table or accessible textual alternative.
- KPI/chart drill-down preserves metric version, cutoff and filter semantics.
- Loading uses stable skeleton dimensions. Empty means a successful complete query with no records; it is never used for forbidden/error/stale.

## 11. Security, privacy and audit integration

- Session identity, role, scope, permission and MFA context are server-derived.
- UI permission helpers accept stable permission keys; they never accept arbitrary role-name checks.
- Sensitive fields use masked DTOs by default. Privileged views use explicit endpoints and are not cached longer than policy permits.
- Evidence/document links are short-lived, signed and audited. Raw bank/provider payload/secrets never enter generic component props.
- Logs, analytics and error reporting redact PII, tokens, signed URLs and raw payloads.
- All command dialogs display the affected object and consequence. Destructive, monetary and critical configuration commands require explicit confirmation and reason according to the PRD/API.

## 12. Error and recovery model

| Error code | Required UI behavior |
| --- | --- |
| `UNAUTHENTICATED` | Redirect to login with a safe return URL |
| `FORBIDDEN` | Render scoped 403 state; do not retry or leak record existence |
| `NOT_FOUND` | Render not-found with safe navigation |
| `VALIDATION_ERROR` | Map fields and form summary |
| `CONFLICT` | Preserve input, show current server version and offer reload/compare |
| `STALE_DATA` | Block risky command and require refresh |
| `DUPLICATE_REQUEST` | Show original result/reference when available |
| `PROVIDER_UNAVAILABLE` | Show degraded state; retry only under policy |
| `UNKNOWN_RESULT` | Show pending inquiry/reconciliation path; no blind retry |
| `RATE_LIMITED` | Show retry timing without repeated automatic submissions |
| `EXPORT_EXPIRED` | Keep metadata; offer a new governed export request if allowed |

## 13. Testing strategy

| Layer | Minimum coverage |
| --- | --- |
| Unit | Formatters, URL/query normalization, permission helpers, schemas and state mapping |
| Component | Primitive variants, shared admin compositions, keyboard/focus and all async states |
| Integration | Query/command hooks with API fixtures; version/idempotency/error mapping |
| E2E | P0 read paths, maker-checker, monetary execution, period close, PII/evidence and export lifecycle |
| Security | Hidden-button bypass, RLS scope, masking, no raw-bank/secret responses and signed-link expiry |
| Regression | Existing landing/public routes render and behave unchanged |

Every P0 screen fixture set MUST cover success, loading, empty, error, stale/partial, forbidden and conflict/not-found where applicable.

## 14. Delivery sequence

1. Install/configure shadcn for Tailwind 4 and create scoped admin tokens without changing public styles.
2. Build primitives and shared admin compositions with Storybook-equivalent isolated examples or test harness pages.
3. Migrate `Internal.layout` to `AdminShell` while preserving existing role routes.
4. Implement one vertical slice in Admin Data and one in Admin System to validate read and command patterns.
5. Expand P0 screens by PRD priority; add tests alongside each slice.
6. Remove duplicated local components only after all importers migrate and visual/accessibility regression passes.

## 15. Architecture Definition of Done

- [ ] Admin Data and Admin System use the same shadcn-based primitive layer and shared admin compositions.
- [ ] Public landing routes have no visual or behavioral regression.
- [ ] No feature page contains direct canonical money/state calculations.
- [ ] No frontend path contains service-role, provider secret or generic privileged table write.
- [ ] Every P0 screen implements the standard async states and URL-owned filters.
- [ ] Every high-risk command implements permission UX, confirmation, expected version, audit and documented retry semantics.
- [ ] Accessibility checks pass for keyboard, focus, labels, contrast and dialog behavior.
- [ ] Unit, component, integration, E2E, security and public-regression gates pass for the affected slice.
