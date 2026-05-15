const categories = [
  {
    id: "running",
    name: "Giay chay bo",
    description: "Dem nhe, thoang chan, phu hop tap luyen hang ngay."
  },
  {
    id: "lifestyle",
    name: "Giay lifestyle",
    description: "De phoi do, di hoc, di lam va di choi cuoi tuan."
  },
  {
    id: "training",
    name: "Giay tap gym",
    description: "De on dinh, bam san tot cho cac bai tap suc manh."
  },
  {
    id: "basketball",
    name: "Giay bong ro",
    description: "Co chan chac, dem phan hoi nhanh va de ngoai bam san."
  },
  {
    id: "trail",
    name: "Giay trail",
    description: "De gai sau, bao ve chan khi chay dia hinh."
  }
];

const promotions = [
  {
    id: "summer",
    title: "Sale he den 35%",
    description: "Ap dung cho cac mau lifestyle va running dang hot.",
    badge: "Den 35%",
    tone: "amber"
  },
  {
    id: "shipping",
    title: "Mien phi giao hang",
    description: "Don tu 900.000d duoc mien phi giao hang toan quoc.",
    badge: "Freeship",
    tone: "emerald"
  },
  {
    id: "member",
    title: "Uu dai thanh vien",
    description: "Thanh vien nhan them 5% khi mua tu 2 san pham.",
    badge: "Member",
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
    colors: ["Do cam", "Trang", "Den"],
    sizes: [39, 40, 41, 42, 43],
    tags: ["running", "daily trainer", "sale", "lightweight"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Mau giay chay bo nhe, dem em va phan hoi nhanh cho lich tap hang ngay.",
    description:
      "AeroRun Pulse 1 duoc thiet ke cho nguoi chay moi den trung cap. Phan upper knit thoang khi, de giua EVA dan hoi tot va de ngoai cao su giup bam duong on dinh.",
    specs: ["Upper knit thoang khi", "Dem EVA phan hoi", "Trong luong khoang 255g", "Drop 8mm"]
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
    colors: ["Kem", "Xanh navy", "Den"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "canvas", "sale", "casual"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giay canvas co dien, de phoi do va phu hop di hoc, di lam hang ngay.",
    description:
      "StreetFlex Canvas uu tien su gon nhe va ben bi. Lot giay mem, mui giay rong vua phai giup di lau khong bi bi chan.",
    specs: ["Vai canvas day", "Lot giay removable", "De cao su chong truot", "Phong cach toi gian"]
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
    colors: ["Den", "Xam"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["training", "gym", "stable", "crossfit"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "De phang va chac chan cho gym, HIIT va cac bai tap nang ta.",
    description:
      "TrainMax Pro co phan de rong, got chan on dinh va lop cao su ben ngoai tang do bam khi doi huong nhanh.",
    specs: ["De phang on dinh", "Thanh got TPU", "Bam san tot", "Phu hop gym va HIIT"]
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
    colors: ["Trang do", "Den vang"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["basketball", "ankle support", "sale", "court"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Co chan em, than giay chac va de bam san cho cac pha doi huong.",
    description:
      "CourtAir Grip tap trung vao do bao ve va kha nang bam san. Lop dem AirFoam giup tiep dat em hon khi bat nhay lien tuc.",
    specs: ["Co trung bao ve co chan", "Dem AirFoam", "De ngoai xuong ca", "Form om chan"]
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
    colors: ["Reu", "Den", "Cam dat"],
    sizes: [39, 40, 41, 42, 43],
    tags: ["trail", "outdoor", "grip", "new"],
    images: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Giay trail de gai sau, bao ve mui chan va bam duong dat da on dinh.",
    description:
      "TrailVolt Terrain co lop mesh chong bam bun nhe, mui giay gia cuong va de gai 5mm cho nhung cung duong dia hinh.",
    specs: ["Gai de 5mm", "Mui giay gia cuong", "Thoat nuoc nhanh", "Phu hop trail ngan va trung binh"]
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
    colors: ["Trang xanh", "Den"],
    sizes: [38, 39, 40, 41, 42],
    tags: ["running", "sale", "entry", "out-of-stock"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Mau running gia tot cho nguoi moi bat dau, hien dang het hang.",
    description:
      "SwiftRun Lite phu hop cac buoi chay nhe va di bo the thao. San pham dang het hang va se duoc cap nhat lai ton kho sau.",
    specs: ["Dem mem", "Upper mesh", "Gia de tiep can", "Dang het hang"]
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
    colors: ["Xam", "Be", "Den"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["lifestyle", "knit", "sale", "comfort"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Than knit mem, dang giay hien dai cho lich di chuyen ca ngay.",
    description:
      "MetroStride Knit giu form gon va em chan. Phu hop nguoi can mot doi sneaker linh hoat cho ca cong viec lan di choi.",
    specs: ["Than knit co gian", "De giua em", "Phong cach toi gian", "Nhe va thoang"]
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
    colors: ["Den do", "Xam"],
    sizes: [40, 41, 42, 43, 44],
    tags: ["training", "lifting", "stable", "gym"],
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1200&q=80"
    ],
    summary: "Got nang nhe va de chac cho squat, deadlift va tap suc manh.",
    description:
      "PowerLift Stable co got nang 18mm, quai giua chan va phan de ngoai rat on dinh khi nang ta nang.",
    specs: ["Got nang 18mm", "Quai giua chan", "De bam san", "Toi uu tap suc manh"]
  }
];

const users = [
  {
    id: "u-001",
    name: "Nguyen Thanh Vien",
    email: "member@urbanstep.vn",
    password: "123456",
    role: "member",
    phone: "0901 234 567",
    loyaltyRank: "Gold",
    joinedAt: "2026-02-14T00:00:00.000Z",
    points: 1280
  },
  {
    id: "u-002",
    name: "Quan tri vien",
    email: "admin@urbanstep.vn",
    password: "123456",
    role: "admin",
    phone: "0909 000 111",
    loyaltyRank: "Staff",
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
