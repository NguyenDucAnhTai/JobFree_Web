import { ArrowDownRight, ArrowRight, Building2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../layouts/Container";
import CategoryArtwork from "../../features/public/job-categories/CategoryArtwork";
import { jobCategories } from "../../features/public/job-categories/jobCategories.data";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const featuredCategories = [jobCategories[0], jobCategories[2]];
const directoryCategories = [
  jobCategories[1],
  jobCategories[3],
  jobCategories[4],
  jobCategories[5],
];

const flowSteps = [
  "Loại công việc",
  "Yêu cầu",
  "Thời gian và địa điểm",
  "Matching",
  "Xác nhận",
  "Điểm danh",
  "Hoàn thành",
];

export default function JobCategoriesPage() {
  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title="Loại công việc trên JobFree"
        description="Khám phá các nhóm công việc ca ngắn và thông tin Employer, Worker nên làm rõ trước khi xác nhận ca."
        canonicalPath="/job-categories"
      />
      <section className="relative overflow-hidden pt-[calc(var(--spacing-nav-h)+2rem)]">
        <Container className="grid items-center gap-10 pb-16 pt-8 md:pb-20 lg:min-h-[610px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div className="relative z-10">
            <p className="text-body-xs font-black uppercase text-ink-amber">Loại công việc</p>
            <h1 className="mt-5 max-w-[11ch] font-display text-title-hero font-black leading-[1.02]">
              Ca nào cũng có nhịp riêng.
            </h1>
            <p className="mt-6 max-w-[54ch] text-hero-desc font-medium leading-relaxed text-ink-soft">
              JobFree sắp xếp công việc ca ngắn theo nhiệm vụ, thời gian, địa điểm và kỳ vọng rõ ràng để hai bên hiểu ca trước khi xác nhận.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="#category-directory" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-brand-yellow px-6 py-3 text-body-sm font-black shadow-[0_4px_0_#101010] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                Khám phá loại việc <ArrowDownRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/employers" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border border-ink/20 bg-white/70 px-6 py-3 text-body-sm font-extrabold transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                Dành cho doanh nghiệp
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto grid min-h-[310px] w-full max-w-[570px] grid-cols-[1fr_0.82fr] items-center gap-3 sm:min-h-[380px] sm:gap-5">
            <div className="relative z-10 -rotate-2 border-2 border-ink bg-brand-yellow p-5 shadow-[0_8px_0_#101010] sm:p-7">
              <UtensilMark />
              <p className="mt-10 max-w-[10ch] font-display text-3xl font-black leading-none sm:text-4xl">Nhiều việc. Một ca rõ ràng.</p>
            </div>
            <div className="-mb-16 mt-16 border-2 border-ink bg-surface-navy p-4 text-white sm:p-6">
              <div className="grid gap-3">
                {["Việc cần làm", "Thời gian", "Địa điểm"].map((item, index) => (
                  <div key={item} className={`flex items-center gap-3 border-b border-white/15 pb-3 ${index === 1 ? "translate-x-3" : ""}`}>
                    <span className="h-2.5 w-2.5 bg-brand-yellow" />
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between text-brand-yellow">
                <span className="text-[0.65rem] font-black uppercase">Trước khi xác nhận</span>
                <ArrowRight size={19} />
              </div>
            </div>
          </div>
        </Container>
        <div className="h-2 bg-brand-yellow" aria-hidden="true" />
      </section>

      <section id="category-directory" className="scroll-mt-24 bg-white py-section-y">
        <Container>
          <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-body-xs font-black uppercase text-ink-amber">Danh mục công việc</p>
              <h2 className="mt-3 max-w-[18ch] font-display text-title-section font-black leading-tight">Tìm đúng nhịp công việc.</h2>
            </div>
            <p className="max-w-[42ch] text-body-sm font-medium leading-relaxed text-ink-soft">Mỗi loại việc có bối cảnh khác nhau. Xem ví dụ nhiệm vụ và thông tin nên rõ trước khi nhận ca.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon;
              const isPrimary = index === 0;
              return (
                <Link
                  key={category.slug}
                  to={`/job-categories/${category.slug}`}
                className={`group grid gap-5 border-2 border-ink p-4 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transform-none motion-reduce:transition-none sm:p-6 ${isPrimary ? "bg-surface-cream lg:col-span-7 lg:grid-cols-[0.8fr_1.2fr]" : "bg-brand-yellow lg:col-span-5 lg:grid-cols-1"}`}
                >
                  <div className="flex flex-col justify-between gap-7">
                    <span className="flex h-12 w-12 items-center justify-center border border-ink bg-white"><Icon size={24} aria-hidden="true" /></span>
                    <div>
                      <p className="text-body-xs font-black uppercase text-ink-amber">{category.shortLabel}</p>
                      <h3 className="mt-2 font-display text-title-sub font-black">{category.heroProposition}</h3>
                      <p className="mt-3 max-w-[46ch] text-body-sm font-medium leading-relaxed text-ink-soft">{category.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-body-sm font-black">Xem loại việc <ArrowRight size={17} aria-hidden="true" /></span>
                    </div>
                  </div>
                  <CategoryArtwork category={category} />
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid border-y border-ink/15 sm:grid-cols-2 sm:gap-x-10">
            {directoryCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.slug} to={`/job-categories/${category.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/15 py-5 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:even:border-b-0">
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    <span className="block text-body-xs font-black uppercase text-ink-amber">{category.shortLabel}</span>
                    <span className="mt-1 block font-bold text-ink">{category.heroProposition}</span>
                  </span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface-navy py-section-y text-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-body-xs font-black uppercase text-brand-yellow">Hai góc nhìn</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-title-section font-black leading-tight">Cùng một ca, hai câu hỏi quan trọng.</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <article className="border-t-2 border-brand-yellow pt-5">
                <Building2 size={25} className="text-brand-yellow" aria-hidden="true" />
                <h3 className="mt-5 text-title-sub font-black">Employer</h3>
                <p className="mt-3 text-body font-bold leading-relaxed">“Ca này cần người làm việc gì, ở đâu và vào lúc nào?”</p>
                <p className="mt-3 text-body-sm leading-relaxed text-white/70">Mô tả vai trò, yêu cầu và điều kiện ca để Worker cân nhắc trước khi xác nhận.</p>
              </article>
              <article className="border-t-2 border-brand-yellow pt-5">
                <UserRound size={25} className="text-brand-yellow" aria-hidden="true" />
                <h3 className="mt-5 text-title-sub font-black">Worker</h3>
                <p className="mt-3 text-body font-bold leading-relaxed">“Tôi sẽ làm gì, ở đâu, khi nào và cần chuẩn bị gì?”</p>
                <p className="mt-3 text-body-sm leading-relaxed text-white/70">Xem nhiệm vụ, lịch, vị trí và yêu cầu Employer cung cấp trước khi quyết định.</p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-cream py-section-y">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-body-xs font-black uppercase text-ink-amber">Từ danh mục đến ca làm</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-title-section font-black leading-tight">Loại việc là điểm bắt đầu.</h2>
              <p className="mt-5 max-w-[48ch] text-body leading-relaxed text-ink-soft">Danh mục giúp xác định bối cảnh. Ca còn cần yêu cầu, thời gian và địa điểm cụ thể trước khi matching và xác nhận.</p>
            </div>
            <ol className="grid grid-cols-2 gap-x-5 sm:grid-cols-3 lg:grid-cols-2">
              {flowSteps.map((step, index) => (
                <li key={step} className="relative flex min-h-24 items-start gap-3 border-t border-ink/20 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-ink text-xs font-black">0{index + 1}</span>
                  <span className="pt-1 text-sm font-bold">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-8 max-w-4xl border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-ink-soft">Xác nhận thanh toán, hoàn thành ca, giải ngân và chi trả cho Worker là các mốc riêng. Một mốc không tự động xác nhận mốc còn lại.</p>
        </Container>
      </section>

      <section className="bg-brand-yellow py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <div>
            <h2 className="max-w-[16ch] font-display text-title-section font-black">Bắt đầu từ ca bạn cần.</h2>
            <p className="mt-4 max-w-[54ch] text-body font-medium leading-relaxed text-ink-soft">Trao đổi về nhu cầu tuyển người hoặc nhóm việc bạn muốn nhận trong giai đoạn pilot.</p>
          </div>
              <Link to="/?pilot=employer#pilot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none">Tôi cần tuyển người <ArrowRight size={17} aria-hidden="true" /></Link>
              <Link to="/?pilot=worker#pilot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-white px-6 py-3 text-body-sm font-black text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none">Tôi muốn nhận việc <ArrowRight size={17} aria-hidden="true" /></Link>
        </Container>
      </section>
    </div>
  );
}

function UtensilMark() {
  return <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center border border-ink bg-white text-sm font-black">F&B</span>;
}
