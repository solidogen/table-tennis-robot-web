# espruino-ts-quickstart
Quickstart for Espruino using typescript and Visual Studio Code IDE




> esptool.py --port /dev/ttyUSB0 flash_id

esptool.py v3.3
Serial port /dev/ttyUSB0
Connecting....
Detecting chip type... Unsupported detection protocol, switching and trying again...
Connecting....
Detecting chip type... ESP8266
Chip is ESP8266EX
Features: WiFi
Crystal is 26MHz
MAC: ac:0b:fb:ce:cb:95
Uploading stub...
Running stub...
Stub running...
Manufacturer: 5e
Device: 4016
Detected flash size: 4MB
Hard resetting via RTS pin...


mkdir 'nodemcu-firmware' && cd 'nodemcu-firmware' # create firmware directory and enter it
mkdir 'espruino' && cd 'espruino' # create espruino directory and enter it
curl -O 'http://www.espruino.com/binaries/travis/master/espruino_1v94.136_esp8266_4mb.tgz' # download the firmware
tar -xvzf espruino_2v13.84_esp8266_4mb.tgz # upack the .tgz file
rm espruino_2v13.84_esp8266_4mb.tgz # if tar was success full clean up and remove .tgz file
cd espruino_2v13.84_esp8266_4mb # enter the new extracted directory


espruino_2v13.84_esp8266_4mb.tgz