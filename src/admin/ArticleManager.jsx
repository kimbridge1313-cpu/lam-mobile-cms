import { Link } from "react-router-dom";
import { articleCategories, recentArticles } from "../data/mockData.js";

export default function ArticleManager() {
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">Articles</p>
          <h2>文章管理</h2>
          <p>手機寫文章、管理草稿與發布狀態。</p>
        </div>
        <Link to="/admin/articles/new" className="button button-primary compact-button">
          新增
        </Link>
      </section>

      <section className="filter-panel">
        <label className="search-field">
          <span>搜尋文章</span>
          <input type="search" placeholder="輸入標題或分類" />
        </label>

        <div className="chip-row">
          <button type="button" className="filter-chip active">全部</button>
          {articleCategories.map((category) => (
            <button type="button" className="filter-chip" key={category}>{category}</button>
          ))}
        </div>
      </section>

      <section className="stack-list">
        {recentArticles.map((article) => (
          <article className="manager-card" key={article.id}>
            <div className="manager-card-media">{article.category}</div>
            <div className="manager-card-body">
              <div className="meta-row">
                <span>{article.updatedAt}</span>
                <span className={`status-pill status-${article.status}`}>{article.status}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
