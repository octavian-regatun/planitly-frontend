import axios from 'axios'
import { User } from '../interfaces/user.interface'
import { BACKEND_URL } from './constants'
import { redirectToError } from './redirects'

export async function fetchUser (id: string): Promise<User|undefined> {
  try {
    const { data: user } = await axios.get<User>(`${BACKEND_URL}/users/${id}`)

    return user
  } catch (e) {
    console.log(e)
  }
}
