export function parseBoolean(value: string) {
  if (value == "true") {
    return true
  } else if (value == "false") {
    return false
  } else {
    throw new Error(`Illegal raw boolean value:${value}`)
  }
}
