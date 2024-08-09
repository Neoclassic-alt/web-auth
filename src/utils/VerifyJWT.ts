import * as jose from 'jose'

export default async function jwtVerify(jwt: string, jwk: jose.JWK) {
  const alg = 'RS256'
  const publicKey = await jose.importJWK(jwk, alg)
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey)
    console.log(protectedHeader)
    console.log(payload)
  } catch (e) {
    console.error('Invalid JWT')
  }
}
