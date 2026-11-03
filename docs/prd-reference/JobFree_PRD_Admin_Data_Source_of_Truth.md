# JobFree PRD Source of Truth: Admin Data v2.0
## Analyze, Reconcile & Data Operations

Status: SOURCE OF TRUTH - release candidate for cross-functional sign-off  
Product owner: Admin Data Owner + Product Owner  
Documentation standard: `supporting/JobFree_PRD_Documentation_Standard_v1.0.md`  
Canonical contract: `supporting/JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1.md`  
Shared admin UI: `JobFree_Admin_UI_System_Design_shadcn.md`  
API contract: `supporting/JobFree_API_Contract_v2.0.md`  
Detailed export contract: `supporting/JobFree_PRD_Export_Reports_v2.0.md`  
Supersedes: Admin Data `UI_Ready_v1.0`, recoverable through Git history for traceability only.

## 1. Product identity and authority

Admin Data không phải công cụ quản trị database tổng quát. Đây là workspace nghiệp vụ cho Finance/Data Operator, analyst, reconciliation operator và data-quality operator để **OBSERVE, ANALYZE, RECONCILE, PREPARE, PROPOSE**. Nó giúp phát hiện sai lệch, tạo hồ sơ/evidence và chuẩn bị quyết định có kiểm soát.

Admin Data mặc định MUST NOT tự **APPROVE**, **EXECUTE** monetary action nhạy cảm, thay RBAC, thay critical system config, hoặc month lock/reopen. Admin Data là maker: chuẩn bị proposal và bằng chứng. Admin System là checker/executor: một người có quyền độc lập kiểm tra, phê duyệt và thực thi. Checker MUST khác maker; UI Admin Data chỉ hiển thị kết quả read-only và deep-link tới workflow System.

Authority cho shared domain semantics, state, money, entity, snapshot, PII và conflict là Canonical Data Model v1.1. Authority cho shared export/reporting lifecycle, registry, security và delivery là Export & Reports v2.0. PRD này là product-behavior authority cho Data console; screen spec trả lời người dùng thấy/làm gì. API/schema/read model và code là lớp triển khai phía dưới.

> **WHY**  
> Tách maker-checker làm giảm self-approval, thao tác tiền ngoài ý muốn và khó truy vết; đồng thời cho phép Data Operator xử lý nhanh phần điều tra mà không cấp generic write access.

### 1.1 Scope và non-goals

In scope: finance control, payment review, job financial detail, payables, reconciliation, proposal preparation, period-close preparation, analytics, export/reporting, data quality và event exploration. Out of scope: raw SQL editor, direct balance update, provider secret/config, RBAC management, approval/execution trong Data console, generic data correction, COD và B2B postpaid MVP.

### 1.2 Personas

| Persona | Cần làm | MUST NOT |
| --- | --- | --- |
| Finance/Data Operator | Theo dõi dòng tiền, đối soát, tạo case/evidence/proposal, chuẩn bị close/batch | Approve/execute tiền, tự close ngày, sửa ledger/balance |
| Data Analyst | Phân tích revenue, jobs, users, retention, service/region, freshness | Xem raw PII/secret, sửa source record |
| Reconciliation Operator | Ghép exact match theo rule, điều tra exception, quản lý SLA | Force-match sai rule, ghi đè provider fact |
| Data-quality Operator | Theo dõi checks/issues/waivers và event validation | Sửa source im lặng, xóa event/audit |
| Finance Lead (view/maker) | Review package và submit proposal/close preparation | Self-approve nếu là maker |

## 2. Global domain explanation

| Concept | Là gì / tại sao | Source of truth và lifecycle | Không được hiểu thành |
| --- | --- | --- | --- |
| Job | Cam kết công việc giữa Employer và Worker; là trục liên kết vận hành/tài chính. | `jobs`; state canonical từ `DRAFT` đến `COMPLETED_CONFIRMED`, `CANCELLED` hoặc `DISPUTED`. | Payment, completion method hoặc payout. |
| Payment | Lệnh thu tiền Employer và kết quả provider. | `payment_orders`, normalized `provider_transactions`; `CREATED/PENDING/PAID_CONFIRMED/EXPIRED/FAILED`. | Job completed, funds released hoặc worker paid. |
| Job Funds | Trạng thái phân bổ khoản tiền bảo vệ cho Job. | Ledger-backed allocation/state: `NOT_FUNDED`, `FUNDS_LOCKED`, `RELEASE_ELIGIBLE`, `ON_HOLD`, `RELEASED`, `REFUND_PENDING`, `REFUNDED`. | Legal escrow claim hoặc payout status. |
| Worker Payable | Nghĩa vụ phải trả Worker sau điều kiện release. | `worker_payables`, linked job/funds/ledger. | Số dư ví, batch membership hoặc provider payout result. |
| Payout | Yêu cầu và attempts chuyển tiền cho Worker. | `payout_batches/items`, `payout_requests`, `payout_attempts`. | Funds release hoặc completion. |
| Refund | Nghĩa vụ hoàn tiền và kết quả provider. | `refunds`, proposal/approval/execution và ledger. | Sửa payment history hoặc adjustment chung. |
| Finance Proposal | Đề nghị maker chuẩn bị cho refund/adjustment/payout exception. | `finance_proposals`; `DRAFT/PROPOSED/PENDING_REVIEW/NEEDS_EVIDENCE/APPROVED/REJECTED/EXPIRED/CANCELLED`. | Approval hay execution. |
| Approval | Quyết định checker độc lập, có reason/MFA khi policy yêu cầu. | `approval_records`, append-only. | Provider success hoặc ledger posting. |
| Execution | Lệnh đã được duyệt và từng attempt thực hiện. | `execution_requests/attempts`; `READY/SUBMITTING/PROCESSING/SUCCEEDED/FAILED/UNKNOWN/CANCELLED`. | Approval; `UNKNOWN` không phải failed. |
| Ledger | Sổ kép append-only ghi financial effect. | `ledger_transactions/entries`; mỗi transaction cân debit/credit. | Mutable balance field hoặc provider log. |
| Reconciliation | So expected nội bộ với provider actual và bank actual nếu có. | Runs/items/matches/cases/rules; rule version + cutoff. | Chỉ so tổng tiền hoặc net variance. |
| Period | Khoảng tài chính theo local cutoff và close lifecycle. | `finance_periods`, close runs/checks/signoffs. | Date filter tùy ý của dashboard. |
| Snapshot | Bản ghi bất biến của dữ liệu tại commit/close. | `job_financials` hoặc `period_snapshots`. | Export file hay cache dashboard. |
| Revenue | Phí platform/priority được ghi nhận khi Job `COMPLETED_CONFIRMED`, có recognition event. | Completion confirmation + committed financial snapshot + ledger/read model. | Cash collected hoặc GMV. |
| GMV | Tổng giá trị giao dịch Job theo metric definition/cutoff; là derived metric. | Job financial snapshots và canonical metric read model. | Revenue hay tiền provider đã thu. |
| Cash Collected | Tiền provider xác nhận đã thu trong window/cutoff. | `payment_orders/provider_transactions` + reconciliation. | Revenue, locked funds hoặc available cash. |

> **DO NOT CONFUSE WITH**  
> `PAID_CONFIRMED != RELEASED != PAID_OUT`; `APPROVED != SUCCEEDED`; Cash Collected != Revenue; GMV != Revenue; Locked Funds không phải tuyên bố escrow pháp lý; Job completion không đồng nghĩa Worker payout.

## 3. Canonical states and financial semantics

UI MUST map trực tiếp tới Canonical v1.1 section 4 và MUST NOT tạo terminal state cạnh tranh. Job dùng `DRAFT, PAYMENT_PENDING, OPEN, MATCHING, ASSIGNED, IN_PROGRESS, COMPLETION_SUBMITTED, COMPLETED_CONFIRMED, CANCELLED, DISPUTED`. `AUTO_CONFIRMED` chỉ là `completion_confirmation_method`, cùng `EMPLOYER_ACCEPTED` và `ADMIN_RESOLVED`.

Payment, Funds, Proposal và Execution dùng chính xác state đã liệt kê trong section 2. UI status key MUST gồm domain + state. Legacy `ACCEPTED`, `Completed`, `PAYOUT_PENDING`, `BATCH_PROPOSED`, `EXACT_MATCH` không được tái dùng làm canonical aggregate status; adapter/backfill map theo Canonical conflict register và đánh dấu ambiguous data để review.

> **FINANCE RULE**  
> `employer_total = worker_wage + platform_fee + priority_fee - eligible_voucher`.  
> `voucher_discount = jobfree_funded + employer_funded + provider_funded`.  
> Mọi amount MUST là integer VND, explicit currency, không float. Historical Job MUST dùng committed `job_financials`; MUST NOT recompute bằng current pricing/service/voucher. Revenue chỉ recognize khi Job đạt `COMPLETED_CONFIRMED`. Ledger MUST double-entry, append-only; correction dùng compensating transaction; không có direct balance update.

## 4. Data-source semantics

| Class | Vai trò | Ví dụ Admin Data |
| --- | --- | --- |
| SOURCE TABLE | Sở hữu fact/lifecycle operational | jobs, payment_orders, worker_payables, cases, proposals |
| IMMUTABLE EVENT/JOURNAL | Bằng chứng đã xảy ra, append-only | provider_transactions, ledger_entries, audit_logs, confirmations |
| SNAPSHOT | Giá trị/rule/version tại commit hoặc close | job_financials, period_snapshots |
| DERIVED VIEW | Query tính lại từ source với metric/cutoff | cash collected, locked funds, payable total, unreconciled amount |
| MATERIALIZED AGGREGATE | Cache rebuildable có watermark/rule version | dashboard/analytics summaries |

GMV, Cash Collected, Locked Funds, Worker Payable total, Revenue, Unreconciled Amount, Fill Rate, Retention và Payout Success Rate MUST là derived/read-model metrics, trừ số đã ký trong official closed-period snapshot. Missing/stale MUST NOT trở thành 0. Read model MUST expose `computed_at`, source watermark/freshness và metric version.

## 5. Permission matrix

| Permission | Admin Data | Admin System | Semantics |
| --- | --- | --- | --- |
| `finance.dashboard.view`, `finance.transaction.view` | Allow | Allow | Masked/scoped read models |
| `finance.export.create` + export mode permission | Allow | Allow | Registry/range/PII policy vẫn áp dụng |
| `recon.case.create/assign`, `recon.match.exact` | Allow | Allow | Exact match chỉ khi rule pass, variance hợp lệ |
| `finance.adjustment.propose`, `refund.propose`, `payout.batch.propose` | Allow | Allow | Maker action, không tạo execution effect |
| `finance.adjustment.approve`, `refund.approve`, `payout.batch.approve/execute` | Deny | Allow | Checker khác maker; server enforced |
| `recon.day.prepare` | Allow | Allow | Chạy checks, reconcile, chuẩn bị package |
| `period.close_day.execute` | Deny | Allow | Independent close authority theo canonical resolution |
| `recon.month.lock/reopen` | Deny | Allow | High-risk, audit/MFA theo policy |
| `pricing.rule.update`, `admin.role.manage`, `payment.config.manage` | Deny | Allow | Không thuộc Data workspace |
| `ledger.balance.update`, `audit.log.delete` | Deny | Deny | Bị cấm toàn hệ thống |
| `export.quick.create`, `export.async.create` | Allow | Allow | Theo report registry; sensitive có thể forced Async |
| `export.pii.include`, `export.audit.create`, `export.all.view`, `export.download.other` | Deny mặc định | Allow theo role/policy | PII export cần MFA/reason/checker; raw bank không export |
| `export.schedule.manage` | Allow own schedules | Allow own/scoped | P1; soft deactivate, giữ history |

> **WHY**  
> `recon.day.close` v1.0 bị tách thành prepare và execute vì đóng ngày là financial signoff. UI visibility chỉ là UX; RLS/RPC/Edge Function/server authorization MUST là enforcement.

## 6. Shared screen contract

`JobFree_Admin_UI_System_Design_shadcn.md` is authoritative for the shadcn-based AdminShell, shared components, visual tokens, accessibility, frontend module boundaries, query/form/table patterns and landing-page isolation. This PRD is the complete Source of Truth for Data-console product behavior and required outcomes.

Mọi màn MUST render default, loading, empty, error, stale/partial, forbidden và not-found khi có detail. Filter/sort/page lưu trong URL; refresh không mất context. Server pagination và cancellation signal áp dụng. Money/time/status dùng shared canonical formatter. `UNAUTHENTICATED` redirect an toàn; `FORBIDDEN` hiện permission cần thiết nhưng không leak data; `CONFLICT` yêu cầu reload/compare; `STALE_DATA` block risky action; `PROVIDER_UNAVAILABLE` không duplicate submit; `UNKNOWN_RESULT` chuyển reconciliation, không auto retry.

Mọi mutation ghi `correlation_id`; mutable aggregate dùng `expected_version`; monetary execution dùng `idempotency_key`. Audit append-only với actor/role/action/object/result/reason và redacted context. Event envelope theo Canonical section 2. PRD MUST NOT copy or fork shadcn primitives; shared UI changes are made once in System Design and the component layer.

## 7. Screen specifications

### AD-01 — Finance Control Center

| Item | Specification |
| --- | --- |
| Purpose / Business question | Trang mở đầu: “Dòng tiền tại cutoff có an toàn, nguồn nào stale và ngoại lệ nào cần xử lý trước?” |
| Users / Route / Priority | Finance/Data Operator, analyst; `/admin-data/control-center`; P0 |
| Permission / Source | `finance.dashboard.view`; `admin_finance_control` từ ledger, payments, payables, recon cases, period snapshots; source watermark hiển thị. |
| KPI | `M-CASH`, `M-LOCKED`, `M-PAYABLE`, `M-UNRECON`, Open Cases, Over-SLA, `M-PAYOUT-SUCCESS`; mỗi card hiện unit, cutoff, freshness, drill-down. |
| Filters / View | Today/7 days/custom, service, region, risk, freshness; health banner, exception queue, payout aging, provider health, 7-day trend. Queue: case ID/type/object/variance/severity/owner/age/SLA/next action. |
| Actions / Audit | Open transaction/case; assign owner; create case from alert; export snapshot. `ADMIN_SCREEN_VIEWED`, `ADMIN_FILTER_APPLIED`, case/assignment/export events. |
| States / Edge | Healthy/warning/critical; partial/stale/provider-down. Critical/over-SLA sorted first. A late provider event refreshes metric with new watermark, không rewrite closed snapshot. |
| Export / Dependency | Registry control-center snapshot; quick/async by registry, active filters; depends metric registry, provider freshness, AD-03/04/05/18a. |

> **DATA RULE**  
> Dashboard là derived view; số zero chỉ hiện khi source complete và formula thực sự bằng 0. Stale/partial hiện badge, source và cutoff; risky action bị block.

Acceptance criteria:

- AD01-AC1 Given một provider source quá freshness threshold, when mở màn, then KPI phụ thuộc source đó hiển thị stale/unknown chứ không hiển thị 0, và action rủi ro bị disable.
- AD01-AC2 Given KPI Unreconciled Amount, when click card, then AD-05 mở với cùng cutoff/filter và tổng `SUM(ABS(variance))` tái tạo đúng card.
- AD01-AC3 Given critical/over-SLA và warning cases, then critical/over-SLA đứng trước, mỗi row deep-link đúng case và không lộ PII raw.

### AD-02 — Payment Transactions

| Item | Specification |
| --- | --- |
| Purpose / Business question | Theo dõi collection PayOS: expected gì, provider paid gì và đã reconcile chưa. |
| Users / Route / Priority | Reconciliation/Finance Operator; `/admin-data/payments`; P0 |
| Permission / Source | `finance.transaction.view`; `admin_payments` từ payment_orders, normalized provider_transactions, recon items/matches. |
| Summary / Filters | Paid Confirmed, Pending, Expired, Failed, Unmatched, mismatch, duplicate signal; date range, payment/recon state, amount, service, `order_code/job_id/provider_ref`. |
| Table / Fields | `created_at`, order/job/employer masked, `expected_amount`, `paid_amount`, payment state, reconciliation state, provider ref, `updated_at/occurred_at/received_at`. Provider và recon state là cột riêng. |
| Actions | View/export; exact match khi canonical rule/version pass và variance = 0; create case; note. No provider override/force match. Match records actor/object IDs/rule version and `RECON_MATCHED`. |
| States / Export | Payment canonical states + recon `UNMATCHED/MATCHED/EXCEPTION/RESOLVED/CLOSED`; registry `payment_transactions`, CSV/XLSX, ≤5K Quick, >5K Async, date required, Quick max 90 days. |

Acceptance criteria:

- AD02-AC1 Given search by any `order_code`, `job_id` or `provider_ref`, then matching scoped records return without treating identifiers as interchangeable.
- AD02-AC2 Given selected rows have different rule versions or any non-zero variance, when bulk match, then server rejects and no match/audit-success event is created.
- AD02-AC3 Given active filters, when export, then file dataset/filter hash matches screen and `ADMIN_EXPORT_REQUESTED` is recorded.

### AD-03 — Job Financial Detail

| Item | Specification |
| --- | --- |
| Purpose / Business question | Một hồ sơ liên kết Job lifecycle, committed financial snapshot, payment, funds, payable, payout, refund, ledger, reconciliation và audit. |
| Users / Route / Priority | Finance/Data Operator; `/admin-data/financial/:objectType/:id`; P0 |
| Permission / Source | `finance.transaction.view`; `admin_financial_detail` từ canonical entities; restricted evidence signed access. |
| Summary / View | Expected, Collected, Locked, recognized revenue, payable, paid out, refunded, variance; tabs Timeline/Ledger/Provider/Reconciliation/Audit; timeline by `occurred_at`. |
| Fields / States | Canonical domain status rails shown separately; completion shows `COMPLETED_CONFIRMED` + method. Money uses committed `job_financials`, never current pricing. |
| Actions | Create case, note, evidence, proposal; approval/execution read-only deep-link. Audit case/proposal/evidence actions. |
| States / Export | Loading/404/forbidden/stale/partial; provider raw payload unavailable to ordinary Data role. Detail export only via registered report and masking. |

Acceptance criteria:

- AD03-AC1 Given historical Job whose current pricing changed, then summary equals committed snapshot and shows referenced pricing version.
- AD03-AC2 Given payment confirmed but payout absent, then payment=`PAID_CONFIRMED`, funds/payable/payout rails remain independent; UI MUST NOT label Worker paid.
- AD03-AC3 Given ledger imbalance/read-model tie-out variance, then screen shows explicit critical variance and blocks financial proposal submission until acknowledged/case-linked.

### AD-04 — Worker Payables & Payout Monitor

| Item | Specification |
| --- | --- |
| Purpose / Business question | Worker nào đã release-eligible nhưng chưa paid, vì sao, đang ở batch/request/attempt nào. |
| Users / Route / Priority | Finance Operator; `/admin-data/payables`; P0 |
| Permission / Source | View + `payout.batch.propose`; `admin_payables` từ funds allocation, worker_payables, batches/items, requests/attempts. |
| KPI / Filters | `M-PAYABLE`, Ready, Hold, Failed, P50/P95 aging, `M-PAYOUT-SUCCESS`; fund state, payable eligibility, batch, request state, attempt result, age/risk/service/worker/date. |
| Table | Worker masked, Job, amount, release time, aging, hold reason; **separate columns**: fund status, payable status, batch membership, payout-request status, latest attempt/result/provider ref. |
| Actions | Select eligible payables, prepare batch proposal, evidence, exclude with reason. Admin Data cannot approve/submit provider payout. |
| Export | `worker_payables`, always Async CSV/XLSX, date required, MFA before submit; raw bank never present, only masked last four. |

Acceptance criteria:

- AD04-AC1 Given funds=`ON_HOLD`, when add to batch, then server rejects; payable remains unchanged and denied attempt is audited.
- AD04-AC2 Given payable already belongs to active batch, when add elsewhere, then uniqueness/conflict prevents duplicate membership.
- AD04-AC3 Given payout attempt FAILED/UNKNOWN, then attempt number/provider result/retry policy are shown; UNKNOWN does not enable blind retry.
- AD04-AC4 Export never contains raw bank/phone even if caller has broader PII permission.

### AD-05 — Reconciliation Workspace

| Item | Specification |
| --- | --- |
| Purpose / Business question | Tại cutoff, expected nội bộ, provider actual và bank actual (nếu có) khớp ra sao, ngoại lệ nào cần case. |
| Users / Route / Priority | Reconciliation Operator; `/admin-data/reconciliation`; P0 |
| Permission / Source | `recon.match.exact`, `recon.case.create/assign`; runs/items/matches/cases/rules -> `admin_reconciliation`. |
| KPI / Filters | Reconciliation Rate, `M-UNRECON`, matched/unmatched/exceptions/over-SLA; cutoff, source, rule version, state, variance, severity, owner/SLA. |
| Table / View | Three-way totals, rule tabs, groups/buckets/chart; refs, expected/provider/bank amount, `variance=expected-actual` per rule, rule/status/owner. Missing bank input = partial, không false mismatch. |
| Actions | Exact match, case/assign, classify, link, evidence. No force-match. Match immutable with rule version/actor/IDs. |
| Export | `reconciliation_workspace`, CSV/XLSX, cutoff/date required, Quick/Async; export totals use `SUM(ABS(variance))`. |

Acceptance criteria:

- AD05-AC1 Given variances +100 và -100, then Unreconciled Amount = 200, không net thành 0.
- AD05-AC2 Given statement source missing at cutoff, then row/source summary is partial and exact-match action is blocked if rule requires bank actual.
- AD05-AC3 Given valid exact match, then immutable match stores cutoff, rule version, actor/object IDs and audit event.

### AD-06 — Reconciliation Case Detail

| Item | Specification |
| --- | --- |
| Purpose / Business question | Hồ sơ chuẩn cho variance: ai sở hữu, evidence gì, timeline/SLA ra sao và proposal/resolution nào liên quan. |
| Users / Route / Priority | Reconciliation Operator; `/admin-data/reconciliation/cases/:caseId`; P0 |
| Permission / Source | case view/create/assign, proposal permissions; cases/links/evidence/proposals/audit -> `admin_recon_case_detail`. |
| Summary / View | Variance, age, SLA due, severity, affected amount; tabs Investigation/Evidence/Proposal/Audit; source values/timestamps and reason taxonomy. |
| Actions | Assign, investigate, comment, attach immutable evidence, propose refund/adjustment/payout exception, submit. Close result is read-only from controlled resolution. |
| States | Canonical recon case states. Source change after proposal marks proposal stale and requires new expected version/review. |

Acceptance criteria:

- AD06-AC1 Given required reason/evidence missing, proposal submission returns validation errors and remains draft.
- AD06-AC2 Given source version changes after proposal, then proposal shows stale, submit is blocked, original evidence/audit remains intact.
- AD06-AC3 Given forbidden actor, direct route returns 403 and neither evidence URL nor case data is disclosed.

### AD-07 — Refund & Adjustment Queue

```text
Case / Dispute -> Finance Proposal -> Admin System Approval
               -> Execution Request -> Execution Attempt -> Ledger effect
```

| Item | Specification |
| --- | --- |
| Purpose / Business question | Maker chuẩn bị và theo dõi monetary proposal từ draft tới execution outcome, không tự approve. |
| Users / Route / Priority | Finance/Data Operator; `/admin-data/refunds-adjustments`; P0 |
| Permission / Source | propose permissions; proposals, approvals, requests/attempts, refunds, ledger -> `admin_proposal_queue`. |
| KPI / Filters | Draft, Pending Review, Approved-not-executed, Processing, Failed/Unknown, total amount, aging; type/state/maker/checker/amount/case/date. |
| Table / View | Tabs Refund/Adjustment/Payout Exception; proposal/case/object/amount/maker/submitted/checker; separate proposal, approval, execution and ledger result columns. |
| Actions | Create/edit draft, submit, cancel/withdraw only where canonical transition permits, add evidence after `NEEDS_EVIDENCE`. No approve/execute. |
| Export | `refund_adjustment_queue`, CSV/XLSX Quick/Async, date required; default excludes drafts and sensitive payment method details. |

> **DO NOT CONFUSE WITH**  
> Proposal `APPROVED` chỉ cho phép tạo execution request; chỉ execution `SUCCEEDED` kèm ledger posting mới là financial effect hoàn tất.

Acceptance criteria:

- AD07-AC1 Given maker opens own proposal, approval/execute controls are absent; direct server call is forbidden.
- AD07-AC2 Given checker requests evidence, maker may append evidence and resubmit; prior decision/evidence remains immutable.
- AD07-AC3 Given execution result UNKNOWN, UI shows unresolved state and reconciliation link; no automatic duplicate request.

### AD-08 — Period Close & Finance Report

| Item | Specification |
| --- | --- |
| Purpose / Business question | Period có đủ dữ liệu/checks để independent checker đóng ngày/khóa tháng chưa; official snapshot nào đang có hiệu lực. |
| Users / Route / Priority | Finance/Data Operator prepare; `/admin-data/period-close`; P0 |
| Permission / Source | `recon.day.prepare` allow; `period.close_day.execute` deny; periods/runs/checks/exceptions/signoffs/snapshots -> `admin_period_close`. |
| Lifecycle | `OPEN -> CHECKING -> READY_TO_CLOSE -> DAILY_CLOSED -> MONTH_LOCKED`; authorized `REOPENED -> CHECKING`. Admin Data chạy checks/reconcile/prepare package; Admin System checker execute close/lock/reopen. |
| View | Period selector, completeness/tie-out, critical exceptions, source watermarks, signoff history, snapshot list/version/hash and read-only financial totals. |
| Actions | Run/check preparation, link/resolve case, submit close package. No close/lock/reopen action in Data console. |
| Export | Registry `period_close_snapshot`, always Async XLSX multi-sheet; uses closed `snapshot_id`, no arbitrary date range. Export/download MUST NOT create/increment snapshot version. |

Acceptance criteria:

- AD08-AC1 Given critical open exception or stale required source, then period cannot reach READY_TO_CLOSE and submit package explains blockers.
- AD08-AC2 Given READY_TO_CLOSE, Admin Data can submit package but cannot execute close; distinct Admin System checker action creates successful close snapshot.
- AD08-AC3 Given snapshot version 2, repeated export/download retains version 2 and only adds export/download metadata.
- AD08-AC4 Given period not DAILY_CLOSED, official period snapshot export is unavailable.

### AD-09 — Revenue & GMV

| Item | Specification |
| --- | --- |
| Purpose / Route / Priority | Giải thích tăng trưởng giá trị giao dịch và recognized revenue; `/admin-data/analytics/revenue`; P1. |
| Permission / Source | dashboard/analytics view; committed job financials, confirmations, ledger, refunds -> revenue aggregate. |
| Metrics / Breakdown | `M-GMV`, `M-REVENUE`, `M-CASH`, platform/priority fee, voucher funding, refunds/adjustments; by date/service/region/completion method. |
| Semantics | Revenue recognizes at `COMPLETED_CONFIRMED` and `recognized_at`; cash uses provider paid time; refund/adjustment separate; period cutoff explicit. |
| States / Drilldown | Null/stale badge and watermark; drill AD-03/02; no current-pricing recompute. Export only registry fields. |

Acceptance: Given a paid but unconfirmed Job, cash may increase while revenue does not; after canonical confirmation, revenue appears at `recognized_at` using committed terms.

### AD-10 — Job Analytics

Purpose: hiểu volume, completion, cancellation, fill và cycle time; route `/admin-data/analytics/jobs`; P1. Source: jobs, matching, assignments, submissions/confirmations -> job aggregate. Metrics reference `M-FILL` plus created/open/assigned/completed/cancelled, time-to-match/completion. Filters by canonical state, service, region, priority and event-time window. Null/stale keeps unknown; drill to AS job view/AD-03. MUST separate confirmation method from terminal state and publish formula/window/freshness.

### AD-11 — Cancellation & Dispute Analytics

Purpose: tìm nguyên nhân/rủi ro cancellation và dispute; route `/admin-data/analytics/cancellations-disputes`; P1. Source: jobs, disputes/events/resolutions, refunds and risk flags. Metrics: cancellation/dispute rate, amount affected, resolution time, reason/service/region/actor stage. Rates use explicit eligible denominator and event cutoff; late resolution does not rewrite prior official snapshot. Drill to dispute/case/AD-03; PII masked.

### AD-12 — Priority Package Analytics

Purpose: đo adoption/value của priority fee/package; route `/admin-data/analytics/priority-packages`; P1. Source: committed job financials and service/pricing versions. Metrics: eligible jobs, adoption, priority fee, fill/time outcomes by version/cohort. MUST NOT infer causality from correlation. Package/cohort definition is `OD-METRIC`; until resolved label provisional. Drill to committed Job version.

### AD-13 — Employer Analytics

Purpose: hiểu acquisition, activity, spend và quality của Employer; route `/admin-data/analytics/employers`; P1. Source: users/profiles masked, jobs, committed financials, payments/disputes. Metrics: new/active employers, repeat rate, GMV/cash by cohort, cancellation/dispute. Active/cohort definitions use registry; missing identity source is unknown, not zero. No contact PII in aggregate/export by default; drill to scoped user and Jobs.

### AD-14 — Worker Analytics

Purpose: hiểu supply, completion, earnings/payout và quality; route `/admin-data/analytics/workers`; P1. Source: users, availability/skills, assignments, confirmations, payables/payouts, reviews. Metrics: active supply, assigned/completed, earnings/payables, payout aging/success, rating. Ratings MUST come from protected `reviews/ratings`; until implemented metric is unavailable, not fabricated. Worker identity/bank masked; drill to scoped operational records.

### AD-15 — Retention

Purpose: theo dõi cohort retention của Employer/Worker; route `/admin-data/analytics/retention`; P1. Source: user creation plus qualifying Job/activity events. Metric `M-RETENTION` MUST state cohort entry, return event, N-day/month window, timezone and incomplete-window handling. Current definition is `OD-METRIC`; no target invented. Drill to pseudonymized cohort membership; small cohorts protected.

### AD-16 — Services Analytics

Purpose: so sánh demand/supply/GMV/revenue/completion theo service version; route `/admin-data/analytics/services`; P1. Source: stable service + versions, jobs, matching, committed financials. Renames roll up by stable `service_id`; historical terms retain version. Metrics use registry and explicit cutoff; drill to Jobs/versions.

### AD-17 — Region & Supply–Demand

Purpose: nhận diện nơi demand vượt available supply; route `/admin-data/analytics/regions`; P1. Source: job locations/regions, availability/skills, matching attempts and assignments. Metrics: demand jobs, eligible available supply, gap, fill/time-to-match by region/window. Precise GPS MUST NOT enter aggregate/export; region granularity and availability rule are `OD-MATCH`. Stale availability shows unknown.

For AD-09–AD-17, all screens additionally MUST provide filters, accessible chart + table alternative, loading/empty/error/stale/forbidden states, metric tooltip with formula/cutoff/freshness, URL-persisted filters, drill-down and registry-governed export. Acceptance criterion common to each: Given any required source is stale/missing, when metric renders, then value is unknown/stale with source watermark and is not converted to zero; drill-down and export preserve the same metric version/filter.

### AD-18a — Export Infrastructure

| Item | Specification |
| --- | --- |
| Purpose / Route / Priority | Quản lý export jobs/files/download; `/admin-data/exports`; P0. |
| Permission / Source | export permissions; export_jobs/files/download_events/approvals -> `admin_exports`. Own scope default; all scope requires permission. |
| View / Filters | Active/completed/failed/expiring/rows today; status/report type/creator/date/scope; active queue refresh 15s, history and download drawer. |
| Lifecycle / Actions | `QUEUED` cancel; `RUNNING` progress only; `COMPLETED` download; `FAILED` retry max 3; `EXPIRED/CANCELLED` no file action. No Delete. |
| Security | 7-day file expiry; metadata retained; fresh 15-minute signed URL; every download audited. PII rules server-side; raw bank never exported. |

Acceptance criteria:

- AD18A-AC1 Given RUNNING job, cancel is unavailable and server cancel returns conflict; QUEUED creator may cancel with audit.
- AD18A-AC2 Given COMPLETED unexpired file, authorized download creates 15-minute URL and audit; reuse after expiry is denied.
- AD18A-AC3 Given binary expired after 7 days, metadata/history remains and no Download/Delete button exists.

### AD-18b — Reports & Scheduling

Purpose: template và scheduled report; routes `/admin-data/reports`; P1, chỉ sau AD-18a stable. Source: report templates/schedules/runs/export jobs. Users manage own schedules (`export.schedule.manage`); built-in templates deactivate, không delete; run history retained. View: template gallery, schedules, builder, run history, next/last status. Frequency conflict warns but does not block. Output flows through AD-18a and registry. Acceptance: deactivation stops future run without deleting history; scheduled completion creates export metadata and notification.

### AD-19 — Data Quality

Purpose: theo dõi source/check/run/issue/waiver và freshness; route `/admin-data/data-quality`; P1. Source: data_sources, checks/runs, issues/waivers -> `admin_data_quality`. View: health by source/domain, pass/fail/unknown, last/next run, issue severity/owner/SLA and lineage. Action: assign/classify/acknowledge/propose waiver; waiver requires authorized checker, reason/expiry and cannot alter source silently. Missing run != pass. Audit all waiver/closure; drill to source/event/object.

### AD-20 — Event Explorer

Purpose: tìm event theo aggregate/correlation và kiểm tra provenance/schema; route `/admin-data/events`; P1. Source: redacted event_log_index, validation results and audit -> `admin_events`. Fields: event/type/schema, aggregate, occurred/received time, source, correlation/causation, validation; payload redacted. Filters: time, source/type/schema/result/correlation/object. Admin Data cannot edit/replay/delete event; provider raw pointer and PII unavailable. Late/out-of-order event shows both timestamps. Export registry enforces redaction and date range.

## 8. Export subsystem application

Detailed definition: `supporting/JobFree_PRD_Export_Reports_v2.0.md` sections 3-14; shared data invariants remain in the supporting Canonical contract. Data console applies that contract through AD-18a/AD-18b. Quick/Async là execution strategy; allowed format do logical Report Registry backed by canonical `report_templates` quyết định. Estimated rows > 5,000, cross-domain hoặc sensitive scope MUST Async; server rechecks actual policy. Date range bắt buộc trừ registered period snapshot. AD-02 Quick tối đa 90 ngày; AD-04 và AD-08 luôn Async. Cancel chỉ áp dụng cho `QUEUED`; `RUNNING` không cancel trong MVP. Retry là khái niệm khác: chỉ áp dụng sau `FAILED`, tối đa ba attempts khi registry/policy cho phép. File hết hạn sau 7 ngày, signed URL 15 phút, metadata/audit tồn tại sau expiry. Period export references an existing snapshot; export/download MUST NOT increment snapshot version. CSV UTF-8 BOM/integer VND/UTC; XLSX có Data và Metadata; metadata chứa export/report/filter hash/row count/PII scope/expiry/correlation. Raw bank account MUST NEVER export.

## 9. PII and security matrix

| Data | Admin Data visibility | Export | Enforcement |
| --- | --- | --- | --- |
| Phone, email, full name | Masked/pseudonymized read model; scoped detail only if separate permission | Excluded by default; Admin Data không có `export.pii.include` mặc định | Server read model/RLS; UI mask không phải boundary |
| ID document/number | Không raw; verification metadata tối thiểu khi case cần | Không raw trong MVP | Private storage + signed access for authorized System role |
| Bank account | Last four only | Raw MUST NEVER export; masked last four only | Restricted vault/reference and server projection |
| GPS/location | Region/precision-minimized; exact evidence only scoped case access | No raw track/default photo | Restricted evidence storage, signed access/audit |
| IP/session | Không mặc định; security context redacted | Chỉ Security Admin audit export | Restricted audit store |
| Provider raw payload | Normalized/redacted transaction only | Never raw | Restricted pointer/hash; no frontend secret |
| Evidence photo | Metadata/thumbnail only when case-scoped and permitted | Không bulk raw export | Private bucket, signed URL, audit |

MFA/reason/checker áp dụng theo canonical policy. Retention duration là `OD-RETENTION`; legal hold và deletion evidence MUST được thiết kế trước production.

## 10. Business data dictionary

Tất cả timestamp persist UTC; presentation `Asia/Ho_Chi_Minh`. `Nullable=Yes` nghĩa unknown/not-applicable có ý nghĩa, không được đổi thành zero/empty string.

| Field | Meaning / Source | Type; Nullable; Rule | Why / Do not confuse with |
| --- | --- | --- | --- |
| `job_id` | Stable internal Job ID; jobs | UUID; No; never reused | Join domain records; not order/provider ref |
| `order_code` | Public/provider payment order code; payment_orders | string; No per order; provider-scoped unique | Lookup payment; not PK/job ID |
| `provider_ref` | Provider transaction reference; provider_transactions | string; Yes until received; provider-scoped | Reconcile external fact; may be sensitive/tokenized |
| `worker_wage` | Committed worker compensation; job_financials | bigint VND; No; >=0 | Payable basis; not paid-out amount |
| `platform_fee` | Committed JobFree fee; job_financials | bigint VND; No; >=0 | Revenue component; not cash collected |
| `priority_fee` | Committed priority service fee; job_financials | bigint VND; No; >=0 | Separate pricing/revenue; not platform fee |
| `eligible_voucher` | Discount applicable to committed Job | bigint VND; No/default 0 only after complete calculation | Employer total; not campaign budget |
| `employer_total` | Wage + fees - eligible voucher; job_financials | bigint VND; No; invariant | Amount due; not provider paid actual |
| `expected_amount` | Internal expected amount for reconciliation | bigint VND; No | Compare actual; context-specific, not employer_total universally |
| `paid_amount` | Verified provider collected amount | bigint VND; Yes before payment result | Cash actual; not revenue/payout |
| `variance` | Expected - actual by versioned rule | bigint VND signed; Yes if actual missing | Exception; aggregate uses SUM ABS, not net |
| `cash_collected` | Derived verified provider collections | bigint VND; nullable on stale source | Liquidity/collection; not revenue |
| `locked_funds` | Derived ledger-backed locked allocation at cutoff | bigint VND; nullable on stale ledger | Protected funds; not legal escrow |
| `worker_payable` | Source obligation row or derived total by context | bigint VND; nullable until eligible | Owed amount; not batch/payout success |
| `platform_revenue` | Recognized platform/priority fee net defined adjustments | bigint VND; nullable until rule/source complete | Performance; not GMV/cash |
| `GMV` | Derived gross transaction value per registry | bigint VND; nullable if definition/source incomplete | Marketplace value; not revenue |
| `recognized_at` | Time revenue recognition event occurred | timestamptz; Yes before confirmation | Period cutoff; not payment/created time |
| `completion_confirmation_method` | Employer/auto/admin method for confirmed completion | enum; Yes unless Job completed | Explain completion; not Job state |
| `release_eligible_at` | Time funds/payable became eligible | timestamptz; Yes until eligible | Aging start; not payout time |
| `hold_reason` | Versioned reason for ON_HOLD | code + redacted text; Yes unless hold | Risk control; not dispute resolution |
| `proposal_id` | Finance proposal identity | UUID; No for proposal | Maker workflow; not approval/execution ID |
| `approval_id` | Independent checker decision identity | UUID; Yes until decision | Segregation; not success result |
| `execution_request_id` | Authorized command identity | UUID; Yes until approved/created | Retry scope; not attempt/provider ref |
| `execution_attempt_id` | One provider/ledger execution attempt | UUID; Yes until attempt | Diagnose retry/outcome; not request |
| `period_id` | Finance period identity/local cutoff | UUID; No for period record | Close scope; not dashboard date range |
| `snapshot_id` | Immutable close snapshot identity | UUID; Yes before successful close | Official history; not export/file ID |
| `snapshot_version` | Successor number from close/re-close | integer; Yes before snapshot; monotonic per period | History; export MUST NOT increment |
| `correlation_id` | Trace across request/event/audit | UUID/string; No for mutations/events | End-to-end trace; not idempotency |
| `idempotency_key` | Dedupes scoped monetary execution | opaque string; required for monetary command | Prevent duplicate effect; not correlation ID |
| `expected_version` | Client-observed aggregate version | integer; required mutation | Optimistic concurrency; not snapshot version |
| `occurred_at` | Source business event time | timestamptz; No where event exists | Ordering/cutoff; not receive/create time |
| `received_at` | Ingestion time | timestamptz; No for ingested event | Latency/freshness; not occurred time |
| `created_at` | Persistence record creation time | timestamptz; No | Audit lifecycle; not business event time |
| `updated_at` | Last permitted mutable update | timestamptz; No for mutable record | Cache/concurrency context; not occurred time |

## 11. Metric registry

All formulas are logical definitions; final exclusions/targets marked Open Decision MUST be ratified before production dashboards.

| ID / Name | Definition & formula | Source / Window / Refresh | Owner / Drill-down / limitation |
| --- | --- | --- | --- |
| M-GMV / GMV | Sum committed Job transaction value for eligible Jobs per metric version | job_financials + Job state; event-time window/cutoff; materialized refresh `OD-FRESHNESS` | Product/Finance; AD-09->AD-03; eligible-state definition `OD-METRIC` |
| M-REVENUE / Recognized Revenue | Sum recognized platform + priority fees + linked adjustments when `COMPLETED_CONFIRMED` | confirmations, snapshots, ledger; by `recognized_at`; `OD-FRESHNESS` | Finance; AD-09/03; restatement shown separately |
| M-CASH / Cash Collected | Sum verified `paid_amount` for PAID_CONFIRMED provider facts | payments/provider tx; occurred cutoff; `OD-FRESHNESS` | Finance Ops; AD-02; provider latency |
| M-LOCKED / Locked Funds | Ledger-backed amount in FUNDS_LOCKED/ON_HOLD at cutoff | fund allocation + ledger; point-in-time; `OD-FRESHNESS` | Finance; AD-04/03; not escrow/available cash |
| M-PAYABLE / Worker Payable Total | Sum outstanding worker obligations not paid/refunded at cutoff | worker_payables + payout results; point-in-time | Finance Ops; AD-04; partial payout policy reflected |
| M-UNRECON / Unreconciled Amount | `SUM(ABS(expected-actual))` over eligible unmatched/exception items | recon items/cases/rule version; selected cutoff | Reconciliation; AD-05; missing actual = partial, not zero |
| M-FILL / Fill Rate | Assigned eligible Jobs / eligible open Jobs for defined cohort/window | jobs/matching/assignments; `OD-METRIC`/`OD-FRESHNESS` | Operations/Product; AD-10/17; denominator open |
| M-RETENTION / Retention | Cohort members with qualifying return event / eligible cohort | users/jobs/events; `OD-METRIC` | Product Analytics; AD-15; incomplete windows excluded/labeled |
| M-PAYOUT-SUCCESS / Payout Success Rate | Confirmed PAID_OUT requests / submitted requests with resolved result | payout requests/attempts; window by submission; `OD-FRESHNESS` | Finance Ops; AD-04; UNKNOWN not success/failure until resolved |
| M-RECON-RATE / Reconciliation Rate | matched eligible items / complete eligible items at cutoff | recon run/items/matches | Reconciliation; AD-05; partial-source items excluded/labeled |
| M-OPEN-CASES / Open Cases | Count reconciliation cases not `CLOSED` at cutoff | reconciliation_cases; point-in-time; `OD-FRESHNESS` | Reconciliation; AD-01->AD-05/06; excludes deleted rows because cases are retained |
| M-OVER-SLA / Over-SLA Cases | Count open cases whose active SLA due time is before cutoff, excluding an authorized pause interval | cases + SLA/pause events; point-in-time; `OD-FRESHNESS` | Reconciliation; AD-01->AD-06; pause policy must be versioned |
| M-PAYOUT-AGING / P50/P95 Aging | Percentile of `cutoff - release_eligible_at` for outstanding eligible payables | worker_payables + fund/hold state; point-in-time; `OD-FRESHNESS` | Finance Ops; AD-04; ON_HOLD shown as separate segment and not silently excluded |

Freshness threshold/refresh schedule MUST be stored per read model/source. Until `OD-FRESHNESS` is decided, UI MUST show actual `computed_at`/watermark and not promise a numerical SLA.

## 12. Requirement traceability matrix

| Requirement ID | Business reason | Screen | Domain / Source | Permission | Audit event | Acceptance | Original source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AD2-R1 Payment/recon separation | Prevent false equivalence | AD-02 | Payments + Recon / admin_payments | transaction view | screen/filter/match | AD02-AC1..3 | AD v1 AD-02; Canonical sections 4-5 |
| AD3-R1 Financial journey | Investigate one object end-to-end | AD-03 | Job/Payment/Ledger/Payout | transaction view | case/proposal/view | AD03-AC1..3 | AD v1 AD-03; Canonical 7-9 |
| AD4-R1 Separate payout layers | Avoid mixed states/duplicate pay | AD-04 | Funds/Payable/Batch/Payout | batch propose | proposal/denied | AD04-AC1..4 | AD v1 AD-04; Canonical conflict register |
| AD5-R1 Three-way recon | Detect real variance | AD-05 | Recon runs/items/matches | exact match/case | RECON_MATCHED/CASE_CREATED | AD05-AC1..3 | AD v1 AD-05; Export 5.3 |
| AD6-R1 Case evidence | Defensible resolution | AD-06 | Recon case/evidence/proposal | case/propose | evidence/proposal | AD06-AC1..3 | AD v1 AD-06 |
| AD7-R1 Maker workflow | Prevent self-approval | AD-07 | Proposal/Approval/Execution/Ledger | propose; approve deny | proposal submitted/decided | AD07-AC1..3 | AD v1 AD-07; Canonical conflict register |
| AD8-R1 Independent close | Reliable official snapshot | AD-08 | Period close/snapshot | prepare allow; execute deny | close preparation/signoff | AD08-AC1..4 | AD v1 AD-08; Canonical conflict register |
| AD1-R1 Trusted control KPIs | Prioritize exceptions safely | AD-01 | Finance read models | dashboard view | screen/filter/case | AD01-AC1..3 | AD v1 AD-01 |
| AD18-R1 Governed export | Prevent leakage/history loss | AD-18a | Export entities | export scoped keys | all export events | AD18A-AC1..3 | Export & Reports v2.0; Canonical section 12 |
| P0-R-SEC Server enforcement | UI bypass must not grant access | All P0 | RLS/RPC/authz/audit | per action | denied/action audit | Per-screen forbidden AC + security tests | AD v1 sections 3,9; Canonical 2 |

## 13. QA, release and Definition of Done

P0 fixtures/tests MUST cover success, empty, loading, error, stale/partial, forbidden, not-found where relevant, conflict and provider unknown. Automated tests MUST verify canonical enum mapping, money/time format, URL filters, server pagination, no false zero, masking/RLS, maker-checker, signed URL expiry, audit creation, idempotency and expected-version conflict. Accessibility requires keyboard/focus/labels/contrast and chart table alternative.

Release gates: all P0 acceptance criteria pass; permission matrix server tests pass; financial tie-out and export UAT pass; no critical security/accessibility defect; Product + Admin Data owner + Backend/Data + QA + Security/Finance sign off. Mock-to-live switch requires RLS/RPC policy tests and rollback/feature flag.

## 14. Open decisions

| OD-ID | Question | Why / Options | Affected areas | Owner |
| --- | --- | --- | --- | --- |
| OD-RETENTION | Retention/lawful-hold duration cho ID, GPS/evidence, provider raw, finance/audit/export metadata? | Options phải do policy/legal xác định; ảnh hưởng privacy, storage, deletion. | AD-03/06/18a/19/20, PII/export | Legal + Security + Finance |
| OD-CLOSE | Close-check thresholds, signoff roles và critical waiver có bao giờ cho DAILY_CLOSED? | Quyết định close safety; options: hard block hoặc controlled waiver theo class. | AD-08, period RPC/snapshot | Finance + Product |
| OD-VOUCHER | Rounding và eligibility cho voucher/fee adjustment, nhất là split-funded? | Bảo đảm invariant/tie-out; options chưa được source khóa. | AD-03/09/12, job terms | Finance + Product |
| OD-MATCH | Matching/ranking/exclusion policy, region granularity, live freshness và available-supply rule? | Cần rule version và reproducible analytics. | AD-10/17, AS-02/05 | Product + Operations |
| OD-METRIC | Final glossary cho GMV, active user, cohort/retention, fill, priority package và rating? | Tránh dashboard khác số; approve denominator/exclusions. | AD-09..17 | Product + Analytics + Finance |
| OD-FRESHNESS | Refresh expectation/threshold per source/read model? | Quyết định stale badge, alert và action blocking. | AD-01..20 | Data Platform + domain owners |

Các conflict đã resolve trong Canonical v1.1, gồm completion state, fund/payout split, maker-checker PII, close permission, snapshot/export version và RUNNING cancel, MUST NOT quay lại Open Decisions.

## 15. Change control and sign-off

Thay đổi payment formula, revenue recognition, completion, risk hold, payout, permission, state, snapshot, PII hoặc export policy MUST có Change Request ghi reason, owner, effective date, affected screen/API/schema/test và migration/backfill. Canonical thay đổi trước; PRD/read model/implementation cập nhật sau theo hierarchy.

Sign-off required: Product Owner; Admin Data Owner; Finance Operations; Frontend; Backend/Supabase; Data/Analytics; QA; Security/Legal reviewer.

Document-specific changes update this file in place. Do not create a new `UI_Ready`, `final`, `copy` or parallel Admin Data PRD. Framework, component and visual-system changes belong to System Design; shared domain changes belong to Canonical; export lifecycle changes belong to Export & Reports.
