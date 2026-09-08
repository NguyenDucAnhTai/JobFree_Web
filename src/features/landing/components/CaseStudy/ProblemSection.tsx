import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

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

const oldFlow = [
  {
    label: "Đăng bài",
    text: "Chờ người tự thấy tin.",
  },
  {
    label: "Nhắn tay",
    text: "Phản hồi rời rạc qua Zalo/Facebook.",
  },
  {
    label: "Đến giờ mới biết",
    text: "Thiếu người, hủy ca, không có dữ liệu.",
  },
];

const newFlow = [
  {
    label: "Đăng ca",
    text: "Ca có thời gian, địa điểm, mức trả rõ ràng.",
  },
  {
    label: "Tự khớp",
    text: "Worker gần khu vực được đề xuất nhanh.",
  },
  {
    label: "Theo dõi",
    text: "Check-in/out, proof và đánh giá trong một luồng.",
  },
];

const outcomes = [
  "Biết rủi ro thiếu người sớm hơn",
  "Giảm phụ thuộc vào nhắn tin thủ công",
  "Có dữ liệu để vận hành ca sau tốt hơn",
];

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      data-header-theme="light"
      className="relative w-full overflow-hidden bg-white px-page-x py-section-y"
    >
      <Background />

      <motion.div
        className="relative z-10 w-full"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <HeaderBlock />

        <motion.div
          variants={fadeUp}
          custom={1}
          className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
        >
          <FlowCard
            type="old"
            eyebrow="Cách cũ"
            title="Tuyển dụng thụ động"
            subtitle="Đăng bài rồi chờ phản hồi"
            items={oldFlow}
          />

          <div className="flex items-center justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-brand-yellow text-2xl font-black text-ink shadow-[0_10px_0_rgba(16,16,16,0.12)] lg:h-16 lg:w-16">
              →
            </div>
          </div>

          <FlowCard
            type="new"
            eyebrow="JobFree"
            title="Vận hành chủ động"
            subtitle="Đăng ca, khớp worker, kiểm soát tiến độ"
            items={newFlow}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-8 grid gap-3 md:grid-cols-3 lg:mt-10"
        >
          {outcomes.map((item, index) => (
            <OutcomeCard key={item} index={index} text={item} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeaderBlock() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className="relative overflow-hidden rounded-card border-2 border-ink bg-surface-sand p-6 shadow-[0_12px_0_rgba(16,16,16,0.08)] lg:p-8 xl:p-10"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-yellow/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[38%] h-24 w-[42%] -rotate-6 bg-brand-yellow/25 blur-2xl" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-stretch">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-pill bg-ink px-4 py-2 text-body-xs font-black uppercase tracking-[0.16em] text-brand-yellow">
              Before / After
            </span>

            <span className="rounded-pill border border-ink/15 bg-white/70 px-4 py-2 text-body-xs font-black uppercase tracking-[0.16em] text-ink-muted">
              Operation shift
            </span>
          </div>

          <h2 className="max-w-[13ch] font-display text-title-section font-black text-ink">
            Từ tuyển dụng thụ động đến vận hành chủ động
          </h2>
        </div>

        <div className="flex flex-col justify-between rounded-[28px] border border-ink/10 bg-white/72 p-5 backdrop-blur lg:p-6">
          <p className="text-body font-bold leading-relaxed text-ink-soft">
            JobFree không chỉ giúp đăng tin tìm người. Điểm chính là biến ca
            ngắn thành một quy trình có xác nhận, theo dõi và dữ liệu.
          </p>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-2xl bg-red-50 px-4 py-3">
              <p className="text-body-xs font-black uppercase tracking-[0.12em] text-red-500">
                Bị động
              </p>
              <p className="mt-1 text-body-sm font-black text-ink">
                Chờ phản hồi
              </p>
            </div>

            <span className="text-xl font-black text-ink">→</span>

            <div className="rounded-2xl bg-brand-yellow px-4 py-3">
              <p className="text-body-xs font-black uppercase tracking-[0.12em] text-ink/60">
                Chủ động
              </p>
              <p className="mt-1 text-body-sm font-black text-ink">
                Kiểm soát ca
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OutcomeCard({ index, text }: { index: number; text: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_10px_30px_rgba(16,16,16,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/25">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-yellow/18 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-sand text-body-sm font-black text-brand-amber">
          0{index + 1}
        </span>

        <p className="pt-1 text-body-sm font-extrabold leading-snug text-ink">
          {text}
        </p>
      </div>
    </div>
  );
}

function FlowCard({
  type,
  eyebrow,
  title,
  subtitle,
  items,
}: {
  type: "old" | "new";
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{ label: string; text: string }>;
}) {
  const isNew = type === "new";

  return (
    <article
      className={`relative overflow-hidden rounded-card border-2 p-6 shadow-card-soft lg:p-8 ${
        isNew
          ? "border-ink bg-ink text-white"
          : "border-ink/10 bg-surface-sand text-ink"
      }`}
    >
      {isNew && (
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-yellow/25 blur-3xl" />
      )}

      <div className="relative z-10">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-body-xs font-black uppercase tracking-[0.16em] ${
                isNew ? "text-brand-yellow" : "text-ink-muted"
              }`}
            >
              {eyebrow}
            </p>

            <h3 className="mt-3 font-display text-title-sub font-black">
              {title}
            </h3>

            <p
              className={`mt-2 text-body-sm font-semibold ${
                isNew ? "text-white/62" : "text-ink-muted"
              }`}
            >
              {subtitle}
            </p>
          </div>

          <span
            className={`rounded-pill px-3 py-1.5 text-body-xs font-black ${
              isNew
                ? "bg-brand-yellow text-ink"
                : "border border-ink/10 bg-white text-ink-muted"
            }`}
          >
            {isNew ? "Chủ động" : "Bị động"}
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.label}
              className={`grid grid-cols-[auto_1fr] gap-4 rounded-2xl p-4 ${
                isNew
                  ? "border border-white/10 bg-white/[0.06]"
                  : "border border-ink/10 bg-white"
              }`}
            >
              <div
                className={`grid h-9 w-9 place-items-center rounded-full text-body-xs font-black ${
                  isNew
                    ? "bg-brand-yellow text-ink"
                    : "bg-ink text-brand-yellow"
                }`}
              >
                {index + 1}
              </div>

              <div>
                <p className="text-body-sm font-black">{item.label}</p>
                <p
                  className={`mt-1 text-body-xs font-medium leading-relaxed ${
                    isNew ? "text-white/62" : "text-ink-muted"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-brand-yellow/16 blur-3xl" />
      <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-surface-sand blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  );
}
