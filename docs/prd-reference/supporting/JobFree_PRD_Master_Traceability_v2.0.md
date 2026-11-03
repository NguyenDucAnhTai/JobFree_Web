# JobFree PRD Master Traceability v2.0

Status: Release Candidate for cross-functional sign-off  
Scope: Canonical Data Model v1.1, Documentation Standard v1.0, Admin Data v2.0, Admin System v2.0, Export & Reports v2.0, System Design v1.0 and API Contract v2.0  
Iteration: 4 cross-document consistency and readiness checkpoint

## 1. Purpose

This document is the navigation and traceability index for the JobFree v2 PRD set. It does not redefine domain rules owned elsewhere. It identifies the owning authority, maps console responsibilities, normalizes shared IDs, traces implementation-significant P0 requirements and records whether the package is ready to enter logical schema and API-contract design.

## 2. Authority hierarchy

| Authority | Owns | Does not own |
| --- | --- | --- |
| `JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1.md` | Shared domain/data contract: entities, states, financial invariants, time, IDs, concurrency, idempotency, snapshots, PII boundaries and resolved conflicts | Console UX or route layout |
| `JobFree_PRD_Documentation_Standard_v1.0.md` | Writing/specification convention, note types, requirement language and screen template | Product policy |
| `../JobFree_PRD_Admin_Data_Source_of_Truth.md` | Data-console product behavior: observe, analyze, reconcile, prepare and propose | Approval/execution authority or shared export lifecycle |
| `../JobFree_PRD_Admin_System_Source_of_Truth.md` | System-console product behavior: operate, review, approve, execute, configure and secure | Shared export lifecycle or canonical invariant changes |
| `JobFree_PRD_Export_Reports_v2.0.md` | Shared Report Registry, export lifecycle, files, download, schedule, delivery and export PII policy | Source financial facts or finance snapshot creation |
| `../JobFree_Admin_UI_System_Design_shadcn.md` | Shared admin architecture, shadcn/ui design system, frontend boundaries, accessibility and testing strategy | Product policy, canonical states, permissions or finance rules |
| `JobFree_API_Contract_v2.0.md` | HTTP/DTO/error/command contract and endpoint traceability | New product rules or implementation-specific visual choices |
| v1 PRDs, Export Supplement v1.1, Idea document | Historical/source traceability after v2 sign-off | Runtime/product authority after v2 sign-off |

Conflict precedence is Canonical -> owning v2 subsystem/product PRD -> System Design/API Contract -> implementation. Screen application belongs to the owning PRD; System Design owns shared UI/architecture, while API Contract owns transport/DTO/command semantics. Actual stakeholder sign-off is still required; “Release Candidate” is not “Approved.”

## 3. Document map

| Document | Primary audience | Depends on | Implementation output enabled |
| --- | --- | --- | --- |
| Canonical v1.1 | Product, Backend, Data, Finance, Security | Source PRDs for trace only | Aggregate/entity model, state constraints, invariants |
| Documentation Standard v1.0 | All PRD authors/reviewers | Canonical hierarchy | Consistent requirements and acceptance criteria |
| Admin Data v2.0 | Data/Finance Ops, Analytics, Product | Canonical, Standard, Export v2 | Data-console read models and maker workflows |
| Admin System v2.0 | Operations, Finance Checker, Security, Product | Canonical, Standard, Export v2, shared metric IDs | System-console commands, approvals and configuration |
| Export & Reports v2.0 | Data Platform, Security, both consoles | Canonical, Standard, console scopes | Registry, export worker, file/download/schedule contracts |
| System Design v1.0 | Frontend, Backend, Architecture, QA | Canonical, active PRDs, API Contract | Shared shadcn admin UI, module boundaries and test architecture |
| API Contract v2.0 | Frontend, Backend, QA | Canonical, active PRDs, Master requirements | Typed request/response/error/command contracts |
| This Master | Architecture, Product, QA, delivery leads | All documents above | Traceability, readiness and sign-off checkpoint |

## 4. Domain ownership matrix

| Domain | Canonical owner / primary entities | Admin Data responsibility | Admin System responsibility | Export responsibility | Primary mutations / read models / permissions |
| --- | --- | --- | --- | --- | --- |
| Identity & Access | `admin_accounts`, roles, grants, sessions | Masked/scoped read only | Invite, suspend, revoke, grant and session control | Redacted audit-only extraction | Versioned account/grant commands; access read models; `admin.role.manage` and scoped access keys |
| Users & Verification | users/profiles, verification requests/documents/decisions, reviews | Aggregate analytics and case-scoped masked views | User status and verification decisions | Registered masked user reports; no raw ID document | Expected-version decisions; `user.*`, `verification.*`; audit/signed evidence access |
| Catalog & Pricing | services/vouchers plus effective-dated versions, pricing rules | Analyze committed versions | Create/activate/deactivate versions | Version identifiers in registered reports | Version activation; catalog/pricing read models; `pricing.rule.update` and catalog grants |
| Jobs & Matching | jobs, matching attempts, assignments | Job analytics and financial drill-through | Guarded job transitions and manual assignment | Registered job report | Expected-version commands; job/matching read models; scoped operations permissions |
| Job Execution & Evidence | check-in/out, checklist, evidence, completion confirmation | Case/evidence analysis | Evidence review and guarded resolution | Metadata/region only; no bulk raw evidence/GPS | Signed evidence access; completion method with `COMPLETED_CONFIRMED`; evidence permissions |
| Payments & Ledger | payment orders, provider transactions, ledger transactions/entries, fund allocations | Observe, reconcile, prepare/propose | Approve/execute controlled effects; no direct balance edit | Registered finance reports | Idempotent commands; finance read models; transaction/proposal/approval/execution permissions |
| Payout / Refund | payables, batches/items, requests, attempts, refunds | Prepare batches/proposals and monitor | Independent approval and execution | Payables/refund registered reports; raw bank never | Maker-checker RPC classes; payout/refund permissions; UNKNOWN reconciliation |
| Dispute / Reconciliation | disputes, recon runs/items/matches/cases/rules | Exact-rule matching, cases, evidence and preparation | Operational resolution and monetary handoff | Reconciliation report by cutoff/rule version | Case/match commands; recon read models; `recon.*` permissions |
| Finance Period Close | periods, close runs/checks/signoffs, immutable snapshots | `recon.day.prepare`, tie-out and package preparation | `period.close_day.execute`, lock/reopen | Existing snapshot reference only | Close/reopen guarded commands; period read model; snapshot never versioned by export |
| Export / Reporting | `report_templates`, export jobs/files/download events, schedules/runs | Own/scoped request and history UI | Scoped/all request, approval and audit UI | Owns registry, policy, lifecycle, worker, file and delivery | Create/cancel/retry/download/schedule commands; export permissions |
| Audit / Event / DQ | audit logs, event index, DQ checks/runs/issues/waivers | Explore, classify, assign and propose waiver | Security audit and checker action | Redacted registered audit export | Append-only events; DQ read models; no delete/replay/general raw payload |

## 5. Console responsibility matrix

| Capability | Admin Data | Admin System | Shared rule |
| --- | --- | --- | --- |
| Observe/analyze | Primary | Scoped operational views | Missing/stale is unknown, never zero |
| Reconcile/prepare | Primary maker | Review and exceptional operation | Rule/version/cutoff recorded |
| Propose | Primary; System may propose where allowed | May propose but cannot self-approve | Proposal is not approval or execution |
| Approve | Denied by default | Independent checker | `checker_id != maker_id`; immutable decision |
| Execute money | Denied | Scoped authorized executor | Approval, freshness, expected version, MFA/policy and idempotency required |
| Close/lock/reopen | Prepare only | Independent authority | Successful close creates snapshot; reopen preserves predecessor |
| Configure/RBAC | Denied | Scoped configuration/security roles | No generic admin bypass or wildcard god mode |
| Export/report | Own/scoped under registry | Own/scoped/all by permission | Export v2 is subsystem authority; server/RLS authoritative |

## 6. Canonical state index

| Aggregate | Canonical states / rule | Owning reference |
| --- | --- | --- |
| Job | `DRAFT -> PAYMENT_PENDING -> OPEN -> MATCHING -> ASSIGNED -> IN_PROGRESS -> COMPLETION_SUBMITTED -> COMPLETED_CONFIRMED`; eligible `CANCELLED`/`DISPUTED` paths | Canonical section 4 |
| Completion method | `EMPLOYER_ACCEPTED`, `AUTO_CONFIRMED`, `ADMIN_RESOLVED`; method only, never terminal Job state | Canonical section 4 |
| Payment order | `CREATED -> PENDING -> PAID_CONFIRMED | EXPIRED | FAILED` | Canonical section 4 |
| Job funds | `NOT_FUNDED -> FUNDS_LOCKED -> RELEASE_ELIGIBLE -> RELEASED`; hold/refund paths are separate | Canonical section 4 |
| Finance proposal | `DRAFT -> PROPOSED -> PENDING_REVIEW -> APPROVED | REJECTED | EXPIRED | CANCELLED`; evidence loop | Canonical section 4 |
| Execution attempt | `READY -> SUBMITTING -> PROCESSING -> SUCCEEDED | FAILED | UNKNOWN`; pre-submit cancel only | Canonical section 4 |
| Payout request | `DRAFT -> PROPOSED -> APPROVED -> SUBMITTED -> PAID_OUT | FAILED | UNKNOWN`; pre-submit cancel | Canonical section 4 |
| Reconciliation item/case | `UNMATCHED -> MATCHED` or `UNMATCHED -> EXCEPTION -> RESOLVED -> CLOSED` | Canonical section 4 |
| Finance period | `OPEN -> CHECKING -> READY_TO_CLOSE -> DAILY_CLOSED -> MONTH_LOCKED`; reopen creates lineage | Canonical section 4 |
| Export job/file | `QUEUED -> RUNNING -> COMPLETED | FAILED`; `QUEUED -> CANCELLED`; completed binary later `EXPIRED` | Export v2 section 7 |

`APPROVED != SUCCEEDED`; `UNKNOWN != FAILED`; `PAID_CONFIRMED != RELEASED != PAID_OUT`. Fund, payable, batch, payout request and payout attempt states MUST remain separate.

## 7. Permission index

| Permission / class | Data | System | Normalized meaning / precondition boundary |
| --- | --- | --- | --- |
| `recon.day.prepare` | Allow | Allow | Run checks/reconcile/prepare; never closes period |
| `period.close_day.execute` | Deny | Scoped allow | Independent close command after checks/signoff |
| `finance.adjustment.propose`, `refund.propose`, `payout.batch.propose` | Allow | Allow | Maker request only |
| `finance.adjustment.approve`, `refund.approve`, `payout.batch.approve` | Deny | Scoped allow | Checker decision; separation/evidence/freshness still required |
| `payout.batch.execute` and monetary execution class | Deny | Scoped allow | Approved request plus MFA, expected version and idempotency |
| `export.quick.create` | Allow | Allow | Registered non-sensitive Quick report only |
| `export.async.create` | Allow | Allow | Registered Async report under actor scope |
| `export.schedule.manage` | Own schedules | Own/scoped | Create/version/deactivate; keep history |
| `export.pii.include` | Deny by default | Privileged scoped allow | Still requires MFA, reason and one distinct authorized checker |
| `export.audit.create` | Deny | Security Admin | Redacted audit report only; self-auditing |
| `export.all.view`, `export.download.other` | Deny | Scoped allow | Cross-owner history/download with audit |
| RBAC/config/pricing permissions | Deny | Scoped by role | Permission does not satisfy domain preconditions |
| `ledger.balance.update`, `audit.log.delete` | Deny | Deny | Forbidden system-wide |

UI visibility is not authorization. Server functions/RPC and RLS are authoritative; no generic admin bypass exists.

## 8. Route inventory

### 8.1 Admin Data

| Screen | Route | Priority | Status |
| --- | --- | --- | --- |
| AD-01 | `/admin-data/control-center` | P0 | Canonical |
| AD-02 | `/admin-data/payments` | P0 | Canonical |
| AD-03 | `/admin-data/financial/:objectType/:id` | P0 | Canonical detail |
| AD-04 | `/admin-data/payables` | P0 | Canonical |
| AD-05 | `/admin-data/reconciliation` | P0 | Canonical |
| AD-06 | `/admin-data/reconciliation/cases/:caseId` | P0 | Canonical detail |
| AD-07 | `/admin-data/refunds-adjustments` | P0 | Canonical |
| AD-08 | `/admin-data/period-close` | P0 | Canonical |
| AD-09 | `/admin-data/analytics/revenue` | P1 | Canonical |
| AD-10 | `/admin-data/analytics/jobs` | P1 | Canonical |
| AD-11 | `/admin-data/analytics/cancellations-disputes` | P1 | Canonical |
| AD-12 | `/admin-data/analytics/priority-packages` | P1 | Canonical |
| AD-13 | `/admin-data/analytics/employers` | P1 | Canonical |
| AD-14 | `/admin-data/analytics/workers` | P1 | Canonical |
| AD-15 | `/admin-data/analytics/retention` | P1 | Canonical |
| AD-16 | `/admin-data/analytics/services` | P1 | Canonical |
| AD-17 | `/admin-data/analytics/regions` | P1 | Canonical |
| AD-18a | `/admin-data/exports` | P0 | Shared EX-01 integration |
| AD-18b | `/admin-data/reports` | P1 | Shared EX-02 integration |
| AD-19 | `/admin-data/data-quality` | P1 | Canonical |
| AD-20 | `/admin-data/events` | P1 | Canonical |

### 8.2 Admin System

| Screen | Route | Priority | Status |
| --- | --- | --- | --- |
| AS-01 | `/admin-system/dashboard` | P0 | Canonical |
| AS-02 | `/admin-system/operations/live` | P0 | Canonical |
| AS-03 | `/admin-system/operations/jobs` | P0 | Canonical |
| AS-04 | `/admin-system/operations/jobs/:jobId` | P0 | Canonical detail |
| AS-05 | `/admin-system/operations/manual-assignment` | P0 | Canonical |
| AS-06 | `/admin-system/operations/disputes` | P0 | Canonical |
| AS-07 | `/admin-system/users` | P0 | Canonical |
| AS-08 | `/admin-system/users/worker-verification` | P0 | Canonical |
| AS-09 | `/admin-system/finance/approvals` | P0 | Canonical |
| AS-10 | `/admin-system/finance/execution` | P0 | Canonical |
| AS-11 | `/admin-system/finance/transactions` | P0 | Canonical; title does not create wallet SoT |
| AS-12 | `/admin-system/catalog/services` | P0 | Canonical |
| AS-13 | `/admin-system/monetization/pricing` | P0 | Canonical |
| AS-14 | `/admin-system/monetization/vouchers` | P1 | Canonical |
| AS-15 | `/admin-system/access/admin-accounts` | P0 | Canonical |
| AS-16 | `/admin-system/access/roles` | P0 | Canonical |
| AS-17 | `/admin-system/settings` | P0 | Canonical |
| AS-18 | `/admin-system/audit` | P0 | Canonical |
| AS-EX / EX-01 | `/admin-system/exports` | P0 | Shared export authority |
| AS-EX / EX-02 | `/admin-system/reports` | P1 | Shared reports authority |

No duplicate, conflicting or obsolete v2 route remains. AD-18a/18b intentionally split historical AD-18 responsibilities without inventing unrelated screen IDs.

## 9. Metric index

| ID | Metric | Owning definition | Consumers / rule |
| --- | --- | --- | --- |
| `M-GMV` | GMV | Admin Data section 11 | AD-09, System dashboard, registered reports; eligibility remains `OD-METRIC` |
| `M-REVENUE` | Recognized Revenue | Admin Data section 11 | Recognized at `COMPLETED_CONFIRMED`; not cash/GMV |
| `M-CASH` | Cash Collected | Admin Data section 11 | Verified `PAID_CONFIRMED` provider facts |
| `M-LOCKED` | Locked Funds | Admin Data section 11 | Ledger-backed allocation; not legal escrow/available cash |
| `M-PAYABLE` | Worker Payable Total | Admin Data section 11 | Outstanding obligations; not wallet balance |
| `M-UNRECON` | Unreconciled Amount | Admin Data section 11 | `SUM(ABS(expected-actual))`; missing actual is partial |
| `M-FILL` | Fill Rate | Admin Data section 11 | Final denominator/exclusions use `OD-METRIC` |
| `M-RETENTION` | Retention | Admin Data section 11 | Cohort/window definition uses `OD-METRIC` |
| `M-PAYOUT-SUCCESS` | Payout Success Rate | Admin Data section 11 | UNKNOWN excluded until resolved |

System dashboards and Export `report_templates` MUST reference these IDs/metric versions and MUST NOT redefine formulas. Unresolved exclusions reference `OD-METRIC` instead of inventing a final formula.

## 10. Report/export index

Report Registry is a logical subsystem. Canonical `report_templates` is the single persisted, versioned report definition/template entity; built-in/user/scheduled distinctions use type, version, ownership and schedule relations. No `report_definitions` table is authorized.

| Report type | Primary screen | Source contract | Mode/security summary |
| --- | --- | --- | --- |
| `payment_transactions` | AD-02 | payment/recon read model | Quick <=5K or Async; date; Quick <=90 days |
| `worker_payables` | AD-04 | funds/payable/batch/payout read model | Always Async; raw bank/phone excluded |
| `reconciliation_workspace` | AD-05 | cutoff/rule recon view | Quick/Async; complete-source rules |
| `refund_adjustment_queue` | AD-07 | proposal/approval/execution view | Quick/Async; drafts excluded by default |
| `period_close_snapshot` | AD-08 | existing immutable snapshot | Always Async; no snapshot increment |
| `job_management` | AS-03 | canonical job read model | Quick/Async; masked contact PII |
| `user_management` | AS-07 | masked user/verification view | Always Async; <=10K; elevated PII path |
| `audit_logs` | AS-18 | redacted audit read model | Always Async; <=30 days; Security Admin |

Cancel is `QUEUED` only in MVP; `RUNNING` cannot cancel. Retry is distinct and applies only after `FAILED`, up to three attempts when registry/policy permits. Download references an export file; export/download never creates or versions a finance snapshot.

## 11. PII classification index

| Class | Default console/export rule | Elevated boundary |
| --- | --- | --- |
| Phone, email, full name | Masked or excluded; Data PII include deny by default | System requester permission + MFA + reason + one distinct checker |
| ID number/document | Metadata/masked fields only; raw document never exported in MVP | Case-scoped signed viewing for authorized verification role |
| Bank | Last four only when needed; raw bank never exported | No elevated export path |
| GPS/location/evidence | Region/metadata only; no bulk raw GPS/evidence export | Case-scoped signed access with audit |
| IP/session | Masked/hashed and restricted | Registered Security audit report with permission/reason |
| Provider raw payload | Normalized redacted fields only; no general raw export | Restricted pointer/hash outside general console/export |

Server projection/RLS and worker policy are authoritative; screen wording cannot weaken Export v2.

## 12. Financial invariant index

| Invariant | Authoritative rule / implementation consequence |
| --- | --- |
| Money type | Signed `bigint` integer VND with explicit currency; no float |
| Employer total | `worker_wage + platform_fee + priority_fee - eligible_voucher` |
| Voucher split | `voucher_discount = jobfree_funded + employer_funded + provider_funded` |
| Ledger | Per transaction `SUM(debit) = SUM(credit)`; posted entries append-only; corrections compensate |
| Balance | No direct balance update; wallet-like display is derived/read-model only |
| Historical Job | Uses committed financial/pricing/service/voucher versions; never recompute from current rules |
| Recognition | Revenue at `COMPLETED_CONFIRMED` under canonical rule; Cash Collected != Revenue; GMV != Revenue |
| Period snapshot | Created by successful close/re-close only; reopen preserves predecessor; export/download does not increment |
| Mutation controls | `expected_version`; monetary `idempotency_key`; cross-workflow `correlation_id` |
| Time | Persist UTC; present `Asia/Ho_Chi_Minh`; `occurred_at != received_at`; `_ict` is presentation only |

## 13. Open Decision registry

| ID | Question | Owner | Affected docs / screens or domains | Schema | MVP |
| --- | --- | --- | --- | --- | --- |
| `OD-RETENTION` | Retention/lawful hold for ID, evidence/GPS, provider raw and finance/audit/export metadata | Legal + Security + Finance | All PRDs; PII, evidence, audit, export | Non-blocking for logical schema; policy fields required | Blocking before production retention/deletion |
| `OD-CLOSE` | Close thresholds, signoff roles and critical-waiver policy | Finance + Product | Data AD-08; System period close | Non-blocking for entities; constraints configurable | Blocking for production close execution |
| `OD-VOUCHER` | Rounding and split-funded voucher eligibility | Finance + Product | Data AD-03/09/12; Catalog/Pricing | Blocking for final monetary checks | Blocking for affected calculation release |
| `OD-MATCH` | Ranking/exclusion, region granularity, freshness and available-supply rule | Product + Operations | AD-10/17; AS-02/05 | Non-blocking with rule version model | Blocking for final matching behavior/metrics |
| `OD-METRIC` | Final GMV/active/cohort/fill/priority/rating glossary | Product + Analytics + Finance | Analytics, dashboards, reports | Non-blocking for transactional schema; blocks final metric views | Blocking for KPI sign-off |
| `OD-FRESHNESS` | Threshold/SLA per source/read model | Data Platform + domain owners | All read models/screens | Non-blocking; store watermark/threshold version | Blocking for alert/action-blocking thresholds |
| `OD-PRICING-APPROVAL` | Whether pricing activation requires independent checker and thresholds | Product + Finance | System AS-13 | Non-blocking with generic approval linkage | Blocking for production activation policy |
| `OD-CONFIG-CLASS` | Authoritative setting risk classes and approval/MFA policy | Security + Platform + Product | System AS-17 | Non-blocking with typed/versioned config | Blocking for critical-setting production policy |
| `OD-EXPORT-DELIVERY` | Attachment versus authenticated-link allowlist | Security + Product | Export EX-02 | Non-blocking | Blocking for scheduled external delivery |
| `OD-EXPORT-CONSISTENCY` | Request-time snapshot versus watermark/eventual consistency for large non-period exports | Data Platform + Finance | Export worker/reports | Non-blocking if strategy field/version exists | Blocking for non-snapshot Async correctness SLA |
| `OD-EXPORT-QUOTA` | Per-role concurrency and row/byte quotas | Platform + Security + Product | Export worker/EX-01 | Non-blocking | Non-blocking for MVP if conservative operational limits are configured |

Resolved canonical conflicts are not Open Decisions.

## 14. P0 requirement traceability

| Master Req ID | Source PRD | Screen | Requirement | Business reason | Canonical domain | Source entity/read model | Permission | Mutation/RPC class | Audit/event | Acceptance criteria | Open decision dependency | Schema-ready? | API-ready? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MT-AD01 | Admin Data | AD-01 | Trusted finance-control KPIs with freshness | Prioritize real exceptions without false zero | Payments/Ledger/Recon | `admin_finance_control` | `finance.dashboard.view` | Read/drill/case create | screen/filter/case/export | AD01-AC1..3 | `OD-FRESHNESS`, `OD-METRIC` | READY WITH OD | READY WITH OD |
| MT-AD02 | Admin Data | AD-02 | Separate provider payment and reconciliation state | Prevent false equivalence and force-match | Payments + Recon | `admin_payments` | transaction view, exact match | Match/create case | `RECON_MATCHED`, export | AD02-AC1..3 | none | READY | READY |
| MT-AD03 | Admin Data | AD-03 | Immutable end-to-end financial journey | Explain amount/state without current-rule recompute | Jobs/Payments/Ledger/Payout | `admin_financial_detail` | transaction view | Case/proposal | evidence/case/proposal | AD03-AC1..3 | `OD-VOUCHER` | READY WITH OD | READY |
| MT-AD04 | Admin Data | AD-04 | Separate funds, payable, batch, request and attempt | Prevent duplicate or held payout | Funds/Payable/Payout | `admin_payables` | `payout.batch.propose` | Batch proposal | proposal/denied/export | AD04-AC1..4 | none | READY | READY |
| MT-AD05 | Admin Data | AD-05 | Three-way reconciliation by cutoff/rule | Surface real variance reproducibly | Reconciliation | recon cutoff/rule view | recon match/case | Exact match/case | match/case/run | AD05-AC1..3 | `OD-FRESHNESS` | READY WITH OD | READY WITH OD |
| MT-AD06 | Admin Data | AD-06 | Evidence and resolution lineage | Make investigation defensible | Recon Case/Evidence | case detail view | case/propose | Assign/evidence/proposal | case/evidence/proposal | AD06-AC1..3 | `OD-RETENTION` | READY WITH OD | READY |
| MT-AD07 | Admin Data | AD-07 | Maker prepares but cannot self-approve/execute | Enforce segregation of duties | Proposal/Approval/Execution | proposal queue view | propose; approve deny | Proposal submit | proposal/decision links | AD07-AC1..3 | none | READY | READY |
| MT-AD08 | Admin Data | AD-08 | Prepare close; System closes independently | Protect official finance snapshot | Finance Period Close | checks/signoffs/snapshot view | `recon.day.prepare`; execute deny | Prepare package | close preparation | AD08-AC1..4 | `OD-CLOSE` | READY WITH OD | READY WITH OD |
| MT-AD18A | Admin Data + Export | AD-18a / EX-01 | Governed export history and actions | Prevent leakage and history loss | Export/Reporting | `admin_exports` | scoped export keys | create/cancel/retry/download | all export events | AD18A-AC1..3; EX-01 AC | `OD-EXPORT-CONSISTENCY`, `OD-EXPORT-QUOTA` | READY WITH OD | READY WITH OD |
| MT-AS01 | Admin System | AS-01 | Reproducible operational/control dashboard | Focus authorized action on current risk | Cross-domain Operations | `admin_system_dashboard` | scoped dashboard view | Read/drill | screen/filter | AS-01 acceptance | `OD-FRESHNESS`, `OD-METRIC` | READY WITH OD | READY WITH OD |
| MT-AS02 | Admin System | AS-02 | Separate live Job/matching/assignment/fund states | Avoid magic status and stale action | Jobs/Matching/Assignment | live operations view | scoped operations | Incident/assignment handoff | operation audit | AS-02 acceptance | `OD-MATCH`, `OD-FRESHNESS` | READY WITH OD | READY WITH OD |
| MT-AS03 | Admin System | AS-03 | Canonical Job transitions only | Prevent competing terminal states | Jobs & Matching | `admin_jobs` | scoped job operate | Guarded transition | job transition/export | AS-03 acceptance | none | READY | READY |
| MT-AS04 | Admin System | AS-04 | Job/evidence/history detail uses committed facts | Preserve historical and evidence integrity | Job Execution/Evidence | job detail view | scoped detail/evidence | Resolution handoff | signed access/action | AS-04 acceptance | `OD-RETENTION` | READY WITH OD | READY |
| MT-AS05 | Admin System | AS-05 | Manual assignment retains eligibility/safety guards | Admin must not bypass operational safety | Matching/Assignment | candidate/rule snapshot | assignment permission | Expected-version assign | assignment decision | AS-05 acceptance | `OD-MATCH` | READY WITH OD | READY WITH OD |
| MT-AS06 | Admin System | AS-06 | Dispute resolution links financial workflow | Prevent direct ledger effect | Dispute/Recon/Proposal | dispute case view | dispute operate/propose | Resolve/create proposal | resolution/evidence | AS-06 acceptance | `OD-RETENTION` | READY WITH OD | READY |
| MT-AS07 | Admin System | AS-07 | Scoped user control and two-person PII export | Prevent identity/PII misuse | Users/Verification | masked user view | user status + PII path | Status/PII request | user/approval/export | AS-07 acceptance | `OD-RETENTION` | READY WITH OD | READY |
| MT-AS08 | Admin System | AS-08 | Immutable verification decision and signed evidence | Protect identity evidence | Verification | request/document/check view | verification decide | Expected-version decision | evidence access/decision | AS-08 acceptance | `OD-RETENTION` | READY WITH OD | READY |
| MT-AS09 | Admin System | AS-09 | Independent approval has no financial effect | Separate review from execution | Finance Proposal/Approval | approval queue | approve/reject | Decision RPC | immutable approval | AS-09 acceptance | none | READY | READY |
| MT-AS10 | Admin System | AS-10 | Idempotent payout/refund execution | Avoid duplicate or inferred success | Payout/Refund/Execution/Ledger | execution control view | execute | Execute/submit/reconcile | attempt/provider/ledger | AS-10 acceptance | none | READY | READY |
| MT-AS11 | Admin System | AS-11 | Ledger is source of truth; no mutable wallet balance | Preserve double-entry integrity | Payments/Ledger/Funds | transaction/ledger view | view/controlled correction | Compensating transaction | ledger/recon audit | AS-11 acceptance | none | READY | READY |
| MT-AS12 | Admin System | AS-12 | Stable service identity and effective versions | Preserve historical references | Catalog & Pricing | service/version view | catalog manage | Version activate/archive | version audit | AS-12 acceptance | none | READY | READY |
| MT-AS13 | Admin System | AS-13 | Effective pricing versions never rewrite history | Keep committed Job money stable | Catalog & Pricing | pricing version view | `pricing.rule.update` | Version activate/replace | pricing audit | AS-13 acceptance | `OD-PRICING-APPROVAL` | READY WITH OD | READY WITH OD |
| MT-AS15 | Admin System | AS-15 | Protected admin-account lifecycle | Retain actor/access history | Identity & Access | account/session view | account manage | Invite/suspend/revoke/session | access audit | AS-15 acceptance | none | READY | READY |
| MT-AS16 | Admin System | AS-16 | Server/RLS grants without wildcard bypass | Enforce least privilege | Identity & Access | role/grant/scope view | role manage | Grant/revoke | grant change audit | AS-16 acceptance | `OD-CONFIG-CLASS` | READY WITH OD | READY WITH OD |
| MT-AS17 | Admin System | AS-17 | Typed/versioned config; no browser secret | Make config safe and reversible | System Config | setting/version view | config manage | Version activate/rollback | config audit | AS-17 acceptance | `OD-CONFIG-CLASS` | READY WITH OD | READY WITH OD |
| MT-AS18 | Admin System | AS-18 | Append-only redacted audit with governed export | Preserve accountability without leaking payload | Audit/Event | audit read model | audit view/export | Read/export request | audit-of-audit/export | AS-18 acceptance | `OD-RETENTION` | READY WITH OD | READY |
| MT-ASEX | Admin System + Export | AS-EX / EX-01 | Shared export lifecycle and cross-owner control | Keep one subsystem contract | Export/Reporting | `admin_exports` | export/all/download keys | create/cancel/retry/download | all export events | EX-01 acceptance | `OD-EXPORT-CONSISTENCY`, `OD-EXPORT-QUOTA` | READY WITH OD | READY WITH OD |

Every P0 screen has at least one master row. P1 screens remain traceable through their owning PRD, route inventory, metric/OD/report indexes and future API trace expansion.

## 15. Cross-document dependency map

```text
Canonical v1.1 ─────┬─> Admin Data v2.0 ──┐
                    ├─> Admin System v2.0 ├─> Master Traceability v2.0
Standard v1.0 ──────┤                    │
                    └─> Export v2.0 ──────┘

Admin Data metric IDs ─> System dashboards + Export report_templates
System approvals/RBAC ─> Data maker workflows + PII export checks
Finance close snapshots ─> Export references only
Export lifecycle/security ─> Data/System export and reports routes
```

## 16. Schema-readiness checklist

| Area | Status | Evidence / exact remaining decision |
| --- | --- | --- |
| Entities identified | READY | Canonical entity catalog and domain ownership are sufficient for logical modeling |
| PK/FK semantics | READY | UUID/stable external-reference rules and principal links are stated |
| State machines | READY | Namespaced aggregate states normalized; no competing v2 state |
| Money types/invariants | READY WITH OD | Integer VND and ledger/formulas fixed; voucher rounding/eligibility is `OD-VOUCHER` |
| Time semantics | READY | UTC storage, ICT presentation and occurred/received distinction fixed |
| Immutability | READY | Ledger, audit, evidence and period snapshot boundaries fixed |
| Versioning/concurrency | READY | Effective versions plus `expected_version`; snapshot lineage fixed |
| Idempotency/tracing | READY | Monetary `idempotency_key` and `correlation_id` fixed |
| Maker-checker | READY WITH OD | Finance/PII fixed; pricing/config policy remains OD-scoped |
| PII/security | READY WITH OD | Classification/path fixed; retention duration is `OD-RETENTION` |
| Audit/events | READY | Append-only envelopes and minimum events defined |
| Snapshot/read-model boundary | READY | Close owns snapshot; export references; metrics expose freshness/version |
| Derived metrics | READY WITH OD | IDs/sources fixed; final denominators/exclusions are `OD-METRIC` |
| Retention | READY WITH OD | Lifecycle fields can be modeled; durations/lawful hold are `OD-RETENTION` |
| RLS boundary | READY | Server/RLS authoritative; scopes require detailed policy design next |
| Export lifecycle | READY WITH OD | Lifecycle/cancel/retry fixed; large-export consistency and quota remain OD |

Overall schema readiness: **READY WITH OD**. No missing decision blocks starting logical PostgreSQL/Supabase schema design; listed ODs must remain explicit parameters or unresolved constraints and cannot be silently finalized by engineering.

## 17. API-readiness checklist

| API class | Status | Evidence / remaining OD |
| --- | --- | --- |
| List/read and detail | READY WITH OD | Read models, filters, states and error behavior defined; freshness thresholds pending |
| Maker proposal | READY | Proposal/evidence/version rules and permissions fixed |
| Approval | READY WITH OD | Finance fixed; pricing/config approval policy pending |
| Execution | READY | Approval separation, idempotency, UNKNOWN and reconciliation fixed |
| Matching/assignment | READY WITH OD | Command guards fixed; ranking/exclusion policy pending `OD-MATCH` |
| Verification | READY | Decision/evidence/concurrency/audit fixed |
| Period close | READY WITH OD | Prepare/execute/reopen/snapshot boundary fixed; thresholds/waiver pending `OD-CLOSE` |
| Export | READY WITH OD | Registry/lifecycle/PII/file/download fixed; consistency/quota/delivery ODs remain |
| Config version | READY WITH OD | Typed/effective/versioned behavior fixed; risk-class policy pending |

Overall API readiness: **READY WITH OD**. Endpoint shapes are intentionally deferred to the next phase.

## 18. Sign-off checklist

- [ ] Product owners confirm P0 outcomes, route inventory and metric ownership.
- [ ] Finance confirms formulas, close authority, payout/refund layering and open finance ODs.
- [ ] Backend/Data confirms entity ownership, state constraints, read-model and export boundaries.
- [ ] Security/Legal confirms PII classification, maker-checker, retention and delivery ODs.
- [ ] QA confirms each P0 master row maps to executable acceptance tests.
- [ ] Admin Data owner confirms maker/read behavior and denied actions.
- [ ] Admin System owner confirms checker/executor/config/RBAC behavior.
- [ ] Export owner confirms registry naming, cancel/retry, file/download and schedule behavior.
- [ ] Canonical v1.1 and Documentation Standard v1.0 remain unchanged in Iteration 4.
- [ ] No source code, SQL or migration is changed by Iteration 4.

## 19. Iteration 4 Resolution Log

| ID | Documents changed | Old inconsistency | Final resolution | Authority | Implementation impact |
| --- | --- | --- | --- | --- | --- |
| I4-R01 | Data, System, Export | Status remained Draft and authority chain was inconsistent | All four v2 deliverables are Release Candidate; sign-off still pending | Standard + this Master | Prevents accidental “Approved” interpretation |
| I4-R02 | Data, System, Export | Export Supplement still appeared as active runtime/product authority | Export v2 is shared subsystem authority; Supplement is historical/source traceability only | Export v2 + Canonical | One export contract for both consoles |
| I4-R03 | Export, Data, System | Logical report definition risked becoming duplicate `report_definitions` table | Report Registry is logical; canonical `report_templates` is the persisted versioned entity | Canonical entity catalog | Avoids duplicate schema/source of truth |
| I4-R04 | Data, System, Master | Cancel and retry language could be conflated | Cancel is QUEUED-only; retry is FAILED-only, max three when policy permits | Export v2 lifecycle | Separate command guards and permissions |
| I4-R05 | System, Master | AS-11 product title could imply wallet balance source of truth | Wallet-like display is derived; ledger/fund records remain source of truth | Canonical Payments & Ledger | No mutable wallet balance table/command inferred |
| I4-R06 | All indexes in Master | Shared metrics and ODs were repeated without one registry | Data owns metric definitions; Master indexes consumers and one normalized OD set | Data v2 + Master | Stable IDs for schema/API/test traceability |
| I4-R07 | Master | Routes and P0 requirements lacked one cross-document inventory | Added complete route inventory and one row per P0 screen | Owning PRDs | Detects route/screen drift before API design |
| I4-R08 | Master | Period snapshot/export/download boundary was scattered | Close/re-close alone versions snapshot; export references snapshot; download references file | Canonical + Export v2 | Prevents finance history mutation by export |
| I4-R09 | Master | PII wording varied by screen | One classification index; raw bank/ID/provider payload and bulk GPS/evidence restrictions normalized | Canonical + Export v2 | Uniform server projection and worker tests |

Iteration 4 modifies no Canonical, Documentation Standard, v1/source, SQL or source-code file.
