export type EmailConfirmationRequest =
  | {
      phone: string
      use_call: boolean
    }
  | {
      email: string
    }

export type EmailConfirmationResponse = {
  ok: boolean
  can_send_in_millis: number
}
