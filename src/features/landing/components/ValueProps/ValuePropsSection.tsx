const valueCards = [
  {
    title: "Đăng ca linh hoạt",
    desc: "Thiết lập số lượng worker, thời gian, địa điểm, kỹ năng và yêu cầu ca chỉ trong một form gọn.",
    icon: "clock",
    dark: false,
    className: "lg:col-span-8 bg-white text-ink border-ink/80 min-h-[180px]",
  },
  {
    title: "Mức trả đề xuất",
    desc: "Gợi ý mức thù lao theo loại việc, khu vực và độ gấp để tăng khả năng nhận ca nhanh.",
    icon: "money",
    dark: false,
    className:
      "lg:col-span-4 bg-brand-yellow text-ink border-ink/90 min-h-[180px]",
  },
  {
    title: "Đa điểm",
    desc: "Theo dõi nhiều cửa hàng, kho hoặc điểm sự kiện trên cùng một dashboard vận hành.",
    icon: "pin",
    dark: false,
    className: "lg:col-span-4 bg-white text-ink border-ink/80 min-h-[190px]",
  },
  {
    title: "QR Check-in/out",
    desc: "Worker quét mã tại điểm làm để ghi nhận giờ bắt đầu, kết thúc và proof hoàn thành minh bạch.",
    icon: "qr",
    dark: true,
    className: "lg:col-span-8 bg-ink text-white border-ink min-h-[190px]",
  },
  {
    title: "Lịch sử uy tín",
    desc: "Xem rating, tỷ lệ hoàn thành, phản hồi và lịch sử ca trước khi chọn worker.",
    icon: "history",
    dark: false,
    className: "lg:col-span-4 bg-white text-ink border-ink/80 min-h-[176px]",
  },
  {
    title: "Hỗ trợ 24/7",
    desc: "Có kênh hỗ trợ khi phát sinh hủy ca, thiếu người, tranh chấp hoặc cần điều phối nhanh.",
    icon: "support",
    dark: false,
    className: "lg:col-span-4 bg-white text-ink border-ink/80 min-h-[176px]",
  },
  {
    title: "Tăng tốc vận hành",
    desc: "Giảm thời gian gọi điện, nhắn tin thủ công và gom dữ liệu vận hành về một nơi.",
    icon: "rocket",
    dark: false,
    className:
      "lg:col-span-4 bg-brand-yellow-soft text-ink border-ink/90 min-h-[176px]",
  },
] as const;

export default function ValuePropsSection() {
  return (
    <section
      id="solutions"
      className="relative w-full overflow-hidden bg-surface-sand px-page-x py-section-y"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="mb-10 max-w-[68ch] lg:mb-12">
          <h2 className="font-display text-title-section font-black text-ink">
            Hãy đến với JobFree để được
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {valueCards.map((card) => (
            <article
              key={card.title}
              className={`group rounded-card border-2 p-6 shadow-[0_10px_0_rgba(16,16,16,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card-soft lg:p-7 ${card.className}`}
            >
              <div className="flex h-full flex-col">
                <div
                  className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-current/15 ${
                    card.dark
                      ? "bg-brand-yellow text-ink"
                      : "bg-surface-sand text-current"
                  }`}
                >
                  <FeatureIcon name={card.icon} />
                </div>

                <h3 className="max-w-[18ch] font-display text-title-sub font-black">
                  {card.title}
                </h3>

                <p
                  className={`mt-4 max-w-[62ch] text-body-sm font-medium ${
                    card.dark ? "text-white/76" : "text-ink-soft"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({
  name,
}: {
  name: "clock" | "money" | "pin" | "qr" | "history" | "support" | "rocket";
}) {
  const common = "h-6 w-6";

  if (name === "clock") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    );
  }

  if (name === "money") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16v10H4z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 11h.01M16 13h.01"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        />
      </svg>
    );
  }

  if (name === "qr") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 14h2v2h-2zM18 14h2M14 18h6M18 20v-4"
        />
      </svg>
    );
  }

  if (name === "history") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12a8 8 0 1 0 2.34-5.66"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h5M12 8v5l3 2"
        />
      </svg>
    );
  }

  if (name === "support") {
    return (
      <svg
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 15a6 6 0 1 0-12 0"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15v-2a2 2 0 0 1 2-2h1v6H7a2 2 0 0 1-2-2ZM19 15v-2a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2ZM16 17c0 2-1.5 3-4 3"
        />
      </svg>
    );
  }

  return (
    <svg
      className={common}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.4}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"
      />
    </svg>
  );
}
