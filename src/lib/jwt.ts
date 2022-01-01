import axios from 'axios'
import jwtDecode from 'jwt-decode'
import JwtPayload from '../interfaces/jwtPayload.interface'
import { BACKEND_URL } from './constants'
import { redirectToError } from './redirects'
import { useUserStore } from './stores'

export function isJwtExpired (jwt: string): boolean {
  const jwtPayload = jwtDecode<JwtPayload>(jwt)

  const now = Date.now().valueOf() / 1000

  if (typeof jwtPayload.exp !== 'undefined' && jwtPayload.exp < now) {
    return true
  }

  return false
}

export async function fetchJwt (tokenId: string): Promise<string|undefined> {
  try {
    const { data: jwt } = await axios.post<string>(`${BACKEND_URL}/auth`, { tokenId })

    return jwt
  } catch (e) {
    console.log(e)

    redirectToError('function fetchJwt - error')
  }
}

export async function setJwtInLocalStorage (jwt: string): Promise<void> {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

    localStorage.setItem('token', jwt)

    const jwtPayload = getPayloadFromJwt(jwt)

    await useUserStore.getState().getUser(jwtPayload.id)
  } catch (e) {
    console.log(e)

    redirectToError('function setJwtInLocalStorage - error')
  }
}

export function isJwtInLocalStorage (): boolean {
  return localStorage.getItem('token') !== null
}

export function getPayloadFromJwt (jwt: string): JwtPayload {
  return jwtDecode<JwtPayload>(jwt)
}
