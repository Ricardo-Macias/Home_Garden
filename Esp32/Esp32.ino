#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

void setupBluetooth() {
  BLEDevice::init("HomeGarden");

  BLEDevice::startAdvertising();
  Serial.println("Bluetooth iniciado");
}

void setup() {
  Serial.begin(9600);
  setupBluetooth();
}

void loop() {

}
