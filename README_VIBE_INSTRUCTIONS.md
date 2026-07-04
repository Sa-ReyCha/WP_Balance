# Vibe Instructions

Completá este archivo antes de pedirle a una IA que construya o modifique algo.
Cuanto más completo esté, mejores y más consistentes van a ser los resultados.

---

## 1. Contexto del proyecto

```
Nombre del proyecto: balanCé
Descripción en una línea: es una oagina web de una cafeteria healthy
Tipo de app: [ ] Landing  [ ] Dashboard  [ ] E-commerce  [ ] SaaS  [ ] Portfolio  [ ] Otro:  para cafeteria
Usuario objetivo:
```

---

## 2. Stack tecnológico

```
Frontend:     Tailwind CSS v4 + Vite (vanilla JS)
Lenguaje:     JavaScript  /  TypeScript
Framework:    ninguno  /  React  /  Vue  /  otro: ___
Backend:      ninguno  /  Node  /  otro: ___
Base de datos: ninguna  /  ___
Deploy:       Docker  /  Vercel  /  Netlify  /  otro: ___
```

---

## 3. Diseño y paleta de colores

### Colores
Definir la paleta en `src/style.css` dentro de `@theme`:

```css
@theme {
  --color-primary:    #94a96a;   /* acciones principales, CTAs */
  --color-secondary:  #f4f2e0;   /* acentos */
  --color-background: #f4f2e0;   /* fondo general */
  --color-text:       #94a96a;   /* texto principal */

}
```

> Reemplazá los valores hex con tu paleta antes de pedir cambios de UI.
> Herramientas para armar paletas: coolors.co · realtimecolors.com · uicolors.app

### Tipografía
```
Font principal:   Inter  /  Geist  /  otra:  canva sans 
Font de display:  igual que principal  /  otra: igual que la principal 
Tamaño base:      16px
```

### Modo oscuro
```
[x] No necesario
[ ] Solo CSS (prefers-color-scheme)
[ ] Toggle manual
```

---

## 4. Imágenes y assets

### Dónde van

| Carpeta         | Qué va ahí                                              | Cómo se usa en HTML          |
|-----------------|----------------------------------------------------------|-------------------------------|
| `public/`       | Imágenes referenciadas directo en HTML, favicon, og:image | `<img src="/foto.jpg">`       |
| `src/assets/`   | Imágenes importadas desde JS (Vite las optimiza y hashea) | `import foto from './assets/foto.jpg'` |


mis imagenes estan en @docs/img esta el logo y el resto son imagenes verticales de comida 

### Nombrado de archivos
```
Fotos de producto:    product-{nombre}-{variante}.jpg
Íconos:               icon-{nombre}.svg
Fondos / texturas:    bg-{descripción}.jpg
Avatares / personas:  avatar-{nombre}.jpg
```

no los tengo nombrados, pero si gustas puedes hacerlo 

### Formatos recomendados
```
Fotos:     .webp (fallback .jpg)
Íconos:    .svg
Logos:     .svg
```

---

## 5. Componentes de UI

Listá los componentes que necesitás. Marcá los que ya existen:

```
[ ] Navbar          [ ] Sidebar         [ ] Footer
[ ] Hero section    [ ] Cards           [ ] Modal / Dialog
[ ] Formulario      [ ] Tabla           [ ] Tabs
[ ] Toast / Alert   [ ] Badge           [ ] Dropdown
[ ] Skeleton loader [ ] Empty state     [ ] Pagination
[ ] Avatar          [ ] Progress bar    [ ] Stepper
```

tengo una web que hice en canva, si puedes buscar https://balancehealthybar.com/, es un intento con canva 

Para cada componente nuevo, especificá:
```
Componente: ___
Estados:    default / hover / active / disabled / loading / error
Variantes:  ___
Responsive: [ ] Mobile first  breakpoints: sm / md / lg
```

---

## 6. Animaciones

Elegí el nivel que necesitás:

```
[ ] Transitions simples (hover, focus)     → clases Tailwind transition + duration
[x] Animaciones built-in                   → animate-spin / pulse / bounce / ping
[ ] Animaciones custom                     → @keyframes en src/style.css
```

Para animaciones custom, describí el comportamiento:
```
Nombre:       slide-in
Trigger:      al montar el componente / on hover / on scroll
Qué anima:    opacity + translateY
Duración:     300ms
Easing:       ease-out
```

---

## 7. Llamadas a API

### Configuración general
```
Base URL:         https://api.ejemplo.com/v1
Autenticación:    [ ] None  [ ] Bearer token  [ ] API Key header  [ ] Cookie
Header auth:      Authorization: Bearer {TOKEN}
```

no tiene llamadas de api 

### Variables de entorno
Crear un archivo `.env` en la raíz (nunca commitear):

```bash
VITE_API_URL=https://api.ejemplo.com/v1
VITE_API_KEY=tu_api_key_aqui
```

En el código se accede como:
```js
const API_URL = import.meta.env.VITE_API_URL
```

> Solo las variables con prefijo `VITE_` son accesibles desde el frontend.

### Endpoints a implementar

```
Método  Endpoint                  Descripción               Auth
------  ------------------------  ------------------------  ----
GET     /users                    Listar usuarios           Sí
POST    /users                    Crear usuario             Sí
GET     /users/{id}               Obtener usuario           Sí
PUT     /users/{id}               Actualizar usuario        Sí
DELETE  /users/{id}               Eliminar usuario          Sí
```

### Manejo de errores
```
[ ] Toast de error global
[ ] Mensaje inline en el componente
[ ] Página de error dedicada
[ ] Retry automático
```

---

## 8. Formularios y validación

```
Campos:       nombre, email, password, ___
Validación:   [ ] Frontend solo  [ ] Backend only  [ ] Ambos
Librería:     ninguna (vanilla)  /  Zod  /  Yup  /  otra: ___
Submit:       [ ] Fetch nativo  [ ] Axios  [ ] otra: ___
```

no tiene formlaros

---

## 9. Responsive

```
Breakpoints Tailwind:
  sm:   640px   → tablet chica
  md:   768px   → tablet
  lg:   1024px  → desktop
  xl:   1280px  → desktop grande

Estrategia: Mobile first (diseñar para mobile, escalar hacia arriba)

Viewport principal del diseño: [ ] Mobile  [ ] Desktop
```

---

## 10. Docker y deployment

### Entornos

| Entorno     | Comando                          | URL                     |
|-------------|----------------------------------|-------------------------|
| Desarrollo  | `npm run dev`                    | http://localhost:5173   |
| Producción  | `docker compose up --build`      | http://localhost:8080   |

### Variables de entorno por entorno

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api

# .env.production
VITE_API_URL=https://api.miapp.com/v1
```

### Notas Docker
- El `Dockerfile` usa build en dos etapas: Node para compilar → Nginx para servir.
- El build de producción va a `dist/` y Nginx lo sirve en el puerto 80 (mapeado al 8080).
- No incluir `node_modules/` ni `.env` en la imagen (están en `.dockerignore`).

---

## 11. Instrucciones para la IA

Antes de pedir algo, completá este bloque y pegalo junto con tu pedido:

```
Stack:          Tailwind CSS v4 + Vite, vanilla JS
Componente:     ___
Qué necesito:   ___
Estados:        ___
Colores:        usar variables --color-primary, --color-secondary, etc.
Imágenes:       las fotos van en public/ o src/assets/ (aclarar cuál)
Responsive:     mobile first, usar prefijos sm: md: lg:
Animaciones:    [ ] ninguna  [ ] transition  [ ] custom: ___
API:            [ ] no  [ ] sí → endpoint: ___ método: ___
Restricciones:  no usar librerías externas  /  mantener estructura actual  /  ___
```

---

## 12. Checklist antes de pedir algo

- [ ] Tengo claro qué componente o feature quiero
- [ ] Definí la paleta de colores en `src/style.css`
- [ ] Las imágenes están en `public/` o `src/assets/` según corresponde
- [ ] Las variables de entorno están en `.env`
- [ ] Sé si necesita llamada a API y tengo el endpoint
- [ ] Aclaré si necesita ser responsive y en qué breakpoints
- [ ] Especifiqué si necesita animaciones


# texto de pagina de referencia https://balancehealthybar.com/

balanCé

healthy bar

balancehealthybar

Creemos que cuidarse no tiene por qué ser aburrido. Somos un concepto
único de healthy cafetería bar diseñado para quienes buscan el equilibrio
perfecto entre sabor, salud y un gran ambiente.


Nuestra misión de transformar tu rutina. Desde jugos frescos que
revitalizan tus mañanas, hasta deliciosa comida saludable ideal para
compartir, cada ingrediente es seleccionado para nutrir tu cuerpo y
alegrar tu día. 

Quienes
somos

balanCé ya está aquí para llenar tus
días de energía natural 🌱🌱


📍 Encuéntranos en: Plaza la Montaña, Segundo Piso (Zona Cumbres). 

🗓️ Gran Apertura: 24 de mayo de 2026. 


ENCUENTRANOS