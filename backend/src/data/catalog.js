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
  },
  {
    id: "p-009",
    slug: "skycourt-mid",
    name: "SkyCourt Mid",
    brand: "UrbanStep",
    categoryId: "basketball",
    price: 1790000,
    originalPrice: 2190000,
    stock: 14,
    sold: 312,
    rating: 4.7,
    reviewCount: 68,
    createdAt: "2026-05-12T08:00:00.000Z",
    isNew: true,
    isBestSeller: true,
    colors: ["Trắng xanh", "Đen bạc"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["basketball", "court", "mid", "sale"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày bóng rổ cổ trung, bám sân tốt và hỗ trợ đổi hướng nhanh.",
    description:
      "SkyCourt Mid phù hợp các buổi chơi bóng cường độ cao. Phần cổ trung giữ chân chắc, đệm êm và đế ngoài bám sân trong nhà ổn định.",
    specs: ["Cổ trung chắc chân", "Đệm phản hồi nhanh", "Đế bám sân trong nhà", "Phù hợp thi đấu phong trào"]
  },
  {
    id: "p-010",
    slug: "trailguard-flow",
    name: "TrailGuard Flow",
    brand: "UrbanStep",
    categoryId: "trail",
    price: 2290000,
    originalPrice: 2490000,
    stock: 12,
    sold: 184,
    rating: 4.8,
    reviewCount: 51,
    createdAt: "2026-05-08T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Xanh rêu", "Xám đá", "Cam đất"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["trail", "outdoor", "water-resistant", "sale"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày chạy địa hình có thân thoáng, mũi gia cường và đế gai bám đường đất đá.",
    description:
      "TrailGuard Flow dành cho cung đường trail ngắn và trung bình. Đế gai sâu giúp bám đường, phần mũi gia cường bảo vệ chân khi gặp đá dăm.",
    specs: ["Đế gai sâu", "Mũi giày gia cường", "Thân thoáng nhanh khô", "Phù hợp đường đất đá"]
  }
];

products.push(
  {
    id: "p-011",
    slug: "aerorun-tempo-2",
    name: "AeroRun Tempo 2",
    brand: "UrbanStep",
    categoryId: "running",
    price: 1490000,
    originalPrice: 1890000,
    stock: 22,
    sold: 278,
    rating: 4.7,
    reviewCount: 84,
    createdAt: "2026-05-14T08:00:00.000Z",
    isNew: true,
    isBestSeller: true,
    colors: ["Xanh navy", "Trắng", "Cam"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["running", "tempo", "sale", "daily"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày chạy bộ nhịp nhanh, nhẹ chân và phù hợp các buổi chạy tempo.",
    description:
      "AeroRun Tempo 2 cân bằng giữa độ êm và phản hồi để hỗ trợ chạy hằng ngày lẫn các bài chạy tốc độ vừa.",
    specs: ["Đệm phản hồi", "Thân lưới thoáng", "Đế cao su bám đường", "Phù hợp chạy tempo"]
  },
  {
    id: "p-012",
    slug: "aerorun-cloud",
    name: "AeroRun Cloud",
    brand: "UrbanStep",
    categoryId: "running",
    price: 1890000,
    originalPrice: 1890000,
    stock: 16,
    sold: 198,
    rating: 4.6,
    reviewCount: 52,
    createdAt: "2026-04-18T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Trắng xanh", "Đen", "Xám"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["running", "cushion", "easy run"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Mẫu chạy bộ đệm dày, êm chân cho easy run và đi bộ thể thao.",
    description:
      "AeroRun Cloud ưu tiên độ êm, giảm mỏi chân khi chạy nhẹ hoặc di chuyển nhiều trong ngày.",
    specs: ["Đệm dày êm", "Form ôm vừa", "Thân giày thoáng", "Phù hợp easy run"]
  },
  {
    id: "p-013",
    slug: "runflow-starter",
    name: "RunFlow Starter",
    brand: "UrbanStep",
    categoryId: "running",
    price: 990000,
    originalPrice: 1290000,
    stock: 31,
    sold: 352,
    rating: 4.5,
    reviewCount: 76,
    createdAt: "2026-03-12T08:00:00.000Z",
    isNew: false,
    isBestSeller: true,
    colors: ["Đen trắng", "Xanh", "Xám"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["running", "entry", "sale", "starter"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày chạy bộ giá dễ tiếp cận cho người mới bắt đầu.",
    description:
      "RunFlow Starter có trọng lượng nhẹ, đế êm vừa đủ và thân giày dễ làm quen cho lịch tập cơ bản.",
    specs: ["Giá dễ tiếp cận", "Đế êm vừa", "Nhẹ chân", "Dễ phối đồ thể thao"]
  },
  {
    id: "p-014",
    slug: "swiftmile-racer",
    name: "SwiftMile Racer",
    brand: "UrbanStep",
    categoryId: "running",
    price: 2390000,
    originalPrice: 2690000,
    stock: 10,
    sold: 143,
    rating: 4.9,
    reviewCount: 41,
    createdAt: "2026-05-16T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Đỏ cam", "Trắng bạc"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["running", "race", "speed", "sale"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày chạy tốc độ với cảm giác bật tốt cho buổi chạy nhanh.",
    description:
      "SwiftMile Racer hướng tới người chạy đã có nền tảng, cần một đôi giày nhẹ và phản hồi tốt hơn.",
    specs: ["Trọng lượng nhẹ", "Đệm bật tốt", "Đế mỏng linh hoạt", "Phù hợp chạy nhanh"]
  },
  {
    id: "p-015",
    slug: "dailystride-go",
    name: "DailyStride Go",
    brand: "UrbanStep",
    categoryId: "running",
    price: 1290000,
    originalPrice: 1290000,
    stock: 27,
    sold: 229,
    rating: 4.4,
    reviewCount: 63,
    createdAt: "2026-02-11T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Xám", "Đen", "Trắng"],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    tags: ["running", "daily", "walking"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày thể thao chạy nhẹ và đi bộ hằng ngày, bền và dễ mang.",
    description:
      "DailyStride Go phù hợp người cần một đôi giày đa dụng cho chạy nhẹ, đi bộ và sinh hoạt thường ngày.",
    specs: ["Đế bền", "Dễ mang", "Thoáng chân", "Phù hợp hằng ngày"]
  },
  {
    id: "p-016",
    slug: "streetflex-suede",
    name: "StreetFlex Suede",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 1190000,
    originalPrice: 1490000,
    stock: 19,
    sold: 301,
    rating: 4.6,
    reviewCount: 70,
    createdAt: "2026-05-01T08:00:00.000Z",
    isNew: true,
    isBestSeller: true,
    colors: ["Nâu", "Đen", "Kem"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "suede", "casual", "sale"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày lifestyle da lộn mềm, hợp đi học, đi làm và dạo phố.",
    description:
      "StreetFlex Suede có phom gọn, chất liệu mềm và bảng màu dễ phối với trang phục hằng ngày.",
    specs: ["Da lộn mềm", "Đế cao su", "Phom gọn", "Dễ phối đồ"]
  },
  {
    id: "p-017",
    slug: "metrostride-air",
    name: "MetroStride Air",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 1390000,
    originalPrice: 1690000,
    stock: 21,
    sold: 267,
    rating: 4.7,
    reviewCount: 58,
    createdAt: "2026-04-14T08:00:00.000Z",
    isNew: false,
    isBestSeller: true,
    colors: ["Trắng", "Xanh navy", "Đen"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "comfort", "sale", "urban"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày lifestyle êm nhẹ cho lịch di chuyển dài trong thành phố.",
    description:
      "MetroStride Air tập trung vào sự thoải mái, phù hợp người đi học, đi làm hoặc di chuyển nhiều.",
    specs: ["Lót êm", "Thân nhẹ", "Đế linh hoạt", "Hợp đi cả ngày"]
  },
  {
    id: "p-018",
    slug: "canvas-low-heritage",
    name: "Canvas Low Heritage",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 790000,
    originalPrice: 990000,
    stock: 45,
    sold: 412,
    rating: 4.5,
    reviewCount: 96,
    createdAt: "2026-01-25T08:00:00.000Z",
    isNew: false,
    isBestSeller: true,
    colors: ["Đen", "Trắng", "Kem"],
    sizes: [37, 38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "canvas", "basic", "sale"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày canvas cổ thấp, tối giản và dễ phối đồ hằng ngày.",
    description:
      "Canvas Low Heritage là mẫu cơ bản, nhẹ, dễ mang và phù hợp nhiều phong cách casual.",
    specs: ["Cổ thấp", "Vải canvas", "Đế chống trượt", "Phong cách tối giản"]
  },
  {
    id: "p-019",
    slug: "urban-knit-slipon",
    name: "Urban Knit Slip-On",
    brand: "UrbanStep",
    categoryId: "lifestyle",
    price: 1090000,
    originalPrice: 1090000,
    stock: 28,
    sold: 176,
    rating: 4.4,
    reviewCount: 39,
    createdAt: "2026-03-07T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Xám", "Be", "Đen"],
    sizes: [38, 39, 40, 41, 42],
    tags: ["lifestyle", "slip-on", "knit", "comfort"],
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày slip-on thân dệt co giãn, tiện mang nhanh mỗi ngày.",
    description:
      "Urban Knit Slip-On có thân dệt mềm và phom dễ mang, phù hợp những ngày cần sự tiện lợi.",
    specs: ["Không dây buộc", "Thân dệt co giãn", "Lót mềm", "Nhẹ và thoáng"]
  },
  {
    id: "p-020",
    slug: "trainmax-core",
    name: "TrainMax Core",
    brand: "UrbanStep",
    categoryId: "training",
    price: 1290000,
    originalPrice: 1590000,
    stock: 18,
    sold: 223,
    rating: 4.6,
    reviewCount: 55,
    createdAt: "2026-04-25T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Đen", "Xám", "Đỏ"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["training", "gym", "stable", "sale"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày tập gym đế chắc, ổn định cho các bài tập sức mạnh cơ bản.",
    description:
      "TrainMax Core hỗ trợ tập gym hằng tuần với đế phẳng, bám sàn và phần gót ổn định.",
    specs: ["Đế phẳng", "Gót ổn định", "Bám sàn tốt", "Phù hợp gym"]
  },
  {
    id: "p-021",
    slug: "crossfit-burst",
    name: "CrossFit Burst",
    brand: "UrbanStep",
    categoryId: "training",
    price: 1590000,
    originalPrice: 1890000,
    stock: 13,
    sold: 164,
    rating: 4.7,
    reviewCount: 43,
    createdAt: "2026-05-09T08:00:00.000Z",
    isNew: true,
    isBestSeller: false,
    colors: ["Đen cam", "Xám xanh"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["training", "crossfit", "hiit", "sale"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày tập đa năng cho HIIT, crossfit và các bài đổi hướng nhanh.",
    description:
      "CrossFit Burst có thân chắc, đế bám và phần hông giày hỗ trợ chuyển động ngang.",
    specs: ["Hỗ trợ đổi hướng", "Đế bám tốt", "Thân chắc", "Phù hợp HIIT"]
  },
  {
    id: "p-022",
    slug: "liftmax-anchor",
    name: "LiftMax Anchor",
    brand: "UrbanStep",
    categoryId: "training",
    price: 1890000,
    originalPrice: 1890000,
    stock: 8,
    sold: 119,
    rating: 4.9,
    reviewCount: 29,
    createdAt: "2026-02-19T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Đen", "Đỏ đô"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["training", "lifting", "stable", "power"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày tập nâng tạ có gót ổn định và quai giữ chân chắc.",
    description:
      "LiftMax Anchor dành cho các bài squat, deadlift và tập sức mạnh cần nền đế chắc chắn.",
    specs: ["Gót chắc", "Quai giữ chân", "Đế rộng", "Tối ưu nâng tạ"]
  },
  {
    id: "p-023",
    slug: "courtair-speed",
    name: "CourtAir Speed",
    brand: "UrbanStep",
    categoryId: "basketball",
    price: 1990000,
    originalPrice: 2290000,
    stock: 11,
    sold: 205,
    rating: 4.6,
    reviewCount: 48,
    createdAt: "2026-04-05T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Trắng đen", "Xanh vàng"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["basketball", "speed", "court", "sale"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày bóng rổ nhẹ, phản hồi nhanh cho lối chơi tốc độ.",
    description:
      "CourtAir Speed có đệm êm, thân giày nhẹ và đế ngoài hỗ trợ bứt tốc trên sân.",
    specs: ["Nhẹ chân", "Đệm phản hồi", "Bám sân", "Phù hợp hậu vệ"]
  },
  {
    id: "p-024",
    slug: "trailpeak-ridge",
    name: "TrailPeak Ridge",
    brand: "UrbanStep",
    categoryId: "trail",
    price: 2190000,
    originalPrice: 2190000,
    stock: 9,
    sold: 152,
    rating: 4.7,
    reviewCount: 37,
    createdAt: "2026-03-22T08:00:00.000Z",
    isNew: false,
    isBestSeller: false,
    colors: ["Rêu đen", "Xám cam"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["trail", "ridge", "outdoor", "grip"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giày trail bám tốt cho cung đường đất, sỏi và dốc nhẹ.",
    description:
      "TrailPeak Ridge có đế gai sâu, thân thoáng và mũi bảo vệ cho các chuyến chạy địa hình cuối tuần.",
    specs: ["Đế gai bám", "Mũi bảo vệ", "Thoáng nhanh khô", "Phù hợp trail cuối tuần"]
  }
);

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
