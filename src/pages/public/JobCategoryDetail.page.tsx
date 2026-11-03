import { ArrowLeft, ArrowRight, ClipboardCheck, Clock3, MapPin, UserCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../../layouts/Container";
import CategoryArtwork from "../../features/public/job-categories/CategoryArtwork";
import { findJobCategory } from "../../features/public/job-categories/jobCategories.data";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const trackedItems = [
  { icon: ClipboardCheck, title: "Thông tin ca", text: "Nhiệm vụ, thời gian, địa điểm và yêu cầu được mô tả cho ca." },
  { icon: UserCheck, title: "Matching và xác nhận", text: "Theo dõi tiến trình tìm người và trạng thái xác nhận của hai bên." },
  { icon: Clock3, title: "Điểm danh", text: "Ghi nhận check-in/out theo quy trình áp dụng cho ca." },
  { icon: ClipboardCheck, title: "Hoàn thành và lịch sử", text: "Lưu trạng thái hoàn thành, bằng chứng khi phù hợp và đánh giá sau ca." },
];

export default function JobCategoryDetailPage() {
  const { slug } = useParams();
  const category = findJobCategory(slug);

  if (!category) {
    return (
      <div className="bg-surface-cream py-24 text-ink">
        <PublicPageMeta
          title="Không tìm thấy loại công việc — JobFree"
          description="Danh mục này hiện không có trong danh sách loại công việc JobFree giới thiệu."
          robots="noindex,follow"
        />
        <Container className="max-w-3xl">
          <p className="text-body-xs font-black uppercase text-ink-amber">Không tìm thấy danh mục</p>
          <h1 className="mt-4 font-display text-title-section font-black">Loại công việc này chưa có trong danh mục.</h1>
          <p className="mt-5 text-body leading-relaxed text-ink-soft">Kiểm tra lại đường dẫn hoặc quay về danh sách các loại công việc JobFree giới thiệu.</p>
          <Link to="/job-categories" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-ink bg-brand-yellow px-6 py-3 text-body-sm font-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"><ArrowLeft size={18} aria-hidden="true" /> Xem danh mục</Link>
        </Container>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title={`${category.shortLabel} — Loại công việc trên JobFree`}
        description={category.description}
        canonicalPath={`/job-categories/${category.slug}`}
      />
      <section className="pt-[calc(var(--spacing-nav-h)+1.5rem)]">
        <Container>
          <nav aria-label="Breadcrumb" className="text-body-xs font-bold text-ink-muted">
            <Link to="/job-categories" className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Loại công việc</Link>
            <span aria-hidden="true" className="px-2">/</span><span aria-current="page" className="text-ink">{category.shortLabel}</span>
          </nav>
          <div className="grid items-center gap-10 pb-16 pt-8 md:pb-20 lg:min-h-[580px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-16">
            <div>
              <p className="inline-flex items-center gap-2 text-body-xs font-black uppercase text-ink-amber"><Icon size={16} aria-hidden="true" />{category.title}</p>
              <h1 className="mt-5 max-w-[14ch] font-display text-title-hero font-black leading-[1.02]">{category.heroProposition}</h1>
              <p className="mt-6 max-w-[56ch] text-hero-desc font-medium leading-relaxed text-ink-soft">{category.description}</p>
              <Link to="/?pilot=employer#pilot" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-brand-yellow px-6 py-3 text-body-sm font-black shadow-[0_4px_0_#101010] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transform-none motion-reduce:transition-none">Tìm hiểu về pilot <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
            <div className="mx-auto w-full max-w-[620px]"><CategoryArtwork category={category} /></div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-body-xs font-black uppercase text-ink-amber">Employer</p>
              <h2 className="mt-3 max-w-[14ch] font-display text-title-section font-black leading-tight">Ca này cần hỗ trợ ở đâu?</h2>
              <p className="mt-5 max-w-[44ch] text-body leading-relaxed text-ink-soft">Một vài bối cảnh Employer có thể mô tả khi tạo ca thuộc nhóm {category.shortLabel}.</p>
            </div>
            <div className="border-t-2 border-ink">
              {category.employerUseCases.map((item, index) => (
                <div key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/15 py-5">
                  <span className="text-body-xs font-black text-ink-amber">0{index + 1}</span>
                  <p className="max-w-[58ch] font-bold leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 grid gap-8 border-t border-ink/15 pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-body-xs font-black uppercase text-ink-amber">Ví dụ nhiệm vụ</p>
              <h2 className="mt-3 max-w-[14ch] font-display text-title-sub font-black">Phần việc cần được mô tả cụ thể.</h2>
              <p className="mt-4 max-w-[44ch] text-body-sm leading-relaxed text-ink-soft">Đây là ví dụ dạng nhiệm vụ, không đồng nghĩa mọi Worker đều có cùng kinh nghiệm hoặc được tự động xác nhận cho công việc.</p>
            </div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {category.typicalTasks.map((task, index) => (
                <li key={task} className="flex items-start gap-3 border-b border-ink/15 py-4">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center border border-ink text-[0.65rem] font-black">0{index + 1}</span>
                  <span className="font-bold leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-surface-cream py-section-y">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <InfoList title="Worker nên biết trước" items={category.workerExpectations} icon={UserCheck} />
          <InfoList title="Thông tin ca nên nêu rõ" items={category.usefulShiftInformation} icon={MapPin} />
        </Container>
      </section>

      <section className="bg-surface-navy py-section-y text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-body-xs font-black uppercase text-brand-yellow">Theo dõi theo ca</p>
              <h2 className="mt-3 max-w-[15ch] font-display text-title-section font-black leading-tight">Thông tin theo từng mốc công việc.</h2>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {trackedItems.map(({ icon: ItemIcon, title, text }) => (
                <article key={title} className="border-t border-white/25 py-5">
                  <ItemIcon size={22} className="text-brand-yellow" aria-hidden="true" />
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-white/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-yellow py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <div>
              <p className="text-body-xs font-black uppercase">{category.shortLabel}</p>
              <h2 className="mt-3 max-w-[17ch] font-display text-title-section font-black">Bạn tham gia ca với vai trò nào?</h2>
            </div>
            <Link to="/?pilot=employer#pilot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Tôi cần tuyển người <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link to="/?pilot=worker#pilot" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-white px-6 py-3 text-body-sm font-black text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Tôi muốn nhận việc <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <Link to="/job-categories" className="mt-10 inline-flex items-center gap-2 text-body-sm font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"><ArrowLeft size={17} aria-hidden="true" /> Tất cả loại công việc</Link>
        </Container>
      </section>
    </div>
  );
}

function InfoList({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: readonly string[];
  icon: typeof UserCheck;
}) {
  return (
    <section>
      <Icon size={25} aria-hidden="true" />
      <h2 className="mt-4 font-display text-title-sub font-black">{title}</h2>
      <ul className="mt-4">
        {items.map((item) => <li key={item} className="border-t border-ink/15 py-4 font-medium leading-relaxed">{item}</li>)}
      </ul>
    </section>
  );
}
