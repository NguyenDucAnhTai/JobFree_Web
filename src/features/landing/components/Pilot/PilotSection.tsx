import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useSearchParams } from "react-router-dom";

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

const pilotBenefits = [
  "Ưu tiên trải nghiệm luồng đăng ca mới",
  "Được hỗ trợ setup dịch vụ phù hợp",
  "Nhận góp ý trực tiếp từ đội JobFree",
];

type PilotMode = "employer" | "worker";

const modeContent = {
  employer: {
    eyebrow: "Employer pilot",
    title: "Nhận tư vấn pilot",
    badge: "⚡ Mở pilot theo khu vực",
    note: "Khi kênh đăng ký trực tuyến hoạt động, JobFree sẽ cập nhật thông tin liên hệ tại đây.",
    fields: [
      {
        label: "Tên doanh nghiệp / cá nhân",
        placeholder: "Ví dụ: EventPro Vietnam",
      },
      {
        label: "Loại nhu cầu",
        placeholder: "Ví dụ: Nhân sự sự kiện",
      },
      {
        label: "Khu vực hoạt động",
        placeholder: "Ví dụ: Quận 1, TP.HCM",
      },
      {
        label: "Số điện thoại / Zalo",
        placeholder: "09xx xxx xxx",
      },
    ],
  },
  worker: {
    eyebrow: "Worker pilot",
    title: "Đăng ký nhận việc",
    badge: "💼 Mở danh sách worker sớm",
    note: "Khi kênh đăng ký trực tuyến hoạt động, JobFree sẽ cập nhật thông tin liên hệ tại đây.",
    fields: [
      {
        label: "Họ và tên",
        placeholder: "Ví dụ: Minh Tuấn",
      },
      {
        label: "Nhóm việc muốn nhận",
        placeholder: "Ví dụ: Phụ shop, phụ kho, sự kiện",
      },
      {
        label: "Khu vực có thể làm",
        placeholder: "Ví dụ: Quận 7, TP.HCM",
      },
      {
        label: "Số điện thoại / Zalo",
        placeholder: "09xx xxx xxx",
      },
    ],
  },
};

export default function PilotSection() {
  const [searchParams] = useSearchParams();
  const requestedMode = searchParams.get("pilot");
  const initialMode: PilotMode = requestedMode === "worker" ? "worker" : "employer";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="pilot"
      className="relative w-full overflow-hidden bg-brand-yellow px-page-x py-section-y"
    >
      <Background />

      <motion.div
        className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.82fr)] lg:items-center"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeUp} custom={0}>
          <h2 className="max-w-[12ch] font-display text-title-section font-black text-ink">
            Đăng ký tham gia bản thử nghiệm
          </h2>

          <p className="mt-5 max-w-[58ch] text-body font-medium leading-relaxed text-ink-soft">
            Dành cho shop, kho, sự kiện, đội vận hành hoặc worker muốn thử cách
            tìm hiểu công việc ca ngắn với thông tin rõ ràng và có thể theo dõi.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-[720px]">
            {pilotBenefits.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-ink/10 bg-white/42 p-4 backdrop-blur"
              >
                <p className="text-body-xs font-black uppercase tracking-[0.14em] text-ink-amber">
                  0{index + 1}
                </p>
                <p className="mt-2 text-body-xs font-extrabold leading-snug text-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <PilotFormCard key={requestedMode} initialMode={initialMode} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PilotFormCard({ initialMode }: { initialMode: PilotMode }) {
  const [mode, setMode] = useState<PilotMode>(initialMode);
  const content = modeContent[mode];

  return (
    <div className="relative">
      <motion.div
        key={content.badge}
        initial={{ opacity: 0, y: 8, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.25 }}
        className="absolute -left-5 -top-5 hidden rounded-2xl border-2 border-ink bg-white px-4 py-3 text-body-xs font-black text-ink shadow-[0_10px_0_rgba(16,16,16,0.12)] sm:block"
      >
        {content.badge}
      </motion.div>

      <form onSubmit={(event) => event.preventDefault()} className="rounded-[34px] border-2 border-ink bg-white p-5 shadow-[0_16px_0_rgba(16,16,16,0.12)] sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <motion.div
            key={content.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-body-xs font-black uppercase tracking-[0.16em] text-ink-muted">
              {content.eyebrow}
            </p>
            <h3 className="mt-1 text-title-sub font-black text-ink">
              {content.title}
            </h3>
          </motion.div>

          <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-yellow text-body-sm font-black text-ink">
            JF
          </div>
        </div>

        <p className="mb-5 rounded-xl border border-brand-amber/20 bg-brand-yellow-muted/50 p-3 text-body-xs font-semibold leading-relaxed text-ink">
          Biểu mẫu xem trước: gửi thông tin trực tuyến hiện chưa được kích hoạt. Chưa có dữ liệu nào được gửi hoặc lưu.
        </p>

        <div className="relative mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-surface-sand p-1.5">
          <SegmentButton
            active={mode === "employer"}
            onClick={() => setMode("employer")}
          >
            Tôi cần tuyển người
          </SegmentButton>

          <SegmentButton
            active={mode === "worker"}
            onClick={() => setMode("worker")}
          >
            Tôi muốn nhận việc
          </SegmentButton>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "employer" ? -12 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {content.fields.map((field) => (
            <Field
              key={field.label}
              label={field.label}
              placeholder={field.placeholder}
            />
          ))}
        </motion.div>

        <button
          type="button"
          disabled
          aria-describedby="pilot-submit-status"
          className="mt-5 w-full cursor-not-allowed rounded-pill bg-ink/75 px-6 py-4 text-body-sm font-black text-brand-yellow"
        >
          Gửi trực tuyến chưa khả dụng
        </button>

        <p id="pilot-submit-status" className="sr-only">Biểu mẫu chưa gửi thông tin.</p>

        <p className="mt-4 text-center text-[0.72rem] font-medium leading-relaxed text-ink-muted">
          {content.note}
        </p>
      </form>
    </div>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-xl px-4 py-3 text-body-xs font-black transition-colors duration-200 ${
        active ? "text-brand-yellow" : "text-ink-muted hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="pilot-active-tab"
          className="absolute inset-0 rounded-xl bg-ink"
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-ink/20 bg-white px-4 text-body-xs font-bold text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink"
      />
    </label>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="absolute -left-32 top-20 h-[460px] w-[460px] rounded-full bg-white/24 blur-3xl" />
      <div className="absolute right-[-12%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-white/20 blur-3xl" />

      <div
        className="absolute left-[4%] top-[12%] h-[190px] w-[90vw] rotate-[-8deg] opacity-20"
        style={{
          clipPath: "polygon(0 0, 100% 20%, 100% 66%, 0 100%)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 44%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
