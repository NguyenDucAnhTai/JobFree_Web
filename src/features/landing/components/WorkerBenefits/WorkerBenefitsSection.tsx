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

const benefitCards = [
  {
    icon: "₫",
    title: "Thu nhập minh bạch",
    desc: "Biết chính xác ca nào, mức trả nào trước khi nhận việc.",
  },
  {
    icon: "◎",
    title: "Job gần bạn",
    desc: "Ưu tiên việc gần khu vực để giảm thời gian di chuyển.",
  },
  {
    icon: "◔",
    title: "Tự chủ thời gian",
    desc: "Làm lúc bạn rảnh, không bị khóa vào lịch cố định.",
  },
  {
    icon: "◈",
    title: "Bảo hiểm 24/7",
    desc: "An tâm hơn với các lớp xác minh và hỗ trợ trong ca làm.",
  },
];

export default function WorkerBenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="worker"
      data-header-theme="light"
      className="relative w-full overflow-hidden bg-ink px-page-x py-section-y text-white"
    >
      <Background />

      <motion.div
        className="relative z-10 grid gap-10 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:items-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeUp} custom={0} className="relative">
          <WorkerVisual />
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <h2 className="mt-5 max-w-[19ch] font-display text-title-section font-black leading-[0.98]">
            <span className="text-white">Có thời gian rảnh?</span>
            <br />
            <span className="text-brand-yellow">
              Nhận job rõ giờ, rõ tiền, gần bạn.
            </span>
          </h2>

          <p className="mt-5 max-w-[58ch] text-body font-medium leading-relaxed text-white/68">
            JobFree giúp worker chọn việc phù hợp nhanh hơn — rõ mức trả, rõ
            thời gian, rõ địa điểm và chủ động hơn trong từng ca làm.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefitCards.map((card, index) => (
              <BenefitCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                index={index}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Tag text="Rõ giờ" />
            <Tag text="Rõ tiền" />
            <Tag text="Gần bạn" />
            <Tag text="Chủ động nhận ca" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function WorkerVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 overflow-hidden rounded-[32px] border-2 border-white/10 bg-brand-yellow p-5 text-ink shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[0.72rem] font-black text-brand-yellow">
            MT
          </div>

          <div>
            <p className="text-[0.82rem] font-black">Minh Tuấn</p>
            <p className="text-[0.7rem] font-bold text-ink/65">★ 4.9 / 5</p>
          </div>
        </div>

        <div className="mt-5 rounded-[24px] border-2 border-ink bg-white p-4 shadow-[0_10px_0_rgba(16,16,16,0.10)]">
          <p className="text-[0.72rem] font-black text-ink-muted">
            Tiệc Buffet - Lotte Hotel
          </p>

          <p className="mt-1 text-[0.66rem] font-semibold text-ink-muted">
            Hôm nay, 17:00 - 22:00
          </p>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[1.55rem] font-black tracking-[-0.05em]">
                350.000đ
              </p>

              <p className="text-[0.66rem] font-semibold text-ink-muted">
                Thanh toán rõ ràng
              </p>
            </div>

            <button className="rounded-pill bg-ink px-4 py-2 text-[0.68rem] font-black text-brand-yellow">
              Xác nhận
            </button>
          </div>
        </div>
      </motion.div>

      {/* Badge job gần bạn - đã sửa lại để không bị chìm/mất */}
      <motion.div
        initial={{
          opacity: 0,
          x: -34,
          y: 18,
          scale: 0.72,
          rotate: -4,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.28,
          type: "spring",
          stiffness: 420,
          damping: 22,
          mass: 0.8,
        }}
        className="absolute right-[-18px] top-[18%] z-30 min-w-[160px] origin-left rounded-[22px] border-2 border-white/80 bg-white/95 px-4 py-3 text-ink shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        {/* Cái đuôi notification, tạo cảm giác bật ra từ card */}
        <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-white/80 bg-white/95" />

        {/* Pulse nhỏ tại điểm bật ra */}
        <span className="absolute -left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-yellow">
          <span className="absolute inset-0 rounded-full bg-brand-yellow opacity-60 animate-ping" />
        </span>

        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-yellow text-ink shadow-[0_8px_18px_rgba(255,212,0,0.32)]">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </svg>
          </div>

          <div>
            <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-brand-amber">
              Job gần bạn
            </p>
            <p className="mt-0.5 whitespace-nowrap text-[0.86rem] font-black text-ink">
              Cách 2.3km
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: 8 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.45 }}
        className="absolute bottom-3 right-8 z-30 rounded-2xl border-2 border-ink bg-[#FF9C1A] px-4 py-3 text-body-xs font-black text-ink shadow-[0_14px_34px_rgba(0,0,0,0.24)]"
      >
        ⚡ NHẬN TIỀN NGAY
      </motion.div>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index + 2}
      className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/40"
    >
      <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-yellow text-body-sm font-black text-ink">
        {icon}
      </div>

      <h3 className="mt-4 text-body-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-body-xs font-medium leading-relaxed text-white/60">
        {desc}
      </p>
    </motion.article>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="rounded-pill border border-white/12 bg-white/[0.06] px-4 py-2 text-body-xs font-black text-white/74">
      {text}
    </span>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-6%] top-[20%] h-[360px] w-[360px] rounded-full bg-brand-yellow/14 blur-3xl" />
      <div className="absolute right-[-8%] bottom-[-4%] h-[420px] w-[420px] rounded-full bg-brand-yellow/10 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
