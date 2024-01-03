#include <SPFD5408_Adafruit_GFX.h> // Core graphics library
#include <SPFD5408_Adafruit_TFTLCD.h> // Hardware-specific library
#include <SPFD5408_TouchScreen.h>

#define YP A3 // must be an analog pin, use "An" notation!
#define XM A2 // must be an analog pin, use "An" notation!
#define YM 9 // can be a digital pin
#define XP 8 // can be a digital pin
#define LCD_CS A3
#define LCD_CD A2
#define LCD_WR A1
#define LCD_RD A0
#define LCD_RESET A4

#define WHITE 0x0000 //Black->White
#define YELLOW 0x001F //Blue->Yellow
#define CYAN 0xF800 //Red->Cyan
#define PINK 0x07E0 //Green-> Pink
#define RED 0x07FF //Cyan -> Red
#define GREEN 0xF81F //Pink -> Green
#define BLUE 0xFFE0 //Yellow->Blue
#define BLACK 0xFFFF //White-> Black
#define MINPRESSURE 1
#define MAXPRESSURE 1000

/*____Calibrate TFT LCD_____*/
#define TS_MINX 165
#define TS_MINY 903
#define TS_MAXX 885
#define TS_MAXY 120
/*______End of Calibration______*/ 
TouchScreen ts = TouchScreen(XP, YP, XM, YM, 300); //300 is the sensitivity
Adafruit_TFTLCD tft(LCD_CS, LCD_CD, LCD_WR, LCD_RD, LCD_RESET); //Start communication with LCD 
String symbol[4][4] = {
{ "7", "8", "9", "/" },
{ "4", "5", "6", "*" },
{ "1", "2", "3", "-" },
{ "C", "0", "=", "+" }
};
int X,Y;
long Num1,Num2,Number;
char action;
boolean result = false; 


void setup() {
Serial.begin(9600); //Use serial monitor for debugging
tft.reset(); //Always reset at start

//our LCD uses LTI8357 it worked for this to check this we have to see actually how the begin function is implimented in tft it is important
tft.begin(0x8357); 
tft.setRotation(0); // I just roated so that the power jack faces up - optional
tft.fillScreen(WHITE); 
tft.drawPixel(10, 20, RED);
IntroScreen(); 
draw_BoxNButtons();
} 


void loop() {
TSPoint p = waitTouch();
//here x is substituted for p.y and y is substituted for p.x thats due to the error he has made in detectButtons function he has interchanged the values
X = p.y; Y = p.x;
//Serial.print(X); Serial.print(','); Serial.println(Y);// + " " + Y); 
DetectButtons(); 
if (result==true)
CalculateResult(); 
DisplayResult(); 
delay(300);
} 

//this is the one that maps raw points in the display to the 0,0 to 240,360 in the virtual 
//see for min max values for callibration sometimes we have to interchange xmin xmax and ymin ymax respectively
TSPoint waitTouch() {
TSPoint p;
do {
p = ts.getPoint();
pinMode(XM, OUTPUT);
pinMode(YP, OUTPUT);
} while((p.z < MINPRESSURE )|| (p.z > MAXPRESSURE));
Serial.print(p.x); Serial.print(','); Serial.println(p.y);
p.x = map(p.x, TS_MINX, TS_MAXX, 0, tft.width());
p.y = map(p.y, TS_MINY, TS_MAXY, 0, tft.height());;
return p;
} 



void DetectButtons()
{ 

///////////////////////////////////////////////////////////////////////////
if (Y<50 && Y>0) //Detecting Buttons on Column 1
{
if (X>269 && X<300) //If cancel Button is pressed
{Serial.println ("Button Cancel"); Number=Num1=Num2=0; result=false;} 
if (X>210 && X<260) //If Button 1 is pressed
{Serial.println ("Button 1");
if (Number==0)
Number=1;
else
Number = (Number*10) + 1; //Pressed twice
} 
if (X>160 && X<205) //If Button 4 is pressed
{Serial.println ("Button 4");
if (Number==0)
Number=4;
else
Number = (Number*10) + 4; //Pressed twice
} 
if (X>108 && X<156) //If Button 7 is pressed
{Serial.println ("Button 7");
if (Number==0)
Number=7;
else
Number = (Number*10) + 7; //Pressed twice
}
} 
///////////////////////////////////////////////////////////////////////////


if (Y<100 && Y>55) //Detecting Buttons on Column 2
{
if (X>269 && X<300)
{Serial.println ("Button 0"); //Button 0 is Pressed
if (Number==0)
Number=0;
else
Number = (Number*10) + 0; //Pressed twice
} 
if (X>214 && X<256)
{Serial.println ("Button 2");
if (Number==0)
Number=2;
else
Number = (Number*10) + 2; //Pressed twice
} 
if (X>160 && X<205)
{Serial.println ("Button 5");
if (Number==0)
Number=5;
else
Number = (Number*10) + 5; //Pressed twic
} 
if (X>108 && X<156)
{Serial.println ("Button 8");
if (Number==0)
Number=8;
else
Number = (Number*10) + 8; //Pressed twic
}
} 
///////////////////////////////////////////////////////////////////////////



if (Y<175 && Y>115) //Detecting Buttons on Column 3
{
if (X>269 && X<300)
{Serial.println ("Button Equal");
Num2=Number;
result = true;
}
if (X>210 && X<256)
{Serial.println ("Button 3");
if (Number==0)
Number=3;
else
Number = (Number*10) + 3; //Pressed twice
}
if (X>160 && X<205)
{Serial.println ("Button 6");
if (Number==0)
Number=6;
else
Number = (Number*10) + 6; //Pressed twice
} 
if (X>108 && X<156)
{Serial.println ("Button 9");
if (Number==0)
Number=9;
else
Number = (Number*10) + 9; //Pressed twice
}
} 
///////////////////////////////////////////////////////////////////////////


if (Y<236 && Y>182) //Detecting Buttons on Column 3
{
Num1 = Number;
Number =0;
tft.setCursor(200, 20);
tft.setTextColor(RED);
if (X>269 && X<300)
{Serial.println ("Addition"); action = 1; tft.println('+');}
if (X>214 && X<256)
{Serial.println ("Subtraction"); action = 2; tft.println('-');}
if (X>160 && X<205)
{Serial.println ("Multiplication"); action = 3; tft.println('*');}
if (X>108 && X<156)
{Serial.println ("Devesion"); action = 4; tft.println('/');} 
delay(300);
}
} 



void CalculateResult()
{
if (action==1)
Number = Num1+Num2; 
if (action==2)
Number = Num1-Num2; 
if (action==3)
Number = Num1*Num2; 
if (action==4)
Number = Num1/Num2;
} 


void DisplayResult()
{
tft.fillRect(0, 0, 240, 80, CYAN); //clear result box
tft.setCursor(10, 20);
tft.setTextSize(4);
tft.setTextColor(BLACK);
tft.println(Number); //update new value
} 

void IntroScreen()
{
tft.setCursor (0, 100);
tft.setTextSize (1);
tft.setTextColor(YELLOW);
tft.println("UTHSARA");
tft.setCursor (30, 160);
tft.setTextSize (1);
tft.println("Made By");
tft.setCursor (30, 220);
tft.setTextSize (4);
tft.setTextColor(CYAN);
tft.println("Ketan");
delay(300);
} 


void draw_BoxNButtons()
{
//Draw the Result Box ## it is the yellow bar in top which displays results
tft.fillRect(0, 0, 240, 80, CYAN); 

//Draw First Column 
tft.fillRect (0,260,60,60,RED); // button clear
tft.fillRect (0,200,60,60,BLACK); // button 1
tft.fillRect (0,140,60,60,BLACK); // button 4
tft.fillRect (0,80,60,60,BLACK); // button 7

//Draw Third Column
tft.fillRect (120,260,60,60,GREEN); // button =
tft.fillRect (120,200,60,60,BLACK); // button 3
tft.fillRect (120,140,60,60,BLACK); // button 6
tft.fillRect (120,80,60,60,BLACK); // button 9

//Draw Secound & Fourth Column
for (int b=260; b>=80; b-=60)
{ tft.fillRect (180,b,60,60,BLUE);
tft.fillRect (60,b,60,60,BLACK);} 

//Draw Horizontal Lines
for (int h=80; h<=320; h+=60)
tft.drawFastHLine(0, h, 240, WHITE); 
//Draw Vertical Lines
for (int v=0; v<=240; v+=60)
tft.drawFastVLine(v, 80, 240, WHITE); 
//Display keypad lables
for (int j=0;j<4;j++) {
for (int i=0;i<4;i++) {
tft.setCursor(22 + (60*i), 100 + (60*j));
tft.setTextSize(3);
tft.setTextColor(WHITE);
tft.println(symbol[j][i]);
}
}
}