export namespace InMemoryState {
  var isDiodeChecked: boolean = false

  export function getDiodeStateLocal(): boolean {
    console.log("getDiodeStateLocal: " + isDiodeChecked)
    return isDiodeChecked
  }

  export function setDiodeStateLocal(isChecked: boolean) {
    console.log("setDiodeStateLocal: " + isChecked)
    isDiodeChecked = isChecked
  }
}
