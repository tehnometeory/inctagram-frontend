export type AlertData = {
  message: string
  type: 'accepted' | 'error' | null
}
export type AppState = {
  alert: AlertData
}
