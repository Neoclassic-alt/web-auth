export interface LoginRequest {
  credential: string
  password: string
  code: string
  registrationToken: string
  recapthcaToken: string
  remoteAddress: string
}

export interface LoginResponse {
  ok: boolean
  accessToken: string
  refreshToken: string
  newUserWasCreated: boolean
}
