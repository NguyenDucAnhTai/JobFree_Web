import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const services = [
  {
    title: "Phụ shop / livestream",
    desc: "Đóng gói, dán tem, kiểm hàng, xử lý đơn sau livestream.",
    tag: "Retail ops",
    utility: "Tìm người theo ca gấp",
    tone: "from-[#171717] via-[#2D2412] to-[#FFD400]",
  },
  {
    title: "Phụ kho",
    desc: "Kiểm đếm, phân loại, gom đơn, dán nhãn và sắp xếp kho.",
    tag: "Warehouse",
    utility: "Bổ sung nhân sự lúc cao điểm",
    tone: "from-[#101010] via-[#263238] to-[#FFD400]",
  },
  {
    title: "Phụ setup sự kiện",
    desc: "Setup booth, bàn ghế, quầy check-in, hỗ trợ trước giờ chạy.",
    tag: "Event crew",
    utility: "Giảm rủi ro thiếu người",
    tone: "from-[#150F0A] via-[#403019] to-[#FFB800]",
  },
  {
    title: "Phụ chuyển đồ nhẹ",
    desc: "Hỗ trợ bê đồ nhỏ, sắp xếp phòng, chuyển vật dụng nhẹ.",
    tag: "Moving help",
    utility: "Worker gần khu vực",
    tone: "from-[#121212] via-[#2C2A24] to-[#FFE875]",
  },
  {
    title: "Phụ dọn sau tiệc",
    desc: "Dọn bàn, gom rác, lau sàn, hỗ trợ reset không gian.",
    tag: "Cleaning",
    utility: "Rõ giờ, rõ tiền",
    tone: "from-[#0D0D0D] via-[#1F2A1F] to-[#FFD400]",
  },
  {
    title: "Chờ hộ / xếp hàng hộ",
    desc: "Nhận ca ngắn, rõ thời điểm, phù hợp nhu cầu linh hoạt.",
    tag: "Errand",
    utility: "Theo dõi trạng thái",
    tone: "from-[#101010] via-[#2A1B3D] to-[#FFD400]",
  },
  {
    title: "Phụ bếp nhẹ",
    desc: "Sơ chế đơn giản, phụ bưng bê, hỗ trợ giờ cao điểm.",
    tag: "F&B support",
    utility: "Có đánh giá worker",
    tone: "from-[#16110C] via-[#3A2314] to-[#FFCD29]",
  },
  {
    title: "Đối tác vận hành",
    desc: "Theo dõi check-in/out, lịch sử uy tín và dữ liệu ca làm.",
    tag: "Ops control",
    utility: "QR proof rõ ràng",
    tone: "from-[#080A12] via-[#1B2430] to-[#FFD400]",
  },
];

const marqueeItems = [...services, ...services];

export default function ServicesMarqueeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      ref={ref}
      id="audience"
      className="relative w-full overflow-hidden bg-white py-section-y"
    >
      <Background />

      <motion.div
        className="relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="px-page-x">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.8fr)] lg:items-end"
          >
            <div>
              <h2 className="max-w-[14ch] font-display text-title-section font-black text-ink">
                JobFree phục vụ nhiều nhu cầu ca ngắn
              </h2>
            </div>

            <p className="max-w-[54ch] text-body font-medium leading-relaxed text-ink-soft lg:justify-self-end">
              Không chỉ là danh sách ngành nghề. Mỗi dịch vụ đi kèm tiện ích vận
              hành: worker gần bạn, mức trả rõ ràng, QR check-in/out và lịch sử
              uy tín.
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={1} className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12vw] bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12vw] bg-gradient-to-l from-white to-transparent" />

          <div
            className="flex w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div
              className="jobfree-marquee-track flex min-w-max gap-5 px-page-x will-change-transform cursor-pointer"
              style={{
                animation: "jobfree-marquee 42s linear infinite",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {marqueeItems.map((service, index) => (
                <ServiceCard
                  key={`${service.title}-${index}`}
                  service={service}
                />
              ))}
            </div>
          </div>

          <style>
            {`
    @keyframes jobfree-marquee {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .jobfree-marquee-track {
        animation: none !important;
        transform: translateX(0) !important;
      }
    }
  `}
          </style>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article className="group w-[280px] shrink-0 overflow-hidden rounded-[30px] border-2 border-ink bg-white shadow-[0_14px_0_rgba(16,16,16,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card-soft sm:w-[320px]">
      <div
        className={`relative h-[190px] overflow-hidden bg-gradient-to-br ${service.tone}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45)_0%,transparent_26%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.35)_0%,transparent_36%)]" />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute left-5 top-5 rounded-pill border border-white/20 bg-white/14 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.14em] text-white backdrop-blur">
          {service.tag}
        </div>

        <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/16 bg-black/30 p-4 text-white backdrop-blur-xl">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-brand-yellow">
            Tiện ích
          </p>
          <p className="mt-1 text-body-sm font-black leading-tight">
            {service.utility}
          </p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-body font-black tracking-[-0.03em] text-ink">
          {service.title}
        </h3>

        <p className="mt-2 text-body-xs font-medium leading-relaxed text-ink-muted">
          {service.desc}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-pill bg-surface-sand px-3 py-1.5 text-[0.66rem] font-black text-ink-muted">
            JobFree
          </span>

          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-yellow text-body-sm font-black text-ink transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </article>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-brand-yellow/12 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-surface-sand blur-3xl" />
    </div>
  );
}
