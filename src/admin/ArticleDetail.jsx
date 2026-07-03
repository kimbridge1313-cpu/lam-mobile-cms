import { Link, useParams } from "react-router-dom";
import TiptapEditor from "../components/editor/TiptapEditor.jsx";
import { getContentState } from "../lib/contentStore.js";

const statusLabel = {
  published: "已發布",
  draft: "草稿",
  archived: "已下架"
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const { articles } = getContentState();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="admin-page-stack">
        <section className="admin-page-heading">
          <div>
            <p className="eyebrow">Article</p>
            <h2>找不到文章</h2>
            <p>這篇文章不存在或已被移除。</p>
          </div>
        </section>
        <Link to="/admin/articles" className="button button-secondary">回文章管理</Link>
      </div>
    );
  }

  return (
    <div className="admin-page-stack">
      <section className="article-detail-hero">
        <div className="meta-row">
          <span>{article.category}</span>
          <span className={`status-pill status-${article.status}`}>{statusLabel[article.status] || article.status}</span>
        </div>
        <h2>{article.title}</h2>
        <p>{article.subtitle}</p>
      </section>

      <section className="article-detail-body">
        <p>{article.excerpt}</p>
        <TiptapEditor value={article.contentJson} editable={false} />
      </section>

      <section className="share-panel">
        <p className="eyebrow">Share Text</p>
        <p>{article.socialText || "尚未設定分享短文。"}</p>
      </section>

      <div className="editor-action-bar detail-action-bar">
        <Link to="/admin/articles" className="button button-secondary">返回</Link>
        <Link to={`/admin/articles/${article.slug}/edit`} className="button button-primary">編輯文章</Link>
      </div>
    </div>
  );
}
