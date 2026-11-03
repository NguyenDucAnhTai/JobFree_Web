import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../../layouts/Container";
import { findBlogArticle, type BlogTopic } from "../../features/public/blog/blog.data";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const contextualLinks: Record<BlogTopic, { label: string; to: string }> = {
  operations: { label: "Xem cách JobFree hoạt động", to: "/how-it-works" },
  employer: { label: "Tìm hiểu pilot cho Employer", to: "/?pilot=employer#pilot" },
  worker: { label: "Tìm hiểu pilot cho Worker", to: "/?pilot=worker#pilot" },
  "flexible-work": { label: "Khám phá loại công việc", to: "/job-categories" },
  product: { label: "Xem câu hỏi thường gặp", to: "/faq" },
};

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = findBlogArticle(slug);

  if (!article) {
    return (
      <div className="bg-surface-cream py-24 text-ink">
        <PublicPageMeta
          title="Không tìm thấy bài viết — Blog JobFree"
          description="Bài viết bạn tìm hiện không có trong Blog JobFree. Quay lại danh sách để xem các hướng dẫn khác."
          robots="noindex,follow"
        />
        <Container className="max-w-3xl">
          <p className="text-body-xs font-black uppercase text-ink-amber">Blog JobFree</p>
          <h1 className="mt-4 font-display text-title-section font-black">Không tìm thấy bài viết này.</h1>
          <p className="mt-5 max-w-[58ch] text-body leading-relaxed text-ink-soft">Đường dẫn có thể đã thay đổi hoặc bài viết chưa nằm trong danh sách. Bạn có thể quay lại Blog để chọn nội dung khác.</p>
          <Link to="/blog" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-ink bg-brand-yellow px-6 py-3 text-body-sm font-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <ArrowLeft size={18} aria-hidden="true" /> Về Blog
          </Link>
        </Container>
      </div>
    );
  }

  const relatedArticles = (article.relatedSlugs ?? []).flatMap((relatedSlug) => {
    const relatedArticle = findBlogArticle(relatedSlug);
    return relatedArticle && relatedArticle.slug !== article.slug ? [relatedArticle] : [];
  });
  const contextualLink = contextualLinks[article.topic];

  return (
    <div className="bg-surface-cream text-ink">
      <PublicPageMeta
        title={`${article.title} — JobFree`}
        description={article.description}
        openGraphType="article"
        canonicalPath={`/blog/${article.slug}`}
      />
      <article>
        <header className="pt-[calc(var(--spacing-nav-h)+1.5rem)]">
          <Container>
            <nav aria-label="Breadcrumb" className="text-body-xs font-bold text-ink-muted">
              <Link to="/blog" className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Blog</Link>
              <span aria-hidden="true" className="px-2">/</span>
              <span aria-current="page" className="text-ink">{article.topicLabel}</span>
            </nav>

            <div className="mx-auto max-w-[76ch] pb-10 pt-10 md:pb-14 md:pt-14">
              <p className="text-body-xs font-black uppercase text-ink-amber">{article.topicLabel}</p>
              <h1 className="mt-4 font-display text-title-section font-black leading-[1.06]">{article.title}</h1>
              <p className="mt-6 max-w-[68ch] text-hero-desc font-medium leading-relaxed text-ink-soft">{article.description}</p>
            </div>
          </Container>
          <div className="h-1.5 bg-brand-yellow" aria-hidden="true" />
        </header>

        <div className="bg-white py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-[70ch]">
              {article.sections.map((section, index) => (
                <section key={`${article.slug}-${section.heading ?? index}`} className={index > 0 ? "mt-10 md:mt-12" : ""}>
                  {section.heading && <h2 className="font-display text-title-sub font-black leading-snug">{section.heading}</h2>}
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-body leading-[1.9] text-ink-soft">{paragraph}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3 pl-6 text-body leading-[1.85] text-ink-soft marker:text-ink-amber">
                      {section.bullets.map((bullet) => <li key={bullet} className="list-disc">{bullet}</li>)}
                    </ul>
                  )}
                  {section.note && (
                    <aside aria-label="Lưu ý" className="mt-6 border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-ink-soft">
                      {section.note}
                    </aside>
                  )}
                </section>
              ))}
            </div>
          </Container>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section aria-labelledby="related-heading" className="py-section-y">
          <Container className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <div>
              <h2 id="related-heading" className="max-w-[12ch] font-display text-title-section font-black leading-tight">Đọc tiếp</h2>
              <Link to="/blog" className="mt-5 inline-flex min-h-10 items-center gap-2 text-body-sm font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Tất cả bài viết <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="border-t-2 border-ink">
              {relatedArticles.map((relatedArticle) => (
                <article key={relatedArticle.slug} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[minmax(130px,0.38fr)_minmax(0,1.62fr)] sm:gap-7 sm:py-6">
                  <p className="pt-1 text-body-xs font-black uppercase text-ink-amber">{relatedArticle.topicLabel}</p>
                  <div>
                    <h3 className="max-w-[34ch] font-display text-title-sub font-black leading-snug">
                      <Link to={`/blog/${relatedArticle.slug}`} className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none">
                        {relatedArticle.title}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[68ch] text-body-sm leading-relaxed text-ink-soft">{relatedArticle.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-brand-yellow py-14 md:py-16">
        <Container className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-body-xs font-black uppercase text-ink-amber">{article.topicLabel}</p>
            <h2 className="mt-2 max-w-[18ch] font-display text-title-sub font-black">Tiếp tục tìm hiểu theo nhu cầu của bạn.</h2>
          </div>
          <Link to={contextualLink.to} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-ink bg-ink px-6 py-3 text-body-sm font-black text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {contextualLink.label} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
