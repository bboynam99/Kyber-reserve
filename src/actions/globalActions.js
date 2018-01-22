export function setSecretKey(seyString) {
  return {
    type: "GLOBAL.SET_SECRET_KEY",
    payload: seyString
  }
}
