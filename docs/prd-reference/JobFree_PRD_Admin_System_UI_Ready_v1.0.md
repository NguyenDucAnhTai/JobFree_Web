  -----------------------------------------------------------------------
  **JOBFREE**
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

PRODUCT REQUIREMENTS DOCUMENT\
ADMIN SYSTEM

**Approve & Configure --- Operations, Finance Checker, Access và System
Governance**

+---+---------------------------------------------------------------------+
|   | Trạng thái tài liệu                                                 |
|   |                                                                     |
|   | UI READY --- Các quyết định MVP được khóa để đội Frontend có thể    |
|   | bắt đầu dựng shell, routes, component và mock data ngay. Backend    |
|   | contract dùng adapter nên có thể nối Supabase sau mà không viết lại |
|   | UI.                                                                 |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Version                             1.0 --- Build Baseline

  Ngày khóa                           20/07/2026

  Số màn                              18

  Mục tiêu                            Bắt đầu code UI ngay; backend dùng
                                      mock repository → Supabase adapter

  Stack tham chiếu                    React + TypeScript + Vite +
                                      Tailwind + shadcn/ui + React
                                      Router + TanStack Query + Zod +
                                      Supabase

  Desktop                             1440px chuẩn; hỗ trợ từ 1024px;
                                      không yêu cầu mobile admin trong
                                      MVP

  Nguồn                               Figma Admin Console node 55:19; PRD
                                      giai đoạn 1; Metric/Status
                                      Dictionary; Information
                                      Architecture giai đoạn 3
  -----------------------------------------------------------------------

# 1. Build Baseline --- quyết định đã khóa

Các mục dưới đây được coi là quyết định build, không còn là câu hỏi mở
trong quá trình dựng UI. Nếu Product đổi quyết định, phải tạo Change
Request và đánh giá ảnh hưởng tới metric, status, permission, API và
test.

  -----------------------------------------------------------------------
  **Hạng mục**                        **Baseline dùng để code**
  ----------------------------------- -----------------------------------
  Payment MVP                         Employer thanh toán trước qua PayOS
                                      trước khi Job bắt đầu.

  COD                                 Không nằm trong MVP; chỉ giữ B2B
                                      Postpaid ở P2/Future.

  Platform fee                        Employer chịu platform fee; Worker
                                      nhận đủ worker_wage niêm yết.

  Payment formula                     employer_total = worker_wage +
                                      platform_fee + priority_fee −
                                      eligible_voucher.

  Revenue                             Ghi nhận quản trị khi Job ACCEPTED
                                      hoặc AUTO_CONFIRMED, không ghi nhận
                                      lúc PayOS thu tiền.

  Auto-confirm                        Mặc định 6 giờ nếu đủ
                                      GPS/checklist/photo và không có
                                      dispute.

  Risk hold                           Tối đa 24 giờ cho Worker/Job bị gắn
                                      cờ; không áp dụng đại trà.

  Payout MVP                          Controlled batch; mục tiêu trong
                                      ngày sau release eligibility.

  Admin Data                          Maker --- Analyze & Reconcile; tạo
                                      case và đề xuất, không duyệt tiền.

  Admin System                        Checker --- Approve & Configure;
                                      duyệt/thực thi monetary action.

  Ledger                              Cấm sửa balance trực tiếp;
                                      correction chỉ qua adjustment
                                      ledger entry.

  Thuật ngữ                           UI dùng Locked Job Funds/Thanh toán
                                      được bảo vệ; chưa dùng escrow như
                                      cam kết pháp lý.
  -----------------------------------------------------------------------

+---+---------------------------------------------------------------------+
|   | Ranh giới role                                                      |
|   |                                                                     |
|   | Admin System phê duyệt và thực thi thay đổi tiền/cấu hình. Nếu      |
|   | chính Admin System tạo proposal, một checker khác phải duyệt; hệ    |
|   | thống không cho self-approval.                                      |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

# 2. Product Context, Goal và Scope

## 2.1 Bối cảnh

JobFree là nền tảng điều phối lao động ngắn hạn. Employer đăng Job và
thanh toán trước; Worker nhận Job, check-in/out, gửi evidence và được
chi tiền sau khi hoàn thành. Admin web phải bảo đảm vòng đời Job vận
hành được, tiền được kiểm soát và mọi can thiệp có audit.

## 2.2 Mục tiêu của Admin System

  -----------------------------------------------------------------------
  **Goal**                            **Kết quả mong muốn**
  ----------------------------------- -----------------------------------
  G1 --- Operational control          Điều hành Job, matching, users,
                                      verification và disputes theo SLA.

  G2 --- Financial checker            Duyệt và thực thi
                                      refund/adjustment/payout/month lock
                                      an toàn.

  G3 --- Configuration governance     Service, pricing, voucher, settings
                                      có version/effective date/impact
                                      preview.

  G4 --- Access security              Admin accounts, roles, MFA, scopes
                                      và sessions được kiểm soát.

  G5 --- Auditability                 Mọi action quan trọng truy vết
                                      được; audit không sửa/xóa.
  -----------------------------------------------------------------------

## 2.3 Non-goals / Out of scope

  -----------------------------------------------------------------------
  **Ngoài phạm vi**                   **Lý do**
  ----------------------------------- -----------------------------------
  Ad-hoc analytics sâu                Thuộc Admin Data; System chỉ xem
                                      summary cần hành động.

  Self-approval                       Cấm theo maker--checker.

  Direct balance/audit edit           Cấm tuyệt đối.

  Raw provider secret management in   Secrets chỉ ở secure server/config
  browser                             platform.

  Customer support omnichannel        Support/CRM riêng; PRD chỉ có
                                      dispute/operational evidence.
  -----------------------------------------------------------------------

## 2.4 Success criteria

-   100% route P0 có permission guard, loading, empty, error, stale và
    forbidden state.

-   Không có UI sửa balance/ledger/audit trực tiếp.

-   Mọi monetary/config action có preview, confirm, reason, MFA marker
    và audit correlation ID.

-   Screen spec, mock schema và Supabase adapter dùng cùng TypeScript
    types.

-   Các KPI P0 dùng đúng Metric Dictionary, có tooltip và updated_at.

-   UAT P0 hoàn tất trước khi bật route cho production role.

# 3. Persona, RBAC và Segregation of Duties

  -----------------------------------------------------------------------
  **Persona**             **Nhu cầu**             **Kiểm soát**
  ----------------------- ----------------------- -----------------------
  System Operator         Jobs, live monitor,     Action theo policy,
                          users, verification,    reason và audit.
                          disputes.               

  Finance Checker         Approve/execute refund, MFA; checker ≠ maker;
                          adjustment, payout,     idempotency.
                          period lock.            

  Configuration Admin     Services, pricing,      Version/effective date;
                          vouchers, app settings. impact preview.

  Security Admin          Admin accounts, roles,  Protected permissions;
                          sessions, audit.        cannot delete audit.
  -----------------------------------------------------------------------

## 3.1 Permission matrix dùng cho FE guards

  ------------------------------------------------------------------------------------
  **Permission key**             **Nghiệp vụ**     **Admin Data**    **Admin System**
  ------------------------------ ----------------- ----------------- -----------------
  finance.dashboard.view         Xem               Allow             Allow
                                 dashboard/dòng                      
                                 tiền                                

  finance.transaction.view       Xem transaction   Allow             Allow
                                 detail                              

  finance.export.create          Tạo export        Allow             Allow

  recon.case.create/assign       Tạo/gán case đối  Allow             Allow
                                 soát                                

  recon.match.exact              Exact match khi   Allow             Allow
                                 rule pass                           

  finance.adjustment.propose     Đề xuất           Allow             Allow
                                 adjustment                          

  finance.adjustment.approve     Duyệt adjustment  Deny              Allow

  refund.propose                 Đề xuất refund    Allow             Allow

  refund.approve                 Duyệt refund      Deny              Allow

  payout.batch.propose           Tạo payout batch  Allow             Allow

  payout.batch.approve/execute   Duyệt/thực thi    Deny              Allow
                                 payout                              

  recon.day.close                Đóng ngày         Allow             Allow

  recon.month.lock/reopen        Khóa/mở tháng     Deny              Allow

  pricing.rule.update            Thay đổi pricing  Deny              Allow

  admin.role.manage              Quản lý role      Deny              Allow

  payment.config.manage          Payment/config    Deny              Allow

  ledger.balance.update          Sửa balance trực  Deny              Deny
                                 tiếp                                

  audit.log.delete               Xóa audit log     Deny              Deny
  ------------------------------------------------------------------------------------

+---+---------------------------------------------------------------------+
|   | Một nguồn quyền                                                     |
|   |                                                                     |
|   | Sidebar visibility, route guard, button state và server             |
|   | authorization phải dùng cùng permission key. Ẩn nút không thay thế  |
|   | kiểm tra quyền phía server.                                         |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

# 4. Information Architecture và Route Map

## 4.1 Sidebar

  --------------------------------------------------------------------------------------------------------
  **Nhóm**       **ID**         **Menu/Màn**   **Route**                                    **Priority**
  -------------- -------------- -------------- -------------------------------------------- --------------
  Dashboard      AS-01          System         /admin-system/dashboard                      **P0**
                                Dashboard                                                   

  Operations     AS-02          Live Monitor   /admin-system/operations/live                **P0**

  Operations     AS-03          Job Management /admin-system/operations/jobs                **P0**

  Operations     AS-05          Manual         /admin-system/operations/manual-assignment   **P0**
                                Assignment                                                  

  Operations     AS-06          Dispute        /admin-system/operations/disputes            **P0**
                                Operations                                                  

  Users          AS-07          User           /admin-system/users                          **P0**
                                Management                                                  

  Users          AS-08          Worker         /admin-system/users/worker-verification      **P0**
                                Verification                                                

  Finance        AS-09          Finance        /admin-system/finance/approvals              **P0**
                                Approvals                                                   

  Finance        AS-10          Payout &       /admin-system/finance/execution              **P0**
                                Refund                                                      
                                Execution                                                   

  Finance        AS-11          Wallets &      /admin-system/finance/transactions           **P0**
                                Transactions                                                

  Catalog &      AS-12          Service        /admin-system/catalog/services               **P0**
  Monetization                  Categories                                                  

  Catalog &      AS-13          Pricing Rules  /admin-system/monetization/pricing           **P0**
  Monetization                                                                              

  Catalog &      AS-14          Voucher        /admin-system/monetization/vouchers          P1
  Monetization                  Management                                                  

  Access &       AS-15          Admin Accounts /admin-system/access/admin-accounts          **P0**
  System                                                                                    

  Access &       AS-16          Roles &        /admin-system/access/roles                   **P0**
  System                        Permissions                                                 

  Access &       AS-17          App Settings   /admin-system/settings                       **P0**
  System                                                                                    

  Access &       AS-18          Audit Logs     /admin-system/audit                          **P0**
  System                                                                                    
  --------------------------------------------------------------------------------------------------------

## 4.2 Quy tắc điều hướng

-   Detail routes không chiếm menu sidebar; mở từ table/deep link và có
    breadcrumb.

-   Sidebar chỉ render item có ít nhất permission view tương ứng.

-   Filter chính được phản ánh vào URL query để refresh/share không mất
    trạng thái.

-   Mỗi route có page title, breadcrumb, updated_at/source state và
    primary action.

-   Unsaved draft phải có navigation blocker.

-   404, 403 và object-not-found là ba state riêng.

# 5. UI Foundation và Shared Component Contract

Foundation này là contract dùng chung cho toàn bộ Admin Web và phải được
triển khai trước các feature screen.

+---+---------------------------------------------------------------------+
|   | Một design system, hai role                                         |
|   |                                                                     |
|   | Admin Data và Admin System dùng chung App Shell, token, DataTable,  |
|   | FilterBar, StatusBadge, MoneyCell, AsyncState và AuditTimeline.     |
|   | Khác biệt nằm ở route, permission và action contract --- không fork |
|   | component theo role.                                                |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

## 5.1 App shell

  -----------------------------------------------------------------------
  **Thành phần**                      **Quy cách**
  ----------------------------------- -----------------------------------
  Viewport                            Desktop 1440 chuẩn; min 1024;
                                      content dùng CSS grid 280px 1fr,
                                      sidebar collapse ở \<1280.

  Sidebar                             280px expanded / 76px collapsed;
                                      group accordion; active route;
                                      numeric alert badge.

  Top bar                             72px; global search theo
                                      permission; notifications; role
                                      badge; environment badge; profile.

  Content                             Padding 24px; max width 1600; table
                                      có horizontal scroll; sticky
                                      filter/header khi cần.

  Typography                          Inter; H1 24/32 semibold; H2 18/28;
                                      body 14/20; table 13/18; money
                                      tabular numbers.

  Brand                               Primary #FFC400; black #111111;
                                      background #F6F7F9; border #E4E7EC.

  Semantic                            Info #2563EB; success #159455;
                                      warning #D97706; error #D92D20;
                                      không dùng màu là tín hiệu duy
                                      nhất.

  Radius/spacing                      4/8/12/16/24 scale; card radius 12;
                                      control 8; focus ring 2px.
  -----------------------------------------------------------------------

## 5.2 Shared components

  -----------------------------------------------------------------------
  **Component**                       **Contract tối thiểu**
  ----------------------------------- -----------------------------------
  AppShell                            sidebar items theo permission;
                                      header; breadcrumbs; outlet; global
                                      error boundary

  PageHeader                          title, description, updatedAt,
                                      sourceState, primaryAction,
                                      secondaryActions

  KpiCard                             metricId, label, value, unit,
                                      delta, comparison, status, tooltip,
                                      updatedAt, onDrillDown

  FilterBar                           schema-driven filters; URL sync;
                                      saved view; reset; active count

  DataTable                           server pagination/sort/filter;
                                      column pinning; selection;
                                      empty/error; row actions

  StatusBadge                         domain + status; label; semantic
                                      icon/color; tooltip

  MoneyCell                           amount, currency=VND, sign,
                                      masked/compact; không parse float ở
                                      client

  ApprovalDrawer                      proposal, checks, evidence, maker,
                                      checker guard, MFA marker, decision
                                      form

  AuditTimeline                       occurredAt, actor, action, object,
                                      result, before/after diff,
                                      correlationId

  EvidenceUploader                    allowed types/size, progress,
                                      checksum/metadata, immutable
                                      submitted items

  AsyncState                          loading, empty, error, partial,
                                      stale, forbidden, not-found

  ConfirmActionDialog                 impact preview, reason, typed
                                      confirmation/MFA when required,
                                      correlationId
  -----------------------------------------------------------------------

## 5.3 Accessibility và UX rules

-   WCAG AA cho text/control; keyboard đầy đủ; focus visible; dialog
    trap focus.

-   Chart có table hoặc downloadable accessible view.

-   Không dùng icon/màu một mình để diễn đạt status.

-   Toast không phải nơi duy nhất chứa lỗi; form error đặt tại
    field/summary.

-   Mọi destructive/monetary/config action có impact preview và reason.

-   Timezone hiển thị Asia/Ho_Chi_Minh; persisted timestamp dùng UTC
    ISO-8601.

# 6. Screen Specifications

## AS-01 --- System Dashboard

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/dashboard

  Priority                            **P0**

  User goal                           Tổng quan vận hành, an toàn hệ
                                      thống và các approval đang chờ
                                      Admin System.

  KPI/count                           Active Jobs; Jobs at Risk; Pending
                                      Verification; Open Disputes;
                                      Finance Approvals; Failed
                                      Payout/Refund; Provider Health;
                                      Critical Audit Alerts

  Filters                             today/7 days; region; service;
                                      severity; environment

  Layout blocks                       Operational health; approval inbox;
                                      live job alerts; finance execution
                                      alerts; provider/system health;
                                      audit/security alerts

  Table/detail fields                 alert; domain; object; severity;
                                      owner; created_at; SLA; required
                                      action
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        Open detail; acknowledge system
                                      alert; assign; deep-link
                                      approval/operation.

  API/RPC mock                        GET /admin-system/dashboard; GET
                                      /admin-system/alerts

  UI states                           healthy; warning; critical;
                                      degraded; maintenance; partial-data

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Approval count chỉ gồm item actor có quyền duyệt.

-   AC2: Critical alerts không bị che bởi analytics cards.

-   AC3: Mọi alert có owner/SLA/deep link.

-   AC4: Dashboard không cho sửa monetary amount trực tiếp.

## AS-02 --- Live Monitor

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/operations/live

  Priority                            **P0**

  User goal                           Theo dõi Job đang diễn ra và phát
                                      hiện no-show, check-in bất thường,
                                      quá giờ hoặc mất kết nối.

  KPI/count                           Active Jobs; Awaiting Check-in;
                                      Late; At Risk; Completion Pending;
                                      Disputed

  Filters                             status; service; region; start
                                      window; risk; employer; worker

  Layout blocks                       Map + list; active job table; risk
                                      rail; job quick view;
                                      communication/escalation timeline

  Table/detail fields                 job_id; service; employer; worker;
                                      scheduled_time; check-in; status;
                                      location signal; risk; SLA
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        Open job; assign operator; flag
                                      risk; initiate support flow; no
                                      direct payment action.

  API/RPC mock                        GET /admin-system/operations/live;
                                      POST /admin-system/jobs/:id/flags

  UI states                           SCHEDULED; CHECK_IN_PENDING;
                                      IN_PROGRESS; LATE; AT_RISK;
                                      COMPLETION_PENDING; DISPUTED

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Location chỉ hiển thị khi có legal purpose và active job.

-   AC2: Map có list alternative.

-   AC3: Auto-refresh không làm mất filter/selection.

-   AC4: Risk action ghi audit.

## AS-03 --- Job Management

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/operations/jobs

  Priority                            **P0**

  User goal                           Tìm, xem và quản lý vòng đời Job
                                      theo policy; không chỉnh dữ liệu
                                      lịch sử tùy ý.

  KPI/count                           Created; Paid; Matching; Assigned;
                                      In Progress; Completion Pending;
                                      Completed; Cancelled; Disputed

  Filters                             job status; date; service; region;
                                      priority; employer; worker;
                                      payment; risk

  Layout blocks                       Status summary; search/filter; jobs
                                      table; bulk read actions; job
                                      detail drawer

  Table/detail fields                 job_id; employer; service;
                                      schedule; wage; priority; worker;
                                      payment; job_status; risk;
                                      updated_at
  -----------------------------------------------------------------------

### Hành động và data contract

  -------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -------------------------------------
  Admin System                        View; cancel theo policy;
                                      place/release operational hold;
                                      reassign link; open dispute; add
                                      note.

  API/RPC mock                        GET /admin-system/jobs; GET/PATCH
                                      /admin-system/jobs/:id; POST
                                      /admin-system/jobs/:id/cancel\|hold

  UI states                           DRAFT; PAYMENT_PENDING; OPEN;
                                      MATCHING; ASSIGNED; IN_PROGRESS;
                                      COMPLETION_SUBMITTED; ACCEPTED;
                                      CANCELLED; DISPUTED

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic locking.
  -------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Mọi transition kiểm tra allowed transition từ server.

-   AC2: Cancel yêu cầu reason và impact preview.

-   AC3: Job completed không được sửa wage/parties.

-   AC4: Payment status hiển thị riêng job status.

## AS-04 --- Job Detail

  -----------------------------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------------------------------
  Route                               /admin-system/operations/jobs/:jobId

  Priority                            **P0**

  User goal                           Trang điều hành đầy đủ cho một Job: parties, lịch,
                                      matching, evidence, payment và audit.

  KPI/count                           Worker Wage; Employer Total; Locked Funds; Job SLA;
                                      Matching Attempts; Risk Flags

  Filters                             Tabs
                                      Overview/Timeline/Matching/Evidence/Finance/Dispute/Audit

  Layout blocks                       Identity/status header; party cards; schedule/location;
                                      checklist/evidence; timeline; finance summary; action rail

  Table/detail fields                 timestamp; domain; action/event; actor; before; after;
                                      reason; reference
  -----------------------------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        Hold/cancel/reassign/open dispute;
                                      finance actions chỉ deep-link
                                      approval, không sửa balance.

  API/RPC mock                        GET /admin-system/jobs/:id; POST
                                      /admin-system/jobs/:id/actions

  UI states                           All job lifecycle +
                                      hold/dispute/cancel branches

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Reason và impact preview trước destructive transition.

-   AC2: Evidence có provenance/timestamp.

-   AC3: Finance summary read-only ngoài approval flow.

-   AC4: Timeline bao gồm system và admin actions.

## AS-05 --- Manual Assignment

  --------------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- --------------------------------------------
  Route                               /admin-system/operations/manual-assignment

  Priority                            **P0**

  User goal                           Gán/reassign Worker khi matching tự động
                                      thất bại hoặc cần can thiệp có kiểm soát.

  KPI/count                           Unassigned Jobs; Matching SLA Breached;
                                      Eligible Workers; Assignment Success;
                                      Reassignment Rate

  Filters                             job; service; region; radius; schedule;
                                      skills; worker availability; rating; risk

  Layout blocks                       Unassigned queue; job requirements;
                                      candidate ranking; conflict checker;
                                      assignment confirmation

  Table/detail fields                 worker; distance; skills match;
                                      availability; rating/sample; completed jobs;
                                      no-show; conflict; risk
  --------------------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------
  Admin System                        Assign/reassign; exclude candidate
                                      with reason; notify; return to
                                      auto-match.

  API/RPC mock                        GET /admin-system/assignments/queue;
                                      GET
                                      /admin-system/jobs/:id/candidates;
                                      POST /admin-system/jobs/:id/assign

  UI states                           UNASSIGNED; SEARCHING;
                                      CANDIDATES_READY; ASSIGNING;
                                      ASSIGNED; FAILED; CONFLICT

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  ------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Block overlapping active shift.

-   AC2: Assignment confirmation hiển thị lý do xếp hạng và schedule.

-   AC3: Không tự thay Worker đang IN_PROGRESS.

-   AC4: Reassign luôn ghi actor/reason và thông báo parties.

## AS-06 --- Dispute Operations

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/operations/disputes

  Priority                            **P0**

  User goal                           Xử lý tranh chấp vận hành, thu thập
                                      evidence và tạo monetary proposal
                                      nếu cần.

  KPI/count                           Open; Critical; Over-SLA; Affected
                                      Amount; Avg Resolution; Reopened

  Filters                             status; severity; reason; service;
                                      party; owner; SLA; financial impact

  Layout blocks                       Dispute queue; case detail; party
                                      statements; evidence; job timeline;
                                      resolution builder; finance
                                      proposal link

  Table/detail fields                 dispute_id; job_id; reason;
                                      opened_by; amount; severity; owner;
                                      age; SLA; status; outcome
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------------------------------
  Admin System                        Assign; request evidence; pause with reason; resolve
                                      operational outcome; create refund/adjustment proposal.

  API/RPC mock                        GET/PATCH /admin-system/disputes; POST
                                      /admin-system/disputes/:id/evidence\|resolution\|proposal

  UI states                           OPEN; INVESTIGATING; WAITING_PARTY; PROPOSED; RESOLVED;
                                      CLOSED; REOPENED

  Audit                               Mọi mutation gửi reason, correlation_id và expected_version
                                      nếu object hỗ trợ optimistic locking.
  -----------------------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Operational resolution không tự động đồng nghĩa refund success.

-   AC2: Monetary proposal đi qua Finance Approvals.

-   AC3: Party evidence immutable sau submit.

-   AC4: Reopen cần reason và audit.

## AS-07 --- User Management

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/users

  Priority                            **P0**

  User goal                           Quản lý Employer/Worker accounts,
                                      trạng thái, verification, risk và
                                      access theo policy.

  KPI/count                           Total; Active; Pending
                                      Verification; Suspended; Banned;
                                      Risk Flagged; New 7d

  Filters                             role; account status; verification;
                                      region; risk; signup date; last
                                      active

  Layout blocks                       User search; status cards; user
                                      table; profile drawer;
                                      risk/history; linked
                                      jobs/transactions

  Table/detail fields                 user_id; role; name masked;
                                      verification; account_status; risk;
                                      jobs; last_active; created_at
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        View; suspend/unsuspend; ban
                                      proposal; reset session; add risk
                                      flag; request re-verification.

  API/RPC mock                        GET /admin-system/users; GET/PATCH
                                      /admin-system/users/:id; POST
                                      /admin-system/users/:id/actions

  UI states                           PENDING; ACTIVE; SUSPENDED; BANNED;
                                      DEACTIVATED + verification/risk
                                      states

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Ban/suspend cần reason, duration và impact.

-   AC2: Không xóa account có transaction history.

-   AC3: Sensitive fields masked theo permission.

-   AC4: Self-target và protected admin accounts có guard.

## AS-08 --- Worker Verification

  -----------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------------
  Route                               /admin-system/users/worker-verification

  Priority                            **P0**

  User goal                           Duyệt hồ sơ Worker, giấy tờ và
                                      face/liveness signals trước khi cho nhận
                                      Job.

  KPI/count                           Pending; In Review; Approved; Rejected;
                                      Expiring; Over-SLA; Resubmitted

  Filters                             status; submitted date; document type;
                                      region; risk; reviewer; SLA

  Layout blocks                       Verification queue; document viewer;
                                      extracted fields; face comparison;
                                      checklist; decision panel; audit

  Table/detail fields                 request_id; worker; submitted_at;
                                      document; validation; face signal; risk;
                                      reviewer; SLA; status
  -----------------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------------
  Admin System                        Claim review; approve; reject; request
                                      resubmission; escalate fraud.

  API/RPC mock                        GET /admin-system/verifications; GET
                                      /admin-system/verifications/:id; POST
                                      /admin-system/verifications/:id/decision

  UI states                           SUBMITTED; IN_REVIEW; NEEDS_RESUBMISSION;
                                      APPROVED; REJECTED; EXPIRED; ESCALATED

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ
                                      optimistic locking.
  ------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Decision reason bắt buộc.

-   AC2: Document URLs signed/short-lived.

-   AC3: Không tải raw ID vào export.

-   AC4: Reviewer action có MFA nếu policy yêu cầu.

## AS-09 --- Finance Approvals

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/finance/approvals

  Priority                            **P0**

  User goal                           Checker inbox cho refund,
                                      adjustment, payout batch và month
                                      lock do maker đề xuất.

  KPI/count                           Pending; Over-SLA; High Value;
                                      Refund; Adjustment; Payout Batch;
                                      Month Lock

  Filters                             type; amount; risk; maker;
                                      submitted date; SLA; status;
                                      related case

  Layout blocks                       Approval queue; proposal
                                      comparison; eligibility checks;
                                      evidence; maker/actor guard;
                                      approve/reject dialog

  Table/detail fields                 proposal_id; type; object; amount;
                                      maker; risk; checks; submitted_at;
                                      SLA; status
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------------------------------------------
  Admin System                        Approve/reject; request more evidence; view audit; never edit proposed
                                      amount during approval.

  API/RPC mock                        GET /admin-system/finance/approvals; POST
                                      /admin-system/finance/approvals/:id/approve\|reject\|request-evidence

  UI states                           PENDING_REVIEW; NEEDS_EVIDENCE; APPROVED; REJECTED; EXPIRED; STALE

  Audit                               Mọi mutation gửi reason, correlation_id và expected_version nếu object
                                      hỗ trợ optimistic locking.
  -----------------------------------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Checker khác maker.

-   AC2: MFA trước approve monetary/high-risk action.

-   AC3: Data stale khóa approve.

-   AC4: Approve tạo immutable approval record, không thực thi âm thầm
    nếu action cần execution.

## AS-10 --- Payout & Refund Execution

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/finance/execution

  Priority                            **P0**

  User goal                           Thực thi proposal đã duyệt qua
                                      provider/RPC và theo dõi attempts
                                      tới kết quả cuối.

  KPI/count                           Approved Ready; Processing;
                                      Succeeded; Failed; Retry Eligible;
                                      Total Executed

  Filters                             type; status; provider; batch;
                                      amount; approved date; failure code

  Layout blocks                       Ready queue; execution
                                      confirmation; batch progress;
                                      provider attempts; retry guard;
                                      result detail

  Table/detail fields                 execution_id; proposal; type;
                                      amount; provider; approved_by;
                                      status; attempt; provider_ref;
                                      failure; updated_at
  -----------------------------------------------------------------------

### Hành động và data contract

  -------------------------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -------------------------------------------------------------
  Admin System                        Execute approved; retry eligible; cancel before submit;
                                      download result; escalate provider incident.

  API/RPC mock                        GET /admin-system/finance/executions; POST
                                      /admin-system/finance/executions/:id/execute\|retry\|cancel

  UI states                           READY; SUBMITTING; PROCESSING; SUCCEEDED; FAILED;
                                      RETRY_BLOCKED; CANCELLED; UNKNOWN

  Audit                               Mọi mutation gửi reason, correlation_id và expected_version
                                      nếu object hỗ trợ optimistic locking.
  -------------------------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Idempotency key cho mọi execute/retry.

-   AC2: Double click không gửi trùng.

-   AC3: UNKNOWN không được tự động retry.

-   AC4: Success phải có provider_ref hoặc confirmed internal result
    theo policy.

## AS-11 --- Wallets & Transactions

  ------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- ------------------------------------
  Route                               /admin-system/finance/transactions

  Priority                            **P0**

  User goal                           Tra cứu số dư ledger và transaction
                                      phục vụ điều tra; không cho sửa
                                      balance trực tiếp.

  KPI/count                           Cash; Locked Funds; Worker Payable;
                                      Platform Revenue; Refund Liability;
                                      Ledger Imbalance

  Filters                             account; object; transaction type;
                                      date; amount; source event;
                                      reference

  Layout blocks                       Account balance cards; ledger
                                      search; journal detail; linked
                                      source; reconciliation/audit

  Table/detail fields                 entry_id; occurred_at; account;
                                      debit; credit; amount; currency;
                                      object; source_event; reference
  ------------------------------------------------------------------------

### Hành động và data contract

  --------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- --------------------------------------------
  Admin System                        View/export limited; open adjustment
                                      proposal; no direct edit/delete.

  API/RPC mock                        GET /admin-system/finance/accounts; GET
                                      /admin-system/finance/ledger; POST
                                      /admin-system/finance/adjustment-proposals

  UI states                           POSTED; REVERSED_BY_ENTRY; PENDING_SOURCE;
                                      IMBALANCED_ALERT

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ
                                      optimistic locking.
  --------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Debit=credit check visible.

-   AC2: Không có button Edit Balance/Delete Entry.

-   AC3: Correction tạo entry mới có link original.

-   AC4: Closed-period entries có lock badge.

## AS-12 --- Service Categories

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/catalog/services

  Priority                            **P0**

  User goal                           Quản lý taxonomy service và yêu
                                      cầu/checklist/evidence dùng trong
                                      Job creation/matching.

  KPI/count                           Active Categories; Active Services;
                                      Draft; Inactive; Jobs Using Service

  Filters                             category; status; created/updated;
                                      owner; usage

  Layout blocks                       Category tree; service table;
                                      create/edit drawer;
                                      requirements/checklist;
                                      version/effective date

  Table/detail fields                 service_id; category; name; status;
                                      requirements; active_jobs; version;
                                      effective_at; updated_by
  -----------------------------------------------------------------------

### Hành động và data contract

  -------------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -------------------------------------------------
  Admin System                        Create draft; edit future version;
                                      activate/deactivate; reorder; preview
                                      Employer/Worker UI.

  API/RPC mock                        GET/POST/PATCH /admin-system/services; POST
                                      /admin-system/services/:id/activate\|deactivate

  UI states                           DRAFT; SCHEDULED; ACTIVE; INACTIVE; ARCHIVED

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ optimistic
                                      locking.
  -------------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không hard-delete service đã có Job.

-   AC2: Rename không đổi stable service_id.

-   AC3: Deactivate cảnh báo active/future Jobs.

-   AC4: Changes có effective_at và audit.

## AS-13 --- Pricing Rules

  ------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- ------------------------------------
  Route                               /admin-system/monetization/pricing

  Priority                            **P0**

  User goal                           Quản lý platform fee, priority fee
                                      và rule theo service/region với
                                      version/effective date.

  KPI/count                           Active Rules; Scheduled; Conflicts;
                                      Services Covered; Last Change

  Filters                             rule type; service; region; status;
                                      effective date; version

  Layout blocks                       Pricing matrix; rule builder;
                                      formula preview; conflict detection;
                                      impact preview; version history

  Table/detail fields                 rule_id; type; scope; value/formula;
                                      min/max; version; effective_from;
                                      status; updated_by
  ------------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------------
  Admin System                        Create draft; simulate; submit/activate;
                                      schedule; deactivate; rollback bằng
                                      version mới.

  API/RPC mock                        GET/POST/PATCH
                                      /admin-system/pricing-rules; POST
                                      /admin-system/pricing-rules/:id/activate

  UI states                           DRAFT; VALIDATING; SCHEDULED; ACTIVE;
                                      INACTIVE; CONFLICT; SUPERSEDED

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ
                                      optimistic locking.
  ------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không retroactive edit.

-   AC2: Formula preview dùng sample order.

-   AC3: Conflict block activation.

-   AC4: MFA/dual control cho thay đổi ảnh hưởng giá theo policy.

## AS-14 --- Voucher Management

  -------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -------------------------------------
  Route                               /admin-system/monetization/vouchers

  Priority                            P1

  User goal                           Tạo và quản lý voucher, funding
                                      source, eligibility, budget và usage
                                      guardrails.

  KPI/count                           Active; Scheduled; Budget Used;
                                      Redemptions; Discount; Remaining
                                      Budget; Fraud Flags

  Filters                             status; funding source; audience;
                                      service; region; period; creator

  Layout blocks                       Voucher list; builder; eligibility
                                      rules; budget; preview; redemption
                                      analytics link; audit

  Table/detail fields                 code; name; type/value;
                                      funding_source; budget; used;
                                      start/end; audience; status
  -------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------------------
  Admin System                        Create draft; schedule; pause; resume; end;
                                      duplicate; no delete after redemption.

  API/RPC mock                        GET/POST/PATCH /admin-system/vouchers; POST
                                      /admin-system/vouchers/:id/pause\|resume\|end

  UI states                           DRAFT; SCHEDULED; ACTIVE; PAUSED; EXHAUSTED;
                                      ENDED; EXPIRED

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Funding source bắt buộc.

-   AC2: Budget/eligibility validate trước activate.

-   AC3: Used voucher immutable.

-   AC4: Pause/end hiển thị impact và audit.

## AS-15 --- Admin Accounts

  -------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -------------------------------------
  Route                               /admin-system/access/admin-accounts

  Priority                            **P0**

  User goal                           Quản lý tài khoản nội bộ, trạng thái,
                                      role assignments, MFA và session
                                      security.

  KPI/count                           Active Admins; MFA Enrolled;
                                      Suspended; Invitations; Risky
                                      Sessions

  Filters                             role; status; MFA; last active;
                                      created date; scope

  Layout blocks                       Admin table; invite drawer; role
                                      assignment; MFA/session panel; access
                                      history

  Table/detail fields                 admin_id; name; email; roles; scope;
                                      status; MFA; last_active; invited_by;
                                      created_at
  -------------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------------
  Admin System                        Invite; resend/revoke invite; suspend;
                                      reset sessions; assign role; require MFA.

  API/RPC mock                        GET/POST/PATCH
                                      /admin-system/admin-accounts; POST
                                      /admin-system/admin-accounts/:id/actions

  UI states                           INVITED; ACTIVE; SUSPENDED; LOCKED;
                                      REVOKED; INVITE_EXPIRED

  Audit                               Mọi mutation gửi reason, correlation_id và
                                      expected_version nếu object hỗ trợ
                                      optimistic locking.
  ------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không tự hạ quyền/xóa last protected admin.

-   AC2: Role change cần reason/audit.

-   AC3: MFA bắt buộc cho Admin System.

-   AC4: Invite token không hiển thị lại sau tạo.

## AS-16 --- Roles & Permissions

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/access/roles

  Priority                            **P0**

  User goal                           Quản lý RBAC theo permission key,
                                      scope và maker--checker
                                      constraints.

  KPI/count                           Roles; Permission Keys; Custom
                                      Roles; High-Risk Permissions;
                                      Pending Changes

  Filters                             role; module; risk; allow/deny;
                                      custom/system

  Layout blocks                       Role list; permission matrix; scope
                                      editor; change preview; protected
                                      permissions; audit

  Table/detail fields                 permission_key; module;
                                      description; role grants; risk;
                                      MFA; audit; constraint
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        Create custom role; clone; edit
                                      grants; assign scope; activate
                                      version; no audit disable.

  API/RPC mock                        GET/POST/PATCH /admin-system/roles;
                                      GET /admin-system/permissions; POST
                                      /admin-system/roles/:id/activate

  UI states                           DRAFT; ACTIVE; INACTIVE;
                                      SYSTEM_PROTECTED; CONFLICT

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: ledger.balance.update và audit.log.delete luôn Deny.

-   AC2: Permission change có impact preview.

-   AC3: Actor không thể grant permission mình không có.

-   AC4: Route và button guard dùng cùng permission keys.

## AS-17 --- App Settings

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/settings

  Priority                            **P0**

  User goal                           Quản lý feature flags, SLA,
                                      matching, evidence, payment
                                      integration metadata và maintenance
                                      settings.

  KPI/count                           Active Config Version; Scheduled
                                      Changes; Validation Errors;
                                      Provider Connectivity; Feature
                                      Flags

  Filters                             domain; environment; status;
                                      effective date; owner

  Layout blocks                       Config domains; typed editor;
                                      validation; secret placeholder;
                                      diff preview; schedule/rollback;
                                      provider test

  Table/detail fields                 config_key; domain; current_value
                                      masked; version; effective_at;
                                      status; updated_by
  -----------------------------------------------------------------------

### Hành động và data contract

  ----------------------------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ----------------------------------------------------------------
  Admin System                        Edit draft; validate; schedule/activate; rollback bằng version
                                      mới; test provider connection without revealing secret.

  API/RPC mock                        GET/POST /admin-system/config-versions; POST
                                      /admin-system/config-versions/:id/validate\|activate\|rollback

  UI states                           DRAFT; VALID; INVALID; SCHEDULED; ACTIVE; SUPERSEDED;
                                      ROLLED_BACK

  Audit                               Mọi mutation gửi reason, correlation_id và expected_version nếu
                                      object hỗ trợ optimistic locking.
  ----------------------------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Secrets không trả về client.

-   AC2: Production config change cần MFA/audit.

-   AC3: Unknown config key không render generic unsafe editor.

-   AC4: Rollback tạo version mới.

## AS-18 --- Audit Logs

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-system/audit

  Priority                            **P0**

  User goal                           Tra cứu immutable audit trail cho
                                      admin, security, finance approval
                                      và configuration changes.

  KPI/count                           Admin Actions; Failed Actions;
                                      High-Risk Actions; Authentication
                                      Alerts; Export Events

  Filters                             actor; role; action; object;
                                      result; risk; IP/session; date;
                                      correlation id

  Layout blocks                       Audit search; event table;
                                      before/after diff; auth context;
                                      linked object; export with guard

  Table/detail fields                 timestamp; actor; role; action;
                                      object; result; risk; IP masked;
                                      session; correlation_id
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin System                        View; filter; export limited; flag
                                      security incident; no edit/delete.

  API/RPC mock                        GET /admin-system/audit; GET
                                      /admin-system/audit/:eventId; POST
                                      /admin-system/security-incidents

  UI states                           SUCCESS; FAILED; DENIED; HIGH_RISK;
                                      REDACTED

  Audit                               Mọi mutation gửi reason,
                                      correlation_id và expected_version
                                      nếu object hỗ trợ optimistic
                                      locking.
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không có delete action.

-   AC2: Before/after redact secret/PII.

-   AC3: Time hiển thị timezone rõ.

-   AC4: Export audit cũng tạo audit event.

# 7. Domain Status, Money và Event Contract

## 7.1 Status domains

  -----------------------------------------------------------------------
  **Domain**                          **Allowed high-level flow**
  ----------------------------------- -----------------------------------
  Payment                             CREATED → PENDING → PAID_CONFIRMED
                                      \| EXPIRED \| FAILED

  Job Funds                           NOT_FUNDED → FUNDS_LOCKED →
                                      RELEASE_ELIGIBLE → RELEASED \|
                                      REFUND_PENDING

  Payout                              DRAFT → PROPOSED → APPROVED →
                                      SUBMITTED → PAID_OUT \| FAILED \|
                                      UNKNOWN

  Refund                              DRAFT → PROPOSED → APPROVED →
                                      PROCESSING → REFUNDED \| FAILED

  Reconciliation                      UNMATCHED → MATCHED \| EXCEPTION →
                                      RESOLVED → CLOSED

  Period                              OPEN → CHECKING → READY_TO_CLOSE →
                                      DAILY_CLOSED → MONTH_LOCKED \|
                                      REOPENED

  Verification                        SUBMITTED → IN_REVIEW → APPROVED \|
                                      REJECTED \| NEEDS_RESUBMISSION

  Admin Account                       INVITED → ACTIVE → SUSPENDED \|
                                      LOCKED \| REVOKED
  -----------------------------------------------------------------------

+---+---------------------------------------------------------------------+
|   | Không trộn status                                                   |
|   |                                                                     |
|   | Payment PAID_CONFIRMED không đồng nghĩa Job COMPLETED và cũng không |
|   | đồng nghĩa Payout PAID_OUT. UI phải dùng domain + status làm key.   |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

## 7.2 Money contract

  -----------------------------------------------------------------------
  **Field**                           **Type/Rule**
  ----------------------------------- -----------------------------------
  amount                              integer VND; không dùng floating
                                      point; display bằng
                                      Intl.NumberFormat(\'vi-VN\').

  worker_wage                         Tiền công Worker nhận đủ khi payout
                                      thành công.

  platform_fee                        Phí JobFree thu từ Employer;
                                      recognized khi Job
                                      accepted/auto-confirmed.

  priority_fee                        Phí Tức thì/Nhanh; tách khỏi
                                      platform fee.

  voucher_discount                    Tách funding_source: JOBFREE /
                                      EMPLOYER / PROVIDER.

  employer_total                      worker_wage + platform_fee +
                                      priority_fee − eligible_voucher.

  variance                            expected − actual theo rule;
                                      Unreconciled Amount dùng
                                      SUM(ABS(variance)).

  currency                            MVP chỉ VND nhưng contract vẫn có
                                      currency=\'VND\'.
  -----------------------------------------------------------------------

## 7.3 Admin product events

  -----------------------------------------------------------------------
  **Event**                           **Minimum payload**
  ----------------------------------- -----------------------------------
  ADMIN_SCREEN_VIEWED                 screen_id, route, role,
                                      correlation_id

  ADMIN_FILTER_APPLIED                screen_id, filter_keys,
                                      result_count

  ADMIN_EXPORT_REQUESTED              report_type, filter_hash,
                                      row_estimate

  RECON_CASE_CREATED                  case_id, rule_id, object_ids,
                                      variance

  RECON_MATCHED                       match_id, rule_id, object_ids,
                                      actor

  FINANCE_PROPOSAL_SUBMITTED          proposal_id, type, amount, maker

  FINANCE_PROPOSAL_DECIDED            proposal_id, checker, result,
                                      reason

  PAYOUT_EXECUTION_ATTEMPTED          execution_id, attempt_no,
                                      idempotency_key

  CONFIG_VERSION_ACTIVATED            domain, version, actor,
                                      effective_at

  ADMIN_PERMISSION_DENIED             actor, permission_key, object,
                                      route
  -----------------------------------------------------------------------

# 8. Frontend Architecture --- UI-first, Supabase-ready

Dùng một web app nội bộ với route namespace theo role. Component, auth,
permissions, audit UI và domain types được chia sẻ; feature modules tách
biệt để ba developer làm song song.

  -----------------------------------------------------------------------
  src/\
  app/ \# router, providers, error boundaries\
  layouts/ \# AdminShell, role-aware sidebar/header\
  features/\
  admin-data/ \# screens, queries, components, schemas\
  admin-system/ \# screens, mutations, approvals, settings\
  finance/ \# shared money/status/detail components\
  auth/ \# session, route guards, MFA state\
  components/ui/ \# shadcn primitives + JobFree wrappers\
  lib/ \# supabase client, query client, formatters\
  permissions/ \# permission keys + Can/RouteGuard\
  repositories/ \# interfaces + mock + supabase adapters\
  types/ \# generated DB types + domain DTOs\
  mocks/ \# deterministic fixtures + error/empty states\
  test/ \# unit, component, e2e helpers
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## 8.1 Required technical choices

  -----------------------------------------------------------------------
  **Concern**                         **Decision**
  ----------------------------------- -----------------------------------
  Routing                             React Router; lazy feature routes;
                                      URL query cho filters; role +
                                      permission route guards.

  Server state                        TanStack Query; query keys theo
                                      feature/filter; abort signal;
                                      explicit staleTime; no manual
                                      global cache.

  UI state                            Local state; Zustand chỉ cho
                                      shell/global ephemeral state, không
                                      lưu server records.

  Forms                               React Hook Form + Zod; server error
                                      mapping; dirty guard.

  Tables                              TanStack Table hoặc wrapper tương
                                      đương; server
                                      pagination/sort/filter.

  Charts                              Recharts/ECharts wrapper; tooltip,
                                      empty state, accessible table.

  Money/time                          Integer VND; UTC storage;
                                      Asia/Ho_Chi_Minh display; no
                                      implicit timezone.

  API adapter                         Repository interface; mock adapter
                                      trước; Supabase/Edge Function
                                      adapter sau.

  Testing                             Vitest + Testing Library;
                                      Playwright E2E; MSW/mock
                                      repository.
  -----------------------------------------------------------------------

## 8.2 Repository contract

  -----------------------------------------------------------------------
  type ResultPage\<T\> = { items: T\[\]; page: number; pageSize: number;
  total: number };\
  \
  interface AdminRepository {\
  getList\<TFilter, TRow\>(screenId: string, filter: TFilter):
  Promise\<ResultPage\<TRow\>\>;\
  getDetail\<T\>(objectType: string, id: string): Promise\<T\>;\
  runAction\<TInput, TOutput\>(action: string, input: TInput):
  Promise\<TOutput\>;\
  }\
  \
  // UI imports interface only. Choose MockAdminRepository or
  SupabaseAdminRepository at composition root.
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

## 8.3 Error contract

  -----------------------------------------------------------------------
  **Code**                            **UI behavior**
  ----------------------------------- -----------------------------------
  UNAUTHENTICATED                     Redirect login; preserve safe
                                      return URL.

  FORBIDDEN                           403 state; show required permission
                                      key; no retry.

  NOT_FOUND                           Object not found; offer
                                      back/search.

  VALIDATION_ERROR                    Map fieldErrors + form summary.

  CONFLICT                            Show newer version; reload/compare;
                                      do not overwrite.

  STALE_DATA                          Block risky action; refresh
                                      required.

  PROVIDER_UNAVAILABLE                Degraded banner; retry per policy;
                                      no duplicate submit.

  UNKNOWN_RESULT                      Do not retry automatically for
                                      monetary action; require
                                      reconciliation.
  -----------------------------------------------------------------------

# 9. Supabase, Security và Audit Requirements

## 9.1 Data access pattern

  -----------------------------------------------------------------------
  **Layer**                           **Requirement**
  ----------------------------------- -----------------------------------
  Supabase Auth                       Admin invitation only; session +
                                      MFA/aal2 cho Admin System/high-risk
                                      action.

  profiles/admin_accounts             User identity, status, scopes;
                                      không lưu permission chỉ ở JWT lâu
                                      dài.

  roles/permissions                   Normalized grants; permission
                                      version; server check.

  Read models/views                   UI đọc từ admin\_\* views/RPC đã
                                      mask PII và tối ưu query.

  Mutations                           Monetary/config/security mutation
                                      qua Edge Function hoặc SECURITY
                                      DEFINER RPC có kiểm soát; không
                                      direct table update từ browser.

  Storage                             Evidence/doc signed URL; bucket
                                      policy theo case/verification; no
                                      public bucket.

  RLS                                 Default deny; scope theo
                                      role/region/domain; service role
                                      chỉ ở server functions.

  Audit                               Append-only audit_logs; actor,
                                      role, action, object, before/after
                                      redacted, reason, IP/session,
                                      correlation_id.
  -----------------------------------------------------------------------

## 9.2 Minimum tables/views

  -----------------------------------------------------------------------
  **Object**                          **Purpose**
  ----------------------------------- -----------------------------------
  admin_accounts, roles, permissions, RBAC/session/scope
  role_permissions                    

  jobs, job_financials                Job lifecycle và terms version

  payment_orders,                     Expected và provider payment
  provider_transactions               

  ledger_entries                      Immutable financial journal

  payout_requests, payout_attempts,   Disbursement/refund lifecycle
  refunds                             

  reconciliation_cases,               Maker workflow
  case_evidence, finance_proposals    

  approval_records,                   Checker/execution workflow
  execution_attempts                  

  service_versions,                   Catalog/monetization config
  pricing_rule_versions, vouchers     

  audit_logs, data_quality_issues,    Control/observability
  event_log_index                     
  -----------------------------------------------------------------------

## 9.3 Frontend security

-   Không lưu service_role key hoặc provider secret trong frontend/env
    public.

-   Không log raw document, bank account, token, webhook payload hay PII
    vào console/analytics.

-   File download dùng signed URL ngắn hạn và audit event.

-   CSP, secure cookies/session handling theo Supabase Auth guidance của
    phiên bản đang dùng.

-   Every mutation uses correlation_id; high-risk action uses
    idempotency_key và expected_version.

-   UI permission guard là UX; RLS/RPC/Edge Function mới là enforcement.

# 10. QA, UAT và Release Gate

## 10.1 Test layers

  -----------------------------------------------------------------------
  **Layer**                           **Bắt buộc**
  ----------------------------------- -----------------------------------
  Unit                                money/time/status formatters;
                                      permission predicate; Zod schemas;
                                      reducers/selectors.

  Component                           DataTable/filter URL sync; forms;
                                      dialogs; async states; permission
                                      button states.

  Integration                         Mock repository
                                      success/error/conflict/stale; query
                                      invalidation; optimistic locking.

  E2E                                 Login/route guard; core happy path;
                                      rejection; provider failure; 403;
                                      export; session expiry.

  Accessibility                       Keyboard; focus; labels; contrast;
                                      chart/table alternative;
                                      screen-reader status.

  Security                            Direct route attempt; role
                                      escalation; PII masking; signed URL
                                      expiry; audit creation.
  -----------------------------------------------------------------------

## 10.2 P0 UAT scenarios

  -----------------------------------------------------------------------
  **ID**                  **Scenario**            **Expected**
  ----------------------- ----------------------- -----------------------
  US-01                   Manual assign eligible  No overlap; audit +
                          Worker                  notification.

  US-02                   Approve refund          checker ≠ maker; MFA;
                                                  approval record.

  US-03                   Execute payout provider UNKNOWN; no auto retry.
                          timeout                 

  US-04                   Activate pricing        Activation blocked;
                          conflict                conflict shown.

  US-05                   Change role permissions Impact preview;
                                                  protected permissions
                                                  remain denied.

  US-06                   Attempt delete audit    No UI action; server
                                                  denied and logged.
  -----------------------------------------------------------------------

## 10.3 Release gates

-   Tất cả màn P0 đạt acceptance criteria và có mock fixtures cho mọi
    state.

-   Không còn placeholder TODO trong visible UI P0.

-   Permission matrix test tự động pass.

-   No critical accessibility/security defect.

-   Supabase RLS/RPC policy test pass trước khi đổi mock adapter sang
    live adapter.

-   Product + role owner ký UAT; rollback/feature flag sẵn sàng.

# 11. Kế hoạch bắt đầu code UI

+---+---------------------------------------------------------------------+
|   | Cách chạy nhanh                                                     |
|   |                                                                     |
|   | Dựng shared shell và mock repository trước. Mỗi màn phải chạy được  |
|   | với success, empty, error, stale và forbidden fixture trước khi nối |
|   | Supabase.                                                           |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

## 11.1 Chia việc cho đội 3 dev

  -----------------------------------------------------------------------
  **Owner**                           **Phạm vi**
  ----------------------------------- -----------------------------------
  Dev 1 --- Operations                AS-01→AS-08: dashboard, live/jobs,
                                      assignment, dispute, users,
                                      verification.

  Dev 2 --- Finance                   AS-09→AS-11: approvals, execution,
                                      ledger/transactions; shared finance
                                      components.

  Dev 3 --- Platform                  AS-12→AS-18: services, pricing,
                                      vouchers, admin accounts, roles,
                                      settings, audit.
  -----------------------------------------------------------------------

## 11.2 Sprint đề xuất

  ---------------------------------------------------------------------------------
  **Sprint**              **Đầu ra**                        **Gate**
  ----------------------- --------------------------------- -----------------------
  Sprint 0 --- 2--3 ngày  Repo, shell, tokens, route        App shell + 403/404 +
                          guards, mock repository, CI,      fixture switching.
                          Storybook/component playground.   

  Sprint 1 --- 1 tuần     P0 list/detail screens read-only; Product visual review +
                          filters/table/charts/states.      responsive 1440/1024.

  Sprint 2 --- 1 tuần     P0                                UAT mock end-to-end.
                          forms/actions/proposal/approval   
                          flows với mock;                   
                          audit/confirm/error.              

  Sprint 3 --- 1 tuần     Supabase read adapter, RLS, live  Data/access validation.
                          data views; P1 core.              

  Sprint 4 --- 1 tuần     Edge Function/RPC mutations,      Security + UAT +
                          MFA/idempotency; remaining P1;    release.
                          E2E.                              
  ---------------------------------------------------------------------------------

## 11.3 Coding order

  -----------------------------------------------------------------------
  **Wave**                            **Screens**
  ----------------------------------- -----------------------------------
  1 --- Core                          AS-01 Dashboard; AS-03/04 Job
                                      list/detail; AS-07 Users

  2 --- Operations                    AS-02 Live; AS-05 Assignment; AS-06
                                      Disputes; AS-08 Verification

  3 --- Finance                       AS-09 Approvals; AS-10 Execution;
                                      AS-11 Ledger/Transactions

  4 --- Platform                      AS-12 Services; AS-13 Pricing;
                                      AS-15 Accounts; AS-16 Roles; AS-17
                                      Settings; AS-18 Audit

  5 --- P1                            AS-14 Voucher Management
  -----------------------------------------------------------------------

# 12. Definition of Done và Change Control

  -------------------------------------------------------------------------------------------
  **ID**                              **Tiêu chí hoàn thành**
  ----------------------------------- -------------------------------------------------------
  DOD-01                              Route, breadcrumb, permission guard và sidebar active
                                      state đúng.

  DOD-02                              TypeScript strict; không any ở public contract; Zod
                                      validate external data.

  DOD-03                              Default/loading/empty/error/stale/forbidden/not-found
                                      đã render và test.

  DOD-04                              Filter URL sync; server pagination/sort; refresh không
                                      mất state.

  DOD-05                              Money/status/time dùng shared formatter/domain
                                      contract.

  DOD-06                              Mutation có reason, confirm, conflict handling,
                                      correlation ID và audit expectation.

  DOD-07                              Permission-denied button/route test pass; server/RLS
                                      không phụ thuộc UI guard.

  DOD-08                              Accessibility keyboard/focus/label/contrast pass.

  DOD-09                              Unit/component/E2E P0 pass; no critical console/network
                                      error.

  DOD-10                              Product + role owner UAT sign-off; feature
                                      flag/rollback có sẵn.
  -------------------------------------------------------------------------------------------

## 12.1 Change control

Sau baseline v1.0, thay đổi về payment formula, revenue recognition,
auto-confirm, risk hold, payout, role permission, status transition hoặc
COD phải có Change Request. CR tối thiểu ghi: quyết định mới, lý do,
owner, ngày hiệu lực, màn/API/schema/test bị ảnh hưởng và
migration/backfill nếu có.

## 12.2 Sign-off

  ------------------------------------------------------------------------
  **Vai trò**        **Người duyệt**   **Ngày**          **Ký**
  ------------------ ----------------- ----------------- -----------------
  Product Owner                                          ☐

  Admin System Owner                                     ☐

  Frontend Lead                                          ☐

  Backend/Supabase                                       ☐
  Lead                                                   

  Security/Finance                                       ☐
  reviewer                                               
  ------------------------------------------------------------------------

​
