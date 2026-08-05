# Home Garden

Home Garden es una aplicación móvil desarrollada para facilitar el monitoreo y la gestión de huertos mediante sensores ambientales.

La aplicación permite a los usuarios registrar y administrar sus cultivos, monitorear variables como temperatura, humedad y luz, consultar información detallada de diferentes plantas y dar seguimiento al estado de cada huerto.

El proyecto está conformado por una aplicación móvil, una API REST, una base de datos PostgreSQL, un módulo de inteligencia artificial y con un módulo que contiene las instrucciones en Arduino para la funcionalidad de los sensores que trabajan de forma integrada para ofrecer una solución de monitoreo para huertos.

---

# Características

| Funcionalidad | Descripción |
|---------------|-------------|
| Gestión de usuarios | Registro e inicio de sesión mediante autenticación. |
| Catálogo de cultivos | Consulta de información y recomendaciones para distintos cultivos. |
| Gestión de huertos | Creación y administración de huertos registrados por el usuario. |
| Monitoreo ambiental | Visualización de temperatura, humedad ambiental, humedad del suelo y luz. |
| Información del clima | Consulta de información meteorológica para apoyar el cuidado de los cultivos. |
| Favoritos | Permite guardar cultivos favoritos. |
| Historial de riego | Registro de los riegos realizados a cada huerto. |

---

# Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend | React Native, Expo, TypeScript |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL |
| Estado global | Redux Toolkit |
| API | REST API |

---

# Estructura del proyecto

```text
Home_Garden/

├── home_garden/
├── server/
├── database/
├── docs/
└── README.md
```

| Carpeta | Descripción |
|----------|-------------|
| home_garden | Aplicación móvil desarrollada con React Native. |
| server | API REST encargada de la lógica del sistema. |
| database | Scripts SQL para crear la base de datos. |
| docs | Documentación e imágenes del proyecto. |

---



# Instalación
## 1. Install dependencies
```bash
./dependencies.sh
```

## 2. Start Server
```bash
./server.sh
```

## 3. Start Expo
```bash
./expo.sh
```
## 4. Create ./serve/.env
<p>
    MYSQL_HOST = "" <br>
    MYSQL_USER = "" <br>
    MYSQL_PASSWORD = "" <br>
    MYSQL_DATABASE = "" <br>
</p>

## 5. Create ./home_garden/.env
<p>
    API_URL = your IPV4
</p>

---

# Documentación

| Documento | Descripción |
|------------|-------------|
| home_garden/README.md | Documentación de la aplicación móvil. |
| server/README.md | Documentación de la API REST. |
| database/README.md | Documentación de la base de datos. |

---

# Autores

**Jacqueline Macias Muro**
**Ricardo Macias Muro**
