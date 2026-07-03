import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ArticleManager from "./admin/ArticleManager.jsx";
import ArticleEditor from "./admin/ArticleEditor.jsx";
import EventManager from "./admin/EventManager.jsx";
import EventEditor from "./admin/EventEditor.jsx";
import ReservationManager from "./admin/ReservationManager.jsx";
import MediaLibrary from "./admin/MediaLibrary.jsx";

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/articles"
        element={
          <PlaceholderPage
            title="文章列表"
            description="下一階段會把前台文章列表接上同一份內容資料。"
          />
        }
      />

      <Route
        path="/events"
        element={
          <PlaceholderPage
            title="活動列表"
            description="下一階段會把前台活動詳情與預約表單接上 mock data。"
          />
        }
      />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="articles" element={<ArticleManager />} />
        <Route path="articles/new" element={<ArticleEditor />} />
        <Route path="events" element={<EventManager />} />
        <Route path="events/new" element={<EventEditor />} />
        <Route path="reservations" element={<ReservationManager />} />
        <Route path="media" element={<MediaLibrary />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
