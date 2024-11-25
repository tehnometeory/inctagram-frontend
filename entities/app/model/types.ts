export type Alert = {
  message: null | string
  type: 'accepted' | 'error' | null
}
export type AppState = {
  alert: Alert
}
