  -----------------------------------------------------------------------
  **JOBFREE**
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

PRODUCT REQUIREMENTS DOCUMENT\
ADMIN DATA

**Analyze & Reconcile --- Finance Operations, Analytics và Data
Quality**

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

  Số màn                              20

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
|   | Admin Data được phép phân tích, đối soát, tạo case, ghép exact      |
|   | match, đính kèm evidence và lập proposal. Role này không có nút     |
|   | Approve/Execute cho refund, adjustment hay payout.                  |
+===+=====================================================================+
+---+---------------------------------------------------------------------+

# 2. Product Context, Goal và Scope

## 2.1 Bối cảnh

JobFree là nền tảng điều phối lao động ngắn hạn. Employer đăng Job và
thanh toán trước; Worker nhận Job, check-in/out, gửi evidence và được
chi tiền sau khi hoàn thành. Admin web phải bảo đảm vòng đời Job vận
hành được, tiền được kiểm soát và mọi can thiệp có audit.

## 2.2 Mục tiêu của Admin Data

  -------------------------------------------------------------------------------------
  **Goal**                            **Kết quả mong muốn**
  ----------------------------------- -------------------------------------------------
  G1 --- Financial visibility         Biết tiền đã thu, đang khóa, phải trả, đã chi,
                                      hoàn và lệch ở đâu.

  G2 --- Reconciliation operations    Mọi mismatch có case, owner, SLA, evidence và
                                      resolution.

  G3 --- Worker payout protection     Theo dõi release eligibility và payout aging để
                                      Worker không chờ quá SLA.

  G4 --- Trusted analytics            Revenue/GMV/jobs/users/retention/service/region
                                      dùng metric definition nhất quán.

  G5 --- Data quality                 Phát hiện source stale, invalid/duplicate/delayed
                                      event và tạo issue.
  -------------------------------------------------------------------------------------

## 2.3 Non-goals / Out of scope

  -----------------------------------------------------------------------
  **Ngoài phạm vi**                   **Lý do**
  ----------------------------------- -----------------------------------
  Approve/execute monetary action     Thuộc Admin System checker.

  Pricing, role, payment config       Thuộc Admin System.

  Direct ledger/source edit           Bị cấm; correction qua
                                      proposal/ledger entry.

  COD direct cash MVP                 Chuyển B2B Postpaid P2.

  Statutory accounting/tax filing     PRD chỉ quản trị vận hành; cần
                                      accounting/legal riêng.
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
  **Persona**             **Nhu cầu**             **Không được làm**
  ----------------------- ----------------------- -----------------------
  Finance/Data Operator   Theo dõi dòng tiền, đối Approve/execute tiền;
                          soát, payout aging, tạo sửa
                          case/proposal.          pricing/config/role.

  Data Analyst            Phân tích revenue,      Xem raw PII/secret;
                          jobs, users, retention, thay đổi dữ liệu nguồn.
                          services, region,       
                          DQ/events.              

  Finance Lead --- view   Review period           Self-approve nếu là
                          close/report và         maker.
                          proposal trước khi      
                          submit.                 
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

  ------------------------------------------------------------------------------------------------------------
  **Nhóm**       **ID**         **Menu/Màn**     **Route**                                      **Priority**
  -------------- -------------- ---------------- ---------------------------------------------- --------------
  Kiểm soát      AD-01          Finance Control  /admin-data/control-center                     **P0**
                                Center                                                          

  Dòng tiền      AD-02          Payment          /admin-data/payments                           **P0**
                                Transactions                                                    

  Dòng tiền      AD-04          Worker Payables  /admin-data/payables                           **P0**
                                & Payout Monitor                                                

  Dòng tiền      AD-07          Refund &         /admin-data/refunds-adjustments                **P0**
                                Adjustment Queue                                                

  Đối soát       AD-05          Reconciliation   /admin-data/reconciliation                     **P0**
                                Workspace                                                       

  Đối soát       AD-08          Period Close &   /admin-data/period-close                       **P0**
                                Finance Report                                                  

  Analytics      AD-09          Revenue & GMV    /admin-data/analytics/revenue                  P1

  Analytics      AD-10          Job Analytics    /admin-data/analytics/jobs                     P1

  Analytics      AD-11          Cancellation &   /admin-data/analytics/cancellations-disputes   P1
                                Dispute                                                         
                                Analytics                                                       

  Analytics      AD-12          Priority Package /admin-data/analytics/priority-packages        P1
                                Analytics                                                       

  Analytics      AD-13          Employer         /admin-data/analytics/employers                P1
                                Analytics                                                       

  Analytics      AD-14          Worker Analytics /admin-data/analytics/workers                  P1

  Analytics      AD-15          Retention        /admin-data/analytics/retention                P1

  Analytics      AD-16          Services         /admin-data/analytics/services                 P1
                                Analytics                                                       

  Analytics      AD-17          Region &         /admin-data/analytics/regions                  P1
                                Supply--Demand                                                  

  Báo cáo & Data AD-18          Reports & Export /admin-data/reports                            P1
  Ops                           Center                                                          

  Báo cáo & Data AD-19          Data Quality     /admin-data/data-quality                       P1
  Ops                                                                                           

  Báo cáo & Data AD-20          Event Explorer   /admin-data/events                             P1
  Ops                                                                                           
  ------------------------------------------------------------------------------------------------------------

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

## AD-01 --- Finance Control Center

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/control-center

  Priority                            **P0**

  User goal                           Trang mở đầu cho Admin Data, trả
                                      lời hôm nay dòng tiền có an toàn và
                                      việc nào cần xử lý trước.

  KPI/count                           Cash Collected; Locked Job Funds;
                                      Worker Payable; Unreconciled
                                      Amount; Open Cases; Over-SLA Cases;
                                      Payout Success Rate

  Filters                             Today/7 days/custom; service;
                                      region; risk level; source
                                      freshness

  Layout blocks                       KPI cards có timestamp; health
                                      banner; exception queue; payout
                                      aging; provider health; 7-day
                                      trend; quick actions

  Table/detail fields                 Case ID; type; related object;
                                      variance; severity; owner; age;
                                      SLA; next action
  -----------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------
  Admin Data                          Mở transaction/case; gán owner;
                                      export snapshot; tạo case từ alert.

  Admin System liên quan              Chỉ xem trong console Data; approval
                                      được deep-link sang Admin System.

  API/RPC mock                        GET /admin-data/control-center; GET
                                      /admin-data/exceptions?scope=today

  UI states                           healthy; warning; critical;
                                      partial-data; stale-source;
                                      provider-down; empty
  ------------------------------------------------------------------------

### Acceptance criteria

-   AC1: KPI có đơn vị, định nghĩa tooltip và updated_at.

-   AC2: Không biến dữ liệu thiếu thành số 0.

-   AC3: Click KPI mở danh sách đã áp đúng filter.

-   AC4: Critical/over-SLA luôn đứng trước warning.

## AD-02 --- Payment Transactions

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/payments

  Priority                            **P0**

  User goal                           Theo dõi collection qua PayOS và
                                      trạng thái đối soát của từng
                                      payment order.

  KPI/count                           Paid Confirmed; Pending; Expired;
                                      Failed; Unmatched; Amount Mismatch;
                                      Duplicate Signal

  Filters                             date range; payment status;
                                      reconciliation status; amount
                                      range; service; order_code; job_id;
                                      provider_ref

  Layout blocks                       Summary chips; advanced filter bar;
                                      saved views; transaction table;
                                      export; bulk exact-match guard

  Table/detail fields                 created_at; order_code; job_id;
                                      employer; expected_amount;
                                      paid_amount; payment_status;
                                      match_status; provider_ref;
                                      updated_at
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------------
  Admin Data                          View/export; exact match khi rule pass;
                                      tạo case; thêm note.

  Admin System liên quan              Không override dữ liệu provider; mở
                                      System incident khi lỗi cấu hình/webhook.

  API/RPC mock                        GET /admin-data/payments; POST
                                      /admin-data/reconciliation/exact-match;
                                      POST /admin-data/cases

  UI states                           CREATED; PENDING; PAID_CONFIRMED;
                                      EXPIRED; FAILED +
                                      MATCHED/UNMATCHED/EXCEPTION
  -----------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Search hỗ trợ order_code, job_id, provider_ref.

-   AC2: Bulk match chỉ bật cho record cùng rule và không có variance.

-   AC3: Provider status và reconciliation status là hai cột riêng.

-   AC4: Export ghi log và giữ nguyên filter hiện tại.

## AD-03 --- Financial Detail

  -----------------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------------------
  Route                               /admin-data/financial/:objectType/:id

  Priority                            **P0**

  User goal                           Một nguồn sự thật cho hành trình
                                      Payment--Job--Ledger--Payout--Refund của một
                                      đối tượng.

  KPI/count                           Expected; Collected; Locked; Platform Revenue;
                                      Worker Payable; Paid Out; Refunded; Variance

  Filters                             Không có filter toàn trang; tab
                                      Timeline/Ledger/Provider/Reconciliation/Audit

  Layout blocks                       Identity header; money summary; status rail;
                                      event timeline; ledger entries; provider
                                      payload summary; linked cases; evidence drawer

  Table/detail fields                 timestamp; domain; event/status; amount;
                                      source; reference; actor; result
  -----------------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Tạo case; ghi chú; đính kèm
                                      evidence; tạo proposal từ object
                                      hiện tại.

  Admin System liên quan              Approval chỉ hiển thị read-only và
                                      deep-link sang Admin System.

  API/RPC mock                        GET
                                      /admin-data/financial/:type/:id;
                                      POST /admin-data/cases; POST
                                      /admin-data/proposals

  UI states                           PAID_CONFIRMED → FUNDS_LOCKED →
                                      RELEASE_ELIGIBLE → PAYOUT_PENDING →
                                      PAID_OUT; dispute/refund branches
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Mọi ID liên quan là deep link.

-   AC2: Money summary tie-out hoặc hiện variance rõ ràng.

-   AC3: Timeline sắp xếp theo occurred_at, không theo thời điểm load
    UI.

-   AC4: PII ngân hàng được mask mặc định.

## AD-04 --- Worker Payables & Payout Monitor

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/payables

  Priority                            **P0**

  User goal                           Phát hiện Worker đủ điều kiện nhưng
                                      chưa nhận tiền, chuẩn bị payout
                                      batch an toàn.

  KPI/count                           Worker Payable; Ready to Pay; Risk
                                      Hold; Failed; P50/P95 Aging; Payout
                                      Success Rate

  Filters                             eligibility; payout status; aging
                                      bucket; risk flag; service; worker;
                                      batch; date

  Layout blocks                       Aging cards; payable table;
                                      risk/hold panel; batch builder;
                                      attempt history; provider result

  Table/detail fields                 worker; job_id;
                                      release_eligible_at; amount; aging;
                                      hold_reason; payout_status;
                                      batch_id; provider_ref
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Chọn eligible rows; tạo payout
                                      batch proposal; thêm evidence; loại
                                      row không hợp lệ với reason.

  Admin System liên quan              Không duyệt trong Data console; xem
                                      approval result và execution
                                      status.

  API/RPC mock                        GET /admin-data/payables; POST
                                      /admin-data/payout-batches; GET
                                      /admin-data/payout-batches/:id

  UI states                           LOCKED; RELEASE_ELIGIBLE; ON_HOLD;
                                      BATCH_PROPOSED; SUBMITTED;
                                      PAID_OUT; FAILED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Row ON_HOLD không thể thêm vào batch.

-   AC2: Tổng batch cập nhật theo selection.

-   AC3: Không cho một payable xuất hiện trong hai active batch.

-   AC4: Failure hiển thị attempt_no và retry policy.

## AD-05 --- Reconciliation Workspace

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/reconciliation

  Priority                            **P0**

  User goal                           Ghép expected nội bộ,
                                      PayOS/provider và statement; ưu
                                      tiên ngoại lệ có variance.

  KPI/count                           Reconciliation Rate; Unreconciled
                                      Amount; Matched; Unmatched;
                                      Exceptions; Over-SLA

  Filters                             cut-off date; source; rule; match
                                      status; variance; severity; owner;
                                      SLA

  Layout blocks                       Three-way totals; rule tabs; match
                                      groups; unmatched buckets; variance
                                      chart; bulk exact match; case
                                      creation

  Table/detail fields                 internal_ref; provider_ref;
                                      statement_ref; expected;
                                      provider_amount; bank_amount;
                                      variance; rule; status; owner
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Exact match; create/assign case;
                                      classify reason; link records; add
                                      evidence.

  Admin System liên quan              Xem health và mở approval liên
                                      quan; không force-match sai rule.

  API/RPC mock                        GET /admin-data/reconciliation;
                                      POST
                                      /admin-data/reconciliation/match;
                                      POST /admin-data/cases

  UI states                           UNMATCHED; EXACT_MATCH;
                                      REVIEW_REQUIRED; EXCEPTION;
                                      RESOLVED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Unreconciled Amount dùng SUM(ABS(variance)), không net dương
    âm.

-   AC2: Missing statement tạo partial state, không tạo false mismatch.

-   AC3: Force match không tồn tại trong UI.

-   AC4: Rule và lý do mismatch có tooltip.

## AD-06 --- Reconciliation Case Detail

  ------------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- ------------------------------------------
  Route                               /admin-data/reconciliation/cases/:caseId

  Priority                            **P0**

  User goal                           Hồ sơ chuẩn cho một khoản lệch: owner,
                                      SLA, reason, evidence, proposal và audit.

  KPI/count                           Variance; Case Age; SLA Due; Severity;
                                      Affected Amount

  Filters                             Không có filter; dùng tabs
                                      Investigation/Evidence/Proposal/Audit

  Layout blocks                       Case header; source comparison; owner/SLA;
                                      reason taxonomy; comments; attachments;
                                      proposal builder; activity timeline

  Table/detail fields                 field; internal value; provider value;
                                      statement value; difference; source
                                      timestamp
  ------------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Assign; investigate; comment;
                                      attach; propose
                                      refund/adjustment/payout; submit
                                      for approval.

  Admin System liên quan              Approval result read-only;
                                      close/reopen result hiển thị từ
                                      System.

  API/RPC mock                        GET/PATCH /admin-data/cases/:id;
                                      POST
                                      /admin-data/cases/:id/evidence;
                                      POST
                                      /admin-data/cases/:id/proposals

  UI states                           OPEN; INVESTIGATING;
                                      WAITING_SOURCE; PROPOSED; APPROVED;
                                      RESOLVED; CLOSED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Case không submit proposal nếu thiếu reason hoặc evidence bắt
    buộc.

-   AC2: SLA pause cần reason được phép.

-   AC3: Source changed sau proposal phải đánh dấu proposal stale.

-   AC4: Không xóa attachment/audit đã ghi.

## AD-07 --- Refund & Adjustment Queue

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/refunds-adjustments

  Priority                            **P0**

  User goal                           Quản lý proposal tiền do Admin Data
                                      chuẩn bị và theo dõi kết quả tới
                                      trạng thái cuối.

  KPI/count                           Draft; Pending Approval; Approved
                                      Not Executed; Processing; Failed;
                                      Total Amount; Aging

  Filters                             proposal type; status; maker;
                                      checker; amount; age; related case;
                                      date

  Layout blocks                       Tabs Refund/Adjustment/Payout
                                      Exception; queue table; eligibility
                                      panel; evidence; approval timeline

  Table/detail fields                 proposal_id; type; case_id; object;
                                      amount; maker; submitted_at;
                                      checker; status; execution_ref
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Create/edit draft; submit; withdraw
                                      trước review; bổ sung evidence khi
                                      bị reject.

  Admin System liên quan              Không approve trong Data console;
                                      deep-link sang System Finance
                                      Approvals.

  API/RPC mock                        GET /admin-data/proposals;
                                      POST/PATCH /admin-data/proposals;
                                      POST
                                      /admin-data/proposals/:id/submit

  UI states                           DRAFT; PROPOSED; APPROVED;
                                      REJECTED; PROCESSING; SUCCEEDED;
                                      FAILED; WITHDRAWN
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: amount không vượt eligible_amount.

-   AC2: Submitted proposal trở thành read-only.

-   AC3: Reject bắt buộc reason.

-   AC4: UI phân biệt approved với executed/succeeded.

## AD-08 --- Period Close & Finance Report

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/period-close

  Priority                            **P0**

  User goal                           Tie-out và đóng ngày; chuẩn bị đề
                                      xuất khóa tháng cho Admin System.

  KPI/count                           Completed GMV; Platform Revenue;
                                      Cash; Locked Funds; Worker Payable;
                                      Refund; Costs; Variance; Open
                                      Critical Cases

  Filters                             period day/month; service; region;
                                      version; close status

  Layout blocks                       Period selector; source freshness;
                                      tie-out equations; close checklist;
                                      exception list; sign-off; immutable
                                      snapshot export

  Table/detail fields                 check_id; check; expected; actual;
                                      variance; result; owner; evidence
  -----------------------------------------------------------------------

### Hành động và data contract

  ------------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- ------------------------------------------
  Admin Data                          Run checks; explain variance; close day
                                      khi pass; propose month lock.

  Admin System liên quan              Xem kết quả month lock/reopen; action ở
                                      Admin System.

  API/RPC mock                        GET /admin-data/periods/:period; POST
                                      /admin-data/periods/:period/run-checks;
                                      POST
                                      /admin-data/periods/:period/close-day;
                                      POST
                                      /admin-data/periods/:period/propose-lock

  UI states                           OPEN; CHECKING; BLOCKED; READY_TO_CLOSE;
                                      DAILY_CLOSED; MONTH_LOCK_PROPOSED;
                                      MONTH_LOCKED; REOPENED
  ------------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không đóng ngày nếu critical variance khác 0 hoặc case critical
    mở.

-   AC2: Snapshot có version và generated_at.

-   AC3: Late data sau close tạo exception, không sửa snapshot âm thầm.

-   AC4: Month lock luôn cần System approval.

## AD-09 --- Revenue & GMV

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/revenue

  Priority                            P1

  User goal                           Phân tích doanh thu quản trị, GMV
                                      và take rate theo thời gian và phân
                                      khúc.

  KPI/count                           Booked GMV; Paid GMV; Completed
                                      GMV; Platform Fee Revenue; Priority
                                      Fee Revenue; Gross Revenue;
                                      Management Net Revenue; Take Rate

  Filters                             date; recognition basis; service;
                                      region; employer segment; priority
                                      package; voucher funding source

  Layout blocks                       Metric definition banner; KPI row;
                                      time series; revenue bridge;
                                      service/region breakdown; detail
                                      table

  Table/detail fields                 period; completed_gmv;
                                      platform_fee; priority_fee;
                                      voucher_cost; provider_cost;
                                      refund; management_net_revenue;
                                      take_rate
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/drill/export; lưu view; tạo
                                      data quality issue.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/revenue

  UI states                           complete; partial; restated;
                                      closed-period; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Không gọi Cash Collected là revenue.

-   AC2: Mọi KPI có metric_id tooltip.

-   AC3: Recognition basis mặc định accepted/auto-confirmed.

-   AC4: Closed period hiển thị snapshot version.

## AD-10 --- Job Analytics

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/jobs

  Priority                            P1

  User goal                           Theo dõi funnel và chất lượng vòng
                                      đời Job.

  KPI/count                           Created; Paid; Matched; Accepted;
                                      Checked-in; Completion Submitted;
                                      Completed; Cancelled; Disputed;
                                      Fill Rate; Time to Fill

  Filters                             date; service; region; priority;
                                      employer; worker risk; job status

  Layout blocks                       Funnel; time-to-fill distribution;
                                      status trend; failure reasons; job
                                      detail table

  Table/detail fields                 job_id; employer; service;
                                      created_at; priority; status;
                                      worker; time_to_fill; completion;
                                      dispute
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/drill/export; flag anomaly.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/jobs

  UI states                           complete; partial; delayed-event;
                                      no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Funnel dùng cùng cohort grain.

-   AC2: Cancellation và dispute không cộng trùng.

-   AC3: Click segment áp filter cho table.

-   AC4: P50/P95 ghi rõ đơn vị phút/giờ.

## AD-11 --- Cancellation & Dispute Analytics

  ----------------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- ----------------------------------------------
  Route                               /admin-data/analytics/cancellations-disputes

  Priority                            P1

  User goal                           Phân tích tỷ lệ, nguyên nhân và thiệt hại của
                                      cancellation/dispute; không xử lý tranh chấp
                                      vận hành tại đây.

  KPI/count                           Cancellation Rate; Dispute Rate; Affected GMV;
                                      Refund Amount; Avg Resolution Time; Repeat
                                      Parties

  Filters                             date; initiator; reason; stage; service;
                                      region; party; outcome

  Layout blocks                       Reason tree; trend; stage heatmap; party
                                      cohorts; affected amount; case links

  Table/detail fields                 case/job; initiator; reason; stage; amount;
                                      opened_at; resolved_at; outcome; owner
  ----------------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; deep-link case; create
                                      quality issue.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/disputes

  UI states                           complete; partial;
                                      taxonomy-missing; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Có banner \'Analytics only\'.

-   AC2: Reason Unknown được hiển thị và theo dõi.

-   AC3: Một dispute reopened không bị đếm thành case mới.

-   AC4: PII không hiển thị trong export mặc định.

## AD-12 --- Priority Package Analytics

  -----------------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------------
  Route                               /admin-data/analytics/priority-packages

  Priority                            P1

  User goal                           Đánh giá gói Tức thì/Nhanh/Bình thường về
                                      adoption, revenue và chất lượng matching.

  KPI/count                           Adoption Rate; Priority Fee Revenue; Time
                                      to Fill; Fill Rate; Cancel Rate; Refund
                                      Rate; Incremental Conversion

  Filters                             date; package; service; region; employer
                                      segment; price version

  Layout blocks                       Package comparison; adoption trend;
                                      price-version table; time-to-fill;
                                      revenue mix; guardrails

  Table/detail fields                 package; jobs; adoption; fee_revenue;
                                      fill_rate; p50_time_to_fill; cancel_rate;
                                      refund_rate
  -----------------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------------
  Admin Data                          View/export; recommend pricing change
                                      bằng note, không chỉnh pricing.

  Admin System liên quan              View/export.

  API/RPC mock                        GET
                                      /admin-data/analytics/priority-packages

  UI states                           complete; low-sample;
                                      price-version-change; no-data
  -----------------------------------------------------------------------------

### Acceptance criteria

-   AC1: Low sample có cảnh báo.

-   AC2: Không suy luận uplift nếu thiếu control/cohort.

-   AC3: Price version hiển thị theo effective date.

-   AC4: Link sang System Pricing read-only nếu có quyền.

## AD-13 --- Employer Analytics

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/employers

  Priority                            P1

  User goal                           Phân tích acquisition, activation,
                                      repeat usage, spend và rủi ro
                                      Employer.

  KPI/count                           New Employers; Activated; Paying;
                                      Repeat Rate; Completed GMV; Avg
                                      Jobs; Cancellation; Dispute; LTV
                                      proxy

  Filters                             signup cohort; region; business
                                      type; verification; activity; risk;
                                      spend tier

  Layout blocks                       Cohort cards; activation funnel;
                                      spend distribution; repeat curve;
                                      top employers; risk table

  Table/detail fields                 employer_id; segment; verified;
                                      jobs; completed_gmv; repeat_rate;
                                      cancel_rate; dispute_rate;
                                      last_active
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; deep-link masked
                                      profile.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/employers

  UI states                           complete; partial-profile; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Profile PII masked.

-   AC2: Activated definition có tooltip.

-   AC3: Top list không mặc định lộ số điện thoại/email.

-   AC4: Cohort theo signup month nhất quán.

## AD-14 --- Worker Analytics

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/workers

  Priority                            P1

  User goal                           Phân tích supply, activation,
                                      earnings, quality và payout
                                      experience của Worker.

  KPI/count                           New Workers; Verified; Activated;
                                      Active Supply; Completed Jobs;
                                      Earnings; Payout Aging; Rating;
                                      No-show; Dispute

  Filters                             cohort; region; skills/service;
                                      verification; active; risk; earning
                                      tier

  Layout blocks                       Activation funnel; active supply
                                      trend; earnings distribution;
                                      quality guardrails; payout
                                      experience; worker table

  Table/detail fields                 worker_id; verified; active_days;
                                      completed_jobs; earnings;
                                      payout_p95; rating; no_show;
                                      dispute; last_active
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; deep-link masked
                                      worker profile/payable.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/workers

  UI states                           complete; partial; low-sample;
                                      no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Earnings tách payable và paid out.

-   AC2: Rating có sample size.

-   AC3: Sensitive bank/ID data không có trong analytics.

-   AC4: No-show definition nhất quán Event Dictionary.

## AD-15 --- Retention

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/retention

  Priority                            P1

  User goal                           Đo retention Employer và Worker
                                      theo hành vi có giá trị, không chỉ
                                      login.

  KPI/count                           Employer W1/W4/M3 Repeat Job;
                                      Worker W1/W4 Active/Completed Job;
                                      Reactivation; Churn proxy

  Filters                             role; cohort basis; service;
                                      region; acquisition source;
                                      verified; first completed job

  Layout blocks                       Cohort heatmap; retention curves;
                                      segment comparison; reactivation;
                                      definition panel

  Table/detail fields                 cohort; size; W1; W2; W4; M2; M3;
                                      reactivated; notes
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; save comparison.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/retention

  UI states                           complete; immature-cohort;
                                      low-sample; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Immature cells hiển thị N/A, không phải 0.

-   AC2: Employer và Worker có definition riêng.

-   AC3: Cohort basis hiển thị trên chart title.

-   AC4: Export giữ cohort metadata.

## AD-16 --- Services Analytics

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/services

  Priority                            P1

  User goal                           Đo demand, fill, revenue, quality
                                      và seasonality theo service
                                      category.

  KPI/count                           Jobs; Completed GMV; Fill Rate;
                                      Time to Fill; Active Workers;
                                      Cancel/Dispute; Revenue; Margin
                                      proxy

  Filters                             date; category; service; region;
                                      priority; price version

  Layout blocks                       Service leaderboard; demand trend;
                                      quality matrix; worker coverage;
                                      price/revenue table

  Table/detail fields                 service; jobs; gmv; fill_rate;
                                      p50_time_to_fill; active_workers;
                                      cancel; dispute; revenue
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; đề xuất taxonomy
                                      issue.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/services

  UI states                           complete; inactive-service;
                                      taxonomy-change; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Service rename không làm gãy lịch sử.

-   AC2: Inactive service vẫn xem được historical data.

-   AC3: Category total không double count subservice.

-   AC4: Click service mở Region & Supply/Demand.

## AD-17 --- Region & Supply--Demand

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/analytics/regions

  Priority                            P1

  User goal                           Phát hiện khu vực thiếu Worker hoặc
                                      dư supply để điều phối
                                      growth/operations.

  KPI/count                           Demand Jobs; Available Workers;
                                      Supply/Demand Ratio; Fill Rate;
                                      Time to Fill; Unserved Jobs;
                                      Completed GMV

  Filters                             date/time; city; district; service;
                                      radius; availability window;
                                      priority

  Layout blocks                       Map/choropleth; supply-demand
                                      matrix; time heatmap; shortage
                                      list; region table

  Table/detail fields                 region; service; demand;
                                      available_supply; ratio; fill_rate;
                                      time_to_fill; unserved; gmv
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View/export; create insight note.

  Admin System liên quan              View/export.

  API/RPC mock                        GET /admin-data/analytics/regions

  UI states                           complete; location-incomplete;
                                      low-sample; no-data
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Map có table alternative.

-   AC2: Vị trí cá nhân được aggregate/anonymize.

-   AC3: Ratio ghi rõ time window/radius.

-   AC4: Không hiển thị marker nhà riêng Worker.

## AD-18 --- Reports & Export Center

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/reports

  Priority                            P1

  User goal                           Tạo và theo dõi report/export có
                                      kiểm soát thay vì tải trực tiếp dữ
                                      liệu tùy ý.

  KPI/count                           Scheduled Reports; Completed;
                                      Failed; Active Downloads; Rows
                                      Exported

  Filters                             report type; creator; status; date;
                                      schedule; scope

  Layout blocks                       Report templates; export builder;
                                      scheduled reports; job history;
                                      secure download drawer

  Table/detail fields                 export_id; report; filter_summary;
                                      creator; created_at; rows; status;
                                      expires_at; download
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Create/schedule/cancel own export;
                                      download trong thời hạn.

  Admin System liên quan              Create/schedule/view all theo
                                      scope.

  API/RPC mock                        GET/POST /admin-data/exports; POST
                                      /admin-data/exports/:id/cancel

  UI states                           QUEUED; RUNNING; COMPLETED; FAILED;
                                      EXPIRED; CANCELLED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Export lớn chạy async.

-   AC2: File có expiry và audit.

-   AC3: Filter summary được lưu cùng export.

-   AC4: PII fields cần permission riêng và mặc định tắt.

## AD-19 --- Data Quality

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/data-quality

  Priority                            P1

  User goal                           Giám sát freshness, completeness,
                                      validity, uniqueness và
                                      reconciliation controls.

  KPI/count                           Freshness SLA Pass; Failed Checks;
                                      Critical Issues; Open Issues; Mean
                                      Time to Resolve

  Filters                             domain; source; severity; owner;
                                      status; SLA; check type

  Layout blocks                       DQ scorecards; source freshness;
                                      failed checks; issue queue; trend;
                                      check detail

  Table/detail fields                 check_id; source; dimension;
                                      severity; result; failed_rows;
                                      owner; first_seen; SLA; status
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          Create/assign issue; acknowledge;
                                      add evidence; resolve khi check
                                      pass.

  Admin System liên quan              View; manage system incident/config
                                      ở System.

  API/RPC mock                        GET /admin-data/data-quality;
                                      POST/PATCH
                                      /admin-data/data-quality/issues

  UI states                           PASS; WARN; FAIL; ACKNOWLEDGED;
                                      INVESTIGATING; RESOLVED; WAIVED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Waive cần reason/expiry.

-   AC2: Resolved chỉ khi check pass hoặc approved waiver.

-   AC3: Critical issue hiện trên Control Center.

-   AC4: Check detail không lộ secret/provider credential.

## AD-20 --- Event Explorer

  -----------------------------------------------------------------------
  **Thuộc tính**                      **Giá trị**
  ----------------------------------- -----------------------------------
  Route                               /admin-data/events

  Priority                            P1

  User goal                           Tìm và kiểm tra business events
                                      phục vụ điều tra dữ liệu; không
                                      hiển thị secret/raw PII.

  KPI/count                           Events/min; Failed Validation;
                                      Duplicate; Delayed; Unknown Schema
                                      Version

  Filters                             event name; domain; object id;
                                      correlation id; validation result;
                                      time; schema version

  Layout blocks                       Event search; stream/table; payload
                                      inspector; correlation timeline;
                                      validation errors

  Table/detail fields                 occurred_at; event_name;
                                      object_type; object_id;
                                      correlation_id; version;
                                      validation; duplicate;
                                      ingestion_delay
  -----------------------------------------------------------------------

### Hành động và data contract

  -----------------------------------------------------------------------
  **Mục**                             **Yêu cầu**
  ----------------------------------- -----------------------------------
  Admin Data                          View masked event; copy IDs; create
                                      DQ/recon issue.

  Admin System liên quan              View; system trace deep-link nếu có
                                      quyền.

  API/RPC mock                        GET /admin-data/events; GET
                                      /admin-data/events/:eventId

  UI states                           VALID; INVALID; DUPLICATE; DELAYED;
                                      UNKNOWN_VERSION; REDACTED
  -----------------------------------------------------------------------

### Acceptance criteria

-   AC1: Payload mask theo field policy.

-   AC2: Search mặc định tối đa 24h để bảo vệ hiệu năng.

-   AC3: Không cho edit/replay event từ UI Data.

-   AC4: Correlation timeline sắp xếp occurred_at.

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
  UD-01                   PayOS paid + exact      Payment matched; no
                          match                   case; KPI updates.

  UD-02                   Amount mismatch         Case created with
                                                  variance, owner, SLA
                                                  and evidence.

  UD-03                   Worker release eligible Batch proposal created;
                                                  hold rows blocked.

  UD-04                   Refund proposal         Submit to System; Data
                                                  role cannot approve.

  UD-05                   Daily close blocked     Critical variance/open
                                                  case prevents close.

  UD-06                   Partial/stale provider  No false zero; risky
                          data                    action disabled.
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

  -------------------------------------------------------------------------------------------------
  **Owner**                           **Phạm vi**
  ----------------------------------- -------------------------------------------------------------
  Dev 1 --- Foundation                AdminShell, router, permission guards, shared
                                      table/filter/status/money, mock repository.

  Dev 2 --- Finance Ops               AD-02→AD-08:
                                      payment/detail/payables/reconciliation/case/proposal/period
                                      close.

  Dev 3 --- Analytics                 AD-01, AD-09→AD-20: control center, charts, reports/export,
                                      DQ/events.
  -------------------------------------------------------------------------------------------------

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

1.  AD-01 Finance Control Center --- /admin-data/control-center

2.  AD-02 Payment Transactions --- /admin-data/payments

3.  AD-03 Financial Detail --- /admin-data/financial/:objectType/:id

4.  AD-04 Worker Payables & Payout Monitor --- /admin-data/payables

5.  AD-05 Reconciliation Workspace --- /admin-data/reconciliation

6.  AD-06 Reconciliation Case Detail ---
    /admin-data/reconciliation/cases/:caseId

7.  AD-07 Refund & Adjustment Queue --- /admin-data/refunds-adjustments

8.  AD-08 Period Close & Finance Report --- /admin-data/period-close

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

  Admin Data Owner                                       ☐

  Frontend Lead                                          ☐

  Backend/Supabase                                       ☐
  Lead                                                   

  Security/Finance                                       ☐
  reviewer                                               
  ------------------------------------------------------------------------

​
