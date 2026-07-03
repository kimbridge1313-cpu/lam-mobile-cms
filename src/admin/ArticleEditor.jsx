import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mediaItems } from "../data/mockData.js";
import { createSlug, getContentState, upsertArticle } from "../lib/contentStore.js";

const blockTypes = [
  { type: "paragraph", label: "文字段落" },
  { type: "image", label: "單張圖片" },
  { type: "quote", label: "引用文字" },
  { type: "button", label: "按鈕連結" }
];

const blockLabels = {
  paragraph: "文字段落",
  image: "單張圖片",
  quote: "引用文字",
  button: "按鈕連結"
};

function createBlock(type) {
  const base = {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type
  };

  if (type === "image") {
    return { ...base, value: "", alt: "" };
  }

  if (type === "button") {
    return { ...base, label: "了解更多", url: "" };
  }

  if (type === "quote") {
    return { ...base, value: "" };
  }

  return { ...base, value: "" };
}

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

  const [blocks, setBlocks] = useState(() => article?.blocks || [createBlock("paragraph")]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addBlock(type) {
    setBlocks((current) => [...current, createBlock(type)]);
  }

  function updateBlock(blockId, field, value) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === blockId ? { ...block, [field]: value } : block
      )
    );
  }

  function removeBlock(blockId) {
    setBlocks((current) => current.filter((block) => block.id !== blockId));
  }

  function saveArticle(status) {
    const savedArticle = upsertArticle({
      ...form,
      slug: article?.slug || createSlug(form.title),
      status,
      blocks
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

        <section className="editor-blocks">
          <div className="admin-section-header compact-header">
            <div>
              <p className="eyebrow">Blocks</p>
              <h3>內容區塊</h3>
            </div>
          </div>

          <div className="block-editor-list">
            {blocks.map((block, index) => (
              <article className="block-editor-card" key={block.id}>
                <div className="block-editor-header">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{blockLabels[block.type]}</strong>
                  <button type="button" onClick={() => removeBlock(block.id)}>刪除</button>
                </div>

                {block.type === "paragraph" && (
                  <label className="form-field">
                    <span>段落內容</span>
                    <textarea
                      rows="4"
                      placeholder="輸入文字段落"
                      value={block.value || ""}
                      onChange={(event) => updateBlock(block.id, "value", event.target.value)}
                    />
                  </label>
                )}

                {block.type === "quote" && (
                  <label className="form-field">
                    <span>引用文字</span>
                    <textarea
                      rows="3"
                      placeholder="輸入引用文字"
                      value={block.value || ""}
                      onChange={(event) => updateBlock(block.id, "value", event.target.value)}
                    />
                  </label>
                )}

                {block.type === "image" && (
                  <div className="form-grid two-columns">
                    <label className="form-field">
                      <span>圖片網址</span>
                      <input
                        type="text"
                        placeholder="先填圖片網址，之後接媒體庫"
                        value={block.value || ""}
                        onChange={(event) => updateBlock(block.id, "value", event.target.value)}
                      />
                    </label>
                    <label className="form-field">
                      <span>替代文字</span>
                      <input
                        type="text"
                        placeholder="圖片說明"
                        value={block.alt || ""}
                        onChange={(event) => updateBlock(block.id, "alt", event.target.value)}
                      />
                    </label>
                  </div>
                )}

                {block.type === "button" && (
                  <div className="form-grid two-columns">
                    <label className="form-field">
                      <span>按鈕文字</span>
                      <input
                        type="text"
                        placeholder="例如：立即預約"
                        value={block.label || ""}
                        onChange={(event) => updateBlock(block.id, "label", event.target.value)}
                      />
                    </label>
                    <label className="form-field">
                      <span>連結網址</span>
                      <input
                        type="text"
                        placeholder="https://"
                        value={block.url || ""}
                        onChange={(event) => updateBlock(block.id, "url", event.target.value)}
                      />
                    </label>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="chip-row">
            {blockTypes.map((blockType) => (
              <button
                type="button"
                className="filter-chip"
                key={blockType.type}
                onClick={() => addBlock(blockType.type)}
              >
                ＋ {blockType.label}
              </button>
            ))}
          </div>
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
