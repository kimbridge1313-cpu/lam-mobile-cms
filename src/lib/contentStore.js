import { articleCategories, recentArticles } from "../data/mockData.js";

const STORAGE_KEY = "lam-mobile-cms-content-v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizeSlug(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function paragraphNode(text) {
  if (!text) return { type: "paragraph" };
  return {
    type: "paragraph",
    content: [{ type: "text", text }]
  };
}

function contentJsonFromArticle(article) {
  if (article.contentJson?.type === "doc") return article.contentJson;

  const nodes = [];

  if (Array.isArray(article.blocks) && article.blocks.length > 0) {
    article.blocks.forEach((block) => {
      if (block.type === "quote") {
        nodes.push({
          type: "blockquote",
          content: [paragraphNode(block.value)]
        });
      } else if (block.type === "image" && block.value) {
        nodes.push({ type: "image", attrs: { src: block.value, alt: block.alt || "" } });
      } else if (block.type === "button") {
        nodes.push(paragraphNode(block.label || "了解更多"));
      } else {
        nodes.push(paragraphNode(block.value || article.excerpt || ""));
      }
    });
  }

  if (nodes.length === 0) {
    nodes.push(paragraphNode(article.excerpt || "開始撰寫文章內容。"));
  }

  return {
    type: "doc",
    content: nodes
  };
}

function createDefaultBlocks(article) {
  return [
    {
      id: `${article.id || article.slug}-block-1`,
      type: "paragraph",
      value: article.excerpt || ""
    }
  ];
}

function normalizeArticle(article) {
  return {
    ...article,
    blocks: Array.isArray(article.blocks) && article.blocks.length > 0
      ? article.blocks
      : createDefaultBlocks(article),
    contentJson: contentJsonFromArticle(article)
  };
}

export function createSlug(title, fallback = "article") {
  const base = normalizeSlug(title) || `${fallback}-${Date.now()}`;
  return base;
}

export function getDefaultContentState() {
  return {
    categories: articleCategories,
    articles: recentArticles.map(normalizeArticle)
  };
}

export function getContentState() {
  if (!isBrowser()) return getDefaultContentState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultContentState();
    const parsed = JSON.parse(raw);
    return {
      categories: Array.isArray(parsed.categories) ? parsed.categories : articleCategories,
      articles: Array.isArray(parsed.articles) ? parsed.articles.map(normalizeArticle) : recentArticles.map(normalizeArticle)
    };
  } catch {
    return getDefaultContentState();
  }
}

export function saveContentState(nextState) {
  if (!isBrowser()) return nextState;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new CustomEvent("lam-content-updated", { detail: nextState }));
  return nextState;
}

export function upsertArticle(articleInput) {
  const state = getContentState();
  const now = new Date().toISOString().slice(0, 10);
  const slug = articleInput.slug || createSlug(articleInput.title);
  const existing = state.articles.find((item) => item.slug === slug);

  const article = normalizeArticle({
    id: existing?.id || `article-${Date.now()}`,
    slug,
    title: articleInput.title || "未命名文章",
    subtitle: articleInput.subtitle || "",
    category: articleInput.category || state.categories[0] || "Uncategorized",
    excerpt: articleInput.excerpt || "",
    status: articleInput.status || existing?.status || "draft",
    publishedAt: articleInput.status === "published" ? existing?.publishedAt || now : existing?.publishedAt || null,
    updatedAt: now,
    socialText: articleInput.socialText || "",
    blocks: Array.isArray(articleInput.blocks) ? articleInput.blocks : existing?.blocks,
    contentJson: articleInput.contentJson || existing?.contentJson
  });

  const articles = existing
    ? state.articles.map((item) => (item.slug === slug ? article : item))
    : [article, ...state.articles];

  saveContentState({ ...state, articles });
  return article;
}

export function deleteArticle(slug) {
  const state = getContentState();
  const articles = state.articles.filter((item) => item.slug !== slug);
  return saveContentState({ ...state, articles });
}

export function addCategory(name) {
  const state = getContentState();
  const nextName = name.trim();
  if (!nextName || state.categories.includes(nextName)) return state;
  return saveContentState({ ...state, categories: [...state.categories, nextName] });
}

export function renameCategory(oldName, newName) {
  const state = getContentState();
  const cleanName = newName.trim();
  if (!oldName || !cleanName) return state;

  const categories = state.categories.map((category) =>
    category === oldName ? cleanName : category
  );

  const articles = state.articles.map((article) =>
    article.category === oldName ? { ...article, category: cleanName } : article
  );

  return saveContentState({ ...state, categories, articles });
}

export function deleteCategory(name) {
  const state = getContentState();
  const categories = state.categories.filter((category) => category !== name);
  const fallback = categories[0] || "Uncategorized";
  const articles = state.articles.map((article) =>
    article.category === name ? { ...article, category: fallback } : article
  );

  return saveContentState({ ...state, categories, articles });
}

export function resetContentState() {
  const state = getDefaultContentState();
  return saveContentState(state);
}
