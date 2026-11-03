# JobFree Canonical Data Model & Conflict Resolution v1.1

Status: proposed canonical contract for schema design; no SQL migration in this iteration. Scope: shared Admin Data, Admin System, Export & Reports data/domain semantics. A screen is a consumer, not a database boundary.

## 1. Document authority

For active work, precedence is: **this Canonical Data Contract v1.1 > the owning active product PRD (Admin Data v2.0, Admin System v2.0 or Export & Reports v2.0) > System Design/API Contract > implementation**. An explicit decision here resolves a cited conflict. All shared status, money, entity, event and permission definitions MUST reference this document rather than duplicate older lists. Product change control and sign-off are still required before treating a proposed change as released policy.

Historical source labels `AD`, `AS`, `EX` and `Idea` refer to retired v1 PRDs, Export Supplement v1.1 and the INNOSTAR idea document, recoverable through Git history only. They are traceability inputs, not implementation authority. Active implementation authority is listed in `../JobFree_Documentation_Index.md`.

## 2. Global data rules

| Rule | Canonical contract |
| --- | --- |
| IDs | Internal aggregate and record PKs are UUIDs, generated once and never reused; public/provider identifiers (`order_code`, `provider_ref`, `statement_ref`) remain separate, provider-scoped, indexed and not substituted for PKs. Stable `service_id` survives renames; version rows have their own UUID. External-event deduplication uses provider + external ID, not a guessed internal UUID. |
| Money | Signed `bigint` integer minor unit VND (VND has no fractional minor unit); no float. Amounts carry explicit `currency='VND'` in monetary records, with same-currency checks before arithmetic. Non-negative operational components; signed corrections only in journal entries. |
| Time | Persist timezone-aware UTC instants. Render in `Asia/Ho_Chi_Minh`; a finance period also stores its local date/cutoff and timezone. `created_at` is persistence creation, `updated_at` is last mutation, `occurred_at` is source event time, `received_at` is ingestion time; never substitute one for another. Missing/stale observations remain unknown, not zero. |
| Concurrency | Mutable aggregates have monotonically increasing `version`. Mutations require `expected_version`; conflict returns a retryable version error, not last-write-wins. Immutable records have no mutable version path. |
| Trace/retry | `correlation_id` links request, event, proposal, execution, ledger and audit. Monetary execution requires scoped, unique `idempotency_key` and stores request hash/result; retries with same key cannot create a second effect. Provider callbacks also dedupe by provider event identity. |
| Delete/archive | No hard delete for financial, audit, submitted evidence, reconciliation, period or export metadata. Mutable accounts/config/schedules may be deactivated or archived with timestamps and actor; archive cannot erase history. Privacy retention/deletion is by approved policy and lawful hold, never UI deletion of an audit record. |
| Immutability | Posted ledger entries, audit events, signed period snapshots and submitted evidence are append-only. Corrections are linked compensating entries or new evidence versions; keep original provenance and hash. |
| Sensitive data | Classify and minimize PII at ingestion; encrypted restricted storage for raw documents/payment details, masked admin read models, signed access for files, scoped RLS/default deny. Never log raw secret, full bank account or provider payload in events/exports. Server authorization is authoritative; UI guards mirror it. |
| Provenance | Ingested/derived records carry `source_system`, provider where relevant, external reference, source `occurred_at`, `received_at`, schema/rule version and payload hash/pointer where available. Read models expose data freshness and source. |
| Events | Event envelope: `event_id`, `event_type`, `schema_version`, `aggregate_type/id`, `occurred_at`, `received_at`, `source_system`, `correlation_id`, optional causation/actor ID and redacted payload. Audit additionally records action, result, reason, permission, session/IP reference and redacted before/after. |

## 3. Canonical domain boundaries

| Domain | Owns; does not own |
| --- | --- |
| Identity & Access | `admin_accounts`, roles, grants, admin session policy; not user verification evidence. |
| Users & Verification | User/profile identity, verification decisions, protected documents, reviews; not admin role grants. |
| Catalog & Pricing | Stable service/voucher identity and effective-dated versions; not recalculation of committed job terms. |
| Jobs & Matching | Job lifecycle, candidate/matching/assignment records; not provider payment status. |
| Job Execution & Evidence | Check-in/out, checklist, submitted evidence, confirmation and risk flags; not payout success. |
| Payments & Ledger | Payment order/provider reconciliation inputs, journal and monetary provenance; not job completion. |
| Payouts / Refunds / Adjustments | Worker payable, batches, attempts, refunds and controlled monetary execution; not a generic balance field on `jobs`. |
| Disputes & Reconciliation | Cases, matching rules/runs, resolution links; not direct ledger mutation. |
| Finance Period Close | Checks, signoffs, immutable snapshots and reopen lineage; not export file versions. |
| Export & Reporting | Registry, jobs, files, downloads, schedules; not source financial facts. |
| Audit / Events / Data Quality | Immutable audit/event index, validation and DQ runs; not an alternative transactional source of truth. |

Cross-domain references use stable IDs and events. A UI view may join domains through authorized read models; a write crosses domains only through a checked server workflow.

## 4. Canonical state machines

States below are per aggregate, not one combined `status`. Transitions must be implemented as guarded commands with actor, reason when applicable, expected version, audit and event. Terminal/exception paths do not imply a payout or ledger result.

| Aggregate | States and principal transitions | Guard / semantics |
| --- | --- | --- |
| Job | `DRAFT -> PAYMENT_PENDING -> OPEN -> MATCHING -> ASSIGNED -> IN_PROGRESS -> COMPLETION_SUBMITTED -> COMPLETED_CONFIRMED`; `CANCELLED` from eligible pre-confirmation states; `DISPUTED` on an active/completion case | `OPEN` requires prepayment confirmation in MVP. `MATCHING` may return to `OPEN`; assignment may be retried. `DISPUTED` retains prior state and resolution event, so resolution returns to a valid lifecycle state or cancels/confirms with an auditable decision. Confirm only once. No `ACCEPTED`/`AUTO_CONFIRMED` as separate terminal job states. |
| Completion confirmation | `completion_confirmation_method = EMPLOYER_ACCEPTED | AUTO_CONFIRMED | ADMIN_RESOLVED` | Set only with `COMPLETED_CONFIRMED`; record confirmation actor/time/evidence/rule version. Existing six-hour auto-confirm rule still requires GPS/checklist/photo and no dispute (Admin PRDs section 1). |
| Payment order | `CREATED -> PENDING -> PAID_CONFIRMED | EXPIRED | FAILED` | PayOS callback verified and deduplicated before `PAID_CONFIRMED`; a later reversal/refund is a separate record/event, not overwriting history. |
| Job funds allocation | `NOT_FUNDED -> FUNDS_LOCKED -> RELEASE_ELIGIBLE -> RELEASED`; `FUNDS_LOCKED/RELEASE_ELIGIBLE -> ON_HOLD`; permitted refund path `-> REFUND_PENDING -> REFUNDED` | Hold release returns to prior eligible state after resolution. For partial refund/release, model separate amount allocations/journal movements; one enum must not claim all funds were both released and refunded. Risk hold maximum 24h applies only flagged cases per Admin baseline. |
| Finance proposal | `DRAFT -> PROPOSED -> PENDING_REVIEW -> APPROVED | REJECTED | EXPIRED | CANCELLED`; `PENDING_REVIEW -> NEEDS_EVIDENCE -> PENDING_REVIEW` | Proposal is a request, not approval or execution. Checker must differ from maker. Expiration/cancellation guarded and audited. |
| Execution request/attempt | `READY -> SUBMITTING -> PROCESSING -> SUCCEEDED | FAILED | UNKNOWN`; `READY -> CANCELLED` | `UNKNOWN` requires provider inquiry/reconciliation, never blind retry with a new key. A failed attempt may be followed by a new attempt under the same authorized request and dedupe policy. Approval is prerequisite, not success. |
| Payout request | `DRAFT -> PROPOSED -> APPROVED -> SUBMITTED -> PAID_OUT | FAILED | UNKNOWN`; pre-submission `CANCELLED` | Batch membership, provider attempts and payable eligibility have their own status. `PAID_OUT` requires confirmed provider result plus journal posting; `UNKNOWN` blocks duplicate submission. |
| Reconciliation item/case | `UNMATCHED -> MATCHED` or `UNMATCHED -> EXCEPTION -> RESOLVED -> CLOSED` | Exact match records rule version, object IDs and actor; an exception is not silently matched. Reopen, if needed, is a new audited case transition rather than editing a closed match. |
| Finance period | `OPEN -> CHECKING -> READY_TO_CLOSE -> DAILY_CLOSED -> MONTH_LOCKED`; `DAILY_CLOSED/MONTH_LOCKED -> REOPENED -> CHECKING` | Close checks and signoffs gate transitions. Reopen preserves previous snapshot and creates successor only through a new close run. Month lock/reopen remains Admin System authority. |

Verification and admin-account state sets remain as in both Admin PRDs section 7.1. Refund state is distinct from proposal and execution: `DRAFT/PROPOSED/APPROVED/PROCESSING/REFUNDED/FAILED` remains a display workflow, but its approval and provider execution evidence live in separate records. Each status column must be namespaced by aggregate and constrained to its own enum; do not reuse string labels across domains as implicit equivalence.

## 5. Conflict resolution register

`AD` = Admin Data v1.0; `AS` = Admin System v1.0; `EX` = Export Supplement v1.1; `Idea` = INNOSTAR document. Migration/backfill describes a future plan, not a migration executed here.

| Conflict | Source A | Source B | Canonical decision and reason | Affected screens/schema/API | Migration/backfill implication |
| --- | --- | --- | --- | --- | --- |
| `ACCEPTED`, `AUTO_CONFIRMED`, `Completed` | AD/AS section 1 revenue trigger; AS-03 job lifecycle | AD-03/09 completed display; Idea completion | One `COMPLETED_CONFIRMED` job state plus `completion_confirmation_method`; both methods recognize on confirmed completion, avoiding two terminal meanings. | AS-03/04, AD-03/09; jobs, confirmations, revenue events | Map old states to confirmed + method; do not infer method for ambiguous historical `Completed`; mark for review. |
| Funds mixed into payout status | AD-04 `LOCKED/RELEASE_ELIGIBLE/ON_HOLD/BATCH_PROPOSED` | AD/AS section 7.1 payout flow | Separate funds allocation, payable/batch and payout-request/attempt states; locking cash is not paying a worker. | AD-04, AS-10/11; funds/payables/batches/API filters | Split legacy status with event/ledger evidence; unresolved combinations become exceptions, not guessed payout success. |
| Proposal vs approval vs execution | AD-07 proposal queue | AS-09 approval, AS-10 execution | Three linked workflows; `APPROVED != SUCCEEDED`, enabling maker-checker and retries. | AD-07, AS-09/10; proposal/approval/execution APIs | Backfill approval actor/time and attempt references from audit/provider logs; flag absent evidence. |
| `recon.day.close` granted to maker | AD/AS section 3.1 Allow for Admin Data | AD/AS section 1 maker-only vs checker | Split `recon.day.prepare` (Data) from `period.close_day.execute` (System independent checker). Closing is a financial signoff, not a read-only recon action. | AD-08, AS finance/RBAC; period RPC | Revoke legacy close grant; map historical closers to audit and require role review. |
| Snapshot version grows per export | EX section 5.5 AC-EX1 | EX section 5.5 immutable close snapshot; AD-08 period close | Snapshot version increments only on a successful close/re-close after authorized reopen. Export references snapshot ID/version, so repeated downloads do not alter finance history. | AD-08, AD-18a; period_snapshots/export_jobs | Separate old export sequence from snapshot version; identify duplicate snapshots from same close run. |
| RUNNING export cancel | EX section 6 UI States says Cancel | EX section 6 Actions says QUEUED only | MVP permits cancel only in `QUEUED`; worker already running cannot be assumed cancelable. | AD-18a, AS exports; cancel endpoint | Existing RUNNING cancel requests require worker-state audit; disable action and return conflict. |
| PII export approval count | EX section 5.7 says different Admin System checker | EX section 5.7 AC-EX2 says 2 Admin System approve; section 3 says Allow + MFA | Canonical MVP: maker with `export.pii.include` + MFA/reason, plus **one distinct authorized Admin System checker** before generation. This is two people, not two additional approvals; approval grant alone never bypasses checker. | AS-07, AS exports; approval_records/export_jobs | Add approval linkage and independent actor check; older unapproved PII exports flagged for security review. |
| Escrow claim | Idea lines 229-232 | AD/AS section 1 terminology | Model `FUNDS_LOCKED`/ledger, display “Thanh toán được bảo vệ”; do not assert legal escrow or create an `escrow_account` solely from idea wording. | Payment copy, ledger/docs | Rename labels; retain historical ledger identity. Legal review only if product proposes escrow claim. |
| “Receive money immediately” | Idea lines 53-55 | AD/AS section 1 risk hold + controlled batch | Confirmation creates release eligibility subject to flagged hold; actual payout is a separately confirmed batch. This preserves product intent without promising instant settlement. | Worker/payable UX, AD-04, AS-10 | Separate historical confirmation and payout timestamps; don't backfill payout from completion. |
| AD-18 route and priority | AD section 4.1: `/admin-data/reports` P1 | EX sections 1, 6-7: exports P0, reports P1 | `/admin-data/exports` and `/admin-system/exports` are P0 AD-18a/AS-EX; `/admin-data/reports` and `/admin-system/reports` are P1 AD-18b. | Navigation/routes, export API | Migrate bookmarks/links; old AD-18 route remains reports, not export history. |
| Quick/Async format mismatch | EX section 2 broad format lists | EX section 5 per-report subsets | Report registry is authoritative for allowed formats, row/date constraints and PII policy; mode selects execution path only. | ExportTrigger, AD/AS export screens | Replace global mode-based format logic with registry entries. |
| Ratings source absent | Idea lines 98-99, 129-135 | AD-14 worker rating KPI; AD/AS minimum tables section 9.2 | Add protected reviews/ratings source or mark KPI unavailable until source is implemented; never fabricate it in analytics. | AD-14, AS-07; reviews read model | Historic ratings require verified source import; unknown remains null. |

## 6. Canonical entity catalog

Notation: `PK id` means UUID `id` unless a named natural composite key is explicitly shown; `FK` lists important references, not every column. `M` = mutable versioned lifecycle with archive/deactivate; `I` = insert-only after finalization, corrections by new linked row; `S` = immutable version/snapshot; `R` = restricted sensitive storage. Child records that are drafts can be edited until submission, then follow `I`. All rows use applicable global timestamps/provenance. This is a logical catalog for PostgreSQL/Supabase design, not a one-table-per-screen mandate.

### Identity, users, catalog

| Entity | Purpose; PK; important FK | Lifecycle |
| --- | --- | --- |
| `admin_accounts` | Admin status/scope/MFA identity; PK id; FK `user_id -> users`, role grants via join | M; no hard delete |
| `roles` | Named role and scope policy; PK id | M/versioned grants |
| `permissions` | Stable permission-key registry; PK id, unique key | M with controlled deprecation |
| `role_permissions` | Grants; PK (`role_id`,`permission_id`, scope/version), FK roles/permissions | M, audited changes |
| `users` / `profiles` | Stable person/account and profile attributes; PK `users.id`, `profiles.user_id`; FK profile -> user | M/R, privacy policy |
| `verification_requests` | Worker verification lifecycle; PK id; FK user | M until decision, retain history |
| `verification_documents` | Protected document metadata/storage pointer; PK id; FK request | R/I after submit |
| `verification_checks` | Individual checks and outcomes; PK id; FK request/document | I after result |
| `verification_decisions` | Approve/reject/resubmit with actor; PK id; FK request/admin | I |
| `service_versions` | Effective-dated service definition; PK id; stable `service_id` | S; no in-place historical edit |
| `pricing_rule_versions` | Effective-dated pricing rule; PK id; FK service_id/version where scoped | S; non-overlapping effective intervals per scope |
| `vouchers` | Stable campaign identity/status; PK id | M, archived not erased |
| `voucher_versions` | Effective terms/funding/limits; PK id; FK voucher | S; committed use references version |
| `reviews` / `ratings` | Two-sided post-job review and rating source; PK id (one logical review with rating value); FK job, author user, subject user | M only moderation state; submitted content versioned, R |

### Job and execution

| Entity | Purpose; PK; important FK | Lifecycle |
| --- | --- | --- |
| `jobs` | Stable job lifecycle, employer/service, schedule, version; PK id; FK employer user, stable service and committed version | M; no overwrite of confirmed history |
| `job_financials` | Committed terms snapshot: wage, fees, voucher allocation, employer total/currency; PK id; FK job, pricing/service/voucher versions | S at commit; correction by linked revision, not current-price recompute |
| `job_assignments` | Worker assignment attempts and outcome; PK id; FK job, worker user, matching attempt | I after assignment decision; one active assignment invariant |
| `matching_attempts` | Candidate/rank/reason/rule snapshot; PK id; FK job, candidate worker | I after decision |
| `worker_availability` | Declared/observed availability window; PK id; FK worker | M, time-bounded provenance |
| `worker_service_skills` | Eligibility by service; PK id; FK worker, stable service | M; effective dates |
| `job_checkins` | Arrival/GPS proof metadata; PK id; FK job, assignment | I/R after submit |
| `job_checkouts` | Departure proof metadata; PK id; FK job, assignment | I/R after submit |
| `job_checklist_items` | Required item and recorded result, tied to terms/checklist version; PK id; FK job, submission | M until submit, then I |
| `job_evidence` | Photo/file metadata, hash and protected pointer; PK id; FK job, submission/case | I/R after submit; replacement is new row |
| `job_completion_submissions` | Worker completion package and timestamp; PK id; FK job, assignment | I after submit |
| `job_completion_confirmations` | Method, actor, time and rule/evidence reference; PK id; FK job, submission | I; at most one effective confirmation per job |
| `job_risk_flags` | Scoped hold reason/rule and resolution; PK id; FK job, worker/case | M resolution, retain original flag |

### Payments, journal and controlled money flows

| Entity | Purpose; PK; important FK | Lifecycle |
| --- | --- | --- |
| `payment_orders` | Expected prepaid amount, PayOS order code and payment state; PK id; FK job/job_financials | M state, immutable provider facts |
| `provider_transactions` | Normalized provider event, external ref, amount, raw-payload restricted pointer/hash; PK id; FK payment order where matched | I/R, dedupe provider + external event ID |
| `ledger_accounts` | Chart of accounts per currency/owner; PK id | M controlled; no mutable balance source |
| `ledger_transactions` | Atomic posting group and business reference (required companion to entries); PK id; FK source job/order/execution as typed reference | I after posting |
| `ledger_entries` | Debit/credit postings; PK id; FK ledger transaction/account, optional reversal entry | I; no update/delete; balanced group |
| `worker_payables` | Worker obligation/release eligibility and amount; PK id; FK job, worker, funds allocation | M state; financial amount corrected via journal-linked adjustment |
| `payout_batches` | Controlled grouping and approval; PK id; FK maker/admin | M until submitted, then history retained |
| `payout_batch_items` | Membership and amount; PK id; FK batch, payable | I after submission; one payable in at most one active batch |
| `payout_requests` | Authorized payout instruction; PK id; FK batch/item, worker payable, approval | M state; no duplicate effective request |
| `payout_attempts` | Provider submission/result; PK id; FK payout request/execution attempt | I per attempt; UNKNOWN blocks unsafe retry |
| `refunds` | Refund obligation and provider outcome; PK id; FK payment order, job, optional dispute/proposal | M state, I provider facts |
| `finance_proposals` | Maker request for refund/adjustment/payout exception; PK id; FK case/dispute/job, maker | M until decision, then I |
| `approval_records` | Distinct checker decision/reason/MFA proof reference; PK id; FK proposal or protected export, checker | I; checker != maker |
| `execution_requests` | Authorized monetary command; PK id; FK proposal/approval, idempotency scope | I authorization; status M |
| `execution_attempts` | Provider/ledger execution attempt and outcome; PK id; FK execution request | I per attempt |

`funds allocation` is a logical sub-ledger obligation keyed to job/payment and amount. Physical schema may use a dedicated `job_fund_allocations` table or ledger-backed view plus state record; it must support partial release/refund and must not reuse payout status. `refunds` and adjustments never update a balance column directly.

### Dispute, reconciliation, period

| Entity | Purpose; PK; important FK | Lifecycle |
| --- | --- | --- |
| `disputes` | Case owner/status/parties/job; PK id; FK job, opener user | M status, preserve timeline |
| `dispute_evidence` | Protected submitted attachments; PK id; FK dispute/job_evidence | I/R |
| `dispute_events` | Timeline/communication/action; PK id; FK dispute, actor | I |
| `dispute_resolutions` | Decision, actor and linked proposal/refund; PK id; FK dispute | I; amendment as new resolution |
| `reconciliation_runs` | Provider/bank/internal cutoff and rule set; PK id; FK data source | I once finished |
| `reconciliation_items` | Normalized expected/actual input line; PK id; FK run, payment/provider/ledger reference | I; provenance retained |
| `reconciliation_matches` | Exact/approved match with rule version/object IDs; PK id; FK run, rule, items | I |
| `reconciliation_cases` | Variance exception owner/status; PK id; FK run, job/order | M; close audited |
| `reconciliation_case_links` | Many-to-many evidence/object links; PK id; FK case and referenced item/object | I after attachment |
| `reconciliation_rules` | Effective versioned matching/tolerance rules; PK id | S |
| `finance_periods` | Local period/cutoff/state and current snapshot pointer; PK id | M controlled state |
| `period_close_runs` | Attempt, actor, cutoff and source versions; PK id; FK period | I after outcome |
| `period_close_checks` | Named check/result/severity; PK id; FK close run | I |
| `period_snapshots` | Official financial values/version/hash; PK id; FK period, successful close run, predecessor snapshot | S; never regenerated by export |
| `period_exceptions` | Open/waived/blocked close exception; PK id; FK run/case | M resolution with audit |
| `period_signoffs` | Independent checker signoff; PK id; FK run/admin | I; actor separation |

### Export, audit, quality

| Entity | Purpose; PK; important FK | Lifecycle |
| --- | --- | --- |
| `export_jobs` | Registry type, filters/hash, actor, scope, snapshot ref, state/row count; PK id; FK admin, optional period snapshot/approval | M processing state; metadata retained after file expiry |
| `export_files` | Storage key/checksum/expiry; PK id; FK export job | I metadata, binary expires separately |
| `export_download_events` | Who downloaded, when, IP/session reference; PK id; FK export job/file/admin | I |
| `report_templates` | Allowed report definition/registry version; PK id | S/versioned; built-ins deactivate, not delete |
| `report_schedules` | Owner, frequency, filters, active flag; PK id; FK template/admin | M, soft deactivate |
| `report_schedule_runs` | Scheduled trigger/outcome; PK id; FK schedule/export job | I |
| `audit_logs` | Append-only admin/security/finance action trail; PK id; FK actor where present | I/R; never hard delete via UI |
| `event_log_index` | Searchable redacted event envelope/pointer; PK event_id; FK aggregate logically | I; not primary business state |
| `event_validation_results` | Schema/contract validation result; PK id; FK event ID/rule version | I |
| `data_sources` | Provider/internal source registry and freshness expectation; PK id | M/versioned |
| `data_quality_checks` | Versioned DQ rule/severity; PK id; FK source | S by version |
| `data_quality_check_runs` | Check execution/cutoff/counts; PK id; FK check/source | I |
| `data_quality_issues` | Failed observation, owner, status; PK id; FK run/source/object | M resolution, evidence retained |
| `data_quality_waivers` | Authorized waiver/reason/expiry; PK id; FK issue/checker | I; no silent suppression |

Additional implementation objects implied by source screens, not new business policy: versioned app settings (`AS-17`), account-to-role grants with scope (`AS-15/16`), protected case evidence (`AD-06`), and export report registry definitions. A schema designer may split them into tables after defining cardinality and RLS; they must not be hidden in untyped JSON if queried/authorized.

## 7. Key relationships

```text
User -> Profile / VerificationRequest -> VerificationDocument, Check, Decision
Stable Service -> ServiceVersion -> Job -> JobFinancial (pricing/voucher version snapshot)
Job -> PaymentOrder -> ProviderTransaction -> LedgerTransaction -> LedgerEntry
Job -> MatchingAttempt -> JobAssignment -> Worker
Job -> Checkin/Checkout/Checklist/Evidence -> CompletionSubmission -> Confirmation
Job -> FundAllocation -> WorkerPayable -> PayoutBatchItem -> PayoutRequest -> PayoutAttempt
Case/Dispute -> FinanceProposal -> ApprovalRecord -> ExecutionRequest -> ExecutionAttempt -> LedgerTransaction -> LedgerEntry
ReconciliationRun -> Item -> Match or Case -> CaseLink / Proposal
FinancePeriod -> CloseRun -> Checks/Signoffs -> PeriodSnapshot -> ExportJob -> ExportFile -> DownloadEvent
ReportSchedule -> ScheduleRun -> ExportJob
```

FKs must preserve history even when a user, service or schedule is archived. The ledger's source reference identifies a real posted execution/payment/refund, not merely an approved proposal. Uniqueness and cardinality must be explicit: one effective job confirmation, one active assignment, one active batch membership per payable, unique provider event per provider, unique idempotency scope/key, no overlapping effective pricing for the same scope, and independent checker actor.

## 8. Financial invariants

1. At committed job terms, `employer_total = worker_wage + platform_fee + priority_fee - eligible_voucher`, all in VND integer and with rounding policy fixed before commitment. `eligible_voucher` is the discount applicable to this job, not a campaign-wide balance.
2. `voucher_discount = jobfree_funded + employer_funded + provider_funded`; capture each contribution in the immutable job terms snapshot, referencing voucher version. Funding allocation is not the same as employer payment amount.
3. For every posted `ledger_transaction`, `SUM(debit) = SUM(credit)` in one currency and posting transaction. Entries are append-only; corrections create a compensating linked transaction. No direct balance update API or authoritative mutable balance column.
4. `PAID_CONFIRMED != RELEASED != PAID_OUT`. Payment confirms collection; fund release creates/removes liability according to controlled posting; payout confirms worker disbursement. `APPROVED != SUCCEEDED`; approval cannot be rendered as completed execution.
5. Recognize platform and priority revenue only when job reaches `COMPLETED_CONFIRMED`, with method, event ID and recognized-at time. PayOS receipt alone is not revenue. Refund/adjustment produces separately linked recognition reversal, not historical overwrite.
6. `worker_wage` is owed in full at successful payout under Admin baseline. `Unreconciled Amount = SUM(ABS(expected - actual))` for eligible unmatched/exception items at a stated cutoff; never net positive and negative variances into a misleading zero.
7. Every monetary command records maker, checker, permission decision, expected version, reason, correlation and idempotency key. Provider `UNKNOWN` remains unresolved until inquiry/reconciliation; never infer success or issue a fresh duplicate payout.

## 9. Snapshot and version rules

- Commit of job terms freezes service/pricing/voucher **version IDs** and all monetary components. Current pricing never recomputes historical job financials. A later approved correction references the prior revision and journals its delta.
- Effective-dated service/pricing/voucher versions have no overlap for the same applicability scope. A quote may be refreshed before commitment; after commitment it is a snapshot.
- A successful period close run creates one immutable period snapshot with source cutoff, check/signoff references, version and predecessor. Authorized reopen leaves prior versions intact; successful re-close creates the next version.
- Export/download references existing `period_snapshot_id` and `snapshot_version`; neither action creates a new snapshot version. File generation may have its own export/file revision or retry count, clearly separate from finance snapshot version.
- KPI/read-model refresh has its own `computed_at`, source watermark and rule version. It cannot change a closed snapshot silently.

## 10. Source of truth versus derived data

| Class | Examples | Rule |
| --- | --- | --- |
| SOURCE TABLE | jobs, committed job_financials, payment_orders, payables, users, config versions | Owns operational facts/status; write only via authorized domain command. |
| IMMUTABLE EVENT/JOURNAL | provider_transactions, ledger_entries, audit_logs, completion confirmations, execution attempts | Historical evidence; append/correct, never overwrite. |
| SNAPSHOT | job financial terms, matching rank at decision, period_snapshots | Captures exact rule/amount/version at a specific decision/cutoff. |
| DERIVED VIEW | cash collected, locked funds, worker payable summary, unreconciled amount, GMV, aging, fill rate, retention, payout success rate, rating average | Calculated from source/journal under named metric definition and cutoff; not independently mutable source columns. |
| MATERIALIZED AGGREGATE | AD-01/09-17 dashboards, AS-01/02 operational summaries | Cache of a derived view with rule version, refresh time and freshness; rebuildable. Closed official totals belong only in period snapshot. |

`worker_payables` is a source obligation, but the dashboard's total “worker payable” is derived. `cash_collected` and `GMV` are not synonyms for recognized revenue. A missing source, rating or late provider event yields null/stale state with provenance rather than zero.

## 11. PII and sensitive data matrix

Retention below is policy-based because the source PRDs do not specify lawful durations. Define schedules with Privacy/Legal before production; preserve legal holds, access logs and deletion evidence. `Restricted` means server-only, encrypted at rest, no public bucket; admin exposure through scoped/masked read models or time-limited signed access.

| Field | Classification | Storage | Admin visibility | Exportability / masking | Retention note |
| --- | --- | --- | --- | --- | --- |
| Phone | PII | Restricted user/profile | Scoped support/system; masked by default | AS-07 only after PII approval; `****1234` otherwise | Retain while account/business purpose; policy deletion/hold |
| Email | PII | Restricted identity/profile | Scoped; masked by default | Approved PII export only; `e***@***.com` otherwise | Account/contact policy |
| Full name | PII | Restricted profile | Scoped, masked or pseudonymized in analytics | Approved PII export only, never default bulk | Account/verification policy |
| ID document/number | Highly sensitive PII | Private verification storage and restricted metadata | Verification-authorized role via signed access, audit | Not in default export; no raw document export in MVP | Verification/legal policy, shortest lawful period |
| Bank account | Highly sensitive financial PII | Restricted payment vault/reference; last four separately | Last four only for ordinary admin | **Raw never exported even with `export.pii.include`**; `****5678` only | Payout/legal retention policy |
| GPS/location | Sensitive location PII | Restricted job evidence with precision minimized | Job/dispute-authorized scoped access | No raw tracks in default exports; aggregate/region only | Shortest operational/dispute period plus lawful hold |
| IP/session | Sensitive security data | Restricted audit/security store | Security Admin, reason/audit | Audit export only under `export.audit.create`; IP masked/hashed by default | Security incident/legal policy |
| Provider raw payload | Secret/financial sensitive | Restricted raw pointer + hash; normalized redacted transaction separately | No ordinary admin raw view | Never raw export; normalized safe fields only | Provider/finance policy |
| Evidence photo | Sensitive PII | Private object storage, hash and metadata | Case/job/verification scoped signed access | No bulk raw photo export in MVP | Dispute/verification policy, lawful hold |

Masking is applied by server read model and export generator, not only UI rendering. Approval cannot override the “never export” cells. Audit stores redacted before/after; encryption keys and provider secrets are outside business tables.

## 12. Canonical export contract

- `report_templates`/report registry defines report type, source query/read model, allowed CSV/XLSX/JSON subset, columns/classification, actor scope, maximum range/rows, filter rules and metadata. Quick vs Async selects execution path, not format eligibility. Cross-domain, sensitive or >5,000 estimated rows is Async; report-specific forced Async (AD-04, AD-08, AS-07/18) wins. A wrong estimate must not leak or bypass limits: server rechecks before file release.
- A date range is required except registered period-snapshot reports, which require a closed `period_id`/`snapshot_id`. AD-02 Quick maximum 90 days; AS-18 audit maximum 30 days; AS-07 maximum 10,000 users. No unfiltered “export all.” Active filter is canonicalized/hashed and applied by the server.
- Every export, including Quick, has `export_jobs` metadata/audit. Queue states: `QUEUED -> RUNNING -> COMPLETED | FAILED`; `QUEUED -> CANCELLED`; completed file later `EXPIRED`. MVP cancel only `QUEUED`; FAILED retry at most three times per EX section 6, retaining attempts/history. `RUNNING` is not cancelable.
- Completed file binary expires/deletes after **7 days**; `export_jobs`, file metadata, download history and audit survive per retention policy. Download requires creator or `export.download.other`, fresh authorization and a **15-minute signed URL**; do not cache expired URL. Each download is audited. Raw bank account never exported.
- PII fields excluded by default. AS-07 inclusion requires scoped permission, MFA, reason and one **different authorized Admin System checker** before generation. Audit export requires Security Admin `export.audit.create`, reason and its own audit event; EX AS-18 restriction on own recent logs remains in force. IP/session details use restricted access.
- CSV UTF-8 BOM, integer VND and ISO UTC plus optional presentation `_ict`; XLSX Data + mandatory Metadata sheet. Metadata includes export ID, report type, generated time/actor (masked), filter/hash, row count, PII scope, expiry and correlation ID. Exporting a period snapshot reports existing snapshot version, not a new finance version.
- P0 routes: `/admin-data/exports`, `/admin-system/exports`. P1 reports/scheduling routes: `/admin-data/reports`, `/admin-system/reports`. Report schedules deactivate without erasing run history.

## 13. Missing data model coverage by Admin screen

`COVERED` means the catalog gives a clear source and read model; `PARTIAL` means the source is identified but a metric definition, supporting record or integration contract still needs design; `MISSING` means no source. This is design coverage, not a claim that tables or UI already exist. **No P0 screen is MISSING**; P0 PARTIAL items are schema/design gates in section 14.

| Screen / priority | Source entities and read model | Coverage / gap |
| --- | --- | --- |
| AD-01 P0 Finance Control Center | ledger, payment_orders, worker_payables, recon cases, period snapshots -> `admin_finance_control` | PARTIAL: metric registry/cutoff/freshness |
| AD-02 P0 Payment Transactions | payment_orders, provider_transactions, recon items -> `admin_payments` | COVERED |
| AD-03 P0 Financial Detail | job_financials, payment_orders, ledger, refunds, payouts -> `admin_financial_detail` | COVERED |
| AD-04 P0 Worker Payables & Payout Monitor | worker_payables, fund allocations, batches/requests/attempts -> `admin_payables` | PARTIAL: physical fund-allocation design |
| AD-05 P0 Reconciliation Workspace | runs, items, matches, cases, rules -> `admin_reconciliation` | COVERED |
| AD-06 P0 Reconciliation Case Detail | cases, links, evidence, proposals, audit -> `admin_recon_case_detail` | PARTIAL: case evidence storage/authorization |
| AD-07 P0 Refund & Adjustment Queue | finance_proposals, approvals, executions, refunds -> `admin_proposal_queue` | COVERED |
| AD-08 P0 Period Close & Finance Report | periods, close runs/checks/exceptions/signoffs/snapshots -> `admin_period_close` | PARTIAL: close checks/signoff policy |
| AD-09 P1 Revenue & GMV | job_financials, confirmations, ledger, refunds -> revenue aggregate | PARTIAL: metric definitions/restatement |
| AD-10 P1 Job Analytics | jobs, assignments, matching, confirmations -> job aggregate | COVERED |
| AD-11 P1 Cancellation & Dispute Analytics | jobs, disputes, events/resolutions -> cancellation aggregate | COVERED |
| AD-12 P1 Priority Package Analytics | job_financials, pricing/service versions -> priority aggregate | PARTIAL: package cohort definition |
| AD-13 P1 Employer Analytics | users, jobs, payments -> employer aggregate | PARTIAL: cohort/active definition |
| AD-14 P1 Worker Analytics | users, assignments, payables, reviews -> worker aggregate | PARTIAL: ratings source rollout |
| AD-15 P1 Retention | users, jobs, events -> cohort aggregate | PARTIAL: retention definition |
| AD-16 P1 Services Analytics | service versions, jobs, financials -> service aggregate | COVERED |
| AD-17 P1 Region & Supply-Demand | jobs, worker availability/skills, matching -> regional aggregate | PARTIAL: region granularity/availability rule |
| AD-18a P0 Export Infrastructure | export jobs/files/download events, approvals -> `admin_exports` | COVERED |
| AD-18b P1 Reports & Scheduling | templates, schedules/runs, export jobs -> `admin_reports` | COVERED |
| AD-19 P1 Data Quality | sources, checks/runs, issues/waivers -> `admin_data_quality` | COVERED |
| AD-20 P1 Event Explorer | event index/validation, audit -> `admin_events` | COVERED |
| AS-01 P0 System Dashboard | jobs, assignments, disputes, verification, payout/finance -> `admin_system_dashboard` | PARTIAL: operational KPI definitions |
| AS-02 P0 Live Monitor | jobs, matching, availability, assignment, risk -> `admin_live_operations` | PARTIAL: freshness/stream SLA |
| AS-03 P0 Job Management | jobs, financials, assignment, payment, dispute -> `admin_jobs` | COVERED |
| AS-04 P0 Job Detail | jobs, execution evidence, confirmations, payments, audit -> `admin_job_detail` | COVERED |
| AS-05 P0 Manual Assignment | jobs, matching attempts, availability/skills, assignments -> `admin_assignment_candidates` | PARTIAL: ranking/exclusion rule version |
| AS-06 P0 Dispute Operations | disputes, evidence/events/resolutions, proposals -> `admin_disputes` | COVERED |
| AS-07 P0 User Management | users/profiles, verification, reviews, jobs -> `admin_users_masked` | COVERED |
| AS-08 P0 Worker Verification | verification requests/documents/checks/decisions -> `admin_verification` | COVERED |
| AS-09 P0 Finance Approvals | proposals, approval records, period signoffs -> `admin_approvals` | COVERED |
| AS-10 P0 Payout & Refund Execution | execution requests/attempts, payout/refund attempts -> `admin_execution` | COVERED |
| AS-11 P0 Wallets & Transactions | ledger accounts/entries, provider transactions, funds -> `admin_wallet_transactions` | PARTIAL: account chart/fund allocation mapping |
| AS-12 P0 Service Categories | stable service identity, service_versions -> `admin_services` | PARTIAL: stable identity physical table |
| AS-13 P0 Pricing Rules | pricing_rule_versions, service_versions -> `admin_pricing` | COVERED |
| AS-14 P1 Voucher Management | vouchers/versions, committed job financials -> `admin_vouchers` | COVERED |
| AS-15 P0 Admin Accounts | admin_accounts, users, role grants, audit -> `admin_accounts_view` | PARTIAL: role-grant join/scope model |
| AS-16 P0 Roles & Permissions | roles, permissions, role_permissions, audit -> `admin_roles` | COVERED |
| AS-17 P0 App Settings | versioned settings, audit -> `admin_settings` | PARTIAL: typed settings registry/version table |
| AS-18 P0 Audit Logs | audit_logs, export events -> `admin_audit_redacted` | COVERED |
| AS-EX P0 Export Infrastructure | export jobs/files/download events, approvals -> `admin_exports` | COVERED |
| AS Reports P1 | templates, schedules/runs -> `admin_reports` | COVERED |

## 14. Migration and implementation priority

| Phase | Required output / acceptance gate |
| --- | --- |
| P0A Domain contract | Ratify this register, state transition guards, permission split, report registry and metric glossary; map old status/API fields to canonical names. No ambiguous historical value silently inferred. |
| P0B Core schema | Design keys/FKs/cardinality for jobs/terms, evidence, matching, verification, dispute, payment/journal, funds, payable/batch, reconciliation, period, export and audit. Define protected raw storage and typed settings/role grants. |
| P0C Constraints/RLS | Implement balanced posting boundary, unique active batch membership, no self-approval, idempotency, optimistic version, effective-date exclusion, immutable row protection, default-deny RLS and server-only monetary RPC/functions. Test partial refund/release and UNKNOWN provider outcome. |
| P0D Read models | Build masked admin views/RPC and P0 screen contracts with cutoff, source freshness, null/missing states. Close all P0 PARTIAL design gaps before live data integration. |
| P1 Analytics/DQ | Define metric registry, cohorts, rating source, data source registry, DQ checks/runs and rebuildable aggregates. |
| P1 Reports scheduling | Templates, schedules, run history and notifications after AD-18a/AS-EX are stable. |
| P2 Future | B2B postpaid/COD only through a separate approved contract; do not let it alter MVP prepaid invariants. |

Backfill plan before any cutover: inventory actual rows and status combinations; map deterministic historical states with source event/audit evidence; quarantine ambiguous completion, fund and payout records; reconcile provider/ledger totals; preserve old IDs and source payload hashes; verify counts, monetary tie-outs and RLS; dual-read compare before switching. This document does not execute backfill or SQL.

## 15. Open decisions requiring Product / Finance / Legal

1. **Finance/Legal:** Exact legal retention/deletion schedules and lawful-hold conditions for ID documents, GPS/photos, raw provider data, financial/audit records and export metadata. The matrix sets access, not retention duration.
2. **Finance/Product:** Detailed period-close check thresholds, required signoff roles and whether a waived critical exception can ever permit `DAILY_CLOSED`; no screen should decide this implicitly.
3. **Product/Finance:** Rounding and eligibility rule for vouchers/fee adjustments at quote commit, especially future split-funded voucher cases; the arithmetic invariant is fixed, but eligibility policy is not specified by sources.
4. **Product/Operations:** Formal worker matching/ranking/exclusion policy, live-monitor freshness SLA and regional supply definition; store the decision's rule version once approved.
5. **Product/Analytics:** Metric glossary for GMV, active users, cohorts/retention, fill rate, priority packages and ratings; until agreed, label these P1 aggregates provisional rather than publish conflicting totals.

Resolved decisions in section 5 (including PII maker-checker count, close permission, export cancellation and snapshot versioning) are **not** open again. A later change requires a numbered change request updating this contract and affected PRDs/APIs/tests together.
