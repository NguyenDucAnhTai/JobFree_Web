# JobFree PRD Export & Reports Supplement v1.1

PRODUCT REQUIREMENTS DOCUMENT
Export & Reports
UI Ready Supplement — Admin Data & Admin System
Thuộc tính | Giá trị
Version | 1.1 — Supplement to Build Baseline v1.0
Ngày khóa | 20/07/2026
Trạng thái | UI READY — Bổ sung cho PRD Admin Data v1.0
Màn bổ sung | AD-18a Export Infrastructure (P0 nâng cấp)
AD-18b Reports & Scheduling (P1 tách biệt)
AS-EX  Export cho Admin System
Stack tham chiếu | React + TypeScript + Vite + Tailwind + shadcn/ui
TanStack Query + Zod + Supabase Storage
Phụ thuộc | PRD Admin Data v1.0, PRD Admin System v1.0

1. Vấn đề & Quyết định Bổ sung
PRD Admin Data v1.0 để AD-18 Reports & Export Center ở P1, trong khi các màn P0 như AD-02, AD-04, AD-07 đều reference hành động "export" nhưng không có spec chi tiết. Supplement này vá gap đó bằng cách:
Tách AD-18 thành hai phần với priority khác nhau
Nâng export infrastructure lên P0 (AD-18a)
Giữ scheduling và report templates ở P1 (AD-18b)
Bổ sung export spec cho từng màn P0 hiện có
Thêm permission keys và shared component ExportTrigger
Định nghĩa ba loại export: Quick, Async, Scheduled
Quyết định khóa
Mọi export đều phải ghi audit event ADMIN_EXPORT_REQUESTED.
PII fields (phone, email, bank account, ID number) bị ẩn mặc định trong mọi export.
File export có expiry 7 ngày; download qua signed URL ngắn hạn (15 phút).
Async export bắt đầu khi estimated rows > 5,000 hoặc cross-domain query.
Không có "export all without filter" — phải có ít nhất date range.
2. Ba Loại Export
Loại | Khi nào dùng | Row limit | UX | Format | Audit
Quick Export | Bảng nhỏ, cùng màn, filter đã áp | ≤ 5,000 rows | Nút trên FilterBar → download ngay | CSV, XLSX | ADMIN_EXPORT_REQUESTED
Async Export | Dataset lớn, cross-domain, PII scope rộng | > 5,000 rows | Submit → toast "Đang xử lý" → notify khi xong → download tại AD-18a | CSV, XLSX, JSON | ADMIN_EXPORT_REQUESTED + ADMIN_EXPORT_COMPLETED
Scheduled Export | Báo cáo định kỳ tự động | Không giới hạn | Config tại AD-18b → chạy cron → lưu kết quả tại AD-18a | CSV, XLSX | ADMIN_EXPORT_SCHEDULED + ADMIN_EXPORT_COMPLETED

3. Permission Keys Bổ sung
Thêm vào permission matrix hiện có trong PRD Admin Data Section 3.1:
Permission key | Nghiệp vụ | Admin Data | Admin System | Ghi chú
export.quick.create | Quick export từ bất kỳ màn nào | Allow | Allow | Không bao gồm PII fields
export.async.create | Tạo async export job | Allow | Allow | Cần ít nhất date range filter
export.pii.include | Bao gồm PII fields trong export | Deny | Allow | Cần MFA confirm
export.audit.create | Export audit logs | Deny | Allow | Chỉ Security Admin
export.schedule.manage | Tạo/sửa/xóa scheduled export | Allow | Allow | Chỉ own schedules
export.all.view | Xem export history của toàn bộ admin | Deny | Allow | Finance Lead / Security Admin
export.download.other | Download file export của người khác | Deny | Allow | Cần audit

4. Shared Component — ExportTrigger
Thêm vào Shared Component Contract (Section 5.2 của cả hai PRD):
Prop / Slot | Type | Bắt buộc | Mô tả
screenId | string | Có | ID màn dùng để audit (vd: "AD-02")
reportType | ExportReportType | Có | Định danh loại export trong registry
currentFilter | object | Có | Filter đang active — hash vào audit
estimatedRows | number | Có | Dùng để quyết định Quick vs Async
allowedFormats | ExportFormat[] | Có | "csv" \| "xlsx" \| "json"
piiFields | string[] | Không | Danh sách field PII — ẩn mặc định
requireDateRange | boolean | Không | Default true — block nếu chưa chọn ngày
onExportQueued | (jobId) => void | Không | Callback khi async job được tạo
disabled | boolean | Không | Disable khi data stale hoặc partial

Behavior:
estimatedRows ≤ 5,000: trigger Quick Export → download ngay, fire audit event
estimatedRows > 5,000: mở AsyncExportDialog → confirm filter + format → submit job → toast
Nếu filter không có date range và requireDateRange=true: disable với tooltip "Chọn khoảng thời gian trước khi export"
Nếu thiếu permission export.quick.create hoặc export.async.create: ẩn nút hoàn toàn
Sau khi submit async: redirect user đến AD-18a Export History với job được highlight
5. Export Spec cho Từng Màn P0
Mỗi màn P0 cần bổ sung phần "Export Spec" sau đây vào section Screen Specifications. Đây là amendment cho PRD Admin Data v1.0 và PRD Admin System v1.0.
5.1  AD-02 — Payment Transactions
Thuộc tính | Giá trị
Loại export | Quick (≤5K rows) / Async (>5K rows)
Report type ID | "payment_transactions"
Format | CSV, XLSX
Date range bắt buộc | Có — block nếu range > 90 ngày cho Quick
Fields mặc định | created_at, order_code, job_id, employer_id, expected_amount, paid_amount, payment_status, match_status, updated_at
Fields bị ẩn | provider_ref (nếu chứa bank token) — cần export.pii.include để hiện
PII risk | Thấp
Permission cần | finance.export.create + export.quick.create hoặc export.async.create
Acceptance criteria | AC-EX1: Filter đang active được áp đúng vào export
AC-EX2: File có metadata sheet/header
AC-EX3: Audit event fired với filter_hash

5.2  AD-04 — Worker Payables & Payout Monitor
Thuộc tính | Giá trị
Loại export | Async (luôn luôn — dữ liệu nhạy cảm + thường >5K)
Report type ID | "worker_payables"
Format | CSV, XLSX
Date range bắt buộc | Có
Fields mặc định | worker_id, job_id, release_eligible_at, amount, aging_hours, hold_reason, payout_status, batch_id
Fields bị ẩn | bank_account_number, bank_name, phone — luôn mask, KHÔNG thể export dù có permission
PII risk | CAO — worker bank/payment info
Permission cần | finance.export.create + export.async.create
Giới hạn đặc biệt | Không bao giờ export raw bank account — chỉ export masked_account (4 số cuối)
Acceptance criteria | AC-EX1: Bank fields không xuất hiện trong file dù admin có export.pii.include
AC-EX2: MFA required trước khi submit async job
AC-EX3: Audit ghi rõ worker count trong payload

5.3  AD-05 — Reconciliation Workspace
Thuộc tính | Giá trị
Loại export | Quick (≤5K) / Async (>5K)
Report type ID | "reconciliation_workspace"
Format | CSV, XLSX
Date range bắt buộc | Có — cut-off date required
Fields mặc định | internal_ref, provider_ref, statement_ref, expected_amount, provider_amount, bank_amount, variance, rule, match_status, owner, severity
Fields bị ẩn | Không có PII trực tiếp
PII risk | Thấp
Ghi chú | Export Unreconciled Amount dùng SUM(ABS(variance)), nhất quán với KPI trên màn
Acceptance criteria | AC-EX1: Variance calculation khớp với số trên màn
AC-EX2: Export theo cut-off date, không theo export date

5.4  AD-07 — Refund & Adjustment Queue
Thuộc tính | Giá trị
Loại export | Quick (≤5K) / Async (>5K)
Report type ID | "refund_adjustment_queue"
Format | CSV, XLSX
Date range bắt buộc | Có
Fields mặc định | proposal_id, type, case_id, object_id, amount, maker_id, submitted_at, checker_id, status, execution_ref
Fields bị ẩn | employer payment method details — cần export.pii.include
PII risk | Trung bình
Acceptance criteria | AC-EX1: Proposal ở trạng thái DRAFT không xuất hiện trong export mặc định
AC-EX2: Tabs Refund/Adjustment/Payout Exception export riêng biệt

5.5  AD-08 — Period Close & Finance Report
Thuộc tính | Giá trị
Loại export | Async — luôn luôn (snapshot chính thức)
Report type ID | "period_close_snapshot"
Format | XLSX (multi-sheet: Summary, Tie-out, Exceptions, Ledger bridge)
Date range bắt buộc | N/A — export theo period, không theo date range tự chọn
Fields mặc định | period, completed_gmv, platform_revenue, cash_collected, locked_funds, worker_payable, refund_amount, variance, open_critical_cases, snapshot_version, generated_at
Fields bị ẩn | Không có PII (aggregate data)
PII risk | Thấp
Đặc biệt | Mỗi export tạo snapshot immutable với version number và generated_at. File này là tài liệu tài chính chính thức. Không thể regenerate snapshot đã close.
Acceptance criteria | AC-EX1: Snapshot version tăng mỗi lần export cho cùng period
AC-EX2: File có sheet "Metadata" ghi period, generated_by (masked), generated_at, filter_applied
AC-EX3: Không cho export period chưa DAILY_CLOSED

5.6  AS-03 — Job Management
Thuộc tính | Giá trị
Loại export | Quick (≤5K) / Async (>5K)
Report type ID | "job_management"
Format | CSV, XLSX
Date range bắt buộc | Có
Fields mặc định | job_id, created_at, service, region, status, priority, employer_id, worker_id (masked), scheduled_time, completion_time, payment_status, dispute_flag
Fields bị ẩn | employer_phone, employer_email, worker_phone, worker_name — cần export.pii.include
PII risk | Trung bình
Acceptance criteria | AC-EX1: Contact info không xuất hiện mặc định
AC-EX2: Status filter áp đúng vào export

5.7  AS-07 — User Management
Thuộc tính | Giá trị
Loại export | Async — luôn luôn
Report type ID | "user_management"
Format | CSV, XLSX
Date range bắt buộc | Có (signup_date range)
Fields mặc định | user_id, role, status, signup_date, verification_status, region, completed_jobs_count, dispute_count, last_active_at
Fields bị ẩn | Tất cả PII: phone, email, full_name, id_number, address, bank_account
PII risk | RẤT CAO — đây là màn nhạy cảm nhất
Permission đặc biệt | export.pii.include + MFA bắt buộc + reason bắt buộc + approval từ Admin System khác
Giới hạn đặc biệt | Không bao giờ export toàn bộ user list mà không có filter. Max 10,000 users per export.
Acceptance criteria | AC-EX1: PII fields trống trong file mặc định
AC-EX2: PII export cần 2 Admin System approve (maker-checker)
AC-EX3: Audit ghi IP, session, reason, scope của export

5.8  AS-18 — Audit Logs
Thuộc tính | Giá trị
Loại export | Async — luôn luôn
Report type ID | "audit_logs"
Format | CSV, JSON (JSON giữ cấu trúc before/after)
Date range bắt buộc | Có — max 30 ngày per export
Fields mặc định | occurred_at, actor_id, actor_role, action, object_type, object_id, result, correlation_id
Fields bị ẩn | before_state, after_state (PII redacted), IP address — cần export.audit.create
PII risk | Trung bình — IP + action context
Permission cần | export.audit.create (chỉ Security Admin)
Acceptance criteria | AC-EX1: Audit log export tự nó tạo một audit entry
AC-EX2: IP chỉ hiện khi Security Admin và có reason
AC-EX3: Không thể export log của chính mình trong 24h gần nhất (tránh cover tracks)

6. AD-18a — Export Infrastructure (P0)
Đây là phần nâng cấp từ AD-18 cũ lên P0. Mục tiêu: cung cấp nơi quản lý tất cả export jobs và download files.
Thuộc tính | Giá trị
Route | /admin-data/exports  \|  /admin-system/exports
Priority | P0 (nâng từ P1)
User goal | Xem trạng thái export jobs đang chạy, download file hoàn thành, huỷ job đang queue, xem lỗi và retry policy.
KPI/count | Active Jobs; Completed Today; Failed; Expiring Soon (< 24h); Total Rows Exported Today
Filters | status; report_type; creator; date_created; scope (own / all*)  *chỉ khi có export.all.view
Layout blocks | 1. Status summary chips
2. Active & queued jobs (auto-refresh 15s)
3. Export history table
4. Download drawer (signed URL, expiry countdown, checksum)
Table fields | export_id; report_type; filter_summary; creator; created_at; estimated_rows; actual_rows; status; expires_at; actions
API/RPC mock | GET /exports?scope=own
GET /exports/:id
POST /exports/:id/cancel
GET /exports/:id/download-url (generates signed URL)

Hành động
Action | Điều kiện | Audit
Download | Status = COMPLETED và chưa expired và là creator hoặc có export.download.other | ADMIN_EXPORT_DOWNLOADED
Cancel | Status = QUEUED và là creator hoặc có export.all.view | ADMIN_EXPORT_CANCELLED
Retry | Status = FAILED và creator, tối đa 3 lần | ADMIN_EXPORT_RETRIED
View details | Luôn luôn — nhưng filter_detail có thể bị redact theo permission | Không
Delete entry | KHÔNG CÓ — export history là audit record, không xóa được | N/A

UI States
Status | Màu / Icon | Action khả dụng | Mô tả
QUEUED | Gray / Clock | Cancel | Đang chờ worker xử lý
RUNNING | Blue / Spinner | Cancel | Đang generate, có progress %
COMPLETED | Green / Check | Download | File sẵn sàng, hiện expiry countdown
FAILED | Red / X | Retry, View error | Xem error message + retry count
EXPIRED | Gray / Archive | Không có | File đã xóa, chỉ còn metadata
CANCELLED | Gray / Ban | Không có | Bị huỷ bởi creator hoặc admin

Acceptance Criteria
AC1: Download button chỉ hiện khi COMPLETED và chưa expired.
AC2: Signed URL có expiry 15 phút — sau đó phải request URL mới (không cache URL cũ).
AC3: Expiring soon badge xuất hiện khi file còn < 24h trước khi hết hạn.
AC4: Progress % cập nhật mà không làm mất filter/selection của người dùng.
AC5: Không có nút Delete. Có banner: "Export history là audit record và không thể xóa."
AC6: Mỗi download tạo audit event ADMIN_EXPORT_DOWNLOADED với IP và session.
7. AD-18b — Reports & Scheduling (P1)
Tách từ AD-18 cũ. Chỉ bắt đầu sau khi AD-18a hoàn tất và stable.
Thuộc tính | Giá trị
Route | /admin-data/reports  \|  /admin-system/reports
Priority | P1
User goal | Tạo báo cáo định kỳ tự động, lưu report template với filter preset, xem lịch chạy, nhận notify khi báo cáo sẵn sàng.
KPI/count | Active Schedules; Last Run Status; Next Run; Failed Last 7 Days
Filters | schedule status; report type; frequency; owner
Layout blocks | 1. Report template gallery (Finance Ops, Period Close, Payout Summary, Reconciliation Weekly, v.v.)
2. Scheduled reports table
3. Schedule builder drawer
4. Run history per schedule
Table fields | schedule_id; report_type; name; frequency; next_run; last_run; last_status; owner; created_at
API/RPC mock | GET /reports/schedules
POST /reports/schedules
PATCH /reports/schedules/:id
DELETE /reports/schedules/:id (soft delete)
GET /reports/schedules/:id/runs
Out of scope P1 | Tự build custom query / SQL editor — không có trong MVP

Built-in Report Templates
Template ID | Tên | Frequency mặc định | Dùng cho
RPT-01 | Daily Finance Summary | Daily | AD-01 Control Center snapshot
RPT-02 | Weekly Reconciliation Report | Weekly | AD-05 Recon summary
RPT-03 | Monthly Revenue & GMV | Monthly | AD-09 Revenue Analytics
RPT-04 | Payout Batch Summary | Per batch | AD-04 mỗi khi batch execute
RPT-05 | Period Close Package | Monthly | AD-08 khi period đóng
RPT-06 | Worker Payables Aging | Daily | AD-04 aging tracker
RPT-07 | Dispute & Cancellation | Weekly | AD-11 summary
RPT-08 | User Growth & Retention | Monthly | AD-13, AD-14, AD-15

Acceptance Criteria
AC1: Schedule deactivate không xóa run history.
AC2: Template mặc định không thể xóa — chỉ được tắt.
AC3: Notify qua in-app notification và email khi report sẵn sàng.
AC4: Schedule conflict (hai schedule cùng type cùng thời điểm) có warning nhưng không block.
8. File Export Format & Metadata Contract
Mọi file export (Quick, Async, Scheduled) phải tuân theo contract này. Frontend và backend đều phải implement.
8.1  CSV Format
Encoding: UTF-8 with BOM (để Excel mở đúng tiếng Việt)
Delimiter: dấu phẩy (,)
Header row: tên field theo camelCase, ví dụ: jobId, workerWage, paymentStatus
Timestamp: ISO-8601 UTC trong file, nhưng thêm cột _ict tương ứng để người đọc tiện
Amount: integer VND, không format — ví dụ: 150000 không phải "150,000 đ"
PII masked: phone → "****1234", email → "e***@***.com", bank_account → "****5678"
8.2  XLSX Format
Sheet 1 — "Data": dữ liệu chính, header frozen, filter enabled
Sheet 2 — "Metadata": thông tin export (bắt buộc, xem 8.3)
Sheet 3 — "Field Dictionary" (optional): giải thích từng cột
Số tiền: format #,##0 trong Excel nhưng lưu là integer
Timestamp: format dd/mm/yyyy hh:mm ICT
8.3  Metadata bắt buộc trong mỗi file
Field | Ví dụ giá trị | Ghi chú
export_id | exp_abc123xyz | Dùng để tra cứu audit
report_type | payment_transactions | Từ report type registry
generated_at | 2026-07-20T07:35:00Z | UTC ISO-8601
generated_at_ict | 2026-07-20 14:35 ICT | Hiển thị cho người đọc
generated_by | admin_****a1b2 | Masked actor ID
filter_applied | date=2026-07-01..2026-07-20, status=UNMATCHED | Human readable
filter_hash | sha256:abc123... | Dùng để verify filter không bị modify
actual_row_count | 1247 | Không tính header
pii_fields | excluded | "excluded" \| "masked" \| "included_with_approval"
file_expires_at | 2026-07-27T07:35:00Z | UTC
correlation_id | corr_xyz789 | Link đến audit log entry

9. Events & Audit — Bổ sung vào Section 7.3
Thêm vào Admin product events trong PRD Admin Data Section 7.3:
Event | Trigger | Minimum payload
ADMIN_EXPORT_REQUESTED | User submit export (quick hoặc async) | export_id, report_type, filter_hash, estimated_rows, pii_scope, screen_id, actor
ADMIN_EXPORT_COMPLETED | Export job finish successfully | export_id, actual_rows, duration_ms, file_size_bytes
ADMIN_EXPORT_FAILED | Export job error | export_id, error_code, attempt_no
ADMIN_EXPORT_DOWNLOADED | Admin download file | export_id, actor, ip_hash, session_id, download_at
ADMIN_EXPORT_CANCELLED | Admin cancel queued job | export_id, actor, reason
ADMIN_EXPORT_EXPIRED | Cron xóa file sau 7 ngày | export_id, expired_at
ADMIN_EXPORT_SCHEDULED | Admin tạo scheduled export | schedule_id, report_type, frequency, actor
ADMIN_SCHEDULE_RUN | Schedule trigger một export | schedule_id, export_id, triggered_at

10. UAT Scenarios Bổ sung
Thêm vào P0 UAT scenarios trong cả hai PRD:
ID | Scenario | Expected
UE-01 | Quick export ≤5K rows trên AD-02 | File download ngay, có metadata sheet, audit fired
UE-02 | Async export >5K rows trên AD-02 | Toast "Đang xử lý" → job tại AD-18a → notify → download
UE-03 | Export AD-04 không có date range | Button disabled, tooltip "Chọn khoảng thời gian"
UE-04 | Export AD-04 — bank account field | bank_account không xuất hiện trong file dù có export.pii.include
UE-05 | Download file đã EXPIRED | 404 state "File đã hết hạn", không có download button
UE-06 | Admin thiếu export.quick.create | Export button ẩn hoàn toàn, không chỉ disabled
UE-07 | Export User Management với PII | Cần MFA + approve từ checker khác + reason bắt buộc
UE-08 | Signed URL dùng lại sau 15 phút | URL trả về 403, phải request URL mới qua AD-18a
UE-09 | Export Audit Log tạo audit entry | Trong audit log có entry ADMIN_EXPORT_DOWNLOADED cho action này
UE-10 | Cancel scheduled export | Run history giữ lại, schedule soft-delete không mất data

11. Coding Order & Dev Assignment
Tích hợp vào sprint plan hiện tại của cả hai PRD (Section 11):
Sprint | Dev | Task
Sprint 0 | Dev 1 (Foundation) | Thêm ExportTrigger component vào shared component library
Thêm export permission keys vào permissions/keys.ts
Viết mock fixture cho 6 export states
Sprint 1 | Dev 2 (Finance Ops) | Thêm ExportTrigger vào AD-02, AD-05, AD-07
Dựng AD-18a shell (read-only, mock data)
Sprint 2 | Dev 2 (Finance Ops) | Hoàn thiện AD-18a: cancel, retry, signed URL flow
Thêm ExportTrigger vào AD-04 (async only), AD-08 (snapshot)
Sprint 2 | Dev 3 (Analytics/Platform) | Thêm ExportTrigger vào AS-03, AS-07, AS-18
Dựng export history cho Admin System
Sprint 3 | Dev 2 (Finance Ops) | Nối AD-18a với Supabase Storage + signed URL
Async export queue với Edge Function
Sprint 4 | Dev 3 (Analytics/Platform) | AD-18b: Report templates + scheduling UI
PII export flow với MFA + maker-checker

12. Sign-off
Vai trò | Người duyệt | Ngày | Ký
Product Owner |  |  | ☐
Admin Data Owner |  |  | ☐
Admin System Owner |  |  | ☐
Frontend Lead |  |  | ☐
Backend/Supabase Lead |  |  | ☐
Security/Finance reviewer |  |  | ☐

Lưu ý quan trọng
Supplement này là amendment của PRD Admin Data v1.0 và PRD Admin System v1.0.
Các quyết định trong Section 1 có hiệu lực ngay sau khi Product Owner ký.
Mọi thay đổi sau baseline phải có Change Request theo quy trình Section 12.1 của PRD gốc.
