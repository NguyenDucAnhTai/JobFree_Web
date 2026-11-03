import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import { faqGroups } from "./faq.data";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setOpenItems((current) => ({ ...current, [itemId]: !current[itemId] }));
  };

  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title="Câu hỏi thường gặp về JobFree"
        description="Giải đáp câu hỏi của Employer và Worker về ca làm, matching, xác nhận, thanh toán và giai đoạn pilot."
        canonicalPath="/faq"
      />
      <section className="pt-[calc(var(--spacing-nav-h)+2rem)]">
        <Container className="grid gap-8 pb-14 pt-8 md:pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 lg:py-20">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">FAQ · Câu hỏi thường gặp</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-title-hero font-black leading-[1.02]">Rõ trước khi bắt đầu.</h1>
          </div>
          <p className="max-w-[58ch] text-hero-desc font-medium leading-relaxed text-ink-soft">Thông tin dành cho Employer và Worker về ca làm, quy trình và giai đoạn pilot. Chi tiết cụ thể sẽ theo chính sách được hiển thị cho từng ca.</p>
        </Container>
      </section>

      <section className="bg-white py-section-y">
        <Container className="grid gap-12 lg:grid-cols-[minmax(190px,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
          <aside className="h-fit border-t-2 border-ink pt-5 lg:sticky lg:top-28">
            <p className="text-body-xs font-black uppercase text-ink-amber">Nội dung</p>
            <nav aria-label="Nhóm câu hỏi" className="mt-3 grid">
              {faqGroups.map((group) => <a key={group.id} href={`#${group.id}`} className="border-b border-ink/10 py-3 text-body-sm font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">{group.title}</a>)}
            </nav>
            <div className="mt-8 border-l-2 border-brand-yellow pl-4">
              <p className="font-black">Đang cân nhắc tham gia?</p>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-soft">Chọn luồng phù hợp để xem thông tin pilot.</p>
              <div className="mt-4 grid gap-2">
                <Link to="/?pilot=employer#pilot" className="inline-flex min-h-11 items-center gap-2 text-body-sm font-black underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Employer <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link to="/?pilot=worker#pilot" className="inline-flex min-h-11 items-center gap-2 text-body-sm font-black underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Worker <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </aside>

          <div>
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} className="scroll-mt-28 border-t-2 border-ink pt-5 first:mt-0 [&+section]:mt-12">
                <h2 className="font-display text-title-sub font-black">{group.title}</h2>
                <div className="mt-3">
                  {group.items.map((item, index) => {
                    const panelId = `faq-panel-${item.id}`;
                    const isOpen = Boolean(openItems[item.id]);
                    return (
                      <article key={item.id} className="border-b border-ink/15">
                        <h3>
                          <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleItem(item.id)} className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none">
                            <span className="flex items-start gap-4"><span className="pt-0.5 text-body-xs font-black text-ink-amber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span></span>
                            <ChevronDown size={19} className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                          </button>
                        </h3>
                        <div id={panelId} hidden={!isOpen} className="pb-5 pl-10 pr-8 text-body-sm leading-relaxed text-ink-soft">
                          <p className="max-w-[68ch]">{item.answer}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-yellow py-14">
        <Container className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><p className="text-body-xs font-black uppercase">Còn câu hỏi?</p><h2 className="mt-2 font-display text-title-sub font-black">Tìm hiểu thêm về JobFree.</h2><nav aria-label="Thông tin liên quan" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-body-sm font-bold"><Link to="/pricing" className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Cấu trúc chi phí</Link><Link to="/job-categories" className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Loại công việc</Link><Link to="/how-it-works" className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Cách hoạt động</Link></nav></div>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Liên hệ JobFree <ArrowRight size={18} aria-hidden="true" /></Link>
        </Container>
      </section>
    </div>
  );
}
