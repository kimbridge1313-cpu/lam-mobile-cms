import { Link, useParams } from "react-router-dom";
import { getContentState } from "../lib/contentStore.js";

const statusLabel = {
  published: "已發布",
  draft: "草稿",
  archived: "已下架"
};

function ArticleBlock({ block, index }) {
  if (block.type === "quote") {
    return (
      <article className="content-block-preview quote-block">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <blockquote>{block.value || "尚未輸入引用文字。"}</blockquote>
      </article>
    );
  }

  if (block.type === "image") {
    return (
      <article className="content-block-preview image-block">
        <span>{String(index + 1).padStart(2, "0")}</span>
        {block.value ? <img src={block.value} alt={block.alt || "文章圖片"} /> : <p>尚未設定圖片網址。</p>}
        {block.alt && <small>{block.alt}</small>}
      </article>
    );
  }

  if (block.type === "button") {
    return (
      <article className="content-block-preview button-block">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <a href={block.url || "#"}>{block.label || "了解更多"}</a>
      </article>
    );
  }

  return (
    <article className="content-block-preview">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <p>{block.value || "尚未輸入段落內容。"}</p>
    </article>
  );
}

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
        {(article.blocks || []).map((block, index) => (
          <ArticleBlock key={block.id} block={block} index={index} />
        ))}
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
