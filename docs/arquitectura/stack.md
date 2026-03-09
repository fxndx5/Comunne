# Stack Tecnológico — Comunne

**Versión:** 1.0
**Fecha:** 09/03/2026
**Estado:** Aprobado (ADR-001)

---

## Visión General

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENTE                             │
│  ┌─────────────────────┐   ┌───────────────────────┐   │
│  │   React 18 (web)    │   │   Expo (React Native) │   │
│  │   TypeScript + Vite │   │   iOS / Android        │   │
│  └──────────┬──────────┘   └──────────┬────────────┘   │
└─────────────┼──────────────────────────┼───────────────┘
              │  REST / WebSocket        │
┌─────────────▼──────────────────────────▼───────────────┐
│                   BACKEND                               │
│              FastAPI (Python 3.12)                      │
│   ┌──────────┐  ┌───────────┐  ┌────────────────────┐  │
│   │   Auth   │  │   CRUD    │  │  Matching Service  │  │
│   │ Supabase │  │ Services  │  │  TF-IDF + Embeddings│ │
│   │   JWT    │  │  Users    │  │  PostGIS queries   │  │
│   └──────────┘  └───────────┘  └────────────────────┘  │
│                                                         │
│   ┌────────────────────┐  ┌─────────────────────────┐  │
│   │ Reputation Service │  │  Transaction State FSM  │  │
│   │ Dual rating system │  │  PENDING→COMPLETED...   │  │
│   └────────────────────┘  └─────────────────────────┘  │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   SUPABASE                              │
│  PostgreSQL 15 + PostGIS + pgvector + Realtime + Auth  │
└─────────────────────────────────────────────────────────┘
```

---

## Componentes

### Frontend — Dev B
| Tecnología | Versión | Motivo |
|---|---|---|
| React | 18 | Dominio existente del equipo |
| TypeScript | 5.x | Tipado — apiBuilder.ts ya existe |
| Vite | 5.x | Build rápido, HMR |
| Zustand | 4.x | Estado global simple |
| TanStack Query | 5.x | Server state, caché |
| Tailwind CSS | 3.x | Utility-first, sin coste |
| Leaflet / Mapbox GL | latest | Mapa interactivo de servicios locales |

**Código existente reutilizable:**
- `api.js` → migrar a `api.ts` e integrar en capa de peticiones
- `fetchApi()` → base de todas las llamadas al backend
- `apiBuilder.ts` → mantener y extender con nuevos endpoints

### Mobile — Dev B
| Tecnología | Versión | Motivo |
|---|---|---|
| Expo | SDK 51 | Zero config para React Native |
| Expo Router | 3.x | File-based routing |
| Expo Location | latest | Geolocalización del usuario |

### Backend — Dev A
| Tecnología | Versión | Motivo |
|---|---|---|
| Python | 3.12 | LTS, compatibilidad librerías IA/NLP |
| FastAPI | 0.111 | Alto rendimiento, OpenAPI auto |
| Pydantic | 2.x | Validación robusta |
| scikit-learn | 1.5 | TF-IDF vectorizer para matching MVP |
| sentence-transformers | 3.x | Embeddings para matching avanzado (S5) |
| supabase-py | 2.x | Cliente oficial Supabase |
| httpx | 0.27 | Cliente HTTP async |
| shapely | 2.x | Operaciones geométricas PostGIS |

### Base de Datos — Supabase
| Extensión / Feature | Uso |
|---|---|
| PostgreSQL 15 | Base relacional |
| PostGIS | Geolocalización — proximidad geográfica entre usuarios |
| pgvector | Búsqueda semántica de servicios por embeddings |
| Supabase Auth | Autenticación JWT, magic links, social login |
| Supabase Realtime | Chat en tiempo real entre usuarios (WebSocket) |
| Supabase Storage | Fotos de perfil, imágenes de servicios |
| Row Level Security | Cada usuario solo ve sus datos privados |

**Consulta de proximidad ejemplo:**
```sql
SELECT * FROM services
WHERE ST_DWithin(
  location::geography,
  ST_MakePoint($lon, $lat)::geography,
  $radius_meters
)
ORDER BY location <-> ST_MakePoint($lon, $lat)::geography;
```

### Matching Engine — Dev A
| Fase | Técnica | Sprint |
|---|---|---|
| MVP | TF-IDF (scikit-learn) sobre descripción + tags | S3 |
| Mejora | Sentence Transformers (embeddings locales) | S5 |
| Filtro geográfico | PostGIS ST_DWithin | S3 |
| Score final | TF-IDF score × reputación × distancia inversa | S5 |

### Deploy / Infraestructura
| Servicio | Componente | Plan |
|---|---|---|
| Render | Backend FastAPI | Free (con cold start) |
| Vercel | Frontend React | Free |
| Supabase | Base de datos | Free tier |
| UptimeRobot | Keep-alive Render | Free (ping cada 14 min) |
| GitHub Actions | CI/CD | Free |

---

## Modelo de Datos

```sql
-- Usuarios con geolocalización
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  time_balance INTEGER DEFAULT 0,  -- saldo en minutos
  location GEOGRAPHY(POINT, 4326), -- PostGIS
  reputation_as_provider FLOAT DEFAULT 0,
  reputation_as_requester FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Servicios ofrecidos/demandados
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT CHECK (type IN ('OFFER', 'REQUEST')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[],
  duration_minutes INTEGER NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  embedding VECTOR(384),           -- pgvector
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches generados por el motor
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_service_id UUID REFERENCES services(id),
  request_service_id UUID REFERENCES services(id),
  score FLOAT NOT NULL,
  status TEXT CHECK (status IN ('PENDING','ACCEPTED','REJECTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transacciones (intercambio de tiempo)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id),
  provider_id UUID REFERENCES users(id),
  requester_id UUID REFERENCES users(id),
  minutes INTEGER NOT NULL,
  status TEXT CHECK (status IN (
    'PENDING','ACCEPTED','IN_PROGRESS','COMPLETED','CANCELLED','DISPUTED'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Reputación dual
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions(id),
  reviewer_id UUID REFERENCES users(id),
  reviewed_id UUID REFERENCES users(id),
  role_reviewed TEXT CHECK (role_reviewed IN ('PROVIDER','REQUESTER')),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat en tiempo real
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Decisiones de Diseño Clave

### PostGIS vs lat/lng simple
- **Decisión:** PostGIS desde el inicio (Supabase lo soporta nativamente)
- **Fallback:** Si PostGIS falla en Supabase, usar columnas `lat FLOAT, lng FLOAT` con cálculo Haversine en Python
- **Validar en:** Sprint S1, primera semana

### TF-IDF vs Embeddings
- **MVP (S1–S4):** TF-IDF con scikit-learn — rápido de implementar, sin dependencias externas
- **S5:** Sentence Transformers (modelo `all-MiniLM-L6-v2`, 384 dims, descarga gratuita)
- **Ventaja para el tribunal:** El jurado ve evolución técnica progresiva y justificada

### Reputación dual
- Dos métricas separadas: `reputation_as_provider` y `reputation_as_requester`
- Actualización asíncrona post-review con media móvil ponderada
- Visible en perfil con separación clara

### Máquina de estados de transacciones
```
PENDING → ACCEPTED → IN_PROGRESS → COMPLETED
                  ↘ CANCELLED
                               ↘ DISPUTED
```
- Implementar con enum PostgreSQL + trigger de validación de transición

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Render cold start (>30s) | Alta | Medio | UptimeRobot ping cada 14 min |
| PostGIS no disponible en Supabase free | Baja | Alto | Validar S1; fallback Haversine |
| Demo sin usuarios reales | Alta | Alto | Script seed con 30 usuarios + 60 servicios variados |
| TF-IDF matching de baja calidad | Media | Medio | Embeddings en S5 como mejora documentada |
| Supabase Realtime chat latencia | Baja | Bajo | Probado y estable en free tier |
