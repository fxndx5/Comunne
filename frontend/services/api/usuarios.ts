import { api } from "./apiBuilder";

//Modelo de la respuesta que devuelven los datos para mapeo automatico
export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    //meter todo lo que devuelva la api aqui abajo
  };
  //   token?: string; //cuadno configuremos los tokens de acceso
}

// ✏️ Modelo estándar de respuesta que coincide con la API Python
export interface ApiResponse<T> {
  status: number;     // Código HTTP normalizado
  success: boolean;   // Indica si la operación fue correcta
  message: string;    // Mensaje de la API
  data: T | null;     // Datos reales devueltos por la API
}

// ✏️ Función de login adaptada al nuevo estándar ApiResponse<LoginResponse>
export function login(email: string, password: string) {
  return api()
    .endpoint("api/login")
    .method("POST")
    .json({ email, password })
    .send<ApiResponse<LoginResponse>>(); // ✏️ Ahora devolvemos ApiResponse<LoginResponse>
}
