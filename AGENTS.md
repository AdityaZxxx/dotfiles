# 🤖 Antigravity Global Rules (Dotfiles Context)

Dokumen ini memberikan panduan bagi AI Assistant saat bekerja di dalam lingkungan dotfiles ini.

## 🎯 Filosofi Kerja
- **Gunakan Bahasa Indonesia**: Untuk diskusi dan penjelasan umum agar lebih natural.
- **Surgical Changes**: Lakukan perubahan minimal yang tepat sasaran. Jangan merombak seluruh file jika tidak diperlukan.
- **No Hardcoded Paths**: Selalu gunakan `$HOME` atau jalur relatif terhadap repo dotfiles. Jangan gunakan `/home/aditya/` secara langsung.
- **Entropy Fight**: Jaga kebersihan kode konfigurasi. Hapus komentar atau kode *deprecated* jika ditemukan.

## 🛠️ Standards & Quality
- **Conciseness**: Komunikasi harus sangat singkat dan teknis.
- **Strict Configuration**: Jika mengedit file Zsh atau Python, gunakan standar *strict typing* dan hindari *bare exceptions*.
- **VCS Priority**: Cek keberadaan folder `.jj/`. Jika ada, gunakan perintah `jj` untuk operasi VCS agar aman.

## 📦 Package Management
- Selalu update manifest paket setelah menginstal aplikasi baru menggunakan `./dot pkg-save`.
- Prioritaskan `pacman` untuk paket resmi dan `yay` untuk AUR.

## 🎨 Design Engineering (Rice)
- **Craft & Motion**: Saat menyarankan perubahan UI (Hyprland/Waybar), pertimbangkan animasi dan detail mikro.
- **Consistency**: Ikuti tema warna yang sudah ada (misal: Catppuccin atau Oxocarbon).

---
*Follow these rules strictly to maintain the integrity of this environment.*
