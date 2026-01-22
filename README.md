# 🌌 Dotfiles (Arch Linux + Agentic Edition)

Sistem manajemen dotfiles yang modern, efisien, dan dirancang khusus untuk kolaborasi antara manusia dan AI Agent. Menggunakan pola *Stow-based mirroring* untuk sinkronisasi tanpa hambatan.

## 🚀 Fitur Utama

- **Mirroring Otomatis**: Menggunakan GNU Stow untuk melakukan *symlink* folder `home/` ke `$HOME`.
- **Arch Native**: Integrasi manifest paket untuk `pacman` dan `yay` (AUR).
- **Agent-Ready**: Dilengkapi dengan `AGENTS.md` untuk memberikan konteks standar kualitas kepada AI.
- **Dual VCS**: Menggunakan Git sebagai backend dan Jujutsu (`jj`) untuk manajemen revisi yang lebih aman (undo/redo).
- **Custom CLI**: Script `dot` sederhana untuk mengorkestrasi seluruh workflow.

## 📂 Struktur Folder

```text
~/dotfiles/
├── home/           # Replika dari $HOME (stowed to ~)
│   └── .config/    # Config Hyprland, Kitty, Waybar, Nvim, dll.
├── packages/       # Manifest paket terinstall (pacman & yay)
├── backups/        # Backup otomatis saat migrasi
├── dot             # Orchestrator CLI
├── AGENTS.md       # Instruksi untuk AI Assistant
└── README.md       # Dokumentasi ini
```

## 🛠️ Penggunaan CLI `dot`

Gunakan script `./dot` untuk mengelola sistem Anda:

- **`./dot sync`**: Sinkronisasi config dari repo ke sistem (mengadopsi file baru secara otomatis).
- **`./dot pkg-save`**: Backup daftar aplikasi Arch/AUR Anda ke folder `packages/`.
- **`./dot doctor`**: Jalankan pemeriksaan kesehatan sistem dotfiles.

## 🤖 Kerja Bareng AI (Agentic Workflow)

Repo ini dirancang agar AI Agent (seperti Antigravity/Opencode) bisa bekerja maksimal:
1. **Context Awareness**: File `AGENTS.md` memberitahu AI tentang standar *strict types* dan *surgical changes*.
2. **Safety First**: Dengan `jj`, setiap perubahan yang dilakukan AI bisa di-undo dengan perintah `jj undo` jika terjadi kesalahan.

## 📜 Instalasi di Mesin Baru

1. Clone repo: `git clone <repo-url> ~/dotfiles`
2. Jalankan sync: `~/dotfiles/dot sync`
3. Install paket (optional): `yay -S $(cat packages/yay.txt)`

---
*Created with ❤️ by Antigravity AI Assistant.*
