# JobFree Product Requirements Document
# Admin System v2.0
## Operate, Approve, Configure & Secure

Status: Release Candidate for cross-functional sign-off  
Writing standard: `JobFree_PRD_Documentation_Standard_v1.0`  
Domain authority: `JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1`  
Cross-console terminology: `JobFree_PRD_Admin_Data_v2.0`

This document supersedes Admin System v1.0 for product requirements after sign-off. Authority order is Canonical v1.1 for shared domain/data contracts; Documentation Standard v1.0 for specification conventions; this PRD for System-console product behavior; Admin Data v2.0 for Data-console behavior and shared metric definitions; Export & Reports v2.0 for the shared export/reporting subsystem. All v1 documents, Export Supplement v1.1 and the Idea document are historical/source traceability only after v2 sign-off.

## 1. Product identity

Admin System is a controlled operations console. It enables authorized staff to **OPERATE, REVIEW, APPROVE, EXECUTE, CONFIGURE, SECURE**. It is not a database editor, SQL console, direct ledger editor, permission bypass, provider-secret viewer or generic god mode.

Every action MUST obey canonical state machines, maker-checker separation, `expected_version`, idempotency where monetary, append-only audit, server/RLS authorization, immutable ledger and financial invariants. System authority grants a specific command; it never grants authority to break an invariant.

> **SECURITY**  
> UI visibility is only user experience. Controlled server functions and RLS are authoritative. Frontend MUST NOT receive service-role credentials, provider secrets or unrestricted write access.

### 1.1 Personas and scope

| Persona | Primary responsibility | Boundary |
| --- | --- | --- |
| System Operator | Jobs, live operations, assignment, disputes, users, verification | Operates only permitted transitions; reason/audit required |
| Finance Checker | Review/approve/execute payout, refund, adjustment and period close | Checker differs from maker; MFA/idempotency for sensitive actions |
| Configuration Admin | Versioned service, pricing, voucher and settings changes | Effective date, impact preview and audit; no historical rewrite |
| Security Admin | Admin accounts, roles, sessions and audit access | Protected grants; cannot delete audit or bypass invariants |

Out of scope: ad-hoc analytics, raw SQL, direct balance/audit edits, browser secret management, CRM/support channels, COD and B2B postpaid MVP.

## 2. Admin Data vs Admin System responsibility boundary

| Capability | Primary console | Shared read does not imply |
| --- | --- | --- |
| Observe, Analyze | Admin Data | Source mutation |
| Reconcile, Prepare | Admin Data | Close/execute authority |
| Propose | Admin Data; System may propose where source allows | Self-approval |
| Review, Approve | Admin System | Provider submission or ledger effect |
| Execute | Admin System | Permission to bypass hold, stale data or duplicate guard |
| Configure | Admin System | Historical term rewrite |
| Secure/RBAC | Admin System Security role | Wildcard/god mode |

Maker creates a proposal or change request. An independent checker validates evidence, amount, state, permission and freshness. `checker_id MUST != maker_id`. Approval creates an immutable approval record; it MUST NOT create financial effect. Execution is a later controlled command.

## 3. Global domain semantics

| Concept | Meaning/source/lifecycle | System authority; do not confuse with |
| --- | --- | --- |
| Job | Work agreement in `jobs`; canonical lifecycle ending `COMPLETED_CONFIRMED`, `CANCELLED` or `DISPUTED` | Operate guarded transitions; not payment/payout |
| Matching | Candidate/rule snapshot in `matching_attempts` | Review/assign; not assignment itself |
| Assignment | Worker selected for Job in `job_assignments` | Manual command still checks eligibility; not matching score |
| Verification | Requests/documents/checks/decisions | Review protected evidence and decide; not profile editing |
| Dispute | Case, evidence, events and resolution | Resolve operational facts; financial effect goes through proposal/execution |
| Finance Proposal | Maker request with canonical proposal states | Review; not approval/execution |
| Approval | Immutable checker decision | Authorizes request; `APPROVED != SUCCEEDED` |
| Execution | Request and append-only attempts | Submit/reconcile; `UNKNOWN != FAILED` |
| Payment | Employer collection order/provider fact | View/reconcile; `PAID_CONFIRMED != PAID_OUT` |
| Funds | Ledger-backed Job allocation state | Hold/release through policy; not legal escrow or payout status |
| Worker Payable | Obligation to Worker | Batch eligible obligation; not wallet balance |
| Payout | Batch/request/provider attempts | Execute controlled disbursement; not Job completion |
| Refund | Return obligation/result | Execute approved request; not overwrite payment history |
| Ledger | Balanced append-only journal | Post through controlled execution; no direct balance mutation |
| Period Close | Checks/signoff/snapshot workflow | System independently closes/locks/reopens; export never versions snapshot |
| Service/Pricing/Voucher | Stable identity plus effective-dated versions | Activate versions; never recompute committed Job history |
| Admin Account/Role/Permission | Identity, grant and scoped command authority | Manage with separation; permission is not satisfied precondition |
| Audit | Append-only action evidence | Search/export under policy; not domain event or editable log |
| System Config | Typed, scoped, versioned operational configuration | Controlled activation; not secret storage |

## 4. Approval and execution model

```text
Case / Operational Trigger
  -> Finance Proposal
  -> Independent Review
  -> Approval Record
  -> Execution Request
  -> Execution Attempt
  -> Provider Result
  -> Ledger Effect
  -> Reconciliation
```

`PROPOSED != APPROVED != SUBMITTED != SUCCEEDED`. `UNKNOWN != FAILED`. Approval records are immutable; execution attempts append-only. `SUCCEEDED` requires appropriate provider and/or posting evidence. `UNKNOWN` blocks unsafe duplicate execution and MUST NOT be retried blindly with a new idempotency key. Corrections use linked reversal/compensating entries.

## 5. Shared screen contract

All screens follow Documentation Standard v1.0. Routes expose loading, empty, error, stale/partial, forbidden and not-found for detail. Filters persist in URL; list operations are server paginated. Each mutation includes permission, reason where material, confirmation, `expected_version`, correlation ID, audit and explicit failure behavior. Missing/stale is never zero. Read models expose `computed_at`, source watermark and rule version.

## 6. Screen specifications

### AS-01 — System Control Center

Route `/admin-system/dashboard`, P0. Answers: “What operational or control risk needs action now?” Users: System Operator, Finance Checker, Security Admin. Source `admin_system_dashboard` joins canonical operational read models, never mutable KPI columns. Shows operational health, finance exceptions, matching health, verification/dispute/payout/approval backlog and source freshness. Filters by time, region, service, severity and source. Actions deep-link to scoped queues; no direct monetary action. Audit screen/filter usage.

Acceptance: stale required source renders unknown/stale, not zero; critical/over-SLA sorts first; every KPI drill-down reproduces same filter/cutoff.

### AS-02 — Live Operations Monitor

Route `/admin-system/operations/live`, P0. Source: jobs, matching attempts, assignments, availability, risk flags, payment/funds read models. Displays separate Job state, matching state, active assignment, worker availability, risk and payment/fund state; no combined magic status. Realtime records show last event/watermark and become stale by approved SLA (`OD-FRESHNESS`). Actions open Job, initiate eligible manual assignment or incident; reason/audit required.

Acceptance: stale feed blocks risky action; payment confirmed never labels Job completed; out-of-order event uses occurred/received timestamps without silent state regression.

### AS-03 — Job Management

Route `/admin-system/operations/jobs`, P0. Canonical Job states only: `DRAFT, PAYMENT_PENDING, OPEN, MATCHING, ASSIGNED, IN_PROGRESS, COMPLETION_SUBMITTED, COMPLETED_CONFIRMED, CANCELLED, DISPUTED`. Filters/status/export use canonical mapping. `AUTO_CONFIRMED` is only a completion method. Source `admin_jobs` from jobs, financial snapshot, assignment, payment and dispute. Authorized operational transitions require current version/reason and audit.

Acceptance: legacy ACCEPTED/AUTO_CONFIRMED never appear as terminal Job states; stale expected version returns conflict; export applies active filters and masking.

### AS-04 — Job Detail

Route `/admin-system/operations/jobs/:jobId`, P0. Shows Job/employer/worker, matching and assignment history, check-in/out/checklist/evidence, completion submission/confirmation, payment, funds, dispute, committed financial links and audit. Status rails remain separate. Completion shows `COMPLETED_CONFIRMED` plus `completion_confirmation_method`. Evidence uses signed access and audit. Historical money references committed versions.

Acceptance: current pricing change does not change historical Job; protected evidence access is signed/audited; payment confirmation alone never shows Worker paid.

### AS-05 — Manual Assignment

Route `/admin-system/operations/manual-assignment`, P0. Source matching attempts, availability, skills, assignment history/exclusions and Job version. Candidate rows include score/reason/rule version, distance/region and eligibility. Manual Assign requires permission, reason, `expected_version`, current eligibility/no-overlap checks and audit. It does not bypass safety merely because actor is admin; no new force override is introduced.

Acceptance: ineligible/overlapping candidate is rejected server-side; successful assignment stores actor/reason/rule/version and notifies parties; concurrent assignment returns conflict.

### AS-06 — Dispute Operations

Route `/admin-system/operations/disputes`, P0. Source disputes, parties, evidence/events/resolutions and linked proposals. Filters by state/severity/owner/SLA/reason. Actions assign, request evidence and create operational resolution. Monetary resolution MUST create/reference finance proposal, approval and execution; it never edits ledger directly. Resolution history is append-only.

Acceptance: resolution without required evidence/reason fails; financial outcome has linked approval/execution; prior evidence/event cannot be deleted.

### AS-07 — User Management

Route `/admin-system/users`, P0. Separates identity/profile, verification, reviews, account status and PII. Default read model masks phone/email/name and excludes raw bank/ID. Account status commands require scope, reason, expected version and audit. PII export requires requester permission, MFA, reason and one distinct authorized System checker. Raw bank account never displays as ordinary field or export.

Acceptance: direct API bypass without scope is forbidden; default table/export contains no raw PII; approved PII export retains approval/audit but still excludes raw bank.

### AS-08 — Worker Verification

Route `/admin-system/users/worker-verification`, P0. Source verification requests/documents/checks/decisions. Raw documents remain private and are viewed via short-lived signed access with audit. Approve/reject/resubmit records actor, reason, time, check/evidence version and immutable decision. Decision uses expected version and cannot rewrite submitted document.

Acceptance: expired signed access is denied; decision without required checks/reason fails; concurrent decision conflicts and preserves first valid result.

### AS-09 — Finance Approvals

Route `/admin-system/finance/approvals`, P0. This screen separately displays proposal state, approval decision and execution readiness. Source proposals, cases/disputes, approval records and freshness checks. Checker validates expected version, evidence completeness, amount/currency, permission, source freshness, duplicates/conflicts and maker separation. Approve/reject/request evidence creates immutable approval record; it creates no ledger effect.

> **FINANCE RULE**  
> Having approve permission does not satisfy evidence, freshness or separation preconditions. The approved amount cannot be edited during approval; changed terms require a new/revised proposal and review.

Acceptance: maker cannot approve own proposal; stale/duplicate/evidence-incomplete proposal cannot approve; APPROVED row remains “not executed” until execution evidence exists.

### AS-10 — Payout & Refund Execution

Route `/admin-system/finance/execution`, P0. Separates worker payable, fund eligibility, batch, batch item, payout/refund request and each provider attempt. Flow: eligible payables -> proposed batch -> review -> approval -> execution request -> provider attempt -> `PAID_OUT/FAILED/UNKNOWN` -> ledger/reconciliation. `ON_HOLD`, batch membership, approval and payout outcome are distinct columns/states. Execution requires permission, MFA, approval, fresh expected version and idempotency key.

Acceptance: held payable cannot execute; payable cannot enter two active batches; provider timeout records UNKNOWN and blocks duplicate; successful provider result plus journal posting is required for PAID_OUT.

### AS-11 — Wallets & Transactions

Route `/admin-system/finance/transactions`, P0. The product title “Wallets & Transactions” is navigation language only. Canonical source of truth is normalized provider transactions, ledger accounts/transactions/entries, fund allocations, refunds/adjustments and reconciliation links; any wallet-like balance shown is a derived read model, never a mutable wallet domain or source balance. It is a read/controlled-execution surface, not balance editor. Correction starts an approved compensating transaction; no update/delete of posted entry. Tabs separate provider fact, ledger posting and reconciliation state.

Acceptance: unbalanced posting is rejected; direct balance or entry update is forbidden/audited; UNKNOWN provider result links to reconciliation and cannot be inferred successful.

### AS-12 — Service Categories

Route `/admin-system/catalog/services`, P0. Stable `service_id` owns identity; effective-dated `service_versions` own name/terms. Rename creates/activates a version and preserves identity/history. Actions preview impact, validate effective date and archive/deactivate without deleting referenced history.

Acceptance: rename preserves service ID; committed Job keeps original version; archive cannot orphan historical Jobs.

### AS-13 — Pricing Rules

Route `/admin-system/monetization/pricing`, P0. Pricing rules are immutable effective-dated versions with non-overlap per scope. Draft/change, preview, activate and replace/rollback-by-new-version are audited. No historical Job recomputation. Whether independent pricing approval is mandatory remains `OD-PRICING-APPROVAL`; until decided, activation follows existing permission plus impact confirmation, not invented maker-checker policy.

Acceptance: overlapping active interval is rejected; stale version conflicts; changing current rule leaves committed Job amounts unchanged.

### AS-14 — Voucher Management

Route `/admin-system/monetization/vouchers`, P1. Stable voucher plus versions define eligibility, amount/funding/effective period. `voucher_discount = jobfree_funded + employer_funded + provider_funded`. Historical Job references committed voucher version. Actions create version, preview and deactivate; never overwrite old terms.

### AS-15 — Admin Accounts

Route `/admin-system/access/admin-accounts`, P0. Source admin accounts, user identity, scoped role grants, MFA/session and audit. Lifecycle uses invited/active/suspended/locked/revoked from canonical/source. Invite, suspend/revoke and session termination require protected permission, reason, expected version and audit. No hard delete of history.

Acceptance: suspended/revoked account loses server access; unauthorized actor cannot view/change account; historical audit retains actor reference.

### AS-16 — Roles & Permissions

Route `/admin-system/access/roles`, P0. Defines Role, Permission, Grant and Scope. Server/RLS is authoritative; JWT/UI cache is not source of truth. Changes show impact preview, protected grants, actor separation where policy requires and immutable audit. No implicit wildcard role is introduced. Permission grant never bypasses domain preconditions.

Acceptance: hidden-button bypass returns forbidden; protected permission escalation is rejected; grant change takes effect at server and is audited with before/after redacted state.

### AS-17 — App Settings

Route `/admin-system/settings`, P0. Typed/versioned settings declare key, meaning, type, default/source, validation, scope, effective time, permission, audit and rollback/new-version behavior. UI labels SAFE/SENSITIVE/CRITICAL are design classification pending `OD-CONFIG-CLASS`; they do not invent approval policy. Provider secrets belong to restricted secret management and never generic settings/plaintext frontend.

Acceptance: invalid type/scope fails; stale version conflicts; secret value never returns to browser/log; activation is versioned and auditable.

### AS-18 — Audit Logs

Route `/admin-system/audit`, P0. Append-only audit is distinct from domain and security events. Search actor/action/object/correlation/time/result; before/after is redacted. No delete. Audit export requires Security permission/reason and runs via `/admin-system/exports`, not inside audit storage lifecycle. The own/scoped recent-log restriction is governed by Export & Reports v2.0 and the normalized permission index, not by the historical Supplement.

Acceptance: delete absent and direct delete forbidden/logged; raw sensitive payload stays redacted; audit export creates its own audit event.

### AS-EX — Export Infrastructure and Reports

P0 `/admin-system/exports`; P1 `/admin-system/reports`. Canonical definition: `JobFree_PRD_Export_Reports_v2.0` sections 3-14; this screen applies that shared subsystem contract. Export history is not AS-18. Quick/Async is execution strategy; logical Report Registry backed by canonical `report_templates` controls format. >5,000 rows, sensitive or cross-domain is Async. File expires after 7 days; metadata survives; signed URL lasts 15 minutes. Cancel applies only to `QUEUED` in MVP; `RUNNING` cannot cancel. Retry is separate and applies only after `FAILED`, up to three attempts when registry/policy permits. Raw bank never exports. Period export references an existing snapshot and export/download never increments its version.

## 7. Period-close authority

Admin Data has `recon.day.prepare`; Admin System has `period.close_day.execute`; month lock/reopen is System-only. Close/reopen requires independent actor, reason, expected version, completed checks/signoff and audit. Successful close creates immutable snapshot. Reopen preserves prior snapshot; re-close creates successor. This capability is presented from AS-09/control surfaces with dependency/deep-link to AD-08; no new screen ID is invented.

## 8. Security and PII model

Authentication uses invitation and approved session policy; high-risk action requires MFA marker. Authorization is server/RLS enforced. Sensitive mutation goes through controlled server/RPC/function; client cannot write immutable finance/audit tables. Evidence/document access is signed and audited.

| Data | Normal / privileged visibility | Export / protection |
| --- | --- | --- |
| Phone/email/full name | Masked; scoped privileged view | Excluded default; approved PII flow |
| ID document | Metadata only; verification role signed view | No raw document export MVP |
| Bank account | Last four only | Raw MUST NEVER export |
| GPS | Region/precision-minimized; case-scoped exact evidence | No raw track default export |
| IP/session | Security role, reason/audit | Audit export only, masked/hashed default |
| Provider payload | Normalized redacted fields; raw pointer server-only | Never raw export |
| Evidence | Scoped signed access | No bulk raw export MVP |

Retention references shared `OD-RETENTION`; UI masking is not a security boundary.

## 9. System business data dictionary

Shared timestamps, money, correlation/idempotency/version and finance IDs reference Admin Data v2.0 dictionary.

| Field | Meaning/source/type | Nullable/rule | Why / do not confuse with |
| --- | --- | --- | --- |
| `admin_account_id` | Admin identity; admin_accounts UUID | No | Actor/access; not user profile ID |
| `role_id` | Role identity UUID | No grant | Groups permissions; not permission itself |
| `permission_key` | Stable command/view key string | No; server checked | Authorization input; not satisfied precondition |
| `scope` | Region/domain/object boundary JSON/typed fields | Policy-dependent | Limits grant; not UI filter |
| `verification_request_id` | Verification workflow UUID | No for request | Groups evidence/checks |
| `verification_decision` | Immutable result enum + reason | Yes until decided | Outcome; not profile status |
| `matching_attempt_id` | Candidate/rule snapshot UUID | Yes before matching | Reproducibility; not assignment |
| `assignment_id` | Worker-Job selection UUID | Yes until assigned | Active relationship; not score |
| `dispute_id`, `resolution_id` | Case and immutable resolution IDs | Resolution nullable | Separate case from decision |
| `proposal_id`, `approval_id` | Maker request and checker record UUIDs | Approval nullable | Approval not proposal/result |
| `execution_request_id`, `execution_attempt_id` | Authorized command and attempt IDs | Nullable before execution | Retry/outcome separation |
| `payout_batch_id`, `payout_request_id`, `payout_attempt_id` | Group, instruction and provider attempt | Nullable by stage | Never one payout_status |
| `service_id`, `service_version_id` | Stable service and committed version | No when used | Rename vs historical terms |
| `pricing_rule_version_id` | Effective pricing version UUID | No for priced Job | Historical rule, not current rule |
| `voucher_id`, `voucher_version_id` | Stable voucher/version | Nullable when no voucher | Identity vs terms |
| `setting_key`, `setting_version` | Typed config identity/version | No | Config history; not secret value |
| `audit_event_id` | Append-only audit UUID | No | Evidence; not domain event ID |

## 10. High-risk action catalog

All actions require server permission, correlation ID, reason where listed, current version and audit. MFA and idempotency columns use Required, N/A or policy reference; N/A states why.

| Action | Permission / maker-checker / MFA | Mutation and safeguards | Ledger/audit/failure/reversal |
| --- | --- | --- | --- |
| Manual Assign Worker | operations assign; actor/operator; MFA N/A low monetary risk | Create assignment after eligibility/overlap/version checks | No ledger; audit; conflict on stale/ineligible; unassign via new command |
| Verification Approve/Reject | verification decide; reviewer distinct if policy; MFA for sensitive evidence access | Append decision with checks/reason | No ledger; audit; resubmission/new decision only |
| Resolve Dispute | dispute resolve; reviewer; MFA by risk | Append resolution; finance outcome creates proposal | No direct ledger; audit; amended resolution linked |
| Approve/Reject Finance Proposal | finance/refund/payout approve; checker != maker; MFA required | Immutable approval after evidence/amount/freshness/version | No ledger; audit; rejection/new proposal |
| Execute Payout Batch | payout execute; approved checker/executor policy; MFA required | Execution request/attempt, idempotency; block hold/duplicate/UNKNOWN | Balanced posting on confirmed result; audit; compensating/reconciliation |
| Execute Refund/Adjustment | refund/adjustment execute; approved; MFA required | Idempotent request/attempt | Balanced posting; audit; reversal via approved compensation |
| Close Day / Lock Month / Reopen | period execute; independent checker; MFA required | Checks/signoff/version; snapshot on close/re-close | No export-created version; audit; reopen preserves predecessor |
| Change Pricing/Voucher | configure permission; approval `OD-PRICING-APPROVAL`; MFA by risk | New effective version, impact/non-overlap checks | No historical ledger rewrite; audit; rollback by new version |
| Suspend Admin | account manage; security actor; MFA required | Versioned status/session revoke | No ledger; audit; restore command if policy allows |
| Change Role/Permission | role manage; protected-grant policy; MFA required | Grant/scope update with impact preview | No ledger; audit; inverse audited change |
| Change Critical Setting | config manage; policy `OD-CONFIG-CLASS`; MFA required | New typed version, validation/effective time | No direct ledger; audit; rollback by version |
| Create PII Export | export PII; requester + distinct checker; MFA/reason | Approval-linked Async export, filters/range | No ledger; full audit; file expiry; no raw bank |
| Create Audit Export | export audit; Security Admin; MFA/reason | Async redacted export | Self-auditing; no source mutation |

## 11. Authoritative permission matrix

| Capability | Example keys | System | Mandatory non-permission guards |
| --- | --- | --- | --- |
| View | dashboard/job/user/finance/audit view | Scoped allow | RLS scope, PII projection, freshness |
| Operate | assignment/dispute/verification decide | Role-specific allow | State, reason, version, eligibility |
| Propose | finance/refund/payout propose | Allow where role permits | Cannot self-approve later |
| Approve | adjustment/refund/payout approve | Finance Checker | checker != maker, evidence, version, freshness, MFA |
| Execute | payout/refund/period execute | Scoped high-risk allow | approval, hold/duplicate, idempotency, provider state |
| Configure | service/pricing/voucher/settings update | Configuration Admin | version/effective date/validation/impact |
| Security | admin/role/session/audit export | Security Admin | protected permission, MFA, scope, audit |
| Forbidden | ledger balance update, audit delete | Deny all | No override |

Canonical correction: `recon.day.close` is retired; `recon.day.prepare` belongs to Data/shared preparation and `period.close_day.execute` to independent System checker. Permission grant never bypasses action preconditions.

## 12. QA acceptance and traceability

P0 tests include all per-screen acceptance criteria plus: maker cannot approve self; APPROVED not executed; UNKNOWN no blind retry; duplicate payout and held payable blocked; stale version conflicts; historical pricing unchanged; service rename preserves ID; signed/audited document access; role enforced server-side; hidden-button bypass forbidden; period export no snapshot increment; RUNNING export not cancelable; raw bank never exports; audit cannot delete.

| Req ID | Reason / screen | Domain/source | Permission/event | Acceptance / original |
| --- | --- | --- | --- | --- |
| SYS-OPS-01 | Safe live operations AS-01..06 | Jobs/Matching/Dispute read models | scoped operations; action/denied audit | AS01..06 AC; AS v1 |
| SYS-USER-01 | Protected identity/verification AS-07/08 | Users/Verification | user/verify scoped; evidence/decision audit | AS07/08 AC; AS v1 + Canonical PII |
| SYS-FIN-01 | Independent approval AS-09 | Proposal/Approval | approve; proposal decided | AS09 AC; Canonical conflict register |
| SYS-FIN-02 | Safe execution AS-10/11 | Payout/Refund/Execution/Ledger | execute; attempt events | AS10/11 AC; AS v1 + Canonical |
| SYS-CFG-01 | Preserve version history AS-12..14/17 | Service/Pricing/Voucher/Config versions | configure; version activated | AS12..14/17 AC; AS v1 |
| SYS-SEC-01 | Least privilege AS-15/16/18 | Accounts/RBAC/Audit | security keys; permission/audit events | AS15/16/18 AC; AS v1 |
| SYS-EXP-01 | Govern exports AS-03/07/18/EX | Export registry/jobs/files | export scoped keys; export events | export AC; Export & Reports v2.0 + Canonical; historical Supplement trace |
| SYS-PER-01 | Independent close | Period runs/signoffs/snapshots | period execute; close audit | period AC; Canonical resolution |

Release requires all P0 success/empty/loading/error/stale/forbidden/conflict fixtures, permission/RLS tests, accessibility checks, financial/export UAT and Product/System/Finance/Security sign-off.

## 13. Open decisions

Shared IDs are referenced, not duplicated: `OD-RETENTION`, `OD-CLOSE`, `OD-VOUCHER`, `OD-MATCH`, `OD-METRIC`, `OD-FRESHNESS`.

| OD-ID | Question / impact | Owner |
| --- | --- | --- |
| OD-PRICING-APPROVAL | Is independent checker mandatory for pricing activation; which thresholds/scopes? Affects AS-13 action and grants. | Product + Finance |
| OD-CONFIG-CLASS | Authoritative SAFE/SENSITIVE/CRITICAL setting classification and approval/MFA policy? Affects AS-17. | Security + Platform + Product |

Resolved canonical conflicts MUST NOT reopen here.

## 14. Change control and sign-off

Changes to state, money, approval/execution, close, permission, PII or export semantics update Canonical first, then this PRD/API/schema/tests with migration/backfill impact. Required sign-off: Product Owner, Admin System Owner, Operations, Finance, Backend/Data, QA, Security/Legal.
