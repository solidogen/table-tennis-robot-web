import appConfig from "./app-config"

let wifi = require('Wifi')
let httpClient = require('http')

const getDiodeStatusEndpoint =
  'https://table-tennis-robot-web.vercel.app/api/diode' 
  // 'https://google.com'

const ssid = appConfig.ssid
const wifiPassword = appConfig.wifiPassword

function fetchDiodeStatus() {
  httpClient.get(getDiodeStatusEndpoint, function (res: any) {
    var responseBody = ""

    res.on('data', function (data: any) {
      console.log('\nHTTP:\n\n' + data) // current output -> HTTP: Redirecting to https://table-tennis-robot-web.vercel.app/api/diode (308)
      responseBody += data
    })
    res.on('close', function (data: any) {
      console.log('\nConnection closed:\n\n' + data) // current output -> Connection closed:false
      console.log("\n\n")
      console.log("Full response body: " + responseBody)
    })
  })
}

function connectToWifi() {
  wifi.setHostname('esp-tt')
  wifi.connect(ssid, { password: wifiPassword }, function (err?: string) {
    console.log('connected? err=', err, 'info=', wifi.getIP())
    fetchDiodeStatus()
  })
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
