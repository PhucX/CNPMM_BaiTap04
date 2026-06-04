TÀI LIỆU VẤN ĐÁP KỸ THUẬT
React · Node.js · Express · Redis · API · Deploy
137 câu hỏi & câu trả lời · 8 nhóm chủ đề

NHÓM 1: Node.js & Lập trình bất đồng bộ
Câu 93: Node.js là gì?
Trả lời: Node.js là môi trường runtime cho JavaScript chạy phía server, được xây dựng trên V8 engine của Chrome. Node.js cho phép chạy JavaScript ngoài trình duyệt, phù hợp để xây dựng server, API, công cụ dòng lệnh.
**📍 Áp dụng trong UrbanStep:** Node.js được dùng để chạy toàn bộ phần Backend của dự án. Thư mục `backend/` với file `src/server.js` chính là điểm khởi chạy của Node.js server.

Câu 94: Vì sao Node.js nhanh?
Trả lời: Node.js nhanh nhờ 3 yếu tố: (1) V8 engine biên dịch JS sang mã máy,V8 Engine là trình thông dịch và biên dịch mã JavaScript mã nguồn mở do Google phát triển (viết bằng C++) (2) Non-blocking I/O – không chờ đợi file/DB mà tiếp tục xử lý request khác, (3) Single-threaded Event Loop – tránh overhead của multi-threading.
Single-threaded Event Loop (Vòng lặp sự kiện đơn luồng) là cơ chế xử lý tác vụ bất đồng bộ của các môi trường như JavaScript (ví dụ: Node.js, trình duyệt). Thay vì tạo nhiều luồng (multi-threading) để xử lý cùng lúc, nó dùng một luồng duy nhất để liên tục kiểm tra và thực thi các sự kiện trong hàng đợi, giúp tránh được độ trễ và tài nguyên phát sinh từ việc quản lý nhiều luồng.
**📍 Áp dụng trong UrbanStep:** Khi nhiều khách hàng cùng mở `Home.jsx`, frontend gọi các API lấy danh mục và sản phẩm. Các truy vấn Mongoose như `Product.find()` trả về Promise, nên luồng JavaScript chính không phải đứng chờ MongoDB trả kết quả và server vẫn có thể tiếp nhận request khác.

Câu 8: Event Loop trong Node.js là gì?
Trả lời: Event Loop là cơ chế liên tục kiểm tra và thực thi các tác vụ trong Call Stack và Callback Queue. Khi Call Stack rỗng, Event Loop lấy callback từ Queue (I/O, timers...) và đưa vào thực thi. Đây là nền tảng của mô hình non-blocking trong Node.js.
Call Stack là ngăn xếp thực thi mã (vào sau, ra trước - FILO), nơi các hàm đồng bộ được đẩy vào và xử lý từng lệnh một. Callback Queue là hàng đợi lưu trữ các hàm bất đồng bộ chờ xử lý
**📍 Áp dụng trong UrbanStep:** Khi hàm `login` trong `backend/src/controllers/authController.js` được gọi, phần xử lý đồng bộ chạy trên Call Stack. Đến `await User.findOne(...)` trong `authService.js`, hàm tạm nhường quyền thực thi; khi truy vấn MongoDB hoàn tất, phần code sau `await` được đưa trở lại để tiếp tục xử lý.

Câu 95: Event Loop là gì?
Trả lời: Tương tự câu 8. Event Loop là vòng lặp vô tận: kiểm tra Call Stack → nếu rỗng thì lấy task từ Queue ra chạy. Thứ tự ưu tiên: microtask (Promise) > macrotask (setTimeout, I/O).
**📍 Áp dụng trong UrbanStep:** JavaScript của backend UrbanStep chủ yếu chạy trên một luồng chính, nhưng các thao tác I/O như truy vấn MongoDB được xử lý bất đồng bộ. Vì vậy server không phải chặn toàn bộ ứng dụng trong lúc chờ dữ liệu.

Câu 96: Blocking và Non-blocking khác nhau?
Blocking (Chặn luồng)
Cách hoạt động: Khi Node.js gặp một tác vụ Blocking (thường là đọc/ghi file đồng bộ, truy vấn DB đồng bộ, hoặc các phép toán CPU cực nặng), toàn bộ Execution Context (ngữ cảnh thực thi) của JavaScript sẽ bị dừng lại.
Hệ quả: Luồng chính không thể làm bất cứ việc gì khác, không thể nhận thêm request từ người dùng khác, không thể chạy các dòng code tiếp theo cho đến khi tác vụ đó hoàn thành.
Non-blocking (Không chặn luồng)
Cách hoạt động: Khi gặp tác vụ Non-blocking (các hàm bất đồng bộ), Node.js sẽ không tự làm. Nó "giao việc" đó cho Node APIs (được chạy bởi Thread Pool ngầm của hệ thống) xử lý riêng. Luồng chính lập tức đi tiếp để chạy các dòng code bên dưới.
Hệ quả: Ứng dụng luôn trong trạng thái sẵn sàng phản hồi. Khi tác vụ ngầm chạy xong, nó sẽ báo về thông qua Callback, Promise hoặc Async/Await để xử lý kết quả sau.
**📍 Áp dụng trong UrbanStep:** Trong `backend/src/services/authService.js`, các thao tác mã hóa mật khẩu như `crypto.scryptSync` là **Blocking** (chặn luồng do tính toán nặng), trong khi các thao tác tương tác Database như `User.findOne` là **Non-blocking** (không chặn luồng).

Câu 97: Callback là gì?
Trả lời: Callback là hàm được truyền vào một hàm khác như tham số và được gọi khi tác vụ hoàn thành. Ví dụ: fs.readFile('file.txt', (err, data) => { ... }) — hàm truyền vào là callback.
**📍 Áp dụng trong UrbanStep:** Ví dụ về Callback có thể thấy ở file `backend/src/app.js`: `app.get("/api/health", (req, res) => { ... })`. Hàm mũi tên `(req, res) => {...}` chính là một callback sẽ được gọi khi có người truy cập đường dẫn này.

Câu 98: Callback Hell là gì?
Trả lời: Callback Hell là tình trạng các callback lồng nhau quá nhiều cấp, khiến code khó đọc và bảo trì. Giải pháp: dùng Promise hoặc async/await để flatten cấu trúc.
**📍 Áp dụng trong UrbanStep:** Dự án của bạn **không bị** Callback Hell vì ở backend (`controllers/`) bạn dùng `async/await` và ở frontend (`services/api.js`) bạn cũng dùng `async/await` thay vì lồng ghép quá nhiều `.then()`.

Câu 99: Promise là gì?
Trả lời: Promise là đối tượng đại diện cho giá trị sẽ có trong tương lai (pending → fulfilled/rejected). Dùng .then() để xử lý khi thành công, .catch() khi thất bại. Promise giúp tránh callback hell và dễ chain các tác vụ bất đồng bộ.
· Pending (Đang chờ): Tác vụ bất đồng bộ đang chạy, chưa có kết quả.
· Fulfilled (Thành công): Tác vụ hoàn thành xuất sắc, Promise trả về dữ liệu (Value).
· Rejected (Thất bại): Có lỗi xảy ra (mất mạng, sai đường dẫn...), Promise trả về lý do lỗi (Error).
**📍 Áp dụng trong UrbanStep:** Trong `frontend/src/services/api.js`, `apiClient.request(...)` của Axios trả về một Promise. Việc kết nối MongoDB ở `backend/src/server.js` qua `connectDB()` cũng trả về một Promise, thể hiện qua chuỗi `.then().catch()`.

Câu 100: Async/Await là gì?
Trả lời: Async/Await là cú pháp đường (syntactic sugar) trên Promise, giúp viết code bất đồng bộ trông giống đồng bộ. Từ khóa async đặt trước function, await đặt trước Promise để chờ kết quả. Dùng try/catch để xử lý lỗi.
**📍 Áp dụng trong UrbanStep:** Backend dùng `async/await` trong controller và service. Frontend cũng dùng `async/await` trong các context, page và các file service như `auth.service.js`, `cart.service.js`, `catalog.service.js`, `orders.service.js`, `admin.service.js`.

Câu 52: Async State Update là gì?
Trả lời: Trong React, setState (hay useState setter) không cập nhật state ngay lập tức mà được batch lại và thực thi sau khi render. Đây là cơ chế tối ưu hiệu năng của React. Dùng functional update (prev => ...) khi cần giá trị state mới nhất.
**📍 Áp dụng trong UrbanStep:** Sau khi `CartContext.jsx` tải lại giỏ hàng và gọi `setCart(data)`, React không thay đổi biến `cart` ngay trong cùng lượt thực thi. React lên lịch cập nhật state và có thể batch nhiều thay đổi trước khi re-render.

Câu 101: require và import khác nhau?
Trả lời: require là cú pháp CommonJS (Node.js cũ), chạy lúc runtime, có thể dùng trong điều kiện. import là cú pháp ES Modules (hiện đại), chạy lúc parse-time, hỗ trợ tree-shaking. Node.js hiện hỗ trợ cả hai; React/frontend thường dùng import.
require() chạy lúc Runtime (Khi ứng dụng đang chạy): Nghĩa là khi Node.js chạy đến đúng dòng code có chữ require, nó mới mò vào thư mục, đọc file và tải module đó lên bộ nhớ.
Hệ quả: Bạn có thể bỏ require vào trong hàm if/else hoặc vòng lặp thoải mái.
import chạy lúc Parse-time (Khi quét/dịch code, trước khi chạy): Trước khi ứng dụng của bạn kịp chạy dòng code đầu tiên, bộ biên dịch của JavaScript đã quét qua toàn bộ file để tìm tất cả các lệnh import và liên kết (link) chúng lại với nhau trước.
Hệ quả: Bạn không thể bỏ import vào trong câu lệnh if/else. Tất cả các lệnh import bắt buộc phải nằm "chễm chệ" ở ngay đầu file.
Cơ chế Tree-shaking (Rung cây rụng lá chết)
Với require: Khi bạn require một thư viện, Node.js sẽ bê nguyên một cục file đó vào dự án, cho dù bạn chỉ dùng đúng 1 hàm nhỏ trong đó.
Với import: Vì hệ thống đã biết trước bạn cần những gì từ lúc quét code (Parse-time), các công cụ build code (như Webpack, Vite) có thể thực hiện Tree-shaking. Nó sẽ tự động "rung cây" để loại bỏ những đoạn code thừa mà bạn không dùng tới ra khỏi file đóng gói cuối cùng, giúp dung lượng dự án nhẹ đi rất nhiều (cực kỳ quan trọng ở Frontend).
**📍 Áp dụng trong UrbanStep:**
- **require:** Dùng ở toàn bộ Backend (ví dụ `const express = require('express')` trong `app.js`).
- **import:** Dùng ở toàn bộ Frontend (ví dụ `import { useState } from 'react'` trong `App.jsx` và Vite sẽ tự động xử lý Tree-shaking khi build ra Production).

Câu 102: package.json dùng để làm gì?
Trả lời: package.json là file cấu hình dự án Node.js, chứa: tên/version dự án, danh sách dependencies (runtime) và devDependencies (chỉ dùng khi dev), scripts (lệnh npm run), engine yêu cầu. Đây là file bắt buộc của mọi dự án Node.
**📍 Áp dụng trong UrbanStep:** Dự án có 3 file `package.json`: file ở root chứa script chạy chung, file `backend/package.json` chứa `express`, `mongoose`, và file `frontend/package.json` chứa `react`, `tailwindcss`, `axios`.

Câu 111: Vì sao Node.js phù hợp realtime?
Trả lời: Node.js phù hợp realtime vì: Event-driven architecture phản hồi sự kiện ngay lập tức, non-blocking I/O xử lý nhiều kết nối đồng thời, tích hợp tốt với WebSocket/Socket.IO, dùng chung JavaScript với frontend giúp chia sẻ logic dễ dàng.
**📍 Áp dụng trong UrbanStep:** Dù hiện tại UrbanStep chưa có chức năng realtime (như chat trực tuyến hay thông báo live), nhưng nếu sau này bạn muốn thêm tính năng "Hiển thị có người vừa mua sản phẩm này", Node.js đã sẵn sàng nền tảng để tích hợp Socket.IO một cách nhẹ nhàng.


NHÓM 2: ExpressJS & Backend
Câu 1: ExpressJS là gì?
Trả lời: ExpressJS là web framework nhẹ và linh hoạt cho Node.js. Nó cung cấp các công cụ để xây dựng web server, REST API với routing, middleware, xử lý request/response dễ dàng. ExpressJS là lựa chọn phổ biến nhất cho backend Node.js.
**📍 Áp dụng trong UrbanStep:** Framework cốt lõi của thư mục `backend/`. Tại `app.js`, bạn dùng `const app = express()` để khởi tạo và quản lý toàn bộ server, routing và middleware.

Câu 2: Middleware trong ExpressJS là gì?
Trả lời: Middleware là hàm có quyền truy cập vào req, res, và next() trong chu trình xử lý request. Middleware thực hiện: xử lý authentication, logging, parse body, xử lý lỗi... Các middleware chạy tuần tự theo thứ tự đăng ký với app.use().
**📍 Áp dụng trong UrbanStep:** File `backend/src/middlewares/auth.js` chứa ba middleware: `requireAuth`, `requireMember`, `requireAdmin`. `requireAuth` kiểm tra Bearer token, còn hai middleware role kiểm tra người dùng là member hay admin trước khi gọi `next()` để đi tiếp vào controller.

Câu 3: Sự khác nhau giữa app.use() và app.get()?
Trả lời: app.use() đăng ký middleware hoặc router cho mọi HTTP method, thường không cần path chính xác (prefix match). app.get() chỉ xử lý HTTP GET request với path chính xác. app.use() thường dùng cho middleware, app.get/post/put/delete dùng cho các route cụ thể.
**📍 Áp dụng trong UrbanStep:** Ở `app.js`, lệnh `app.use('/api/auth', authRoutes)` dùng để ủy quyền xử lý mọi method vào `/api/auth` cho router con. Còn `app.get('/api/health')` chỉ phục vụ duy nhất 1 đường dẫn cụ thể bằng method GET.

Câu 103: next() trong middleware là gì?
Trả lời: next() là hàm callback gọi middleware tiếp theo trong chuỗi. Nếu không gọi next(), request sẽ bị treo (không có response). Gọi next(error) để chuyển lỗi sang error-handling middleware (4 tham số: err, req, res, next).
**📍 Áp dụng trong UrbanStep:** Ở cuối `backend/src/app.js`, các đường dẫn không bắt đầu bằng `/api` được phục vụ bằng `res.sendFile(..., next)`. Nếu gửi file `index.html` thất bại, Express gọi `next(error)` để chuyển lỗi xuống middleware xử lý lỗi. Ngoài ra, `express-async-errors` giúp lỗi phát sinh trong các hàm async được chuyển tới middleware lỗi cuối file.

Câu 104: Express Router là gì?
Trả lời: Express Router là mini-app giúp tổ chức route theo module. Dùng express.Router() tạo router riêng cho từng feature (userRouter, productRouter...), sau đó mount vào app chính với app.use('/users', userRouter). Giúp code dễ bảo trì hơn.
**📍 Áp dụng trong UrbanStep:** Thư mục `backend/src/routes/` tách router theo nhóm chức năng như `auth.routes.js`, `catalog.routes.js`, `cart.routes.js`, `order.routes.js`, `admin.routes.js`. Nhờ `express.Router()`, `app.js` chỉ cần mount các router thay vì khai báo toàn bộ endpoint trong một file.

Câu 105: body-parser là gì?
body-parser thực chất là một "Anh thông dịch viên" (một hàm Middleware) trong ExpressJS. Nhiệm vụ duy nhất của anh ta là: Đứng chặn ở cửa Server, nhặt lấy gói dữ liệu thô do Frontend gửi lên, dịch nó thành một Object JavaScript, rồi đặt vào biến req.body để bạn sử dụng.
**📍 Áp dụng trong UrbanStep:** Trong `backend/src/app.js`, dòng lệnh `app.use(express.json())` chính là body-parser được tích hợp sẵn, giúp server Node đọc được dữ liệu JSON từ frontend (như email/mật khẩu) để bạn trích xuất từ `req.body`.

Câu 108: Xử lý lỗi Express như thế nào?
Trả lời: Express có error-handling middleware đặc biệt với 4 tham số (err, req, res, next). Đặt cuối cùng sau tất cả route. Dùng next(err) để chuyển lỗi tới đó. Nên phân loại lỗi (validation, auth, server error) và trả về status code phù hợp.
**📍 Áp dụng trong UrbanStep:** Dự án đã cài `express-async-errors` và có error-handling middleware cuối `app.js`: `app.use((error, req, res, next) => { ... })`. Các lỗi được chuyển đến đây sẽ được ghi log và trả về JSON với status code phù hợp, thay vì để request kết thúc không kiểm soát.

Câu 109: Multer dùng để làm gì?
Trả lời: Multer là middleware xử lý multipart/form-data, dùng để upload file. Cấu hình storage (diskStorage hoặc memoryStorage), giới hạn kích thước, lọc file type. Dùng upload.single('file') hoặc upload.array('files') làm middleware cho route.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Hiện tại sản phẩm lấy link ảnh từ internet (các chuỗi `images` trong `data/catalog.js`). Nếu bạn xây dựng tính năng cho Admin tải hình ảnh từ máy tính lên server, bạn sẽ cần tới Multer.

Câu 19: Xử lý upload file an toàn ExpressJS?
Trả lời: Các bước an toàn: (1) Dùng Multer với giới hạn kích thước (limits.fileSize), (2) Validate file type bằng mimetype và extension, (3) Đổi tên file ngẫu nhiên (UUID) tránh path traversal, (4) Lưu ngoài thư mục public, (5) Scan virus nếu cần, (6) Dùng CDN/S3 thay vì lưu local.
**📍 Áp dụng trong UrbanStep:** Tương tự câu trên. Nếu sau này áp dụng tính năng đăng ảnh sản phẩm, hãy nhớ chặn dung lượng (<5MB) và kiểm tra đuôi (`.png`, `.jpg`).

Câu 112: MVC trong Express là gì?
Trả lời: MVC (Model-View-Controller) là mô hình kiến trúc phần mềm tổ chức code: Model xử lý logic nghiệp vụ và database, View trả về response (JSON với API), Controller nhận request và điều phối giữa Model và View. Giúp code dễ test, bảo trì và scale.
**📍 Áp dụng trong UrbanStep:** Backend UrbanStep được tổ chức theo hướng phân lớp gần với MVC:
- **M (Model):** Thư mục `models/` (ví dụ `User.js`, `Product.js`) giao tiếp MongoDB.
- **V (View):** Trả về JSON cho Frontend tự xử lý hiển thị.
- **C (Controller):** Thư mục `controllers/` nhận request và trả response; một số nghiệp vụ được tách thêm sang `services/`.

Câu 23: ExpressJS có nhược điểm gì?
Trả lời: Nhược điểm: (1) Quá linh hoạt – không có cấu trúc bắt buộc nên team dễ không nhất quán, (2) Thiếu các công cụ tích hợp sẵn (không có built-in validation (bộ lọc dữ liệu), ORM (bộ kết nối cơ sở dữ liệu), auth(hệ thống phân quyền),) (3) Callback/async error handling phức tạp, (4) Cần tự setup nhiều thứ so với NestJS hay Django.
**📍 Áp dụng trong UrbanStep:** Thể hiện rõ qua việc UrbanStep phải tự xây dựng bộ khung thư mục (`models`, `routes`, `controllers`), tự viết mã hóa mật khẩu ở `services/authService.js` thay vì dùng các tính năng có sẵn như ở NestJS.

Câu 113: Monolith và Microservice khác nhau?
Trả lời: Monolith: toàn bộ app trong một codebase, deploy cùng nhau, đơn giản ban đầu nhưng khó scale. Microservice: tách thành nhiều service nhỏ độc lập, mỗi service có database riêng, scale từng phần dễ hơn nhưng phức tạp hơn về vận hành (network, distributed tracing...).
**📍 Áp dụng trong UrbanStep:** Dự án là một monolith backend kết hợp frontend tách thư mục. Toàn bộ nghiệp vụ Auth, Product, Cart, Order và Admin nằm trong cùng ứng dụng Express và dùng chung một cơ sở dữ liệu MongoDB, phù hợp với quy mô đồ án hiện tại.

Câu 110: Socket.IO dùng để làm gì?
Trả lời: Socket.IO cho phép giao tiếp hai chiều (bidirectional) real-time giữa client và server qua WebSocket (fallback về polling). Dùng để xây dựng chat, thông báo realtime, game multiplayer, dashboard cập nhật live. Hỗ trợ rooms và namespaces để tổ chức kết nối.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Giỏ hàng và đơn hàng hiện dùng HTTP. Sau các thao tác như thêm giỏ hàng, cập nhật số lượng hoặc đổi trạng thái đơn, frontend chủ động gọi lại API để lấy dữ liệu mới; hệ thống chưa thể tự đẩy thông báo đơn hàng mới tới admin theo thời gian thực.


NHÓM 3: REST API & HTTP
Câu 4: RESTful API là gì?
Trả lời: REST (Representational State Transfer) là kiến trúc thiết kế API dựa trên HTTP. Nguyên tắc: Stateless (không lưu trạng thái làm việc của client và server), Client-Server (phân tách độc lập giữa giao diện frontend và xử lý backend), Uniform Interface là giao đồng nhất (dùng HTTP methods GET/POST/PUT/DELETE), Resource-based URL có nghĩa là dùng danh từ để đặt tên cho các url (/users/1). API tuân thủ REST gọi là RESTful API.
**📍 Áp dụng trong UrbanStep:** API UrbanStep được thiết kế chủ yếu theo hướng REST: dùng GET để đọc danh sách (`/api/products`), POST để tạo đơn hàng (`/api/orders`), PUT để cập nhật và DELETE để xóa. Một số endpoint hành động như `POST /api/orders/:orderId/cancel` vẫn là lựa chọn thực dụng cho nghiệp vụ hủy đơn.

Câu 114: API là gì?
Trả lời: API (Application Programming Interface) là giao diện cho phép hai ứng dụng giao tiếp với nhau. Trong web, API thường là các endpoint HTTP mà frontend gọi để lấy/gửi dữ liệu từ backend.
**📍 Áp dụng trong UrbanStep:** API là cầu nối giữa `frontend` React/Vite và `backend` Express. Component và Context gọi các hàm nghiệp vụ trong `frontend/src/services/*.service.js`; các hàm này dùng lớp Axios chung ở `api.js` để gửi request đến các endpoint `/api/...`.

Câu 115: REST API là gì?
Trả lời: REST API là API tuân theo kiến trúc REST: dùng HTTP methods đúng mục đích, URL mô tả resource, stateless (mỗi request độc lập), trả về JSON/XML. Ví dụ: GET /products lấy danh sách, POST /products tạo mới.
**📍 Áp dụng trong UrbanStep:** Tương tự câu 4. UrbanStep trả về JSON và có tính Stateless (chạy qua JWT token thay vì session server-side).

Câu 116: HTTP Methods gồm những gì?
Trả lời: Các HTTP method phổ biến: GET (lấy dữ liệu), POST (tạo mới), PUT (cập nhật toàn bộ), PATCH (cập nhật một phần), DELETE (xóa). Ngoài ra có HEAD, OPTIONS (dùng trong CORS preflight), CONNECT, TRACE.
**📍 Áp dụng trong UrbanStep:** `backend/src/routes/` đang sử dụng GET để lấy dữ liệu, POST để đăng nhập/tạo dữ liệu, PUT để cập nhật giỏ hàng, sản phẩm và trạng thái đơn, DELETE để xóa item giỏ hàng hoặc sản phẩm.

Câu 117: Khác nhau giữa PUT và PATCH?
Trả lời: PUT thay thế toàn bộ resource bằng dữ liệu mới (nếu thiếu field thì field đó bị xóa/null). PATCH cập nhật một phần resource, chỉ thay đổi các field được gửi lên. Trong thực tế, PATCH phổ biến hơn khi chỉ cần update một số field.
**📍 Áp dụng trong UrbanStep:** API admin hiện dùng `PUT /api/admin/products/:id` để cập nhật sản phẩm. Controller dùng `findOneAndUpdate({ ...req.body })`, nên trên thực tế endpoint này vẫn chấp nhận dữ liệu cập nhật một phần. Nếu muốn tuân thủ ngữ nghĩa HTTP chặt hơn, cập nhật một vài field nên đổi sang PATCH.

Câu 118: HTTP Status Code thường dùng?
Trả lời: 200 OK, 201 Created (Tạo mới dữ liệu thành công), 204 No Content (thành công nhưng không trả về dữ liệu trong body);

Lỗi phía client: 400 Bad Request (Dữ liệu gửi lên sai cú pháp), 401 Unauthorized(Chưa xác thực/Sai thông tin đăng nhập), 403 Forbidden (Đã đăng nhập nhưng không có quyền truy cập), 404 Not Found (Không tìm thấy tài nguyên), 422 Unprocessable Entity (Dữ liệu đúng cú pháp nhưng sai logic nghiệp vụ/Validation thất bại).;

Lỗi phía server: 500 Internal Server Error (lỗi hệ thống lỗi/lỗi code server), 503 Service Unavailable (Server bị quá tải hoặc đang bảo trì). Dùng đúng status code giúp client xử lý response chính xác.
**📍 Áp dụng trong UrbanStep:**
- `frontend/src/services/api.js` bắt lỗi Axios: nếu `error.response?.status === 401`, token không hợp lệ hoặc thông tin đăng nhập sai; token cục bộ bị xóa và ứng dụng chuyển về `#/login`.
- Trả về 404 trong `app.js` nếu API không tồn tại.
- Trả về 500 nếu `app.use((error...))` đón được lỗi database.

Câu 119: JSON là gì?
Trả lời: JSON (JavaScript Object Notation) là định dạng văn bản nhẹ để trao đổi dữ liệu. Hỗ trợ 6 kiểu dữ liệu cơ bản string, number, boolean, null, array, object. Là định dạng chuẩn của REST API. Ta dùng hàm JSON.stringify() để chuyển Object thành chuỗi JSON (Serialize) và JSON.parse() để dịch ngược chuỗi JSON thành Object (Deserialize).
**📍 Áp dụng trong UrbanStep:** Giao tiếp giữa React và Express dùng JSON: frontend gửi body JSON, backend đọc từ `req.body` và trả dữ liệu bằng `res.json()`. `package.json` là file JSON, còn `catalog.js` là module JavaScript chứa các object và array có cấu trúc gần giống JSON.

Câu 120: Endpoint là gì?
Trả lời: Endpoint là URL cụ thể của API mà client gọi tới, kết hợp method + path. Ví dụ: GET /api/users là một endpoint, POST /api/users là endpoint khác. Mỗi endpoint đại diện cho một hành động cụ thể trên một resource.
**📍 Áp dụng trong UrbanStep:** `GET /api/health` được khai báo trực tiếp trong `app.js`, còn các endpoint như `POST /api/auth/login`, `GET /api/products`, `POST /api/orders` được khai báo trong các file `routes/`.

Câu 121: Request và Response khác nhau?
Trả lời: Request: thông điệp client gửi tới server, gồm method, URL, headers, body (với POST/PUT). Response: thông điệp server gửi lại, gồm status code, headers, body (data JSON). Chu trình HTTP là request-response.
**📍 Áp dụng trong UrbanStep:** `apiClient.request(...)` trong `frontend/src/services/api.js` gửi request chứa method, URL, body và token. Axios tự parse JSON response, sau đó hàm `api()` trả về `response.data` cho các service nghiệp vụ.

Câu 122: Header trong API là gì?
Trả lời: Header là metadata đính kèm request/response, dạng key-value. Phổ biến: Authorization (chứa JWT Token để xác thực), Content-Type (khai báo định dạng dữ liệu, ví dụ: application/json), Accept (định dạng dữ liệu mong muốn nhận về), CORS Headers (như Access-Control-Allow-Origin để quản lý bảo mật tên miền), và Cache-Control (quản lý lưu trữ bộ nhớ đệm). Header không hiển thị trong URL nên an toàn hơn query params.
**📍 Áp dụng trong UrbanStep:** Axios client trong `services/api.js` đặt mặc định header `"Content-Type": "application/json"`. Request interceptor chỉ đính kèm `"Authorization": "Bearer <token>"` khi `localStorage` đang có token.

Câu 126: API versioning là gì?
Trả lời: API versioning là cách duy trì nhiều phiên bản API song song khi có các thay đổi lớn làm gãy hỏng code cũ breaking changes. Các cách: URL versioning (/api/v1/, /api/v2/), Header versioning (API-Version: 2), Query param (?version=2). URL versioning phổ biến và dễ debug nhất.
**📍 Áp dụng trong UrbanStep:** Hiện tại dự án đang cấu hình chung tiền tố là `/api`. Nếu có thêm ứng dụng cho IOS hay App Store, bạn có thể thiết lập `/api/v1/` để sau này làm phiên bản mới không làm hỏng app cũ.

Câu 127: Idempotent API là gì?
Trả lời: Idempotent nghĩa là gọi nhiều lần cho cùng kết quả như gọi một lần. GET, PUT, DELETE là idempotent. POST không phải (mỗi lần tạo một bản ghi mới). Quan trọng khi xử lý cơ chế tự động gửi lại yêu cầu retry logic – client có thể retry an toàn mà không lo duplicate data.
**📍 Áp dụng trong UrbanStep:** Gọi `GET /api/products` nhiều lần không làm thay đổi dữ liệu sản phẩm. `POST /api/orders` không idempotent vì mỗi request hợp lệ có thể tạo một đơn hàng mới; backend hiện chưa dùng idempotency key để chống tạo đơn trùng do retry.

Câu 128: Stateless API là gì?
Trả lời: Stateless: server không lưu trạng thái của client giữa các request. Mỗi request phải tự mang đủ thông tin (token, session ID). Giúp scale dễ hơn (bất kỳ server nào cũng xử lý được request). JWT là ví dụ điển hình cho stateless auth.
**📍 Áp dụng trong UrbanStep:** Phần xác thực của UrbanStep là stateless: backend không lưu session đăng nhập trên server, nên mỗi request cần gửi Bearer token để middleware xác định user và role. Dữ liệu nghiệp vụ như giỏ hàng và đơn hàng vẫn được lưu lâu dài trong MongoDB.

Câu 129: WebSocket khác REST API thế nào?
Trả lời: REST API hoạt động theo mô hình Yêu cầu - Phản hồi (Request-Response) một chiều, trong đó Client phải luôn là bên chủ động gửi yêu cầu trước thì Server mới trả dữ liệu về; hệ thống có tính chất không trạng thái (Stateless), cực kỳ phù hợp cho các tác vụ CRUD (Thêm, Sửa, Xóa, Đọc) thông thường. WebSocket: kết nối persistent hai chiều, server có thể push data về client bất kỳ lúc nào, phù hợp realtime (chat, game, notifications). WebSocket tốn tài nguyên hơn nhưng latency (độ trễ) thấp hơn.
**📍 Áp dụng trong UrbanStep:** UrbanStep dùng REST API cho các tác vụ CRUD như xem sản phẩm, cập nhật giỏ hàng và tạo đơn. WebSocket chưa cần thiết cho các luồng này; chỉ nên bổ sung khi có yêu cầu realtime như thông báo đơn mới hoặc cập nhật trạng thái giao hàng trực tiếp.

Câu 130: GraphQL là gì?
Trả lời: GraphQL là ngôn ngữ truy vấn cho API, thay thế REST. Client chỉ định chính xác dữ liệu cần lấy (tránh over-fetching(lấy thừa dữ liệu)/under-fetching(lấy thiếu dữ liệu)). Một endpoint duy nhất (/graphql). Phù hợp khi frontend cần dữ liệu linh hoạt. Phức tạp hơn REST để setup và cache.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Dự án này tuân theo REST API truyền thống. Đưa GraphQL vào sẽ khá dư thừa cho một trang e-commerce nhỏ gọn.

Câu 17: Axios khác fetch thế nào?
Trả lời: Axios: là một thư viện của bên thứ ba, tự động parse JSON, interceptors (xử lý request/response tập trung), timeout, cancel request, hỗ trợ Node.js. fetch: built-in browser, cần tự parse JSON (.json()), không có interceptors mặc định, không timeout sẵn. Axios tiện hơn cho project lớn.
**📍 Áp dụng trong UrbanStep:** Dự án đã cài Axios. File `frontend/src/services/api.js` tạo một Axios client dùng chung, request interceptor tự gắn Bearer token, và phần `catch` xử lý lỗi `401` tập trung. Các endpoint cụ thể được tách thành `auth.service.js`, `catalog.service.js`, `cart.service.js`, `orders.service.js`, `admin.service.js`.

Câu 7: CORS là gì?
Trả lời: CORS (Cross-Origin Resource Sharing) là cơ chế bảo mật của browser, ngăn JavaScript gọi API từ origin khác. Server cần gửi header Access-Control-Allow-Origin để cho phép. Dùng package 'cors' trong Express: app.use(cors({ origin: 'https://frontend.com' })).
**📍 Áp dụng trong UrbanStep:** Backend hiện chưa cài package `cors`. Khi phát triển, Vite proxy chuyển `/api` từ frontend sang `http://localhost:3000`, nên trình duyệt vẫn gọi cùng origin của frontend. Backend cũng có thể phục vụ `frontend/dist` cùng origin qua `express.static`. Nếu deploy frontend và backend ở hai domain khác nhau, cần cấu hình CORS hoặc reverse proxy phù hợp.


NHÓM 4: Bảo mật & Authentication
Câu 5: JWT là gì?
Trả lời: JWT (JSON Web Token) là chuẩn mở để truyền thông tin an toàn dưới dạng JSON được ký (signed). Gồm 3 phần: Header (chứa loại token và thuật toán mã hóa), Payload (chứa dữ liệu thực tế của người dùng), và Signature (chữ ký số dùng để chống giả mạo). Dùng để xác thực người dùng sau khi login mà không cần lưu session trên server.
**📍 Áp dụng trong UrbanStep:** `backend/src/services/authService.js` tự tạo token theo cấu trúc JWT bằng module `crypto`, không dùng thư viện JWT bên ngoài. Payload gồm `sub`, `email`, `role`, `iat`, `exp`; chữ ký HMAC SHA-256 được dùng để chống sửa nội dung token.

Câu 6: Nên lưu JWT ở đâu?
Trả lời: Tốt nhất: HttpOnly Cookie – an toàn nhất, không thể truy cập bằng JavaScript (chống XSS). Tránh: localStorage (dễ bị XSS đánh cắp). Nếu dùng cookie cần chống CSRF bằng SameSite=Strict hoặc CSRF token. Memory (biến JS) cũng an toàn nhưng mất khi refresh.
**📍 Áp dụng trong UrbanStep:** Token được lưu trong `localStorage` với key `urbanstep_token` tại `frontend/src/services/api.js`. Cách này đơn giản cho đồ án, nhưng production nên cân nhắc HttpOnly Cookie để giảm rủi ro token bị lấy qua XSS.

Câu 25: Refresh Token là gì?
Trả lời: Refresh Token là token dài hạn (ngày/tuần) dùng để lấy Access Token mới khi hết hạn, tránh bắt user login lại. Access Token ngắn hạn (15 phút), Refresh Token lưu an toàn hơn (HttpOnly cookie hoặc DB). Khi logout, xóa/blacklist Refresh Token.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng Refresh Token.** Token hiện có thời hạn 8 giờ qua `TOKEN_TTL_SECONDS`; sau thời điểm `exp`, `verifyToken()` từ chối token và người dùng phải đăng nhập lại.

Câu 124: Access Token và Refresh Token khác nhau?
Trả lời: Access Token: thời hạn ngắn (15-60 phút), đính kèm mọi API request, stateless. Refresh Token: thời hạn dài (7-30 ngày), chỉ dùng để xin Access Token mới, nên lưu DB để có thể revoke. Khi Access Token hết hạn, dùng Refresh Token xin cái mới.
**📍 Áp dụng trong UrbanStep:** Bạn chỉ đang sử dụng 1 loại Token (như Access Token) với thời gian sống trung bình.

Câu 123: Flow login JWT hoạt động sao?
Trả lời: 1. User gửi username/password. 2. Server verify, tạo Access Token + Refresh Token. 3. Client lưu token. 4. Mọi request gửi kèm Access Token trong header Authorization: Bearer <token>. 5. Server verify token, xử lý request. 6. Khi token hết hạn, dùng Refresh Token lấy token mới.
**📍 Áp dụng trong UrbanStep:**
1. `Login.jsx` gọi hàm `login()` trong `auth.service.js` để POST email và mật khẩu.
2. `authService.login()` check DB, tạo JWT.
3. Hàm `setToken()` trong `api.js` lưu nó xuống localStorage.
4. Request interceptor trong `api.js` tự gắn token vào header `Authorization` cho các request tiếp theo.

Câu 18: Authentication flow React + Express?
Trả lời: 1. React gửi POST /login với credentials. 2. Express verify, trả JWT. 3. React lưu JWT (cookie/memory). 4. Mọi API call React gửi kèm JWT. 5. Express middleware xác minh JWT trước khi xử lý. 6. React dùng Context/Redux lưu trạng thái đăng nhập.
**📍 Áp dụng trong UrbanStep:** Sau khi đăng nhập, `AuthContext.jsx` lưu user vào state để cập nhật giao diện và điều hướng theo role. Ở backend, các route `/api/cart`, `/api/orders` dùng `requireAuth` + `requireMember`, còn `/api/admin` dùng `requireAuth` + `requireAdmin`.

Câu 20: SQL Injection và XSS là gì?
Trả lời: SQL Injection: chèn SQL độc hại vào input để thao túng database. Phòng: dùng parameterized query/ORM, không nối string SQL trực tiếp. XSS (Cross-Site Scripting): chèn script độc hại vào trang web để chạy trong trình duyệt nạn nhân. Phòng: escape output, Content-Security-Policy, HttpOnly cookie.
**📍 Áp dụng trong UrbanStep:**
- **Injection:** Dự án dùng Mongoose thay vì nối chuỗi câu lệnh SQL. Tuy nhiên vẫn cần validate kiểu dữ liệu đầu vào để tránh NoSQL injection trong các chức năng mở rộng.
- **XSS:** Cơ chế React tự động Encode chuỗi (ví dụ in `{product.name}`) giúp phòng ngừa việc chèn mã JS độc hại khi Admin gõ chữ tào lao vào Form Thêm Sản Phẩm.

Câu 106: bcrypt dùng để làm gì?
Trả lời: bcrypt là thuật toán hash mật khẩu an toàn. Hash không thể đảo ngược, có salt tự động (chống rainbow table), có work factor điều chỉnh được (chậm hơn = an toàn hơn). Dùng bcrypt.hash() để hash, bcrypt.compare() để kiểm tra. Không bao giờ lưu mật khẩu raw.
**📍 Áp dụng trong UrbanStep:** Dự án không cài `bcrypt`. `backend/src/services/authService.js` dùng `crypto.scryptSync` cùng salt ngẫu nhiên để băm mật khẩu, và dùng `timingSafeEqual` khi so sánh kết quả.

Câu 107: Hash và Encrypt khác nhau?
Trả lời: Hash: một chiều, không thể giải mã, dùng để lưu mật khẩu (bcrypt, SHA-256). Encrypt: hai chiều, có thể giải mã bằng key, dùng để bảo vệ dữ liệu cần đọc lại (AES, RSA). Mật khẩu phải dùng hash, không dùng encrypt.
**📍 Áp dụng trong UrbanStep:** Mật khẩu được lưu theo định dạng `scrypt$<salt>$<hash>`, không lưu chuỗi `"123456"` gốc. Người có quyền đọc MongoDB không thể giải mã trực tiếp hash để lấy lại mật khẩu ban đầu.

Câu 29: Khác nhau giữa Authentication và Authorization?
Trả lời: Authentication (Xác thực): xác minh 'bạn là ai?' – kiểm tra username/password, JWT. Authorization (Phân quyền): xác định 'bạn được làm gì?' – kiểm tra role/permission sau khi đã xác thực. Auth trước, authz sau. Ví dụ: login = authn, admin panel = authz.
**📍 Áp dụng trong UrbanStep:**
- **Authentication:** Người dùng gửi email/mật khẩu qua form Login, backend kiểm tra và trả token.
- **Authorization:** Frontend chỉ render giao diện admin khi `user.role === "admin"`, nhưng lớp bảo vệ quan trọng nhất là `requireAdmin` ở backend vì client-side routing có thể bị sửa bởi người dùng.

Câu 89: Redis và JWT liên quan gì?
Trả lời: Redis dùng để blacklist JWT khi logout (lưu token đã revoke vào Redis với TTL = thời gian hết hạn token). Vì JWT stateless nên không thể invalidate bình thường – Redis giải quyết vấn đề này. Cũng dùng lưu Refresh Token để kiểm tra và revoke.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng blacklist token.** Khi đăng xuất, frontend chỉ xóa token khỏi `localStorage`; backend không lưu trạng thái logout. Nếu một token đã bị sao chép trước đó, token vẫn có thể hợp lệ đến khi hết hạn. Redis có thể được dùng để lưu blacklist nếu dự án cần thu hồi token sớm.


NHÓM 5: ReactJS Core
Câu 9: ReactJS là gì?
Trả lời: ReactJS là thư viện JavaScript của Meta để xây dựng giao diện người dùng (UI). Dùng component-based architecture, Virtual DOM để tối ưu re-render, JSX để viết HTML trong JS. React chỉ xử lý View – cần kết hợp với thư viện khác cho routing (React Router), state (Redux)...
**📍 Áp dụng trong UrbanStep:** Toàn bộ thư mục `frontend/src/` được viết bằng ReactJS (thông qua Vite). Mọi thứ đều được chẻ thành Component tái sử dụng: `<Header />`, `<ProductCard />`, `<Loading />`.

Câu 10: Virtual DOM là gì?
Trả lời: Virtual DOM là bản sao nhẹ của DOM thật, được lưu trong bộ nhớ. Khi state thay đổi, React tạo Virtual DOM mới, so sánh (diffing) với cái cũ, chỉ cập nhật phần thật sự thay đổi vào DOM thật (reconciliation). Giúp giảm thao tác DOM đắt tiền.
**📍 Áp dụng trong UrbanStep:** Khi click Lọc "Giày chạy bộ" ở `Filters.jsx`, thay vì Load lại (F5) toàn bộ website chớp chớp nháy nháy, React so sánh Virtual DOM và chỉ vẽ lại đúng cái khu vực chứa danh sách giày, giữ nguyên thanh Header!

Câu 30: Vì sao chọn React thay Angular/Vue?
Trả lời: React: linh hoạt nhất (chỉ là UI library), ecosystem lớn nhất, JSX tự nhiên với JS, học một lần dùng được React Native. Angular: framework đầy đủ, phù hợp enterprise. Vue: học dễ hơn, template-based. Chọn React khi cần linh hoạt và cộng đồng lớn.
**📍 Áp dụng trong UrbanStep:** Frontend tận dụng tính linh hoạt của React: routing được tự triển khai bằng `window.location.hash` trong `App.jsx`, còn giao diện được xây dựng bằng Tailwind CSS và các component tái sử dụng.

Câu 21: SSR và CSR khác nhau?
Trả lời: CSR (Client-Side Rendering): server gửi HTML rỗng, JavaScript render trên browser – tốt cho SPA, nhưng SEO kém và thời gian tải đầu chậm. SSR (Server-Side Rendering): server render HTML đầy đủ rồi gửi – SEO tốt, tải nhanh lần đầu, phù hợp Next.js.
**📍 Áp dụng trong UrbanStep:** Frontend Vite hoạt động theo **CSR (Client-Side Rendering)**. `index.html` chủ yếu chứa `<div id="root"></div>`, còn React tải dữ liệu sản phẩm qua API và render trong trình duyệt. Nếu cần SEO mạnh hơn, có thể cân nhắc SSR hoặc framework như Next.js.

Câu 22: Vì sao React re-render?
Trả lời: React re-render khi: (1) State thay đổi (setState), (2) Props thay đổi, (3) Parent component re-render, (4) Context thay đổi, (5) forceUpdate(). Re-render không có nghĩa là DOM thay đổi – React dùng Virtual DOM để chỉ cập nhật những gì cần thiết.
**📍 Áp dụng trong UrbanStep:** Khi `getProducts()` gọi endpoint `GET /api/products` hoàn tất, `Home.jsx` gọi `setProducts(data.items)`. State `products` thay đổi nên trang chủ re-render danh sách sản phẩm mới.

Câu 47: Re-render xảy ra khi nào?
Trả lời: Tương tự câu 22. Thêm: re-render xảy ra theo mặc định khi parent render lại dù props không đổi. Dùng React.memo, useMemo, useCallback để tối ưu và ngăn re-render không cần thiết.
**📍 Áp dụng trong UrbanStep:** Tương tự câu 22.

Câu 12: useEffect dùng để làm gì?
Trả lời: useEffect dùng để thực hiện side effects trong function component: fetch API, subscribe events, update DOM, set timer. Chạy sau mỗi render theo mặc định. Dependency array điều khiển khi nào effect chạy: [] chỉ chạy một lần (mount), [dep] chạy khi dep thay đổi.
**📍 Áp dụng trong UrbanStep:** Được sử dụng rất nhiều!
- F5 trang -> `useEffect` ở `AuthContext` chạy để kiểm tra có token không.
- Mở `App.jsx` -> `useEffect` đăng ký sự kiện `hashchange` để theo dõi URL.
- Mở `Home.jsx` -> `useEffect` chạy khi `user` có giá trị để gọi các service lấy dữ liệu trang chủ và sản phẩm.

Câu 13: Controlled Component là gì?
Trả lời: Controlled Component là form element (input, select...) mà value được kiểm soát hoàn toàn bởi React state. Mọi thay đổi đi qua onChange handler để cập nhật state. Ngược lại là Uncontrolled Component (dùng ref để lấy giá trị trực tiếp từ DOM).
**📍 Áp dụng trong UrbanStep:** Tại `Login.jsx` hoặc màn hình Admin nhập Sản phẩm, các thẻ `<input value={email} onChange={e => setEmail(e.target.value)} />` chính là Controlled Component do React kiểm soát chặt chẽ giá trị đó 100%.

Câu 37: Controlled Component là gì? (lặp lại)
Trả lời: Xem câu 13. Controlled Component đảm bảo React là 'single source of truth' cho form data, giúp validate dễ dàng, đồng bộ UI với state. Uncontrolled Component phù hợp khi tích hợp với non-React code hoặc cần performance cao.
**📍 Áp dụng trong UrbanStep:** Tương tự câu 13.

Câu 16: React Router là gì?
Trả lời: React Router là thư viện routing phổ biến nhất cho React, cho phép điều hướng giữa các trang mà không reload trang (SPA). Dùng <BrowserRouter>, <Routes>, <Route> để khai báo routes, <Link> để điều hướng, useNavigate() và useParams() để xử lý logic routing.
**📍 Áp dụng trong UrbanStep:** **Không áp dụng React Router.** `App.jsx` tự theo dõi `window.location.hash` và render page tương ứng, ví dụ `#/login`, `#/cart`, `#/product/:slug`, `#/admin/products`. Cách này đủ cho đồ án nhỏ nhưng sẽ khó mở rộng hơn React Router khi route phức tạp.

Câu 57: Hydration trong React là gì?
Trả lời: Hydration là quá trình React 'kích hoạt' HTML tĩnh đã được server render (SSR) bằng cách attach event listeners và state. Browser nhận HTML đã render sẵn → hiển thị ngay → React hydrate để làm interactive. Dùng trong Next.js, Remix.
**📍 Áp dụng trong UrbanStep:** **Không áp dụng.** Hydration chỉ tồn tại ở các Framework SSR như Next.js. Dự án Vite hiện tại là CSR.


NHÓM 6: State Management (React)
Câu 11: State và Props khác nhau thế nào?
Trả lời: State: dữ liệu nội bộ của component, có thể thay đổi qua setState/useState, component tự quản lý. Props: dữ liệu được truyền từ parent xuống child, read-only (không được mutate), thay đổi khi parent thay đổi.
**📍 Áp dụng trong UrbanStep:**
- State: Bộ lọc đang áp dụng được lưu trong state `filters` của `Home.jsx`; giá trị người dùng đang nhập tạm thời được giữ trong state của `Filters.jsx`.
- Props: `Home.jsx` truyền object sản phẩm xuống `ProductCard` qua prop `product`, ví dụ `<ProductCard product={product} />`.

Câu 31: State trong React là gì?
Trả lời: State là dữ liệu động bên trong component, khi thay đổi sẽ trigger re-render. Quản lý bằng useState (function component) hoặc this.setState (class component). State là 'bộ nhớ' của component.
**📍 Áp dụng trong UrbanStep:** Dữ liệu giỏ hàng được lưu trong state `cart` của `CartContext.jsx`. Khi API cập nhật số lượng hoàn tất, context gọi lại `getCart()` rồi `setCart(data)`, làm `Cart.jsx` và số lượng trên `Header.jsx` cùng re-render.

Câu 32: Khác nhau giữa State và Props?
Trả lời: Tương tự câu 11. Nguyên tắc: Props xuống, Event lên (data flows down, actions flow up). State dùng cho dữ liệu thay đổi nội bộ. Props dùng để chia sẻ dữ liệu từ cha sang con.
**📍 Áp dụng trong UrbanStep:** `ProductCard.jsx` chỉ đọc prop `product` để hiển thị tên, giá, ảnh và tồn kho; component không mutate object sản phẩm được truyền từ `Home.jsx`.

Câu 33: useState hoạt động như thế nào?
Trả lời: useState trả về [value, setter]. Khi setter được gọi, React lên kế hoạch re-render component với giá trị mới. State update là bất đồng bộ (batched). Dùng functional form (prev => prev + 1) khi cần giá trị state hiện tại.
**📍 Áp dụng trong UrbanStep:** `App.jsx` khởi tạo state `route` từ `window.location.hash`. Khi hash URL thay đổi, event listener `hashchange` gọi `setRoute(...)`, khiến ứng dụng render trang tương ứng.

Câu 34: Vì sao setState bất đồng bộ?
Trả lời: React batch nhiều setState lại và re-render một lần để tối ưu hiệu năng. Do đó ngay sau setState, state chưa cập nhật. Dùng useEffect hoặc functional update để xử lý dựa trên state mới nhất.
**📍 Áp dụng trong UrbanStep:** Trong `CartContext.jsx`, sau khi `fetchCart()` gọi `setCart(data)`, nếu đọc biến `cart` ngay trong cùng lượt thực thi thì vẫn có thể nhận giá trị cũ, vì React lên lịch cập nhật state và batch việc re-render.

Câu 35: Cách update state dựa trên state cũ?
Trả lời: Dùng functional update: setState(prev => prev + 1) thay vì setState(count + 1). Điều này đảm bảo luôn dùng giá trị state mới nhất, đặc biệt quan trọng khi update nhiều lần liên tiếp hoặc trong async callback.
**📍 Áp dụng trong UrbanStep:** Dự án có dùng functional update ở các state cần dựa trên giá trị cũ, ví dụ `setPagination(prev => ({ ...prev, isLoading: true }))` trong `Home.jsx`. Riêng giỏ hàng hiện được làm mới bằng cách gọi lại API rồi gán toàn bộ dữ liệu mới qua `setCart(data)`.

Câu 36: Lifting State Up là gì?
Trả lời: Khi hai component cần chia sẻ state, nâng state lên component cha chung gần nhất. Component cha quản lý state và truyền xuống qua props. Đây là pattern cơ bản của React trước khi dùng Context hay Redux.
**📍 Áp dụng trong UrbanStep:** Biểu tượng giỏ hàng trong `Header.jsx` và danh sách mặt hàng trong `Cart.jsx` cùng cần dữ liệu giỏ. Vì vậy state được đặt trong `CartProvider`, là component cha chung bao quanh ứng dụng, rồi chia sẻ qua Context API.

Câu 38: useReducer dùng khi nào?
Trả lời: useReducer phù hợp khi: state phức tạp (nhiều sub-value liên quan), logic update phụ thuộc vào action type, cần test logic riêng. Cú pháp: const [state, dispatch] = useReducer(reducer, initialState). Dispatch action → reducer tính state mới.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** `CartContext` đang dùng `useState` và gọi backend để xử lý dữ liệu giỏ hàng. Nếu frontend có nhiều trạng thái giỏ hàng phức tạp hơn như voucher, lựa chọn hàng, optimistic update hoặc nhiều action liên quan, `useReducer` có thể giúp tập trung logic cập nhật.

Câu 39: useState và useReducer khác nhau?
Trả lời: useState đơn giản cho state độc lập. useReducer tốt hơn khi state phức tạp với nhiều loại update (như Redux mini). useReducer giúp tập trung logic update vào một nơi (reducer function), dễ test hơn.
**📍 Áp dụng trong UrbanStep:** Tương tự câu 38. Dự án sử dụng `useState` thuần tuý là rất hợp lý và sạch gọn.

Câu 40: Context API là gì?
Trả lời: Context API cho phép truyền dữ liệu qua nhiều tầng component mà không cần props drilling. Tạo context với createContext(), cung cấp qua Provider, tiêu thụ qua useContext(). Phù hợp cho theme, language, user info – không phù hợp cho state thay đổi thường xuyên (gây re-render toàn cây).
**📍 Áp dụng trong UrbanStep:** Dự án có hai context chính: `AuthContext.jsx` lưu thông tin người dùng đăng nhập và `CartContext.jsx` lưu dữ liệu giỏ hàng. `App.jsx` bọc `AuthProvider` và `CartProvider`, nên component có thể dùng `useAuth()` hoặc `useCart()` mà không cần truyền props qua nhiều tầng.

Câu 41: Props Drilling là gì?
Trả lời: Props Drilling là việc truyền props qua nhiều tầng component trung gian không dùng đến nó. Vấn đề: code dài dòng, khó bảo trì. Giải pháp: Context API, Redux, Zustand hoặc component composition.
**📍 Áp dụng trong UrbanStep:** Nếu không có `AuthContext`, `App` sẽ phải truyền `user` qua nhiều component trung gian như layout và page. Context giúp các component cần thông tin đăng nhập truy cập trực tiếp qua `useAuth()`.

Câu 42: Redux là gì?
Trả lời: Redux là thư viện quản lý state tập trung (single store). Nguyên tắc: state immutable, thay đổi qua actions, reducer xử lý transition. Luồng: dispatch(action) → reducer → new state → re-render. Phù hợp cho app lớn với nhiều state chia sẻ.
**📍 Áp dụng trong UrbanStep:** **Không áp dụng Redux.** Với quy mô hiện tại, `useState` và Context API đã đáp ứng nhu cầu chia sẻ user và giỏ hàng. Redux chỉ nên được thêm khi state và luồng cập nhật trở nên phức tạp hơn.

Câu 14: Redux dùng để làm gì?
Trả lời: Redux dùng để quản lý global state trong app React: giỏ hàng, user info, notifications, UI state phức tạp. Giúp predictable state management, dễ debug (Redux DevTools), tách biệt business logic khỏi UI component.
**📍 Áp dụng trong UrbanStep:** Như câu 42, dự án này không cần dùng.

Câu 43: Redux Toolkit là gì?
Trả lời: Redux Toolkit (RTK) là cách hiện đại để viết Redux, giảm boilerplate đáng kể. Cung cấp: createSlice (tạo action + reducer cùng lúc), createAsyncThunk (async action), configureStore (setup store đơn giản), RTK Query (data fetching). Đây là cách được khuyến nghị hiện nay.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 44: Global State và Local State khác nhau?
Trả lời: Local State: state chỉ dùng trong một component (useState), không cần chia sẻ. Global State: state dùng ở nhiều nơi trong app (user, cart, theme) – quản lý bằng Context, Redux, Zustand. Nguyên tắc: ưu tiên local state, chỉ nâng lên global khi thực sự cần.
**📍 Áp dụng trong UrbanStep:**
- `isFilterOpen` trong `Home.jsx` là **Local State** vì chỉ trang Home dùng để mở/đóng bộ lọc trên mobile.
- `user` trong `AuthContext` và `cart` trong `CartContext` là **Global State** vì nhiều component như Header, Cart, Checkout và các trang admin cùng sử dụng.

Câu 45: Khi nào không nên dùng Redux?
Trả lời: Không nên dùng Redux khi: app nhỏ, state đơn giản, không cần chia sẻ nhiều, team chưa quen. Redux thêm complexity và boilerplate. Thay thế: useState + Context cho app vừa, Zustand cho app cần global state nhẹ, React Query cho server state.
**📍 Áp dụng trong UrbanStep:** UrbanStep chính là một Case điển hình cho câu trả lời này: Sử dụng linh hoạt `useState + Context` cho App E-commerce tầm trung.

Câu 46: Zustand là gì?
Trả lời: Zustand là thư viện state management nhỏ gọn (1KB), API đơn giản hơn Redux. Tạo store bằng create(), truy cập bằng hook. Không cần Provider, không boilerplate. Phù hợp khi cần global state nhưng Redux quá phức tạp. Hỗ trợ persist, immer, devtools.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 48: React.memo dùng để làm gì?
Trả lời: React.memo là Higher-Order Component giúp memoize kết quả render của component. Nếu props không thay đổi, component sẽ không re-render khi parent render lại. Dùng khi component render nặng và props ít thay đổi. Kết hợp với useCallback cho các function props.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** `AdminOrders.jsx` hiện render trực tiếp các dòng đơn hàng và chưa tách `OrderRow` hoặc dùng `React.memo`. Đây là hướng tối ưu nếu danh sách đơn hàng lớn và việc re-render trở nên tốn kém.

Câu 15: Khác nhau giữa useMemo và useCallback?
Trả lời: useMemo memoize kết quả tính toán (giá trị): const value = useMemo(() => compute(a,b), [a,b]). useCallback memoize function reference: const fn = useCallback(() => {...}, [deps]). Cả hai chỉ tính lại khi dependencies thay đổi.
**📍 Áp dụng trong UrbanStep:** Dự án chưa dùng `useMemo`. Tổng tiền giỏ hàng được backend tính và trả về trong `cart.subtotal`. Dự án có dùng `useCallback` cho `fetchCart` trong `CartContext.jsx` và `loadProducts` trong `Home.jsx` để giữ ổn định tham chiếu hàm theo dependency.

Câu 49: useMemo và useCallback khác gì?
Trả lời: Tương tự câu 15. useMemo trả về giá trị, useCallback trả về function. Dùng useMemo cho computations nặng, useCallback khi truyền callback xuống child component được bọc bởi React.memo (tránh re-render do function reference thay đổi).
**📍 Áp dụng trong UrbanStep:** `useCallback` đang được dùng cho các hàm gọi API cần xuất hiện trong dependency array. `useMemo` chưa được dùng vì hiện chưa có phép tính frontend đủ nặng để cần memoize.

Câu 50: Immutable State là gì?
Trả lời: Immutable State nghĩa là không được mutate (thay đổi trực tiếp) state, mà phải tạo bản sao mới. Ví dụ: setState([...arr, newItem]) thay vì arr.push(newItem). React dựa vào reference comparison để detect thay đổi – mutate trực tiếp sẽ không trigger re-render.
**📍 Áp dụng trong UrbanStep:** `CartContext` không sửa trực tiếp `cart.items`. Sau mỗi thao tác thêm, sửa hoặc xóa, frontend gọi lại API và dùng `setCart(data)` với một object mới. Các state object khác như `pagination` cũng được cập nhật bằng cú pháp spread thay vì mutate trực tiếp.

Câu 51: Vì sao React cần immutable?
Trả lời: React so sánh state cũ và mới bằng reference (===). Nếu mutate trực tiếp, reference không đổi → React không biết state đã thay đổi → không re-render. Immutability cũng giúp time-travel debugging (Redux DevTools) và pure function reducers.
**📍 Áp dụng trong UrbanStep:** Khi `setCart(data)` nhận object giỏ hàng mới từ API, reference state thay đổi nên React cập nhật các component đang dùng context, bao gồm số lượng giỏ hàng trên `Header.jsx`.

Câu 53: Redux Middleware là gì?
Trả lời: Redux Middleware là layer nằm giữa dispatch và reducer, cho phép intercept actions để xử lý side effects (async, logging, analytics). Middleware nhận store API, next, action. Ví dụ: redux-thunk, redux-saga, redux-logger.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 54: Redux Thunk dùng để làm gì?
Trả lời: Redux Thunk là middleware cho phép dispatch function thay vì action object thuần. Function nhận dispatch và getState, dùng để thực hiện async operations (fetch API) rồi dispatch action kết quả. Đơn giản, phù hợp cho async basic. RTK đã tích hợp sẵn.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 55: Redux Saga khác Thunk thế nào?
Trả lời: Thunk: đơn giản, dispatch function, dùng async/await. Saga: mạnh hơn, dùng generator functions và effects (call, put, take, fork). Saga tốt hơn cho: complex async flows, cancel effects, race conditions, retry logic. Nhưng học khó hơn Thunk nhiều.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 56: Persist State là gì?
Trả lời: Persist State là lưu state vào storage (localStorage, sessionStorage, AsyncStorage) để giữ lại khi refresh trang. Dùng redux-persist với Redux, hoặc zustand persist middleware. Cần cẩn thận với sensitive data (không persist JWT vào localStorage).
**📍 Áp dụng trong UrbanStep:** Giỏ hàng không được persist trong `localStorage`. Dự án chỉ cho member đã đăng nhập dùng giỏ hàng, và dữ liệu được lưu trong MongoDB qua model `Cart`. Khi refresh trang, `CartContext` gọi `GET /api/cart` để tải lại giỏ hàng. `localStorage` hiện chỉ dùng để lưu token đăng nhập.

Câu 58: RTK Query là gì?
Trả lời: RTK Query là công cụ data fetching và caching tích hợp trong Redux Toolkit. Tự động handle: loading/error states, caching, invalidation, refetching. Tạo API slice bằng createApi, tự generate hooks (useGetUsersQuery...). Giảm code boilerplate đáng kể so với thunk thủ công.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 59: So sánh Redux và Context API?
Trả lời: Context API: built-in React, phù hợp state ít thay đổi (theme, user), không có middleware, mọi consumer re-render khi context thay đổi. Redux: external library, hiệu năng tốt hơn (selective subscription), middleware, DevTools, phù hợp state phức tạp thay đổi thường xuyên.
**📍 Áp dụng trong UrbanStep:** Context API phù hợp với UrbanStep vì state `user` và `cart` cần được chia sẻ ở nhiều nơi nhưng tần suất thay đổi chưa quá cao. Token không nằm trong Context mà được lưu trong `localStorage`.

Câu 60: Bạn sẽ chọn state management nào cho project?
Trả lời: Server state: React Query/RTK Query. Local UI state: useState. Shared complex state: Redux Toolkit. Light global state: Zustand. Form state: React Hook Form. Nguyên tắc: dùng công cụ đơn giản nhất đủ giải quyết vấn đề. Không over-engineer.
**📍 Áp dụng trong UrbanStep:** Dự án này chính là minh chứng cho nguyên tắc: Không phức tạp hóa (Không over-engineer). Bạn đã tận dụng tuyệt vời `useState` và `Context API`.

Câu 131: Các cách quản lý state trong React
Trả lời: 1. useState: state cục bộ đơn giản. 2. useReducer: state phức tạp cục bộ. 3. Context API: share state tầng vừa. 4. Redux/RTK: global state lớn, phức tạp. 5. Zustand: global state nhẹ. 6. React Query/SWR: server/async state. 7. Jotai/Recoil: atomic state.
**📍 Áp dụng trong UrbanStep:** Bạn đã nắm vững số (1) và (3).

Câu 132: Vì sao React Query không thay Redux hoàn toàn?
Trả lời: React Query chuyên quản lý server state (cache API responses). Redux quản lý client state (UI state, user preferences, multi-step form data). Hai loại state khác nhau. Thực tế nhiều project dùng cả hai: React Query cho server data + Zustand/Redux cho client state.
**📍 Áp dụng trong UrbanStep:** Không sử dụng.

Câu 26: Bạn tối ưu React app như thế nào?
Trả lời: Kỹ thuật tối ưu: React.memo tránh re-render, useMemo/useCallback cho computations/callbacks nặng, lazy loading component (React.lazy + Suspense), code splitting, virtualize long lists (react-window), tối ưu images, giảm bundle size, profile bằng React DevTools Profiler.
**📍 Áp dụng trong UrbanStep:**
- Hiện tại: Vite build và minify bundle frontend; hình ảnh sản phẩm dùng `loading="lazy"` ở nhiều card.
- Chưa áp dụng: `React.lazy`, route-based code splitting, `React.memo` và virtualization. Build hiện vẫn cảnh báo bundle JavaScript lớn hơn 500 kB, nên tách phần admin thành chunk riêng là hướng tối ưu hợp lý.


NHÓM 7: Redis & Caching
Câu 61: Redis là gì?
Trả lời: Redis (Remote Dictionary Server) là in-memory data store, lưu dữ liệu trong RAM nên cực nhanh. Hỗ trợ nhiều cấu trúc dữ liệu (String, Hash, List, Set, Sorted Set). Dùng cho caching, session, queue, pub/sub, rate limiting, leaderboard.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** (Áp dụng chung cho từ Câu 61 tới 92 vì dự án chưa triển khai).

Câu 62: Redis khác MySQL/MongoDB thế nào?
Trả lời: Redis: in-memory (RAM), cực nhanh, dữ liệu đơn giản, thường dùng làm cache tầng trên. MySQL: relational, disk-based, ACID, phù hợp dữ liệu có quan hệ. MongoDB: document-based, disk, schema flexible. Redis bổ trợ chứ không thay thế MySQL/MongoDB.
**📍 Áp dụng trong UrbanStep:** UrbanStep hiện dùng MongoDB làm cơ sở dữ liệu chính và chưa cài Redis. Nếu bổ sung Redis sau này, Redis nên đóng vai trò cache hoặc lưu dữ liệu tạm thời; không nên thay thế MongoDB cho sản phẩm, đơn hàng và người dùng.

Câu 63: Vì sao Redis nhanh?
Trả lời: Redis nhanh vì: (1) Lưu trong RAM (memory access << disk access), (2) Single-threaded event loop (không lock), (3) Cấu trúc dữ liệu tối ưu, (4) Giao thức RESP đơn giản, (5) Non-blocking I/O. Đạt hàng triệu operations/giây.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Hiện mọi API sản phẩm vẫn truy vấn MongoDB qua Mongoose, chưa có lớp cache in-memory.

Câu 64: Redis thường dùng để làm gì?
Trả lời: Caching (tăng tốc API), Session storage, Rate limiting, Job queue, Pub/Sub (realtime messaging), Leaderboard (Sorted Set), Distributed lock, Geospatial queries. Redis là Swiss Army knife của backend.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Một hướng phát triển phù hợp là cache kết quả các API đọc nhiều như `/api/products/top`, `/api/categories` hoặc `/api/promotions`, vì các dữ liệu này không thay đổi liên tục.

Câu 65: Cache là gì?
Trả lời: Cache là lớp lưu trữ tạm thời, lưu kết quả của các tính toán/query đắt tiền để phục vụ lại nhanh hơn. Khi request đến: kiểm tra cache trước (cache hit), nếu không có (cache miss) thì query DB và lưu vào cache. Đánh đổi: tốc độ vs. độ tươi của data.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Hiện `productService.js` luôn truy vấn MongoDB. Nếu thêm cache-aside, request đầu tiên có thể lấy dữ liệu từ MongoDB và lưu Redis trong một TTL ngắn; các request sau có thể đọc cache để giảm số lần truy vấn database.

Câu 66: TTL trong Redis là gì?
Trả lời: TTL (Time To Live) là thời gian sống của key trong Redis. Sau TTL, key tự động bị xóa. Dùng EXPIRE key seconds hoặc SET key value EX seconds. TTL giúp cache tự làm mới, tránh stale data và tránh memory đầy. Xem TTL hiện tại bằng TTL key.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng Redis TTL.** Token của UrbanStep có trường `exp` với thời hạn 8 giờ và được kiểm tra trong `verifyToken()`, không phụ thuộc Redis. Nếu sau này cache top sản phẩm bằng Redis, có thể đặt TTL vài phút để dữ liệu tự làm mới.

Câu 67: Redis Data Types gồm gì?
Trả lời: String: text, number, binary. Hash: map key-value (user object). List: ordered linked list (queue/stack). Set: unordered unique values. Sorted Set: set có điểm số (leaderboard). Bitmap, HyperLogLog (đếm unique), Stream (event log), Geospatial.

Câu 68: String trong Redis dùng khi nào?
Trả lời: String dùng để: lưu cache đơn giản (JSON stringify), counter (INCR/DECR), session token, feature flags, distributed lock (SET NX EX). Là type cơ bản nhất, linh hoạt nhất. Một String value tối đa 512MB.

Câu 69: Hash trong Redis dùng khi nào?
Trả lời: Hash dùng khi lưu object có nhiều fields mà cần truy cập từng field riêng lẻ (không muốn serialize/deserialize toàn bộ). Ví dụ: user profile (HGET user:1 email), shopping cart (HSET cart:userId productId quantity). Tiết kiệm memory hơn nhiều String.

Câu 70: Redis Pub/Sub là gì?
Trả lời: Pub/Sub là pattern messaging: Publisher gửi message vào channel, Subscriber nhận message từ channel. Redis triển khai qua PUBLISH/SUBSCRIBE commands. Dùng cho: realtime notifications, chat, event broadcasting. Lưu ý: message không persist – nếu subscriber offline thì mất.

Câu 71: Redis Queue là gì?
Trả lời: Redis List dùng làm queue: LPUSH thêm vào đầu, RPOP lấy từ cuối (FIFO). BRPOP là blocking pop – worker chờ khi queue rỗng. Dùng cho: job queue (email sending, image processing), task scheduling. Thư viện Bull/BullMQ đóng gói Redis queue cho Node.js.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Dự án hiện chưa gửi email hóa đơn và chưa có worker hoặc Redis Queue. Nếu bổ sung email sau khi đặt hàng, có thể đưa tác vụ gửi mail vào BullMQ/Redis Queue để API tạo đơn không phải chờ tác vụ bên ngoài.

Câu 72: Session trong Redis là gì?
Trả lời: Lưu session trên Redis thay vì memory/file: nhanh hơn, scale được (nhiều server share session), tự expire qua TTL. Trong Express dùng express-session + connect-redis. Session ID lưu trong cookie client, data lưu trong Redis với key session:{id}.

Câu 73: Redis Persistence là gì?
Trả lời: Redis có 2 cơ chế persistence: RDB (snapshot định kỳ ra file .rdb – nhanh, nhỏ, nhưng mất data giữa các snapshot) và AOF (ghi log mọi write command – an toàn hơn nhưng file lớn hơn). Có thể dùng cả hai. Hoặc không persistence nếu chỉ làm cache thuần túy.

Câu 74: Redis có nhược điểm gì?
Trả lời: Nhược điểm: (1) Dữ liệu phải vừa RAM (đắt hơn disk), (2) Không phù hợp lưu trữ dài hạn/phức tạp, (3) Single-threaded (bottleneck với CPU-intensive ops), (4) Cluster phức tạp để setup, (5) Không có JOIN/transaction phức tạp như SQL.

Câu 75: Rate Limiting bằng Redis?
Trả lời: Dùng INCR + EXPIRE: mỗi request tăng counter, đặt TTL cho window (1 phút). Nếu counter vượt limit thì từ chối request. Sliding window dùng Sorted Set (ZADD timestamp, ZCOUNT trong khoảng). Thư viện: rate-limiter-flexible. Redis đảm bảo atomic operations.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng.** Endpoint `POST /api/auth/login` hiện chưa có rate limiting. Nếu triển khai production, nên thêm rate limit theo IP hoặc tài khoản; Redis phù hợp khi cần chia sẻ bộ đếm giữa nhiều instance backend.

Câu 76: Cache Aside Pattern là gì?
Trả lời: Cache Aside (Lazy Loading): ứng dụng tự kiểm tra cache. Nếu cache hit: trả về. Nếu miss: query DB, lưu vào cache, trả về. App chịu trách nhiệm populate cache. Đây là pattern phổ biến nhất. Nhược điểm: cache miss đầu tiên chậm, cold start.

Câu 77: Cache Invalidation là gì?
Trả lời: Cache Invalidation là quá trình xóa/cập nhật cache khi data gốc thay đổi, đảm bảo không trả về stale data. Cách: TTL tự expire, event-driven invalidation (xóa cache khi update DB), write-through (update cache cùng lúc update DB). Được gọi là 'vấn đề khó nhất trong CS'.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng cache nên chưa có cache invalidation.** Nếu sau này cache danh sách hoặc chi tiết sản phẩm, các API admin tạo, sửa, xóa sản phẩm phải xóa hoặc cập nhật key cache liên quan để khách hàng không nhận giá hay tồn kho cũ.

Câu 78: Redis Cluster là gì?
Trả lời: Redis Cluster là mode phân tán dữ liệu ra nhiều node (sharding tự động). Dữ liệu chia thành 16384 slots, mỗi node chịu trách nhiệm một số slots. Tự động failover khi node chết. Cho phép scale horizontal khi data vượt quá RAM một node.

Câu 79: Redis Sentinel là gì?
Trả lời: Redis Sentinel là hệ thống HA (High Availability) cho Redis single-instance: monitor master/replica, tự động failover (promote replica thành master khi master chết), thông báo. Khác Cluster: Sentinel không sharding, chỉ HA. Cần ít nhất 3 Sentinel để bầu chọn.

Câu 80: Khi nào không nên dùng Redis?
Trả lời: Không nên dùng Redis khi: dữ liệu quá lớn cho RAM, cần query phức tạp (JOIN, full-text search), cần ACID transactions phức tạp, app đơn giản không cần cache, budget hạn chế (Redis Cloud đắt). Đừng dùng Redis thay thế primary database.
**📍 Áp dụng trong UrbanStep:** UrbanStep hiện tại chưa đủ lớn để bắt buộc phải dùng Redis, nên việc bạn chưa áp dụng là một nước đi kinh tế và giảm độ phức tạp cho người code.

Câu 81: React frontend dùng Redis trực tiếp không?
Trả lời: Không. Frontend không bao giờ kết nối trực tiếp Redis (bảo mật, Redis không có auth layer như HTTP). Frontend giao tiếp với Express API, Express mới tương tác với Redis. Redis là implementation detail của backend.

Câu 82: Redis thường kết hợp React để làm gì?
Trả lời: Cache API responses (React fetch nhanh hơn), session/auth storage, realtime data qua Socket.IO (Redis Pub/Sub làm message broker giữa server instances), rate limiting API calls từ React app, shopping cart temporary storage.

Câu 83: React login với Redis session hoạt động sao?
Trả lời: 1. React POST /login → Express verify credentials. 2. Express tạo session, lưu vào Redis (session:{id}: {userId, role}). 3. Express gửi session cookie về React. 4. React tự động gửi cookie theo mỗi request. 5. Express middleware đọc session từ Redis để xác thực.

Câu 84: Redis giúp React app nhanh hơn thế nào?
Trả lời: Express cache kết quả query DB vào Redis. React fetch API → Express check Redis trước → nếu hit trả về ngay (< 1ms) thay vì query DB (10-100ms). Đặc biệt hiệu quả cho: danh sách sản phẩm, dashboard analytics, content ít thay đổi.

Câu 85: React realtime chat dùng Redis như thế nào?
Trả lời: React → Socket.IO → Server. Khi nhiều server instances: Server A nhận message → publish vào Redis channel → Redis broadcast → Server B nhận → emit cho client kết nối tới B. Redis Pub/Sub làm message broker giữa các server instances. Lưu history vào MongoDB.

Câu 86: Redis với Socket.IO dùng để làm gì?
Trả lời: Socket.IO dùng Redis Adapter (socket.io-adapter/redis) để sync events giữa nhiều server instances. Khi scale horizontally, một client kết nối server A, client khác kết nối server B – Redis đảm bảo message từ A đến được client của B. Không cần sticky sessions.

Câu 87: Vì sao cache API cho React app?
Trả lời: Lợi ích caching: giảm latency (RAM vs DB), giảm load database, tiết kiệm cost (ít DB query hơn), handle traffic spike (cache absorb load). React users trải nghiệm app nhanh hơn. Đặc biệt quan trọng cho public APIs nhiều người dùng cùng lúc.

Câu 88: Ví dụ cache Express API bằng Redis
Trả lời: Middleware pattern: kiểm tra Redis trước mỗi route. router.get('/products', async (req, res) => { const cached = await redis.get('products'); if (cached) return res.json(JSON.parse(cached)); const data = await DB.find(); await redis.setEx('products', 300, JSON.stringify(data)); res.json(data); });

Câu 90: Làm sao tránh cache stampede?
Trả lời: Cache stampede xảy ra khi nhiều request đồng thời miss cache và đổ vào DB. Giải pháp: (1) Mutex/distributed lock (chỉ 1 request rebuild cache), (2) Probabilistic early expiration (stale-while-revalidate), (3) Promise coalescing trong code, (4) Pre-warming cache trước khi expire.

Câu 91: Cache warming là gì?
Trả lời: Cache warming là pre-populate cache trước khi có request thực, tránh cold start (cache miss hàng loạt khi deploy mới hoặc cache expire). Chạy script sau deploy để load data phổ biến vào Redis. Quan trọng cho app có traffic lớn.

Câu 92: Làm sao scale Redis?
Trả lời: Các cách scale Redis: (1) Vertical: tăng RAM server. (2) Redis Cluster: sharding dữ liệu ra nhiều node. (3) Read replicas: replica phục vụ read, master phục vụ write. (4) Redis Sentinel: HA không sharding. (5) Redis Cloud/ElastiCache: managed service tự scale.

Câu 24: MongoDB khác MySQL?
Trả lời: MySQL: relational (bảng, hàng), schema cố định, SQL, ACID, JOIN mạnh, phù hợp data có quan hệ rõ ràng. MongoDB: document (JSON), schema linh hoạt, tốt cho nested data, scale horizontal dễ hơn, không JOIN native. Chọn theo đặc điểm data của project.
**📍 Áp dụng trong UrbanStep:** UrbanStep dùng MongoDB qua Mongoose. Model `Product` lưu trực tiếp các mảng như `images`, `sizes`, `colors`, `tags`, `specs` trong một document. Với MySQL, có thể lưu JSON hoặc chuẩn hóa thành các bảng liên quan tùy yêu cầu truy vấn.


NHÓM 8: Deploy & DevOps
Câu 27: Bạn deploy React + Express như thế nào?
Trả lời: React: build ra static files (npm run build) → deploy lên Vercel/Netlify/S3+CloudFront. Express: deploy lên Railway/Render/EC2/VPS, dùng PM2 để quản lý process, Nginx làm reverse proxy. Hoặc Docker hóa cả hai và deploy lên container platform.
**📍 Áp dụng trong UrbanStep:** Dự án có `docker-compose.yml` để chạy MongoDB, backend và frontend. Tuy nhiên trước khi deploy production cần bổ sung cấu hình reverse proxy `/api` cho Nginx frontend hoặc cấu hình CORS, chuẩn bị biến môi trường an toàn, seed dữ liệu ban đầu và cấu hình lưu trữ/backup MongoDB.

Câu 28: PM2 là gì?
Trả lời: PM2 là process manager cho Node.js: tự restart khi crash, cluster mode (multi-core), log management, monitoring, startup script (tự chạy khi server reboot). Lệnh: pm2 start app.js, pm2 restart, pm2 logs, pm2 status. Thiết yếu cho production Node.js.
**📍 Áp dụng trong UrbanStep:** **Chưa áp dụng PM2.** Backend hiện được chạy bằng Node trực tiếp hoặc container Docker. Nếu triển khai backend trực tiếp trên VPS không dùng container, PM2 là một lựa chọn để quản lý tiến trình và tự khởi động lại khi lỗi.

Câu 135: Tổng quan các cách deploy
Trả lời: 1. VPS (Linode, DigitalOcean): full control, phức tạp hơn. 2. PaaS (Railway, Render, Heroku): push code, tự deploy, dễ dùng. 3. Vercel/Netlify: tuyệt vời cho frontend (auto deploy từ Git). 4. Docker + container platform (ECS, Cloud Run): portable, nhất quán. 5. Kubernetes: scale lớn, phức tạp.
**📍 Áp dụng trong UrbanStep:** Dự án đang được chuẩn bị theo hướng container hóa bằng Dockerfile cho frontend/backend và Docker Compose cho môi trường nhiều service. Đây là nền tảng tốt, nhưng chưa phải cấu hình production hoàn chỉnh.

Câu 136: Docker giúp gì?
Trả lời: Docker đóng gói app và dependencies vào container, chạy nhất quán ở mọi môi trường ('works on my machine' problem solved). Dockerfile định nghĩa image, docker-compose chạy multi-container (app + DB + Redis). Giúp CI/CD nhất quán, deploy dễ hơn, cách chịu môi trường.
**📍 Áp dụng trong UrbanStep:** `backend/Dockerfile` và `frontend/Dockerfile` đều dùng image Node 20 trong giai đoạn cài đặt/build, giúp môi trường chạy nhất quán hơn giữa các máy. Frontend sau khi build được phục vụ bằng Nginx, còn backend chạy bằng `node src/server.js`.

Câu 137: Vì sao tách frontend/backend?
Trả lời: Lợi ích tách: (1) Scale độc lập – frontend trên CDN, backend scale theo load. (2) Team độc lập – frontend/backend dev làm việc song song. (3) Flexible – đổi tech stack một bên không ảnh hưởng bên kia. (4) Security – backend không expose trực tiếp. (5) Reuse API cho mobile app.
**📍 Áp dụng trong UrbanStep:** `frontend/` dùng React/Vite và `backend/` dùng Express riêng biệt, giao tiếp qua REST API. Nếu có ứng dụng mobile sau này, mobile có thể tái sử dụng các endpoint backend hiện có thay vì truy cập MongoDB trực tiếp.

Câu 133: Có bao nhiêu cách phổ biến lưu giỏ hàng?
Trả lời: 1. localStorage (client-side, đơn giản, mất khi clear). 2. Database (user đăng nhập, persist). 3. Redis (nhanh, TTL tự expire, phù hợp session shopping). 4. Kết hợp: localStorage cho guest, sync lên DB khi login. Chọn tùy yêu cầu persist và auth.
**📍 Áp dụng trong UrbanStep:** UrbanStep hiện chỉ hỗ trợ giỏ hàng cho member đã đăng nhập. `CartContext` giữ dữ liệu giỏ hàng trong state để hiển thị, còn dữ liệu lâu dài được lưu trong MongoDB qua model `backend/src/models/Cart.js`. Dự án chưa hỗ trợ giỏ hàng guest và không lưu giỏ hàng trong `localStorage`.

Câu 134: Khi nào nên và không nên dùng Redis cho giỏ hàng?
Trả lời: Nên dùng Redis: giỏ hàng guest (TTL tự clear), cần tốc độ cao, cart phức tạp cần atomic updates. Không nên: cần persist lâu dài (Redis có thể mất data), cần query phức tạp (thống kê mua hàng), budget hạn chế. Kết hợp tốt nhất: Redis cache + DB lưu trữ lâu dài.
**📍 Áp dụng trong UrbanStep:** UrbanStep hiện lưu giỏ hàng member trong MongoDB và chưa dùng Redis. Nếu sau này hỗ trợ giỏ hàng guest cần tự hết hạn, Redis với TTL có thể là một lựa chọn; còn đơn hàng và giỏ hàng cần lưu lâu dài vẫn nên được ghi vào database chính.
