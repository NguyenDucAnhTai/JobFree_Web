export type BlogTopic =
  | "operations"
  | "employer"
  | "worker"
  | "flexible-work"
  | "product";

export type BlogSection = {
  heading?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  note?: string;
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  topic: BlogTopic;
  topicLabel: string;
  featured?: boolean;
  sections: readonly BlogSection[];
  relatedSlugs?: readonly string[];
};

export const blogTopics: readonly { id: BlogTopic; label: string }[] = [
  { id: "operations", label: "Vận hành" },
  { id: "employer", label: "Employer" },
  { id: "worker", label: "Worker" },
  { id: "flexible-work", label: "Công việc linh hoạt" },
  { id: "product", label: "Sản phẩm" },
];

export const blogArticles = [
  {
    slug: "mo-ta-ca-lam-ro-rang",
    title: "Một ca làm rõ ràng bắt đầu từ sáu thông tin",
    description:
      "Nhiệm vụ, thời gian, địa điểm, mức trả hiển thị, kỳ vọng và điều cần chuẩn bị giúp Worker hình dung ca trước khi xác nhận.",
    topic: "employer",
    topicLabel: "Dành cho Employer",
    featured: true,
    sections: [
      {
        heading: "Mô tả nhiệm vụ bằng hành động cụ thể",
        paragraphs: [
          "Tên vị trí cho biết vai trò, nhưng chưa chắc nói rõ phần việc trong ca. Thay vì chỉ ghi “hỗ trợ cửa hàng”, hãy mô tả những việc cần làm như sắp xếp hàng, đóng gói đơn hay chuẩn bị khu vực phục vụ.",
          "Một mô tả tốt giúp người đọc hiểu phạm vi công việc mà không phải đoán. Nếu có phần việc chính và phần hỗ trợ, hãy nói rõ đâu là trọng tâm của ca.",
        ],
      },
      {
        heading: "Đặt thời gian và địa điểm thật dễ tìm",
        paragraphs: [
          "Ghi ngày làm, giờ bắt đầu, giờ kết thúc và địa chỉ hoặc điểm gặp cụ thể. Nếu địa điểm có nhiều cổng, tầng hoặc quầy tiếp nhận, hướng dẫn ngắn đó có thể giúp Worker đến đúng chỗ.",
          "Thông tin thời gian nên thống nhất từ tiêu đề đến phần mô tả. Tránh để người nhận phải hỏi lại ca bắt đầu vào ngày nào hoặc kéo dài đến mấy giờ.",
        ],
      },
      {
        heading: "Nói rõ mức trả và kỳ vọng",
        paragraphs: [
          "Cho biết mức trả được hiển thị cho ca và những điều kiện liên quan đã được xác nhận. Nếu cần trang phục, kỹ năng, dụng cụ hoặc kinh nghiệm cụ thể, hãy nêu trước để người đọc cân nhắc.",
        ],
        bullets: [
          "Điểm liên hệ tại nơi làm việc",
          "Cách ghi nhận có mặt và kết thúc ca",
          "Điều Worker nên chuẩn bị trước khi đến",
        ],
        note: "Mỗi ca có yêu cầu riêng. Chỉ đưa vào mô tả những điều đã được thống nhất cho ca đó.",
      },
    ],
    relatedSlugs: ["employer-chuan-bi-truoc-ca", "worker-can-kiem-tra-gi-truoc-khi-nhan-ca"],
  },
  {
    slug: "worker-can-kiem-tra-gi-truoc-khi-nhan-ca",
    title: "Worker nên xem gì trước khi xác nhận một ca?",
    description:
      "Một lượt rà soát ngắn giúp bạn hiểu công việc, lịch trình và những điều cần chuẩn bị trước khi quyết định.",
    topic: "worker",
    topicLabel: "Dành cho Worker",
    sections: [
      {
        heading: "Đọc nhiệm vụ, không chỉ tên công việc",
        paragraphs: [
          "Hãy xem phần việc cụ thể trong ca và phân biệt nhiệm vụ chính với các yêu cầu hỗ trợ. Nếu mô tả chưa cho biết bạn sẽ làm gì, nên tìm hướng dẫn liên hệ được cung cấp cho ca trước khi xác nhận.",
        ],
      },
      {
        heading: "Đối chiếu lịch và địa điểm với kế hoạch của bạn",
        paragraphs: [
          "Kiểm tra ngày, giờ bắt đầu, thời lượng và vị trí làm việc. Tính cả thời gian di chuyển và những hướng dẫn cần thiết để tìm đúng điểm gặp.",
          "Một ca phù hợp không chỉ nằm ở khung giờ. Địa điểm, điều kiện làm việc và việc bạn có thể đến đúng giờ cũng cần được cân nhắc.",
        ],
      },
      {
        heading: "Xem yêu cầu và mức trả hiển thị",
        paragraphs: [
          "Đọc các kỹ năng, trang phục, dụng cụ hoặc điều kiện khác được nêu cho ca. Kiểm tra mức trả hiển thị cùng thông tin liên quan trước khi xác nhận; không nên giả định những chi tiết chưa được ghi rõ.",
        ],
        bullets: [
          "Nhiệm vụ và kỳ vọng trong ca",
          "Thời gian, địa chỉ và điểm liên hệ",
          "Yêu cầu cần đáp ứng và mức trả được hiển thị",
        ],
      },
    ],
    relatedSlugs: ["mo-ta-ca-lam-ro-rang", "matching-khong-phai-xac-nhan-ca"],
  },
  {
    slug: "matching-khong-phai-xac-nhan-ca",
    title: "Matching và xác nhận ca là hai việc khác nhau",
    description:
      "Được đưa vào danh sách phù hợp mới là một bước trong quy trình. Trạng thái xác nhận cần được theo dõi riêng.",
    topic: "operations",
    topicLabel: "Góc vận hành",
    sections: [
      {
        heading: "Matching giúp đưa lựa chọn đến gần nhau",
        paragraphs: [
          "Thông tin công việc và hồ sơ liên quan có thể được dùng để tìm các lựa chọn phù hợp. Ở bước này, Employer có thể xem xét người được gợi ý và Worker có thể cân nhắc ca được giới thiệu.",
          "Một gợi ý phù hợp không tự trả lời mọi câu hỏi về lịch, nhiệm vụ hoặc kỳ vọng. Hai bên vẫn cần xem thông tin của ca trước khi đi tiếp.",
        ],
      },
      {
        heading: "Xác nhận ghi nhận quyết định nhận ca",
        paragraphs: [
          "Xác nhận là trạng thái riêng cho biết các bên đã đồng ý với ca theo quy trình áp dụng. Vì vậy, việc một hồ sơ xuất hiện trong kết quả matching không nên được hiểu là người đó đã nhận ca.",
        ],
      },
      {
        heading: "Theo dõi từng mốc bằng thông tin rõ ràng",
        paragraphs: [
          "Mô tả đúng các bước giúp Employer biết khi nào cần chờ phản hồi, còn Worker biết khi nào quyết định của mình đã được ghi nhận. Nếu có thay đổi về ca, hãy xem lại trạng thái và nội dung cập nhật thay vì dựa vào một thông báo cũ.",
        ],
        note: "Matching, xác nhận, điểm danh và hoàn thành là các mốc riêng trong quá trình vận hành ca.",
      },
    ],
    relatedSlugs: ["check-in-out-va-van-hanh-ca", "worker-can-kiem-tra-gi-truoc-khi-nhan-ca"],
  },
  {
    slug: "check-in-out-va-van-hanh-ca",
    title: "Check-in/out giúp thông tin ca được liền mạch",
    description:
      "Ghi nhận thời điểm bắt đầu và kết thúc tạo thêm căn cứ để các bên theo dõi diễn biến của ca.",
    topic: "operations",
    topicLabel: "Góc vận hành",
    sections: [
      {
        heading: "Một ca cần biết các mốc quan trọng",
        paragraphs: [
          "Khi nhiều người cùng làm theo lịch, việc ghi nhận thời điểm có mặt và rời ca giúp thông tin không chỉ nằm trong tin nhắn rời rạc. Employer có thể đối chiếu trạng thái vận hành, còn Worker có thể xem lại các mốc liên quan đến ca của mình.",
        ],
      },
      {
        heading: "Quy trình rõ từ trước khi bắt đầu",
        paragraphs: [
          "Trước ca, nên nói rõ điểm check-in, cách thực hiện và người có thể hỗ trợ nếu có vướng mắc. Nếu dùng QR hoặc một cách ghi nhận khác, hướng dẫn nên dễ tìm và phù hợp với địa điểm làm việc.",
          "Kết thúc ca cũng cần có bước ghi nhận tương ứng. Cách thực hiện cụ thể phụ thuộc quy trình được áp dụng cho từng ca.",
        ],
      },
      {
        heading: "Ghi nhận hỗ trợ đối chiếu, không thay thế trao đổi",
        paragraphs: [
          "Dữ liệu điểm danh có thể giúp hai bên xem lại thời điểm theo quy trình. Nó không tự giải thích mọi tình huống phát sinh hoặc thay thế việc cập nhật khi lịch và nhiệm vụ thay đổi.",
        ],
        note: "Check-in/out hỗ trợ sự rõ ràng trong vận hành, không phải cam kết loại bỏ mọi sai lệch.",
      },
    ],
    relatedSlugs: ["matching-khong-phai-xac-nhan-ca", "employer-chuan-bi-truoc-ca"],
  },
  {
    slug: "employer-chuan-bi-truoc-ca",
    title: "Employer nên chuẩn bị gì trước giờ bắt đầu?",
    description:
      "Một điểm liên hệ rõ, hướng dẫn dễ tìm và phạm vi nhiệm vụ thống nhất giúp buổi bắt đầu bớt lúng túng.",
    topic: "employer",
    topicLabel: "Dành cho Employer",
    sections: [
      {
        heading: "Chọn đầu mối tại địa điểm",
        paragraphs: [
          "Cho Worker biết nên liên hệ với ai khi đến nơi và cách nhận ra điểm gặp. Nếu người phụ trách thay đổi theo ca, cập nhật lại thông tin trước giờ làm.",
        ],
      },
      {
        heading: "Chuẩn bị hướng dẫn và phạm vi công việc",
        paragraphs: [
          "Đảm bảo phần việc chính, thứ tự ưu tiên và yêu cầu cần thiết đã được thống nhất. Dụng cụ, trang phục hoặc khu vực cần tiếp cận cũng nên được chuẩn bị nếu ca yêu cầu.",
          "Khi nhiều Worker cùng tham gia, hãy cho biết cách phân chia đầu việc để mọi người không phải tự suy đoán vai trò của nhau.",
        ],
      },
      {
        heading: "Nói rõ cách điểm danh và cập nhật thay đổi",
        paragraphs: [
          "Nhắc lại cách ghi nhận check-in/out và những mốc cần lưu ý. Nếu thời gian, địa điểm hoặc nhiệm vụ đổi, hãy thông báo qua kênh được dùng cho ca để các bên cùng nắm thông tin mới.",
        ],
        bullets: [
          "Điểm liên hệ và vị trí gặp",
          "Nhiệm vụ cùng hướng dẫn cần thiết",
          "Cách ghi nhận có mặt và kết thúc ca",
          "Kênh cập nhật nếu thông tin thay đổi",
        ],
      },
    ],
    relatedSlugs: ["mo-ta-ca-lam-ro-rang", "check-in-out-va-van-hanh-ca"],
  },
  {
    slug: "hoan-thanh-ca-va-thanh-toan-la-hai-buoc-khac-nhau",
    title: "Hoàn thành ca và thanh toán không phải một mốc",
    description:
      "Hoàn thành công việc, xác nhận thanh toán, giải ngân và chi trả cho Worker là các bước khác nhau cần được hiểu riêng.",
    topic: "product",
    topicLabel: "Sản phẩm & quy trình",
    sections: [
      {
        heading: "Hoàn thành ghi nhận công việc đã kết thúc",
        paragraphs: [
          "Khi ca kết thúc, trạng thái hoàn thành phản ánh bước ghi nhận công việc theo quy trình áp dụng. Thông tin điểm danh hoặc xác nhận liên quan có thể được đối chiếu khi phù hợp.",
        ],
      },
      {
        heading: "Các bước tài chính vẫn cần được theo dõi riêng",
        paragraphs: [
          "Hoàn thành ca không tự đồng nghĩa Employer đã xác nhận thanh toán. Việc xác nhận thanh toán cũng không đồng nghĩa khoản tiền đã được giải ngân hoặc Worker đã nhận được tiền.",
          "Vì vậy, nên xem trạng thái ở đúng bước đang diễn ra thay vì gộp mọi việc thành một thông báo “đã xong”. Chi tiết áp dụng có thể phụ thuộc quy trình của ca.",
        ],
        bullets: [
          "Xác nhận công việc hoàn thành",
          "Xác nhận thanh toán",
          "Giải ngân",
          "Chi trả cho Worker",
        ],
        note: "Bài viết không xác định thời hạn chi trả. Hãy tham khảo thông tin được cung cấp cho ca cụ thể.",
      },
    ],
    relatedSlugs: ["matching-khong-phai-xac-nhan-ca", "worker-can-kiem-tra-gi-truoc-khi-nhan-ca"],
  },
] satisfies readonly BlogArticle[];

export function findBlogArticle(slug: string | undefined): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
