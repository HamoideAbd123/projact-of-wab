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

- **Backend**: Django, Django REST Framework, SQLite
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Icons**: Lucide React

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

## 📂 Project Structure

- `phones/`: Django app containing models, views, and serializers.
- `server/`: Django project configuration.
- `client/`: Next.js frontend application.
- `seed_data.py`: Script to populate the database.

## 📄 License
MIT
