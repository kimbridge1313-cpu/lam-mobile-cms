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

export const articleCategories = [
  "Local Story",
  "Field Note",
  "Activity Review",
  "Wetland Knowledge"
];

export const recentArticles = [
  {
    id: "article-001",
    slug: "wetland-story",
    title: "一場從濕地開始的地方故事",
    subtitle: "重新認識土地、水鳥與日常生活的關係",
    category: "Local Story",
    excerpt: "重新認識土地、水鳥與日常生活的關係。",
    status: "published",
    publishedAt: "2026-07-03",
    updatedAt: "2026-07-03",
    socialText: "一場從濕地開始的地方故事｜重新認識土地、水鳥與日常生活的關係。"
  },
  {
    id: "article-002",
    slug: "field-note",
    title: "水鳥、潮線與風的方向",
    subtitle: "一段午後觀察筆記",
    category: "Field Note",
    excerpt: "用一段午後觀察，記錄濕地裡細微的變化。",
    status: "draft",
    publishedAt: null,
    updatedAt: "2026-07-02",
    socialText: "新的田野筆記草稿：水鳥、潮線與風的方向。"
  },
  {
    id: "article-003",
    slug: "community-day",
    title: "地方工作日的集合方式",
    subtitle: "活動如何被整理成可延續的參與",
    category: "Activity Review",
    excerpt: "從一次活動回顧，看見參與如何被延續。",
    status: "published",
    publishedAt: "2026-06-28",
    updatedAt: "2026-06-30",
    socialText: "回顧地方工作日，整理參與如何被延續。"
  },
  {
    id: "article-004",
    slug: "wetland-sound",
    title: "濕地裡的聲音層次",
    subtitle: "用聽覺重新靠近地方",
    category: "Wetland Knowledge",
    excerpt: "從風、水、鳥鳴與人的活動，理解一個地方的聲音景觀。",
    status: "archived",
    publishedAt: "2026-06-10",
    updatedAt: "2026-06-18",
    socialText: "用聲音重新靠近濕地。"
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
    summary: "以步行方式重新靠近濕地、村落與風景。",
    capacity: 40,
    booked: 17,
    needPayment: false,
    price: 0
  },
  {
    id: "event-002",
    slug: "field-sketch",
    title: "風景速寫工作坊",
    location: "村落活動中心",
    dateLabel: "7/20",
    status: "open",
    summary: "用線條和文字記錄地方景觀。",
    capacity: 16,
    booked: 9,
    needPayment: true,
    price: 450
  },
  {
    id: "event-003",
    slug: "night-observation",
    title: "夜間觀察小聚",
    location: "濕地入口集合",
    dateLabel: "8/03",
    status: "draft",
    summary: "草稿活動，預計整理夜間觀察與安全注意事項。",
    capacity: 12,
    booked: 0,
    needPayment: false,
    price: 0
  }
];

export const eventSessions = [
  {
    id: "session-001",
    eventId: "event-001",
    date: "2026-07-12",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 20,
    booked: 9,
    status: "open"
  },
  {
    id: "session-002",
    eventId: "event-001",
    date: "2026-07-13",
    startTime: "14:00",
    endTime: "15:30",
    capacity: 20,
    booked: 8,
    status: "open"
  },
  {
    id: "session-003",
    eventId: "event-002",
    date: "2026-07-20",
    startTime: "14:00",
    endTime: "16:00",
    capacity: 16,
    booked: 9,
    status: "open"
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
    email: "lin@example.com",
    note: "想帶小朋友一起參加。",
    status: "pending",
    paymentStatus: "not_required"
  },
  {
    id: "reservation-002",
    eventTitle: "風景速寫工作坊",
    sessionLabel: "2026/07/20 14:00",
    name: "陳先生",
    quantity: 1,
    phone: "09xx-xxx-456",
    email: "chen@example.com",
    note: "需要自備畫具嗎？",
    status: "confirmed",
    paymentStatus: "paid"
  },
  {
    id: "reservation-003",
    eventTitle: "濕地慢行導覽",
    sessionLabel: "2026/07/13 14:00",
    name: "王小姐",
    quantity: 3,
    phone: "09xx-xxx-789",
    email: "wang@example.com",
    note: "其中一位長輩行動較慢。",
    status: "confirmed",
    paymentStatus: "not_required"
  }
];

export const mediaItems = [
  {
    id: "media-001",
    title: "wetland texture",
    filename: "wetland-texture.webp",
    url: "",
    alt: "濕地質地",
    tags: ["濕地", "背景"],
    size: "1.2 MB",
    uploadedAt: "2026-07-01"
  },
  {
    id: "media-002",
    title: "field path",
    filename: "field-path.webp",
    url: "",
    alt: "田間路徑",
    tags: ["路徑", "活動"],
    size: "860 KB",
    uploadedAt: "2026-06-29"
  },
  {
    id: "media-003",
    title: "water surface",
    filename: "water-surface.webp",
    url: "",
    alt: "水面",
    tags: ["水", "氛圍"],
    size: "940 KB",
    uploadedAt: "2026-06-26"
  },
  {
    id: "media-004",
    title: "community table",
    filename: "community-table.webp",
    url: "",
    alt: "地方工作桌",
    tags: ["活動", "地方"],
    size: "1.6 MB",
    uploadedAt: "2026-06-22"
  }
];
