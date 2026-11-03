import { ArrowRight, Building2, CalendarDays, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const partnershipDirections = [
  {
    icon: Building2,
    title: "Doanh nghiệp và đội vận hành",
    fit: "Đơn vị có nhu cầu nhân sự theo ca ngắn, thay đổi theo thời điểm hoặc khu vực.",
    collaboration: "Có thể cùng thử quy trình, thống nhất thông tin ca cần làm rõ và góp ý sau mỗi lần thử nghiệm.",
  },
  {
    icon: Users,
    title: "Cộng đồng Worker",
    fit: "Nhóm cộng đồng muốn giúp thành viên hiểu cơ hội công việc và những điều nên chuẩn bị.",
    collaboration: "Có thể chia sẻ thông tin pilot, ghi nhận câu hỏi phổ biến và góp ý cách giải thích quy trình.",
  },
  {
    icon: GraduationCap,
    title: "Đào tạo và phát triển kỹ năng",
    fit: "Đơn vị quan tâm đến việc giúp Worker hiểu kỳ vọng thực tế của từng nhóm công việc.",
    collaboration: "Có thể trao đổi về nội dung hướng dẫn hoặc kỹ năng thực hành phù hợp với nhu cầu cụ thể.",
  },
  {
    icon: CalendarDays,
    title: "Hoạt động được tổ chức theo ca",
    fit: "Đơn vị tổ chức hoạt động có nhiều vai trò, thời điểm và điểm tập trung cần phối hợp rõ.",
    collaboration: "Có thể làm rõ vai trò, thời gian, địa điểm và cách cập nhật thay đổi trước khi thử nghiệm.",
  },
] as const;

const collaborationSteps = [
  "Trao đổi nhu cầu và bối cảnh",
  "Xác định phạm vi pilot phù hợp",
  "Thống nhất thông tin và cách phối hợp",
  "Thử nghiệm trong phạm vi đã thống nhất",
  "Ghi nhận phản hồi và điều cần điều chỉnh",
] as const;

const principles = [
  ["Rõ trước khi tham gia", "Vai trò, kỳ vọng và giới hạn phối hợp được nói rõ từ đầu."],
  ["Không hứa quá khả năng", "Mỗi đề xuất được trao đổi theo nguồn lực và bối cảnh thực tế."],
  ["Có thể đối chiếu", "Thông tin và trạng thái cần đủ rõ để các bên cùng theo dõi."],
  ["Thử nghiệm có phạm vi", "Pilot bắt đầu ở quy mô phù hợp, có nội dung cần ghi nhận."],
] as const;

export default function PartnersPage() {
  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title="Hợp tác cùng JobFree"
        description="Trao đổi các hướng phối hợp tiềm năng với JobFree trong giai đoạn xây dựng hệ sinh thái nhân sự ca ngắn và pilot."
        canonicalPath="/partners"
      />

      <section className="pt-[calc(var(--spacing-nav-h)+2rem)]">
        <Container className="grid gap-10 pb-16 pt-8 md:pb-20 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20 lg:py-20">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">Hợp tác cùng JobFree</p>
            <h1 className="mt-5 max-w-[13ch] font-display text-title-hero font-black leading-[1.03]">
              Hợp tác để mỗi ca vận hành rõ hơn.
            </h1>
          </div>
          <div className="border-l-2 border-brand-yellow pl-5 sm:pl-7">
            <p className="max-w-[54ch] text-hero-desc font-medium leading-relaxed text-ink-soft">
              JobFree đang xây dựng một hệ sinh thái cho công việc ca ngắn, kết nối nhu cầu vận hành, Worker và những tổ chức có thể hỗ trợ việc chuẩn bị ca rõ ràng hơn.
            </p>
            <p className="mt-5 text-body-sm font-bold text-ink-muted">
              Các nội dung dưới đây là hướng có thể trao đổi, không phải danh sách quan hệ hợp tác hiện có.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div className="h-fit lg:sticky lg:top-28">
            <p className="text-body-xs font-black uppercase text-ink-amber">Các hướng có thể hợp tác</p>
            <h2 className="mt-3 max-w-[13ch] font-display text-title-section font-black leading-tight">
              Bắt đầu từ nhu cầu thật.
            </h2>
            <p className="mt-5 max-w-[38ch] text-body leading-relaxed text-ink-soft">
              Hình thức phối hợp được xác định theo bối cảnh, nguồn lực và phạm vi phù hợp của mỗi bên.
            </p>
          </div>

          <div className="border-t-2 border-ink">
            {partnershipDirections.map(({ icon: Icon, title, fit, collaboration }, index) => (
              <article key={title} className="grid gap-4 border-b border-ink/20 py-6 sm:grid-cols-[3rem_1fr] sm:gap-7 md:py-8">
                <div className="flex items-center gap-3 sm:block">
                  <span className="text-body-xs font-black text-ink-amber">0{index + 1}</span>
                  <Icon size={22} className="text-ink" aria-hidden="true" />
                </div>
                <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr] md:gap-8">
                  <div>
                    <h3 className="font-display text-title-sub font-black leading-snug">{title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-ink-soft">{fit}</p>
                  </div>
                  <div className="border-l-2 border-brand-yellow pl-4">
                    <p className="text-body-xs font-black uppercase text-ink-amber">Hình thức có thể trao đổi</p>
                    <p className="mt-2 text-body-sm leading-relaxed text-ink-soft">{collaboration}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-cream py-section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">Trong giai đoạn pilot</p>
            <h2 className="mt-3 max-w-[12ch] font-display text-title-section font-black leading-tight">
              Phối hợp theo từng bước.
            </h2>
          </div>
          <ol className="border-t-2 border-ink">
            {collaborationSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[3rem_1fr] items-start gap-4 border-b border-ink/20 py-5 sm:gap-7">
                <span className="font-display text-title-sub font-black text-ink-amber">0{index + 1}</span>
                <p className="max-w-[48ch] pt-1 font-bold leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface-navy py-section-y text-white">
        <Container className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="text-body-xs font-black uppercase text-brand-yellow">Nguyên tắc phối hợp</p>
            <h2 className="mt-3 max-w-[12ch] font-display text-title-section font-black leading-tight">
              Thử điều có thể kiểm chứng.
            </h2>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {principles.map(([title, description]) => (
              <div key={title} className="border-t border-white/25 py-5">
                <dt className="font-display text-title-sub font-black text-brand-yellow">{title}</dt>
                <dd className="mt-2 max-w-[38ch] text-body-sm leading-relaxed text-white/75">{description}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-brand-yellow py-14 md:py-16">
        <Container className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-body-xs font-black uppercase">Trao đổi theo nhu cầu thực tế</p>
            <h2 className="mt-2 max-w-[17ch] font-display text-title-section font-black leading-tight">
              Cùng xác định bước phù hợp tiếp theo.
            </h2>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
              Trao đổi về hợp tác <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/about" className="inline-flex min-h-12 items-center text-body-sm font-black underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
              Tìm hiểu về JobFree
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
