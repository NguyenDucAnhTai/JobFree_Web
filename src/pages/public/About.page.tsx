import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const principles = [
  {
    number: "01",
    title: "Rõ trước khi nhận",
    desc: "Worker cần biết rõ giờ, địa điểm, mức trả và yêu cầu công việc trước khi nhận ca.",
  },
  {
    number: "02",
    title: "Đủ người trước giờ chạy",
    desc: "Employer không nên đợi đến sát giờ mới biết ca thiếu người hay không.",
  },
  {
    number: "03",
    title: "Uy tín phải có dữ liệu",
    desc: "Check-in/out, proof, đánh giá và lịch sử ca giúp hai bên tin nhau hơn.",
  },
  {
    number: "04",
    title: "Nhanh nhưng không cẩu thả",
    desc: "Matching nhanh cần đi cùng xác nhận, kiểm soát rủi ro và hỗ trợ khi phát sinh.",
  },
];

const marketCards = [
  {
    title: "Facebook/Zalo",
    label: "Thụ động",
    desc: "Đăng tin, chờ phản hồi, khó kiểm soát dữ liệu và lịch sử.",
  },
  {
    title: "JobFree",
    label: "Chủ động",
    desc: "Đăng ca, matching, xác nhận, check-in/out và đánh giá trong một luồng.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-surface-cream text-ink">
      <AboutHero />
      <WhySection />
      <PrinciplesSection />
      <MarketShiftSection />
      <AboutCTA />
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative grid min-h-[100svh] w-full items-center overflow-hidden bg-brand-yellow px-page-x pb-hero-y pt-[calc(var(--spacing-nav-h)+2.5rem)]">
      <HeroBackground />

      <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.9fr)] lg:items-center">
        <motion.div initial="hidden" animate="visible">
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 max-w-[12ch] font-display text-title-hero font-extrabold leading-[1.02] tracking-[-0.04em] text-ink"
          >
            Chúng tôi xây hệ điều phối việc làm tức thì.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-[62ch] text-hero-desc font-medium text-ink-soft"
          >
            JobFree sinh ra để biến việc tìm người làm ngắn hạn từ nhắn tin thủ
            công, chờ may rủi thành một quy trình rõ ràng, nhanh và có kiểm
            chứng.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#pilot"
              className="rounded-pill bg-ink px-7 py-4 text-body-sm font-black text-brand-yellow shadow-[0_9px_0_rgba(255,255,255,0.38)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Tham gia pilot →
            </a>

            <a
              href="/"
              className="rounded-pill border-2 border-ink/30 bg-white/45 px-7 py-4 text-body-sm font-black text-ink backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Về trang chủ
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <DispatchVisual />
        </motion.div>
      </div>
    </section>
  );
}

function DispatchVisual() {
  return (
    <div className="relative mx-auto min-h-[540px] w-full max-w-[620px]">
      <div className="absolute inset-0 rounded-full bg-white/22 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 z-10 grid h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-ink text-center shadow-phone">
        <div>
          <p className="text-body-xs font-black uppercase tracking-[0.18em] text-brand-yellow">
            JobFree
          </p>
          <p className="mt-2 text-title-sub font-black text-white">Dispatch</p>
          <p className="mx-auto mt-2 max-w-[18ch] text-body-xs font-medium text-white/55">
            matching · verify · payout
          </p>
        </div>
      </div>

      <OrbitCard
        className="left-0 top-10"
        eyebrow="Employer"
        title="Cần người gấp"
        desc="Đăng ca rõ giờ, rõ tiền, rõ địa điểm."
      />

      <OrbitCard
        className="right-0 top-20"
        eyebrow="Worker"
        title="Sẵn sàng nhận việc"
        desc="Nhận job gần khu vực, phù hợp lịch rảnh."
      />

      <OrbitCard
        className="bottom-12 left-8"
        eyebrow="Proof"
        title="QR check-in/out"
        desc="Có dữ liệu xác nhận ca làm."
      />

      <OrbitCard
        className="bottom-0 right-6"
        eyebrow="Trust"
        title="Lịch sử uy tín"
        desc="Rating và phản hồi sau mỗi ca."
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 620 540"
        fill="none"
        aria-hidden="true"
      >
        {[
          "M145 105 C230 135 250 210 310 270",
          "M485 135 C400 150 370 210 310 270",
          "M165 410 C230 370 250 320 310 270",
          "M475 450 C390 405 365 325 310 270",
        ].map((d) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgba(16,16,16,0.32)"
            strokeWidth="2"
            strokeDasharray="10 12"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

function OrbitCard({
  className,
  eyebrow,
  title,
  desc,
}: {
  className: string;
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.article
      className={`absolute z-20 w-[210px] rounded-[26px] border-2 border-ink bg-white/78 p-4 shadow-[0_14px_0_rgba(16,16,16,0.10)] backdrop-blur-xl ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-brand-amber">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-body-sm font-black text-ink">{title}</h3>
      <p className="mt-1 text-body-xs font-medium leading-relaxed text-ink-muted">
        {desc}
      </p>
    </motion.article>
  );
}

function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white px-page-x py-section-y"
    >
      <SectionBackground />

      <motion.div
        className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeUp} custom={0}>
          <p className="mb-4 inline-flex rounded-pill bg-surface-sand px-4 py-2 text-body-xs font-black uppercase tracking-[0.16em] text-brand-amber">
            Vì sao tồn tại?
          </p>

          <h2 className="max-w-[12ch] font-display text-title-section font-black text-ink">
            Việc ngắn hạn không nên vận hành bằng may rủi.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="space-y-5">
          <StoryBlock
            title="Employer cần đủ người đúng lúc"
            desc="Shop, kho, sự kiện hay quán ăn đều có những thời điểm thiếu người đột xuất. Cách cũ là đăng bài, gọi điện, nhắn Zalo và hy vọng có người phản hồi kịp."
          />

          <StoryBlock
            title="Worker cần việc rõ ràng, gần và đáng tin"
            desc="Người lao động ca ngắn không chỉ cần có việc. Họ cần biết trước mức trả, địa điểm, thời gian, yêu cầu và uy tín của bên thuê."
          />

          <StoryBlock
            title="JobFree đứng giữa để chuẩn hóa luồng đó"
            desc="Chúng tôi gom đăng ca, matching, xác nhận, check-in/out, proof và đánh giá thành một quy trình thống nhất."
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function StoryBlock({ title, desc }: { title: string; desc: string }) {
  return (
    <article className="rounded-card border border-ink/10 bg-surface-sand p-6">
      <h3 className="text-title-sub font-black text-ink">{title}</h3>
      <p className="mt-3 text-body-sm font-medium leading-relaxed text-ink-muted">
        {desc}
      </p>
    </article>
  );
}

function PrinciplesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-surface-navy px-page-x py-section-y text-white"
    >
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={fadeUp}
          custom={0}
          className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.8fr)] lg:items-end"
        >
          <div>
            <p className="mb-4 inline-flex rounded-pill border border-white/10 bg-white/[0.06] px-4 py-2 text-body-xs font-black uppercase tracking-[0.16em] text-brand-yellow">
              Product principles
            </p>

            <h2 className="max-w-[13ch] font-display text-title-section font-black">
              Nguyên tắc chúng tôi theo đuổi
            </h2>
          </div>

          <p className="max-w-[54ch] text-body font-medium leading-relaxed text-white/62 lg:justify-self-end">
            JobFree được thiết kế cho tốc độ, nhưng không đánh đổi sự rõ ràng,
            an toàn và uy tín giữa hai bên.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((item, index) => (
            <motion.article
              key={item.number}
              variants={fadeUp}
              custom={index + 1}
              className="rounded-card border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-yellow/50"
            >
              <p className="text-body-xs font-black uppercase tracking-[0.16em] text-brand-yellow">
                {item.number}
              </p>
              <h3 className="mt-5 text-title-sub font-black text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-body-xs font-medium leading-relaxed text-white/58">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function MarketShiftSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white px-page-x py-section-y"
    >
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeUp} custom={0} className="mb-10">
          <h2 className="max-w-[13ch] font-display text-title-section font-black text-ink">
            Từ tin đăng rời rạc đến hệ điều phối có dữ liệu
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          {marketCards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              custom={index + 1}
              className={`rounded-card border-2 p-7 ${
                index === 0
                  ? "border-ink/10 bg-surface-sand text-ink"
                  : "border-ink bg-brand-yellow text-ink shadow-[0_14px_0_rgba(16,16,16,0.10)]"
              }`}
            >
              <p className="text-body-xs font-black uppercase tracking-[0.16em] text-ink-muted">
                {card.label}
              </p>
              <h3 className="mt-4 text-title-sub font-black">{card.title}</h3>
              <p className="mt-3 text-body-sm font-medium leading-relaxed text-ink-soft">
                {card.desc}
              </p>
            </motion.article>
          ))}

          <div className="row-start-2 flex items-center justify-center lg:row-start-auto">
            <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-ink text-2xl font-black text-brand-yellow">
              →
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-yellow px-page-x py-section-y">
      <div className="relative z-10 rounded-[40px] border-2 border-ink bg-white p-7 shadow-[0_18px_0_rgba(16,16,16,0.12)] lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-body-xs font-black uppercase tracking-[0.16em] text-brand-amber">
              Build with us
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-title-section font-black text-ink">
              Cùng thử nghiệm cách vận hành ca ngắn mới
            </h2>
          </div>

          <a
            href="#pilot"
            className="inline-flex rounded-pill bg-ink px-7 py-4 text-body-sm font-black text-brand-yellow transition-all duration-200 hover:-translate-y-0.5"
          >
            Đăng ký pilot →
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#FAFAF7]">
      {/* Core source */}
      <div className="absolute left-1/2 top-[-14%] h-[980px] w-[980px] -translate-x-1/2 rounded-full bg-[#FFD54A]/34 blur-[220px]" />

      {/* Bright center */}
      <div className="absolute left-1/2 top-[0%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#FFF1A8]/52 blur-[130px]" />

      {/* Wide side spread */}
      <div className="absolute left-[-18%] top-[6%] h-[760px] w-[760px] rounded-full bg-[#FFD54A]/16 blur-[200px]" />
      <div className="absolute right-[-18%] top-[6%] h-[760px] w-[760px] rounded-full bg-[#D9A600]/16 blur-[200px]" />

      {/* Wide outer beam */}
      <div
        className="absolute left-1/2 top-0 h-[980px] w-[130vw] -translate-x-1/2 opacity-[0.30]"
        style={{
          clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,212,0,0.50), transparent)",
          filter: "blur(60px)",
        }}
      />

      {/* Mid beam */}
      <div
        className="absolute left-1/2 top-0 h-[900px] w-[100vw] -translate-x-1/2 opacity-[0.34]"
        style={{
          clipPath: "polygon(36% 0%, 64% 0%, 84% 100%, 16% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,224,120,0.68), transparent)",
          filter: "blur(42px)",
        }}
      />

      {/* Inner beam */}
      <div
        className="absolute left-1/2 top-0 h-[820px] w-[70vw] -translate-x-1/2 opacity-[0.42]"
        style={{
          clipPath: "polygon(42% 0%, 58% 0%, 68% 100%, 32% 100%)",
          background:
            "linear-gradient(to bottom, rgba(255,245,200,0.95), transparent)",
          filter: "blur(28px)",
        }}
      />

      {/* Vertical light tunnel */}
      <div
        className="absolute left-1/2 top-[8%] h-[1000px] w-[60vw] -translate-x-1/2 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,220,90,0.55), transparent 72%)",
          filter: "blur(90px)",
        }}
      />

      {/* Deep atmospheric spread */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          background: `
            radial-gradient(circle at 50% 12%, rgba(255,212,0,0.26), transparent 22%),
            radial-gradient(circle at 50% 35%, rgba(255,226,122,0.20), transparent 38%),
            radial-gradient(circle at 50% 70%, rgba(255,232,163,0.14), transparent 48%),
            radial-gradient(circle at 50% 100%, rgba(255,244,200,0.08), transparent 55%)
          `,
        }}
      />

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(#111 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(circle at 50% 18%, black 30%, transparent 90%)",
        }}
      />
    </div>
  );
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-brand-yellow/14 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-surface-sand blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  );
}
