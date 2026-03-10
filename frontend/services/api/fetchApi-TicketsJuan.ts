import { Platform } from "react-native";

const PORT = 8020;

const getBaseUrl = () => {
  if (Platform.OS === "web") return `http://localhost:${PORT}/`;

  const BASE_URL = "192.168.1.23"; // <- Cambiar por la URL final que sea  de moemnto la propia de ordenador
  return `http://${BASE_URL}:${PORT}/`;
};

const BASE_URL = getBaseUrl();

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type ContentType = "application/json" | "text/plain";

export interface FetchApiOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody | null;
  contentType?: ContentType;
  headers?: Record<string, string>;
}

export async function fetchApi<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  method: HttpMethod = "GET",
  body: TBody | null = null,
  contentType: ContentType = "application/json",
  headers: Record<string, string> = {}
): Promise<TResponse | string> {
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error ${response.status}: ${response.statusText} - ${errorText}`
    );
  }

  const contentTypeHeader = response.headers.get("content-type");

  if (contentTypeHeader?.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return (await response.text()) as string;
}
