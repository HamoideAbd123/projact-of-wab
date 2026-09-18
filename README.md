# Mobiles6G

A full-stack smartphone showcase and catalog platform with a Django REST backend and a Next.js frontend.

## What the project does

- Smartphone catalog and detailed specifications
- Brand and price filtering
- Multi-image product galleries
- Device comparison
- Admin management through Django
- Responsive frontend UI

## Architecture

```text
projact-of-wab/
├── client/                 # Next.js / React / TypeScript frontend
├── phones/                 # Django application for smartphone data
├── server/                 # Django project configuration and API setup
├── manage.py               # Django CLI entry point
├── seed_data.py            # Development data seeding
├── .env.example            # Environment variable template
├── DEPLOYMENT_CHECKLIST.md # Production deployment checklist
└── README.md
```

## Stack

- Backend: Django + Django REST Framework
- Frontend: Next.js + React + TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Production database: PostgreSQL recommended

## Local Development

### Backend

```bash
python -m venv venv
# Windows
.\\venv\\Scripts\\activate
pip install django djangorestframework django-cors-headers django-filter
python manage.py migrate
python seed_data.py
python manage.py runserver
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and configure Django, database, CORS/CSRF, and frontend API variables. Never commit real secrets.

## Deployment

Use `DEPLOYMENT_CHECKLIST.md` before production deployment. Production should use `DEBUG=false`, strong secrets, PostgreSQL, correct allowed hosts/origins, and static-file collection.

## Development Status

Active development. The repository is kept separated into backend (`phones`, `server`) and frontend (`client`) areas to make navigation and maintenance easier.
