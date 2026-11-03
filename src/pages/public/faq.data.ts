export type FaqGroup = {
  id: string;
  title: string;
  items: readonly {
    id: string;
    question: string;
    answer: string;
  }[];
};

export const faqGroups: readonly FaqGroup[] = [
  {
    id: "getting-started",
    title: "Bắt đầu",
    items: [
      { id: "who", question: "JobFree dành cho ai?", answer: "JobFree hướng đến Employer cần nhân sự theo ca ngắn và Worker muốn cân nhắc các công việc phù hợp với thời gian, địa điểm và yêu cầu của mình." },
      { id: "categories", question: "JobFree hỗ trợ loại công việc nào?", answer: "Các nhóm được giới thiệu gồm F&B, Retail, kho vận, sự kiện, Promotion / Activation và Hospitality. Nhiệm vụ cụ thể phụ thuộc nội dung từng ca." },
      { id: "launch", question: "JobFree đã hoạt động chính thức chưa?", answer: "JobFree đang trong giai đoạn pilot. Khu vực và quy trình áp dụng sẽ được trao đổi theo nhu cầu thực tế." },
      { id: "pilot", question: "Làm sao để tham gia pilot?", answer: "Chọn đăng ký theo vai trò Employer hoặc Worker tại trang chủ để xem thông tin pilot. Biểu mẫu hiện là giao diện xem trước, chưa gửi hoặc lưu thông tin trực tuyến." },
    ],
  },
  {
    id: "employers",
    title: "Dành cho Employer",
    items: [
      { id: "shift-info", question: "Tôi cần cung cấp gì khi đăng một ca?", answer: "Mô tả loại công việc, nhiệm vụ, thời gian, địa điểm, số lượng Worker cần thiết, mức trả và yêu cầu liên quan để Worker có cơ sở cân nhắc." },
      { id: "matching", question: "Worker được matching như thế nào?", answer: "JobFree hỗ trợ kết nối dựa trên thông tin ca và hồ sơ liên quan. Việc matching không đồng nghĩa ca đã được xác nhận; trạng thái cụ thể được theo dõi riêng." },
      { id: "tracking", question: "Tôi theo dõi tình trạng ca ở đâu?", answer: "Thông tin và trạng thái ca được theo dõi theo luồng áp dụng cho sản phẩm. Các bước matching, xác nhận, điểm danh và hoàn thành là những mốc riêng." },
      { id: "attendance", question: "Check-in/out hoạt động thế nào?", answer: "Ca có thể ghi nhận điểm danh theo quy trình áp dụng, chẳng hạn check-in/out. Chi tiết thao tác sẽ được thể hiện trong hướng dẫn dành cho ca đó." },
      { id: "changes", question: "Nếu cần điều chỉnh hoặc có vấn đề trong ca thì sao?", answer: "Hãy kiểm tra hướng dẫn và kênh liên hệ được cung cấp cho ca. Cách xử lý cụ thể phụ thuộc chính sách áp dụng; JobFree không cam kết thời gian xử lý hay thay Worker tức thì." },
    ],
  },
  {
    id: "workers",
    title: "Dành cho Worker",
    items: [
      { id: "before-accept", question: "Tôi biết gì trước khi nhận việc?", answer: "Thông tin ca nên nêu rõ nhiệm vụ, thời gian, địa điểm, mức trả và yêu cầu để bạn tự cân nhắc trước khi xác nhận." },
      { id: "can-decline", question: "Tôi có bắt buộc nhận job được đề xuất không?", answer: "Bạn có thể xem thông tin và cân nhắc mức phù hợp trước khi xác nhận ca. Việc nhận ca không nên được hiểu là tự động chỉ vì một công việc được đề xuất." },
      { id: "worker-attendance", question: "Check-in/out hoạt động thế nào?", answer: "Việc điểm danh được ghi nhận theo quy trình áp dụng cho ca. Hãy xem hướng dẫn hiển thị trước hoặc trong ca để biết cách thực hiện." },
      { id: "after-shift", question: "Sau khi hoàn thành ca thì điều gì xảy ra?", answer: "Trạng thái hoàn thành được ghi nhận theo quy trình áp dụng. Xác nhận hoàn thành và các bước thanh toán tiếp theo là những mốc riêng." },
      { id: "payout", question: "Khi nào tôi nhận được tiền?", answer: "Hoàn thành ca không đồng nghĩa tiền đã được chi trả. Thời điểm chi trả phụ thuộc quy trình áp dụng cho ca và được thông tin theo các bước liên quan; JobFree chưa công bố một thời hạn chung." },
    ],
  },
  {
    id: "costs",
    title: "Chi phí & thanh toán",
    items: [
      { id: "cost-breakdown", question: "Chi phí Employer gồm những gì?", answer: "Cấu trúc có thể gồm mức trả Worker, phí nền tảng, phí ưu tiên nếu có và khoản trừ voucher hợp lệ để xác định tổng Employer. Giá thực tế được hiển thị theo quy tắc áp dụng cho ca trước khi xác nhận." },
      { id: "voucher", question: "Voucher được áp dụng như thế nào?", answer: "Voucher chỉ được tính khi đáp ứng điều kiện của chương trình áp dụng. Điều kiện và mức điều chỉnh liên quan cần được hiển thị trước khi xác nhận chi phí." },
      { id: "completion-payment", question: "Hoàn thành ca có đồng nghĩa Worker đã được trả tiền chưa?", answer: "Không. Xác nhận thanh toán, hoàn thành ca, giải ngân và chi trả cho Worker là các mốc riêng; một mốc không tự động xác nhận mốc còn lại." },
    ],
  },
  {
    id: "transparency",
    title: "An toàn & minh bạch",
    items: [
      { id: "records", question: "JobFree lưu lại những thông tin nào của ca?", answer: "Theo luồng sản phẩm, thông tin có thể gồm nội dung ca, matching và xác nhận, điểm danh, trạng thái hoàn thành và lịch sử liên quan khi phù hợp." },
      { id: "rating", question: "Rating dùng để làm gì?", answer: "Đánh giá có thể được ghi nhận sau ca để tham khảo chất lượng và lịch sử làm việc. Cách sử dụng cụ thể tuân theo chính sách sản phẩm áp dụng." },
      { id: "shift-changes", question: "Nếu thông tin ca thay đổi thì tôi nên làm gì?", answer: "Hãy kiểm tra lại thông tin cập nhật và hướng dẫn của ca trước khi tiếp tục. Các thay đổi có thể ảnh hưởng đến yêu cầu xác nhận theo chính sách áp dụng." },
    ],
  },
];
