const categories = [
  {
    id: "running",
    name: "Giày chạy bộ",
    description: "Đệm nhẹ, thoáng chân, phù hợp tập luyện hằng ngày."
  },
  {
    id: "lifestyle",
    name: "Giày thời trang",
    description: "Dễ phối đồ, đi học, đi làm và đi chơi cuối tuần."
  },
  {
    id: "training",
    name: "Giày tập gym",
    description: "Đế ổn định, bám sàn tốt cho các bài tập sức mạnh."
  },
  {
    id: "basketball",
    name: "Giày bóng rổ",
    description: "Cổ chân chắc, đệm phản hồi nhanh và đế ngoài bám sân."
  },
  {
    id: "trail",
    name: "Giày chạy địa hình",
    description: "Đế gai sâu, bảo vệ chân khi chạy địa hình."
  }
];

const promotions = [
  {
    id: "summer",
    title: "Giảm giá hè đến 35%",
    description: "Áp dụng cho các mẫu thời trang và chạy bộ được yêu thích.",
    badge: "Đến 35%",
    tone: "amber"
  },
  {
    id: "shipping",
    title: "Miễn phí giao hàng",
    description: "Đơn từ 900.000đ được miễn phí giao hàng toàn quốc.",
    badge: "Miễn phí giao",
    tone: "emerald"
  },
  {
    id: "member",
    title: "Ưu đãi thành viên",
    description: "Thành viên nhận thêm 5% khi mua từ 2 sản phẩm.",
    badge: "Thành viên",
    tone: "sky"
  }
];

const products = [
  {
    id: "p-001",
    slug: "aerorun-pulse-1",
    name: "AeroRun Pulse 1",
    brand: "UrbanStep",
    categoryId: "running",
    price: 1590000,
    originalPrice: 2190000,
    stock: 18,
    sold: 326,
    rating: 4.8,
    reviewCount: 112,
    createdAt: "2026-05-10T08:00:00.000Z",
    isNew: true,
    isBestSeller: true,
    colors: ["Đỏ cam", "Trắng", "Đen"],
    sizes: [39, 40, 41, 42, 43],
    tags: ["running", "daily trainer", "sale", "lightweight"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Mẫu giày chạy bộ nhẹ, đệm êm và phản hồi nhanh cho lịch tập hằng ngày.",
    description:
      "AeroRun Pulse 1 được thiết kế cho người chạy mới đến trung cấp. Phần thân giày dệt thoáng khí, đế giữa EVA đàn hồi tốt và đế ngoài cao su giúp bám đường ổn định.",
    specs: ["Thân giày dệt thoáng khí", "Đệm EVA phản hồi", "Trọng lượng khoảng 255g", "Độ chênh gót-mũi 8mm"]
  },
  {
    id: "p-002",
    slug: "streetflex-canvas",
    name: "StreetFlex Canvas",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 890000,
    originalPrice: 1190000,
    stock: 34,
    sold: 521,
    rating: 4.6,
    reviewCount: 89,
    createdAt: "2026-04-21T08:00:00.000Z",
    isNew: false,
    isBestSeller: true,
    colors: ["Kem", "Xanh biển đậm", "Đen"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "canvas", "sale", "casual"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày canvas cổ điển, dễ phối đồ và phù hợp đi học, đi làm hằng ngày.",
    description:
      "StreetFlex Canvas ưu tiên sự gọn nhẹ và bền bỉ. Lót giày mềm, mũi giày rộng vừa phải giúp đi lâu không bị bí chân.",
    specs: ["Vải canvas dày", "Lót giày tháo rời", "Đế cao su chống trượt", "Phong cách tối giản"]
  },
  {
    id: "p-003",
    slug: "trainmax-pro",
    name: "TrainMax Pro",
    brand: "UrbanStep",
    categoryId: "training",
    price: 1390000,
    originalPrice: 1390000,
    stock: 11,
    sold: 204,
    rating: 4.7,
    reviewCount: 57,
    createdAt: "2026-05-03T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Đen", "Xám"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["training", "gym", "stable", "crossfit"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Đế phẳng và chắc chắn cho gym, HIIT và các bài tập nâng tạ.",
    description:
      "TrainMax Pro có phần đế rộng, gót chân ổn định và lớp cao su bên ngoài tăng độ bám khi đổi hướng nhanh.",
    specs: ["Đế phẳng ổn định", "Thanh gót TPU", "Bám sàn tốt", "Phù hợp tập gym và HIIT"]
  },
  {
    id: "p-004",
    slug: "courtair-grip",
    name: "CourtAir Grip",
    brand: "UrbanStep",
    categoryId: "basketball",
    price: 1890000,
    originalPrice: 2390000,
    stock: 7,
    sold: 168,
    rating: 4.5,
    reviewCount: 44,
    createdAt: "2026-03-18T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Trắng đỏ", "Đen vàng"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["basketball", "ankle support", "sale", "court"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Cổ chân êm, thân giày chắc và đế bám sân cho các pha đổi hướng.",
    description:
      "CourtAir Grip tập trung vào độ bảo vệ và khả năng bám sân. Lớp đệm AirFoam giúp tiếp đất êm hơn khi bật nhảy liên tục.",
    specs: ["Cổ trung bảo vệ cổ chân", "Đệm AirFoam", "Đế ngoài xương cá", "Kiểu ôm chân"]
  },
  {
    id: "p-005",
    slug: "trailvolt-terrain",
    name: "TrailVolt Terrain",
    brand: "UrbanStep",
    categoryId: "trail",
    price: 2090000,
    originalPrice: 2090000,
    stock: 5,
    sold: 96,
    rating: 4.9,
    reviewCount: 38,
    createdAt: "2026-05-06T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Rêu", "Đen", "Cam đất"],
    sizes: [39, 40, 41, 42, 43],
    tags: ["trail", "outdoor", "grip", "new"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày chạy địa hình đế gai sâu, bảo vệ mũi chân và bám đường đất đá ổn định.",
    description:
      "TrailVolt Terrain có lớp lưới chống bám bùn nhẹ, mũi giày gia cường và đế gai 5mm cho những cung đường địa hình.",
    specs: ["Gai đế 5mm", "Mũi giày gia cường", "Thoát nước nhanh", "Phù hợp chạy địa hình ngắn và trung bình"]
  },
  {
    id: "p-006",
    slug: "swiftrun-lite",
    name: "SwiftRun Lite",
    brand: "UrbanStep",
    categoryId: "running",
    price: 1190000,
    originalPrice: 1490000,
    stock: 0,
    sold: 287,
    rating: 4.4,
    reviewCount: 73,
    createdAt: "2026-02-28T08:00:00.000Z",
    isNew: false,
    isBestSeller: true,
    colors: ["Trắng xanh", "Đen"],
    sizes: [38, 39, 40, 41, 42],
    tags: ["running", "sale", "entry", "out-of-stock"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Mẫu giày chạy bộ giá tốt cho người mới bắt đầu, hiện đang hết hàng.",
    description:
      "SwiftRun Lite phù hợp các buổi chạy nhẹ và đi bộ thể thao. Sản phẩm đang hết hàng và sẽ được cập nhật lại tồn kho sau.",
    specs: ["Đệm mềm", "Thân giày lưới", "Giá dễ tiếp cận", "Đang hết hàng"]
  },
  {
    id: "p-007",
    slug: "metrostride-knit",
    name: "MetroStride Knit",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 1290000,
    originalPrice: 1590000,
    stock: 23,
    sold: 241,
    rating: 4.6,
    reviewCount: 61,
    createdAt: "2026-04-30T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Xám", "Be", "Đen"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "knit", "sale", "comfort"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Thân dệt mềm, dáng giày hiện đại cho lịch di chuyển cả ngày.",
    description:
      "MetroStride Knit giữ dáng gọn và êm chân. Phù hợp người cần một đôi giày thể thao linh hoạt cho cả công việc lẫn đi chơi.",
    specs: ["Thân dệt co giãn", "Đế giữa êm", "Phong cách tối giản", "Nhẹ và thoáng"]
  },
  {
    id: "p-008",
    slug: "powerlift-stable",
    name: "PowerLift Stable",
    brand: "UrbanStep",
    categoryId: "training",
    price: 1690000,
    originalPrice: 1690000,
    stock: 9,
    sold: 135,
    rating: 4.8,
    reviewCount: 32,
    createdAt: "2026-03-29T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Đen đỏ", "Xám"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["training", "lifting", "stable", "gym"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Gót nâng nhẹ và đế chắc cho squat, deadlift và tập sức mạnh.",
    description:
      "PowerLift Stable có gót nâng 18mm, quai giữa chân và phần đế ngoài rất ổn định khi nâng tạ nặng.",
    specs: ["Gót nâng 18mm", "Quai giữa chân", "Đế bám sàn", "Tối ưu tập sức mạnh"]
  }
];

const users = [
  {
    id: "u-001",
    name: "Nguyễn Thành Viên",
    email: "member@urbanstep.vn",
    password: "123456",
    role: "member",
    phone: "0901 234 567",
    loyaltyRank: "Vàng",
    joinedAt: "2026-02-14T00:00:00.000Z",
    points: 1280
  },
  {
    id: "u-002",
    name: "Quản trị viên",
    email: "admin@urbanstep.vn",
    password: "123456",
    role: "admin",
    phone: "0909 000 111",
    loyaltyRank: "Nhân viên",
    joinedAt: "2025-12-01T00:00:00.000Z",
    points: 0
  }
];

module.exports = {
  categories,
  promotions,
  products,
  users
};
