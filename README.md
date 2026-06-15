# REST API Task Management

Aplikasi REST API sederhana untuk manajemen tugas (Task Management) yang dibangun menggunakan NestJS, TypeScript, dan MySql.

## Architecture & Design Pattern
Proyek ini menggunakan **Modular Architecture** yang digabungkan dengan **Controller-Service-Repository Pattern**.

**Mengapa menggunakan pattern ini?**
1. **Separation of Concerns (Pemisahan Tugas):** - `Controller` hanya bertugas menangani *request/response* HTTP.
   - `Service` murni berisi logika bisnis aplikasi.
   - `Repository` (via TypeORM) fokus pada interaksi langsung dengan database.
2. **Scalability:** Penambahan fitur baru (misalnya modul *Profile* atau *Notification*) dapat dilakukan dengan membuat modul baru tanpa mengganggu kode yang sudah ada.
3. **Testability:** Karena logika bisnis terpisah dari *routing* dan *database*, pembuatan *Unit Test* dan *E2E Test* menjadi sangat mudah dan terisolasi. Ini terbukti dengan berjalannya E2E testing untuk autentikasi JWT pada repositori ini.

## Fitur Utama
- Relasi SQL Database (One-to-Many: User -> Task)
- Autentikasi JWT (JSON Web Token)
- Keamanan Password dengan hashing bcrypt/bcryptjs
- Validasi Input dengan class-validator
- E2E Testing terintegrasi

## Cara Menjalankan Aplikasi
1. Clone repositori ini.
2. Jalankan `pnpm install` untuk menginstal dependensi.
3. Buat database SQL (contoh: `rest_api`).
4. Sesuaikan konfigurasi database pada file `.env`.
5. Jalankan aplikasi dengan `pnpm run start:dev`.
6. Jalankan E2E testing dengan `pnpm run test:e2e`.

## API Documentation

Seluruh dokumentasi *endpoint*, parameter, beserta contoh *request* dan *response* telah disusun dengan rapi menggunakan Postman.

[🔗 [Buka Dokumentasi Postman di sini](https://documenter.getpostman.com/view/54082264/2sBXwtoomZ)]