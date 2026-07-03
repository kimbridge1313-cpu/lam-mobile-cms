import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

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
            description="下一批會加入文章列表、分類篩選、搜尋與文章卡片。"
          />
        }
      />

      <Route
        path="/events"
        element={
          <PlaceholderPage
            title="活動列表"
            description="下一批會加入活動列表、活動詳情與預約表單。"
          />
        }
      />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="articles"
          element={
            <PlaceholderPage
              title="文章管理"
              description="下一批會加入手機寫文章、草稿、發布與社群分享。"
            />
          }
        />
        <Route
          path="events"
          element={
            <PlaceholderPage
              title="活動管理"
              description="下一批會加入活動建立、場次設定與預約管理。"
            />
          }
        />
        <Route
          path="reservations"
          element={
            <PlaceholderPage
              title="預約管理"
              description="下一批會加入預約列表、狀態篩選、確認與取消操作。"
            />
          }
        />
        <Route
          path="media"
          element={
            <PlaceholderPage
              title="媒體庫"
              description="下一批會加入圖片上傳 UI、媒體列表、標籤與選圖流程。"
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
