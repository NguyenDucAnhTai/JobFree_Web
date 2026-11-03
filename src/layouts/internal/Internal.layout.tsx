import { NavLink, Outlet } from "react-router-dom";
import type { InternalMenuItem } from "./internal-menu.model";

interface InternalLayoutProps {
  menuItems: InternalMenuItem[];
}

export default function InternalLayout({ menuItems }: InternalLayoutProps) {
  return (
    <div className="grid min-h-dvh bg-[#f6f7f9] text-[#172033] lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-[#dfe3ea] bg-white px-5 py-6">
        <p className="text-body-sm font-black">JobFree</p>

        <nav className="mt-8 grid gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-body-xs font-bold transition-colors ${
                  isActive
                    ? "bg-[#172033] text-white"
                    : "text-[#526072] hover:bg-[#eef1f5]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 px-6 py-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
