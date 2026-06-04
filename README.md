# UrbanStep Store - Sport Shoes E-commerce

UrbanStep Store la ung dung thuong mai dien tu ban giay the thao, gom backend API bang Express/MongoDB va frontend bang React/Vite.

## Cau Truc

- `backend/`: Express API, route-controller-service, luu du lieu bang MongoDB/Mongoose.
- `frontend/`: React + Vite, Tailwind CSS, component modular.

## Yeu Cau

- Node.js 18 tro len.
- MongoDB dang chay tai `127.0.0.1:27017`, hoac Docker Desktop neu dung `docker compose`.

## Cau Hinh Backend

File `backend/.env`:

```env
PORT=3000
NODE_ENV=development
APP_NAME="UrbanStep Store"
AUTH_SECRET=urbanstep-dev-secret
MONGODB_URI=mongodb://127.0.0.1:27017/urbanstep
```

## Chay Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

Server chay tai `http://localhost:3000`.

Lenh `npm run seed` nap du lieu mau tu `backend/src/data/catalog.js` vao MongoDB.

## Chay Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chay tai `http://localhost:5173`.

## Tai Khoan Dung Thu

- Member: `member@urbanstep.vn` / `123456`
- Admin: `admin@urbanstep.vn` / `123456`

## Chay Bang Docker

```bash
docker compose up -d --build
```

MongoDB trong Docker duoc map ra may host tai `127.0.0.1:27017`.

## Kiem Thu

```bash
cd backend
npm test

cd ../frontend
npm run lint
npm run build
```
