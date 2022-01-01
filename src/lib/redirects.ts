import router from 'next/router'

export function redirectToError (text: string): void {
  void router.push(`error?text=${text}`)
}

export function redirectToSignIn (): void {
  void router.push('/')
}
