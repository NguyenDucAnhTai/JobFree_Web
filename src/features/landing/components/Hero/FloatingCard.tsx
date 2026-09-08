import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  floatY?: number;
  floatDuration?: number;
}

export default function FloatingCard({
  children,
  delay = 0,
  className = "",
  floatY = 8,
  floatDuration = 4,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={`glass rounded-2xl shadow-card ${className}`}
    >
      <motion.div
        animate={{ y: [-floatY / 2, floatY / 2, -floatY / 2] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function WorkerFoundCard({ delay = 0.5 }: { delay?: number }) {
  return (
    <FloatingCard
      delay={delay}
      floatY={6}
      floatDuration={3.5}
      className="px-3 py-2.5"
    >
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-yellow to-brand-yellow-dark flex items-center justify-center text-brand-black font-display font-bold text-sm">
            MT
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-brand-black uppercase tracking-wide font-display leading-none mb-0.5">
            Worker Found
          </p>
          <p className="text-xs text-brand-gray font-medium leading-none">
            Minh Tuấn is ready!
          </p>
        </div>
      </div>
    </FloatingCard>
  );
}

export function RatingCard({ delay = 0.7 }: { delay?: number }) {
  return (
    <FloatingCard
      delay={delay}
      floatY={10}
      floatDuration={4.5}
      className="px-3.5 py-2.5"
    >
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i <= 5 ? "text-amber-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm font-black text-brand-black font-display">
          4.9
        </span>
      </div>
    </FloatingCard>
  );
}

export function NearbyWorkerCard({ delay = 0.9 }: { delay?: number }) {
  return (
    <FloatingCard
      delay={delay}
      floatY={7}
      floatDuration={3.8}
      className="px-3.5 py-2.5"
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center">
          <svg
            className="w-4 h-4 text-brand-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-brand-black font-display">
          Nearby Worker
        </span>
      </div>
    </FloatingCard>
  );
}

export function MatchTimeCard({ delay = 1.1 }: { delay?: number }) {
  return (
    <FloatingCard
      delay={delay}
      floatY={9}
      floatDuration={4.2}
      className="px-4 py-3"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-brand-black flex items-center justify-center">
          <svg
            className="w-4 h-4 text-brand-yellow"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 6 12 12 15.5 14" />
          </svg>
        </div>
        <p className="text-[10px] font-black text-brand-black uppercase tracking-wider text-center font-display leading-tight">
          Match in
          <br />3 mins
        </p>
      </div>
    </FloatingCard>
  );
}
