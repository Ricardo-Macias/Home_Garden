#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <DHT.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <BH1750.h>
#include <ArduinoJson.h>
#include "api.h"

Preferences prefs;
BH1750 lightMeter;

#define DHTPIN 4
#define DHTTYPE DHT11
#define soil_moisture_pin 33
#define SLAVE 5

#define WIFI_SERVICE_UUID "e72640a5-7d6f-401a-b506-8355a871f404"
#define WIFI_SSID_CHAR_UUID "92f0538e-66f2-48f4-bf43-94e3d3fdf475"
#define WIFI_PASS_CHAR_UUID "53c48d51-2386-4584-8a8b-eb17ad324324"

String deviceName;

String receivedSSID;
String receivedPassword;
const char* serverUrl = API;
const char* FreshApiUrl = FreshAPI;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", -21600, 60000);
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastTime = 0;
const unsigned long interval = 300000; // 5 Minutos (300000)
unsigned long lastReadingTime = 0;
const unsigned long readingInterval = 2000;
unsigned long irrigationStart = 0;
unsigned long wateringTime = 0;
int lastHour = -1;
bool watered = false;

/*
  Struct
*/

struct Sensors {
  float humidity;
  float temperature;
  int soilMoisture;
  float lux;
};

/*
  Variables de ultimo valor del sensor y Umbral
*/

float lastValueHumidity = 0.0;
float lastValueTemperature = 0.0;
float lastValueLux = 0.0;
int lastValueSoilMoisture = 0.0;

float umbralHumidity = 10.0;
float umbralTemperature = 5.0;
float umbralLight = 40.0; // Medidos en LUX
int umbralSoilMoisture = 15.0;

/*
  Generar nombre del esp32
*/

String getDeviceName(){
  uint64_t chipid = ESP.getEfuseMac();
  char name[20];
  sprintf(name, "HomeGarden-%04X",(uint16_t)(chipid & 0xFFFF));
  return String(name);
}

/*
  Guardar el Nombre del ESP32
*/

void saveConfig(){
  prefs.begin("device", false);

  deviceName = prefs.getString("name", "");
  receivedSSID = prefs.getString("ssid", "");
  receivedPassword = prefs.getString("password", "");

  if (deviceName == ""){
    deviceName = getDeviceName();
    prefs.putString("name", deviceName);
  }else{
    Serial.println("Nombre: " + deviceName);
  }

  if (receivedSSID == ""){
    setupBluetooth();
  } else {
    connectToWiFi();
  }

  prefs.end();
}

/*
  Conectar WiFI
*/
void connectToWiFi() {
  WiFi.begin(receivedSSID.c_str(), receivedPassword.c_str());

  int timeout = 0;

  while (WiFi.status() != WL_CONNECTED && timeout < 20){
    delay(500);
    Serial.print(".");
    timeout++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n conectado a WiFi");
    Serial.println("IP: " + WiFi.localIP().toString());
    prefs.begin("device", false);

    prefs.putString("ssid", receivedSSID);
    prefs.putString("password", receivedPassword);

    prefs.end();
  } else {
    Serial.println("\n Error al conectar a WiFI");
  }


}

/*
  CALLBACK 
*/

class WifiCharCallback : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *characteristic){
    String value = characteristic->getValue().c_str();

    if (characteristic->getUUID().toString() == WIFI_SSID_CHAR_UUID){
      receivedSSID = String(value.c_str());
      Serial.println("SSID recivido: " + receivedSSID);
    }

    else if (characteristic->getUUID().toString() == WIFI_PASS_CHAR_UUID) {
      receivedPassword= String(value.c_str());
      Serial.println("Password recibido: " + receivedPassword);

      if (receivedSSID.length() > 0 && receivedPassword.length() > 0) {
        connectToWiFi();
      }
    }
  }
};

/*
  Iniciar Bluetooth
*/

void setupBluetooth() {
  BLEDevice::init(deviceName);

  BLEServer *server = BLEDevice::createServer();

  BLEService *wifiService = server->createService(WIFI_SERVICE_UUID);

  // SSID
  BLECharacteristic *ssidChar = wifiService->createCharacteristic(
    WIFI_SSID_CHAR_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  ssidChar->setCallbacks(new WifiCharCallback());

  //Contraseña
  BLECharacteristic *passChar = wifiService->createCharacteristic(
    WIFI_PASS_CHAR_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  passChar->setCallbacks(new WifiCharCallback());

  wifiService->start();

  BLEDevice::startAdvertising();
}

/*
  Control difuso
*/

float fuzzy(int hum, float temp, float lux, float humAmb){
  if(WiFi.status() == WL_CONNECTED){
    float seconds = 0;

    HTTPClient http;
    http.begin(FreshApiUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"deviceName\":\"" + deviceName + "\","
              "\"soilMoisture\":" + String(hum) + ","
              "\"temperature\":" + String(temp) + ","
              "\"humidity\":" + String(humAmb) + ","
              "\"light\":" + String(lux) + "}";

    int httpResponseCode = http.POST(json);
    
    if (httpResponseCode > 0){
      String response = http.getString();

      StaticJsonDocument<128> doc;
      DeserializationError error = deserializeJson(doc, response);

      if(!error){
        watered = doc["irrigation"];
        seconds = doc["seconds"];
      }
    } 
    
    http.end();
    return seconds;
  }

}

/*
  Sensor DHT11 - Humedad y Temperatura.
  Sensor YL-69 - Humeadad de la Tierra.
  Sensor BH1750 - Lux
*/

Sensors readSensors(){
  Sensors s;

  s.humidity = dht.readHumidity();
  s.temperature = dht.readTemperature();

  /*if (isnan(s.humidity) || isnan(s.temperature)){
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }*/

  s.soilMoisture = map(analogRead(soil_moisture_pin), 4095, 0, 0, 100);
  s.lux = lightMeter.readLightLevel();

  return s;

}

/*
  Guardar registros en la base de datos.
*/

void saveData(float temperature,float humedity, int soil_moisture, float light){
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"device_id\":\"esp32_1\",";
    json += "\"nombre\":\"" + deviceName + "\",";
    json += "\"temperatura\":" + String(temperature) + ",";
    json += "\"humedadAmbiente\":" + String(humedity) + ",";
    json += "\"humedadSuelo\":" + String(soil_moisture) + ",";
    json += "\"luz\":" + String(light) + "}";

    int httpCode = http.POST(json);
    http.end();
  }

}

void setup() {
  Serial.begin(115200);
  delay(1000);
  saveConfig();
  
  pinMode(soil_moisture_pin, INPUT);
  pinMode(SLAVE,OUTPUT);
  digitalWrite(SLAVE, LOW);
  dht.begin();

  Wire.begin(21, 22);
  lightMeter.begin();
  timeClient.begin();
  
} 

void loop() { 
  
  if(millis() - lastReadingTime >= readingInterval){
    Sensors value = readSensors();

    timeClient.update();
    int hour = timeClient.getHours();
    int minutes = timeClient.getMinutes();
    
    bool changeHumidity = abs(value.humidity - lastValueHumidity) >= umbralHumidity;
    bool changeTemperature = abs(value.temperature - lastValueTemperature) >= umbralTemperature;
    bool changeLux = abs(value.lux - lastValueLux) >= umbralLight;
    bool changeSoilMoisture = abs(value.soilMoisture - lastValueSoilMoisture) >= umbralSoilMoisture;

    if(millis() - lastTime >= interval || changeSoilMoisture || changeTemperature || changeHumidity || changeLux){
      
      saveData(value.temperature, value.humidity, value.soilMoisture, value.lux);
      
      Serial.print("Humedad del suelo: ");
      Serial.print(value.soilMoisture);
      Serial.println("%");
      
      Serial.print("Temperatura: ");
      Serial.print(value.temperature);
      Serial.println("°C");

      Serial.print("Humedad del Ambiente: ");
      Serial.print(value.humidity);
      Serial.println("%");

      Serial.print("Luz: ");
      Serial.print(value.lux);
      Serial.println(" Lux");

      lastTime = millis();
      lastValueHumidity = value.humidity;
      lastValueTemperature = value.temperature;
      lastValueLux = value.lux;
      lastValueSoilMoisture = value.soilMoisture;
      
    }

    
    if ((hour == 9 || hour == 16) && hour != lastHour && !watered){ 
      wateringTime = fuzzy(value.soilMoisture, value.temperature, value.lux, value.humidity);
      lastHour = hour;
      irrigationStart = millis();
      if (wateringTime != 0){
        digitalWrite(SLAVE, HIGH);
      }
      Serial.print("-------------> Se prendio la Bomba ");
      Serial.println(wateringTime);
    }

    if (watered && (millis() - irrigationStart) >= (wateringTime * 1000)){
      watered = false;
      Serial.println("-------------> Se Apago la Bomba");
      digitalWrite(SLAVE, LOW);
    }

    lastReadingTime = millis();
  }
  
}
