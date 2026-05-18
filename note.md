# Ghi chu du an BaiTap04 - UrbanStep Store

## 1. Tong quan

UrbanStep Store la du an web ban giay the thao gom 2 phan:

- Backend: Node.js + Express, tra ve API JSON.
- Frontend: HTML/CSS/JavaScript thuan, dung Tailwind CSS CDN va Swiper.
- Du lieu hien tai dang luu trong file JavaScript, chua ket noi database.

Muc tieu chinh cua du an la cho phep thanh vien dang nhap, xem trang chu ban hang, tim kiem/loc san pham va xem chi tiet san pham.

## 2. Cach chay du an

```bash
npm install
npm start
```

Sau do mo trinh duyet tai:

```text
http://localhost:3000
```

Chay kiem thu:

```bash
npm test
```

## 3. Tai khoan demo

Tai khoan thanh vien:

```text
Email: member@urbanstep.vn
Mat khau: 123456
```

Tai khoan admin co trong du lieu mau, nhung trang ban hang chi cho phep role `member` truy cap.

## 4. Cau truc thu muc

```text
public/
  index.html        Giao dien HTML ban dau
  app.js            Logic frontend SPA
  styles.css        CSS bo sung

src/
  app.js            Cau hinh Express app va route chinh
  server.js         Khoi dong server
  data/catalog.js   Du lieu mau: users, products, categories, promotions
  middleware/auth.js
  routes/
    auth.routes.js
    catalog.routes.js
  services/
    authService.js
    productService.js

tests/
  auth.test.js
  products.test.js
```

## 5. Chuc nang da co

- Dang nhap thanh vien.
- Luu token dang nhap trong `localStorage`.
- Kiem tra token khi goi API can dang nhap.
- Trang chu co khuyen mai, san pham moi nhat va san pham ban chay.
- Tim kiem san pham theo tu khoa.
- Loc san pham theo danh muc, gia, danh gia, con hang va dang khuyen mai.
- Sap xep san pham theo moi nhat, ban chay, gia tang/giam va danh gia.
- Trang chi tiet san pham co hinh anh, gia, ton kho, mau sac, kich co va san pham lien quan.
- Tang/giam so luong san pham theo ton kho.

## 6. API chinh

### Auth

```text
POST /api/auth/login
GET  /api/auth/me
```

`/api/auth/me` can header:

```text
Authorization: Bearer <token>
```

### Catalog

Tat ca API catalog dang yeu cau dang nhap bang tai khoan `member`.

```text
GET /api/home
GET /api/categories
GET /api/promotions
GET /api/products
GET /api/products/:slug
```

Vi du loc san pham:

```text
GET /api/products?search=run&category=running&minPrice=1000000&maxPrice=2500000&minRating=4&inStock=true&promo=true&sort=best-selling
```

## 7. Luong xu ly chinh

1. Nguoi dung vao web.
2. Frontend kiem tra token trong `localStorage`.
3. Neu chua co token hoac token khong hop le thi hien form dang nhap.
4. Khi dang nhap thanh cong, server tra ve `token` va thong tin user da duoc an mat khau.
5. Frontend dung token de goi cac API `/api/home`, `/api/categories`, `/api/products`.
6. Khi chon san pham, frontend dieu huong bang hash route `#/product/<slug>`.
7. Trang chi tiet goi `/api/products/:slug` de lay san pham va danh sach lien quan.

## 8. Kiem thu hien co

File `tests/auth.test.js` kiem tra:

- Dang nhap dung thong tin se co token va user role `member`.
- Token hop le tra ve user da an password.
- Sai mat khau bi tu choi.
- Token sai dinh dang khong lam app bi crash.

File `tests/products.test.js` kiem tra:

- Loc san pham theo keyword, danh muc, gia, ton kho, khuyen mai va rating.
- Sap xep san pham theo gia tang dan.
- Chi tiet san pham co category va san pham lien quan cung danh muc.

Trang thai gan nhat:

```text
npm test: 7/7 test pass
```

## 9. Diem can luu y / co the cai thien

- Nhieu chuoi tieng Viet trong source dang bi loi encoding/mojibake, nen mot so cau hien sai thay vi tieng Viet co dau.
- Mat khau dang luu plain text trong du lieu mau, chi phu hop demo.
- Token tu viet bang HMAC don gian, nen dung thu vien chuan neu lam san pham that.
- Du lieu dang nam trong file `catalog.js`, neu mo rong nen tach sang database.
- Chua co gio hang that, nut them vao gio hang moi hien thong bao mau.
- API catalog hien dang bat buoc role `member`, nen nguoi chua dang nhap khong xem duoc danh sach san pham.

## 10. Goi y huong phat trien

- Sua encoding tieng Viet ve UTF-8.
- Them gio hang that bang `localStorage` hoac database.
- Them dang ky tai khoan.
- Them trang quan tri san pham cho admin.
- Them database SQLite/MongoDB/PostgreSQL.
- Them test cho API route Express.
- Them validate input cho login va filter.
