# Instrucciones para Claude Code — Comunne

## Commits
- **Nunca** añadir `Co-Authored-By: Claude` ni ninguna firma de Claude en los mensajes de commit.
- Los commits deben quedar limpios, sin trazas de herramientas de IA.

## Idioma
- Toda la documentación del proyecto en **español**.

## Estilo de código
- Backend: Python 3.12, FastAPI, convenciones PEP 8.
- Frontend/Mobile: TypeScript estricto, React 18, Expo.
- No añadir comentarios ni docstrings a código no modificado.

## Seguridad
- No introducir vulnerabilidades OWASP Top 10.
- Validar únicamente en los límites del sistema (input de usuario, APIs externas).
- No incluir secretos, tokens ni credenciales en el código ni en los commits.

## Testing
- PlayWright para fixing de web
