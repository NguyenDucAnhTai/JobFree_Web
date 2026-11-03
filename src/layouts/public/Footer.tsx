import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";

const productLinks = [
  ["Cho doanh nghiệp", "/employers"],
  ["Cho Worker", "/workers"],
  ["Cách hoạt động", "/how-it-works"],
  ["Loại công việc", "/job-categories"],
  ["Bảng giá", "/pricing"],
] as const;
const companyLinks = [
  ["Về JobFree", "/about"],
  ["Hợp tác", "/partners"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Liên hệ", "/contact"],
] as const;

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-surface-navy text-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:gap-16 lg:py-16">
          <div>
            <Link
              to="/"
              className="inline-block rounded-sm font-display text-4xl font-black leading-none text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
            >
              JobFree
            </Link>
            <p className="mt-5 max-w-[42ch] text-body-sm font-medium text-white/75">
              Việc gần · Ca rõ · Tự do mỗi ngày. Nền tảng giúp doanh nghiệp tìm
              worker ca ngắn với thông tin rõ ràng và có kiểm chứng.
            </p>
            <p className="mt-6 max-w-[42ch] text-body-xs text-white/70">
              Worker app sẽ triển khai theo khu vực trong các giai đoạn tiếp
              theo.
            </p>
          </div>
          <FooterColumn title="Sản phẩm" links={productLinks} />
          <FooterColumn title="Công ty" links={companyLinks} />
        </div>
        <div className="border-t border-white/10 py-6 text-body-xs font-medium text-white/70">
          <p>© 2026 JobFree Vietnam. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <h2 className="text-body-sm font-black text-brand-yellow">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link
              to={to}
              className="rounded-sm text-body-sm font-medium text-white/80 transition-colors hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
