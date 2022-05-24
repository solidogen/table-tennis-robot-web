export namespace Log {
  export function normal(message?: any, ...optionalParams: any[]) {
    if (optionalParams.length > 1) {
      console.log(message, optionalParams) // always prints the array brackets, could be improved 
    } else if (optionalParams.length == 1) {
      console.log(message, optionalParams[0])
    } else {
      console.log(message)
    }
  }

  // could pass to function above but there are issues passing ...[args]
  export function withFirstLb(message?: any, ...optionalParams: any[]) {
    const fullMessage = '\n' + message
    if (optionalParams.length > 0) {
      console.log(fullMessage, optionalParams) // always prints the array brackets, could be improved 
    } else if (optionalParams.length == 1) {
      console.log(fullMessage, optionalParams[0])
    } else {
      console.log(fullMessage)
    }
  }

  export function printObject(object: Object) {
    for (const key of Object.keys(object) as (keyof typeof object)[]) {
      console.log(`${key}: ${object[key]}`)
    }
  }
}
