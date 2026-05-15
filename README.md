# BaiTap04 - UrbanStep Store

Du an ca nhan gom API + UI cho trang ban 1 dong san pham: giay the thao. UI dung Tailwind CSS CDN va Swiper, API dung Express.

## Chay du an

```bash
npm install
npm start
```

Mo trinh duyet tai `http://localhost:3000`.

Tai khoan thanh vien demo:

- Email: `member@urbanstep.vn`
- Mat khau: `123456`

## Chuc nang da co

- Dang nhap thanh vien, hien thi thong tin thanh vien dang nhap va logout.
- Trang chu co khuyen mai, san pham moi nhat, ban chay nhat.
- Tim kiem va loc san pham theo tu khoa, danh muc, khoang gia, danh gia, con hang, dang khuyen mai va sap xep.
- Trang chi tiet san pham co slider hinh anh bang Swiper, ton kho, so luong da ban, tang giam so luong, danh muc va san pham tuong tu.
- API JSON cho login, thong tin thanh vien, danh muc, khuyen mai, danh sach va chi tiet san pham.

## API chinh

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/categories`
- `GET /api/promotions`
- `GET /api/products`
- `GET /api/products/:slug`

Vi du loc:

```text
GET /api/products?search=run&category=running&minPrice=1000000&maxPrice=2500000&minRating=4&inStock=true&promo=true&sort=best-selling
```

## Kiem thu

```bash
npm test
```
