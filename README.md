# Mobiles6G - Smartphone Showcase Platform

A modern, full-stack smartphone showcase application built with Django (Backend) and Next.js (Frontend).

## 🚀 Features

- **Modern UI**: Clean, minimal, and responsive design with Tailwind CSS.
- **Phone Catalog**: Comprehensive database of smartphones with detailed specs.
- **Multi-Image Gallery**: Interactive carousel for device photos.
- **Advanced Filtering**: Filter by brand and price range in real-time.
- **Comparison Tool**: Side-by-side comparison of multiple devices.
- **Admin Dashboard**: Easy-to-use interface for managing the phone catalog.

## 🛠️ Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Icons**: Lucide React

## 🔐 Environment Setup

Copy `.env.example` to `.env` and fill in real values before running in production:

```bash
cp .env.example .env
```

Important production variables:
- `DJANGO_DEBUG=false`
- `DJANGO_SECRET_KEY` with a strong random value
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`
- PostgreSQL connection values (`DB_*`)
- `NEXT_PUBLIC_API_URL` for frontend

## 📦 Getting Started

### 1. Prerequisites
- Python 3.x
- Node.js & npm

### 2. Backend Setup
```bash
# Navigate to root
python -m venv venv
# Activate venv (Windows)
.\venv\Scripts\activate
# Install dependencies
pip install django djangorestframework django-cors-headers django-filter
# Run migrations
python manage.py migrate
# Seed data
python seed_data.py
# Start server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd client
# Install dependencies
npm install
# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🚢 Production Notes

1. Use PostgreSQL instead of SQLite.
2. Keep `DJANGO_DEBUG=false`.
3. Run static checks before deploy:
```bash
python manage.py check
python manage.py test phones.tests.test_api
cd client && npm run lint -- --max-warnings=0
```
4. Collect static files for deployment:
```bash
python manage.py collectstatic --noinput
```
5. Use the full checklist in `DEPLOYMENT_CHECKLIST.md`.

## 📂 Project Structure

- `phones/`: Django app containing models, views, and serializers.
- `server/`: Django project configuration.
- `client/`: Next.js frontend application.
- `seed_data.py`: Script to populate the database.

## 📄 License
MIT
