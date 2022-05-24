import { Log } from './utils/Log'
import { WifiManager } from "./utils/WifiManager"

let httpClient = require('http')

const getDiodeStatusEndpoint = 'https://tt-robot-web.herokuapp.com/api/diode'

function setDiodeStatus(isOn: boolean) {
  NodeMCU.D0.write(isOn)
  Log.normal(`Diode state: ${NodeMCU.D0.read()}`)
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
      Log.withFirstLb('Connection closed. Had error: ' + hadError)
      Log.withFirstLb('Full response body: ' + responseBody)

      // handling value, refactor this
      const diodeStatus: boolean = JSON.parse(responseBody)
      setDiodeStatus(diodeStatus)

      setTimeout(() => {
        fetchDiodeStatus()
      }, 1000)
    })
    res.on('error', function (data: any) {
      Log.withFirstLb('Response error::\n' + data)

      setTimeout(() => {
        fetchDiodeStatus()
      }, 1000)
    })
  })

  request.on('error', function (data: any) {
    Log.withFirstLb('Request error:\n' + data) // I have an error here after reconnecting the device, visible in printObject
    Log.printObject(data)
    WifiManager.connectToWifi(() => fetchDiodeStatus()) // this is probably overkill, I need some return type with extra data from networking wrapper
  })
}

function setupDiode() {
  NodeMCU.D0.mode('output')
}

function onInit() {
  // calling logic here atm, todo move to classes
  Log.withFirstLb('I: DEVICE LOGIC STARTS')
  setInterval(() => Log.withFirstLb('I: device running'), 2000)
  setupDiode()
  WifiManager.connectToWifi(() => fetchDiodeStatus())
}

save() // saves the code to flash memory, then restarts and calls onInit(). this way it works similar to Arduino