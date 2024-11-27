export type Alert = {
  message: string
  type: 'accepted' | 'error' | null
}
export type AppState = {
  alert: Alert
}
