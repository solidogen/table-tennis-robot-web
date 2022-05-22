import appConfig from './app-config'

let wifi = require('Wifi')
let httpClient = require('http')

const getDiodeStatusEndpoint =
  'https://table-tennis-robot-web.vercel.app/api/diode' // (everything gets 308, vercel does some stupid hacks I think)
// 'https://vercel.app'  (same behavior, always 308, it's whole site behavior)
// 'https://google.com'  (works fine - data in chunks, gets html)
// 'https://weightreductor.herokuapp.com/'  (works fine - gets plain text from rest)

const ssid = appConfig.ssid
const wifiPassword = appConfig.wifiPassword

function printObject(object1: Object) {
  for (const key of Object.keys(object1) as (keyof typeof object1)[]) {
    console.log(`${key}: ${object1[key]}`)
  }
}

function fetchDiodeStatus() {
  var requestOptions = url.parse(getDiodeStatusEndpoint, false)
  requestOptions.headers = {
    Accept: '*/*',
    Connection: 'keep-alive',
  }
  var request = httpClient.get(requestOptions, function (res: any) {
    var responseBody = ''

    // todo - extract api call to method with callback
    // todo - add Accept */* header

    res.on('data', function (data: any) {
      console.log('\nHTTP:\n' + data) // current output -> HTTP: Redirecting to https://table-tennis-robot-web.vercel.app/api/diode (308)
      responseBody += data
    })
    res.on('close', function (hadError: boolean) {
      console.log('\nConnection closed. Had error: ' + hadError)
      console.log('\n\n')
      console.log('Full response body: ' + responseBody)

      console.log('Res:')
      printObject(res)
      console.log('\n\n')

      console.log('Res status: ' + res.statusCode)
      console.log('Res message: ' + res.statusMessage)
      console.log('Res headers:')
      printObject(res.headers)

      // if (res.statusCode == 308) {
      //   fetchDiodeStatus()
      // }
    })
    res.on('error', function (data: any) {
      console.log('\nERROR:\n' + data)
    })
  })

  console.log('Request:')
  printObject(request)
  printObject(request.opt)
  printObject(request.opt.headers)
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
