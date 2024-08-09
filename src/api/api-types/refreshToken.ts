export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  ok: boolean
  accessToken: string
  refreshToken: string
  newUserWasCreated: boolean
}
