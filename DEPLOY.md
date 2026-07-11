# Deploying to a Contabo VPS (Ubuntu 22.04 / 24.04) with Docker

This runs the portfolio in Docker behind Nginx. Start on the bare IP; add a
domain + HTTPS later (last section). Everything below is run **on the VPS**
over SSH unless noted.

---

## 0. Connect to the VPS

From your PC (use the IP + root password from your Contabo panel):

```bash
ssh root@YOUR_VPS_IP
```

> Tip: `YOUR_VPS_IP` is in your Contabo control panel. Replace it everywhere below.

---

## 1. Update the system & install Docker

```bash
apt update && apt -y upgrade

# Install Docker Engine + Compose plugin (official convenience script)
curl -fsSL https://get.docker.com | sh

# Verify
docker --version
docker compose version
```

---

## 2. Open the firewall

```bash
# If ufw is installed/used on your VPS:
ufw allow OpenSSH
ufw allow 80/tcp
# ufw allow 443/tcp     # add later when you enable HTTPS
ufw --force enable
ufw status
```

> Contabo also has a firewall in its panel — if you use that instead, allow
> ports **22, 80** (and **443** later).

---

## 3. Get the code

```bash
cd /opt
git clone https://github.com/MehrezAziz/Portfolio.git portfolio
cd portfolio
```

---

## 4. (Optional) Set the contact-form key

The contact form needs a Formspree ID to actually send mail. Skip this if you
haven't set up Formspree yet — the form shows a friendly notice and the direct
email/LinkedIn/GitHub links still work.

```bash
# Create a .env file that docker compose reads at build time:
echo "NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here" > .env
```

(Get the ID from https://formspree.io — it's the `xxxx` in `formspree.io/f/xxxx`.)

---

## 5. Build & start

```bash
docker compose up -d --build
```

First build takes a couple of minutes. Check it's running:

```bash
docker compose ps
docker compose logs -f web     # Ctrl+C to stop following
```

Now open **http://YOUR_VPS_IP** in your browser. 🎉

---

## 6. Updating after you push new changes

Whenever you push to GitHub from your PC:

```bash
cd /opt/portfolio
git pull
docker compose up -d --build      # rebuilds only what changed
docker image prune -f             # optional: clean old layers
```

---

## 7. Handy commands

```bash
docker compose ps                 # status
docker compose logs -f web        # app logs
docker compose logs -f nginx      # proxy logs
docker compose restart            # restart everything
docker compose down               # stop & remove containers
docker compose up -d              # start again
```

---

## 8. Later: add a domain + free HTTPS (Let's Encrypt)

Do this once you have a domain (e.g. from Namecheap/Cloudflare/etc.).

**8.1 — DNS:** In your domain registrar, add an **A record**:

| Type | Host | Value          |
|------|------|----------------|
| A    | @    | YOUR_VPS_IP    |
| A    | www  | YOUR_VPS_IP    |

Wait for it to propagate (`ping yourdomain.com` should show the VPS IP).

**8.2 — Open 443 & prep folders:**

```bash
ufw allow 443/tcp
cd /opt/portfolio
mkdir -p nginx/certbot/conf nginx/certbot/www
```

**8.3 — In `docker-compose.yml`**, uncomment the `- "443:443"` line and the two
`./nginx/certbot/...` volume lines under the `nginx` service. Then reload:

```bash
docker compose up -d
```

**8.4 — Get the certificate** (replace the domain + email):

```bash
docker run --rm \
  -v /opt/portfolio/nginx/certbot/conf:/etc/letsencrypt \
  -v /opt/portfolio/nginx/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d yourdomain.com -d www.yourdomain.com \
  --email azizmehrez12@gmail.com --agree-tos --no-eff-email
```

**8.5 — Enable the HTTPS server block:** edit `nginx/default.conf`, set
`server_name yourdomain.com www.yourdomain.com;`, and uncomment the `443` TLS
server block at the bottom (update the two `yourdomain.com` cert paths). Then:

```bash
docker compose restart nginx
```

Visit **https://yourdomain.com**. ✅

**8.6 — Auto-renew** (certs last 90 days). Add a cron job:

```bash
crontab -e
# add this line:
0 3 * * * docker run --rm -v /opt/portfolio/nginx/certbot/conf:/etc/letsencrypt -v /opt/portfolio/nginx/certbot/www:/var/www/certbot certbot/certbot renew --quiet && docker compose -f /opt/portfolio/docker-compose.yml restart nginx
```

---

## Troubleshooting

- **Site not loading:** `docker compose logs web` and `docker compose logs nginx`.
  Confirm port 80 is open (firewall) and `docker compose ps` shows both services `Up`.
- **Port 80 already in use:** something else (e.g. host nginx/apache) is bound to 80.
  `systemctl stop nginx apache2 2>/dev/null; systemctl disable nginx apache2 2>/dev/null`.
- **Contact form not sending:** the `NEXT_PUBLIC_FORMSPREE_ID` must be set **before**
  `--build` (it's baked into the build). Set `.env`, then `docker compose up -d --build`.
- **Out of memory during build:** small VPS plans can struggle with `npm run build`.
  Add swap: `fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile && echo '/swapfile none swap sw 0 0' >> /etc/fstab`.
