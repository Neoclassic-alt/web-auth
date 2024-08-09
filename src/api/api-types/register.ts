export interface RegisterRequest {
  email: string
  emailConfirmCode?: string
  phone?: string
  phoneConfirmCode?: string
  inn?: string
  password: string
  userinfo: { [key: string]: any }
  recapthcaToken?: string
  roles?: {}
}

export interface RegisterResponse {
  ok: boolean
  uid: string
  accessToken: string
  refreshToken: string
}
