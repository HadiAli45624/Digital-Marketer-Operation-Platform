import Sidebar from "./Sidebar";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <header className="app-topbar">
          <span className="topbar-right">My Account</span>
        </header>
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}