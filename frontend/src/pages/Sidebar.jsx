import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "⊞" },
  { path: "/report", label: "Report Generator", icon: "◈" },
  { path: "/copy", label: "CopyCrafter", icon: "✦" },
  { path: "/conversations", label: "Conversations", icon: "◎" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-logo">Qwilio</span>}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            title={collapsed ? item.label : ""}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <p className="sidebar-version">v1.0</p>}
      </div>
    </aside>
  );
}