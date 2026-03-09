# Frontend — Comunne

**Stack:** React 18 + TypeScript + Vite
**Responsable:** Dev B

---

## Código Existente Integrado

| Archivo | Origen | Estado |
|---|---|---|
| `src/api/api.ts` | Migrado de `api.js` | Integrar |
| `src/api/apiBuilder.ts` | Existente | Mantener y extender |
| `fetchApi()` | Función existente | Base de todas las llamadas |

---

## Estructura

```
frontend/
├── src/
│   ├── api/
│   │   ├── api.ts           # fetchApi() — capa base HTTP
│   │   ├── apiBuilder.ts    # Constructores de peticiones (existente)
│   │   └── endpoints/
│   │       ├── auth.ts
│   │       ├── services.ts
│   │       ├── matches.ts
│   │       └── users.ts
│   ├── components/
│   │   ├── Map/             # Mapa Leaflet con servicios
│   │   ├── ServiceCard/
│   │   ├── MatchCard/
│   │   ├── Chat/            # Chat Realtime
│   │   └── ReviewForm/
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Home.tsx         # Mapa + servicios cercanos
│   │   ├── MyServices.tsx
│   │   ├── Matches.tsx
│   │   ├── Profile.tsx
│   │   └── Transaction.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useMatches.ts
│   │   └── useRealtime.ts   # Supabase Realtime suscripción
│   └── store/
│       └── authStore.ts     # Zustand — sesión usuario
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

## Setup Local

```bash
npm install
cp .env.example .env   # Rellenar con URL del backend y Supabase
npm run dev
```

## Variables de Entorno

```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```
