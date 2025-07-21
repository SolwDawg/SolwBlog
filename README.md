# SolwBlog

<div align="center">
  <img src="public/logo.svg" alt="SolwBlog Logo" width="120" height="120">
  
  *Một nền tảng blog hiện đại được xây dựng với Laravel, Inertia.js, React và TypeScript*
</div>

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Demo](#-demo)
- [Yêu cầu hệ thống](#-yêu cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [API Documentation](#-api-documentation)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

## ✨ Tính năng

### 🎯 Tính năng chính
- **Quản lý bài viết** với editor WYSIWYG (CKEditor)
- **Hệ thống danh mục** phân loại bài viết
- **Bình luận** tương tác trên bài viết
- **Xác thực người dùng** đầy đủ (đăng ký, đăng nhập, quên mật khẩu)
- **Giao diện admin** quản lý nội dung
- **Responsive design** hoạt động trên mọi thiết bị
- **Portfolio layout** hiển thị bài viết dạng showcase

## 🎮 Demo

```bash
# Xem demo nhanh
php artisan serve
npm run dev

# Truy cập:
# Frontend: http://localhost:8000
# Admin: http://localhost:8000/admin
```
## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/your-username/SolwBlog.git
cd SolwBlog
```

### 2. Cài đặt dependencies

```bash
# PHP dependencies
composer install

# JavaScript dependencies
npm install
```

### 3. Cấu hình môi trường

```bash
# Copy file env
cp .env.example .env

# Generate application key
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
# Tạo bảng database
php artisan migrate

# Seed dữ liệu mẫu (16 categories, 51 posts, 239 comments)
php artisan db:seed
```

### 6. Build assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 7. Khởi động server

```bash
# Laravel development server
php artisan serve

# Vite development server (terminal khác)
npm run dev
```


## 🛠 Công nghệ sử dụng

### Backend
- **Laravel 11** - PHP Framework
- **Inertia.js** - SPA without API
- **Laravel Breeze** - Authentication
- **MySQL** - Database

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Radix UI** - UI Components
- **CKEditor 5** - Rich Text Editor
- **Lucide React** - Icons

### Development Tools
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **Pest** - Testing Framework

## 📁 Cấu trúc dự án

```
SolwBlog/
├── app/
│   ├── Http/Controllers/     # Controllers
│   ├── Models/              # Eloquent Models
│   ├── Middleware/          # Custom Middleware
│   └── Providers/           # Service Providers
├── database/
│   ├── factories/           # Model Factories
│   ├── migrations/          # Database Migrations
│   └── seeders/            # Database Seeders
├── resources/
│   ├── js/                 # React Components
│   │   ├── components/     # Reusable Components
│   │   ├── layouts/        # Page Layouts
│   │   ├── pages/          # Page Components
│   │   └── types/          # TypeScript Types
│   ├── css/                # Stylesheets
│   └── views/              # Blade Templates
├── routes/
│   ├── web.php             # Web Routes
│   ├── auth.php            # Auth Routes
│   └── settings.php        # Settings Routes
├── public/                 # Static Assets
├── tests/                  # Test Files
└── storage/                # File Storage
```

## 📞 Liên hệ

- **Email**: sondang24.sh@gmail.com
- **GitHub**: [@your-username](https://github.com/your-username)
- **Website**: [https://solwblog.com](https://solwblog.com)

## 📄 Giấy phép

Dự án này được phân phối dưới giấy phép [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 SolwBlog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  
  **⭐ Nếu project này hữu ích, hãy star cho chúng tôi! ⭐**
  
  Made with ❤️ by [Your Name](https://github.com/your-username)
  
</div>
