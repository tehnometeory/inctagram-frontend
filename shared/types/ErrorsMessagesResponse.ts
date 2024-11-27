export type ErrorsMessagesResponse = {
  errorsMessages: ErrorsMessage[]
}
type ErrorsMessage = {
  field: string
  message: string
}
