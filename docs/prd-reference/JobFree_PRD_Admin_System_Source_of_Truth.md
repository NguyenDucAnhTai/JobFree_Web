# JobFree PRD Source of Truth: Admin System v2.0
## Operate, Approve, Configure & Secure

Status: SOURCE OF TRUTH - release candidate for cross-functional sign-off  
Product owner: Admin System Owner + Product Owner  
Documentation standard: `supporting/JobFree_PRD_Documentation_Standard_v1.0.md`  
Canonical contract: `supporting/JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1.md`  
Shared admin UI: `JobFree_Admin_UI_System_Design_shadcn.md`  
API contract: `supporting/JobFree_API_Contract_v2.0.md`  
Detailed export contract: `supporting/JobFree_PRD_Export_Reports_v2.0.md`  
Cross-console product reference: `JobFree_PRD_Admin_Data_Source_of_Truth.md`  
Supersedes: Admin System `UI_Ready_v1.0`, recoverable through Git history for traceability only.

## 1. Product identity and authority

Admin System is a controlled operations console. It enables authorized staff to **OPERATE, REVIEW, APPROVE, EXECUTE, CONFIGURE, SECURE**. It is not a database editor, SQL console, direct ledger editor, permission bypass, provider-secret viewer or generic god mode.

Every action MUST obey canonical state machines, maker-checker separation, `expected_version`, idempotency where monetary, append-only audit, server/RLS authorization, immutable ledger and financial invariants. System authority grants a specific command; it never grants authority to break an invariant.

> **SECURITY**  
> UI visibility is only user experience. Controlled server functions and RLS are authoritative. Frontend MUST NOT receive service-role credentials, provider secrets or unrestricted write access.

### 1.1 Scope and non-goals

In scope: live operations, guarded Job transitions, manual assignment, disputes, user/account status, verification, finance approval/execution, period-close authority, versioned catalog/pricing/voucher/configuration, RBAC/session control, audit and governed export/reporting.

Out of scope: ad-hoc analytics, raw SQL, direct balance/audit edits, browser secret management, CRM/support channels, COD and B2B postpaid MVP.

### 1.2 Personas

| Persona | Primary responsibility | Boundary |
| --- | --- | --- |
| System Operator | Jobs, live operations, assignment, disputes, users, verification | Operates only permitted transitions; reason/audit required |
| Finance Checker | Review/approve/execute payout, refund, adjustment and period close | Checker differs from maker; MFA/idempotency for sensitive actions |
| Configuration Admin | Versioned service, pricing, voucher and settings changes | Effective date, impact preview and audit; no historical rewrite |
| Security Admin | Admin accounts, roles, sessions and audit access | Protected grants; cannot delete audit or bypass invariants |

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

`JobFree_Admin_UI_System_Design_shadcn.md` is authoritative for the shadcn-based AdminShell, shared components, visual tokens, accessibility, frontend module boundaries, query/form/table patterns and landing-page isolation. This PRD is the complete Source of Truth for System-console product behavior and required outcomes.

All screens follow Documentation Standard v1.0. Routes expose loading, empty, error, stale/partial, forbidden and not-found for detail. Filters persist in URL; list operations are server paginated. Each mutation includes permission, reason where material, confirmation, `expected_version`, correlation ID, audit and explicit failure behavior. Missing/stale is never zero. Read models expose `computed_at`, source watermark and rule version. PRD MUST NOT copy or fork shadcn primitives; shared UI changes are made once in System Design and the component layer.

## 6. Screen specifications

### AS-01 — System Control Center

| Item | Specification |
| --- | --- |
| Purpose / Business question | “Rủi ro vận hành hoặc kiểm soát nào cần hành động ngay?” |
| Users / Route / Priority | System Operator, Finance Checker, Security Admin; `/admin-system/dashboard`; P0 |
| Permission / Source | Scoped dashboard view; `admin_system_dashboard` từ canonical operational read models, không dùng mutable KPI columns |
| KPI / Filters / View | Operational health, finance exceptions, matching health, verification/dispute/payout/approval backlog và source freshness; time, region, service, severity, source |
| Actions / Audit | Deep-link tới scoped queue; không direct monetary action; audit screen/filter usage |
| States / Edge | Default/loading/empty/error/stale/partial/forbidden; critical và over-SLA đứng trước; missing/stale không thành 0 |
| Export / Dependency | Export chỉ qua registry; phụ thuộc metric/freshness definitions và các queue owner |

Acceptance criteria:

- AS01-AC1 Given required source stale, when mở dashboard, then metric phụ thuộc source đó hiển thị stale/unknown thay vì 0 và risky drill/action bị block khi policy yêu cầu.
- AS01-AC2 Given critical/over-SLA và warning items, then critical/over-SLA đứng trước với source/cutoff rõ ràng.
- AS01-AC3 Given user drill-down một KPI, then queue đích tái tạo cùng filter, cutoff và metric version.

### AS-02 — Live Operations Monitor

| Item | Specification |
| --- | --- |
| Purpose / Business question | Theo dõi Job đang chạy và xác định ngoại lệ nào cần can thiệp an toàn ngay lúc này |
| Users / Route / Priority | System Operator; `/admin-system/operations/live`; P0 |
| Permission / Source | Scoped operations view; jobs, matching attempts, assignments, availability, risk flags và payment/funds read models |
| View / Filters | Job state, matching state, active assignment, worker availability, risk và payment/fund state là các cột/rail riêng; time, region, service, severity, freshness |
| Actions / Audit | Open Job, initiate eligible manual assignment hoặc incident; reason và audit bắt buộc |
| States / Edge | Last event/watermark; stale theo `OD-FRESHNESS`; out-of-order event giữ occurred/received timestamps, không silent regression |
| Export / Dependency | Registry-only nếu được phép; phụ thuộc AS-03/04/05 và freshness policy |

Acceptance criteria:

- AS02-AC1 Given feed stale, when operator chọn risky action, then action bị block và yêu cầu refresh.
- AS02-AC2 Given payment=`PAID_CONFIRMED`, then UI không gắn Job completed hoặc Worker paid nếu các domain state tương ứng chưa đạt.
- AS02-AC3 Given out-of-order event, then timeline giữ cả occurred/received time và không silently regress canonical state.

### AS-03 — Job Management

| Item | Specification |
| --- | --- |
| Purpose / Business question | Tìm, kiểm tra và vận hành Job bằng canonical transition mà không trộn payment/payout state |
| Users / Route / Priority | System Operator; `/admin-system/operations/jobs`; P0 |
| Permission / Source | Scoped job view/operate; `admin_jobs` từ jobs, committed financial snapshot, assignment, payment và dispute |
| View / Filters | Canonical Job state, service, region, time, risk, assignment và dispute; completion method hiển thị riêng |
| Actions / Audit | Guarded operational transition với reason, current `expected_version`, correlation ID và audit |
| States / Edge | Chỉ canonical Job states; `AUTO_CONFIRMED` là method, không terminal state; conflict giữ context và cho reload/compare |
| Export / Dependency | Registered Job export dùng active filters và masking; phụ thuộc AS-04 và Export v2 |

Acceptance criteria:

- AS03-AC1 Legacy `ACCEPTED`/`AUTO_CONFIRMED` không xuất hiện như terminal Job state.
- AS03-AC2 Given stale expected version, when transition, then server trả conflict và không thay Job.
- AS03-AC3 Given active filters, when export, then dataset/filter hash khớp màn hình và masking policy được giữ.

### AS-04 — Job Detail

| Item | Specification |
| --- | --- |
| Purpose / Business question | Cung cấp hồ sơ Job đầy đủ để giải thích lifecycle, evidence và liên kết tài chính |
| Users / Route / Priority | System Operator và reviewer được cấp quyền; `/admin-system/operations/jobs/:jobId`; P0 |
| Permission / Source | Scoped detail/evidence view; Job, parties, matching/assignment, execution evidence, completion, payment/funds, dispute, committed financial links và audit |
| View | Overview, timeline, evidence, finance rails và audit; canonical domain rails tách biệt |
| Actions / Audit | Open signed evidence, deep-link resolution/finance flow; evidence access và action được audit |
| States / Edge | Loading/not-found/forbidden/stale/partial; completion hiển thị `COMPLETED_CONFIRMED` + method; historical money dùng committed versions |
| Export / Dependency | Registered masked detail export only; phụ thuộc signed-access policy và `OD-RETENTION` |

Acceptance criteria:

- AS04-AC1 Current pricing change không làm thay đổi historical Job financial display.
- AS04-AC2 Protected evidence chỉ mở qua signed access còn hạn và mọi access được audit.
- AS04-AC3 Payment confirmation đơn lẻ không làm UI hiển thị Worker paid.

### AS-05 — Manual Assignment

| Item | Specification |
| --- | --- |
| Purpose / Business question | Chọn Worker phù hợp khi cần can thiệp mà không bỏ qua eligibility/safety rules |
| Users / Route / Priority | System Operator; `/admin-system/operations/manual-assignment`; P0 |
| Permission / Source | Assignment permission; matching attempts, availability, skills, history/exclusions và Job version |
| View / Filters | Candidate score/reason/rule version, distance/region, eligibility và conflict indicators |
| Actions / Audit | Manual Assign với reason, `expected_version`, eligibility/no-overlap recheck và audit; không có force override mới |
| States / Edge | Empty candidate, stale rule/feed, conflict và forbidden được tách rõ |
| Export / Dependency | Không export sensitive candidate set mặc định; phụ thuộc matching policy `OD-MATCH` |

Acceptance criteria:

- AS05-AC1 Ineligible hoặc overlapping candidate bị server reject dù UI action bị bypass.
- AS05-AC2 Successful assignment lưu actor, reason, rule/version và notification outcome.
- AS05-AC3 Concurrent assignment trả conflict và không tạo hai active assignments.

### AS-06 — Dispute Operations

| Item | Specification |
| --- | --- |
| Purpose / Business question | Điều tra và giải quyết dispute có bằng chứng, owner và SLA rõ ràng |
| Users / Route / Priority | System Operator / dispute reviewer; `/admin-system/operations/disputes`; P0 |
| Permission / Source | Scoped dispute operate; disputes, parties, evidence/events, resolutions và linked proposals |
| View / Filters | State, severity, owner, SLA, reason, evidence completeness và linked finance flow |
| Actions / Audit | Assign, request evidence, operational resolution; financial outcome chỉ tạo/reference proposal -> approval -> execution |
| States / Edge | Resolution/evidence history append-only; no direct ledger edit; stale/conflict/forbidden explicit |
| Export / Dependency | Registered masked export; depends `OD-RETENTION` and finance workflow |

Acceptance criteria:

- AS06-AC1 Resolution thiếu evidence/reason bắt buộc bị reject và không tạo success audit.
- AS06-AC2 Financial outcome có linked proposal, approval và execution; resolution không direct ledger effect.
- AS06-AC3 Prior evidence/event không thể delete hoặc overwrite.

### AS-07 — User Management

| Item | Specification |
| --- | --- |
| Purpose / Business question | Quản lý account status và xác định identity/verification context với least privilege |
| Users / Route / Priority | Authorized System/Security roles; `/admin-system/users`; P0 |
| Permission / Source | Scoped user view/status; masked user read model, verification, reviews, status và audit |
| View / Filters | Identity/profile, verification, reviews và account status tách biệt; phone/email/name masked; raw bank/ID excluded |
| Actions / Audit | Status command với scope, reason, expected version và audit; PII export qua requester + MFA + reason + distinct checker |
| States / Edge | Forbidden lookup không leak record; privileged view timeout/revocation; no raw bank ordinary field |
| Export / Dependency | Default masked; governed PII export still excludes raw bank; Export v2 + `OD-RETENTION` |

Acceptance criteria:

- AS07-AC1 Direct API bypass without scope returns forbidden and không đổi account.
- AS07-AC2 Default table/export contains no raw PII or raw bank data.
- AS07-AC3 Approved PII export retains approval/audit linkage and still excludes raw bank.

### AS-08 — Worker Verification

| Item | Specification |
| --- | --- |
| Purpose / Business question | Review verification evidence và ghi immutable decision có thể kiểm toán |
| Users / Route / Priority | Verification reviewer; `/admin-system/users/worker-verification`; P0 |
| Permission / Source | Verification queue/detail/decision permissions; requests, documents, checks và decisions |
| View / Filters | Queue state, risk/check result, submitted time, reviewer; raw documents private qua signed access |
| Actions / Audit | Approve/reject/request resubmission với actor, reason, check/evidence version, expected version và audit |
| States / Edge | Signed access expiry, missing checks, conflict và immutable prior decision |
| Export / Dependency | No raw document export MVP; `OD-RETENTION` applies |

Acceptance criteria:

- AS08-AC1 Expired signed access bị deny và không trả raw document URL.
- AS08-AC2 Decision thiếu required checks/reason bị reject.
- AS08-AC3 Concurrent decision conflicts và preserves first valid immutable result.

### AS-09 — Finance Approvals

| Item | Specification |
| --- | --- |
| Purpose / Business question | Checker có đủ bằng chứng và điều kiện độc lập để approve/reject proposal hay chưa? |
| Users / Route / Priority | Finance Checker; `/admin-system/finance/approvals`; P0 |
| Permission / Source | Approval permissions; proposals, cases/disputes, approval records và freshness checks |
| View / Filters | Proposal state, immutable approval decision và execution readiness hiển thị riêng; type, amount, maker, risk, freshness, SLA |
| Actions / Audit | Approve, reject, request evidence; validates version, evidence, amount/currency, permission, freshness, duplicate/conflict và maker separation |
| States / Edge | Stale/incomplete/duplicate/self-approval blocked; approval creates no ledger/provider effect |
| Export / Dependency | Approval export registry-only, redacted; depends AD-07 and proposal API |

> **FINANCE RULE**  
> Having approve permission does not satisfy evidence, freshness or separation preconditions. The approved amount cannot be edited during approval; changed terms require a new/revised proposal and review.

Acceptance criteria:

- AS09-AC1 Maker cannot approve own proposal even when holding the permission.
- AS09-AC2 Stale, duplicate or evidence-incomplete proposal cannot approve and denial reason is audited.
- AS09-AC3 `APPROVED` remains not executed until a separate execution result exists.

### AS-10 — Payout & Refund Execution

| Item | Specification |
| --- | --- |
| Purpose / Business question | Thực thi payout/refund đã được duyệt mà không duplicate hoặc suy diễn provider result |
| Users / Route / Priority | Authorized Finance Executor; `/admin-system/finance/execution`; P0 |
| Permission / Source | Execute permission; payable, funds, batch/items, requests/attempts, approval, ledger và reconciliation |
| View / Filters | Fund eligibility, payable, batch membership, approval, request và every provider attempt là state riêng |
| Actions / Audit | Execute/submit/inquire với MFA, approval, fresh expected version, idempotency key và full audit |
| States / Edge | `ON_HOLD`, duplicate batch, `FAILED`, `UNKNOWN`, provider unavailable và ledger-posting outcome tách biệt |
| Export / Dependency | Governed execution history; raw bank/provider payload excluded |

Acceptance criteria:

- AS10-AC1 Held payable cannot execute and denial is audited.
- AS10-AC2 One payable cannot enter two active batches.
- AS10-AC3 Provider timeout records `UNKNOWN` and blocks blind duplicate submission.
- AS10-AC4 `PAID_OUT` requires confirmed provider result plus required balanced journal posting.

### AS-11 — Wallets & Transactions

| Item | Specification |
| --- | --- |
| Purpose / Business question | Giải thích provider fact, ledger effect, fund allocation và reconciliation mà không tạo mutable wallet source |
| Users / Route / Priority | Finance/System roles; `/admin-system/finance/transactions`; P0 |
| Permission / Source | Transaction/ledger view and controlled correction permission; normalized provider transactions, ledger, funds, refunds/adjustments, recon links |
| View / Filters | Provider Fact, Ledger Posting và Reconciliation tabs; any wallet-like balance is derived/read-only |
| Actions / Audit | Open linked records; start approved compensating transaction; no update/delete posted entry |
| States / Edge | Unbalanced, unmatched, provider `UNKNOWN`, partial/stale and forbidden explicit |
| Export / Dependency | Registered redacted finance reports only; no raw provider/bank payload |

Acceptance criteria:

- AS11-AC1 Unbalanced posting is rejected before commit.
- AS11-AC2 Direct balance or posted-entry update/delete is forbidden and attempted action is audited.
- AS11-AC3 Provider `UNKNOWN` links to reconciliation and is never inferred successful.

### AS-12 — Service Categories

| Item | Specification |
| --- | --- |
| Purpose / Business question | Quản lý service identity và effective versions mà không rewrite history |
| Users / Route / Priority | Configuration Admin; `/admin-system/catalog/services`; P0 |
| Permission / Source | Catalog manage; stable services + effective-dated versions + reference counts |
| View / Filters | Identity, active/upcoming/archived versions, effective dates, usage and impact preview |
| Actions / Audit | Create/activate/deactivate/archive version; validate date/reference; audit before/after metadata |
| States / Edge | Overlap, stale version, referenced history and future activation |
| Export / Dependency | Version registry export if registered; committed Jobs keep version reference |

Acceptance criteria:

- AS12-AC1 Rename creates/activates a version and preserves stable `service_id`.
- AS12-AC2 Committed Job keeps original `service_version_id` after current version changes.
- AS12-AC3 Archive/deactivate cannot orphan historical Job references.

### AS-13 — Pricing Rules

| Item | Specification |
| --- | --- |
| Purpose / Business question | Version và activate pricing safely while preserving committed Job money |
| Users / Route / Priority | Configuration Admin / Finance policy role; `/admin-system/monetization/pricing`; P0 |
| Permission / Source | `pricing.rule.update`; immutable effective-dated pricing versions and usage/impact read model |
| View / Filters | Scope, status, effective interval, formula components, impacted services/Jobs and version history |
| Actions / Audit | Draft/change, preview, activate, replace/rollback-by-new-version; impact confirmation; `OD-PRICING-APPROVAL` preserved |
| States / Edge | Interval overlap, stale version, pending effective date; no historical recompute |
| Export / Dependency | Registered version report; depends canonical money/version rules |

Acceptance criteria:

- AS13-AC1 Overlapping active interval for the same scope is rejected.
- AS13-AC2 Stale expected version returns conflict without activation.
- AS13-AC3 Changing current pricing leaves committed Job amounts unchanged.

### AS-14 — Voucher Management

| Item | Specification |
| --- | --- |
| Purpose / Business question | Quản lý voucher eligibility, funding và effective terms có version |
| Users / Route / Priority | Configuration Admin; `/admin-system/monetization/vouchers`; P1 |
| Permission / Source | Voucher/configuration permission; stable voucher, versions, funding split and usage read model |
| View / Actions | Search/filter versions; create, preview and deactivate version; never overwrite active/historical terms |
| States / Edge | Funding sum invariant, effective overlap, stale version and committed historical reference |
| Export / Dependency | Registered report only; depends `OD-VOUCHER` |

Acceptance criteria:

- AS14-AC1 Voucher discount equals the three funding components and invalid splits are rejected.
- AS14-AC2 Historical Job keeps committed voucher version after deactivation or replacement.

### AS-15 — Admin Accounts

| Item | Specification |
| --- | --- |
| Purpose / Business question | Quản lý lifecycle admin identity, grants và sessions mà vẫn giữ actor history |
| Users / Route / Priority | Security Admin; `/admin-system/access/admin-accounts`; P0 |
| Permission / Source | Protected account/session permissions; accounts, identity, scoped grants, MFA/session and audit |
| View / Filters | invited/active/suspended/locked/revoked, role/scope, MFA/session status, last activity |
| Actions / Audit | Invite, suspend/revoke, terminate session với reason, expected version, MFA/policy và audit; no hard delete |
| States / Edge | Self-impact/protected-account guard, conflict, forbidden and session revocation outcome |
| Export / Dependency | Redacted registered security report only |

Acceptance criteria:

- AS15-AC1 Suspended/revoked account loses server access and active sessions are handled per command result.
- AS15-AC2 Unauthorized actor cannot view or change protected account data.
- AS15-AC3 Historical audit retains actor reference after account revocation.

### AS-16 — Roles & Permissions

| Item | Specification |
| --- | --- |
| Purpose / Business question | Grant least-privilege role/scope without creating wildcard bypass |
| Users / Route / Priority | Security Admin; `/admin-system/access/roles`; P0 |
| Permission / Source | `admin.role.manage`; roles, permission catalog, grants, scopes and protected-grant policy |
| View / Filters | Role, permission, subject, scope, effective status and impact preview |
| Actions / Audit | Grant/revoke/update scope with protected-grant checks, expected version and immutable redacted audit |
| States / Edge | Server/RLS authoritative; stale UI/JWT cache not authority; protected escalation and self-lockout policy |
| Export / Dependency | Redacted access report only; depends `OD-CONFIG-CLASS` where applicable |

Acceptance criteria:

- AS16-AC1 Hidden-button/API bypass returns forbidden.
- AS16-AC2 Protected permission escalation is rejected when policy preconditions fail.
- AS16-AC3 Grant change takes effect at server and records redacted before/after audit.

### AS-17 — App Settings

| Item | Specification |
| --- | --- |
| Purpose / Business question | Quản lý typed/versioned operational settings với validation và rollback lineage |
| Users / Route / Priority | Configuration/Security Admin by scope; `/admin-system/settings`; P0 |
| Permission / Source | Config manage; setting definitions, versions, scopes, effective time and audit |
| View / Filters | Key, meaning, type, source/default, scope, effective status, validation and version history |
| Actions / Audit | Create/activate/rollback-by-new-version with impact preview, expected version and audit |
| States / Edge | SAFE/SENSITIVE/CRITICAL remains design classification under `OD-CONFIG-CLASS`; secret values never browser/plaintext |
| Export / Dependency | Metadata-only registered report if allowed; no secret export |

Acceptance criteria:

- AS17-AC1 Invalid type/scope fails with field errors and no activation.
- AS17-AC2 Stale expected version returns conflict.
- AS17-AC3 Secret value never returns to browser/log; activation is versioned and auditable.

### AS-18 — Audit Logs

| Item | Specification |
| --- | --- |
| Purpose / Business question | Tìm và chứng minh ai đã làm gì, trên đối tượng nào, với kết quả nào |
| Users / Route / Priority | Security/Audit role; `/admin-system/audit`; P0 |
| Permission / Source | Scoped audit view/export; append-only audit read model distinct from domain/security events |
| View / Filters | Actor, action, object, correlation, time, result; before/after redacted |
| Actions / Audit | View detail and request governed audit export; no delete/edit; audit access/export is self-audited |
| States / Edge | Restricted payload redaction, high-volume pagination, retention/lawful hold and forbidden |
| Export / Dependency | Runs through `/admin-system/exports`; Security permission + reason; Export v2 and `OD-RETENTION` |

Acceptance criteria:

- AS18-AC1 Delete/edit is absent and direct attempt is forbidden/logged.
- AS18-AC2 Raw sensitive payload stays redacted in list, detail and export.
- AS18-AC3 Audit export creates a separate audit event and governed export job.

### AS-EX — Export Infrastructure and Reports

| Item | Specification |
| --- | --- |
| Purpose / Business question | Request, monitor và download governed exports across authorized System scopes |
| Users / Route / Priority | Authorized System roles; `/admin-system/exports` P0; `/admin-system/reports` P1 |
| Permission / Source | Scoped/all export permissions; Report Registry, export jobs/files/download events and schedules |
| View / Filters | Report type, requester/scope, status, created/expiry time, file metadata and retry/cancel eligibility |
| Actions / Audit | Create, QUEUED-only cancel, FAILED-only retry up to three when allowed, authorize download, manage own/scoped schedules P1 |
| States / Edge | >5,000/sensitive/cross-domain Async; RUNNING no cancel; binary expires 7 days, metadata survives; signed URL 15 minutes |
| Export / Dependency | Authority is Export & Reports v2.0; raw bank never exported; period export references existing snapshot without increment |

Acceptance criteria:

- ASEX-AC1 Registry/range/policy chooses Quick or Async and forces Async for >5,000/sensitive/cross-domain cases.
- ASEX-AC2 Cancel is allowed only in `QUEUED`; retry only after `FAILED` and within policy limit.
- ASEX-AC3 Expired binary remains visible as metadata and download authorization never exposes a durable URL.
- ASEX-AC4 Period export/download does not create or increment a period snapshot version.

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

Document-specific changes update this file in place. Do not create a new `UI_Ready`, `final`, `copy` or parallel Admin System PRD. Framework, component and visual-system changes belong to System Design; shared domain changes belong to Canonical; export lifecycle changes belong to Export & Reports.
