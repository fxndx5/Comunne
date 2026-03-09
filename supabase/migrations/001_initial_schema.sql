-- Comunne — Schema inicial
-- Migración: 001_initial_schema
-- Fecha: 2026-03-09
-- Validar antes de ejecutar: extensiones PostGIS y pgvector disponibles

-- Extensiones requeridas
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  time_balance INTEGER DEFAULT 0,           -- saldo en minutos
  location GEOGRAPHY(POINT, 4326),          -- PostGIS: lat/lng
  reputation_as_provider FLOAT DEFAULT 0,   -- media de reviews como proveedor
  reputation_as_requester FLOAT DEFAULT 0,  -- media de reviews como solicitante
  reviews_as_provider_count INTEGER DEFAULT 0,
  reviews_as_requester_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVICES (ofertas y demandas)
-- ============================================================
CREATE TYPE service_type AS ENUM ('OFFER', 'REQUEST');

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type service_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  location GEOGRAPHY(POINT, 4326),
  embedding VECTOR(384),                    -- pgvector: sentence-transformers all-MiniLM-L6-v2
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice vectorial para búsqueda semántica
CREATE INDEX ON services USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- Índice geográfico
CREATE INDEX ON services USING GIST (location);

-- ============================================================
-- MATCHES
-- ============================================================
CREATE TYPE match_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  request_service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  score FLOAT NOT NULL CHECK (score >= 0 AND score <= 1),
  status match_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT different_services CHECK (offer_service_id != request_service_id)
);

-- ============================================================
-- TRANSACTIONS
-- ============================================================
CREATE TYPE transaction_status AS ENUM (
  'PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED'
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id),
  provider_id UUID NOT NULL REFERENCES users(id),
  requester_id UUID NOT NULL REFERENCES users(id),
  minutes INTEGER NOT NULL CHECK (minutes > 0),
  status transaction_status DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================================
-- REVIEWS (reputación dual)
-- ============================================================
CREATE TYPE reviewed_role AS ENUM ('PROVIDER', 'REQUESTER');

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  reviewed_id UUID NOT NULL REFERENCES users(id),
  role_reviewed reviewed_role NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT no_self_review CHECK (reviewer_id != reviewed_id),
  CONSTRAINT unique_review_per_role UNIQUE (transaction_id, reviewer_id, role_reviewed)
);

-- ============================================================
-- MESSAGES (chat en tiempo real)
-- ============================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users: cada uno ve su propio perfil + perfiles públicos básicos
CREATE POLICY "Users can view public profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Services: públicos para lectura, escritura solo propios
CREATE POLICY "Services are publicly readable" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Users manage own services" ON services FOR ALL USING (auth.uid() = user_id);

-- Matches: solo los usuarios implicados
CREATE POLICY "Users see own matches" ON matches FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM services WHERE id = offer_service_id
    UNION
    SELECT user_id FROM services WHERE id = request_service_id
  )
);

-- Messages: solo participantes del match
CREATE POLICY "Match participants see messages" ON messages FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM services WHERE id = (
      SELECT offer_service_id FROM matches WHERE id = match_id
    )
    UNION
    SELECT user_id FROM services WHERE id = (
      SELECT request_service_id FROM matches WHERE id = match_id
    )
  )
);
CREATE POLICY "Match participants send messages" ON messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id
);
