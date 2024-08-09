import { Authorization } from 'token-auth-boris'
import axios from 'axios'
import type {
  EmailConfirmationRequest,
  EmailConfirmationResponse
} from '@/api/api-types/emailConfirmation'
import type { RefreshTokenRequest, RefreshTokenResponse } from '@/api/api-types/refreshToken'
import type { RegisterRequest, RegisterResponse } from '@/api/api-types/register'
import type { LoginRequest, LoginResponse } from '@/api/api-types/login'
import jwtVerify from '@/utils/VerifyJWT'

const auth = new Authorization({})

async function register(data: RegisterRequest) {
  const info = await axios.post<RegisterResponse>('/api/v2/register', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (info.data.ok) {
    auth.saveAccessToken(info.data.accessToken)
    auth.saveRefreshToken(info.data.refreshToken)
  }
  return info.data
}

async function login(data: LoginRequest) {
  const info = await axios.post<LoginResponse>('/api/v2/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (info.data.ok) {
    auth.saveAccessToken(info.data.accessToken)
    auth.saveRefreshToken(info.data.refreshToken)
  }
  return info.data
}

async function refreshToken(data: RefreshTokenRequest) {
  const info = await axios.post<RefreshTokenResponse>('/api/v2/regenerateTokens', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (info.data.ok) {
    auth.saveRefreshToken(info.data.refreshToken)
  }
  return info.data
}

auth.setMethods({
  register: async (data: RegisterRequest) => await register(data),
  login: async (data: LoginRequest) => await login(data),
  refreshToken: async (data: RefreshTokenRequest) => await refreshToken(data),

  sendConfirmCode: async (data: EmailConfirmationRequest) =>
    await axios.post<EmailConfirmationResponse>('/api/v2/sendConfirmCode', data),

  confirmEmail: async (email) =>
    await axios.post('/api/v2/confirmEmail', {
      code: '111111',
      email
    })
})

const checkToken = async (method: string, prevValue: any) => {
  if (method === 'register' || method === 'login') {
    return true
  }

  const accessToken = auth.getAccessToken()
  if (!accessToken) {
    throw new Error('No access token')
  }

  const publicKey = await axios.post('/api/v2/getPublicKey', {})

  try {
    jwtVerify(accessToken, publicKey.data)
    return true
  } catch (error) {
    throw new Error('Invalid access token')
  }
}

auth.addMiddleware(checkToken)

export default auth
