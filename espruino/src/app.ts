import appConfig from './app-config'

let wifi = require('Wifi')
let httpClient = require('http')

const ssid = appConfig.ssid
const wifiPassword = appConfig.wifiPassword

const getDiodeStatusEndpoint = 'https://tt-robot-web.herokuapp.com/api/diode'

// todo move to utils
function printObject(object1: Object) {
  for (const key of Object.keys(object1) as (keyof typeof object1)[]) {
    console.log(`${key}: ${object1[key]}`)
  }
}

function setDiodeStatus(isOn: boolean) {
  NodeMCU.D0.write(isOn)
  console.log(`Diode state: ${NodeMCU.D0.read()}`)
}

function fetchDiodeStatus() {
  var requestOptions = url.parse(getDiodeStatusEndpoint, false)
  requestOptions.headers = {
    Accept: '*/*',
    Connection: 'keep-alive',
  }
  var request = httpClient.get(requestOptions, function (res: any) {
    var responseBody = ''

    res.on('data', function (data: any) {
      responseBody += data
    })
    res.on('close', function (hadError: boolean) {
      console.log('\nConnection closed. Had error: ' + hadError)
      console.log('\nFull response body: ' + responseBody)

      // handling value, refactor this
      const diodeStatus: boolean = JSON.parse(responseBody)
      setDiodeStatus(diodeStatus)

      setTimeout(() => {
        fetchDiodeStatus()
      }, 1000)
    })
    res.on('error', function (data: any) {
      console.log('\nResponse error::\n' + data)

      setTimeout(() => {
        fetchDiodeStatus()
      }, 1000)
    })
  })

  request.on('error', function (data: any) {
    console.log('\nRequest error:\n' + data) // I have an error here after reconnecting the device, visible in printObject
    printObject(data)
    connectToWifi() // this is probably overkill, I need some return type with extra data from networking wrapper
  })
}

function connectToWifi() {
  wifi.setHostname('esp-tt')
  wifi.connect(ssid, { password: wifiPassword }, function (error?: string) {
    if (error) {
      console.log('Failed to connect to wifi', error)
      setTimeout(() => connectToWifi(), 500)
    } else {
      console.log('Connected to wifi', wifi.getIP())
      fetchDiodeStatus()
    }
  })
  wifi.save()
}

function setupDiode() {
  NodeMCU.D0.mode('output')
}

function onInit() {
  // calling logic here atm, todo move to classes
  console.log('I: DEVICE LOGIC STARTS')
  setInterval(() => console.log('I: device running'), 2000)
  setupDiode()
  connectToWifi()
}

save() // saves the code to flash memory, then restarts and calls onInit(). this way it works similar to Arduino