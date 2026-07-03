import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  addCategory,
  deleteCategory,
  deleteArticle,
  getContentState,
  renameCategory
} from "../lib/contentStore.js";

const statusLabel = {
  published: "已發布",
  draft: "草稿",
  archived: "已下架"
};

export default function ArticleManager() {
  const [content, setContent] = useState(() => getContentState());
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editingCategoryName, setEditingCategoryName] = useState("");

  useEffect(() => {
    const syncContent = () => setContent(getContentState());
    window.addEventListener("lam-content-updated", syncContent);
    return () => window.removeEventListener("lam-content-updated", syncContent);
  }, []);

  const filteredArticles = useMemo(() => {
    return content.articles.filter((article) => {
      const keywordMatched = [article.title, article.category, article.excerpt]
        .join(" ")
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());
      const categoryMatched = activeCategory === "全部" || article.category === activeCategory;
      return keywordMatched && categoryMatched;
    });
  }, [activeCategory, content.articles, keyword]);

  function handleAddCategory() {
    const nextState = addCategory(newCategory);
    setContent(nextState);
    setNewCategory("");
  }

  function handleRenameCategory(category) {
    const nextState = renameCategory(category, editingCategoryName);
    setContent(nextState);
    setEditingCategory("");
    setEditingCategoryName("");
  }

  function handleDeleteCategory(category) {
    const nextState = deleteCategory(category);
    setContent(nextState);
    if (activeCategory === category) setActiveCategory("全部");
  }

  function handleDeleteArticle(slug) {
    const nextState = deleteArticle(slug);
    setContent(nextState);
  }

  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">Articles</p>
          <h2>文章管理</h2>
          <p>手機寫文章、管理草稿、發布狀態與文章分類。</p>
        </div>
        <Link to="/admin/articles/new" className="button button-primary compact-button">
          新增
        </Link>
      </section>

      <section className="filter-panel">
        <label className="search-field">
          <span>搜尋文章</span>
          <input
            type="search"
            placeholder="輸入標題或分類"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>

        <div className="chip-row">
          <button
            type="button"
            className={activeCategory === "全部" ? "filter-chip active" : "filter-chip"}
            onClick={() => setActiveCategory("全部")}
          >
            全部
          </button>
          {content.categories.map((category) => (
            <button
              type="button"
              className={activeCategory === category ? "filter-chip active" : "filter-chip"}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="category-panel">
        <div className="admin-section-header compact-header">
          <div>
            <p className="eyebrow">Categories</p>
            <h3>文章分類</h3>
          </div>
        </div>

        <div className="category-add-row">
          <input
            type="text"
            placeholder="新增分類名稱"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <button type="button" onClick={handleAddCategory}>新增</button>
        </div>

        <div className="category-list">
          {content.categories.map((category) => (
            <article className="category-row" key={category}>
              {editingCategory === category ? (
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(event) => setEditingCategoryName(event.target.value)}
                />
              ) : (
                <strong>{category}</strong>
              )}

              <div className="category-actions">
                {editingCategory === category ? (
                  <button type="button" onClick={() => handleRenameCategory(category)}>儲存</button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(category);
                      setEditingCategoryName(category);
                    }}
                  >
                    編輯
                  </button>
                )}
                <button type="button" onClick={() => handleDeleteCategory(category)}>刪除</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-list">
        {filteredArticles.map((article) => (
          <article className="manager-card" key={article.id}>
            <div className="manager-card-media">{article.category}</div>
            <div className="manager-card-body">
              <div className="meta-row">
                <span>{article.updatedAt}</span>
                <span className={`status-pill status-${article.status}`}>{statusLabel[article.status] || article.status}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="card-actions">
                <Link to={`/admin/articles/${article.slug}`}>查看文章</Link>
                <Link to={`/admin/articles/${article.slug}/edit`}>編輯</Link>
                <button type="button" onClick={() => handleDeleteArticle(article.slug)}>刪除</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
