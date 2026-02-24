# Mobiles6G Deployment Checklist

## 1) Environment and Secrets
- [ ] Copy `.env.example` to `.env` and replace all placeholder secrets.
- [ ] Set `DJANGO_ENV=production`.
- [ ] Set `DJANGO_DEBUG=false`.
- [ ] Set strong `DJANGO_SECRET_KEY`.
- [ ] Set `DJANGO_ALLOWED_HOSTS` to deployment domains.
- [ ] Set correct `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`.
- [ ] Set `NEXT_PUBLIC_API_URL` to production API URL.

## 2) Database
- [ ] Use PostgreSQL (`DB_ENGINE=django.db.backends.postgresql`).
- [ ] Confirm DB credentials and network access.
- [ ] Enable SSL with `DB_SSLMODE=require`.
- [ ] Run:
  - `python manage.py migrate`
- [ ] Validate seed/data strategy (no dev-only seed script in production boot path).

## 3) Build and Quality Gates
- [ ] Backend checks:
  - `python manage.py check`
  - `python manage.py test phones.tests.test_api -v 2`
- [ ] Frontend checks:
  - `cd client && npm ci`
  - `npm run lint -- --max-warnings=0`
  - `npm run build`
- [ ] Fail deployment if any check fails.

## 4) Security Hardening
- [ ] `SECURE_SSL_REDIRECT=true`.
- [ ] HTTPS termination enabled at reverse proxy/load balancer.
- [ ] HSTS configured (`SECURE_HSTS_SECONDS >= 31536000`).
- [ ] Secure cookies active (`SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE` via production mode).
- [ ] Confirm no wildcard CORS in production.
- [ ] Rotate secrets and DB passwords before go-live.

## 5) Performance
- [ ] Run app behind a production WSGI/ASGI server (e.g., Gunicorn/Uvicorn).
- [ ] Configure caching backend (prefer Redis over local memory).
- [ ] Verify GZip compression is active.
- [ ] Verify DB connection pooling (`DB_CONN_MAX_AGE`).
- [ ] Run `python manage.py collectstatic --noinput`.

## 6) Observability and Operations
- [ ] Route logs to centralized logging.
- [ ] Set `LOG_LEVEL=INFO` (or stricter based on environment).
- [ ] Add uptime and error-rate alerts.
- [ ] Define backup/restore policy for database.
- [ ] Validate rollback procedure.

## 7) Smoke Test After Deploy
- [ ] API health:
  - `GET /api/phones/`
  - `GET /api/phones/samsung/`
  - `GET /api/phones/<id>/`
  - `GET /api/phones/compare/?ids=1,2`
- [ ] Frontend routes:
  - `/`
  - `/samsung`
  - `/compare?ids=1,2`
  - `/phones/1`
- [ ] Validate 404 and error pages.
- [ ] Verify response latency and error logs for first 15 minutes.
