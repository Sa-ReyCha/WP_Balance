# Tailwind Base

Proyecto de aprendizaje con **Tailwind CSS v4** y **Vite**. Incluye una página estática con navbar, hero y cards para entender el sistema de clases utilitarias de Tailwind.

## Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18+           |
| npm         | 9+            |

## Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo (hot reload)
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Otros comandos

```bash
# Generar el build de producción (carpeta dist/)
npm run build

# Previsualizar el build de producción localmente
npm run preview
```

## Estructura del proyecto

```
.
├── index.html          # HTML principal con las clases de Tailwind
├── vite.config.js      # Configura Vite + el plugin de Tailwind CSS
├── package.json
└── src/
    ├── style.css       # Punto de entrada de CSS (@import "tailwindcss")
    └── main.js         # Punto de entrada de JS (importa style.css)
```

## Animaciones

Tailwind ofrece tres niveles según la complejidad de la animación.

### 1. Clases built-in

Listas para usar, sin configuración extra:

| Clase            | Efecto                  |
|------------------|-------------------------|
| `animate-spin`   | Rotación continua       |
| `animate-pulse`  | Fade in/out suave       |
| `animate-bounce` | Rebote vertical         |
| `animate-ping`   | Expansión estilo radar  |

```html
<div class="animate-spin">...</div>
<div class="animate-pulse">...</div>
```

### 2. Transitions

Para animar cambios de estado como hover o focus:

```html
<button class="bg-indigo-600 hover:bg-indigo-800 transition-colors duration-300">
  Hover me
</button>
```

Clases relevantes:

| Clase                  | Descripción                        |
|------------------------|------------------------------------|
| `transition`           | Activa la transición (todas las props) |
| `transition-colors`    | Solo color/background              |
| `transition-transform` | Solo transform (scale, translate…) |
| `duration-{ms}`        | Duración: `duration-150`, `duration-300`, etc. |
| `ease-in-out`          | Curva de aceleración               |
| `delay-{ms}`           | Retraso antes de iniciar           |

### 3. Animaciones custom

Se definen en `src/style.css` con `@theme` y `@keyframes`, y Tailwind las expone como clases normales:

```css
@import "tailwindcss";

@theme {
  --animate-slide-in: slide-in 0.4s ease-out;
}

@keyframes slide-in {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
```

```html
<div class="animate-slide-in">...</div>
```

> **Regla simple:** hover/focus → `transition`. Loop visual → `animate-*` built-in. Algo custom → `@keyframes` en `src/style.css`.

---

## Docker Compose

Para correr la app en un contenedor se usan el `Dockerfile` y el `docker-compose.yml` incluidos en el repo.

### Dockerfile

Usa un build en dos etapas: la primera compila los assets y la segunda los sirve con Nginx.

```dockerfile
# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: servidor estático
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### docker-compose.yml

```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

### Cómo usarlo

```bash
# Construir la imagen y levantar el contenedor
docker compose up --build

# Levantar en segundo plano
docker compose up --build -d

# Detener el contenedor
docker compose down
```

La app queda disponible en `http://localhost:8080`.

> **Nota:** Docker sirve el build de producción (estático), no el servidor de desarrollo de Vite. Para desarrollo local seguí usando `npm run dev`.
