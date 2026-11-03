# JobFree Product Requirements Document
# Export & Reports v2.0
## Governed Data Extraction, Reporting & Delivery

Status: Release Candidate for cross-functional sign-off  
Writing standard: `JobFree_PRD_Documentation_Standard_v1.0`  
Domain authority: `JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1`  
Integrations: `../JobFree_PRD_Admin_Data_Source_of_Truth.md`, `../JobFree_PRD_Admin_System_Source_of_Truth.md`

After sign-off, this document is the authoritative shared Export/Reporting subsystem contract and replaces the product-contract role of Export & Reports Supplement v1.1. Canonical v1.1 remains authoritative for shared entity, state, money, snapshot, PII and conflict decisions. Documentation Standard v1.0 remains authoritative for specification conventions; Admin Data/System v2.0 remain authoritative for their console behavior. The Supplement and other v1/source documents are historical traceability inputs only.

## 1. Product identity

Export & Reports is a governed subsystem shared by Admin Data and Admin System. It turns an authorized registered data definition into an auditable file or scheduled delivery without changing source business facts.

| Concept | Meaning | Not equivalent to |
| --- | --- | --- |
| Report | Versioned business definition: schema, metrics, filters, source, permissions and allowed outputs | Export job or file |
| Export request | Actor's request to run one report with validated filters/scope | Approval or generated file |
| Export job | Execution instance, policy decision and lifecycle | Report definition or file |
| Export file | Binary artifact produced by successful job | Source data or period snapshot |
| Period snapshot | Immutable finance artifact created by successful close/re-close | Export file/version |
| Schedule | Versioned rule creating future report requests | A completed report |
| Download | Authorized access to an existing file | Export generation or snapshot creation |
| Quick / Async | Execution strategy | CSV/XLSX/JSON format |

> **DO NOT CONFUSE WITH**  
> Report != Export Job; Export Job != Export File; Export File != Period Snapshot; Download != Export Generation; Quick != CSV; Async != XLSX.

## 2. Goals, users and boundaries

Goals: consistent governed extraction; reproducible filters/metrics; least-privilege PII handling; durable audit metadata; safe background execution; scheduled delivery; official period package export without mutating finance history.

Primary users: Finance/Data Operator, analyst, Finance Checker, System Operator and Security Admin. The subsystem MUST NOT expose raw SQL/query builders, provider secrets, unrestricted source-table export, direct browser storage access or file deletion that erases audit history.

## 3. Canonical architecture

```text
Report Registry
  -> Export Request
  -> Policy Evaluation
  -> Quick or Async Execution
  -> Export Job
  -> Export File
  -> Authorized Download

Report Schedule -> Schedule Run -> Export Request -> Export Job

Period Close / Re-close -> Immutable Period Snapshot vN
  -> Export Request references snapshot_id + snapshot_version
  -> Export Job -> Export File -> Download (still snapshot vN)
```

Export/download MUST NOT create or increment a period snapshot version. UI MUST NOT decide export security, format or source query independently; it submits a registered report type and filters to server policy evaluation.

## 4. Entity model and ownership

| Entity | Purpose / key references | Lifecycle / retention / audit |
| --- | --- | --- |
| `report_templates` / logical Report Registry | Canonical persisted versioned report definition/template entity; PK UUID; stable `report_type`; owns type/version/ownership, source read model, schema/metric version, filter and policy definition | Immutable version once active; disable/supersede, no historical overwrite; configuration activation audited; no parallel `report_definitions` table is introduced |
| `export_jobs` | PK UUID; FK report version, actor, optional approval/snapshot/schedule run; filter hash, estimates, state/counts | Mutable execution state; metadata retained after file expiry; every transition audited |
| `export_files` | PK UUID; FK job; storage key, checksum, size, created/expiry | Metadata retained; binary expires by policy; no public bucket |
| `export_download_events` | PK UUID; FK job/file/actor; session/IP reference and result | Append-only; every URL issuance/download attempt audited |
| `report_schedules` | PK UUID; FK report/template/owner; frequency, filters, active/version | Versioned/deactivated, not hard deleted; changes audited |
| `report_schedule_runs` | PK UUID; FK schedule/export job; trigger/cutoff/result | Append-only run history; survives schedule deactivation |

One report/screen MUST NOT create one source table. Reports read authorized read models/snapshots. Binary lifecycle and metadata lifecycle are separate.

## 5. Report registry contract

Every active report definition is a version of canonical `report_templates` in the logical Report Registry and MUST specify:

| Property | Rule |
| --- | --- |
| Identity | `report_type`, display name, description, owner/domain, enabled flag and immutable version |
| Source | Authorized read model/RPC, schema version and metric version where applicable |
| Audience | Allowed consoles (Data/System), required view/export permission and actor scope |
| Output | Explicit allowed formats only: CSV, XLSX and/or JSON; mode never implies format |
| Execution | Quick/Async allowed and forced-Async conditions; estimated/actual row policy |
| Filters | Typed filter schema, mandatory date/cutoff, maximum range, safe defaults and canonical hash |
| Sensitive data | Classification, allowed fields, excluded/masked fields, approval/MFA/reason policy |
| Snapshot | Whether closed `snapshot_id/version` is required; no regeneration of finance snapshot |
| Delivery | File expiry, download permission, schedule eligibility and notification policy |
| Audit | Event class and minimum payload for request, completion, failure, download, cancellation and expiry |

> **WHY**  
> A registry prevents each screen from inventing formats, PII behavior, row limits or metric definitions. Server evaluation against the registry is authoritative; UI configuration is not a security boundary.

## 6. Quick and Async execution

Quick and Async use the same registry/filter/security contract. Default: estimated rows <=5,000 MAY use Quick if the report permits; >5,000 MUST use Async. Cross-domain, PII/sensitive, worker-payable, period workbook and audit exports are forced Async. Server rechecks actual policy and authorization before release, so inaccurate estimates cannot bypass controls.

| Mode | Behavior | Formats |
| --- | --- | --- |
| Quick | Small same-screen extraction; request/job metadata and audit still created; immediate download if successful | Registry subset, normally CSV/XLSX |
| Async | Queue/worker generation, progress/history/notification and retry policy | Registry subset, possibly CSV/XLSX/JSON |
| Scheduled | Schedule run creates ordinary governed request/job | Registry schedule-eligible subset |

No “export all without filter.” Date range is required except registered period-snapshot reports. AD-02 Quick maximum is 90 days; audit export maximum is 30 days; user export maximum is 10,000 users.

## 7. Export lifecycle

Canonical job states:

```text
QUEUED -> RUNNING -> COMPLETED | FAILED
QUEUED -> CANCELLED
COMPLETED file -> EXPIRED (binary removed; metadata retained)
```

MVP cancel applies only to `QUEUED`. `RUNNING` cannot cancel. FAILED MAY retry up to three times when policy permits; attempts/history remain. Cancel authorization is ownership/scope based and independent from retry eligibility. Retry requires the actor still to hold the report's create permission and the immutable report/filter/security context still to pass current registry policy; cancel permission or QUEUED eligibility never grants retry. A retry is a new controlled attempt under the same request context, not a silent overwrite. COMPLETED requires checksum, row count and file metadata. EXPIRED is not NOT_FOUND metadata.

Errors: validation/forbidden create no file; source stale/partial blocks reports whose policy requires complete data; worker/provider unavailable records FAILED and reason; unknown worker result requires investigation, not duplicate release. Idempotency and expected version protect request/cancel/retry commands.

## 8. File, download and retention contract

- Binary expires seven days after successful generation unless a future policy version explicitly overrides it.
- Each download URL is freshly authorized, signed for 15 minutes and MUST NOT be cached as durable access.
- `export_jobs`, file metadata, filter hash, approval, checksum, row counts, download events and audit survive binary expiry according to retention policy.
- Download requires creator ownership or `export.download.other`; expired/missing binary returns safe expired state, not a regenerated file.
- No Delete action exists for export history. Schedule deactivation does not remove prior runs/files metadata.
- Storage is private; object key is not a public URL. Checksums verify delivered artifact integrity.

## 9. File and metadata formats

CSV uses UTF-8 BOM, comma delimiter, camelCase headers, integer VND and ISO-8601 UTC; optional `_ict` columns are presentation only and not source fields. XLSX contains Data and mandatory Metadata sheets, optional Field Dictionary, frozen/filterable headers, integer money with display format and ICT presentation timestamps. JSON is allowed only when registered, notably structured audit output.

Mandatory metadata: export ID, report type/version, schema/metric version, generated UTC time, masked actor ID, human-readable filters, canonical `filter_hash`, actual row count, PII scope, file expiry, correlation ID, source cutoff/watermark and optional period snapshot ID/version.

## 10. Security, PII and approval

PII is excluded by default and masked by server projection/export worker. Raw bank account MUST NEVER export, including with `export.pii.include`. Provider raw payload, secret/token and raw verification document MUST NOT export. Evidence/GPS raw bulk export is out of MVP.

| Classification | Default | Elevated path |
| --- | --- | --- |
| Phone/email/full name | Excluded or masked | Registered user report; permission + MFA + reason + distinct authorized System checker |
| ID number/document | Excluded | No raw document MVP; separately approved masked fields only if registered |
| Bank | Last four only where needed | Raw never allowed |
| GPS/evidence | Region/metadata only | Case-scoped signed viewing, not general export |
| IP/session | Masked/hashed | Security audit report with permission/reason/audit |
| Provider payload | Normalized redacted fields | Raw never general export |

PII export uses two people: requester/maker plus one different authorized Admin System checker. Approval record is immutable and generation must revalidate scope/freshness. UI masking is not authorization; server/RLS and worker policy are authoritative.

## 11. Permissions and audit events

| Permission | Admin Data | Admin System | Meaning |
| --- | --- | --- | --- |
| `export.quick.create` | Allow | Allow | Registered non-sensitive Quick only |
| `export.async.create` | Allow | Allow | Registered Async under scope |
| `finance.export.create` | Allow | Allow | Finance report eligibility, combined with mode permission |
| `export.schedule.manage` | Own schedules | Own/scoped schedules | Create/version/deactivate P1 schedule |
| `export.all.view`, `export.download.other` | Deny | Scoped allow | Cross-owner history/download with audit |
| `export.pii.include` | Deny default | Privileged allow | Still needs MFA/reason/distinct checker |
| `export.audit.create` | Deny | Security Admin | Redacted audit export; self-auditing |

Events and minimum payloads: `ADMIN_EXPORT_REQUESTED` (ID/type/version/filter hash/estimate/PII/screen/actor), `COMPLETED` (rows/duration/size/checksum), `FAILED` (code/attempt), `DOWNLOADED` (actor/session/IP reference/time), `CANCELLED` (actor/reason), `EXPIRED` (time), `SCHEDULED` (schedule/type/frequency/actor), `ADMIN_SCHEDULE_RUN` (schedule/job/trigger). Payloads are redacted and carry correlation ID.

## 12. Registered report catalog

| Report type / integration | Source and format | Execution/filter/security |
| --- | --- | --- |
| `payment_transactions` / AD-02 | admin payments; CSV/XLSX | Quick <=5K or Async; date required; Quick <=90d; provider ref policy |
| `worker_payables` / AD-04 | payables/funds/batch/payout view; CSV/XLSX | Always Async; date/MFA; raw bank/phone excluded, masked last four |
| `reconciliation_workspace` / AD-05 | recon cutoff/rule view; CSV/XLSX | Quick/Async; cutoff required; `SUM(ABS(variance))` |
| `refund_adjustment_queue` / AD-07 | proposal/approval/execution view; CSV/XLSX | Quick/Async; date; drafts excluded default; payment details protected |
| `period_close_snapshot` / AD-08 | existing period snapshot; XLSX multi-sheet | Always Async; closed snapshot ID; no custom range; export never versions snapshot |
| `job_management` / AS-03 | canonical jobs view; CSV/XLSX | Quick/Async; date; contact PII excluded/default masked |
| `user_management` / AS-07 | masked user/verification view; CSV/XLSX | Always Async; date; max 10K; PII path uses approval/MFA/reason |
| `audit_logs` / AS-18 | redacted audit read model; CSV/JSON | Always Async; max 30d; Security Admin; own recent logs restriction |

Built-in P1 templates: Daily Finance Summary, Weekly Reconciliation, Monthly Revenue & GMV, Payout Batch Summary, Period Close Package, Worker Payables Aging, Dispute & Cancellation, User Growth & Retention. Built-ins can be disabled/versioned, not deleted. Their exact metric definitions reference the owning PRD metric registry.

## 13. Screen specifications

### EX-01 — Export Infrastructure

Routes: P0 `/admin-data/exports` and `/admin-system/exports`. Purpose: view own/scoped jobs, progress, history, file expiry and authorized actions. Summary: Active, Completed Today, Failed, Expiring Soon, rows today. Filters: status/type/creator/date/scope. Table: export ID, type/version, filter summary, creator, created time, estimate/actual rows, state, expiry and actions. Auto-refresh active queue every 15 seconds without losing filter/selection. Download drawer shows checksum and countdown.

Actions: Download only completed/unexpired and authorized; Cancel only queued; Retry failed up to three; View details with permission redaction; no Delete. States include loading/empty/error/stale/forbidden/expired. Audit every action.

Acceptance criteria:

- Given QUEUED owned job, cancel succeeds once with audit; given RUNNING, UI omits cancel and server returns conflict.
- Given completed file, authorized download returns a 15-minute URL and audit; reuse after expiry is denied.
- Given seven-day binary expiry, metadata/history remains and no download/delete action appears.
- Refresh preserves filter/selection and never converts partial counters to zero.

### EX-02 — Reports & Scheduling

Routes: P1 `/admin-data/reports` and `/admin-system/reports`, dependent on stable EX-01. Shows template gallery, schedules, builder and run history. Schedule records registered report/version, typed filters, frequency/timezone, owner, next run and active version. Create/edit/deactivate requires `export.schedule.manage`; conflicts warn but do not bypass registry. Each run creates ordinary export request/job and notification/email according to approved delivery policy.

Acceptance: deactivate stops future runs and retains history; built-in template cannot be deleted; failed run is visible/audited; schedule cannot select forbidden format/PII scope/range.

## 14. Failure, retry and observability

Operational telemetry tracks queue delay, duration, rows, bytes, failure code, attempts and source watermark without file body/PII. Alerts cover stuck queue, repeated failures, storage expiry failure and unauthorized attempts. Retry never changes report/filter/version silently. Downloads and exports are traceable through correlation ID. Source changes after request follow registered consistency policy; period snapshot reports always read the referenced immutable snapshot.

## 15. Acceptance and traceability

| Req ID | Business reason / source | Surface/entity | Permission/event | Test |
| --- | --- | --- | --- | --- |
| EX-R1 Registry authority | Prevent UI policy drift; Canonical/Standard | registry/export job | scoped export; REQUESTED | Unregistered format/filter rejected server-side |
| EX-R2 Mode selection | Safe scale; historical Supplement source | EX-01/job | quick/async | >5K and forced classes Async |
| EX-R3 PII governance | Prevent leakage; Canonical | user/payable/audit reports | PII/audit + approval | masked default; raw bank never |
| EX-R4 Durable history | Auditability; historical Supplement source | jobs/files/download events | download/expiry events | binary expiry keeps metadata |
| EX-R5 Snapshot integrity | Finance history; Canonical conflict | period report/snapshot | finance export | repeated export keeps same snapshot version |
| EX-R6 Cancel/retry | Predictable execution; Canonical conflict | job lifecycle | cancel/retry events | QUEUED-only cancel; max retry history |
| EX-R7 Scheduling | Governed recurring delivery; historical Supplement source | schedule/run/job | schedule manage | deactivate preserves run history |
| EX-R8 Console integration | One subsystem; Data/System v2 | both routes | per-console scope | history/action respects actor scope |

P0 release gate: policy/server tests, permission/RLS bypass tests, format/metadata validation, row/range boundary tests, PII fixture scan, signed URL expiry, checksum, audit events, accessibility, queue failure/retry and period snapshot invariance all pass.

## 16. Open decisions

Reference shared `OD-RETENTION` and `OD-FRESHNESS`. Additional decisions:

| ID | Question / impact | Owner |
| --- | --- | --- |
| OD-EXPORT-DELIVERY | Which scheduled reports may email an attachment versus only an authenticated link? | Security + Product |
| OD-EXPORT-CONSISTENCY | For non-snapshot large exports, use request-time DB snapshot or documented watermark/eventual consistency? | Data Platform + Finance |
| OD-EXPORT-QUOTA | Per-role concurrency/daily row/byte quotas and abuse thresholds? | Platform + Security + Product |

No resolved snapshot, RUNNING-cancel or PII maker-checker conflict is reopened.

## 17. Iteration 4 cross-document resolution

1. Admin Data v2.0 and Admin System v2.0 reference this PRD as subsystem authority; the old Supplement is historical/source traceability only after v2 sign-off.
2. Report Registry is a logical subsystem. Canonical `report_templates` is its persisted versioned report definition/template entity; no duplicate `report_definitions` table exists.
3. Shared Open Decisions, metrics, routes, permissions and P0 requirements are indexed in `JobFree_PRD_Master_Traceability_v2.0.md`; definitions remain with their owning authority.

## 18. Change control and sign-off

Changes to report schema/metric version, source, allowed field/format, range, PII, approval, retention, snapshot or audit policy require a versioned registry change and impact review for UI/API/data/security/tests. Required sign-off: Product, Admin Data/System owners, Data Platform, Finance, QA and Security/Legal.
