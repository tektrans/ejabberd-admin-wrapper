# ejabberd-admin-wrapper
![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)

Aplikasi ini hanya sebagai wrapper untuk ejabberd API.

Dibuat sebagai penunjang dari https://github.com/tektrans/irs-registration-web.
Walaupun ditujukan untuk kepentingan proyek tersebut,
akan tetapi repositori ini kami buka kepada publik.
Mungkin bisa dimanfaatkan.

Fungsi utama:
- register akun

## Instalasi
```
git clone https://github.com/tektrans/ejabberd-admin-wrapper
cd ejabberd-admin-wrapper
npm ci
```

## Yang dibutuhkan
* [NodeJS](https://nodejs.org/):
  * v18: tested
  * v20: tested
  * v24: tested
* Database [MariaDB](https://mariadb.org/).
  Tested di MariaDB 10.11.x.
  Harus MariaDB, jangan gunakan MySQL karena perintah-perintah pada pembuatan schema database menggunakan perintah spesifik MariaDB.
* Server [ejabberd](https://www.ejabberd.im/index.html) yang berjalan. Tested di ejabberd v25.4.

## Konfigurasi
Buat file ".env" yang berisi variabel-variabel environment yang sesuai. Contoh:

```env
WEBUI_LISTEN_PORT=11280
WEBUI_BASE_URL=

# List ip reverse-proxy jika ada.
# Bisa diisi dengan alamat ip atau konstan seperti trust proxy di express: loopback, linklocal, atau uniquelocal
# Lihat https://expressjs.com/en/5x/api.html#trust.proxy.options.table
# 
# Pisahkan dengan koma jika terdapat beberapa ip reverse-proxy.
WEBUI_TRUST_PROXY=

# Kosongkan MYSQL_SOCKET_PATH jika anda tidak ingin berkomunikasi dengan MySQL melalui socket file.
MYSQL_SOCKET_PATH=/var/lib/mysql/mysql.sock

# MYSQL_HOST dan MYSQL_PORT akan diabaikan jika MYSQL_SOCKET_PATH berisi suatu nilai
MYSQL_HOST=localhost
MYSQL_PORT=3306

MYSQL_DATABASE=ejabberd-admin
MYSQL_USER=ejabberd-admin
MYSQL_PASSWORD=secret

EJABBERD_ADMIN_USERNAME=user@example.com
EJABBERD_ADMIN_PASSWORD=PLEASE_CHANGE_ME
EJABBERD_API_BASE_URL=https://localhost:5443
```

## Menjalankan aplikasi
```shell
npm start
```

Tabel-tabel akan otomatis dibuat jika belum ada.
Ketika pertama dijalankan, daftarkan sebuah user dengan cara membuat sebuah record di tabel "users".

Misal:
```sql
INSERT INTO `users` SET username='admin', password='GANTI_DENGAN_PASSWORD_YANG_SUDAH_DI-HASH-DENGAN_BCRYPT';
```

## Container

```bash
podman pull ghcr.io/tektrans/ejabberd-admin-wrapper:latest
```

atau:

```bash
docker pull ghcr.io/tektrans/ejabberd-admin-wrapper:latest
```

## Menjalankan container
Contoh (silahkan ganti podman dengan docker dan sesuaikan dengan kebutuhan anda):

```shell
podman run --rm --name ejabbed-admin-wrapper \
  -tz Asia/Jakarta \
  -p 11280:11280 \
  -e MYSQL_HOST=host.containers.internal \
  -e MYSQL_PORT=3306 \
  -e MYSQL_DATABASE=ejabberd-admin \
  -e MYSQL_USER=ejabberd-admin \
  -e MYSQL_PASSWORD=secret \
  -e EJABBERD_ADMIN_USER=admin@example.com \
  -e EJABBERD_ADMIN_PASSWORD=secret \
  -e EJABBERD_API_BASE_URL=https://example.com:5443 \
  -v ejabberd-admin-wrapper-logs:/home/app/logs \
  ghcr.io/tektrans/ejabberd-admin-wrapper
```

## Contoh file quadlet
```systemd
# ejabberd-admin-wrapper.container
[Container]
ContainerName=ejabberd-admin-wrapper
Image=ghcr.io/tektrans/ejabberd-admin-wrapper:latest
AutoUpdate=registry
Timezone=Asia/Jakarta

PublishPort=11280:11280

Environment=WEBUI_TRUST_PROXY=10.88.0.1

Environment=MYSQL_HOST=host.containers.internal
Environment=MYSQL_PORT=33060
Environment=MYSQL_DATABASE=ejabberd-admin
Environment=MYSQL_USER=ejabberd-admin
Environment=MYSQL_PASSWORD=secret

Environment=EJABBERD_ADMIN_USERNAME=admin@example.com
Environment=EJABBERD_ADMIN_PASSWORD=secret
Environment=EJABBERD_API_BASE_URL=https://example:5443

Volume=ejabberd-admin-wrapper-logs:/home/app/logs

[Service]
Restart=always

[Install]
WantedBy=default.target
```

## Method yang tersedia

**TODO**

## Lisensi
Hak cipta dipegang oleh [PT TEKNOLOGI TRANSAKSI DIGITAL (TEKTRANS)](https://tektrans.id).
Dilisensikan dengan menggunakan [MIT License](LICENSE).
