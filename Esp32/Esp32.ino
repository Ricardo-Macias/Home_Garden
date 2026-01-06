#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <WiFi.h>

Preferences prefs;

#define WIFI_SERVICE_UUID "e72640a5-7d6f-401a-b506-8355a871f404"
#define WIFI_SSID_CHAR_UUID "92f0538e-66f2-48f4-bf43-94e3d3fdf475"
#define WIFI_PASS_CHAR_UUID "53c48d51-2386-4584-8a8b-eb17ad324324"

String deviceName;

String receivedSSID;
String receivedPassword;

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

void setup() {
  Serial.begin(115200);
  delay(1000);
  saveConfig();
}

void loop() {

}
