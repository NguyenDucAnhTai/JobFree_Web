import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, ClipboardList, CreditCard, QrCode, Search, Star, UserCheck } from "lucide-react";
import Container from "../../layouts/Container";
import { FinalCTA, PublicHero, SectionHeading } from "../../features/public/components/PublicPrimitives";
import PublicPageMeta from "../../features/public/seo/PublicPageMeta";

type FlowMode="employer"|"worker";
const flows:Record<FlowMode,{title:string;intro:string;steps:string[]}>={
  employer:{title:"Từ nhu cầu đến xác nhận ca",intro:"Doanh nghiệp tạo ca, theo dõi người nhận và ghi nhận kết quả theo từng mốc.",steps:["Tạo job","Chọn yêu cầu","Xác nhận thông tin / chuẩn bị thanh toán","Matching","Worker nhận ca","Check-in","Hoàn thành","Xác nhận"]},
  worker:{title:"Từ job feed đến theo dõi kết quả",intro:"Worker xem thông tin trước khi nhận, điểm danh tại ca và theo dõi các mốc sau đó.",steps:["Xem job feed","Xem chi tiết","Nhận ca","Đến địa điểm","QR check-in","Thực hiện công việc","Check-out","Theo dõi kết quả"]},
};
const icons=[ClipboardList,UserCheck,CreditCard,Search,Check,QrCode,Check,Star];

export default function HowItWorksPage(){
  const [mode,setMode]=useState<FlowMode>("employer");
  const tabs=useRef<Array<HTMLButtonElement|null>>([]);
  const onKeyDown=(event:KeyboardEvent<HTMLButtonElement>)=>{
    if(event.key!=="ArrowRight"&&event.key!=="ArrowLeft")return;
    event.preventDefault();const next=mode==="employer"?"worker":"employer";setMode(next);tabs.current[next==="employer"?0:1]?.focus();
  };
  const active=flows[mode];
  return <>
    <PublicPageMeta
      title="Cách JobFree hoạt động"
      description="Xem các bước riêng của Employer và Worker, từ tạo hoặc tìm ca đến xác nhận và theo dõi kết quả."
      canonicalPath="/how-it-works"
    />
    <PublicHero eyebrow="Cách JobFree hoạt động" title={<>Một quy trình.<br/><span className="text-ink-amber">Hai góc nhìn.</span></>} description="Từ lúc tạo ca đến khi xác nhận kết quả, mỗi bên có một luồng riêng và các trạng thái cần theo dõi." primaryLabel="Đăng ký pilot" secondaryLabel="Liên hệ JobFree" secondaryTo="/contact" visual={<ProcessPreview/>}/>
    <section id="content" className="bg-white py-section-y"><Container><SectionHeading eyebrow="Chọn vai trò" title="Xem các bước theo cách của bạn." description="Đổi góc nhìn để xem luồng tương ứng; các bước được trình bày tách biệt, không cần kết nối tài khoản."/>
      <div role="tablist" aria-label="Chọn quy trình JobFree" className="inline-grid w-full max-w-xl grid-cols-2 rounded-2xl border border-ink/10 bg-surface-sand p-1.5">
        {([["employer","Tôi cần tuyển người"],["worker","Tôi muốn nhận việc"]] as const).map(([key,label],i)=><button key={key} ref={node=>{tabs.current[i]=node}} type="button" role="tab" id={`flow-tab-${key}`} aria-selected={mode===key} aria-controls="flow-panel" tabIndex={mode===key?0:-1} onClick={()=>setMode(key)} onKeyDown={onKeyDown} className={`min-h-12 rounded-xl px-3 py-3 text-body-xs font-black transition-colors sm:text-body-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${mode===key?"bg-ink text-brand-yellow":"text-ink-soft hover:bg-white"}`}>{label}</button>)}
      </div>
      <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${mode}`} tabIndex={0} className="mt-8 rounded-card border border-ink/10 bg-surface-cream p-5 sm:p-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
        <h3 className="text-title-sub font-black text-ink">{active.title}</h3><p className="mt-3 max-w-[65ch] text-body-sm text-ink-soft">{active.intro}</p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{active.steps.map((step,i)=>{const Icon=icons[i];return <li key={step} className="min-h-32 rounded-xl border border-ink/10 bg-white p-4"><div className="flex items-center justify-between"><span className="text-body-xs font-black text-ink-amber">0{i+1}</span><Icon size={19} className="text-ink-soft" aria-hidden="true"/></div><p className="mt-5 font-black text-ink">{step}</p></li>})}</ol>
      </div>
    </Container></section>
    <section className="bg-surface-navy py-section-y"><Container><SectionHeading eyebrow="Một hành trình chung" title="Theo dõi tiến trình qua từng mốc." light description="Mỗi mốc phản ánh một sự kiện riêng trong quá trình thực hiện ca."/><ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[[Search,"Matching"],[UserCheck,"Confirmation"],[QrCode,"Attendance"],[Check,"Completion"],[Star,"Review"]].map(([Icon,label],i)=>{const StepIcon=Icon as typeof Check;return <li key={label as string} className="relative flex min-h-32 flex-col justify-between border-t-2 border-brand-yellow/60 pt-4 lg:min-h-40"><span className="text-body-xs font-bold text-brand-yellow">MỐC 0{i+1}</span><StepIcon className="absolute right-1 top-4 text-white/50" size={20} aria-hidden="true"/><h3 className="text-title-sub font-black text-white">{label as string}</h3>{i<4&&<ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-brand-yellow lg:block" size={20} aria-hidden="true"/>}</li>})}</ol>
      <p className="mt-8 max-w-3xl border-l-2 border-brand-yellow pl-4 text-body-sm leading-relaxed text-white/70">Xác nhận thanh toán, hoàn thành ca, giải ngân và chi trả cho Worker là các trạng thái khác nhau. Một mốc không tự động xác nhận mốc còn lại.</p>
    </Container></section>
    <FinalCTA title="Biết rõ từng bước trước khi bắt đầu." description="Chọn cách tham gia phù hợp và trao đổi với JobFree về pilot." label="Bắt đầu với JobFree"/>
  </>;
}

function ProcessPreview(){return <div className="rounded-[28px] border-2 border-ink bg-white p-5 shadow-[0_10px_0_#101010] sm:p-7" aria-label="Minh họa các giai đoạn của một ca"><div className="flex items-center justify-between"><div><p className="text-body-xs font-black uppercase text-ink-muted">MỘT CA JOBFREE</p><h2 className="mt-2 text-title-sub font-black text-ink">Từng bước có trạng thái</h2></div><span className="grid h-12 w-12 place-items-center rounded-full bg-brand-yellow text-ink"><QrCode size={23} aria-hidden="true"/></span></div><ol className="mt-7 space-y-3">{[["Matching","Tìm người phù hợp"],["Confirmation","Worker xác nhận ca"],["Attendance","Ghi nhận check-in/out"],["Completion","Xác nhận công việc"],["Review","Đánh giá sau ca"]].map(([title,body],i)=><li key={title} className="flex items-center gap-4 rounded-xl bg-surface-cream p-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black ${i<2?"bg-brand-yellow text-ink":"bg-white text-ink-soft"}`}>{i<2?<Check size={17} aria-hidden="true"/>:`0${i+1}`}</span><div><p className="font-black text-ink">{title}</p><p className="text-body-xs text-ink-muted">{body}</p></div></li>)}</ol></div>}
