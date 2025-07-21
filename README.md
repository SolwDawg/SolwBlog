# SolwBlog

<div align="center">
  <img src="public/logo.svg" alt="SolwBlog Logo" width="120" height="120">
  
  *Một nền tảng blog hiện đại được xây dựng với Laravel, Inertia.js, React và TypeScript*
</div>

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Cài đặt](#-cài-đặt)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)

## ✨ Tính năng

### 🎯 Tính năng chính
- **Quản lý bài viết** với editor WYSIWYG (CKEditor)
- **Hệ thống danh mục** phân loại bài viết
- **Bình luận** tương tác trên bài viết
- **Xác thực người dùng** đầy đủ (đăng ký, đăng nhập, quên mật khẩu)
- **Giao diện admin** quản lý nội dung
- **Responsive design** hoạt động trên mọi thiết bị
- **Portfolio layout** hiển thị bài viết dạng showcase

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/your-username/SolwBlog.git
cd SolwBlog
```

### 2. Cài đặt dependencies

```bash
composer install

npm install
```

### 3. Cấu hình môi trường

```bash
cp .env.example .env

php artisan key:generate
```

### 4. Cấu hình database

Chỉnh sửa file `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=solwblog
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Chạy migrations và seeders

```bash
php artisan migrate

php artisan db:seed
```

### 6. Build assets

```bash
npm run dev

npm run build
```

### 7. Khởi động server

```bash
composer run dev
```


## 🛠 Công nghệ sử dụng

### Backend
- **Laravel 12**
- **Inertia.js**
- **Laravel Breeze**
- **MySQL**

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn ui**
- **Lucide React**


## 📞 Liên hệ

- **Email**: sondang24.sh@gmail.com
- **GitHub**: [Solw](https://github.com/SolwDawg)

```
Copyright (c) 2024 SolwBlog
```

---

<div align="center">
  
  **⭐ Nếu project này hữu ích, hãy star cho tôi! ⭐**
  
  Made with ❤️ by [Solw](https://github.com/SolwDawg)
  
</div>
