# Plan de Sprints — Comunne

**Proyecto:** Comunne — TFG DAM 2025–2026
**Entrega final:** 29 de mayo de 2026
**MVP objetivo:** 30 de marzo de 2026 (S4)

---

## Resumen de Sprints

| Sprint | Período | Objetivo | Dev A (Python) | Dev B (React) | Estado |
|---|---|---|---|---|---|
| S1 | 09–15 mar | Setup + Auth + Schema | Backend setup | Frontend setup | Pendiente |
| S2 | 16–22 mar | CRUD + Perfiles | Endpoints usuarios/servicios | Páginas CRUD + perfil | Pendiente |
| S3 | 23–29 mar | Matching + Geo | Motor TF-IDF + PostGIS | Mapa + listado matches | Pendiente |
| **S4** | **30 mar** | **MVP** | **Demo seed data** | **UI integrada** | **Pendiente** |
| S5 | 31 mar–12 abr | Embeddings | Sentence Transformers | Búsqueda avanzada UI | Pendiente |
| S6 | 13–26 abr | Reputación + Transacciones | FSM + dual rating | Flujo transacción UI | Pendiente |
| S7 | 27 abr–10 may | Chat RT + Mobile | WebSocket backend | Supabase Realtime + Expo | Pendiente |
| S8 | 11–28 may | Polish + Docs | Tests + OpenAPI docs | UI polish + seed datos | Pendiente |

---

## Sprint S1 — Setup + Auth + Schema DB
**Período:** 09–15 marzo 2026
**Objetivo:** Proyecto arrancando con auth funcional y schema de base de datos completo.

### Dev A — Backend
- [ ] Inicializar proyecto FastAPI con estructura de carpetas
- [ ] Configurar variables de entorno (`.env`)
- [ ] Conectar Supabase (cliente Python)
- [ ] Validar extensión PostGIS en Supabase free tier
- [ ] Ejecutar migraciones: schema completo (users, services, matches, transactions, reviews, messages)
- [ ] Endpoint `POST /auth/register` y `POST /auth/login` (delegando a Supabase Auth)
- [ ] Middleware de autenticación JWT
- [ ] Healthcheck endpoint `GET /health`

### Dev B — Frontend
- [ ] Inicializar proyecto Vite + React + TypeScript
- [ ] Integrar código existente: `api.js` → `api.ts`, `fetchApi()`, `apiBuilder.ts`
- [ ] Configurar cliente Supabase JS
- [ ] Páginas: Login, Register, Home (placeholder)
- [ ] Gestión de sesión (Zustand store)
- [ ] Variables de entorno frontend

### Entregable S1
- Auth completo (registro + login + JWT)
- Schema DB desplegado en Supabase
- Backend en Render (aunque con cold start)
- Frontend en Vercel

---

## Sprint S2 — CRUD Servicios + Perfiles de Usuario
**Período:** 16–22 marzo 2026
**Objetivo:** Los usuarios pueden crear servicios (ofertas/demandas) y ver perfiles.

### Dev A — Backend
- [ ] `GET/POST/PUT/DELETE /services` — CRUD servicios
- [ ] `GET /services/{id}` — detalle servicio
- [ ] `GET/PUT /users/{id}` — perfil usuario
- [ ] `POST /users/{id}/location` — actualizar ubicación (lat/lng inicial)
- [ ] Validaciones Pydantic en todos los modelos
- [ ] Tests unitarios básicos (pytest)

### Dev B — Frontend
- [ ] Página: Lista de servicios propios
- [ ] Formulario: Crear / editar servicio (tipo, título, descripción, tags, duración)
- [ ] Página: Perfil de usuario (editable)
- [ ] Integración con `apiBuilder.ts` para todos los nuevos endpoints

### Entregable S2
- Flujo completo: registro → crear servicio → ver perfil

---

## Sprint S3 — Motor de Matching + Geolocalización
**Período:** 23–29 marzo 2026
**Objetivo:** El sistema conecta ofertas con demandas cercanas usando TF-IDF + PostGIS.

### Dev A — Backend
- [ ] Integrar PostGIS: columnas `GEOGRAPHY(POINT)` en users y services
- [ ] Query de proximidad con `ST_DWithin`
- [ ] Motor TF-IDF con scikit-learn:
  - Vectorizar descripciones + tags de todos los servicios activos
  - Calcular similarity matrix entre OFFERs y REQUESTs
- [ ] `POST /matches/compute` — generar matches para un usuario
- [ ] `GET /matches` — listar matches del usuario autenticado
- [ ] Script seed inicial: 30 usuarios + 60 servicios variados (para demo)

### Dev B — Frontend
- [ ] Mapa con Leaflet: mostrar servicios cercanos
- [ ] Página: Lista de matches recibidos (score + distancia)
- [ ] Selector de radio de búsqueda (1km, 5km, 10km)
- [ ] Página detalle de match: servicios implicados + botón "Aceptar"

### Entregable S3
- Motor de matching funcionando con datos reales
- Mapa interactivo con servicios geolocalizados

---

## Sprint S4 — MVP Entregable
**Fecha:** 30 de marzo de 2026
**Objetivo:** Demo completa y funcional presentable al tutor.

### Dev A
- [ ] Refinar motor de matching (ajuste de pesos TF-IDF)
- [ ] `POST /matches/{id}/accept` — aceptar match → crear transacción PENDING
- [ ] Seed data completo y variado (suficiente para demo convincente)
- [ ] Deploy estable en Render con UptimeRobot configurado

### Dev B
- [ ] UI polish de las pantallas principales
- [ ] Flujo completo en demo: registro → crear servicio → ver matches → aceptar match
- [ ] README con instrucciones de uso

### Entregable S4 — MVP
- App desplegada y funcional
- Demo ejecutable con datos seed
- Flujo completo sin errores

---

## Sprint S5 — Embeddings Semánticos
**Período:** 31 marzo – 12 abril 2026
**Objetivo:** Mejorar el matching con embeddings de Sentence Transformers.

### Dev A
- [ ] Integrar `sentence-transformers` (modelo `all-MiniLM-L6-v2`)
- [ ] Generar y almacenar embeddings en columna `pgvector` de services
- [ ] Búsqueda por cosine similarity con pgvector
- [ ] Combinar score TF-IDF + embedding + distancia en score final
- [ ] Índice IVFFLAT en pgvector

### Dev B
- [ ] UI de búsqueda semántica libre ("busco alguien que me enseñe fotografía")
- [ ] Mostrar score de matching con explicación visual

---

## Sprint S6 — Sistema de Reputación + Transacciones
**Período:** 13–26 abril 2026
**Objetivo:** Flujo completo de intercambio con valoración bidireccional.

### Dev A
- [ ] FSM de transacciones: `PENDING → ACCEPTED → IN_PROGRESS → COMPLETED | CANCELLED | DISPUTED`
- [ ] Endpoints: `PATCH /transactions/{id}/status`
- [ ] `POST /reviews` — valoración post-transacción
- [ ] Actualización automática de `reputation_as_provider` y `reputation_as_requester`
- [ ] Transferencia de saldo de tiempo al completar transacción

### Dev B
- [ ] Flujo UI de transacción (timeline con estados)
- [ ] Formulario de valoración (1–5 estrellas + comentario)
- [ ] Perfil: mostrar reputación dual con historial

---

## Sprint S7 — Chat en Tiempo Real + Mobile
**Período:** 27 abril – 10 mayo 2026
**Objetivo:** Comunicación directa entre usuarios + app móvil básica.

### Dev A
- [ ] Activar Supabase Realtime en tabla `messages`
- [ ] Row Level Security: solo los participantes del match ven sus mensajes
- [ ] `GET /matches/{id}/messages` — historial de mensajes

### Dev B
- [ ] Chat UI en React con suscripción Realtime
- [ ] Inicializar proyecto Expo
- [ ] Pantallas mobile: Login, Home, Servicios, Matches
- [ ] Integrar `fetchApi` / `apiBuilder.ts` en Expo

---

## Sprint S8 — Polish + Documentación Final
**Período:** 11–28 mayo 2026
**Objetivo:** Proyecto listo para defensa el 29 de mayo.

### Dev A + Dev B
- [ ] Tests de integración (endpoints críticos)
- [ ] Documentación OpenAPI completa (FastAPI auto-genera, revisar y completar)
- [ ] Seed data definitivo para demo
- [ ] Memoria técnica del TFG (secciones backend)
- [ ] Diagramas de arquitectura actualizados
- [ ] Presentación / slides para defensa
- [ ] Rehearsal de demo (flujo completo cronometrado)

---

## Criterios de MVP (S4)

El MVP se considera entregable si cumple:

- [ ] Un usuario puede registrarse y hacer login
- [ ] Un usuario puede crear un servicio (oferta o demanda)
- [ ] El sistema genera matches entre servicios compatibles y cercanos
- [ ] El usuario puede ver sus matches con score de compatibilidad
- [ ] El usuario puede aceptar un match
- [ ] La app está desplegada y accesible por URL pública
- [ ] La demo funciona con datos seed sin errores visibles

---

*Última actualización: 2026-03-09*
