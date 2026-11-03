import type { LucideIcon } from "lucide-react";
import {
  Hotel,
  Megaphone,
  PartyPopper,
  Store,
  Truck,
  Utensils,
} from "lucide-react";

export type CategoryVisualVariant =
  | "service-rhythm"
  | "storefront"
  | "operational-lanes"
  | "event-timeline"
  | "campaign-field"
  | "guest-service";

export type JobCategory = {
  slug: string;
  shortLabel: string;
  title: string;
  heroProposition: string;
  description: string;
  icon: LucideIcon;
  employerUseCases: readonly string[];
  typicalTasks: readonly string[];
  workerExpectations: readonly string[];
  usefulShiftInformation: readonly string[];
  visualVariant: CategoryVisualVariant;
};

export const jobCategories = [
  {
    slug: "fnb",
    shortLabel: "F&B",
    title: "F&B",
    heroProposition: "Ca đông khách cần thêm người đúng lúc.",
    description:
      "Mô tả rõ khu vực làm việc, nhiệm vụ trong ca và thời gian cần hỗ trợ để Employer và Worker cùng hiểu trước khi xác nhận.",
    icon: Utensils,
    employerUseCases: [
      "Bổ sung người vào khung giờ đông khách",
      "Hỗ trợ chuẩn bị hoặc sắp xếp khu vực",
      "Hỗ trợ phục vụ, runner hoặc thu dọn theo yêu cầu ca",
    ],
    typicalTasks: [
      "Chuẩn bị khu vực phục vụ",
      "Hỗ trợ chuyển món hoặc vật dụng",
      "Thu dọn và sắp xếp lại khu vực",
    ],
    workerExpectations: [
      "Đọc nhiệm vụ và khu vực làm việc được mô tả cho ca",
      "Kiểm tra thời gian bắt đầu, thời lượng và địa điểm trước khi xác nhận",
      "Xem yêu cầu về trang phục hoặc dụng cụ nếu Employer nêu",
    ],
    usefulShiftInformation: [
      "Khu vực cần hỗ trợ và người hướng dẫn tại điểm làm",
      "Nhiệm vụ cụ thể trong ca",
      "Trang phục hoặc vật dụng cần chuẩn bị, nếu có",
    ],
    visualVariant: "service-rhythm",
  },
  {
    slug: "retail",
    shortLabel: "Retail",
    title: "Retail",
    heroProposition: "Mỗi cửa hàng có nhịp vận hành riêng.",
    description:
      "Từ bổ sung hàng đến hỗ trợ khách tại cửa hàng, thông tin ca nên nói rõ khu vực, nhiệm vụ và thời gian cần có mặt.",
    icon: Store,
    employerUseCases: [
      "Bổ sung nhân sự theo khung giờ của cửa hàng",
      "Hỗ trợ sắp xếp hoặc kiểm tra hàng hóa",
      "Hỗ trợ khách theo phạm vi công việc đã mô tả",
    ],
    typicalTasks: [
      "Sắp xếp và bổ sung sản phẩm",
      "Kiểm đếm hoặc dán nhãn theo hướng dẫn",
      "Hỗ trợ khu vực bán hàng",
    ],
    workerExpectations: [
      "Nắm rõ vị trí cửa hàng và khu vực phụ trách",
      "Xem hướng dẫn thao tác và yêu cầu giao tiếp nếu có",
      "Kiểm tra trang phục hoặc vật dụng do Employer yêu cầu",
    ],
    usefulShiftInformation: [
      "Tên hoặc vị trí điểm làm và khu vực tập trung",
      "Nhiệm vụ tại cửa hàng và người tiếp nhận",
      "Thời gian ca cùng yêu cầu trang phục nếu có",
    ],
    visualVariant: "storefront",
  },
  {
    slug: "warehouse",
    shortLabel: "Kho vận",
    title: "Kho vận",
    heroProposition: "Lượng đơn thay đổi, công việc cần rõ từng khâu.",
    description:
      "Ca kho vận có thể gồm nhiều nhiệm vụ khác nhau. Nêu rõ khu vực, thao tác dự kiến và yêu cầu trước khi Worker xác nhận.",
    icon: Truck,
    employerUseCases: [
      "Bổ sung người cho khâu xử lý đơn",
      "Hỗ trợ phân loại hoặc sắp xếp hàng",
      "Hỗ trợ nhập, xuất hoặc kiểm đếm theo hướng dẫn",
    ],
    typicalTasks: [
      "Phân loại hàng hóa",
      "Đóng gói hoặc gom đơn",
      "Hỗ trợ nhập, xuất và sắp xếp kho",
    ],
    workerExpectations: [
      "Đọc loại hàng và thao tác dự kiến trong ca",
      "Xác nhận vị trí làm việc, thời gian và điểm tập trung",
      "Kiểm tra yêu cầu về trang phục hoặc dụng cụ nếu được nêu",
    ],
    usefulShiftInformation: [
      "Khu vực kho và điểm tập trung",
      "Nhóm thao tác dự kiến và hướng dẫn tại chỗ",
      "Vật dụng hoặc trang phục cần có, nếu áp dụng",
    ],
    visualVariant: "operational-lanes",
  },
  {
    slug: "event",
    shortLabel: "Sự kiện",
    title: "Sự kiện",
    heroProposition: "Một sự kiện bắt đầu bằng lịch ca và vai trò rõ ràng.",
    description:
      "Khi cần đội ngũ theo từng mốc chương trình, thông tin thời gian, vị trí tập trung và phần việc giúp mọi người chuẩn bị tốt hơn.",
    icon: PartyPopper,
    employerUseCases: [
      "Hỗ trợ lắp đặt trước giờ mở cửa",
      "Bố trí nhân sự theo khu vực sự kiện",
      "Hỗ trợ đón khách hoặc thu dọn sau chương trình",
    ],
    typicalTasks: [
      "Sắp xếp khu vực hoặc vật dụng sự kiện",
      "Hướng dẫn khách theo phân công",
      "Hỗ trợ quầy check-in hoặc thu dọn",
    ],
    workerExpectations: [
      "Có mặt tại điểm tập trung theo lịch ca",
      "Nắm vai trò, khu vực và người điều phối được thông báo",
      "Kiểm tra trang phục hoặc vật dụng cần chuẩn bị",
    ],
    usefulShiftInformation: [
      "Địa điểm và điểm tập trung cụ thể",
      "Thời gian có mặt, thời gian kết thúc dự kiến",
      "Vai trò và đầu mối điều phối trong ca",
    ],
    visualVariant: "event-timeline",
  },
  {
    slug: "promotion",
    shortLabel: "Promotion / Activation",
    title: "Promotion / Activation",
    heroProposition: "Mỗi điểm triển khai cần nhiệm vụ dễ hiểu.",
    description:
      "Mô tả địa điểm, nội dung công việc và cách phối hợp tại điểm triển khai để Employer và Worker thống nhất kỳ vọng cho ca.",
    icon: Megaphone,
    employerUseCases: [
      "Bố trí người tại điểm giới thiệu sản phẩm",
      "Hỗ trợ phát tài liệu hoặc mẫu dùng thử theo hướng dẫn",
      "Chuẩn bị và sắp xếp khu vực hoạt động",
    ],
    typicalTasks: [
      "Giới thiệu thông tin đã được cung cấp",
      "Phát tài liệu hoặc mẫu theo hướng dẫn",
      "Sắp xếp vật dụng và khu vực triển khai",
    ],
    workerExpectations: [
      "Nắm nội dung cần giới thiệu và phạm vi nhiệm vụ",
      "Biết vị trí, thời gian và người hướng dẫn tại điểm làm",
      "Xem yêu cầu về trang phục hoặc vật dụng nếu có",
    ],
    usefulShiftInformation: [
      "Điểm triển khai và khu vực tập trung",
      "Nội dung cần truyền đạt và tài liệu được cung cấp",
      "Thời gian ca và hướng dẫn phối hợp tại chỗ",
    ],
    visualVariant: "campaign-field",
  },
  {
    slug: "hospitality",
    shortLabel: "Hospitality",
    title: "Hospitality",
    heroProposition: "Trải nghiệm đón tiếp bắt đầu từ vai trò cụ thể.",
    description:
      "Các ca hỗ trợ hospitality có thể khác nhau theo địa điểm và chương trình. Nêu rõ khu vực, nhiệm vụ và tiêu chuẩn Employer yêu cầu.",
    icon: Hotel,
    employerUseCases: [
      "Hỗ trợ đón tiếp theo lịch chương trình",
      "Bổ sung nhân sự cho khu vực phục vụ",
      "Hỗ trợ chuẩn bị hoặc thu dọn không gian",
    ],
    typicalTasks: [
      "Hướng dẫn khách theo phân công",
      "Chuẩn bị hoặc sắp xếp khu vực phục vụ",
      "Hỗ trợ phục vụ và thu dọn theo yêu cầu ca",
    ],
    workerExpectations: [
      "Đọc tiêu chuẩn phục vụ và phạm vi công việc được nêu",
      "Xác nhận thời gian, địa điểm và người phụ trách",
      "Kiểm tra yêu cầu về trang phục hoặc dụng cụ nếu có",
    ],
    usefulShiftInformation: [
      "Khu vực làm việc và điểm tập trung",
      "Vai trò trong chương trình hoặc khu vực phục vụ",
      "Trang phục, dụng cụ và hướng dẫn cần biết trước ca",
    ],
    visualVariant: "guest-service",
  },
] satisfies readonly JobCategory[];

export function findJobCategory(slug: string | undefined) {
  return jobCategories.find((category) => category.slug === slug);
}
