# Digital-Grievance-Redressal-System

This is demo video--https://docs.google.com/videos/d/1mUyeynNKy39TgDgkJFB-k_2ja4YxrRULOEv2JHJTbCw/edit?usp=sharing

Frontend is a Vite + React app, and a FastAPI backend is available under `backend`.

## Frontend

```bash
npm install
npm run dev
```

## Backend (FastAPI)

The API uses **SQLite** by default. The database file is `backend/grievance_portal.db` (created on first run; tables are created at startup).

Configure the connection (optional — defaults match `.env.example`):

```bash
cd backend
copy .env.example .env
```

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

To use another database supported by SQLAlchemy, set `DATABASE_URL` in `.env` (for example a MySQL URL such as `mysql+pymysql://user:pass@127.0.0.1:3306/grievance_portal`).

API docs will be available at:
- `http://127.0.0.1:8000/docs`

## Included Backend Endpoints

- `GET /health`
- `POST /auth/login`
- `POST /auth/admin/login`
- `POST /auth/register`
- `GET /users`
- `GET /complaints`
- `POST /complaints`
