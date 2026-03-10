import { Platform } from "react-native";

const LOCAL_PORT = 8020;

const getBaseUrl = () => {
  if (Platform.OS === "web") return `http://localhost:${LOCAL_PORT}/`;

  const LAN_IP = "192.168.1.23"; // cámbiala por tu IP
  return `http://${LAN_IP}:${LOCAL_PORT}/`;
};

const BASE_URL = getBaseUrl();

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ContentType = "application/json" | "text/plain";

export async function fetchApi<T>(
  endpoint: string,
  method: HttpMethod = "GET",
  body: any = null,
  contentType: ContentType = "application/json",
  headers: Record<string, string> = {}
): Promise<T> {
  const url = BASE_URL + endpoint;

  const options: RequestInit = {
    method,
    headers: { ...headers },
  };

  if (body !== null) {
    options.headers = {
      ...options.headers,
      "Content-Type": contentType,
    };

    options.body =
      contentType === "application/json"
        ? JSON.stringify(body)
        : (body as unknown as BodyInit);
  }

  const response = await fetch(url, options);

  let rawText = "";
  try {
    rawText = await response.text();
  } catch {
    rawText = "";
  }

  // Intentamos parsear SIEMPRE como JSON
  let json: any = null;
  try {
    json = rawText ? JSON.parse(rawText) : {};
  } catch {
    // Si no es JSON, convertimos el texto en JSON estándar
    json = { detail: rawText || "Respuesta no válida del servidor" };
  }

  // ✏️ Insertamos el status code dentro del JSON si no existe
  if (json.status === undefined) {
    json.status = response.status;
  }

  // ✏️ Insertamos success automáticamente si no existe
  if (json.success === undefined) {
    json.success = response.ok;
  }

  // ✏️ Insertamos un mensaje por defecto si no existe
  if (!json.message) {
    json.message = response.ok
      ? "Operación realizada correctamente"
      : "Error en la operación";
  }

  // ✏️ Normalizamos el campo data para que siempre exista
  if (json.data === undefined) {
    json.data = null;
  }

  // Si la respuesta no es OK, lanzamos error con JSON
  if (!response.ok) {
    // ✏️ Lanzamos un error con el mensaje estándar
    throw new Error(json.message || "Error desconocido");
  }

  // JSON tipado
  return json as T;
}
