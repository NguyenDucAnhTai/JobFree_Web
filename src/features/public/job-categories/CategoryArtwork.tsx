import {
  ArrowDown,
  ArrowRight,
  Check,
  Circle,
} from "lucide-react";
import type { JobCategory } from "./jobCategories.data";

const variantStyles = {
  "service-rhythm": {
    surface: "bg-brand-yellow",
    mark: "border-ink bg-white",
    line: "bg-ink",
  },
  storefront: {
    surface: "bg-surface-cream",
    mark: "border-ink bg-brand-yellow",
    line: "bg-ink/15",
  },
  "operational-lanes": {
    surface: "bg-surface-navy text-white",
    mark: "border-brand-yellow bg-brand-yellow text-ink",
    line: "bg-white/20",
  },
  "event-timeline": {
    surface: "bg-white",
    mark: "border-ink bg-ink text-brand-yellow",
    line: "bg-brand-yellow",
  },
  "campaign-field": {
    surface: "bg-brand-yellow-soft",
    mark: "border-ink bg-white",
    line: "bg-ink/20",
  },
  "guest-service": {
    surface: "bg-surface-sand",
    mark: "border-ink bg-surface-navy text-brand-yellow",
    line: "bg-ink/15",
  },
} as const;

export default function CategoryArtwork({ category }: { category: JobCategory }) {
  const Icon = category.icon;
  const style = variantStyles[category.visualVariant];
  const tasks = category.typicalTasks.slice(0, 3);

  if (category.visualVariant === "storefront") {
    return (
      <div aria-hidden="true" className={`relative grid min-h-56 grid-cols-[0.8fr_1.2fr] overflow-hidden border-2 border-ink p-5 sm:min-h-64 sm:p-7 ${style.surface}`}>
        <div className="relative flex flex-col justify-between border-r border-ink/20 pr-4">
          <Icon size={30} strokeWidth={1.8} />
          <span className="text-[0.65rem] font-black uppercase">{category.shortLabel}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pl-4">
          <div className="col-span-2 flex items-end border-2 border-ink bg-white p-3">
            <div className="h-2 w-2/3 bg-brand-yellow" />
          </div>
          {tasks.slice(0, 2).map((task) => (
            <div key={task} className="flex min-h-16 items-end border border-ink/20 bg-white/80 p-2 text-[0.62rem] font-bold leading-tight">
              {task}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.visualVariant === "operational-lanes") {
    return (
      <div aria-hidden="true" className={`relative overflow-hidden border-2 border-ink p-5 text-white sm:p-7 ${style.surface}`}>
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <Icon size={30} strokeWidth={1.8} />
          <span className="text-[0.65rem] font-black uppercase text-brand-yellow">{category.shortLabel}</span>
        </div>
        <div className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-3">
          {tasks.map((task, index) => (
            <div key={task} className="contents">
              <span className="grid h-7 w-7 place-items-center border border-brand-yellow text-xs font-black text-brand-yellow">0{index + 1}</span>
              <span className="flex min-h-10 items-center border-l-2 border-brand-yellow/60 pl-3 text-sm font-bold">{task}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.visualVariant === "event-timeline") {
    return (
      <div aria-hidden="true" className={`relative overflow-hidden border-2 border-ink p-5 sm:p-7 ${style.surface}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.65rem] font-black uppercase text-ink-muted">{category.shortLabel}</p>
            <Icon className="mt-4" size={30} strokeWidth={1.8} />
          </div>
          <ArrowDown className="mt-1" size={20} aria-hidden="true" />
        </div>
        <div className="mt-6 space-y-3 border-l-2 border-brand-yellow pl-4">
          {tasks.map((task, index) => (
            <div key={task} className="flex items-center gap-3">
              <span className={`grid h-7 w-7 -translate-x-[1.4rem] place-items-center rounded-full border-2 border-ink ${index === 1 ? "bg-brand-yellow" : "bg-white"}`}>
                <Circle size={7} fill="currentColor" />
              </span>
              <span className="-ml-7 text-sm font-bold">{task}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.visualVariant === "campaign-field") {
    return (
      <div aria-hidden="true" className={`relative overflow-hidden border-2 border-ink p-5 sm:p-7 ${style.surface}`}>
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] font-black uppercase">{category.shortLabel}</span>
          <Icon size={30} strokeWidth={1.8} />
        </div>
        <div className="mt-7 grid grid-cols-[1fr_auto] items-end gap-4">
          <p className="max-w-[14ch] font-display text-3xl font-black leading-none">Mỗi điểm, một nhiệm vụ rõ.</p>
          <ArrowRight size={22} />
        </div>
        <div className="mt-6 grid gap-2">
          {tasks.map((task, index) => (
            <div key={task} className={`flex items-center gap-3 border border-ink/15 px-3 py-2 text-sm font-bold ${index === 1 ? "translate-x-5 bg-white" : "bg-brand-yellow"}`}>
              <span className="h-2 w-2 bg-ink" />{task}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category.visualVariant === "guest-service") {
    return (
      <div aria-hidden="true" className={`relative overflow-hidden border-2 border-ink p-5 sm:p-7 ${style.surface}`}>
        <div className="flex items-center gap-4 border-b border-ink/15 pb-4">
          <span className={`grid h-12 w-12 place-items-center border-2 ${style.mark}`}><Icon size={24} strokeWidth={1.8} /></span>
          <div><p className="text-[0.65rem] font-black uppercase">{category.shortLabel}</p><p className="mt-1 text-sm font-bold">Một ca, nhiều điểm phối hợp</p></div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {tasks.map((task, index) => (
            <div key={task} className={`flex min-h-24 flex-col justify-between border border-ink/15 p-3 ${index === 1 ? "bg-brand-yellow" : "bg-white"}`}>
              <Check size={16} />
              <span className="text-xs font-bold leading-tight">{task}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`relative overflow-hidden border-2 border-ink p-5 sm:p-7 ${style.surface}`}>
      <div className="flex items-center justify-between">
        <div><p className="text-[0.65rem] font-black uppercase">{category.shortLabel}</p><p className="mt-2 text-sm font-bold">Nhịp hỗ trợ trong ca</p></div>
        <Icon size={30} strokeWidth={1.8} />
      </div>
      <div className="mt-7 grid grid-cols-3 gap-2">
        {tasks.map((task, index) => (
          <div key={task} className={`flex min-h-28 flex-col justify-between border-2 border-ink p-3 ${index === 1 ? "translate-y-4 bg-white" : "bg-brand-yellow"}`}>
            <span className="text-xs font-black">0{index + 1}</span>
            <span className="text-xs font-bold leading-tight">{task}</span>
          </div>
        ))}
      </div>
      <div className={`absolute bottom-5 right-5 h-3 w-3 rounded-full ${style.line}`} />
    </div>
  );
}
