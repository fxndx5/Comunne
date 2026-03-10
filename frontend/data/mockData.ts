export type ServiceType = "OFFER" | "REQUEST";

export interface User {
  id: string;
  name: string;
  initials: string;
  bio: string;
  time_balance: number;
  reputation_as_provider: number;
  reputation_as_requester: number;
  distance_km: number;
}

export interface Service {
  id: string;
  user: User;
  type: ServiceType;
  title: string;
  description: string;
  tags: string[];
  duration_minutes: number;
}

export interface Match {
  id: string;
  score: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  offer: Service;
  request: Service;
}

export interface PostComment {
  id: string;
  user: User;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  user: User;
  service: Service;
  caption: string;
  time: string;
  likes: number;
  comments: PostComment[];
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface ServiceReview {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export interface MyServiceWithReviews {
  service: Service;
  reviews: ServiceReview[];
}

// ─── Usuarios ────────────────────────────────────────────────────────────────
export const currentUser: User = {
  id: "me",
  name: "Juan de Dios",
  initials: "JD",
  bio: "Desarrollador DAM con ganas de aprender y enseñar.",
  time_balance: 120,
  reputation_as_provider: 4.8,
  reputation_as_requester: 4.5,
  distance_km: 0,
};

export const users: User[] = [
  { id: "u1", name: "Ana Martínez",  initials: "AM", bio: "Diseñadora gráfica.", time_balance: 90,  reputation_as_provider: 4.9, reputation_as_requester: 4.7, distance_km: 0.8 },
  { id: "u2", name: "Carlos López",  initials: "CL", bio: "Profesor de matemáticas.", time_balance: 210, reputation_as_provider: 4.6, reputation_as_requester: 4.4, distance_km: 1.2 },
  { id: "u3", name: "Sofía Ruiz",    initials: "SR", bio: "Fisioterapeuta.", time_balance: 60,  reputation_as_provider: 5.0, reputation_as_requester: 4.8, distance_km: 0.4 },
  { id: "u4", name: "Miguel Torres", initials: "MT", bio: "Mecánico y guitarrista.", time_balance: 150, reputation_as_provider: 4.3, reputation_as_requester: 4.6, distance_km: 2.1 },
  { id: "u5", name: "Lucía Pérez",   initials: "LP", bio: "Abogada.", time_balance: 45,  reputation_as_provider: 4.7, reputation_as_requester: 4.2, distance_km: 3.0 },
];

// ─── Servicios ────────────────────────────────────────────────────────────────
export const services: Service[] = [
  { id: "s1", user: users[0], type: "OFFER",   title: "Clases de diseño con Figma",       description: "Te enseño a hacer interfaces bonitas desde cero con componentes y auto-layout.", tags: ["diseño", "figma", "UI"],          duration_minutes: 60  },
  { id: "s2", user: users[1], type: "OFFER",   title: "Refuerzo de matemáticas",           description: "Álgebra, cálculo y estadística. Me adapto a tu nivel.",                        tags: ["matemáticas", "educación"],        duration_minutes: 90  },
  { id: "s3", user: users[2], type: "OFFER",   title: "Sesión de masaje relajante",        description: "Masaje descontracturante de espalda y cuello. Técnica sueca.",                 tags: ["masaje", "bienestar"],             duration_minutes: 45  },
  { id: "s4", user: users[3], type: "OFFER",   title: "Reparación de bicicleta",           description: "Reviso frenos, cambio pastillas, ajusto cambios y cadena.",                    tags: ["bicicleta", "mecánica"],           duration_minutes: 60  },
  { id: "s5", user: users[4], type: "OFFER",   title: "Revisión de contratos",             description: "Reviso contratos de alquiler, laborales o compraventa.",                       tags: ["legal", "contratos"],             duration_minutes: 30  },
  { id: "s6", user: users[0], type: "REQUEST", title: "Busco clases de cocina italiana",   description: "Quiero aprender a hacer pasta fresca y risotto.",                              tags: ["cocina", "italiana"],             duration_minutes: 90  },
  { id: "s7", user: users[1], type: "REQUEST", title: "Necesito ayuda con React",          description: "Quiero aprender hooks y cómo conectar con APIs.",                              tags: ["react", "programación"],          duration_minutes: 120 },
];

export const myServices: Service[] = [
  { id: "ms1", user: currentUser, type: "OFFER",   title: "Clases de programación (Python / JS)", description: "Enseño Python para automatización y JavaScript para web.", tags: ["python", "javascript"], duration_minutes: 90 },
  { id: "ms2", user: currentUser, type: "REQUEST", title: "Busco clases de fotografía",            description: "Tengo una cámara réflex y no sé usarla bien.",              tags: ["fotografía", "cámara"], duration_minutes: 60 },
];

// ─── Matches ──────────────────────────────────────────────────────────────────
export const matches: Match[] = [
  {
    id: "m1", score: 0.92, status: "PENDING",
    offer: services[0],
    request: { id: "r1", user: currentUser, type: "REQUEST", title: "Quiero aprender diseño UI", description: "Me interesa Figma.", tags: ["diseño"], duration_minutes: 60 },
  },
  {
    id: "m2", score: 0.85, status: "ACCEPTED",
    offer: myServices[0],
    request: services[6],
  },
  {
    id: "m3", score: 0.78, status: "PENDING",
    offer: services[2],
    request: { id: "r2", user: currentUser, type: "REQUEST", title: "Busco sesión de masaje", description: "Tengo contractura en el cuello.", tags: ["masaje"], duration_minutes: 45 },
  },
];

// ─── Feed (Inicio) ────────────────────────────────────────────────────────────
export const posts: Post[] = [
  {
    id: "p1", user: users[2], service: services[2], time: "hace 5 min",
    caption: "¡Acabo de publicar una nueva oferta de masaje relajante! Si llevas semanas con tensión en el cuello, este es tu momento 🙌",
    likes: 12,
    comments: [
      { id: "c1", user: users[0], text: "¡Qué buena pinta! ¿Tienes hueco este fin de semana?", time: "hace 3 min" },
      { id: "c2", user: users[3], text: "Yo lo necesito urgentemente 😅", time: "hace 1 min" },
    ],
  },
  {
    id: "p2", user: users[0], service: services[0], time: "hace 22 min",
    caption: "Abro nuevas plazas para clases de Figma. Aprenderás desde cero: componentes, variantes, prototipos interactivos. ¡Solo cuesta 1 hora de tu tiempo! ⏱",
    likes: 8,
    comments: [
      { id: "c3", user: users[1], text: "Justo lo que necesitaba para mis proyectos. ¿Cómo me apunto?", time: "hace 15 min" },
    ],
  },
  {
    id: "p3", user: users[1], service: services[6], time: "hace 1 h",
    caption: "Busco a alguien que me enseñe React. Tengo base sólida de JS pero me pierdo con los hooks y el estado global. ¿Algún voluntario? 🚀",
    likes: 5,
    comments: [
      { id: "c4", user: currentUser, text: "¡Yo puedo ayudarte! Te enseño hooks y zustand en una sesión.", time: "hace 45 min" },
      { id: "c5", user: users[4], text: "Qué buena iniciativa este banco de tiempo 👏", time: "hace 30 min" },
    ],
  },
  {
    id: "p4", user: users[3], service: services[3], time: "hace 3 h",
    caption: "¿Tu bici lleva tiempo cogiendo polvo? La pongo a punto: frenos, cambios, cadena. Tráela al portal y en 1 hora la tienes nueva 🚲",
    likes: 19,
    comments: [],
  },
];

// ─── Notificaciones ───────────────────────────────────────────────────────────
export const notifications = [
  { id: "n1", text: "Ana Martínez ha comentado tu publicación", time: "hace 5 min",  read: false },
  { id: "n2", text: "Nuevo match con Sofía Ruiz (92%)",          time: "hace 20 min", read: false },
  { id: "n3", text: "Carlos López aceptó tu match",              time: "hace 1 h",   read: false },
  { id: "n4", text: "Tu servicio tiene una nueva reseña ⭐⭐⭐⭐⭐",  time: "hace 2 h",   read: true  },
  { id: "n5", text: "Miguel Torres solicitó tu servicio",         time: "ayer",       read: true  },
];

// ─── Conversaciones (Chat) ────────────────────────────────────────────────────
export const conversations: Conversation[] = [
  { id: "cv1", participant: users[1], lastMessage: "¡Perfecto! ¿Quedamos el sábado?", time: "hace 5 min",  unread: 2 },
  { id: "cv2", participant: users[0], lastMessage: "Genial, cuando quieras empezamos",  time: "hace 1 h",   unread: 0 },
  { id: "cv3", participant: users[2], lastMessage: "Muchas gracias por la sesión 🙌",   time: "ayer",       unread: 0 },
  { id: "cv4", participant: users[4], lastMessage: "Te envío el contrato mañana",       time: "ayer",       unread: 1 },
];

// ─── Perfil – Mis servicios con reseñas ──────────────────────────────────────
export const myServicesWithReviews: MyServiceWithReviews[] = [
  {
    service: myServices[0],
    reviews: [
      { id: "rv1", user: users[1], rating: 5, comment: "Increíble profe. Explica todo con mucha paciencia y ejemplos reales. Lo recomiendo 100%.", date: "05/03/2026" },
      { id: "rv2", user: users[0], rating: 5, comment: "En una sola sesión entendí los hooks que llevaba semanas sin pillar. ¡Gracias!", date: "01/03/2026" },
      { id: "rv3", user: users[3], rating: 4, comment: "Muy buen nivel. A veces va un poco rápido pero siempre repite si le pides.", date: "22/02/2026" },
    ],
  },
  {
    service: myServices[1],
    reviews: [],
  },
];
