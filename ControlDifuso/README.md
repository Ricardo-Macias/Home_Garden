# Inteligencia Artificial

## Descripción

Este módulo implementa la lógica de inteligencia artificial utilizada por el sistema de riego automático. Su función consiste en analizar los datos proporcionados por los sensores y determinar el tiempo de riego.

## Objetivos

Analizar las condiciones ambientales para apoyar la toma de decisiones sobre el riego automatico.

## Responsabilidades

- Recibir datos del ESP32
- Procesar la información
- Ejecuatar control difuso
- Determina el tiempo de riego

## Tecnologias utilizadas

- Python
- FastAPI
- BaseModel
- numpy
- matplotlib
- skfuzzy

## Funcionamiento

- valida la hora de regado
- Recibe los datos enviados
- Ejecuta el sistema mandani
- Calcula el tiempo de riego
- Devuelve el resultado

## Comunicacion con ESP32

Entrada:
- Humedad del suelo
- Temperatura
- Humedad del ambiente
- Luz

Salida
- Tiempo de riego