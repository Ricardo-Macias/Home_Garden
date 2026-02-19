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
    //Primera vez encendido
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
  //Serial.println("\n Intentando conectar a WiFI...");
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
  Control difuso - Sugeno
*/

float triangular(float x, float a, float b, float c) {
  if (x <= a || x >= c) return 0;
  if (x == b) return 1;
  if (x < b) return (x - a) / (b - a);
  return (c - x) / (c - b); 
}

float trapezoidal(float x, float a, float b, float c, float d){
  if (x <= a || x >= d) return 0;
  if (x >= b && x <= c) return 1;
  if (x < b) return (x - a) / (b - a);
  return (d - x) / (d - c);
}

float sugeno(float hum, float temp, float lux, float humAmb){
  
  float seco = trapezoidal(hum, 0, 0, 30, 37);
  float optimo = triangular(hum, 40, 42, 47);
  float saturado = trapezoidal(hum, 47, 55, 100, 100);

  float tempBaja = trapezoidal(temp, 0, 0, 10, 15);
  float tempAlta = trapezoidal(temp, 20, 26, 40, 40);

  float luzBaja = trapezoidal(lux, 0, 0, 500, 2500);
  float luzAlta = trapezoidal(lux, 1500, 5000, 65535, 65535);

  float humedadAmbienteBaja = trapezoidal(humAmb, 0, 0, 20, 30);
  float humedadAmbienteAlta = trapezoidal(humAmb, 58, 60, 100, 100);
  
  //Reglas (peso = min)

  float w1 = min(seco, min(tempAlta, min(luzAlta, humedadAmbienteBaja)));
  float w2 = min(seco, min(tempAlta, min(luzAlta, humedadAmbienteAlta)));
  float w3 = min(seco, min(tempBaja, min(humedadAmbienteBaja, luzAlta)));
  float w4 = min(seco, min(tempBaja, humedadAmbienteAlta));
  float w5 = min(optimo, luzAlta);
  float w6 = min(optimo, tempAlta);
  float w7 = min(optimo, tempBaja);
  float w8 = saturado;

  // Salidas constantes

  float z1 = 140;
  float z2 = 120;
  float z3 = 100;
  float z4 = 90;
  float z5 = 50;
  float z6 = 10;
  float z7 = 0;
  float z8 = 0;

  // Promedio ponderado

  float numerador = (w1 * z1) + (w2 * z2) + (w3 * z3) + (w4 * z4) + (w5 * z5) + (w6 * z6) + (w7 * z7 ) + (w8 * z8);

  float denominador = w1 + w2 + w3 + w4 + w5 + w6 + w7 + w8;
  if (denominador == 0) return 0;

  return numerador / denominador; 

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

      lastTime = millis();
      lastValueHumidity = value.humidity;
      lastValueTemperature = value.temperature;
      lastValueLux = value.lux;
      lastValueSoilMoisture = value.soilMoisture;
    }

    if ((hour == 0 || hour == 6 || hour== 12 || hour == 18) && minutes == 0 && hour != lastHour && !watered){
      wateringTime = sugeno(lastValueHumidity, lastValueTemperature, lastValueLux, lastValueSoilMoisture);
      lastHour = hour;
      watered = true;
      irrigationStart = millis()
      // Aqui se activara la bomba
    }

    if (watered && millis - irrigationStart => wateringTime){
      watered = false;
      // Aqui desactivar la bomba
    }

    lastReadingTime = millis();
  }
}
