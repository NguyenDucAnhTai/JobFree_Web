import { motion } from "framer-motion";
import type { ReactNode } from "react";

const workerJobs = [
  { title: "Phụ đóng gói livestream", meta: "Quận 7 · 18:00", price: "38k/h" },
  { title: "Setup booth sự kiện", meta: "Thủ Đức · 14:00", price: "45k/h" },
  { title: "Phụ kho gom đơn", meta: "Bình Thạnh · 09:00", price: "35k/h" },
];

const candidates = [
  { name: "Minh Anh", distance: "1.8km", score: "4.9" },
  { name: "Quốc Huy", distance: "2.1km", score: "4.8" },
  { name: "Thanh Trúc", distance: "1.6km", score: "4.9" },
];

export default function PhoneScene() {
  return (
    <motion.div
      className="relative isolate h-[470px] w-full overflow-visible select-none sm:h-[540px] lg:h-[610px] xl:h-[670px] 2xl:h-[710px]"
      initial={{ opacity: 0, x: 34, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shadow dưới cụm phone */}
      <div className="absolute bottom-[8%] left-1/2 h-[120px] w-[72%] -translate-x-1/2 rounded-full bg-black/20 blur-3xl" />

      {/* Đường nối animation */}
      <svg
        className="pointer-events-none absolute left-[12%] top-[30%] hidden h-[230px] w-[74%] opacity-50 md:block"
        viewBox="0 0 720 230"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M102 150 C235 48 418 58 612 110"
          stroke="rgba(16,16,16,0.22)"
          strokeWidth="2"
          strokeDasharray="10 12"
          animate={{ strokeDashoffset: [0, -90] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* LEFT PHONE */}
      <motion.div
        className="absolute left-[2%] top-[92px] z-20 w-[205px] sm:left-[7%] sm:top-[106px] sm:w-[245px] lg:left-[3%] lg:top-[120px] lg:w-[285px] xl:left-[7%] xl:w-[318px] 2xl:w-[340px]"
        animate={{
          y: [0, -14, 0],
          rotate: [-7, -4.5, -7],
        }}
        transition={{
          duration: 7.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PhoneFrame tone="dark">
          <WorkerScreen />
        </PhoneFrame>
      </motion.div>

      {/* RIGHT PHONE */}
      <motion.div
        className="absolute right-[1%] top-[10px] z-20 w-[220px] sm:right-[6%] sm:w-[270px] lg:right-[1%] lg:w-[322px] xl:right-[5%] xl:w-[356px] 2xl:w-[382px]"
        animate={{
          y: [0, 16, 0],
          rotate: [6, 3.8, 6],
        }}
        transition={{
          duration: 7.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <PhoneFrame tone="light">
          <EmployerScreen />
        </PhoneFrame>
      </motion.div>

      {/* BADGE 1: trên giữa, gắn với cụm phone hơn */}
      <FloatingCard className="left-[2%] top-[18px] hidden md:block lg:left-[10%] lg:top-[34px] xl:left-[12%] xl:top-[24px] 2xl:left-[14%]">
        <div className="flex items-center gap-2">
          <span className="text-sm">⚡</span>
          <div>
            <p className="text-[0.72rem] font-black text-ink">
              12 worker gần bạn
            </p>
            <p className="text-[0.62rem] font-bold text-ink-muted">
              Sẵn sàng nhận ca trong 15 phút
            </p>
          </div>
        </div>
      </FloatingCard>

      {/* BADGE 2: match score, bám mép trong phone trái */}
      <FloatingCard className="bottom-[15%] left-[43%] hidden -translate-x-1/2 lg:block xl:bottom-[16%] xl:left-[42%] 2xl:left-[41%]">
        <div className="flex items-center gap-3">
          <div className="relative grid h-9 w-9 place-items-center rounded-full bg-ink text-[0.68rem] font-black text-brand-yellow">
            92
            <span className="absolute inset-0 rounded-full bg-brand-yellow/40 blur-md" />
          </div>
          <div>
            <p className="text-[0.72rem] font-black text-ink">Match score</p>
            <p className="text-[0.62rem] font-bold text-ink-muted">
              Worker phù hợp ca này
            </p>
          </div>
        </div>
      </FloatingCard>

      {/* BADGE 3: QR, đẩy ra ngoài mép phải phone phải */}
      <FloatingCard className="bottom-[27%] right-[-3%] hidden translate-x-1/4 lg:block xl:bottom-[28%] xl:right-[-2%] 2xl:right-[-1%]">
        <div>
          <p className="text-[0.72rem] font-black text-ink">
            QR check-in thành công
          </p>
          <p className="text-[0.62rem] font-bold text-ink-muted">
            08:59 · Quận 1
          </p>
        </div>
      </FloatingCard>
    </motion.div>
  );
}

function PhoneFrame({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "light" | "dark";
}) {
  return (
    <div className="relative aspect-[9/19.4] w-full rounded-[2.8rem] border-[7px] border-ink bg-ink shadow-phone">
      <div className="absolute -left-[10px] top-[22%] h-9 w-[4px] rounded-l bg-ink" />
      <div className="absolute -left-[10px] top-[34%] h-12 w-[4px] rounded-l bg-ink" />
      <div className="absolute -right-[10px] top-[30%] h-16 w-[4px] rounded-r bg-ink" />

      <div
        className={`absolute inset-[4px] overflow-hidden rounded-[2.22rem] ${
          tone === "light" ? "bg-surface-cream" : "bg-ink"
        }`}
      >
        <div className="absolute left-1/2 top-3 z-30 h-5 w-[30%] -translate-x-1/2 rounded-pill bg-ink" />

        <motion.div
          className="pointer-events-none absolute -left-[80%] top-0 z-20 h-full w-[55%] rotate-12 bg-gradient-to-r from-transparent via-white/28 to-transparent"
          animate={{ x: ["0%", "330%"] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "easeInOut",
          }}
        />

        {children}

        <div
          className={`absolute bottom-2 left-1/2 z-30 h-1 w-[30%] -translate-x-1/2 rounded-full ${
            tone === "light" ? "bg-ink/18" : "bg-white/24"
          }`}
        />
      </div>
    </div>
  );
}

function WorkerScreen() {
  return (
    <div className="flex h-full flex-col bg-ink px-4 pb-4 pt-10 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-white/45">
            Worker app
          </p>
          <h3 className="mt-1 text-[1.05rem] font-black leading-none tracking-[-0.04em]">
            Việc gần bạn
          </h3>
        </div>

        <motion.div
          className="relative h-9 w-9 rounded-full bg-brand-yellow"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-brand-yellow opacity-50 blur-md" />
        </motion.div>
      </div>

      <div className="mt-5 rounded-[1.45rem] bg-brand-yellow p-4 text-ink shadow-card-soft">
        <p className="text-[0.68rem] font-black text-ink-soft">Đang online</p>

        <h4 className="mt-2 text-[1.4rem] font-black leading-[1.02] tracking-[-0.06em]">
          Sẵn sàng nhận ca trong 2km
        </h4>

        <div className="mt-4 h-2.5 overflow-hidden rounded-pill bg-ink/16">
          <motion.div
            className="h-full rounded-pill bg-ink"
            initial={{ width: "24%" }}
            animate={{ width: ["24%", "78%", "62%", "86%"] }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {workerJobs.map((job, index) => (
          <motion.div
            key={job.title}
            className="rounded-2xl border border-white/10 bg-white/[0.075] p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.35 + index * 0.14,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[0.78rem] font-black">
                  {job.title}
                </p>
                <p className="mt-1 text-[0.62rem] font-bold text-white/42">
                  {job.meta}
                </p>
              </div>

              <motion.span
                className="shrink-0 rounded-pill bg-brand-yellow px-2.5 py-1 text-[0.62rem] font-black text-ink"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.25,
                }}
              >
                {job.price}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-4 gap-2 rounded-[1.35rem] bg-white/[0.06] p-2 text-center text-[0.56rem] font-black text-white/45">
        {["Home", "Ca", "Chat", "Tôi"].map((item, index) => (
          <div
            key={item}
            className={`rounded-xl py-2 ${
              index === 0 ? "bg-brand-yellow text-ink" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployerScreen() {
  return (
    <div className="flex h-full flex-col bg-surface-cream px-4 pb-4 pt-10 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.58rem] font-black uppercase tracking-[0.16em] text-ink-muted">
            Employer
          </p>
          <h3 className="mt-1 text-[1.05rem] font-black leading-none tracking-[-0.04em]">
            Đăng ca mới
          </h3>
        </div>

        <motion.div
          className="grid h-9 w-9 place-items-center rounded-full bg-brand-yellow text-[0.7rem] font-black"
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          JF
        </motion.div>
      </div>

      <motion.div
        className="mt-5 rounded-[1.45rem] border border-ink/12 bg-white p-4 shadow-card-soft"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[0.68rem] font-black text-ink-muted">Ca hôm nay</p>

        <h4 className="mt-2 text-[1.45rem] font-black leading-[1.02] tracking-[-0.06em]">
          Cần 8 worker phụ shop
        </h4>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniPill label="18:00 - 22:00" />
          <MiniPill label="Quận 7" />
          <MiniPill label="38k/h" />
          <MiniPill label="QR check-in" />
        </div>
      </motion.div>

      <motion.button
        className="relative mt-4 overflow-hidden rounded-pill bg-ink px-4 py-3 text-[0.78rem] font-black text-brand-yellow"
        animate={{ scale: [1, 1.025, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/28 to-transparent"
          animate={{ x: ["0%", "330%"] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
        <span className="relative z-10">Tìm worker phù hợp</span>
      </motion.button>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-[0.72rem] font-black text-ink-muted">
          Ứng viên gần nhất
        </p>
        <p className="text-[0.66rem] font-black text-brand-amber">Xem tất cả</p>
      </div>

      <div className="mt-3 space-y-2.5">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.name}
            className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-3 py-2.5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5 + index * 0.12,
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative grid h-8 w-8 place-items-center rounded-full bg-brand-yellow text-[0.7rem] font-black">
              {index + 1}
              {index === 0 && (
                <span className="absolute inset-0 rounded-full bg-brand-yellow opacity-60 blur-md" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.74rem] font-black">
                {candidate.name}
              </p>
              <p className="text-[0.6rem] font-bold text-ink-muted">
                ⭐ {candidate.score} · cách {candidate.distance}
              </p>
            </div>

            <span className="rounded-pill bg-ink px-2 py-1 text-[0.56rem] font-black text-brand-yellow">
              Chọn
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FloatingCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute z-50 rounded-2xl border border-white/60 bg-white/55 px-4 py-3 shadow-[0_18px_45px_rgba(16,16,16,0.12)] backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.45, delay: 0.6 },
        scale: { duration: 0.45, delay: 0.6 },
        y: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function MiniPill({ label }: { label: string }) {
  return (
    <span className="rounded-pill bg-surface-sand px-2.5 py-2 text-center text-[0.62rem] font-black text-ink-soft">
      {label}
    </span>
  );
}
