import appConfig = require('./app-config')

var on = false
NodeMCU.D0.mode("output")

// todo: for some reason D0 in code is D3 on nodemcu

setInterval(function () {
  on = !on
  NodeMCU.D0.write(on)
  console.log(`pin state: ${NodeMCU.D0.read()}, expected value: ${on}`)
}, 500)
