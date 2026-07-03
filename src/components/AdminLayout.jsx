import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav.jsx";

export default function AdminLayout() {
  return (
    <div className="admin-app">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">坔 LAM</p>
          <h1>內容工作台</h1>
        </div>

        <button className="icon-button" type="button" aria-label="通知">
          <span></span>
        </button>
      </header>

      <section className="admin-content">
        <Outlet />
      </section>

      <BottomNav />
    </div>
  );
}
