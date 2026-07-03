export const dashboardStats = [
  {
    id: "today-reservations",
    label: "今日預約",
    value: 3,
    note: "2 組已確認，1 組待確認",
    tone: "sand"
  },
  {
    id: "pending-reservations",
    label: "待確認",
    value: 1,
    note: "需要今天處理",
    tone: "gray"
  },
  {
    id: "weekly-events",
    label: "本週活動",
    value: 2,
    note: "含 4 個場次",
    tone: "white"
  },
  {
    id: "published-articles",
    label: "已發布文章",
    value: 8,
    note: "最近更新：地方故事",
    tone: "black"
  }
];

export const recentArticles = [
  {
    id: "article-001",
    slug: "wetland-story",
    title: "一場從濕地開始的地方故事",
    category: "Local Story",
    excerpt: "重新認識土地、水鳥與日常生活的關係。",
    status: "published",
    publishedAt: "2026-07-03"
  },
  {
    id: "article-002",
    slug: "field-note",
    title: "水鳥、潮線與風的方向",
    category: "Field Note",
    excerpt: "用一段午後觀察，記錄濕地裡細微的變化。",
    status: "draft",
    publishedAt: null
  },
  {
    id: "article-003",
    slug: "community-day",
    title: "地方工作日的集合方式",
    category: "Activity Review",
    excerpt: "從一次活動回顧，看見參與如何被延續。",
    status: "published",
    publishedAt: "2026-06-28"
  }
];

export const featuredEvents = [
  {
    id: "event-001",
    slug: "wetland-walk",
    title: "濕地慢行導覽",
    location: "成龍濕地",
    dateLabel: "7/12、7/13",
    status: "open",
    summary: "以步行方式重新靠近濕地、村落與風景。"
  },
  {
    id: "event-002",
    slug: "field-sketch",
    title: "風景速寫工作坊",
    location: "村落活動中心",
    dateLabel: "7/20",
    status: "open",
    summary: "用線條和文字記錄地方景觀。"
  }
];

export const reservations = [
  {
    id: "reservation-001",
    eventTitle: "濕地慢行導覽",
    sessionLabel: "2026/07/12 10:00",
    name: "林小姐",
    quantity: 2,
    phone: "09xx-xxx-123",
    status: "pending"
  },
  {
    id: "reservation-002",
    eventTitle: "風景速寫工作坊",
    sessionLabel: "2026/07/20 14:00",
    name: "陳先生",
    quantity: 1,
    phone: "09xx-xxx-456",
    status: "confirmed"
  }
];

export const mediaItems = [
  {
    id: "media-001",
    title: "wetland texture",
    url: "",
    alt: "濕地質地"
  },
  {
    id: "media-002",
    title: "field path",
    url: "",
    alt: "田間路徑"
  },
  {
    id: "media-003",
    title: "water surface",
    url: "",
    alt: "水面"
  }
];
