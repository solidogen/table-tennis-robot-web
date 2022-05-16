import appConfig = require('./app-config')

var on = false
D0.mode("output")

// todo: for some reason D0 in code is D3 on nodemcu

setInterval(function () {
  on = !on
  D0.write(on)
  console.log(`pin D0 state: ${D0.read()}, expected value: ${on}`)
}, 500)
