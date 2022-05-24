import appConfig from "app-config"
import { Log } from "Log"

let wifi = require('Wifi')

const ssid = appConfig.ssid
const wifiPassword = appConfig.wifiPassword

export namespace WifiManager {
  export function connectToWifi(onSuccess: () => any) {
    wifi.setHostname('esp-tt')
    wifi.connect(ssid, { password: wifiPassword }, function (error?: string) {
      if (error) {
        Log.normal('Failed to connect to wifi', error)
        setTimeout(() => connectToWifi(onSuccess), 500)
      } else {
        Log.normal('Connected to wifi', wifi.getIP())
        onSuccess()
      }
    })
    wifi.save()
  }
}
