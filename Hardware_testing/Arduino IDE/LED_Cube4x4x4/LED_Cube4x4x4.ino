int LED_A0 = 13;
int LED_A1 = 12;
int LED_A2 = 11;
int LED_A3 = 10;
int LED_B0 = 9;
int LED_B1 = 8;
int LED_B2 = 7;
int LED_B3 = 6;
int LED_C0 = 5;
int LED_C1 = 4;
int LED_C2 = 3;
int LED_C3 = 2;
int LED_D0 = 1;
int LED_D1 = 0;
int LED_D2 = A5;
int LED_D3 = A4;
int Layer0 = A0;
int Layer1 = A1;
int Layer2 = A2;
int Layer3 = A3;

const int potPin = A8;
int potValue = 0; 
int blinkInterval = 100; 

int speed = 50;

const int numLayers = 4;  // Define the number of layers
const int numColumns = 4;  // Define the number of columns in each layer

int cubeMap[4][16]={
  {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
  {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
  {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
  {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}
};
// int cubeMap[4][16]={
//   {1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1},
//   {0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0},
//   {0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0},
//   {1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1}
// };

int ledPins[numLayers][numColumns] = {
  {LED_A0, LED_A1, LED_A2, LED_A3},
  {LED_B0, LED_B1, LED_B2, LED_B3},
  {LED_C0, LED_C1, LED_C2, LED_C3},
  {LED_D0, LED_D1, LED_D2, LED_D3}
};
int ledPins2[16] = {
  LED_A0, LED_A1, LED_A2, LED_A3,
  LED_B0, LED_B1, LED_B2, LED_B3,
  LED_C0, LED_C1, LED_C2, LED_C3,
  LED_D0, LED_D1, LED_D2, LED_D3
};

int layerPins[numLayers] = {Layer0, Layer1, Layer2, Layer3};
//#########################################################################################
void wavePattern() {
  for (int column = 0; column < numColumns; column++) {
    for (int layer = 0; layer < numLayers; layer++) {
      digitalWrite(ledPins[layer][column], HIGH);
      delay(speed);
      digitalWrite(ledPins[layer][column], LOW);
    }
    delay(speed);
  }
}
//##########################################################################################
void rotatingPattern() {
  for (int i = 0; i < 4; i++) {
    for (int layer = 0; layer < numLayers; layer++) {
      for (int column = 0; column < numColumns; column++) {
        digitalWrite(ledPins[layer][column], HIGH);
        delay(speed);
        digitalWrite(ledPins[layer][column], LOW);
      }
      delay(speed);
    }
  }
}
//##########################################################################################

void pattern02(){
  for(int layer=0;layer<4;layer++){
  for(int pins=0; pins<16;pins++){
    digitalWrite(ledPins2[pins],LOW);
  }
  for(int i=0; i<4;i++){
    digitalWrite(layerPins[i],HIGH);
  }
  digitalWrite(layerPins[layer],LOW);
  digitalWrite(ledPins2[0],HIGH);
  delay(10);
  for(int pins =1; pins <16; pins++){
    digitalWrite(ledPins2[pins],HIGH);
    digitalWrite(ledPins2[pins-1],LOW);
    delay(10);
  }
  
}
}

//##########################################################################################
void Pattern01(){
  for(int layers = 0; layers <numLayers ; layers=layers+2){
    for(int columns =0; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  for(int layers = 1; layers <numLayers ; layers=layers+2){
    for(int columns =1; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  for(int layers = 0; layers < numLayers ; layers++){
    digitalWrite(layerPins[layers],HIGH);
  }
  digitalWrite(layerPins[0],LOW);
  delay(speed);
  for(int layers = 1; layers <numLayers ; layers=layers+2){
    for(int columns =1; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  for(int layers = 0; layers <numLayers ; layers=layers+2){
    for(int columns =0; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  digitalWrite(layerPins[0],HIGH);
  digitalWrite(layerPins[1],LOW);
  delay(speed);
  for(int layers = 0; layers <numLayers ; layers=layers+2){
    for(int columns =0; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  for(int layers = 1; layers <numLayers ; layers=layers+2){
    for(int columns =1; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  digitalWrite(layerPins[1],HIGH);
  digitalWrite(layerPins[2],LOW);
  delay(speed);
  for(int layers = 1; layers <numLayers ; layers=layers+2){
    for(int columns =1; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  for(int layers = 0; layers <numLayers ; layers=layers+2){
    for(int columns =0; columns<numColumns; columns=columns+2){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  digitalWrite(layerPins[2],HIGH);
  digitalWrite(layerPins[3],LOW);
  delay(speed);
}
//##########################################################################################
void BasicPattern(){
  // put your main code here, to run repeatedly:
  for(int layers = 0; layers <numLayers ; layers++){
    for(int columns =0; columns<numColumns; columns++){
      digitalWrite(ledPins[layers][columns],HIGH);
    }
  }
  
  for(int layers = 0; layers < numLayers ; layers++){
    digitalWrite(layerPins[layers],HIGH);
  }

  digitalWrite(layerPins[0],LOW);
  delay(speed);
  digitalWrite(layerPins[0],HIGH);
  digitalWrite(layerPins[1],LOW);
  delay(speed);
  digitalWrite(layerPins[1],HIGH);
  digitalWrite(layerPins[2],LOW);
  delay(speed);
  digitalWrite(layerPins[2],HIGH);
  digitalWrite(layerPins[3],LOW);
  delay(speed);
}

void clearAall(){
  for(int i =0;i<16;i++){
    digitalWrite(ledPins2[i],LOW);
  }
  for(int i=0; i<4;i++){
    digitalWrite(layerPins[i],HIGH);
  }
}

void filllayer(int Layer_index){
  for(int i =0; i<16;i++){
    digitalWrite(ledPins2[i],cubeMap[Layer_index][i]);
  }
}


void fillingPattern(){
  for(int i=0;i<4;i++){
    for(int layer=0;layer != i && layer < 4 ; layer++){
      digitalWrite(layerPins[i],HIGH);
    }
    digitalWrite(layerPins[i],LOW);
    filllayer(i);
    delay(blinkInterval);
    clearAall();
  } 
}



// void turnOn


void setup() {
  for (int layer = 0; layer < numLayers; layer++) {
    for (int column = 0; column < numColumns; column++) {
      pinMode(ledPins[layer][column], OUTPUT);
    }
    pinMode(layerPins[layer], OUTPUT);
  }
  pinMode(potPin, INPUT);
}


void loop() {
  // put your main code here, to run repeatedly:
  potValue = analogRead(potPin);

  // Map the potentiometer value to a blink interval range
  blinkInterval = map(potValue, 0, 1023, 1, 1000);
  
  //pattern02();
  //wavePattern();
  //rotatingPattern();
  //Pattern01();
  //BasicPattern();
  fillingPattern();




  // speed = speed-100;
}

