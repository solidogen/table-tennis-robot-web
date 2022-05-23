# espruino-ts-quickstart
Quickstart for Espruino using typescript and Visual Studio Code IDE

Source: https://www.espruino.com/Typescript+and+Visual+Studio+Code+IDE 

## Secrets
Instead of app-config.yaml, create app-config.user.yaml (already ignored) for safely adding stuff like ssid etc. 

## Code saving to flash memory
Code can be persisted to espruino-powered board by running `save()` command in espruino console.
Without it, newly uploaded code will be erased on restart (possibly returning to latest saved code).
Clear existing program with `clear()` followed by `save()`

Source: https://www.espruino.com/Saving 

## Fast bulding/sending/console operations
A few npm (internally gulp) scripts exist:
- build (compilation only)
- espruino-console (opens console I/O, we can read from console.log and give commands like `save()`)
- send-to-espruino-console (sends the program to the board, writes to console output if it's open. needs build script first)
- EXTRA - build-and-send (does both at once)

## Flashing
http://forum.espruino.com/conversations/311849/


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
curl -O 'http://www.espruino.com/binaries/travis/master/espruino_2v13.84_esp8266_4mb.tgz' # download the firmware
tar -xvzf espruino_2v13.84_esp8266_4mb.tgz # upack the .tgz file
rm espruino_2v13.84_esp8266_4mb.tgz # if tar was success full clean up and remove .tgz file
cd espruino_2v13.84_esp8266_4mb # enter the new extracted directory

esptool.py --port /dev/ttyUSB0 erase_flash

esptool.py --port /dev/ttyUSB0 --baud 115200 write_flash --verify --flash_freq 80m --flash_mode dio --flash_size 32m 0x0000 "boot_v1.6.bin" 0x1000 espruino_esp8266_user1.bin 0x3FC000 esp_init_data_default.bin 0x37E000 blank.bin