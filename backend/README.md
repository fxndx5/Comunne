# Backend — Comunne

**Stack:** FastAPI (Python 3.12) + Supabase (PostgreSQL + PostGIS + pgvector)
**Responsable:** Dev A

---

## Estructura

```
backend/
├── app/
│   ├── main.py              # Entry point FastAPI
│   ├── api/
│   │   └── v1/
│   │       └── routes/
│   │           ├── auth.py       # POST /auth/register, /auth/login
│   │           ├── users.py      # GET/PUT /users/{id}
│   │           ├── services.py   # CRUD /services
│   │           ├── matches.py    # GET /matches, POST /matches/compute
│   │           ├── transactions.py
│   │           ├── reviews.py
│   │           └── messages.py
│   ├── core/
│   │   ├── config.py        # Settings (Pydantic BaseSettings)
│   │   ├── security.py      # JWT validation
│   │   └── deps.py          # FastAPI dependencies (get_current_user)
│   ├── models/
│   │   ├── user.py
│   │   ├── service.py
│   │   ├── match.py
│   │   ├── transaction.py
│   │   ├── review.py
│   │   └── message.py
│   ├── services/
│   │   ├── matching_service.py   # TF-IDF + embeddings
│   │   ├── geo_service.py        # PostGIS queries
│   │   ├── reputation_service.py # Dual rating
│   │   └── embedding_service.py  # Sentence Transformers (S5)
│   └── db/
│       ├── supabase_client.py    # Singleton cliente Supabase
│       └── queries/              # SQL queries complejas
├── tests/
│   ├── test_auth.py
│   ├── test_services.py
│   └── test_matching.py
├── requirements.txt
├── .env.example
└── Dockerfile
```

## Setup Local

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Rellenar con credenciales Supabase
uvicorn app.main:app --reload
```

## Variables de Entorno

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=eyJ...
SUPABASE_JWT_SECRET=...
ENVIRONMENT=development
```
