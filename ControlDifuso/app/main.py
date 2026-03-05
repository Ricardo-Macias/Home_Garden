from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from app.Mandani import mandani

app = FastAPI()

class SensorData(BaseModel):
    soilMoisture: float
    temperature: float
    humidity: float
    light: float

@app.post("/should-water")
def should_water(data: SensorData):
    hour = datetime.now().hour

    if hour in [0, 6, 12, 18]:
        seconds = mandani(data.soilMoisture, data.temperature, data.light, data.humidity)

        return {'irrigation': True, 'seconds': seconds}
    
    return {"regar": False}