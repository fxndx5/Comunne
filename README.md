# Comunne
**Marketplace de trueque de tiempo y habilidades local**
**Trabajo de Fin de Grado · DAM 2025–2026**

---

## Información del Proyecto

| Campo | Valor |
|---|---|
| Proyecto | Comunne |
| Tipo | Trabajo de Fin de Grado — DAM |
| Entrega | 29 de mayo de 2026 |
| Presupuesto | 0 € |
| Dev A | Backend Python (FastAPI) |
| Dev B | Frontend / Cloud (React + Expo) |

---

## Descripción

Comunne es un marketplace de intercambio de tiempo y habilidades entre personas de una misma comunidad local. Los usuarios ofrecen y solicitan servicios pagando con tiempo en lugar de dinero (banco de tiempo digital). El sistema conecta personas mediante matching semántico, garantiza la confianza con un sistema de reputación dual y permite la comunicación directa mediante chat en tiempo real.

**Pilares del proyecto:**
- **Matching semántico** — TF-IDF + embeddings para conectar oferta y demanda por afinidad real
- **Geolocalización** — PostGIS para limitar el intercambio al entorno local del usuario
- **Reputación dual** — valoración bidireccional (ofertante / demandante) para construir confianza
- **Chat en tiempo real** — comunicación directa entre usuarios conectados por el sistema

---

## Stack Tecnológico

```
Backend       FastAPI (Python 3.12)
Base de datos Supabase (PostgreSQL 15 + PostGIS + pgvector)
Matching      TF-IDF (scikit-learn) + Embeddings (Sentence Transformers / Groq)
Frontend      React 18 + TypeScript + Vite
Mobile        Expo (React Native)
Chat RT       Supabase Realtime (WebSocket)
Deploy        Render (backend) + Vercel (frontend)
Keep-alive    UptimeRobot (mitiga cold start de Render)
```

---

## Estructura del Repositorio

```
comunne/
├── docs/
│   ├── actas/              # Actas de reunión (auditabilidad)
│   ├── decisiones/         # Architecture Decision Records (ADR)
│   ├── arquitectura/       # Diagramas y decisiones de stack
│   └── sprints/            # Planificación y seguimiento de sprints
├── backend/                # FastAPI — Dev A
│   ├── app/
│   │   ├── api/v1/routes/  # Endpoints REST
│   │   ├── core/           # Config, seguridad, dependencias
│   │   ├── models/         # Modelos Pydantic
│   │   ├── services/       # Matching, embeddings, reputación
│   │   └── db/             # Clientes Supabase, queries PostGIS
│   └── tests/
├── frontend/               # React + TypeScript — Dev B
│   └── src/
│       ├── api/            # fetchApi, apiBuilder (código existente)
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── store/
├── mobile/                 # Expo — Dev B
│   └── src/
├── supabase/
│   └── migrations/         # DDL versionado (incluye PostGIS)
└── .github/
    └── workflows/          # CI/CD
```

---

## Entidades Principales

| Entidad | Descripción |
|---|---|
| `User` | Perfil, saldo de tiempo, geolocalización |
| `Service` | Oferta o demanda de habilidad con descripción y tags |
| `Match` | Conexión sistema entre ofertante y demandante |
| `Transaction` | Intercambio completado con transferencia de tiempo |
| `Review` | Valoración bidireccional post-transacción |
| `Message` | Chat en tiempo real entre usuarios conectados |

---

## Sprints

| Sprint | Período | Objetivo | Estado |
|---|---|---|---|
| S1 | 09–15 mar 2026 | Setup + Auth + Schema DB (PostGIS) | Pendiente |
| S2 | 16–22 mar 2026 | CRUD servicios + perfil usuario | Pendiente |
| S3 | 23–29 mar 2026 | Motor de matching TF-IDF + geolocalización | Pendiente |
| S4 | 30 mar 2026 | **MVP entregable** | Pendiente |
| S5 | 31 mar–12 abr | Embeddings semánticos + mejora matching | Pendiente |
| S6 | 13–26 abr | Reputación dual + sistema de transacciones | Pendiente |
| S7 | 27 abr–10 may | Chat en tiempo real (Supabase Realtime) | Pendiente |
| S8 | 11–28 may | Expo mobile app + polish + docs finales | Pendiente |

---

## Documentación

- [Acta de Reunión 08/03/2026](docs/actas/2026-03-08-acta-reunion.md)
- [ADR-001 — Selección de Proyecto: Comunne](docs/decisiones/ADR-001-seleccion-comunne.md)
- [Stack Tecnológico Detallado](docs/arquitectura/stack.md)
- [Plan de Sprints](docs/sprints/plan-sprints.md)
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

---

## División de Trabajo

| Responsabilidad | Dev A (Python) | Dev B (React/Cloud) |
|---|---|---|
| FastAPI backend | ✅ Principal | ⬜ |
| Schema PostGIS + Supabase | ✅ Principal | ⬜ |
| Motor matching TF-IDF + embeddings | ✅ Principal | ⬜ |
| Sistema de reputación | ✅ Principal | ⬜ |
| React frontend | ⬜ | ✅ Principal |
| Expo mobile | ⬜ | ✅ Principal |
| Chat Realtime (Supabase) | ⬜ | ✅ Compartido |
| Deploy Render/Vercel | ⬜ | ✅ Compartido |

---

*Última actualización: 2026-03-09*
