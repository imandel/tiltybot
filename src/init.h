#include <Arduino.h>
#include "XL330.h"
#include <SSLCert.hpp>
#include <LittleFS.h>
#include <SSLCert.hpp>
#include <HTTPSServer.hpp>
#define AP 1
using namespace httpsserver;

void initRobot(HardwareSerial& serialPort, XL330& robot, int mode);

SSLCert *initLittleFS();

void initWiFi(const char* ssid, const char* password, const char* index, int mode = AP);

HTTPSServer * initServer(SSLCert * cert);