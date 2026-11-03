# JobFree API Contract v2.0

Status: Draft - Iteration 1 foundation, pending independent review  
Audience: Frontend, Backend/Supabase, Data, QA, Security, Product  
API version: `v2`  
Base path: `/api/v2`  
Source checkpoint: JobFree PRD v2 Release Candidate set and Master Traceability v2.0

## 1. Purpose and authority

This document defines the HTTP and command contract through which JobFree admin clients consume the approved domain behavior. It is an implementation-facing contract, not a new source of business truth.

Authority order:

```text
Canonical Data Model v1.1
  -> owning product/subsystem PRD v2
    -> Master Traceability v2.0
      -> this API Contract v2.0
        -> schema/RLS/functions/workers/frontend implementation
```

When this document conflicts with a higher authority, the higher authority wins and this contract MUST be corrected. API convenience MUST NOT create a new state, permission, metric, financial formula, approval rule or PII exception.

### 1.1 Iteration 1 scope

Iteration 1 owns:

- global HTTP/JSON conventions;
- authentication and authorization context;
- concurrency, idempotency and retry rules;
- common request/response, audit and error envelopes;
- PII and finance representation boundaries;
- an API inventory skeleton covering every P0 Master Traceability row;
- placeholders and completion rules for Iterations 2-4.

Iteration 1 does not finalize screen-specific query parameters, business DTOs or command preconditions. Those are completed in:

| Iteration | Scope |
| --- | --- |
| 2 | Admin Data reads and commands, reconciliation, proposals, period preparation, Data-side export integration |
| 3 | Admin System reads and commands, approvals/execution, operations, users/verification, catalog/config/RBAC |
| 4 | Export APIs, cross-contract normalization, complete endpoint traceability and QA matrix |

### 1.2 Contract principles

1. Server authorization and RLS are authoritative. UI visibility is not authorization.
2. Reads MAY be REST resources. High-risk mutations MUST be explicit commands/RPCs, never generic table CRUD.
3. Canonical IDs are UUID strings. Public/provider references never replace internal IDs.
4. Mutable aggregate commands require `expected_version`.
5. Monetary commands require `Idempotency-Key` and persist request hash/result.
6. `correlation_id` links HTTP request, command, event, audit, provider attempt and ledger effect.
7. Immutable resources have no update/delete endpoint. Corrections create linked successor, reversal or compensating records.
8. Missing, null, stale, partial and zero are distinct response meanings.
9. Persisted timestamps are UTC. Display conversion to `Asia/Ho_Chi_Minh` is a client/presentation concern.
10. Integer VND and canonical state separation are preserved end to end.

## 2. REST and command boundary

| Concern | Contract style | Examples |
| --- | --- | --- |
| List/detail/read model | `GET` resource | dashboards, jobs, payments, cases, audit, export history |
| Low-risk version creation | Explicit collection or command | create draft service/pricing/config version |
| Guarded domain transition | `POST .../commands/{verb}` | submit proposal, approve, execute, close, reopen, assign |
| Immutable evidence/decision | `POST` append command | add evidence, create approval decision, add audit-linked note |
| Provider callback | Dedicated authenticated callback | provider event ingestion and deduplication |
| Generic `PATCH /table/:id` | Forbidden for high-risk aggregates | finance, ledger, payout, period, verification, RBAC, audit |

`PUT` is not used to imply complete replacement of an aggregate whose invariants span records. `DELETE` is absent for ledger, audit, evidence, reconciliation history, period snapshots and export history. Deactivation/archive is an explicit versioned command where the owning PRD permits it.

## 3. Global HTTP contract

### 3.1 Transport and media type

- HTTPS is mandatory outside local development.
- Request and response content type is `application/json; charset=utf-8` unless returning an authorized file stream.
- API routes start with `/api/v2`.
- JSON field names are `snake_case`.
- Unknown request fields are rejected for command DTOs and ignored only for explicitly forward-compatible filter objects.
- Responses MUST NOT expose database table rows verbatim.

### 3.2 Standard headers

| Header | Direction | Rule |
| --- | --- | --- |
| `Authorization` / approved session cookie | Request | Establishes authenticated admin session; exact transport is implementation-owned |
| `X-Request-ID` | Both | Client MAY send; server validates or replaces and always returns one |
| `X-Correlation-ID` | Both | Client MAY continue a known workflow; server creates when absent and always returns canonical value |
| `Idempotency-Key` | Request | Required for monetary/external-effect commands; opaque, scoped and unique |
| `If-None-Match` / `ETag` | Both | MAY support cache validation for immutable/versioned reads; never replaces `expected_version` for commands |
| `Retry-After` | Response | Required with rate limiting or known temporary service backoff |

### 3.3 Scalar conventions

| Type | JSON representation | Rules |
| --- | --- | --- |
| UUID | lowercase canonical string | Stable internal ID; validation rejects malformed IDs |
| Timestamp | RFC 3339 UTC string | Example `2026-10-01T12:30:00Z`; offset input normalized to UTC |
| Local date | `YYYY-MM-DD` string | Used only with explicit timezone/cutoff semantics |
| Boolean | JSON boolean | Never `0/1` or string |
| Enum | uppercase string | Must belong to owning canonical aggregate enum |
| Integer count/version | JSON integer | Non-negative unless field definition says signed |
| VND amount | `MoneyDTO` | Base-10 integer string, no decimal or float |
| Nullable | explicit JSON `null` | Means unknown/not-applicable as documented; omission means field not projected |

### 3.4 Money representation

```json
{
  "amount": "125000",
  "currency": "VND"
}
```

`MoneyDTO.amount` is a signed base-10 integer string so JavaScript clients cannot lose `bigint` precision. No decimal separator, grouping symbol, float, localized string or implicit currency is accepted. Operational components that are canonically non-negative validate `amount >= 0`; signed corrections are limited to authorized journal/adjustment DTOs.

### 3.5 Success envelope

Single resource:

```json
{
  "data": {},
  "meta": {
    "request_id": "req_...",
    "correlation_id": "uuid",
    "generated_at": "2026-10-01T12:30:00Z"
  }
}
```

List resource:

```json
{
  "data": [],
  "page": {
    "next_cursor": null,
    "has_more": false,
    "page_size": 50
  },
  "meta": {
    "request_id": "req_...",
    "correlation_id": "uuid",
    "generated_at": "2026-10-01T12:30:00Z",
    "computed_at": "2026-10-01T12:29:30Z",
    "source_watermark": "opaque",
    "freshness": "FRESH"
  }
}
```

`data` is never replaced by a bare array. A successful no-body command uses `204` only when no resource, execution or audit reference is needed; otherwise it returns the affected resource/command receipt.

### 3.6 Pagination, sorting, filtering and search

- Cursor pagination is required for mutable or large collections.
- `page_size` default is `50`, maximum `100` unless an endpoint contract states a smaller bound.
- `cursor` is opaque, signed or server-verifiable and bound to endpoint, actor scope, filter and sort.
- Sort uses an endpoint allowlist via `sort=field,-other_field`; stable ID is the final tie-breaker.
- Filters use explicit typed query parameters. Unknown filters return `VALIDATION_ERROR`.
- Date/time filters use `from` inclusive and `to` exclusive unless a specific contract states otherwise.
- Search is endpoint-scoped; it never becomes unrestricted SQL/full-row search.
- Cursor reuse with changed filter/sort/scope returns `VALIDATION_ERROR` or `CONFLICT`, never silently changes dataset.

### 3.7 Read-model freshness

Read responses that depend on derived/materialized data MUST provide applicable fields:

```json
{
  "computed_at": "2026-10-01T12:29:30Z",
  "source_watermark": "opaque",
  "freshness": "FRESH",
  "partial_sources": [],
  "metric_version": "m-v1"
}
```

`freshness` is `FRESH | STALE | PARTIAL | UNKNOWN`. Numeric values MUST be `null` when the owning contract says incomplete data cannot be interpreted as zero. Exact thresholds remain configurable under `OD-FRESHNESS`.

### 3.8 HTTP status mapping

| Status | Use |
| --- | --- |
| `200 OK` | Successful read or synchronous command with result |
| `201 Created` | New draft/request/version resource created |
| `202 Accepted` | Persisted asynchronous request/execution/export; pollable resource returned |
| `204 No Content` | Successful command with no required receipt body, used sparingly |
| `400 Bad Request` | Malformed JSON, query syntax or unsupported content |
| `401 Unauthorized` | No valid authenticated session |
| `403 Forbidden` | Authenticated but permission/scope denied |
| `404 Not Found` | Resource absent or intentionally hidden by scope policy |
| `409 Conflict` | Version/state/duplicate/in-progress/UNKNOWN conflict |
| `412 Precondition Failed` | Business freshness, evidence, approval or policy prerequisite not met |
| `422 Unprocessable Content` | Structurally valid request with field validation errors |
| `429 Too Many Requests` | Rate/quota limit with `Retry-After` where known |
| `503 Service Unavailable` | Required provider/source temporarily unavailable |

## 4. Authentication and authorization contract

### 4.1 Authenticated admin context

The server derives an `AdminContext` from the trusted session and current authorization data:

```json
{
  "admin_account_id": "uuid",
  "session_id": "uuid",
  "role_ids": ["uuid"],
  "scopes": [],
  "permissions": ["stable.permission.key"],
  "mfa": {
    "satisfied": true,
    "satisfied_at": "2026-10-01T12:00:00Z",
    "method": "approved_method"
  }
}
```

This object is conceptual server context, not a client-supplied DTO. The API MUST NOT trust frontend-provided role IDs, permissions, scopes, maker/checker IDs, MFA flags or actor IDs. Tokens/JWT claims may identify a session but current server grants/RLS remain authoritative.

### 4.2 Authorization evaluation order

1. authenticate session;
2. resolve active admin account and server-side grants;
3. enforce RLS/object scope;
4. enforce permission key;
5. enforce domain state and action preconditions;
6. enforce maker-checker separation, MFA and reason where required;
7. enforce freshness/version/idempotency/duplicate guards;
8. execute and append audit/event evidence.

Permission alone never satisfies a business precondition. A hidden button does not prevent direct API calls; the same server decision MUST reject bypass attempts.

### 4.3 Unauthenticated, forbidden and hidden resources

- `UNAUTHENTICATED` returns `401`; the client starts the approved login/session recovery flow.
- `FORBIDDEN` returns `403` without sensitive object details.
- A scope-sensitive object MAY return `404` instead of `403` to prevent existence disclosure; the endpoint contract must state this behavior.
- Denied high-risk attempts are audited with redacted request context.

### 4.4 Maker-checker

For workflows that require separation, maker identity is read from the persisted proposal/request and checker identity from `AdminContext`. The request MUST NOT supply either as an authority claim. `checker_id == maker_id` returns `PRECONDITION_FAILED` and records a denied audit event. Approval creates an immutable decision and no financial effect; execution is a later command.

## 5. Concurrency, idempotency and retry

### 5.1 Optimistic concurrency

Mutable aggregate commands include:

```json
{
  "expected_version": 7,
  "reason_code": "APPROVED_REASON",
  "reason": "Human-readable, redacted where required"
}
```

The server atomically compares `expected_version` to the current aggregate version. A mismatch returns `409 CONFLICT` with the current safe version/reference and `retryable=true` only after the client reloads and re-evaluates. Last-write-wins is forbidden.

Immutable resources do not accept `expected_version` update commands; a correction creates a linked successor or compensating record.

### 5.2 Idempotency key

`Idempotency-Key` is mandatory for commands that can move money, call an external provider, post ledger effects, close/reopen a period or create an export job. The server stores at least:

- actor/scope and command name;
- idempotency key;
- canonical request hash;
- correlation ID;
- execution/request resource ID;
- final or latest result and status;
- retention/expiry policy reference.

Same key + same canonical request returns the original command receipt/result. Same key + different request returns `409 DUPLICATE_REQUEST`. A new key MUST NOT be used to bypass an `UNKNOWN` provider result.

### 5.3 Retry classes

| Class | Client behavior |
| --- | --- |
| Safe read | Retry with bounded exponential backoff for network/503/429 |
| Validation/permission/precondition | Do not retry unchanged request |
| Version conflict | Reload, re-evaluate and submit with current version only if still valid |
| Idempotent command timeout | Repeat with the same idempotency key |
| Provider `UNKNOWN` | Do not issue new execution; poll/inquire/reconcile existing attempt |
| Export `FAILED` | Explicit retry command only when registry permits and attempts < 3 |

## 6. Audit and event contract

### 6.1 Mutation audit requirement

Every mutation records:

| Field | Rule |
| --- | --- |
| `audit_event_id` | UUID, immutable |
| `actor_admin_account_id` | Derived from authenticated context |
| `session_id` / IP reference | Restricted/redacted reference, never raw in general DTO |
| `action` | Stable command/action key |
| `object_type`, `object_id` | Canonical target identity |
| `permission_key` | Permission evaluated |
| `result` | success/denied/failed with stable code |
| `reason_code`, `reason` | Required by command policy; sensitive text redacted |
| `expected_version`, `result_version` | Where aggregate is mutable |
| `correlation_id`, `causation_id` | End-to-end trace |
| `before`, `after` | Redacted projection or hashes; never raw secret/PII payload |
| `occurred_at`, `received_at` | UTC, distinct semantics |

Audit append failure for a high-risk command MUST fail/rollback the command unless the owning technical design proves an atomic durable outbox equivalent. Audit records have no update/delete API.

### 6.2 Domain event envelope

```json
{
  "event_id": "uuid",
  "event_type": "STABLE_EVENT_NAME",
  "schema_version": 1,
  "aggregate_type": "canonical_type",
  "aggregate_id": "uuid",
  "occurred_at": "2026-10-01T12:30:00Z",
  "received_at": "2026-10-01T12:30:01Z",
  "source_system": "jobfree_admin_api",
  "correlation_id": "uuid",
  "causation_id": "uuid-or-null",
  "actor_id": "uuid-or-null",
  "payload": {}
}
```

Event payloads are versioned, minimized and redacted. Events are not an alternate mutable source of truth. Out-of-order ingestion MUST NOT silently regress aggregate state.

## 7. Common DTO catalog

### 7.1 Base resource DTO

```json
{
  "id": "uuid",
  "version": 7,
  "created_at": "2026-10-01T12:00:00Z",
  "updated_at": "2026-10-01T12:30:00Z"
}
```

`version` is present only for mutable aggregates. Immutable records expose creation/occurrence identity and never imply an update endpoint.

### 7.2 Command receipt DTO

```json
{
  "command_id": "uuid",
  "command": "stable.command.name",
  "status": "ACCEPTED",
  "target_type": "canonical_type",
  "target_id": "uuid",
  "result_version": 8,
  "correlation_id": "uuid",
  "execution_id": "uuid-or-null",
  "created_at": "2026-10-01T12:30:00Z"
}
```

Command receipt `status` describes request processing, not Job/payment/payout state. Endpoint-specific contracts MUST not collapse canonical aggregate states into this field.

### 7.3 Masked identity DTO

```json
{
  "user_id": "uuid",
  "display_name_masked": "N*** A",
  "phone_masked": "******1234",
  "email_masked": "a***@example.com"
}
```

Generic responses use masked DTOs. Privileged access is an endpoint-specific projection after server authorization and audit; it is never selected by a client boolean such as `include_raw=true`.

### 7.4 State rail DTO

Financial and operational detail responses preserve independent rails:

```json
{
  "job_state": "COMPLETED_CONFIRMED",
  "completion_confirmation_method": "EMPLOYER_ACCEPTED",
  "payment_state": "PAID_CONFIRMED",
  "fund_state": "RELEASE_ELIGIBLE",
  "payable_state": "ELIGIBLE",
  "batch_state": null,
  "payout_request_state": null,
  "latest_execution_state": null,
  "reconciliation_state": "MATCHED"
}
```

There is no canonical `financial_status`. `PAID_CONFIRMED`, `RELEASED` and `PAID_OUT` are never aliases.

## 8. Standard error envelope and catalog

### 8.1 Error envelope

```json
{
  "error": {
    "code": "CONFLICT",
    "message": "The resource changed. Reload before retrying.",
    "retryable": true,
    "field_errors": [],
    "details": {
      "current_version": 8
    }
  },
  "meta": {
    "request_id": "req_...",
    "correlation_id": "uuid",
    "generated_at": "2026-10-01T12:30:00Z"
  }
}
```

Messages are safe for the intended admin role and MUST NOT reveal secrets, raw provider payloads, SQL, stack traces or out-of-scope object facts. `details` is code-specific and redacted.

### 8.2 Error catalog

| Code | HTTP | Retryable | Required client behavior | Audit expectation |
| --- | --- | --- | --- | --- |
| `VALIDATION_ERROR` | 422 | No until corrected | Show field errors; retain safe input | Audit only for protected/high-risk command attempts |
| `UNAUTHENTICATED` | 401 | After login/session recovery | Start approved authentication flow | Security/session telemetry |
| `FORBIDDEN` | 403 | No | Show permission-denied state; do not reveal data | Denied high-risk/access attempts audited |
| `NOT_FOUND` | 404 | No | Show not-found or scope-hidden state | Optional; audit protected object probes |
| `CONFLICT` | 409 | After reload/re-evaluation | Reload current resource/version | Mutation conflict audited |
| `STALE_DATA` | 412 | After source refresh | Show stale source/watermark; block risky action | High-risk block audited |
| `PRECONDITION_FAILED` | 412 | After prerequisite changes | Show safe unmet prerequisites | Denied command audited |
| `DUPLICATE_REQUEST` | 409 | Same key only if same request | Reuse original receipt; never create new effect | Idempotency decision audited |
| `PROVIDER_UNAVAILABLE` | 503 | Bounded; same key for command | Backoff/poll; do not duplicate submit | Attempt/provider failure audited |
| `UNKNOWN_RESULT` | 409 | No blind retry | Open/poll inquiry or reconciliation for existing attempt | UNKNOWN transition and follow-up audited |
| `RATE_LIMITED` | 429 | Yes after `Retry-After` | Backoff; preserve filters/input | Security/abuse telemetry; protected commands audited |
| `EXPORT_EXPIRED` | 410 | No | Show expired metadata; create a new authorized export if needed | Download denial audited |

Endpoint contracts MAY add stable domain error codes but MUST map them to this envelope and specify HTTP status, retryability, UI behavior and audit behavior.

## 9. PII and sensitive-data API boundary

| Data class | Generic DTO | Privileged path |
| --- | --- | --- |
| Phone/email/full name | Masked/omitted | Dedicated scoped projection; export requires approved PII flow |
| ID document/number | Verification metadata only | Short-lived signed document access; no raw document export in MVP |
| Bank | Last four only where required | Raw bank never returned/exported through admin API |
| GPS/evidence | Region/metadata | Case-scoped signed access; no bulk raw export in MVP |
| IP/session | Omitted or masked reference | Security-only audit projection |
| Provider raw payload/secrets | Never returned | Restricted service-side pointer/hash only |

Signed evidence/document access endpoints MUST reauthorize every issuance, use short expiry, bind object/actor/purpose and write an audit event. Object-storage keys and service-role/provider secrets are never API DTO fields.

## 10. Finance API boundary

Finance APIs MUST keep these resources and state fields separate:

- Payment Order / normalized Provider Transaction;
- Job Funds Allocation;
- Worker Payable;
- Payout Batch and Batch Item;
- Payout or Refund Request;
- Finance Proposal;
- Approval Record;
- Execution Request and Execution Attempt;
- Ledger Transaction and Entry;
- Reconciliation Run/Item/Match/Case;
- Finance Period, Close Run and Snapshot;
- Export Job/File (reference only, never finance source of truth).

Money responses use committed Job financial/version references for history. No API recomputes a historical Job with current pricing/voucher/service rules. Ledger posting is balanced and append-only; corrections are explicit compensation/reversal commands. Revenue recognition is tied to `COMPLETED_CONFIRMED`; Cash Collected and GMV remain distinct metrics.

## 11. P0 API inventory skeleton

The rows below reserve stable API IDs and iteration ownership. Detailed endpoint, permission, request/response DTO, errors and tests MUST be completed in the named iteration before the API is implementation-ready.

| API family ID | P0 screen / Master Req | Planned read/command family | Domain/read model | Owner iteration | Foundation status |
| --- | --- | --- | --- | --- | --- |
| `API-AD01` | AD-01 / MT-AD01 | Finance control summary, queues and drill links | `admin_finance_control` | 2 | Skeleton |
| `API-AD02` | AD-02 / MT-AD02 | Payment list/detail, exact match, case create | `admin_payments` | 2 | Skeleton |
| `API-AD03` | AD-03 / MT-AD03 | Financial journey detail and proposal handoff | `admin_financial_detail` | 2 | Skeleton |
| `API-AD04` | AD-04 / MT-AD04 | Payables list/detail and batch proposal | `admin_payables` | 2 | Skeleton |
| `API-AD05` | AD-05 / MT-AD05 | Reconciliation summary/items/match/case | recon cutoff/rule views | 2 | Skeleton |
| `API-AD06` | AD-06 / MT-AD06 | Case detail, assign, evidence, proposal | recon case detail | 2 | Skeleton |
| `API-AD07` | AD-07 / MT-AD07 | Proposal list/detail/create/update/submit | proposal queue | 2 | Skeleton |
| `API-AD08` | AD-08 / MT-AD08 | Period checks, prepare and package | period checks/snapshot view | 2 | Skeleton |
| `API-AD18A` | AD-18a + EX-01 / MT-AD18A | Export history/create/cancel/retry/download | `admin_exports` | 2 + 4 | Skeleton |
| `API-AS01` | AS-01 / MT-AS01 | System dashboard summaries and drill links | `admin_system_dashboard` | 3 | Skeleton |
| `API-AS02` | AS-02 / MT-AS02 | Live operations and incident/assignment handoff | live operations view | 3 | Skeleton |
| `API-AS03` | AS-03 / MT-AS03 | Job list and guarded transitions | `admin_jobs` | 3 | Skeleton |
| `API-AS04` | AS-04 / MT-AS04 | Job detail/evidence access | job detail view | 3 | Skeleton |
| `API-AS05` | AS-05 / MT-AS05 | Candidate list and manual assign | candidate/rule snapshot | 3 | Skeleton |
| `API-AS06` | AS-06 / MT-AS06 | Dispute list/detail/resolve/proposal handoff | dispute case view | 3 | Skeleton |
| `API-AS07` | AS-07 / MT-AS07 | User list/detail/status and PII export request | masked user view | 3 | Skeleton |
| `API-AS08` | AS-08 / MT-AS08 | Verification queue/detail/decision/evidence | verification views | 3 | Skeleton |
| `API-AS09` | AS-09 / MT-AS09 | Approval queue and decision commands | approval queue | 3 | Skeleton |
| `API-AS10` | AS-10 / MT-AS10 | Payout/refund execution and inquiry | execution control view | 3 | Skeleton |
| `API-AS11` | AS-11 / MT-AS11 | Provider/ledger/recon reads and compensation | transaction/ledger view | 3 | Skeleton |
| `API-AS12` | AS-12 / MT-AS12 | Service/version reads and activation | service/version view | 3 | Skeleton |
| `API-AS13` | AS-13 / MT-AS13 | Pricing version reads and activation | pricing version view | 3 | Skeleton |
| `API-AS15` | AS-15 / MT-AS15 | Admin account/session commands | account/session view | 3 | Skeleton |
| `API-AS16` | AS-16 / MT-AS16 | Role/grant/scope reads and commands | role/grant view | 3 | Skeleton |
| `API-AS17` | AS-17 / MT-AS17 | Setting version reads and activation | setting/version view | 3 | Skeleton |
| `API-AS18` | AS-18 / MT-AS18 | Audit search/detail/export request | audit read model | 3 + 4 | Skeleton |
| `API-ASEX` | AS-EX + EX-01 / MT-ASEX | Scoped/all export lifecycle | `admin_exports` | 4 | Skeleton |

Coverage checkpoint: **27/27 P0 Master requirements have an API family reservation**.

## 12. Command inventory skeleton

Detailed commands are added in Iterations 2-4. Each row MUST eventually define method, route, permission, request DTO, response/receipt DTO, preconditions, concurrency, idempotency, audit event, errors and tests.

| Command family | Required commands | Iteration | Mandatory foundation controls |
| --- | --- | --- | --- |
| Reconciliation | exact match, case create/assign, evidence append | 2 | permission, rule/version, expected version, audit |
| Finance proposal | create, update draft, submit, cancel where canonical | 2 | maker identity server-derived, expected version, reason/evidence |
| Period preparation | run checks, prepare package, submit preparation | 2 | `recon.day.prepare`, freshness, audit; no close effect |
| Approval | approve, reject, request evidence | 3 | checker != maker, MFA/policy, immutable decision |
| Payout batch | prepare/propose, approve | 2 + 3 | duplicate/hold guard, expected version, maker-checker |
| Payout/refund execution | create execution, submit, inquire/reconcile | 3 | approval, MFA, idempotency, UNKNOWN/no blind retry |
| Period authority | close day, lock month, reopen, re-close | 3 | independent authority, checks/signoff, idempotency, snapshot lineage |
| Job operations | transition, manual assignment, dispute resolve | 3 | explicit verb, state/eligibility guard, expected version, reason |
| User/verification | status command, verification decision | 3 | scope, expected version, signed evidence, immutable decision |
| Catalog/pricing | create/activate/deactivate version | 3 | effective date/non-overlap, impact preview, ODs preserved |
| Access/RBAC/config | account/session, grant, setting activation | 3 | protected permission, MFA/policy, version, no secret response |
| Export | create, cancel, retry, authorize download | 2 + 4 | registry, scope, idempotency, PII policy, cancel/retry distinction |

## 13. Endpoint traceability matrix skeleton

The final matrix uses exactly these columns:

| API ID | Method | Route | PRD Screen | Master Req | Domain | Permission | Request DTO | Response DTO | Mutation/RPC | Audit Event | Errors | OD dependency | Test IDs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `API-FOUNDATION-HEALTH` | GET | `/api/v2/health` | platform only | n/a | Platform | internal/ops policy | none | `HealthDTO` | read only | telemetry | `PROVIDER_UNAVAILABLE` | none | `API-FND-HEALTH-01` |

Business endpoint rows are added when their detailed contracts are authored. An inventory row is not implementation-ready until all matrix cells are concrete and test IDs exist.

## 14. Open Decision handling

The API contract MUST NOT resolve `OD-*` implicitly. It keeps unresolved policy configurable/versioned:

| OD | API design accommodation |
| --- | --- |
| `OD-RETENTION` | Retention policy/version references; no hard-coded deletion duration in generic DTO |
| `OD-CLOSE` | Versioned close-check result/policy and explicit precondition errors |
| `OD-VOUCHER` | Committed calculation/rule version; no client-side rounding authority |
| `OD-MATCH` | Rule/version fields and opaque scored candidate explanation |
| `OD-METRIC` | Metric ID/version and formula metadata; no silent formula in endpoint |
| `OD-FRESHNESS` | Actual watermark/computed time and configurable freshness classification |
| `OD-PRICING-APPROVAL` | Optional approval linkage/policy version without assuming final checker threshold |
| `OD-CONFIG-CLASS` | Typed risk/policy metadata without hard-coding final class behavior |
| `OD-EXPORT-DELIVERY` | Versioned delivery policy and authenticated-link default |
| `OD-EXPORT-CONSISTENCY` | Consistency strategy/watermark metadata on export request/job |
| `OD-EXPORT-QUOTA` | Quota policy metadata and standard `RATE_LIMITED` response |

## 15. Foundation security and QA rules

Every detailed endpoint added later MUST include tests for applicable rules:

- unauthenticated and forbidden behavior;
- RLS/object scope bypass;
- malformed UUID/timestamp/money/enum/filter/cursor;
- null versus missing versus zero;
- stale/partial read model and watermark;
- expected-version conflict;
- same-key same-request idempotent replay;
- same-key different-request rejection;
- maker-checker self-approval rejection;
- MFA/reason enforcement;
- raw bank/provider secret/raw payload absence;
- signed evidence expiry and authorization;
- UNKNOWN result blocks blind retry;
- ledger balance and committed-history invariants;
- export cancel/retry/file/snapshot invariants;
- audit event on success and denied high-risk attempts.

## 16. Iteration 1 Definition of Done

- [x] Authority hierarchy and API layer boundary defined.
- [x] `/api/v2`, JSON, scalar, money and timestamp conventions defined.
- [x] Success, list, command-receipt and error envelopes defined.
- [x] Authentication, RLS, scope, MFA and maker-checker rules defined.
- [x] `expected_version`, idempotency and retry classes defined.
- [x] Audit/event envelopes and immutable boundary defined.
- [x] PII/sensitive-data and separated finance state boundaries defined.
- [x] Standard error catalog includes all PLAN-required codes.
- [x] 27/27 P0 Master requirements reserved in API inventory.
- [x] Command and endpoint traceability matrix skeletons created.
- [x] Open Decisions remain explicit and configurable/versioned.
- [ ] Admin Data detailed contracts complete (Iteration 2).
- [ ] Admin System detailed contracts complete (Iteration 3).
- [ ] Export and final traceability/QA complete (Iteration 4).

Iteration 1 completion means the foundation is ready for independent review. It does not mean the full API Contract v2.0 is final or implementation-ready.
