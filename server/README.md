# Servidor

## Descripción

Este modulo implementa el servido con el cual se comunicara el esp32 y la aplicacion. su funcion consiste en comunicarse con la base de datos para registrar los datos leidos del esp32.

## Objetivo

Registrar datos adquiridos del esp32 y de la aplicacion movil.

## Responsabilidades

- Registrar los valores de entrada en la base de datos.
- Enviar o recibir datos de la aplicacion.

## Tecnologias Utilizadas

- nodeJS
- render Dashboard

## Estructura del proyecto

- server
    - controllers
        - authController.js
        - cropController.js
        - cultivoController.js
        - favoritosController.js
        - profileController.js
        - sensorController.js
        userController.js
    - images
    - middleware
        - verifyToken.js
    - routes
        - auth.js
        - cultivo.js
        - favoritos.js
        - profile.js
        - user.js
    - app.js
    -database.js

## Funcionamiento

- Regitra en la basse de datos.
- Edita en la base de datos.
- Consulta la base de datos.
