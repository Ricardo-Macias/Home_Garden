# ESP32

## Descripción

Este módulo implementa el sistema embebido utilizando un ESP32. su funcion consiste en adquierir los valores de los sensores y registrarlos en la base de datos.

## Objetivo

Recolectar las condiciones ambientales de los diferentes sensores para enviarlos al servidor

## Responsabilidades

- Leer los sensores
- Enviar la informacion al servidor
- Recibir la respuesta del mandani
- Activar la bomba de agua

## Tecnologias Utilizadas

- Arduino IDE
- Preferences
- BLEDevie
- BLEUtils
- BLEServer
- WiFi
- NTPClient
- DHT
- HTTPClient
- Wire
- BH1750
- ArduinoJson

## Hardware utilizado

- ESP32 (Master)
- Arduino (Slave)
- DHT11
- YL-69
- BH1750
- Relay
- Bomba de agua

## Estructura del proyecto

- Arduino
    - Arduino.ino
- Esp32
    - api.h
    - Esp32.ino

## Funcionamiento

- Lee los datos de los sensores.
- Envia los datos al servidor.
- Activa la bomba de agua.

## Comunicación con el servidor

Cada 5 minutos o al percibir un cambio drastico, el servidor resive como entrada:

- Humedad del suelo
- Humedad Ambiental
- Luz
- Temperatura
