# JobFree PRD Documentation Standard v1.0

Status: Baseline cho các PRD v2.0 trở đi  
Audience: Product, Frontend, Backend, Data/Analytics, Finance Operations, QA, Security

## 1. Mục đích

Chuẩn này giúp mọi vai trò đọc cùng một requirement với cùng ý nghĩa. Một PRD tốt không chỉ nêu chức năng mà còn phải chỉ ra lý do, nguồn dữ liệu, rule, quyền, hành vi lỗi và cách kiểm thử. Tài liệu phải đủ rõ để thiết kế API/schema/read model, nhưng không thay thế thiết kế kỹ thuật chi tiết hoặc migration.

## 2. Document hierarchy

```text
Canonical Data Contract
        |
        v
Business / Product PRD
        |
        v
Screen Specification
        |
        v
System Design + API / Schema / Read Model
        |
        v
Implementation
```

| Lớp | Câu hỏi phải trả lời | Không được làm |
| --- | --- | --- |
| Canonical Data Contract | “Điều gì là đúng trong hệ thống?” Entity, state, invariant, money, security và conflict resolution dùng chung. | Không mô tả layout theo từng màn hoặc chi tiết framework. |
| Business/Product PRD | “Sản phẩm phải làm gì và vì sao?” Persona, workflow, business rule, priority, success và boundary. | Không tạo state/money contract cạnh tranh canonical. |
| Screen Specification | “Người dùng thấy gì và làm được gì?” Route, field, action, states, permission, audit và acceptance criteria. | Không biến UI label, card KPI hoặc button thành source of truth. |
| System Design | “Các console dùng chung kiến trúc và UI foundation nào?” Framework, module boundary, shadcn primitives, shared compositions, state/data access, accessibility và test architecture. | Không định nghĩa lại product policy, canonical state, permission hay finance rule. |
| API / Schema / Read Model | “Contract kỹ thuật nào phục vụ requirement?” Types, source, query/mutation, authorization, freshness. | Không tự thêm business rule chưa được Product/Canonical phê duyệt. |
| Implementation | “Thực hiện bằng công nghệ nào?” Code, migration, worker, RLS, test và vận hành. | Không thay đổi semantics chỉ vì thuận tiện triển khai. |

Khi có xung đột, lớp dưới MUST tuân lớp trên. PRD MUST reference canonical version và ghi rõ quyết định thay thế requirement cũ. UI MAY trình bày gọn hơn nhưng MUST NOT làm mất domain distinction.

## 3. Standard note types

Chỉ dùng sáu loại note sau. Tiêu đề note viết đúng tên để có thể search và lint tài liệu.

> **WHY**  
> Giải thích lý do requirement hoặc quyết định tồn tại, rủi ro mà nó ngăn chặn, và giá trị cho người dùng/nghiệp vụ.

> **DATA RULE**  
> Nêu invariant, source of truth, công thức, cutoff, lifecycle, version hoặc freshness. Rule dùng MUST/MUST NOT khi bắt buộc.

> **FINANCE RULE**  
> Nêu rule ảnh hưởng money, ledger, revenue, payout, refund, reconciliation hoặc period close; chỉ rõ thời điểm ghi nhận và effect.

> **SECURITY**  
> Nêu permission, server authorization/RLS, MFA, PII/masking, maker-checker, audit hoặc sensitive action. UI guard không phải security boundary.

> **EXAMPLE**  
> Dùng dữ liệu nhỏ, cụ thể để Product, Dev và QA kiểm tra cùng một semantics. Ví dụ không tạo business rule mới.

> **DO NOT CONFUSE WITH**  
> Phân biệt các khái niệm gần giống nhưng không tương đương, ví dụ `PAID_CONFIRMED`, `RELEASED`, `PAID_OUT`.

Không tạo note type mới nếu nội dung thuộc một trong sáu loại trên. Nội dung thông thường đặt trong paragraph hoặc table.

## 4. Requirement language

| Từ khóa | Ý nghĩa và cách dùng |
| --- | --- |
| **MUST** | Bắt buộc để đúng business/security/data contract. Vi phạm làm requirement FAIL. |
| **MUST NOT** | Hành vi bị cấm. Dùng cho invariant, security boundary và dữ liệu không được suy diễn. |
| **SHOULD** | Khuyến nghị mạnh; chỉ được khác khi có lý do được ghi lại và owner chấp thuận. |
| **MAY** | Tùy chọn hợp lệ; không được coi là dependency bắt buộc. |

Business invariant MUST dùng MUST/MUST NOT. Tránh “nên”, “hợp lý”, “xử lý phù hợp”, “works correctly”, “as usual” hoặc “etc.” nếu không có tiêu chí kiểm chứng. Mỗi requirement quan trọng SHOULD có ID ổn định để trace.

## 5. Standard screen template

Mỗi màn AD/AS v2 MUST có các mục sau; mục đơn giản MAY gộp thành bảng nhưng không được bỏ semantics quan trọng.

1. **Screen ID & Name**: ID ổn định và tên nghiệp vụ.
2. **Purpose**: outcome màn hình tạo ra.
3. **Business Question**: câu hỏi người dùng cần trả lời.
4. **Primary Users**: persona chính/phụ.
5. **Route**: route canonical và deep-link parameters.
6. **Priority**: P0/P1/P2 và dependency.
7. **Permissions**: view/action keys; enforcement server-side.
8. **Data Sources / Read Models**: source entity, read model, cutoff, freshness.
9. **KPI / Summary**: reference Metric Registry.
10. **Filters**: field, semantics, default, URL persistence/range limit.
11. **Table / Visualization**: columns/charts và drill-down.
12. **Field Definitions**: business-significant fields hoặc reference dictionary.
13. **Actions**: theo action template.
14. **State / Status Semantics**: map canonical state machine, không tạo enum mới.
15. **Empty State**: phân biệt không có kết quả với chưa có dữ liệu.
16. **Loading State**: không hiển thị số giả/zero.
17. **Error State**: error code, retry và hành vi an toàn.
18. **Stale / Partial Data State**: nguồn nào stale/missing, cutoff và action bị block.
19. **Permission-denied State**: 403/ẩn action; không tiết lộ dữ liệu.
20. **Audit & Events**: event, payload tối thiểu, correlation ID.
21. **Export Behavior**: registry type, mode, format, PII/range/expiry.
22. **Edge Cases**: concurrency, duplicate, late event, unknown provider result.
23. **Acceptance Criteria**: testable Given/When/Then hoặc tương đương.
24. **Notes / Why**: dùng đúng sáu note type.
25. **Dependencies**: domain/service/screen/decision bắt buộc.

## 6. Standard field definition

Field có ý nghĩa business MUST dùng schema này hoặc reference một định nghĩa duy nhất trong Business Data Dictionary.

| Thuộc tính | Nội dung |
| --- | --- |
| Field | Tên canonical; UI label MAY khác. |
| Meaning | Điều field biểu diễn trong business. |
| Source of truth | Entity/event/snapshot/read model sở hữu dữ liệu. |
| Type/unit | Type logic, currency, timezone, enum hoặc unit. |
| Nullable | Có/không và ý nghĩa của null. |
| Rule | Invariant, lifecycle, validation, masking hoặc calculation. |
| Why it exists | Quyết định/action/KPI nào cần field. |
| Do not confuse with | Khái niệm gần nhưng khác. |

Generic technical fields như `created_at`, `updated_at`, `version` MAY chỉ định nghĩa một lần ở global dictionary rồi reference. Field tiền MUST ghi integer/currency; timestamp MUST ghi UTC persistence và cutoff semantics.

## 7. Standard KPI definition

| Thuộc tính | Nội dung bắt buộc |
| --- | --- |
| Name / ID | Tên người dùng và ID ổn định. |
| Business meaning | KPI trả lời câu hỏi gì. |
| Formula | Tập record, phép tính, điều kiện loại trừ. |
| Source | Source entities/events và read model. |
| Time/cutoff semantics | Event time nào, timezone, range và cutoff. |
| Freshness | Kỳ vọng refresh/watermark; nếu chưa quyết định ghi OPEN DECISION. |
| Null/stale behavior | MUST NOT đổi missing/stale thành 0; cách badge/block action. |
| Drill-down | Màn/filter tái tạo tập dữ liệu KPI. |
| Why | Quyết định nghiệp vụ được hỗ trợ. |
| Do not confuse with | Metric gần nhưng khác. |

Dashboard KPI là derived view/materialized aggregate trừ official closed-period snapshot. Mỗi materialized metric MUST có `computed_at`, source watermark và metric/rule version.

## 8. Standard action definition

| Thuộc tính | Nội dung bắt buộc |
| --- | --- |
| Action / Purpose | Tên command và outcome. |
| Preconditions | State, data freshness, actor separation, validation. |
| Permission | Key server kiểm tra; UI guard chỉ hỗ trợ UX. |
| Input | Field/reason/evidence/expected version. |
| Confirmation | Có/không; nội dung hậu quả và MFA nếu cần. |
| Mutation | Aggregate thay đổi hoặc request được tạo. |
| Result | New state, ID, navigation/notification. |
| Failure behavior | Validation, conflict, stale, provider unavailable/unknown. |
| Audit | Event, actor, object, reason, correlation ID. |
| Idempotency/concurrency | `idempotency_key`, `expected_version`, retry policy nếu liên quan. |
| Why | Rủi ro/nhu cầu được giải quyết. |

Financial action MUST chỉ ra maker, checker, execution, provider result và ledger effect khi các bước đó tồn tại. `APPROVED` MUST NOT được mô tả là `SUCCEEDED`. Kết quả provider `UNKNOWN` MUST NOT tự động retry bằng key mới.

## 9. Standard acceptance criteria

Acceptance criterion MUST testable, có input/state và observable result. Dùng Given/When/Then hoặc câu tương đương:

```text
Given payment_status = PAID_CONFIRMED và reconciliation_status = UNMATCHED
When operator tạo exact match với rule hợp lệ và variance = 0
Then match record lưu rule_version, actor, object IDs và audit event RECON_MATCHED.
```

Mỗi màn P0 MUST cover: happy path; permission denied; empty; loading; error; stale/partial; canonical status mapping; critical action/audit; export nếu có. Không dùng “works correctly”, “display properly”, “handles errors” hoặc tiêu chí chỉ kiểm tra màu/layout mà không kiểm tra semantics.

## 10. Cross-cutting documentation rules

- Mọi PRD MUST khai báo canonical version, source priority và danh sách tài liệu bị supersede.
- Mỗi product surface chỉ có một active PRD. Không tạo bản `UI_Ready`, `final`, `copy` hoặc parallel version để chứa framework/UI decisions.
- Shared admin UI và architecture MUST reference `../JobFree_Admin_UI_System_Design_shadcn.md`; PRD không copy danh sách component, token hoặc folder structure.
- Money, state, permission, PII, event và metric MUST có một định nghĩa authoritative; các màn reference, không copy rồi sửa.
- UI MUST NOT là source of truth. Label, color và visibility không thay server authorization hoặc lifecycle guard.
- Missing, null, stale, partial và zero là các trạng thái khác nhau; tài liệu MUST mô tả riêng.
- Historical amount MUST dùng committed snapshot; MUST NOT recompute bằng current config.
- Diagram ASCII dùng cho workflow; table dùng cho mappings; prose giải thích WHY và boundary.
- Không tạo table cho mỗi screen. Screen map tới domain entities và read models.
- Open Decision chỉ chứa vấn đề chưa được authority cao hơn resolve, có owner và impact.
- Change request phải ghi decision, reason, owner, effective date, affected screen/API/schema/test và migration/backfill.

## 11. PRD quality gate

Một PRD v2 chỉ được sign-off khi:

- Tất cả màn trong scope có đủ template semantics và route/priority nhất quán.
- P0 requirement có ID, permission, source/read model, audit và acceptance criteria traceable.
- Canonical state/money/invariant không bị copy sai hoặc tạo contract cạnh tranh.
- Field/KPI/action quan trọng có định nghĩa hoặc reference duy nhất.
- Empty/loading/error/stale/partial/forbidden được mô tả.
- Export, PII, masking, signed access và retention reference đúng policy.
- Open Decisions không chứa conflict đã resolve.
- Product, domain owner, Backend/Data, QA và Security/Finance review phần thuộc trách nhiệm.
