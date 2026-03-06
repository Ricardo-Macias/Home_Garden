#define SENAL 7
#define RELAY 8

void setup() {
  pinMode(SENAL, INPUT);
  pinMode(RELAY, OUTPUT);

}

void loop() {
  if (digitalRead(SENAL) == HIGH){
    digitalWrite(RELAY, LOW);
  } else if (digitalRead(SENAL) == LOW){
    digitalWrite(RELAY, HIGH);
  }

}
