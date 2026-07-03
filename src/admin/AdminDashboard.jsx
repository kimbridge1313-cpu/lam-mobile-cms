import { Link } from "react-router-dom";
import {
  dashboardStats,
  featuredEvents,
  recentArticles,
  reservations
} from "../data/mockData.js";

function StatCard({ item }) {
  return (
    <article className={`stat-card tone-${item.tone}`}>
      <p>{item.label}</p>
      <strong>{item.value}</strong>
      <span>{item.note}</span>
    </article>
  );
}

function StatusPill({ status }) {
  const labelMap = {
    published: "已發布",
    draft: "草稿",
    open: "開放中",
    pending: "待確認",
    confirmed: "已確認"
  };

  return <span className={`status-pill status-${status}`}>{labelMap[status] || status}</span>;
}

export default function AdminDashboard() {
  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "pending"
  );

  return (
    <div className="admin-dashboard">
      <section className="admin-hero-card">
        <p className="eyebrow">Today</p>
        <h2>今天需要處理的內容</h2>
        <p>
          先確認預約，再發布文章或建立活動。這裡之後會接 Firebase 與 LINE 通知。
        </p>
      </section>

      <section className="quick-actions" aria-label="快速操作">
        <Link to="/admin/articles" className="quick-action-card">
          <span>＋</span>
          <strong>新增文章</strong>
        </Link>

        <Link to="/admin/events" className="quick-action-card">
          <span>＋</span>
          <strong>新增活動</strong>
        </Link>

        <Link to="/admin/reservations" className="quick-action-card">
          <span>→</span>
          <strong>查看預約</strong>
        </Link>

        <Link to="/admin/media" className="quick-action-card">
          <span>↑</span>
          <strong>上傳圖片</strong>
        </Link>
      </section>

      <section className="stats-grid">
        {dashboardStats.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Reservations</p>
            <h3>待確認預約</h3>
          </div>
          <Link to="/admin/reservations">全部</Link>
        </div>

        <div className="stack-list">
          {pendingReservations.map((reservation) => (
            <article className="list-card" key={reservation.id}>
              <div>
                <div className="meta-row">
                  <span>{reservation.sessionLabel}</span>
                  <StatusPill status={reservation.status} />
                </div>
                <h4>{reservation.eventTitle}</h4>
                <p>
                  {reservation.name}・{reservation.quantity} 人・{reservation.phone}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Articles</p>
            <h3>最近文章</h3>
          </div>
          <Link to="/admin/articles">管理</Link>
        </div>

        <div className="stack-list">
          {recentArticles.slice(0, 2).map((article) => (
            <article className="list-card" key={article.id}>
              <div>
                <div className="meta-row">
                  <span>{article.category}</span>
                  <StatusPill status={article.status} />
                </div>
                <h4>{article.title}</h4>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Events</p>
            <h3>即將活動</h3>
          </div>
          <Link to="/admin/events">管理</Link>
        </div>

        <div className="stack-list">
          {featuredEvents.map((event) => (
            <article className="list-card" key={event.id}>
              <div>
                <div className="meta-row">
                  <span>{event.dateLabel}</span>
                  <StatusPill status={event.status} />
                </div>
                <h4>{event.title}</h4>
                <p>{event.location}・{event.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
