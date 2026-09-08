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

const processSteps = [
  {
    number: "01",
    title: "Tạo yêu cầu",
    desc: "Chọn loại việc, số lượng worker, địa điểm và khung giờ cần hỗ trợ.",
    status: "Input",
  },
  {
    number: "02",
    title: "Gợi ý mức trả",
    desc: "Hệ thống đề xuất mức trả theo khu vực, độ gấp và loại công việc.",
    status: "Pricing",
  },
  {
    number: "03",
    title: "Matching worker",
    desc: "Ưu tiên worker gần, phù hợp kỹ năng và đang sẵn sàng nhận ca.",
    status: "Matching",
  },
  {
    number: "04",
    title: "Xác nhận ca",
    desc: "Employer duyệt worker, worker xác nhận nhận ca trước giờ bắt đầu.",
    status: "Confirm",
  },
  {
    number: "05",
    title: "QR check-in/out",
    desc: "Worker quét QR tại điểm làm để ghi nhận giờ đến, giờ về và proof.",
    status: "On-site",
  },
  {
    number: "06",
    title: "Hoàn tất & đánh giá",
    desc: "Xác nhận hoàn thành, đánh giá uy tín và lưu lịch sử vận hành.",
    status: "Done",
  },
] as const;

const phoneTimeline = [
  { label: "Yêu cầu đã tạo", time: "08:00", done: true },
  { label: "Giá đề xuất 38k/h", time: "08:01", done: true },
  { label: "8 worker phù hợp", time: "08:03", done: true },
  { label: "6 worker đã xác nhận", time: "08:08", done: true },
  { label: "Chờ QR check-in", time: "17:55", done: false },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="process"
      className="relative w-full overflow-hidden bg-[#F5F4EE] px-page-x py-section-y"
    >
      <Background />

      <motion.div
        className="relative z-10 w-full"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-end"
        >
          <div>
            <h2 className="max-w-[30ch] font-display text-title-section font-black text-ink md:max-w-none">
              Quy trình đơn giản, hiệu quả tối đa
            </h2>
          </div>
        </motion.div>

        {/* Desktop creative board */}
        <motion.div variants={fadeUp} custom={1} className="hidden lg:block">
          <div className="relative min-h-[780px] overflow-hidden rounded-[40px] border-2 border-ink bg-white shadow-[0_24px_70px_rgba(16,16,16,0.09)]">
            <BoardBackground />

            <div className="absolute left-[4%] top-[8%] w-[285px]">
              <StepOrbitCard step={processSteps[0]} delay={0.1} />
            </div>

            <div className="absolute left-[6%] top-[39%] w-[285px]">
              <StepOrbitCard step={processSteps[1]} delay={0.18} />
            </div>

            <div className="absolute left-[4%] bottom-[8%] w-[285px]">
              <StepOrbitCard step={processSteps[2]} delay={0.26} />
            </div>

            <div className="absolute right-[4%] top-[8%] w-[285px]">
              <StepOrbitCard step={processSteps[3]} delay={0.34} />
            </div>

            <div className="absolute right-[6%] top-[39%] w-[285px]">
              <StepOrbitCard step={processSteps[4]} delay={0.42} />
            </div>

            <div className="absolute right-[4%] bottom-[8%] w-[285px]">
              <StepOrbitCard step={processSteps[5]} delay={0.5} />
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <WorkflowPhone />
            </div>
          </div>
        </motion.div>

        {/* Mobile fallback */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="grid gap-5 lg:hidden"
        >
          <div className="rounded-card border-2 border-ink bg-white p-5 shadow-card-soft">
            <WorkflowPhone mobile />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <StepOrbitCard
                key={step.number}
                step={step}
                delay={index * 0.08}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StepOrbitCard({
  step,
  delay,
}: {
  step: (typeof processSteps)[number];
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[28px] border border-ink/10 bg-surface-sand p-5 shadow-[0_14px_34px_rgba(16,16,16,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:bg-white"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-yellow/18 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-brand-yellow text-body-sm font-black text-ink">
            {step.number}
          </div>

          <span className="rounded-pill border border-ink/10 bg-white px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.12em] text-ink-muted">
            {step.status}
          </span>
        </div>

        <h3 className="text-body font-black text-ink">{step.title}</h3>

        <p className="mt-2 text-body-xs font-medium leading-relaxed text-ink-muted">
          {step.desc}
        </p>
      </div>
    </motion.article>
  );
}

function WorkflowPhone({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${mobile ? "mx-auto w-[278px]" : "w-[330px] xl:w-[370px]"}`}
    >
      <div className="relative aspect-[9/19.4] w-full rounded-[2.8rem] border-[7px] border-ink bg-ink shadow-phone">
        <div className="absolute -left-[10px] top-[24%] h-10 w-[4px] rounded-l bg-ink" />
        <div className="absolute -right-[10px] top-[32%] h-16 w-[4px] rounded-r bg-ink" />

        <div className="absolute inset-[4px] overflow-hidden rounded-[2.2rem] bg-surface-cream">
          <div className="absolute left-1/2 top-3 z-30 h-5 w-[30%] -translate-x-1/2 rounded-pill bg-ink" />

          <motion.div
            className="pointer-events-none absolute -left-[70%] top-0 z-20 h-full w-[50%] rotate-12 bg-gradient-to-r from-transparent via-white/24 to-transparent"
            animate={{ x: ["0%", "330%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          <div className="flex h-full flex-col px-4 pb-4 pt-10 text-ink">
            <PhoneHeader />

            <JobSummaryCard />

            <MiniStats />

            <MapPreview />

            <TimelineList />

            <div className="mt-auto grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.25rem] bg-ink px-4 py-3">
              <div>
                <p className="text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/38">
                  Next action
                </p>
                <p className="mt-0.5 text-[0.72rem] font-black text-brand-yellow">
                  Chờ QR check-in
                </p>
              </div>

              <motion.div
                className="grid h-9 w-9 place-items-center rounded-full bg-brand-yellow text-[0.7rem] font-black text-ink"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                QR
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PhoneHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-ink-muted">
          JobFree Ops
        </p>
        <h4 className="mt-1 text-[1.05rem] font-black leading-none tracking-[-0.04em]">
          Ca chiều 18:00
        </h4>
      </div>

      <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-yellow text-[0.62rem] font-black">
        JF
      </div>
    </div>
  );
}

function JobSummaryCard() {
  return (
    <div className="mt-5 rounded-[1.35rem] border border-ink/10 bg-white p-4 shadow-[0_10px_24px_rgba(16,16,16,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-ink-muted">
            Đang matching
          </p>
          <h5 className="mt-1 text-[1.16rem] font-black leading-[1.05] tracking-[-0.05em]">
            Cần 8 worker phụ shop
          </h5>
        </div>

        <span className="rounded-pill bg-brand-yellow px-2.5 py-1 text-[0.58rem] font-black text-ink">
          Live
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-pill bg-surface-sand">
        <motion.div
          className="h-full rounded-pill bg-brand-yellow"
          initial={{ width: "20%" }}
          whileInView={{ width: "74%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.15, delay: 0.4 }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-[0.62rem] font-bold text-ink-muted">
        <span>6/8 worker xác nhận</span>
        <span>74%</span>
      </div>
    </div>
  );
}

function MiniStats() {
  const stats = [
    { label: "Mức trả", value: "38k/h" },
    { label: "Gần nhất", value: "1.8km" },
    { label: "Ca", value: "4h" },
  ];

  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-ink/10 bg-white px-2.5 py-2.5 text-center"
        >
          <p className="text-[0.52rem] font-black uppercase tracking-[0.1em] text-ink-muted">
            {item.label}
          </p>
          <p className="mt-1 text-[0.76rem] font-black text-ink">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function MapPreview() {
  const pins = [
    { x: "24%", y: "42%", label: "A" },
    { x: "55%", y: "34%", label: "B" },
    { x: "72%", y: "62%", label: "C" },
  ];

  return (
    <div className="relative mt-3 h-[96px] overflow-hidden rounded-[1.25rem] border border-ink/10 bg-[#191B22]">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 260 96"
      >
        <path
          d="M0 56 C54 42 78 64 118 46 C164 26 188 42 260 22"
          stroke="#FFD400"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10 88 C62 70 100 88 140 72 C182 56 206 74 260 62"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <p className="absolute left-3 top-3 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white/50">
        Worker nearby
      </p>

      {pins.map((pin) => (
        <motion.div
          key={pin.label}
          className="absolute grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-brand-yellow text-[0.58rem] font-black text-ink"
          style={{
            left: pin.x,
            top: pin.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {pin.label}
        </motion.div>
      ))}
    </div>
  );
}

function TimelineList() {
  return (
    <div className="mt-3 space-y-2">
      {phoneTimeline.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + index * 0.1, duration: 0.35 }}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-ink/10 bg-white px-3 py-2.5"
        >
          <div
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.52rem] font-black ${
              item.done
                ? "bg-brand-yellow text-ink"
                : "bg-surface-sand text-ink-muted"
            }`}
          >
            {item.done ? "✓" : index + 1}
          </div>

          <p className="truncate text-[0.66rem] font-bold text-ink">
            {item.label}
          </p>

          <p className="text-[0.56rem] font-bold text-ink-muted">{item.time}</p>
        </motion.div>
      ))}
    </div>
  );
}

function BoardBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,212,0,0.16)_0%,transparent_34%)]" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        viewBox="0 0 1440 780"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M 330 160 C 465 170, 520 230, 610 300",
          "M 330 390 C 460 385, 535 370, 630 370",
          "M 330 620 C 470 575, 540 510, 625 430",
          "M 1110 160 C 975 170, 920 230, 830 300",
          "M 1110 390 C 980 385, 905 370, 810 370",
          "M 1110 620 C 970 575, 900 510, 815 430",
        ].map((d) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgba(16,16,16,0.16)"
            strokeWidth="2"
            strokeDasharray="10 12"
            animate={{ strokeDashoffset: [0, -90] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-yellow/18 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
