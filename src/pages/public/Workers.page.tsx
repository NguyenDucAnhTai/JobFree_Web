import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Bookmark, BriefcaseBusiness, CalendarClock, Check, Clock3, MapPin, ShieldCheck, WalletCards } from "lucide-react";
import Container from "../../components/shared/Container";
import { FinalCTA, PublicHero, SectionHeading } from "../../features/public/components/PublicPrimitives";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const benefits = ["Chủ động chọn thời gian phù hợp","Xem mức trả trước khi nhận","Tìm ca theo khu vực","Không phải tự tìm khách","Tích lũy lịch sử uy tín","Theo dõi trạng thái ca rõ ràng"];
const categories = ["Phụ shop","Phụ kho","Sự kiện","F&B","Promotion","Hospitality"];
const onboarding = ["Đăng ký","Xác minh","Chọn kỹ năng","Nhận job phù hợp","Check-in","Hoàn thành","Theo dõi thanh toán + rating"];
const details = [[CalendarClock,"Thời gian","Ngày làm, giờ bắt đầu và thời lượng ca."],[MapPin,"Địa điểm","Khu vực và địa chỉ làm việc được cung cấp."],[BriefcaseBusiness,"Loại công việc","Nhiệm vụ dự kiến trong ca."],[WalletCards,"Mức trả","Thông tin tiền công trước khi bạn nhận ca."],[Check,"Yêu cầu","Kỹ năng hoặc điều kiện cần có."],[ShieldCheck,"Thông tin liên quan","Bối cảnh Employer và ca để bạn cân nhắc."]];

export default function WorkersPage() {
  return <>
    <PublicPageMeta
      title="JobFree cho Worker — Tìm ca phù hợp"
      description="Tìm hiểu cách xem thời gian, địa điểm, yêu cầu và mức trả hiển thị trước khi cân nhắc nhận một ca làm."
      canonicalPath="/workers"
    />
    <PublicHero eyebrow="Dành cho Worker" title={<>Rảnh lúc nào,<br/><span className="text-ink-amber">nhận việc lúc đó.</span></>} description="Xem trước thời gian, địa điểm, yêu cầu công việc và mức trả. Bạn chủ động cân nhắc ca phù hợp trước khi xác nhận." primaryLabel="Đăng ký nhận việc" primaryTo="/?pilot=worker#pilot" secondaryLabel="Xem cách nhận job" visual={<JobFeed />} />
    <section id="content" className="bg-white py-section-y"><Container><SectionHeading eyebrow="Linh hoạt theo lịch của bạn" title="Chọn ca hợp với thời gian và kỹ năng."/><div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((item,i)=><div key={item} className="flex items-center gap-4 border-t border-ink/15 py-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-yellow text-sm font-black text-ink">{String(i+1).padStart(2,"0")}</span><p className="font-bold text-ink">{item}</p></div>)}</div></Container></section>
    <section className="bg-surface-cream py-section-y"><Container><SectionHeading eyebrow="Một vài nhóm việc" title="Nhiều kiểu ca, chung một điểm bắt đầu." description="Danh mục minh họa các nhóm công việc có thể phù hợp với mô hình ca ngắn."/><div className="flex flex-wrap gap-3">{categories.map((item,i)=><span key={item} className={`rounded-full border px-5 py-3 text-body-sm font-black ${i%3===0?"border-ink bg-brand-yellow text-ink":"border-ink/15 bg-white text-ink"}`}>{item}</span>)}</div></Container></section>
    <section className="bg-surface-navy py-section-y"><Container><SectionHeading eyebrow="Bắt đầu nhận ca" title="Từ hồ sơ đến ca đầu tiên." light/><ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{onboarding.map((step,i)=><li key={step} className="min-h-36 rounded-card border border-white/10 bg-white/[0.06] p-5"><span className="text-body-xs font-black text-brand-yellow">BƯỚC 0{i+1}</span><h3 className="mt-4 text-title-sub font-black text-white">{step}</h3></li>)}</ol><p className="mt-6 max-w-3xl border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-white/70">Hoàn thành ca, xác nhận kết quả, theo dõi thanh toán và nhận đánh giá là các mốc riêng. Thời điểm chi trả phụ thuộc quy trình áp dụng cho từng ca.</p></Container></section>
    <section className="bg-white py-section-y"><Container><SectionHeading eyebrow="Rõ trước khi nhận" title="Đọc đủ thông tin, rồi tự quyết định." description="Chi tiết hiển thị trước khi nhận giúp bạn cân nhắc mức phù hợp của ca."/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{details.map(([Icon,title,body])=>{const ItemIcon=Icon as typeof Check;return <article key={title as string} className="border-t-2 border-ink/10 pt-5"><ItemIcon size={23} className="text-ink-amber" aria-hidden="true"/><h3 className="mt-4 font-black text-ink">{title as string}</h3><p className="mt-2 text-body-sm text-ink-soft">{body as string}</p></article>})}</div></Container></section>
    <FinalCTA title="Biến thời gian rảnh thành những ca phù hợp với bạn." description="Đăng ký quan tâm để trao đổi về nhóm việc và khu vực đang mở pilot." label="Đăng ký nhận việc" to="/?pilot=worker#pilot"/>
  </>;
}

function JobFeed() {
  const reduceMotion=useReducedMotion();
  return <div className="relative mx-auto max-w-[430px] px-3 pb-5 pt-3" aria-label="Minh họa danh sách công việc trên JobFree">
    <div className="absolute inset-x-10 bottom-0 top-12 rotate-[-5deg] rounded-[30px] border border-ink/10 bg-white/60" aria-hidden="true"/>
    <motion.article initial={reduceMotion?false:{opacity:0,y:22,rotate:2}} animate={{opacity:1,y:0,rotate:0}} transition={{duration:.45}} className="relative rounded-[28px] border-2 border-ink bg-white p-5 shadow-[0_10px_0_#101010] sm:p-6">
      <div className="flex items-center justify-between"><span className="rounded-full bg-brand-yellow px-3 py-1 text-body-xs font-black text-ink">PHÙ HỢP KỸ NĂNG</span><span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink"><Bookmark size={19}/></span></div>
      <p className="mt-6 text-body-xs font-black uppercase text-ink-muted">CÔNG VIỆC GỢI Ý</p><h3 className="mt-2 max-w-[17ch] text-2xl font-black leading-tight text-ink">Nhân viên hỗ trợ sự kiện</h3>
      <div className="mt-5 grid gap-3 text-body-sm font-medium text-ink-soft"><p className="flex items-center gap-2"><MapPin size={17} aria-hidden="true"/>Quận 7 · 3.2 km</p><p className="flex items-center gap-2"><Clock3 size={17} aria-hidden="true"/>18:00 — 22:00</p></div>
      <div className="mt-5 flex items-end justify-between border-t border-ink/10 pt-5"><div><p className="text-body-xs font-bold text-ink-muted">MỨC TRẢ HIỂN THỊ</p><p className="mt-1 text-3xl font-black text-ink">280.000đ</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-brand-yellow text-ink"><ArrowUpRight size={21} aria-hidden="true"/></span></div>
      <div aria-hidden="true" className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-body-sm font-black text-white">Xem công việc<ArrowUpRight size={17}/></div>
    </motion.article><p className="relative mt-5 text-center text-body-xs font-medium text-ink-muted">Minh họa thẻ công việc · dữ liệu mẫu</p>
    <motion.div initial={false} animate={reduceMotion?{}:{y:[0,-4,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className="absolute -right-1 top-16 hidden rounded-xl border border-ink/10 bg-white px-4 py-3 text-body-xs font-black text-ink shadow-card-soft sm:block">Ca gần bạn <span className="ml-1 text-ink-amber">+12</span></motion.div>
  </div>;
}
