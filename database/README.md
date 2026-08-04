# Base de Datos - Home Garden

## Descripción
La carpeta **database** contiene los scripts SQL necesarios para crear y configurar la base de datos del proyecto **Home Garden**.
La base de datos está diseñada para almacenar la información de los usuarios, cultivo, sensores, huertos, registros de monitoreo, favoritos e historial de riego. Además, incluye vistas para optimizar consultas y un evento programado para automatizar procesos del sistema.

## Tecnologías

- PostgreSQL
- SQL
- pg_cron

## Contenido

| Archivo | Descripción |
|----------|-------------|
| **01_HomeGarden.sql** | Crea la estructura principal de la base de datos, incluyendo tablas, claves primarias y relaciones. |
| **02_Vistas.sql** | Define las vistas utilizadas por la aplicación para simplificar consultas frecuentes. |
| **03_Eventos.sql** | Contiene el evento programado que actualiza automáticamente el estado de los huertos. |


## Tablas principales

| Tabla | Función |
|--------|---------|
| **usuario** | Almacena la información de los usuarios. |
| **cultivo** | Contiene el catálogo de cultivos y sus parámetros. |
| **sensor** | Registra los dispositivos de monitoreo. |
| **huerto** | Relaciona un cultivo con un sensor. |
| **sensor_data** | Guarda las mediciones de los sensores. |
| **favoritos** | Almacena los cultivos favoritos de cada usuario. |
| **historial_regado** | Registra el historial de riego de los huertos. |

## Vistas

| Vista | Función |
|--------|---------|
| **vw_home** | Muestra la información de los huertos activos. |
| **vista_historial_huertos** | Muestra el historial de los huertos finalizados. |

## Evento programado

| Archivo | Función |
|----------|---------|
| **03_Eventos.sql** | Actualiza automáticamente el estado de los huertos cuando alcanza la fecha estimada de finalización. |
