import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../components/shared/Container";
import featuredShiftImage from "../../assets/blog/shift-brief-editorial.jpg";
import { blogArticles, blogTopics } from "../../features/public/blog/blog.data";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const featuredArticle = blogArticles.find((article) => article.featured) ?? blogArticles[0];
const directoryTopics = blogTopics
  .map((topic) => ({
    ...topic,
    articles: blogArticles.filter(
      (article) => article.topic === topic.id && article.slug !== featuredArticle.slug,
    ),
  }))
  .filter((topic) => topic.articles.length > 0);

export default function BlogPage() {
  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title="Blog JobFree — Hướng dẫn vận hành ca"
        description="Hướng dẫn thực tế về cách chuẩn bị ca, cân nhắc công việc và theo dõi từng bước vận hành cho Employer và Worker."
        canonicalPath="/blog"
      />
      <section className="pt-[calc(var(--spacing-nav-h)+1.5rem)]">
        <Container className="grid items-center gap-9 pb-14 pt-7 md:pb-20 lg:min-h-[600px] lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-16">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">Blog JobFree</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-title-hero font-black leading-[1.03]">
              Hiểu ca làm trước khi bắt đầu.
            </h1>
            <p className="mt-6 max-w-[52ch] text-hero-desc font-medium leading-relaxed text-ink-soft">
              Hướng dẫn thực tế về cách chuẩn bị ca, cân nhắc công việc và theo dõi từng bước vận hành.
            </p>
            <div className="mt-10 border-t-2 border-ink pt-5">
              <p className="text-body-xs font-black uppercase text-ink-amber">{featuredArticle.topicLabel}</p>
              <h2 className="mt-3 max-w-[18ch] font-display text-title-sub font-black leading-tight">
                <Link to={`/blog/${featuredArticle.slug}`} className="underline decoration-brand-yellow decoration-4 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[54ch] text-body-sm leading-relaxed text-ink-soft">
                {featuredArticle.description}
              </p>
              <Link to={`/blog/${featuredArticle.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-body-sm font-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Đọc bài nổi bật <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <Link to={`/blog/${featuredArticle.slug}`} aria-label={`Đọc bài: ${featuredArticle.title}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <img src={featuredShiftImage} alt="Một người chuẩn bị công việc bên quầy phục vụ trong quán." width={1536} height={1024} fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
            <div className="mt-3 flex items-center justify-between gap-4 border-b border-ink/20 pb-3 text-body-xs font-bold text-ink-muted">
              <span>Chuẩn bị ca làm</span>
              <span className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">Đọc bài <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        </Container>
      </section>

      <nav aria-label="Chủ đề bài viết" className="border-y border-ink/15 bg-white">
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="mr-1 text-body-xs font-black uppercase text-ink-amber">Chủ đề</span>
          {directoryTopics.map((topic) => (
            <a key={topic.id} href={`#topic-${topic.id}`} className="min-h-10 content-center text-body-sm font-bold text-ink-soft underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              {topic.label}
            </a>
          ))}
        </Container>
      </nav>

      <section className="py-section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
          <div className="h-fit lg:sticky lg:top-28">
            <h2 className="max-w-[12ch] font-display text-title-section font-black leading-tight">Bài viết theo nhu cầu.</h2>
            <p className="mt-5 max-w-[36ch] text-body leading-relaxed text-ink-soft">
              Chọn một chủ đề để đọc những điều cần biết trước, trong và sau ca.
            </p>
          </div>

          <div>
            {directoryTopics.map((topic) => (
              <section key={topic.id} id={`topic-${topic.id}`} aria-labelledby={`heading-${topic.id}`} className="scroll-mt-28 border-t-2 border-ink pt-5 [&+section]:mt-12">
                <h3 id={`heading-${topic.id}`} className="font-display text-title-sub font-black">{topic.label}</h3>
                <div className="mt-2">
                  {topic.articles.map((article) => (
                    <article key={article.slug} className="grid gap-3 border-b border-ink/15 py-5 sm:grid-cols-[minmax(130px,0.38fr)_minmax(0,1.62fr)] sm:gap-7 sm:py-6">
                      <p className="pt-1 text-body-xs font-black uppercase text-ink-amber">{article.topicLabel}</p>
                      <div>
                        <h4 className="max-w-[32ch] font-display text-title-sub font-black leading-snug">
                          <Link to={`/blog/${article.slug}`} className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none">
                            {article.title}
                          </Link>
                        </h4>
                        <p className="mt-2 max-w-[68ch] text-body-sm leading-relaxed text-ink-soft">{article.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-yellow py-14 md:py-16">
        <Container className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h2 className="max-w-[17ch] font-display text-title-sub font-black">Tìm hiểu các nhóm công việc JobFree hỗ trợ.</h2>
            <p className="mt-3 max-w-[54ch] text-body-sm leading-relaxed text-ink-soft">Xem bối cảnh, nhiệm vụ ví dụ và thông tin nên rõ trước khi xác nhận ca.</p>
          </div>
          <Link to="/job-categories" className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            Xem loại công việc <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
