import HeroContent from "./HeroContent";
import PhoneScene from "./PhoneScene";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate grid w-full min-h-[100svh] items-center overflow-hidden px-page-x pb-hero-y pt-[calc(var(--spacing-nav-h)+2.25rem)]"
      style={{
        background:
          "linear-gradient(150deg, #FFD700 0%, #D9AA00 30%, #F5D142 65%, #fcd967 100%)",
      }}
    >
      <Background />

      <div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[minmax(460px,38vw)_minmax(0,1fr)] lg:gap-[clamp(2rem,4vw,5rem)] xl:grid-cols-[minmax(520px,36vw)_minmax(0,1fr)] 2xl:grid-cols-[minmax(560px,34vw)_minmax(0,1fr)]">
        <HeroContent />
        <PhoneScene />
      </div>
    </section>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {/* Texture rất nhẹ */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#101010 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ánh sáng lớn từ góc trái trên giống reference */}
      <div
        className="absolute -left-[22vw] -top-[34vh] h-[92vh] w-[72vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,245,0.92) 0%, rgba(255,245,178,0.58) 32%, rgba(255,212,0,0.18) 58%, transparent 76%)",
          filter: "blur(42px)",
        }}
      />

      {/* Mảng sáng lớn quét chéo qua hero */}
      <div
        className="absolute -left-[8vw] -top-[2vh] h-[42vh] w-[122vw] rotate-[12deg]"
        style={{
          clipPath: "polygon(0 0, 100% 16%, 100% 82%, 0 54%)",
          background:
            "linear-gradient(90deg, rgba(255,255,235,0.58) 0%, rgba(255,248,190,0.34) 38%, rgba(255,230,85,0.12) 70%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Tia sáng phụ 1 */}
      <div
        className="absolute -left-[12vw] top-[16vh] h-[18vh] w-[120vw] rotate-[12deg]"
        style={{
          clipPath: "polygon(0 8%, 100% 0, 100% 54%, 0 100%)",
          background:
            "linear-gradient(90deg, rgba(255,255,230,0.26) 0%, rgba(255,247,180,0.22) 45%, transparent 100%)",
          filter: "blur(4px)",
        }}
      />

      {/* Tia sáng phụ 2 thấp hơn, nhẹ hơn */}
      <div
        className="absolute -left-[14vw] top-[34vh] h-[15vh] w-[118vw] rotate-[12deg]"
        style={{
          clipPath: "polygon(0 18%, 100% 0, 100% 58%, 0 100%)",
          background:
            "linear-gradient(90deg, rgba(255,244,160,0.18) 0%, rgba(255,255,230,0.15) 46%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />

      {/* Spotlight sau phone trái */}
      <div
        className="absolute left-[55%] top-[27%] h-[430px] w-[430px] -translate-x-1/2 rounded-full"
        style={{
          opacity: 0.72,
          background:
            "radial-gradient(circle, rgba(255,255,235,0.56) 0%, rgba(255,232,92,0.22) 38%, transparent 74%)",
          filter: "blur(38px)",
        }}
      />

      {/* Spotlight sau phone phải */}
      <div
        className="absolute right-[2%] top-[13%] h-[580px] w-[580px] rounded-full"
        style={{
          opacity: 0.78,
          background:
            "radial-gradient(circle, rgba(255,255,240,0.64) 0%, rgba(255,232,90,0.22) 40%, transparent 75%)",
          filter: "blur(42px)",
        }}
      />

      {/* Glow dưới cụm phone */}
      <div
        className="absolute bottom-[3%] right-[3%] h-[220px] w-[820px] rounded-full"
        style={{
          opacity: 0.46,
          background:
            "radial-gradient(ellipse, rgba(255,248,200,0.56) 0%, rgba(255,212,0,0.2) 42%, transparent 74%)",
          filter: "blur(36px)",
        }}
      />

      {/* Vignette vàng/nâu, không dùng xám/đen quá mạnh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 26%, transparent 0%, transparent 32%, rgba(92,63,0,0.10) 76%, rgba(70,48,0,0.16) 100%)",
        }}
      />

      {/* Tối nhẹ riêng phía phải để phone trắng nổi hơn */}
      <div
        className="absolute -right-[16%] top-[6%] h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(72,48,0,0.16) 0%, rgba(72,48,0,0.08) 42%, transparent 74%)",
          filter: "blur(46px)",
        }}
      />

      {/* Fade đáy */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-cream/88 to-transparent" />
    </div>
  );
}
