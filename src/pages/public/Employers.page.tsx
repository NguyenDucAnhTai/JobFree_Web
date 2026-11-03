import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock3, MapPin, Users, ClipboardCheck, QrCode, Star, Package, Store, Utensils, PartyPopper, Hotel, Megaphone } from "lucide-react";
import Container from "../../components/shared/Container";
import { FinalCTA, PublicHero, SectionHeading } from "../../features/public/components/PublicPrimitives";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

const pains = [
  [Clock3, "Thiếu người sát giờ", "Ca đã lên lịch nhưng vẫn còn vị trí trống khi giờ bắt đầu đến gần."],
  [Users, "Tuyển qua group khó kiểm soát", "Tin nhắn rời rạc khiến việc xác nhận ai nhận ca và ai còn đang cân nhắc trở nên khó theo dõi."],
  [ClipboardCheck, "Không chắc worker sẽ xuất hiện", "Thiếu trạng thái xác nhận và ghi nhận giờ đến khiến đội vận hành khó chủ động."],
  [Star, "Thiếu lịch sử chất lượng rõ ràng", "Thông tin về những lần làm việc trước chưa được tập hợp để tham khảo cho ca sau."],
] as const;
const useCases = [[Utensils,"F&B"],[Store,"Retail"],[Package,"Kho vận"],[PartyPopper,"Sự kiện"],[Hotel,"Hospitality"],[Megaphone,"Promotion / Activation"]] as const;
const steps = ["Đăng ca","JobFree matching","Worker xác nhận","QR check-in","Hoàn thành công việc","Xác nhận & đánh giá"];

export default function EmployersPage() {
  return <>
    <PublicPageMeta
      title="JobFree cho doanh nghiệp — Điều phối ca ngắn"
      description="Tìm hiểu cách mô tả nhu cầu, theo dõi matching, xác nhận và các mốc vận hành ca ngắn với JobFree."
      canonicalPath="/employers"
    />
    <PublicHero eyebrow="Dành cho doanh nghiệp" title={<>Thiếu người ca này?<br/><span className="text-ink-amber">Tìm worker phù hợp cho ca sắp tới.</span></>} description="Đăng ca với thời gian, địa điểm, mức trả và yêu cầu rõ ràng. Theo dõi quá trình matching và tình trạng điểm danh trên cùng một luồng." primaryLabel="Đăng ký tuyển người" primaryTo="/?pilot=employer#pilot" secondaryLabel="Xem cách hoạt động" visual={<DispatchBoard />} />
    <section id="content" className="bg-white py-section-y"><Container><SectionHeading eyebrow="Nỗi đau vận hành" title="Lấp đúng chỗ trống, bớt chạy theo tin nhắn." description="Khi một ca cần người gấp, thông tin thiếu rõ ràng khiến cả quản lý lẫn worker mất thời gian."/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{pains.map(([Icon,title,body],i)=><article key={title} className="rounded-card border border-ink/10 bg-surface-cream p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-yellow text-ink"><Icon size={21} aria-hidden="true"/></span><p className="mt-5 text-body-xs font-black text-ink-amber">0{i+1}</p><h3 className="mt-2 text-title-sub font-black text-ink">{title}</h3><p className="mt-3 text-body-sm text-ink-soft">{body}</p></article>)}</div></Container></section>
    <section className="bg-surface-cream py-section-y"><Container><SectionHeading eyebrow="Nhóm công việc" title="Linh hoạt theo nhịp vận hành của bạn." description="Bắt đầu từ những ca ngắn, có thời gian và yêu cầu cụ thể."/><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{useCases.map(([Icon,label])=><div key={label} className="flex min-h-32 flex-col justify-between rounded-card border border-ink/15 bg-white p-5"><Icon size={24} className="text-ink-amber" aria-hidden="true"/><span className="text-body-sm font-black text-ink">{label}</span></div>)}</div></Container></section>
    <section className="bg-surface-navy py-section-y"><Container><SectionHeading eyebrow="Luồng dành cho doanh nghiệp" title="Từ đăng ca đến xác nhận, từng bước đều rõ." light/><ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{steps.map((step,i)=><li key={step} className="flex items-start gap-4 rounded-card border border-white/10 bg-white/[0.06] p-5"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-yellow text-sm font-black text-ink">{i+1}</span><div><h3 className="font-black text-white">{step}</h3>{i===3&&<p className="mt-2 text-body-xs text-white/60">Ghi nhận điểm danh tại ca.</p>}</div></li>)}</ol></Container></section>
    <section className="bg-white py-section-y"><Container><SectionHeading eyebrow="Kiểm soát vận hành" title="Thông tin ca nằm trong tầm nhìn." description="Một nơi để theo dõi hồ sơ worker, diễn biến ca và bằng chứng điểm danh, thay vì ghép các mảnh thông tin từ nhiều cuộc trò chuyện."/><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{[[Users,"Hồ sơ worker","Thông tin hồ sơ liên quan đến việc nhận ca."],[Clock3,"Lịch sử ca","Tham khảo các ca trước và trạng thái theo từng ca."],[Star,"Đánh giá","Ghi nhận chất lượng sau khi công việc được xác nhận."],[QrCode,"QR check-in/out","Hỗ trợ ghi nhận thời điểm bắt đầu và kết thúc ca."],[ClipboardCheck,"Bằng chứng","Lưu dấu vết xác nhận phục vụ đối chiếu vận hành."],[Check,"Trạng thái ca","Theo dõi tiến độ matching, xác nhận, điểm danh và hoàn thành."]].map(([Icon,title,body])=>{const ItemIcon=Icon as typeof Check; return <div key={title as string} className="flex gap-4 border-t-2 border-ink/10 py-5"><ItemIcon className="mt-1 shrink-0 text-ink-amber" size={23} aria-hidden="true"/><div><h3 className="font-black text-ink">{title as string}</h3><p className="mt-2 text-body-sm text-ink-soft">{body as string}</p></div></div>})}</div></Container></section>
    <FinalCTA title="Ca tiếp theo không cần bắt đầu bằng 30 tin nhắn." description="Chia sẻ nhu cầu tuyển ca để đội JobFree trao đổi về pilot và khu vực phù hợp." label="Đăng ký tuyển người" to="/?pilot=employer#pilot"/>
  </>;
}

function DispatchBoard() {
  const reduceMotion=useReducedMotion();
  return <motion.div initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="relative rounded-[28px] border-2 border-ink bg-white p-4 shadow-[0_10px_0_#101010] sm:p-6" aria-label="Minh họa bảng điều phối ca làm">
    <div className="flex items-center justify-between border-b border-ink/10 pb-4"><div><p className="text-body-xs font-bold text-ink-muted">TỔNG QUAN CA</p><p className="mt-1 font-black text-ink">Thứ Sáu, 18 tháng 9</p></div><span className="rounded-full bg-brand-yellow-muted px-3 py-1 text-body-xs font-black text-ink">3 ca hôm nay</span></div>
    <div className="mt-5 rounded-2xl border border-ink/10 bg-surface-cream p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><span className="inline-flex items-center gap-2 text-body-xs font-black text-ink-amber"><span className="h-2 w-2 animate-pulse rounded-full bg-brand-amber"/>CA TỐI NAY</span><h3 className="mt-2 text-title-sub font-black text-ink">Kho Thủ Đức</h3></div><span className="rounded-full border border-green-700/20 bg-green-50 px-3 py-1 text-body-xs font-bold text-green-800">Đúng tiến độ</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-body-sm sm:grid-cols-3"><div className="flex items-center gap-2 text-ink-soft"><Clock3 size={16} aria-hidden="true"/>18:00 — 22:00</div><div className="flex items-center gap-2 text-ink-soft"><MapPin size={16} aria-hidden="true"/>Thủ Đức</div><div className="flex items-center gap-2 text-ink-soft"><Users size={16} aria-hidden="true"/>Cần: 8</div></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white p-3"><p className="text-body-xs font-semibold text-ink-muted">Đã xác nhận</p><p className="mt-1 text-2xl font-black text-ink">6 <span className="text-sm font-bold">/ 8</span></p></div><div className="rounded-xl bg-white p-3"><p className="text-body-xs font-semibold text-ink-muted">Đang matching</p><p className="mt-1 text-2xl font-black text-ink">2 <span className="text-sm font-bold">còn lại</span></p></div></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10"><motion.div className="h-full rounded-full bg-brand-yellow" initial={{width:reduceMotion?"75%":"0%"}} animate={{width:"75%"}} transition={{duration:.8,delay:.2}}/></div>
    </div><p className="mt-4 text-center text-body-xs font-medium text-ink-muted">Minh họa giao diện theo dõi ca</p>
  </motion.div>;
}
