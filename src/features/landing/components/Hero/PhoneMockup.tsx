import { type JSX, type ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneMockup({
  children,
  className = "",
}: PhoneMockupProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: "100%",
        aspectRatio: "9/19.5",
      }}
    >
      {/* Phone outer frame */}
      <div
        className="absolute inset-0 rounded-[2.8rem] bg-brand-black border-[3px] border-[#2a2a2a]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.08) inset, 0 40px 80px -20px rgba(0,0,0,0.55), 0 20px 40px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[22%] w-[3px] h-8 bg-[#222] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[33%] w-[3px] h-10 bg-[#222] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[44%] w-[3px] h-10 bg-[#222] rounded-l-sm" />
        <div className="absolute -right-[3px] top-[30%] w-[3px] h-14 bg-[#222] rounded-r-sm" />

        {/* Screen bezel */}
        <div className="absolute inset-[3px] rounded-[2.5rem] bg-brand-black overflow-hidden">
          {/* Dynamic island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-[28%] h-[3.5%] bg-brand-black rounded-full" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start px-7 pt-4 pb-1">
            <span className="text-white text-[8px] font-semibold font-display">
              9:41
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Screen content */}
          <div className="absolute inset-0">{children}</div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[30%] h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="white">
      <rect x="0" y="5" width="2" height="3" rx="0.5" />
      <rect x="2.5" y="3.5" width="2" height="4.5" rx="0.5" />
      <rect x="5" y="2" width="2" height="6" rx="0.5" />
      <rect x="7.5" y="0.5" width="2" height="7.5" rx="0.5" />
      <rect x="10" y="0" width="2" height="8" rx="0.5" opacity="0.3" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="white">
      <path d="M5.5 6.5a1 1 0 110 2 1 1 0 010-2z" />
      <path
        d="M2.5 4.5C3.4 3.6 4.4 3 5.5 3s2.1.6 3 1.5"
        stroke="white"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 2.2C1.5.8 3.4 0 5.5 0s4 .8 5.5 2.2"
        stroke="white"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="14"
        height="8"
        rx="2"
        stroke="white"
        strokeOpacity="0.5"
      />
      <rect x="2" y="2" width="9" height="5" rx="1" fill="white" />
      <path
        d="M15.5 3v3"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomeScreenContent() {
  const categories = ["Retail", "Hospitality", "Events", "Logistics"];
  const shifts = [
    {
      title: "Warehouse Associate",
      company: "Amazon",
      rate: "$22/hr",
      color: "#1a1a1a",
    },
    {
      title: "Barista",
      company: "Blue Bottle",
      rate: "$18/hr",
      color: "#2a2a2a",
    },
  ];
  const listShifts = [
    { title: "Event Staff", company: "Coachella", rate: "$25/hr" },
    { title: "Retail Assistant", company: "Nike", rate: "$20/hr" },
    { title: "Delivery Driver", company: "Uber Eats", rate: "$24/hr" },
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col pt-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-brand-yellow flex items-center justify-center">
            <span className="text-brand-black font-black text-[8px] font-display">
              J
            </span>
          </div>
          <span className="font-black text-brand-black text-sm font-display">
            JobFree
          </span>
        </div>
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-2">
        <p className="text-[9px] font-bold text-brand-black mb-1.5 font-display">
          Categories
        </p>
        <div className="flex flex-wrap gap-1">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`text-[8px] font-bold px-2 py-0.5 rounded-full font-display ${i === 1 ? "bg-brand-black text-white" : "bg-brand-yellow text-brand-black"}`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Shifts */}
      <div className="px-4 mb-2">
        <p className="text-[9px] font-bold text-brand-black mb-1.5 font-display">
          Featured Shifts
        </p>
        <div className="flex gap-2">
          {shifts.map((shift) => (
            <div
              key={shift.title}
              className="flex-1 rounded-xl p-2 min-h-[52px] flex flex-col justify-between"
              style={{ background: shift.color }}
            >
              <p className="text-white text-[7.5px] font-bold leading-tight font-display">
                {shift.title}
              </p>
              <p className="text-brand-yellow text-[8px] font-black font-display">
                {shift.rate}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 flex-1">
        {listShifts.map((shift) => (
          <div
            key={shift.title}
            className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-0"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-bold text-brand-black truncate font-display">
                {shift.title}
              </p>
              <p className="text-[7px] text-gray-500">{shift.company}</p>
            </div>
            <span className="text-[7.5px] font-black text-brand-yellow font-display">
              {shift.rate}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <BottomNav
        items={["Home", "My Shifts", "Messages", "Profile"]}
        active="Home"
        theme="light"
      />
    </div>
  );
}

export function MatchingScreenContent() {
  return (
    <div className="w-full h-full bg-[#111] flex flex-col pt-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="font-black text-white text-sm font-display">
          Job<span className="text-brand-yellow">Free</span>
        </span>
        <div className="relative">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>
      </div>

      {/* Matching Circle */}
      <div className="flex flex-col items-center px-4 pt-2 pb-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#FFD400"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42 * 0.85} ${2 * Math.PI * 42}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-brand-yellow font-black text-2xl font-display leading-none">
              85%
            </span>
            <span className="text-white text-[8px] font-bold font-display tracking-wider">
              MATCHING
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-[9px] mt-2 font-display">
          Worker Matching Status
        </p>
      </div>

      {/* Status */}
      <div className="text-center px-4 mb-4">
        <p className="text-white text-[9px] font-bold font-display">
          Searching for 12 open roles...
        </p>
        <p className="text-gray-500 text-[8px] mt-0.5">24 candidates found</p>
      </div>

      {/* Cards */}
      <div className="px-3 grid grid-cols-2 gap-2 mb-4">
        {[
          {
            label: "Top Candidates",
            avatars: ["#e74c3c", "#2ecc71", "#e67e22"],
          },
          {
            label: "Pending Interviews",
            avatars: ["#3498db", "#9b59b6", "#1abc9c"],
          },
        ].map((card) => (
          <div key={card.label} className="bg-[#1e1e1e] rounded-xl p-2.5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-white text-[7.5px] font-bold font-display leading-tight">
                {card.label}
              </p>
              <svg
                className="w-2.5 h-2.5 text-gray-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <div className="flex -space-x-1">
              {card.avatars.map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-[#111] flex-shrink-0"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bottom Nav */}
      <BottomNav
        items={["Home", "Search", "Jobs", "Profile"]}
        active="Home"
        theme="dark"
      />
    </div>
  );
}

export function TrackingScreenContent() {
  const workers = [
    { id: "AC", x: "25%", y: "35%" },
    { id: "MK", x: "48%", y: "55%" },
    { id: "JL", x: "72%", y: "62%" },
  ];

  return (
    <div className="w-full h-full bg-[#111] flex flex-col pt-10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span className="font-black text-white text-sm font-display">
          Job<span className="text-brand-yellow">Free</span>
        </span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </div>

      {/* Label */}
      <div className="px-4 mb-1">
        <div className="bg-[#1e1e1e] rounded-lg px-3 py-1.5 inline-block">
          <span className="text-white text-[8.5px] font-bold font-display">
            Real-time Tracking
          </span>
        </div>
      </div>

      {/* Map */}
      <div
        className="mx-3 rounded-xl overflow-hidden flex-1 relative"
        style={{ minHeight: "160px", maxHeight: "160px" }}
      >
        {/* Dark map background */}
        <div className="absolute inset-0 bg-[#1a1a2e]">
          {/* Grid lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={`${i * 14}%`}
                x2="100%"
                y2={`${i * 14}%`}
                stroke="#4a4a6a"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={`${i * 11}%`}
                y1="0"
                x2={`${i * 11}%`}
                y2="100%"
                stroke="#4a4a6a"
                strokeWidth="0.5"
              />
            ))}
            {/* Roads */}
            <path
              d="M 0 45% Q 30% 50% 60% 40% T 100% 55%"
              stroke="#2a2a4a"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M 20% 0 Q 35% 30% 50% 50% T 45% 100%"
              stroke="#2a2a4a"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 0 70% Q 40% 65% 80% 75% T 100% 70%"
              stroke="#2a2a4a"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          {/* San Francisco label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#3a3a5a] text-[9px] font-bold font-display select-none">
            San Francisco
          </div>
          {/* Live trail dot */}
          <div
            className="absolute bg-brand-yellow rounded-full w-3 h-3 opacity-80"
            style={{ top: "38%", left: "55%" }}
          >
            <div className="absolute inset-0 rounded-full bg-brand-yellow animate-ping opacity-60" />
          </div>
          {/* Worker pins */}
          {workers.map((w) => (
            <div
              key={w.id}
              className="absolute flex flex-col items-center"
              style={{
                left: w.x,
                top: w.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-6 h-6 rounded-full bg-brand-yellow border-2 border-white flex items-center justify-center">
                <span className="text-brand-black text-[6px] font-black font-display">
                  {w.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Worker status card */}
      <div className="mx-3 mt-2 bg-[#1e1e1e] rounded-2xl p-3 border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center">
              <svg
                className="w-4 h-4 text-brand-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v1h20v-1c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
            <span className="text-white text-[9px] font-black font-display">
              Alex Chen
            </span>
          </div>
          <div className="flex items-center gap-1 bg-brand-yellow/20 px-2 py-0.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
            <span className="text-brand-yellow text-[7px] font-bold font-display">
              live
            </span>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            {
              label: "On Route - 2 mins away",
              color: "text-brand-yellow",
              filled: true,
            },
            { label: "Arrived at Site", color: "text-gray-400", filled: false },
            { label: "Job in Progress", color: "text-gray-500", filled: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${step.filled ? "bg-brand-yellow" : "border border-gray-600"}`}
              />
              <span
                className={`text-[7.5px] font-medium font-display ${step.color}`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Bottom Nav */}
      <BottomNav items={["Map", "Jobs", "Profile"]} active="Map" theme="dark" />
    </div>
  );
}

function BottomNav({
  items,
  active,
  theme,
}: {
  items: string[];
  active: string;
  theme: "light" | "dark";
}) {
  const icons: Record<string, JSX.Element> = {
    Home: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    "My Shifts": (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    Messages: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    Profile: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    Search: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    Jobs: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    Map: (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  };

  const bg =
    theme === "dark"
      ? "bg-[#111] border-t border-[#2a2a2a]"
      : "bg-white border-t border-gray-100";
  const activeColor =
    theme === "dark" ? "text-brand-yellow" : "text-brand-yellow";
  const inactiveColor = theme === "dark" ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`flex justify-around items-center px-2 pt-2 pb-5 ${bg}`}>
      {items.map((item) => {
        const isActive = item === active;
        return (
          <div key={item} className="flex flex-col items-center gap-0.5">
            <div className={isActive ? activeColor : inactiveColor}>
              {icons[item]}
            </div>
            <span
              className={`text-[7px] font-semibold font-display ${isActive ? activeColor : inactiveColor}`}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
