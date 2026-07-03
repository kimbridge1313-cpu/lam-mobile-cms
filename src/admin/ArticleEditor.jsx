import { articleCategories, mediaItems } from "../data/mockData.js";

const blockTypes = ["文字段落", "單張圖片", "引用文字", "按鈕連結"];

export default function ArticleEditor() {
  return (
    <div className="admin-page-stack">
      <section className="admin-page-heading">
        <div>
          <p className="eyebrow">New Article</p>
          <h2>新增文章</h2>
          <p>第一版是前端表單原型，之後再接 Firestore 儲存。</p>
        </div>
      </section>

      <form className="editor-form">
        <label className="form-field">
          <span>文章標題</span>
          <input type="text" placeholder="輸入文章標題" />
        </label>

        <label className="form-field">
          <span>副標題</span>
          <input type="text" placeholder="一句說明文章的方向" />
        </label>

        <label className="form-field">
          <span>分類</span>
          <select defaultValue={articleCategories[0]}>
            {articleCategories.map((category) => (
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
          <textarea rows="4" placeholder="文章列表會使用這段摘要" />
        </label>

        <label className="form-field">
          <span>分享短文</span>
          <textarea rows="4" placeholder="發布後可複製使用" />
        </label>

        <section className="editor-blocks">
          <div className="admin-section-header compact-header">
            <div>
              <p className="eyebrow">Blocks</p>
              <h3>內容區塊</h3>
            </div>
          </div>

          <article className="content-block-preview">
            <span>01</span>
            <p>濕地不是遙遠的自然景觀，而是地方生活的一部分。</p>
          </article>

          <div className="chip-row">
            {blockTypes.map((type) => (
              <button type="button" className="filter-chip" key={type}>＋ {type}</button>
            ))}
          </div>
        </section>

        <label className="form-field">
          <span>SEO 標題</span>
          <input type="text" placeholder="可先沿用文章標題" />
        </label>

        <label className="form-field">
          <span>SEO 描述</span>
          <textarea rows="3" placeholder="搜尋結果與分享預覽描述" />
        </label>

        <div className="editor-action-bar">
          <button type="button" className="button button-secondary">儲存草稿</button>
          <button type="button" className="button button-primary">發布</button>
        </div>
      </form>
    </div>
  );
}
