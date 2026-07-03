import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ArticleManager from "./admin/ArticleManager.jsx";
import ArticleEditor from "./admin/ArticleEditor.jsx";
import ArticleDetail from "./admin/ArticleDetail.jsx";
import EventManager from "./admin/EventManager.jsx";
import { mediaItems, reservations } from "./data/mockData.js";

function PlaceholderPage({ title, description }) {
  return (
    <main className="placeholder-page">
      <div className="page-shell">
        <p className="eyebrow">LAM / Coming Section</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </main>
  );
}

function EventEditor() {
  const [sessions, setSessions] = useState([
    { id: "draft-session-1", date: "2026-07-12", startTime: "10:00", endTime: "11:30", capacity: 20 }
  ]);

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">New Event</p>
          <h2>新增活動</h2>
          <p>建立活動資料、是否開放預約與多個活動場次。</p>
        </div>
      </section>

      <form className="editor-form">
        <label className="form-field">
          <span>活動名稱</span>
          <input type="text" placeholder="輸入活動名稱" />
        </label>
        <label className="form-field">
          <span>活動地點</span>
          <input type="text" placeholder="集合地點或地址" />
        </label>
        <label className="form-field">
          <span>活動簡介</span>
          <textarea rows="4" placeholder="活動列表使用的短說明" />
        </label>
        <section className="toggle-panel">
          <label><input type="checkbox" defaultChecked /> <span>開放預約</span></label>
          <label><input type="checkbox" /> <span>需要付款</span></label>
        </section>
        <label className="form-field">
          <span>價格</span>
          <input type="number" min="0" placeholder="0" />
        </label>

        <section className="editor-blocks">
          <div className="admin-section-header compact-header">
            <div>
              <p className="eyebrow">Sessions</p>
              <h3>活動場次</h3>
            </div>
            <button
              type="button"
              onClick={() => setSessions((current) => [...current, { id: `draft-session-${current.length + 1}`, date: "", startTime: "", endTime: "", capacity: 20 }])}
            >
              新增場次
            </button>
          </div>

          <div className="session-editor-list">
            {sessions.map((session, index) => (
              <article className="session-editor-card" key={session.id}>
                <strong>場次 {index + 1}</strong>
                <div className="form-grid two-columns">
                  <label className="form-field"><span>日期</span><input type="date" defaultValue={session.date} /></label>
                  <label className="form-field"><span>名額</span><input type="number" defaultValue={session.capacity} /></label>
                  <label className="form-field"><span>開始</span><input type="time" defaultValue={session.startTime} /></label>
                  <label className="form-field"><span>結束</span><input type="time" defaultValue={session.endTime} /></label>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="editor-action-bar">
          <button type="button" className="button button-secondary">儲存草稿</button>
          <button type="button" className="button button-primary">發布</button>
        </div>
      </form>
    </div>
  );
}

function ReservationManager() {
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">Reservations</p>
          <h2>預約管理</h2>
          <p>查看活動預約、付款狀態與聯絡資訊。</p>
        </div>
      </section>
      <section className="filter-panel">
        <div className="chip-row">
          <button type="button" className="filter-chip active">全部</button>
          <button type="button" className="filter-chip">待確認</button>
          <button type="button" className="filter-chip">已確認</button>
        </div>
      </section>
      <section className="stack-list">
        {reservations.map((reservation) => (
          <article className="reservation-card" key={reservation.id}>
            <div className="meta-row">
              <span>{reservation.sessionLabel}</span>
              <span className={`status-pill status-${reservation.status}`}>{reservation.status}</span>
            </div>
            <h3>{reservation.eventTitle}</h3>
            <p>{reservation.name}・{reservation.quantity} 人・{reservation.phone}</p>
            <p>{reservation.note}</p>
            <div className="card-actions">
              <button type="button">確認</button>
              <button type="button">取消</button>
              <a href={`tel:${reservation.phone}`}>聯絡</a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function MediaLibrary() {
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">Media</p>
          <h2>媒體庫</h2>
          <p>圖片上傳 UI、標籤、替代文字與選圖流程。</p>
        </div>
        <button type="button" className="button button-primary compact-button">上傳</button>
      </section>
      <section className="upload-panel">
        <strong>拖放圖片或從手機相簿選擇</strong>
        <p>這裡之後會接 Firebase Storage，目前只顯示 mock media。</p>
      </section>
      <section className="media-grid">
        {mediaItems.map((item) => (
          <article className="media-card" key={item.id}>
            <div className="media-thumb">{item.title}</div>
            <div>
              <h3>{item.filename}</h3>
              <p>{item.alt}</p>
              <div className="chip-row small-chip-row">
                {item.tags.map((tag) => <span className="filter-chip" key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<PlaceholderPage title="文章列表" description="下一階段會把前台文章列表接上同一份內容資料。" />} />
      <Route path="/events" element={<PlaceholderPage title="活動列表" description="下一階段會把前台活動詳情與預約表單接上 mock data。" />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="articles" element={<ArticleManager />} />
        <Route path="articles/new" element={<ArticleEditor />} />
        <Route path="articles/:slug" element={<ArticleDetail />} />
        <Route path="articles/:slug/edit" element={<ArticleEditor />} />
        <Route path="events" element={<EventManager />} />
        <Route path="events/new" element={<EventEditor />} />
        <Route path="reservations" element={<ReservationManager />} />
        <Route path="media" element={<MediaLibrary />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
