import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mediaItems } from "../data/mockData.js";
import TiptapEditor from "../components/editor/TiptapEditor.jsx";
import { createSlug, getContentState, upsertArticle } from "../lib/contentStore.js";

export default function ArticleEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [content] = useState(() => getContentState());
  const article = useMemo(
    () => content.articles.find((item) => item.slug === slug),
    [content.articles, slug]
  );
  const isEditing = Boolean(article);

  const [form, setForm] = useState({
    title: article?.title || "",
    subtitle: article?.subtitle || "",
    category: article?.category || content.categories[0] || "Uncategorized",
    excerpt: article?.excerpt || "",
    socialText: article?.socialText || "",
    seoTitle: article?.title || "",
    seoDescription: article?.excerpt || ""
  });

  const [contentJson, setContentJson] = useState(() => article?.contentJson || null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function saveArticle(status) {
    const savedArticle = upsertArticle({
      ...form,
      slug: article?.slug || createSlug(form.title),
      status,
      contentJson
    });
    navigate(`/admin/articles/${savedArticle.slug}`);
  }

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">{isEditing ? "Edit Article" : "New Article"}</p>
          <h2>{isEditing ? "編輯文章" : "新增文章"}</h2>
          <p>目前先儲存在瀏覽器 localStorage，之後再接 Firestore。</p>
        </div>
      </section>

      <form className="editor-form">
        <label className="form-field">
          <span>文章標題</span>
          <input
            type="text"
            placeholder="輸入文章標題"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>副標題</span>
          <input
            type="text"
            placeholder="一句說明文章的方向"
            value={form.subtitle}
            onChange={(event) => updateField("subtitle", event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>分類</span>
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
          >
            {content.categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <section className="media-picker-panel">
          <div className="admin-section-header compact-header">
            <div>
              <p className="eyebrow">Cover</p>
              <h3>封面圖片</h3>
            </div>
            <button type="button">選擇</button>
          </div>
          <div className="mini-media-grid">
            {mediaItems.slice(0, 3).map((item) => (
              <div className="mini-media-card" key={item.id}>{item.title}</div>
            ))}
          </div>
        </section>

        <label className="form-field">
          <span>摘要</span>
          <textarea
            rows="4"
            placeholder="文章列表會使用這段摘要"
            value={form.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>分享短文</span>
          <textarea
            rows="4"
            placeholder="發布後可複製使用"
            value={form.socialText}
            onChange={(event) => updateField("socialText", event.target.value)}
          />
        </label>

        <section className="editor-blocks rich-editor-panel">
          <div className="admin-section-header compact-header">
            <div>
              <p className="eyebrow">Content</p>
              <h3>文章內容</h3>
            </div>
          </div>
          <TiptapEditor value={contentJson} onChange={setContentJson} />
        </section>

        <label className="form-field">
          <span>SEO 標題</span>
          <input
            type="text"
            placeholder="可先沿用文章標題"
            value={form.seoTitle}
            onChange={(event) => updateField("seoTitle", event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>SEO 描述</span>
          <textarea
            rows="3"
            placeholder="搜尋結果與分享預覽描述"
            value={form.seoDescription}
            onChange={(event) => updateField("seoDescription", event.target.value)}
          />
        </label>

        <div className="editor-action-bar">
          <button type="button" className="button button-secondary" onClick={() => saveArticle("draft")}>儲存草稿</button>
          <button type="button" className="button button-primary" onClick={() => saveArticle("published")}>{isEditing ? "更新" : "發布"}</button>
        </div>
      </form>
    </div>
  );
}
