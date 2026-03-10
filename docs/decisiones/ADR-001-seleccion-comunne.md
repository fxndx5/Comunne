# ADR-001 — Selección de Proyecto: Comunne

**Estado:** Aceptado
**Fecha:** 08/03/2026
**Autor:** Juan de Dios
**Análisis previo:** Panel IA (ChatGPT, Gemini, DeepSeek, Claude Sonnet 4.6)

---

## Contexto

Se necesita seleccionar un proyecto viable para el TFG de DAM con entrega el **29 de mayo de 2026**, presupuesto **0 €** y un único desarrollador principal con fines de semana disponibles para desarrollo.

Se evaluaron 4 propuestas mediante un panel de expertos simulado con 4 modelos IA independientes usando el método de Borda ponderado. Tras revisar el análisis, el autor decidió desarrollar **Comunne**, valorando el impacto social, la originalidad y el potencial real del producto.

---

## Propuestas Evaluadas

### LifeGraph (ChatGPT)
Plataforma de analítica personal que agrega datos de hábitos, GitHub y calendario para detectar correlaciones entre comportamientos y productividad.
**Descartada por:** Cold-start de datos insalvable para la demo del día de defensa.

### EcoRoute Ops (Gemini)
SaaS de logística de última milla para PYMEs con optimización VRP con Google OR-Tools y re-optimización dinámica.
**Descartada por:** Riesgo técnico OR-Tools muy alto; curva de aprendizaje que consume el tiempo disponible.

### Linkboard (Claude)
Hub de conocimiento compartido para equipos dev con categorización IA y búsqueda vectorial.
**No seleccionada:** Menor originalidad conceptual; el autor prioriza el impacto social de Comunne.

### Comunne (DeepSeek) ← SELECCIONADO
Marketplace de trueque de tiempo y habilidades local. Matching semántico, geolocalización PostGIS, sistema de reputación dual y chat en tiempo real.

---

## Decisión

**Se selecciona Comunne.**

---

## Justificación del Autor

### 1. Impacto social genuino
El banco de tiempo digital es conceptualmente disruptivo. Comunne resuelve un problema real: la desconexión entre personas de una misma comunidad que tienen habilidades complementarias pero no se encuentran. Ninguna otra propuesta tiene este potencial de impacto.

### 2. Originalidad conceptual máxima
El concepto de marketplace de tiempo —donde la moneda es el tiempo humano— es único entre las cuatro propuestas. Un tribunal recuerda un proyecto con alma.

### 3. Stack técnicamente ambicioso y defendible
PostGIS, matching semántico TF-IDF + embeddings, sistema de reputación dual y WebSocket son componentes que demuestran conocimiento técnico avanzado. El tribunal puede preguntar sobre decisiones reales de arquitectura.

### 4. Riesgos identificados y gestionables
- **Efecto de red en demo:** Se resuelve con datos seed preparados (usuarios ficticios para mostrar matching real).
- **PostGIS en Supabase:** La extensión es soportada de forma nativa; se valida en S1.
- **TF-IDF como matching básico:** El MVP usa TF-IDF; S5 incorpora embeddings para demostrar evolución técnica.

### 5. Argumento de DeepSeek validado
DeepSeek fue el único modelo sin sesgo de autoría que eligió Comunne en primer lugar. Su argumento más sólido: **independencia total de APIs externas para el core del negocio**. El matching y la reputación son propios. La demo no depende de cuotas de terceros.

---

## Puntuaciones del Panel (referencia)

| Experto | Peso | Comunne | Linkboard | EcoRoute | LifeGraph |
|---|---|---|---|---|---|
| Tutor Académico | 30% | 3º | 2º | 1º | 4º |
| Consultor Innovación | 20% | 2º | 3º | 1º | 4º |
| Analista Mercado | 25% | 3º | 1º | 2º | 4º |
| PM Escéptico | 25% | 3º | 1º | 4º | 2º |
| **Score ponderado** | | **🥉 2.75** | 1.70 | 2.00 | 3.55 |

> El autor tomó la decisión final consciente del ranking, priorizando el valor conceptual e impacto social del proyecto sobre la puntuación automatizada del panel.

---

## Riesgos Asumidos y Estrategia de Mitigación

| Riesgo | Estrategia |
|---|---|
| Demo sin usuarios reales (efecto de red) | Seed de datos: 20–30 usuarios ficticios con servicios variados antes de la demo |
| PostGIS complejidad operacional | Validar extensión en Supabase en S1; fallback a campo lat/lng simple si falla |
| TF-IDF insuficiente para matching profundo | MVP con TF-IDF; S5 incorpora embeddings. El tribunal ve evolución técnica progresiva |
| Complejidad modelo de datos (5 entidades + m2m) | Diseñar schema completo en S1; no añadir entidades sin revisión previa |
| Máquina de estados en transacciones | Documentar estados desde el inicio; implementar con enum PostgreSQL |

---

## Modelo de Datos Base

```
User ──< Service (oferta/demanda)
User ──< Review (valoración)
User ──< Transaction (participante)
Service >──< Match ──< Service   (m2m matching)
Match ──< Message (chat RT)
Transaction ──< Review (post-transacción)
```

**Estados de transacción:** `PENDING → ACCEPTED → IN_PROGRESS → COMPLETED | CANCELLED | DISPUTED`

---

## Consecuencias

- El proyecto se desarrolla bajo el nombre **Comunne**.
- Stack fijado: FastAPI + Supabase (PostGIS + pgvector) + React + Expo + Supabase Realtime.
- El código existente (api.js, fetchApi, apiBuilder.ts) se integra en la capa frontend.
- Los sprints S1–S4 constituyen el MVP mínimo defendible (objetivo: 30 marzo 2026).
- La demo se preparará con datos seed suficientes para mostrar el matching funcionando.
