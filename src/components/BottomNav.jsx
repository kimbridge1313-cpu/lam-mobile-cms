import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "首頁",
    to: "/admin",
    end: true,
    icon: "⌂"
  },
  {
    label: "文章",
    to: "/admin/articles",
    icon: "文"
  },
  {
    label: "活動",
    to: "/admin/events",
    icon: "日"
  },
  {
    label: "預約",
    to: "/admin/reservations",
    icon: "名"
  },
  {
    label: "媒體",
    to: "/admin/media",
    icon: "圖"
  }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="後台主選單">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            isActive ? "bottom-nav-item active" : "bottom-nav-item"
          }
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
