import appConfig from './app-config'

let wifi = require('Wifi')
let httpClient = require('http')

const ssid = appConfig.ssid
const wifiPassword = appConfig.wifiPassword

const getDiodeStatusEndpoint = 
  'https://tt-robot.netlify.app/api/diode' // (301 on netlify, next.js does some stupid hacks I think)
// 'https://table-tennis-robot-web.vercel.app/api/diode' // (308 on netlify, next.js does some stupid hacks I think)

// `http://${appConfig.pcLocalIP}:3000/api/diode` /* (cannot create socket for localhost)*/

// 'https://www.att.com/' // (also built with next.js, 301)
// 'https://vercel.app'  (same behavior, always 308, it's whole site behavior)

// 'https://google.com'  (works fine - data in chunks, gets html)
// 'https://weightreductor.herokuapp.com/'  (works fine - gets plain text from rest)



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
      console.log('\nFull response body: ' + responseBody)

      console.log('\nRes:')
      printObject(res)

      console.log('\nRes status: ' + res.statusCode)
      console.log('Res message: ' + res.statusMessage)
      console.log('\nRes headers:')
      printObject(res.headers)

      // if (res.statusCode == 301) {
      //   fetchDiodeStatus()
      // }
    })
    res.on('error', function (data: any) {
      console.log('\nResponse error::\n' + data)
    })
  })

  request.on('error', function (data: any) {
    console.log('\nRequest error:\n' + data)
  })

  console.log('\nRequest:')
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
