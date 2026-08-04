# Base de Datos - Home Garden

## Descripción
La carpeta **database** contiene los scripts SQL necesarios para crear y configurar la base de datos del proyecto **Home Garden**.
La base de datos está diseñada para almacenar la información de los usuarios, cultivo, sensores, huertos, registros de monitoreo, favoritos e historial de riego. Además, incluye vistas para optimizar consultas y un evento programado para automatizar procesos del sistema.

## Tecnologías

- PostgreSQL
- SQL
- pg_cron (eventos programados)

## Contenido

| Archivo | Descripción |
|----------|-------------|
| **01_HomeGarden.sql** | Crea la estructura principal de la base de datos, incluyendo tablas, claves primarias y relaciones. |
| **02_Vistas.sql** | Define las vistas utilizadas por la aplicación para simplificar consultas frecuentes. |
| **03_Eventos.sql** | Contiene el evento programado que actualiza automáticamente el estado de los huertos. |


## Tablas principales

### usuario

Almacena la información de los usuarios registrados.

### cultivo

Contiene el catálogo de cultivos y sus parámetros ideales de crecimiento.

### sensor

Representa los dispositivos encargados de recopilar información ambiental.

### huerto

Relaciona un cultivo con un sensor y almacena información del seguimiento del cultivo.

### sensor_data

Guarda las mediciones registradas por los sensores.

### favoritos

Permite almacenar los cultivos favoritos de cada usuario.

### historial_regado

Registra los eventos de riego realizados sobre cada huerto.

## Vistas

### vw_home

Agrupa la información necesaria para mostrar los huertos activos en la pantalla principal de la aplicación.

### vista_historial_huertos

Muestra el historial de los huertos que ya finalizaron su ciclo.

## Evento programado

El archivo **03_Eventos.sql** contiene un evento que se ejecuta diariamente para actualizar automáticamente el estado de los huertos cuya fecha estimada de finalización ha sido alcanzada.
