import { Link } from "react-router-dom";
import { featuredEvents, recentArticles } from "../data/mockData.js";

export default function Home() {
  return (
    <main className="site-page">
      <header className="site-header">
        <Link to="/" className="brand-mark" aria-label="LAM 首頁">
          <span className="brand-symbol">坔</span>
          <span>LAM</span>
        </Link>

        <nav className="site-nav" aria-label="前台主選單">
          <Link to="/articles">文章</Link>
          <Link to="/events">活動</Link>
          <Link to="/admin">後台</Link>
        </nav>
      </header>

      <section className="home-hero">
        <p className="eyebrow">LAM / Mobile Content System</p>
        <h1>A wet land for every wanderer who needs to land.</h1>
        <p className="hero-lead">
          一個手機優先的品牌內容網站原型。前台保留品牌敘事與內容區塊，
          後台用簡單的方式處理文章、活動、預約與媒體。
        </p>

        <div className="hero-actions">
          <Link to="/articles" className="button button-primary">
            看文章
          </Link>
          <Link to="/events" className="button button-secondary">
            看活動
          </Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Recent Notes</p>
          <h2>最新文章</h2>
        </div>

        <div className="article-grid">
          {recentArticles.map((article) => (
            <article className="content-card" key={article.id}>
              <div className="card-media placeholder-media">
                <span>{article.category}</span>
              </div>
              <div className="card-body">
                <div className="meta-row">
                  <span>{article.status === "published" ? "已發布" : "草稿"}</span>
                  <span>{article.publishedAt || "尚未發布"}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-muted">
        <div className="section-heading">
          <p className="eyebrow">Field Activities</p>
          <h2>精選活動</h2>
        </div>

        <div className="event-list">
          {featuredEvents.map((event) => (
            <article className="event-card" key={event.id}>
              <div>
                <div className="meta-row">
                  <span>{event.dateLabel}</span>
                  <span>{event.location}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </div>

              <Link to="/events" className="text-link">
                查看
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>坔 LAM Brand Operating System</p>
        <Link to="/admin">進入手機後台</Link>
      </footer>
    </main>
  );
}
