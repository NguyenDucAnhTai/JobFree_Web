# JobFree Documentation Index

Status: CURRENT  
Owner: Product + Architecture  
Last standardized: 2026-10-07

## 1. Three implementation documents

The delivery team starts from exactly these three documents. They are the only active implementation entry points for the two admin products.

| Source of Truth | Owns |
| --- | --- |
| `JobFree_PRD_Admin_Data_Source_of_Truth.md` | Complete Admin Data product scope, screens, maker workflows, data semantics, permissions, acceptance criteria, export application and open decisions |
| `JobFree_PRD_Admin_System_Source_of_Truth.md` | Complete Admin System product scope, screens, commands, checker/executor workflows, access/configuration, acceptance criteria and open decisions |
| `JobFree_Admin_UI_System_Design_shadcn.md` | One shared shadcn/ui architecture and component system for both admin products; landing page remains unchanged |

There is no active `UI_Ready`, `final`, `copy` or alternate PRD. Changes are made in place to the owning Source of Truth.

## 2. Reading rule

1. Read the relevant Admin PRD Source of Truth for product behavior.
2. Read the shared shadcn UI System Design for implementation structure and UI behavior.
3. Open a file under `supporting/` only when a precise canonical, API, export or traceability detail is needed.
4. Never implement from retired sources in Git history.

## 3. Supporting contracts

Supporting files are not parallel PRDs and are not starting points for feature work. They preserve detailed shared contracts referenced by the two Source of Truth PRDs.

| Supporting file | Purpose |
| --- | --- |
| `supporting/JobFree_Canonical_Data_Model_Conflict_Resolution_v1.1.md` | Detailed canonical entity/state/money/security invariants and conflict history |
| `supporting/JobFree_API_Contract_v2.0.md` | HTTP, DTO, error, concurrency and command contract |
| `supporting/JobFree_PRD_Export_Reports_v2.0.md` | Detailed shared export lifecycle and registry contract |
| `supporting/JobFree_PRD_Documentation_Standard_v1.0.md` | Authoring and acceptance-criteria convention |
| `supporting/JobFree_PRD_Master_Traceability_v2.0.md` | Cross-document P0 traceability and sign-off evidence |

Conflict precedence is: canonical invariant -> owning Admin PRD Source of Truth -> shared UI System Design/API Contract -> implementation. A supporting file cannot create a competing Admin product requirement.

## 4. Surface ownership

| Surface | Product authority | UI authority |
| --- | --- | --- |
| Admin Data | `JobFree_PRD_Admin_Data_Source_of_Truth.md` | `JobFree_Admin_UI_System_Design_shadcn.md` |
| Admin System | `JobFree_PRD_Admin_System_Source_of_Truth.md` | `JobFree_Admin_UI_System_Design_shadcn.md` |
| Landing/public pages | Existing approved implementation and public requirements | Existing public layout/styles; no admin token or component leakage |

## 5. Retired sources

The former Admin `UI_Ready_v1.0` files, Export Supplement and idea document were consolidated and removed from the active tree. They remain recoverable through Git history for traceability only and MUST NOT drive implementation.

## 6. Change rule

- Product behavior changes update one owning Source of Truth PRD in place.
- Shared Admin UI/framework/component changes update only the shadcn UI System Design.
- Shared entity/state/money/security changes update Canonical first, then the affected Source of Truth PRD.
- API or export implementation details update their supporting contract and affected acceptance tests.
- Every P0 change keeps stable screen IDs, requirement IDs and acceptance IDs.
