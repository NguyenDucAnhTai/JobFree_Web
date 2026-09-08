import { motion, type Variants } from "framer-motion";

const trustItems = [
  "Ghép worker gần khu vực",
  "QR check-in/out rõ ràng",
  "Thanh toán và đánh giá minh bạch",
];

const stats = [
  { value: "3 phút", label: "để đăng một ca" },
  { value: "24/7", label: "hỗ trợ vận hành" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      className="flex w-full max-w-[60ch] flex-col items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="mt-6 max-w-[10ch] font-display text-title-hero font-black text-ink"
      >
        Thiếu người cho ca gấp?
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-6 max-w-[56ch] text-hero-desc font-medium text-ink-soft"
      >
        JobFree giúp doanh nghiệp đăng việc, ghép worker gần nhất, theo dõi
        check-in/out và hoàn tất ca trong một luồng vận hành rõ ràng.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
        <motion.a
          href="#pilot"
          className="inline-flex items-center justify-center rounded-pill border-2 border-ink bg-ink px-7 py-4 text-body-sm font-black text-brand-yellow shadow-[0_9px_0_rgba(255,255,255,0.38)] transition-colors hover:bg-brand-black"
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
        >
          Đăng ký tuyển người →
        </motion.a>

        <motion.a
          href="#worker"
          className="inline-flex items-center justify-center rounded-pill border-2 border-ink/30 bg-white/55 px-7 py-4 text-body-sm font-black text-ink shadow-[0_9px_0_rgba(16,16,16,0.10)] backdrop-blur transition-colors hover:bg-white/80"
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
        >
          Tôi muốn nhận việc
        </motion.a>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-7 grid w-full gap-3 sm:grid-cols-3 lg:max-w-[58ch]"
      >
        {trustItems.map((item) => (
          <div
            key={item}
            className="flex items-start gap-2.5 rounded-2xl border border-ink/12 bg-white/38 px-3.5 py-3 backdrop-blur-sm"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-brand-yellow">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3.2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </span>
            <span className="text-body-xs font-bold text-ink-soft">{item}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-ink/15 bg-white/42 px-5 py-3 backdrop-blur-sm"
          >
            <p className="font-display text-title-sub font-black text-ink">
              {item.value}
            </p>
            <p className="text-body-xs font-bold text-ink-muted">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
