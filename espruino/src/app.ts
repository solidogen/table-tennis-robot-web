import appConfig = require('./app-config')

let wifi = require('Wifi')

const ssid = appConfig.default.ssid
const wifiPassword = appConfig.default.wifiPassword

function connectToWifi() {
  wifi.setHostname('esp-tt')
  wifi.connect(ssid, { password: wifiPassword }, function (err?: string) {
    console.log('connected? err=', err, 'info=', wifi.getIP())
  })

  // not needed
  wifi.stopAP()
  wifi.save()
}

function toggleDiodeIntervally() {
  var on = false
  NodeMCU.D0.mode('output')

  setInterval(function () {
    on = !on
    NodeMCU.D0.write(on)
    console.log(`pin state: ${NodeMCU.D0.read()}, expected value: ${on}`)
  }, 500)
}

// calling logic here atm, todo move to classes
connectToWifi()
