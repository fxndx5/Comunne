# Acta de Reunión — 08/03/2026

**Proyecto:** Comunne — TFG DAM 2025–2026
**Fecha:** 08 de marzo de 2026
**Redactada:** 09 de marzo de 2026

---

## Asistentes

| Participante | Rol |
|---|---|
| Juan de Dios | Desarrollador principal (autor TFG) |
| ChatGPT | Panel IA — Experto evaluador |
| Gemini | Panel IA — Experto evaluador |
| Claude Sonnet 4.6 | Panel IA — Experto evaluador |
| DeepSeek | Panel IA — Experto evaluador |

---

## Motivo de la Reunión

Extender las ideas sobre el proyecto PFG en curso y aclarar las ideas y el stack tecnológico.

---

## Decisiones Tomadas

### 1. Descarte del Nodo Físico C++
**Decisión:** Se prescinde del nodo físico con C++ debido al tiempo y dedicación requeridos.
**Motivo:** Las restricciones temporales (entrega 29 mayo 2026) hacen inviable la curva de aprendizaje adicional.

### 2. Selección del Proyecto Final: **Comunne**
**Decisión:** Se adopta **Comunne** (marketplace de trueque de tiempo y habilidades local) como proyecto definitivo del TFG.
**Método de análisis:** Conteo de Borda ponderado por perfil experto sobre 4 propuestas evaluadas por panel de 4 IAs independientes.
**Decisión final:** Tomada por el autor del TFG, Juan de Dios, tras revisar el análisis completo del panel.

Ver justificación completa en [ADR-001](../decisiones/ADR-001-seleccion-comunne.md).

---

## Trabajo Previo Existente

| Artefacto | Descripción | Ubicación |
|---|---|---|
| Interfaz login | UI básica de inicio de sesión con funciones generalizadas de gestión de fichajes | `frontend/src/` |
| `api.js` | Módulo de peticiones a API desde interfaz | `frontend/src/api/` |
| `fetchApi()` | Función genérica para peticiones HTTP | `frontend/src/api/api.js` |
| `apiBuilder.ts` | Métodos generales para construcción de peticiones API | `frontend/src/api/apiBuilder.ts` |

---

## Ideas Generadas y Proceso de Selección

1. Se generaron **16 ideas principales** aportadas por los integrantes de la reunión.
2. Se desglosaron y analizaron hasta reducirse a **4 ideas únicas**:
   - **LifeGraph** (propuesta ChatGPT) — Analítica personal de hábitos y productividad
   - **EcoRoute Ops** (propuesta Gemini) — SaaS logística última milla con VRP
   - **Commune** (propuesta DeepSeek) — Marketplace trueque de tiempo y habilidades
   - **Linkboard** (propuesta Claude) — Hub conocimiento compartido para equipos dev
3. Se realizó un **análisis riguroso y exhaustivo** mediante panel de expertos IA para evaluación objetiva.
4. El autor del TFG tomó la decisión final de proyecto basándose en el análisis y su visión del producto.

---

## Ranking del Panel (referencia, no decisión vinculante)

| Pos. | Proyecto | Score Borda |
|---|---|---|
| 🥇 1 | Linkboard | 1.70 |
| 🥈 2 | EcoRoute Ops | 2.00 |
| 🥉 3 | **Comunne** | 2.75 |
| 4 | LifeGraph | 3.55 |

> **Nota:** El autor eligió Comunne consciente de los riesgos identificados por el panel (efecto de red en demo, complejidad PostGIS), valorando el **impacto social genuino**, la **originalidad conceptual** y el **potencial real del producto** por encima del score automatizado.

---

## Próximas Acciones

| Acción | Responsable | Fecha límite |
|---|---|---|
| Crear estructura de repositorio documentada | Dev A + Dev B | 09/03/2026 |
| Configurar Supabase (schema inicial + PostGIS) | Dev A | 15/03/2026 |
| Migrar código existente (api.js, apiBuilder.ts) a estructura nueva | Dev B | 15/03/2026 |
| Implementar auth con Supabase Auth | Dev A + Dev B | 15/03/2026 |
| Motor de matching TF-IDF inicial | Dev A | 22/03/2026 |
| MVP funcional (S4) | Ambos | 30/03/2026 |
| Entrega final TFG | Juan de Dios | 29/05/2026 |

---

## Observaciones

- El panel detectó sesgo de autoría en todos los modelos IA evaluadores; se consideró al interpretar los resultados.
- DeepSeek fue el único modelo que eligió Comunne en primer lugar, argumentando correctamente la independencia de APIs externas como ventaja técnica.
- La demo del proyecto deberá prepararse con datos de prueba suficientes para simular el efecto de red local.

---

*Acta redactada por: Claude Sonnet 4.6 (asistente de documentación)*
*Aprobada por: Juan de Dios*
