import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logoDark from "../assets/logo_dark.svg";

const itemClass =
  "rounded-lg px-3 py-2 text-body-sm font-bold text-ink-soft transition-colors hover:bg-surface-cream hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const solutionButton = useRef<HTMLButtonElement>(null);
  const closeMenus = () => {
    setIsOpen(false);
    setSolutionsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (solutionsOpen) {
          setSolutionsOpen(false);
          solutionButton.current?.focus();
        }
        setIsOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setSolutionsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [solutionsOpen]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "border-b border-ink/10 bg-white/90 shadow-[0_12px_36px_rgba(16,16,16,0.08)] backdrop-blur-xl" : "border-b border-ink/5 bg-white/75 backdrop-blur-lg"}`}
    >
      <div className="grid h-nav-h grid-cols-[1fr_auto] items-center gap-4 px-page-x lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          className="w-fit rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          aria-label="JobFree, trang chủ"
        >
          <img src={logoDark} alt="JobFree" className="h-8 w-auto sm:h-9" />
        </Link>
        <nav
          aria-label="Điều hướng chính"
          className="hidden items-center gap-1 lg:flex"
        >
          <div className="relative" ref={menuRef}>
            <button
              ref={solutionButton}
              type="button"
              className={`${itemClass} inline-flex items-center gap-1`}
              aria-expanded={solutionsOpen}
              aria-controls="solutions-menu"
              onClick={() => setSolutionsOpen((value) => !value)}
            >
              Giải pháp
              <ChevronDown
                size={16}
                className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  id="solutions-menu"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.15 }}
                  className="absolute left-0 top-full mt-2 grid w-56 gap-1 rounded-xl border border-ink/10 bg-white p-2 shadow-card-soft"
                >
                  <NavLink
                    to="/employers"
                    className={itemClass}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Cho doanh nghiệp
                  </NavLink>
                  <NavLink
                    to="/workers"
                    className={itemClass}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Cho Worker
                  </NavLink>
                  <NavLink
                    to="/job-categories"
                    className={itemClass}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Loại công việc
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink
            to="/how-it-works"
            className={itemClass}
            onClick={closeMenus}
          >
            Cách hoạt động
          </NavLink>
          <NavLink to="/pricing" className={itemClass} onClick={closeMenus}>
            Bảng giá
          </NavLink>
          <NavLink to="/faq" className={itemClass} onClick={closeMenus}>
            FAQ
          </NavLink>
          <NavLink to="/blog" className={itemClass} onClick={closeMenus}>
            Blog
          </NavLink>
          <NavLink to="/about" className={itemClass} onClick={closeMenus}>
            Về JobFree
          </NavLink>
          <NavLink to="/contact" className={itemClass} onClick={closeMenus}>
            Liên hệ
          </NavLink>
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/#pilot"
            className="hidden min-h-11 items-center justify-center rounded-pill border border-ink bg-brand-yellow px-5 py-2 text-body-xs font-black text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:inline-flex"
          >
            Đăng ký pilot{" "}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:bg-surface-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
            aria-label={isOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Điều hướng di động"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="overflow-hidden border-t border-ink/10 bg-white px-page-x py-4 lg:hidden"
          >
            <div className="grid gap-2">
              <p className="px-3 pt-1 text-body-xs font-black uppercase text-ink-muted">
                Giải pháp
              </p>
              <Link to="/employers" className={itemClass} onClick={closeMenus}>
                Cho doanh nghiệp
              </Link>
              <Link to="/workers" className={itemClass} onClick={closeMenus}>
                Cho Worker
              </Link>
              <Link
                to="/job-categories"
                className={itemClass}
                onClick={closeMenus}
              >
                Loại công việc
              </Link>
              <Link
                to="/how-it-works"
                className={itemClass}
                onClick={closeMenus}
              >
                Cách hoạt động
              </Link>
              <Link to="/pricing" className={itemClass} onClick={closeMenus}>
                Bảng giá
              </Link>
              <Link to="/faq" className={itemClass} onClick={closeMenus}>
                FAQ
              </Link>
              <Link to="/blog" className={itemClass} onClick={closeMenus}>
                Blog
              </Link>
              <Link to="/about" className={itemClass} onClick={closeMenus}>
                Về JobFree
              </Link>
              <Link to="/contact" className={itemClass} onClick={closeMenus}>
                Liên hệ
              </Link>
              <Link
                to="/#pilot"
                className="mt-2 min-h-12 rounded-xl bg-brand-yellow px-4 py-3 text-center text-body-sm font-black text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                onClick={closeMenus}
              >
                Đăng ký pilot →
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
