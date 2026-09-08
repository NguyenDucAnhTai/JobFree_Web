import Container from "../../components/shared/Container";

const productLinks = [
  "Cho doanh nghiệp",
  "Cho worker",
  "QR Check-in/out",
  "Bảng giá",
];

const companyLinks = ["Về JobFree", "Liên hệ", "Blog", "Trở thành đối tác"];
const legalLinks = ["Điều khoản", "Bảo mật", "Quy chế hoạt động"];
const socialLinks = ["FB", "IN", "TT"];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-surface-navy text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.85fr_1fr] lg:gap-12 xl:gap-16 xl:py-16">
          <div>
            <a
              href="#top"
              className="font-display text-[clamp(2rem,3vw,3.3rem)] font-black leading-none tracking-[-0.07em] text-brand-yellow"
            >
              JobFree
            </a>

            <p className="mt-5 max-w-[42ch] text-body-sm font-medium text-white/60">
              Việc gần · Tiền liền · Tự do mỗi ngày. Nền tảng giúp doanh nghiệp
              tìm worker ca ngắn nhanh, rõ ràng và có kiểm chứng.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item}
                  href="#social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-body-xs font-black text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Sản phẩm" links={productLinks} />
          <FooterColumn title="Công ty" links={companyLinks} />

          <div>
            <h4 className="text-body-sm font-black text-brand-yellow">
              Tải ứng dụng
            </h4>

            <p className="mt-4 max-w-[34ch] text-body-xs font-medium text-white/50">
              Employer web đang mở pilot. Worker app sẽ triển khai theo khu vực.
            </p>

            <div className="mt-5 grid gap-3 sm:max-w-[280px]">
              <StoreButton eyebrow="Download on the" label="App Store" />
              <StoreButton eyebrow="Get it on" label="Google Play" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-body-xs font-medium text-white/42 md:flex-row md:items-center md:justify-between">
          <p>© 2026 JobFree Vietnam. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#legal"
                className="transition-colors duration-200 hover:text-brand-yellow"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-body-sm font-black text-brand-yellow">{title}</h4>

      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item}>
            <a
              href="#footer"
              className="text-body-sm font-medium text-white/68 transition-colors duration-200 hover:text-brand-yellow"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoreButton({ eyebrow, label }: { eyebrow: string; label: string }) {
  return (
    <a
      href="#download"
      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-yellow/70 hover:bg-white/[0.11]"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-yellow text-ink">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      </span>

      <span>
        <span className="block text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/45">
          {eyebrow}
        </span>
        <span className="mt-0.5 block text-body-sm font-black text-white">
          {label}
        </span>
      </span>
    </a>
  );
}
