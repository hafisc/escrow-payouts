# 🛡️ Escrowy - Platform Rekening Bersama (Escrow) Modern & Aman

Selamat datang di **Escrowy**! 👋

Escrowy adalah platform **Rekening Bersama (Rekber)** kusus untuk **Freelancer dan Klien** yang didesain untuk mencegah penipuan. Kami menggunakan teknologi canggih dengan tampilan "Gen Z" yang keren (Violet & Dark Mode) serta fitur **AI Audit** untuk memeriksa kualitas kode sebelum dana dicairkan.

---

## 🚀 Fitur Utama

1.  **Uang Aman**: Dana klien dikunci di sistem (Escrow) dan baru cair ke freelancer setelah pekerjaan selesai & disetujui.
2.  **AI Code Auditor**: Ada "Otak AI" (Python Service) yang otomatis mengecek kode freelancer (apakah aman, tidak ada virus/backdoor, dan rapi).
3.  **Milestone Tracking**: Pantau progress pekerjaan tahap demi tahap (Deposit -> Review -> Rilis).
4.  **Tampilan Keren**: Desain modern (Glassmorphism, Glow Effects) yang nyaman di mata.

---

## 🏗️ Teknologi yang Dipakai (Tech Stack)

Project ini menggunakan arsitektur **Microservices** yang terdiri dari 3 bagian utama:

| Bagian | Teknologi | Port Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Frontend** | **Next.js 15** (App Router) <br> Tailwind CSS v4 <br> Shadcn UI <br> Framer Motion | `3000` | Tampilan website yang dilihat pengguna. |
| **Backend API** | **Laravel 12** (PHP) <br> PostgreSQL / MySQL <br> Sanctum Auth | `8000` | Otak utama yang mengatur user, database, dan transaksi uang. |
| **AI Service** | **Python 3** <br> FastAPI <br> Pydantic | `8001` | Service khusus untuk scan file codingan freelancer. |

---

## 🛠️ Cara Install & Menjalankan (Localhos)

Ikuti langkah-langkah ini untuk menjalankan Escrowy di komputer kamu.

### 1. Persiapan Awal
Pastikan kamu sudah install:
*   [Node.js](https://nodejs.org/) (untuk Frontend)
*   [PHP](https://www.php.net/) & [Composer](https://getcomposer.org/) (untuk Backend)
*   [Python](https://www.python.org/) & PIP (untuk AI Service)
*   Database (MySQL atau PostgreSQL)

### 2. Setup Backend (Laravel)
Masuk ke folder `backend-api`:
```bash
cd backend-api

# Install dependency PHP
composer install

# Copy file settingan
cp .env.example .env

# Generate kunci aplikasi
php artisan key:generate

# Setting Database di file .env (DB_DATABASE, DB_USERNAME, dll)
# Lalu jalankan migrasi database:
php artisan migrate

# Jalankan Server Backend
php artisan serve
```
Backend akan jalan di: `http://localhost:8000`

### 3. Setup Frontend (Next.js)
Buka terminal baru, masuk ke folder `frontend`:
```bash
cd frontend

# Install dependency JS
npm install

# Jalankan Server Frontend
npm run dev
```
Frontend akan jalan di: `http://localhost:3000` (Buka ini di browser!)

### 4. Setup AI Service (Python)
Buka terminal baru lagi, masuk ke folder `python-service`:
```bash
cd python-service

# (Opsional) Buat virtual environment
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install library Python
pip install -r requirements.txt

# Jalankan Server AI
python src/main.py
```
AI Service akan jalan di: `http://localhost:8001`

---

## 📂 Struktur Folder
Biar nggak bingung, ini struktur foldernya:

```
d:\Project\Escrowy\
├── backend-api/       # Kodingan Laravel (API Utama)
│   ├── app/
│   ├── database/
│   └── routes/api.php
│
├── frontend/          # Kodingan Next.js (Tampilan Website)
│   ├── src/app/       # Halaman-halaman (Dashboard, Login, dll)
│   └── src/components # Komponen UI (Card, Button, Sidebar)
│
└── python-service/    # Kodingan Python (AI Scanner)
    ├── src/main.py
    └── src/scanner.py
```

---

## 🧪 Cara Pakai (Alur Kerja)

1.  **Daftar/Login**: Buka browser `localhost:3000`, daftar sebagai **Client** atau **Freelancer**.
2.  **Buat Project**: Klien membuat project baru & menentukan budget.
3.  **Deposit Dana**: Klien mentransfer uang (simulasi), status berubah jadi "In Escrow".
4.  **Upload Pekerjaan**: Freelancer upload hasil kerja (misal file .zip).
5.  **AI Scan Otomatis**: Sistem Python akan mengecek file tersebut (Cek virus/kualitas).
6.  **Rilis Dana**: Jika aman & klien puas, klien klik "Release Funds". Uang masuk ke dompet Freelancer.

---


