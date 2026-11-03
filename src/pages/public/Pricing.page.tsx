import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const costParts = [
  { sign: "", title: "Mức trả Worker", detail: "Khoản gắn với phần việc của Worker trong ca." },
  { sign: "+", title: "Phí nền tảng", detail: "Phí dịch vụ liên quan đến hoạt động của JobFree." },
  { sign: "+", title: "Phí ưu tiên", detail: "Chỉ áp dụng khi lựa chọn ưu tiên được cung cấp cho ca." },
  { sign: "−", title: "Voucher hợp lệ", detail: "Điều chỉnh khi voucher đáp ứng điều kiện của chương trình áp dụng." },
  { sign: "=", title: "Tổng Employer", detail: "Tổng chi phí được hiển thị theo trạng thái giá áp dụng cho ca." },
] as const;

const factors = ["Loại công việc", "Thời lượng ca", "Số lượng Worker", "Khu vực", "Mức độ ưu tiên nếu áp dụng", "Voucher hợp lệ nếu áp dụng"];

export default function PricingPage() {
  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title="Cấu trúc chi phí JobFree"
        description="Tìm hiểu các thành phần có thể tạo nên tổng chi phí một ca và những yếu tố liên quan trước khi Employer xác nhận."
        canonicalPath="/pricing"
      />
      <section className="pt-[calc(var(--spacing-nav-h)+2rem)]">
        <Container className="grid items-center gap-10 pb-14 pt-8 md:pb-20 lg:min-h-[540px] lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:py-20">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">Bảng giá JobFree</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-title-hero font-black leading-[1.02]">Biết chi phí được tạo từ đâu.</h1>
            <p className="mt-6 max-w-[55ch] text-hero-desc font-medium leading-relaxed text-ink-soft">Chi phí một ca được cấu thành từ mức trả cho Worker và các khoản áp dụng cho ca đó. Thành phần được trình bày rõ để Employer xem trước khi xác nhận.</p>
          </div>
          <div aria-hidden="true" className="relative border-y-2 border-ink py-7 sm:py-9">
            <p className="text-body-xs font-black uppercase text-ink-amber">Cấu trúc chi phí</p>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 font-display text-title-sub font-black sm:text-3xl">
              <span>Mức trả Worker</span><span className="text-ink-amber">+</span>
              <span>Phí nền tảng</span><span className="text-ink-amber">+</span>
              <span>Phí ưu tiên nếu có</span><span className="text-ink-amber">−</span>
              <span>Voucher hợp lệ</span><span className="text-ink-amber">=</span>
              <span className="border-t-2 border-ink pt-3">Tổng Employer</span><span className="border-t-2 border-ink pt-3"> </span>
            </div>
          </div>
          <p className="sr-only">Mức trả Worker cộng phí nền tảng, cộng phí ưu tiên nếu có, trừ voucher hợp lệ bằng tổng Employer.</p>
        </Container>
      </section>

      <section className="bg-white py-section-y">
        <Container>
          <div className="mb-9 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-body-xs font-black uppercase text-ink-amber">Các thành phần</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-title-section font-black">Từng khoản có vai trò riêng.</h2>
            </div>
            <p className="max-w-[55ch] text-body-sm leading-relaxed text-ink-soft">Không có mức giá hay gói đăng ký sản xuất nào được công bố ở đây. Chi phí cụ thể phụ thuộc thông tin và quy tắc áp dụng cho từng ca.</p>
          </div>
          <div className="border-y-2 border-ink">
            {costParts.map((part, index) => (
              <article key={part.title} className={`grid gap-3 border-b border-ink/15 py-5 last:border-b-0 sm:grid-cols-[4rem_0.8fr_1.2fr] sm:items-center sm:gap-6 sm:py-6 ${part.title === "Tổng Employer" ? "bg-brand-yellow/35" : ""}`}>
                <span className="font-display text-title-sub font-black text-ink-amber" aria-hidden="true">{part.sign || `0${index + 1}`}</span>
                <h3 className="font-display text-title-sub font-black">{part.title}</h3>
                <p className="max-w-[58ch] text-body-sm leading-relaxed text-ink-soft">{part.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-ink-soft">Mức trả của Worker không đồng nghĩa với việc khoản đó đã được chi trả ngay. Xác nhận thanh toán, hoàn thành ca, giải ngân và chi trả là các mốc riêng.</p>
        </Container>
      </section>

      <section className="bg-surface-cream py-section-y">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">Giá được xác nhận</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-title-section font-black">Chi phí gắn với thông tin của ca.</h2>
            <p className="mt-5 max-w-[50ch] text-body leading-relaxed text-ink-soft">Thông tin ca được đối chiếu với giá và quy tắc áp dụng, sau đó chi phí được hiển thị theo quy trình trước bước thanh toán.</p>
            <p className="mt-5 max-w-[50ch] border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-ink-soft">Sau khi chi phí của ca đã được xác nhận theo quy trình áp dụng, lịch sử của ca giữ lại giá trị đã cam kết cho lần đó.</p>
          </div>
          <div>
            <ol className="grid gap-0 sm:grid-cols-3">
              {["Thông tin công việc", "Giá và quy tắc áp dụng", "Chi phí hiển thị trước xác nhận"].map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 border-t-2 border-ink py-5 sm:grid-cols-1 sm:pr-5">
                  <span className="font-display text-title-sub font-black text-ink-amber">0{index + 1}</span>
                  <p className="max-w-[24ch] font-bold leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-surface-navy py-section-y text-white">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-body-xs font-black uppercase text-brand-yellow">Điều có thể ảnh hưởng</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-title-section font-black">Mỗi ca có bối cảnh khác nhau.</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {factors.map((factor) => <li key={factor} className="border-t border-white/20 py-4 font-bold text-white/90">{factor}</li>)}
          </ul>
        </Container>
      </section>

      <section className="bg-brand-yellow py-16 md:py-20">
        <Container className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-body-xs font-black uppercase">Giai đoạn pilot</p>
            <h2 className="mt-3 max-w-[17ch] font-display text-title-section font-black">Giá sản xuất chưa được công bố.</h2>
            <p className="mt-4 max-w-[60ch] text-body leading-relaxed text-ink-soft">JobFree đang trong giai đoạn pilot. Chính sách giá áp dụng thực tế sẽ được hiển thị rõ trước khi Employer xác nhận ca.</p>
          </div>
          <Link to="/?pilot=employer#pilot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Trao đổi về pilot <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link to="/faq" className="text-body-sm font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Đọc câu hỏi về chi phí và thanh toán</Link>
        </Container>
      </section>
    </div>
  );
}
