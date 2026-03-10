# 📱 LOGINAPP

Aplicación desarrollada con **React Native** utilizando **Expo**.  
Este documento describe la estructura del proyecto, el propósito de cada carpeta y los comandos esenciales para crear e iniciar la aplicación.

---

## 📁 Estructura del Proyecto

### `.vscode/`
Configuraciones específicas para Visual Studio Code:
- Ajustes del editor
- Extensiones recomendadas
- Configuración de depuración

### `app/`
Carpeta principal donde se organiza la estructura de la aplicación.  
Aquí suelen ubicarse pantallas, navegación, layouts y rutas (especialmente en proyectos con Expo Router).

### `assets/`
Archivos estáticos:
- Imágenes
- Íconos
- Fuentes
- Sonidos

### `components/`
Componentes reutilizables de la interfaz:
- Botones
- Inputs
- Tarjetas
- Headers
- Elementos UI reutilizables

### `constants/`
Variables globales y configuraciones:
- Paleta de colores
- Tamaños de fuente
- URLs de API
- Configuración general de la app

### `hooks/`
Custom Hooks de React:
- Manejo de estados complejos
- Lógica reutilizable
- Peticiones a APIs
- Autenticación

### `node_modules/`
Dependencias instaladas del proyecto.  
Se genera automáticamente al instalar paquetes.

### `scripts/`
Scripts auxiliares para automatizar tareas:
- Limpieza de caché
- Generación de builds
- Scripts personalizados

---

## 📄 Archivos principales

### `app.json`
Configuración de Expo:
- Nombre de la app
- Íconos
- Permisos
- Configuración de builds

### `package.json`
Define:
- Dependencias
- Scripts de ejecución
- Información del proyecto

### `tsconfig.json`
Configuración del compilador TypeScript.

### `eslint.config.js`
Reglas de estilo y calidad de código.

### `.gitignore`
Archivos y carpetas ignorados por Git.

### `README.md`
Documentación del proyecto.

---

# 🚀 Comandos esenciales

## Crear un nuevo proyecto con Expo
```bash
npx create-expo-app@latest nombre-de-tu-app

## Comnandos esenciales
```bash
npx expo start
