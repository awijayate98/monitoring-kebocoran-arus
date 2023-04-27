#include <PZEM004Tv30.h>//Librari Sensor Pzem 
#include <Wire.h> //Librari i2c
#include <LiquidCrystal_I2C.h>//Librari i2c LCD
#include <ESP8266WiFi.h>//Librari Nodemcu
#include <ESP8266HTTPClient.h>//Librari ESP 8266
#include <ArduinoJson.h>//Librai pasing data
#include <FS.h>//
#include <WiFiManager.h>//
#include <ESP8266mDNS.h>//
#include <WiFiUdp.h>//
#include <ArduinoOTA.h>//Librari Onte Air


#define buzzer D0// pin D0 ESP 8266
#define relay D3// pin ESP D3
#define led D4 // pin ESP D4
#define tombol_r D8// pin ESP D8
#define hidup 0//
#define mati 1//

const char * serverlok = "http://smartenergyesp.000webhostapp.com/config/post-esp.php";
//const char * serverlok = "http://192.168.3.199/energy/config/post-esp.php";
float selisih = 0.01; // Selisih Arus Bocor


int portserver = 80;//
float kal;
float voltage, current_f, current_n, power, energy, b_energy, frequency, pf;
float cost_kwh; 
float Wattage;
int mVperAmp = 66; // use 185 for 5A, 100 for 20A Module and 66 for 30A Module
double Voltage = 0;
double VRMS = 0;
double AmpsRMS = 0;
int kondisi;
int flag;
int a,b;
boolean cutoff = false;
String kalimat, statusalat;
int waktu_sebelumnya = 0;
String api_key = "tPmAT5Ab3j7F9";
byte ring = 0;
float harga = 1.400;//Harga PerKWH Meter 6A/1300Waat 
PZEM004Tv30 pzem_f(Serial);
PZEM004Tv30 pzem_n(D5, D6);
LiquidCrystal_I2C lcd(0x27, 20, 4);

void initialized() {
  WiFiManager wifiManager;
  if (!wifiManager.autoConnect("energy esp", "12345678")) {
    Serial.println("failed to connect and hit timeout");
    delay(3000);
    ESP.reset();
    delay(3000);
  }
  ArduinoOTA.setHostname("energy_esp");

  // No authentication by default
    ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH)
      type = "sketch";
    else // U_SPIFFS
      type = "filesystem";
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
}

void setup() {
  //Serial.begin(9600);
  initialized();
  lcd.begin();
  lcd.backlight();
  pinMode(tombol_r, INPUT);
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(relay, OUTPUT);
  digitalWrite(relay, hidup);
  digitalWrite(buzzer, LOW);
  if(digitalRead(tombol_r) == HIGH)
  {
    pzem_n.resetEnergy();
    delay(100);
    pzem_f.resetEnergy();
    delay(50);
    for(int k; k<= 20; k++)
    {
      lcd.setCursor(k,1);
      lcd.print(">");
      delay(200);
    }
  }
  lcd.clear();
}

void loop() {
  ArduinoOTA.handle();
  setring();
  unsigned long waktu_sekarang = millis();
  if (!cutoff) {
    bacasensor();
    tampil_lcd();
    cek();
  } else {
    if (cutoff) {
      bacasensor();
      indikator();
    }
  }
  
 if (waktu_sekarang - waktu_sebelumnya >= 10000) 
  {
    waktu_sebelumnya = waktu_sekarang;
    if (isnan(voltage)) {} else {kirim_data_post();}
  }

}

void cleanlcd()
{
  lcd.setCursor(0, 0);
  lcd.print("");
  lcd.setCursor(10, 0);
  lcd.print("");
  
  //baris 2
  lcd.setCursor(0, 1);
  lcd.print("");
  
  lcd.setCursor(10, 1);
  lcd.print("");
  
  //baris 3
  lcd.setCursor(0, 2);
  lcd.print("");
  
  lcd.setCursor(10, 2);
  lcd.print("");
  lcd.setCursor(0, 3);
  lcd.print("");
  lcd.setCursor(18,3);
  lcd.print("");
}
void setring(){
  a = digitalRead(tombol_r);
  if (a == HIGH)
  {
    b++;
    lcd.setCursor(0, 1);
    lcd.print(b);
    lcd.clear();
    if(b == 1)
    {
      ring = 1;
      delay(200);
    }else{
      ring = 0;
      b = 0;
      delay(200);
    }
  }
}

void indikator() {
  if (ring == 0)
  {
    cleanlcd();
    lcd.setCursor(4, 0);
    lcd.print("CAUTION!!!!!");
    lcd.setCursor(1, 1);
    lcd.print("CUT CLOSE VOLTAGE");
    digitalWrite(relay, mati);
    digitalWrite(buzzer, LOW);
    delay(250);
    digitalWrite(buzzer, HIGH);
    delay(250);
  }else{
    cleanlcd();
    lcd.setCursor(4, 0);
    lcd.print("CAUTION!!!!!");
    lcd.setCursor(1, 1);
    lcd.print("CUT CLOSE VOLTAGE");
    
    lcd.setCursor(0, 2);
    lcd.print("A1:");
    lcd.print(current_n);
    lcd.print("A");
    
    lcd.setCursor(10, 2);
    lcd.print("A2:");
    lcd.print(current_f);
    lcd.print("A");

        //baris 2
    lcd.setCursor(0, 3);
    lcd.print("P:");
    lcd.print(power);
    lcd.print("W");
  
    lcd.setCursor(10, 3);
    lcd.print("E:");
    lcd.print(energy);
    lcd.print("kwh");

    lcd.setCursor(18,3);
    lcd.print("M");
    lcd.print(ring);
    
    digitalWrite(relay, hidup);
    digitalWrite(buzzer, LOW);
//     delay(500);
  }
}

void cek() {
  if (current_f != current_n) {
    if (current_f <= current_n) {
      kal = current_n - current_f;
    } else if (current_f >= current_n) {
      kal = current_f - current_n;
    }
    //delay(150);
  } else {
    kal = 0;
    flag = 0;
  }

    if (kal >= selisih) 
    {
      if (flag <=2 )
      {
        flag++;
      }else{
       statusalat = "LISTRIK MASALAH";
       cutoff = true;
       lcd.clear(); 
      }
    }
}

void bacasensor()// Baca Sensor Pzem
{
  voltage = pzem_f.voltage();
  current_f = pzem_f.current();
  current_n = pzem_n.current();
  power = pzem_n.power();
  energy = pzem_n.energy(), 3;
  frequency = pzem_f.frequency();
  pf = pzem_f.pf();
  calculate_cost();
}

void tampil_serial() {
  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.println("V");
  Serial.print("Current: ");
  Serial.print(pzem_f.current(), 4);
  Serial.println("A");
  Serial.print("Power: ");
  Serial.print(power);
  Serial.println("W");
  Serial.print("Energy: ");
  Serial.print(energy);
  Serial.println("kWh");
  Serial.print("Frequency: ");
  Serial.print(frequency, 1);
  Serial.println("Hz");
  Serial.print("PF: ");
  Serial.println(pf);
}

void tampil_lcd()//Void  Program LCD 20X4
{
  cleanlcd();
  //baris 1
  lcd.setCursor(0, 0);
  lcd.print("V:");
  lcd.print(voltage);
  lcd.print("V");

  lcd.setCursor(10, 0);
  lcd.print("A:");
  lcd.print(current_f);
  lcd.print("A");

  //baris 2
  lcd.setCursor(0, 1);
  lcd.print("P:");
  lcd.print(power);
  lcd.print("W");

  lcd.setCursor(10, 1);
  lcd.print("E:");
  lcd.print(energy);
  lcd.print("kwh");

  //baris 3
  lcd.setCursor(0, 2);
  lcd.print("F:");
  lcd.print(frequency);
  lcd.print("HZ");

  lcd.setCursor(10, 2);
  lcd.print("A_O::");
  lcd.print(current_n);
  lcd.print("A");

  lcd.setCursor(0, 3);
  lcd.print("Cost :");
  lcd.print("RP.");
  lcd.print(cost_kwh);
  
  lcd.setCursor(18,3);
  lcd.print("M");
  lcd.print(ring);
}

void calculate_cost() {
  cost_kwh = energy * harga;
}

void konvert(int a) {
  if (a == 1) {
    kalimat = "api_key=";
    kalimat += api_key;
    kalimat += "&";
    kalimat += "volt=";
    kalimat += voltage;
    kalimat += "&";
    kalimat += "frek=";
    kalimat += frequency;
    kalimat += "&";
    kalimat += "amper=";
    kalimat += current_f;
    kalimat += "&";
    kalimat += "watt=";
    kalimat += power;
    kalimat += "&";
    kalimat += "status=";
    kalimat += statusalat;
    kalimat += "&";
    kalimat += "kwh=";
    kalimat += energy;
    kalimat += "&";
    kalimat += "biaya=";
    kalimat += cost_kwh;
  }

}

void kirim_data() {
  konvert(1);
  WiFiClient client;
  if (!client.connect(serverlok, portserver)) {
    Serial.println("GAK KONEK SERVER");
    return;
  }
  HTTPClient http;
  String urlserver = "http://" + String(serverlok) + kalimat;
  http.begin(client, urlserver);
  http.GET();
  String balikan = http.getString();
  Serial.println(balikan);
  delay(100);

  if (b_energy != energy) {
    kalimat = "";
    konvert(2);
    String urlserver = "http://" + String(serverlok) + kalimat;
    http.begin(client, urlserver);
    http.GET();
    String balikan = http.getString();
    Serial.println(balikan);
    b_energy = energy;
  }
  delay(100);
  kalimat = "";

}

void kirim_data_post() {
  digitalWrite(led, HIGH);
  konvert(1);
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverlok);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpResponseCode = http.POST(kalimat);
  if (httpResponseCode == HTTP_CODE_OK) 
  {
       digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW 
  }
  http.end();
  kalimat = "";
}
