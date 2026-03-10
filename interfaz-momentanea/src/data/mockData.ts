export type ServiceType = "OFFER" | "REQUEST";

export interface User {
  id: string;
  name: string;
  avatar: string;
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

export const currentUser: User = {
  id: "me",
  name: "Juan de Dios",
  avatar: "JD",
  bio: "Desarrollador DAM con ganas de aprender y enseñar.",
  time_balance: 120,
  reputation_as_provider: 4.8,
  reputation_as_requester: 4.5,
  distance_km: 0,
};

export const users: User[] = [
  {
    id: "u1",
    name: "Ana Martínez",
    avatar: "AM",
    bio: "Diseñadora gráfica y amante de la cocina mediterránea.",
    time_balance: 90,
    reputation_as_provider: 4.9,
    reputation_as_requester: 4.7,
    distance_km: 0.8,
  },
  {
    id: "u2",
    name: "Carlos López",
    avatar: "CL",
    bio: "Profesor de matemáticas y aficionado a la fotografía.",
    time_balance: 210,
    reputation_as_provider: 4.6,
    reputation_as_requester: 4.4,
    distance_km: 1.2,
  },
  {
    id: "u3",
    name: "Sofía Ruiz",
    avatar: "SR",
    bio: "Fisioterapeuta. Ofrezco masajes y clases de yoga.",
    time_balance: 60,
    reputation_as_provider: 5.0,
    reputation_as_requester: 4.8,
    distance_km: 0.4,
  },
  {
    id: "u4",
    name: "Miguel Torres",
    avatar: "MT",
    bio: "Mecánico de bicicletas y guitarrista los fines de semana.",
    time_balance: 150,
    reputation_as_provider: 4.3,
    reputation_as_requester: 4.6,
    distance_km: 2.1,
  },
  {
    id: "u5",
    name: "Lucía Pérez",
    avatar: "LP",
    bio: "Abogada. Ayudo con trámites y documentación legal básica.",
    time_balance: 45,
    reputation_as_provider: 4.7,
    reputation_as_requester: 4.2,
    distance_km: 3.0,
  },
];

export const services: Service[] = [
  {
    id: "s1",
    user: users[0],
    type: "OFFER",
    title: "Clases de diseño con Figma",
    description:
      "Te enseño a hacer interfaces bonitas desde cero. Aprenderás componentes, auto-layout y prototipado interactivo.",
    tags: ["diseño", "figma", "UI"],
    duration_minutes: 60,
  },
  {
    id: "s2",
    user: users[1],
    type: "OFFER",
    title: "Refuerzo de matemáticas",
    description:
      "Álgebra, cálculo y estadística. Me adapto a tu nivel: ESO, Bachillerato o Universidad.",
    tags: ["matemáticas", "educación", "refuerzo"],
    duration_minutes: 90,
  },
  {
    id: "s3",
    user: users[2],
    type: "OFFER",
    title: "Sesión de masaje relajante",
    description:
      "Masaje descontracturante de espalda y cuello. Técnica sueca. Trae tu esterilla o ven a mi espacio.",
    tags: ["masaje", "bienestar", "fisioterapia"],
    duration_minutes: 45,
  },
  {
    id: "s4",
    user: users[3],
    type: "OFFER",
    title: "Reparación de bicicleta",
    description:
      "Reviso frenos, cambio pastillas, ajusto cambios y cadena. Traeme la bici al portal.",
    tags: ["bicicleta", "mecánica", "reparación"],
    duration_minutes: 60,
  },
  {
    id: "s5",
    user: users[4],
    type: "OFFER",
    title: "Revisión de contratos y documentos",
    description:
      "Reviso contratos de alquiler, laborales o compraventa. Te explico los puntos clave antes de firmar.",
    tags: ["legal", "contratos", "asesoría"],
    duration_minutes: 30,
  },
  {
    id: "s6",
    user: users[0],
    type: "REQUEST",
    title: "Busco clases de cocina italiana",
    description:
      "Quiero aprender a hacer pasta fresca y risotto. Soy principiante total en cocina.",
    tags: ["cocina", "italiana", "aprendizaje"],
    duration_minutes: 90,
  },
  {
    id: "s7",
    user: users[1],
    type: "REQUEST",
    title: "Necesito ayuda con React",
    description:
      "Quiero aprender hooks, contexto y cómo conectar con APIs. Tengo base de JavaScript.",
    tags: ["react", "programación", "frontend"],
    duration_minutes: 120,
  },
  {
    id: "s8",
    user: users[3],
    type: "REQUEST",
    title: "Clases de guitarra flamenca",
    description:
      "Toco guitarra clásica pero quiero aprender rasgueos y ritmos flamencos básicos.",
    tags: ["guitarra", "flamenco", "música"],
    duration_minutes: 60,
  },
];

export const myServices: Service[] = [
  {
    id: "ms1",
    user: currentUser,
    type: "OFFER",
    title: "Clases de programación (Python / JS)",
    description:
      "Enseño Python para automatización y JavaScript para web. Desde cero o nivel intermedio.",
    tags: ["python", "javascript", "programación"],
    duration_minutes: 90,
  },
  {
    id: "ms2",
    user: currentUser,
    type: "REQUEST",
    title: "Busco clases de fotografía",
    description:
      "Tengo una cámara réflex y no sé usarla bien. Quiero aprender composición y edición básica.",
    tags: ["fotografía", "cámara", "edición"],
    duration_minutes: 60,
  },
];

export const matches: Match[] = [
  {
    id: "m1",
    score: 0.92,
    status: "PENDING",
    offer: services[0],
    request: {
      id: "ms_req1",
      user: currentUser,
      type: "REQUEST",
      title: "Quiero aprender diseño UI",
      description: "Me interesa aprender Figma para mis proyectos.",
      tags: ["diseño", "figma"],
      duration_minutes: 60,
    },
  },
  {
    id: "m2",
    score: 0.85,
    status: "ACCEPTED",
    offer: myServices[0],
    request: services[6],
  },
  {
    id: "m3",
    score: 0.78,
    status: "PENDING",
    offer: services[2],
    request: {
      id: "ms_req2",
      user: currentUser,
      type: "REQUEST",
      title: "Busco sesión de masaje",
      description: "Tengo contractura en el cuello de trabajar con el ordenador.",
      tags: ["masaje", "bienestar"],
      duration_minutes: 45,
    },
  },
];
