import { ContentType, fetchApi, HttpMethod } from "./fetchApi";

export function api() {
  let endpoint = "";
  let method: HttpMethod = "GET";
  let body: any = null;
  let contentType: ContentType = "application/json";

  return {
    endpoint(path: string) {
      endpoint += path;
      return this;
    },

    param(value: string | number) {
      endpoint += `/${value}`;
      return this;
    },

    method(m: HttpMethod) {
      method = m;
      return this;
    },

    json(data: any) {
      body = data;
      contentType = "application/json";
      return this;
    },

    text(data: string) {
      body = data;
      contentType = "text/plain";
      return this;
    },

    send<TResponse = unknown>() {
      // ✏️ apiBuilder delega toda la lógica de normalización a fetchApi
      // ✏️ fetchApi garantiza que SIEMPRE devuelve JSON con:
      // ✏️ { status, success, message, data }
      // ✏️ Por tanto, aquí no necesitamos validaciones adicionales
      return fetchApi<TResponse>(endpoint, method, body, contentType);
    },
  };
}



// esto nos permite usar fetchAPi sin ser tan engorroso  con los siguientes metodos:

// JSON:
// api()
//   .endpoint("empleado/update")
//   .param(id)
//   .method("PATCH")
//   .json(body)
//   .send();

// TEXTOS PLANOS:
// api()
//   .endpoint("respuesta/add")
//   .param(ticketId)
//   .param(empleadoId)
//   .method("POST")
//   .text("Hola mundo")
//   .send();

// De esta manera el hace todas las comprobaciones y construye el endpoint sin que sea 
// un lio en base al propio endpoint base
